import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { LoginDto, RegisterDto } from './dto';
import { AuditService } from '../audit/audit.service';
import { VaiTro } from 'shared-database';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private auditService: AuditService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.nguoiDung.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const isMatch = await bcrypt.compare(dto.mat_khau, user.mat_khau);
    if (!isMatch) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    if (user.trang_thai === 'LOCKED') {
      throw new UnauthorizedException('Tài khoản đã bị khóa');
    }

    const payload = { sub: user.id, email: user.email, role: user.vai_tro, don_vi_id: user.don_vi_id, ho_ten: user.ho_ten, msv: user.msv };
    const access_token = this.jwtService.sign(payload);

    await this.auditService.logAction(user.id, 'LOGIN', 'USER', user.id);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        ho_ten: user.ho_ten,
        msv: user.msv,
        khoa: (user as any).khoa || '',
        vai_tro: user.vai_tro,
        don_vi_id: user.don_vi_id,
      },
    };
  }

  async register(dto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.prisma.nguoiDung.findFirst({
      where: {
        OR: [{ email: dto.email }, { msv: dto.msv }, { cccd: dto.cccd }],
      },
    });

    if (existingUser) {
      throw new BadRequestException('Email, MSV hoặc CCCD đã tồn tại');
    }

    // Mock VNPT eKYC Validation
    const ekycValid = await this.mockVnptEkyc(dto.cccd);
    if (!ekycValid) {
      throw new BadRequestException('Xác thực eKYC thất bại');
    }

    // Encrypt password and CCCD
    const hashedPassword = await bcrypt.hash(dto.mat_khau, 10);
    // In reality, use AES for CCCD, here we just mock encryption
    const encryptedCccd = `ENCRYPTED_${dto.cccd}`;

    let actualDonViId = undefined;
    if (dto.don_vi_id) {
      const existingDonVi = await this.prisma.donVi.findFirst({
        where: { ten_don_vi: dto.don_vi_id, cap_do: 'TRUONG' }
      });
      if (existingDonVi) {
        actualDonViId = existingDonVi.id;
      } else {
        const newDonVi = await this.prisma.donVi.create({
          data: {
            ten_don_vi: dto.don_vi_id,
            cap_do: 'TRUONG',
          }
        });
        actualDonViId = newDonVi.id;
      }
    }

    const newUser = await this.prisma.nguoiDung.create({
      data: {
        email: dto.email,
        mat_khau: hashedPassword,
        ho_ten: dto.ho_ten,
        msv: dto.msv,
        so_dien_thoai: dto.so_dien_thoai,
        cccd: encryptedCccd,
        vai_tro: dto.vai_tro || VaiTro.SINH_VIEN,
        don_vi_id: actualDonViId,
      },
    });

    await this.auditService.logAction(newUser.id, 'REGISTER', 'USER', newUser.id, null, { email: dto.email });

    return { message: 'Đăng ký thành công', userId: newUser.id };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.nguoiDung.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequestException('Email không tồn tại trong hệ thống');
    }
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await this.prisma.nguoiDung.update({
      where: { id: user.id },
      data: { reset_otp: otp, reset_otp_expires: expires },
    });

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      try {
        await transporter.sendMail({
          from: `"Hệ thống SV5T" <${smtpUser}>`,
          to: email,
          subject: "Mã xác thực khôi phục mật khẩu SV5T",
          html: `<b>Mã OTP của bạn là: <span style="color:blue;font-size:24px">${otp}</span></b><br/>Mã này sẽ hết hạn trong vòng 5 phút.`,
        });
      } catch (err) {
        console.error("Lỗi khi gửi mail thật:", err);
        throw new BadRequestException('Không thể gửi email. Vui lòng kiểm tra lại cấu hình SMTP.');
      }
    } else {
      console.log("\n=======================================================");
      console.log(`HỆ THỐNG GỬI EMAIL (MÔ PHỎNG VÌ CHƯA CÓ CẤU HÌNH SMTP)`);
      console.log(`Đến: ${email}`);
      console.log(`Tiêu đề: Mã xác thực khôi phục mật khẩu SV5T`);
      console.log(`Nội dung: MÃ OTP CỦA BẠN LÀ: [ ${otp} ]`);
      console.log(`=======================================================\n`);
    }
    
    await this.auditService.logAction(user.id, 'FORGOT_PASSWORD_REQ', 'USER', user.id, null, { email });
    return { 
      success: true, 
      message: 'Mã OTP đã được gửi đến email của bạn.',
      devOtp: (!smtpUser || !smtpPass) ? otp : undefined // Trả về luôn nếu chưa cấu hình mail thật
    };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.prisma.nguoiDung.findUnique({ where: { email } });
    if (!user || user.reset_otp !== otp || !user.reset_otp_expires) {
      throw new BadRequestException('Mã OTP không hợp lệ hoặc đã hết hạn');
    }
    
    if (new Date() > user.reset_otp_expires) {
      throw new BadRequestException('Mã OTP đã hết hạn');
    }

    return { success: true, message: 'Xác thực OTP thành công' };
  }

  async resetPassword(email: string, otp: string, new_password: string) {
    const user = await this.prisma.nguoiDung.findUnique({ where: { email } });
    if (!user || user.reset_otp !== otp || !user.reset_otp_expires || new Date() > user.reset_otp_expires) {
      throw new BadRequestException('Lỗi xác thực, vui lòng gửi lại yêu cầu quên mật khẩu');
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    
    await this.prisma.nguoiDung.update({
      where: { id: user.id },
      data: { 
        mat_khau: hashedPassword,
        reset_otp: null,
        reset_otp_expires: null 
      },
    });
    
    await this.auditService.logAction(user.id, 'RESET_PASSWORD', 'USER', user.id, null, { email });
    return { success: true, message: 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại.' };
  }

  async verifyEkycReal(files: Express.Multer.File[]) {
    if (!files || files.length < 3) {
      throw new BadRequestException('Vui lòng upload đủ 3 ảnh (mặt trước, mặt sau, khuôn mặt)');
    }

    const imgFront = files.find(f => f.fieldname === 'img_front');
    const imgBack = files.find(f => f.fieldname === 'img_back');
    const imgFace = files.find(f => f.fieldname === 'img_face');

    if (!imgFront || !imgBack || !imgFace) {
      throw new BadRequestException('Thiếu file ảnh hợp lệ');
    }

    const baseUrl = process.env.VNPT_BASE_URL || 'https://api.idg.vnpt.vn';
    
    // Read tokens from api.md dynamically
    const fs = require('fs');
    const apiMd = fs.readFileSync('d:/hackathon/api.md', 'utf8');
    const tokenIdMatch = apiMd.match(/Token ID: (.+)/);
    const tokenKeyMatch = apiMd.match(/Token Key: (.+)/);
    const accessTokenMatch = apiMd.match(/Access Token: (Bearer .+)/);

    const tokenId = tokenIdMatch ? tokenIdMatch[1].trim() : '';
    const tokenKey = tokenKeyMatch ? tokenKeyMatch[1].trim() : '';
    const authen = accessTokenMatch ? accessTokenMatch[1].trim() : '';

    const axios = require('axios');
    const FormData = require('form-data');

    const uploadFile = async (file: Express.Multer.File, title: string) => {
      const form = new FormData();
      form.append('file', file.buffer, { filename: file.originalname, contentType: file.mimetype });
      form.append('title', title);
      form.append('description', title);

      const res = await axios.post(`${baseUrl}/file-service/v1/addFile`, form, {
        headers: {
          ...form.getHeaders(),
          'Token-id': tokenId,
          'Token-key': tokenKey,
          'mac-address': 'WEB-001',
          'Authorization': authen
        },
      });
      return res.data.object.hash;
    };

    try {
      // 1. Upload files
      console.log('Uploading images to VNPT eKYC...');
      const hashFront = await uploadFile(imgFront, 'ocr front');
      const hashBack = await uploadFile(imgBack, 'ocr back');
      const hashFace = await uploadFile(imgFace, 'face');
      console.log('Upload success. Hashes:', { hashFront, hashBack, hashFace });

      // 2. OCR ID
      console.log('Calling VNPT OCR API...');
      const ocrRes = await axios.post(`${baseUrl}/ai/v1/web/ocr/id`, {
        img_front: hashFront,
        step_id: 0,
        validate_postcode: false,
        crop_param: "0,0",
        img_back: hashBack,
        client_session: "WEB-SDK_Chrome-134_3.1.0.0_8b50cd5e-0ef5-4839-8cd3-24168002f65b_1744097409162",
        token: "test",
        type: -1
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Token-id': tokenId,
          'Token-key': tokenKey,
          'mac-address': 'WEB-001',
          'Authorization': authen
        }
      });
      console.log('OCR Response:', JSON.stringify(ocrRes.data, null, 2));

      if (ocrRes.data?.statusCode !== 200 && ocrRes.data?.message !== 'Success') {
         // Some APIs return 200 HTTP but business logic error in body
         if (ocrRes.data?.statusCode || ocrRes.data?.message) {
            console.error('OCR Business Error:', ocrRes.data);
         }
      }

      const ocrData = ocrRes.data?.object || {};

      // 3. Face Compare
      console.log('Calling VNPT Face Compare API...');
      let compareMatch = true;
      try {
        const compareRes = await axios.post(`${baseUrl}/ai/v1/web/face/compare`, {
          img_front: hashFront,
          img_face: hashFace,
          client_session: "WEB-SDK_Netscape-5.0 (iPhone; CPU iPhone OS 16_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148--?_2.1.4.7_820fa1ae-33af-4d39-9995-7f99c36ff83c_1741713120303",
          token: "test"
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Token-id': tokenId,
            'Token-key': tokenKey,
            'mac-address': 'WEB-001',
            'Authorization': authen
          }
        });
        console.log('Face Compare Response:', JSON.stringify(compareRes.data, null, 2));
        if (compareRes.data?.object?.msg !== 'MATCH') {
          compareMatch = false;
        }
      } catch (err: any) {
        console.error('Face Compare API failed:', err.response?.data || err.message);
        throw new BadRequestException(err.response?.data?.message || 'Lỗi so khớp khuôn mặt từ VNPT');
      }

      if (!compareMatch) {
        throw new BadRequestException('Khuôn mặt không khớp với thẻ CCCD');
      }

      const cccd = ocrData.id || ocrData.so_cccd || ocrData.idNumber || ocrData.id_number;
      if (cccd) {
        const encryptedCccd = `ENCRYPTED_${cccd}`;
        const existingUser = await this.prisma.nguoiDung.findUnique({
          where: { cccd: encryptedCccd }
        });
        if (existingUser) {
          throw new BadRequestException('Tài khoản với số CCCD này đã tồn tại trên hệ thống. Vui lòng quay lại Đăng nhập.');
        }
      }

      // 4. Return result
      return {
        success: true,
        data: {
          ho_ten: ocrData.name || ocrData.ho_ten || ocrData.hoTen || ocrData.fullName,
          cccd: ocrData.id || ocrData.so_cccd || ocrData.idNumber || ocrData.id_number,
          ngay_sinh: ocrData.birthday || ocrData.ngay_sinh || ocrData.dob,
        }
      };
    } catch (e: any) {
      console.error('eKYC API Error Catch Block:', e.response?.data || e.message);
      // Propagate the actual error to the frontend
      throw new BadRequestException(e.response?.data?.message || e.message || 'Lỗi xác thực VNPT eKYC');
    }
  }

  private async mockVnptEkyc(cccd: string): Promise<boolean> {
    console.log(`Mocking eKYC call for CCCD: ${cccd}...`);
    // Dùng token từ api.md để mock
    const tokenStr = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."; 
    console.log(`Using VNPT eKYC Token: ${tokenStr.substring(0, 20)}...`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return true; // Giả lập luôn thành công
  }

  async updateProfile(userId: string, data: any) {
    const updatedUser = await this.prisma.nguoiDung.update({
      where: { id: userId },
      data: {
        msv: data.msv,
        so_dien_thoai: data.so_dien_thoai,
      },
    });
    
    return {
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        ho_ten: updatedUser.ho_ten,
        msv: updatedUser.msv,
        so_dien_thoai: updatedUser.so_dien_thoai,
        vai_tro: updatedUser.vai_tro,
        don_vi_id: updatedUser.don_vi_id,
      }
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.nguoiDung.findUnique({
      where: { id: userId }
    });
    if (!user) throw new BadRequestException('User not found');
    return {
      id: user.id,
      email: user.email,
      ho_ten: user.ho_ten,
      msv: user.msv,
      so_dien_thoai: user.so_dien_thoai,
      khoa: (user as any).khoa || '',
      vai_tro: user.vai_tro,
      don_vi_id: user.don_vi_id,
    };
  }
}
