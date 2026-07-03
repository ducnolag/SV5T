import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { ChevronRight, CheckCircle2, User, Mail, Lock, Building, UploadCloud, Camera, Phone } from 'lucide-react';
import Select from 'react-select';

interface DonVi {
  id: string;
  ten_don_vi: string;
  cap_do: string;
  province?: string;
}

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ 
    email: '', mat_khau: '', ho_ten: '', msv: '', cccd: '', don_vi_id: '', province: '', vai_tro: 'SINH_VIEN', so_dien_thoai: '' 
  });
  
  const [files, setFiles] = useState<{
    img_front: File | null;
    img_back: File | null;
    img_face: File | null;
  }>({ img_front: null, img_back: null, img_face: null });

  const [units, setUnits] = useState<DonVi[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [ekycStatus, setEkycStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/vietnam_universities.json')
      .then(res => res.json())
      .then((data: any[]) => {
        const vnUnis = data.map(item => ({ 
          id: item.name, 
          ten_don_vi: item.name, 
          cap_do: 'TRUONG',
          province: item.province 
        }));
        setUnits(vnUnis);
      })
      .catch(() => {
        setUnits([{ id: 'DHQGHN', ten_don_vi: 'Đại học Quốc gia Hà Nội', cap_do: 'TRUONG', province: 'Thành phố Hà Nội' }]);
      });
  }, []);

  const handleFileChange = (field: keyof typeof files, file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }));
  };

  const handleEkyc = async () => {
    if (!files.img_front || !files.img_back || !files.img_face) {
      setError('Vui lòng tải lên đầy đủ 3 ảnh (Mặt trước, mặt sau và khuôn mặt)');
      return;
    }
    setEkycStatus('loading');
    setError('');
    
    const payload = new FormData();
    payload.append('img_front', files.img_front);
    payload.append('img_back', files.img_back);
    payload.append('img_face', files.img_face);

    try {
      const res = await api.post('/auth/ekyc-real', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        setFormData(prev => ({ 
          ...prev, 
          ho_ten: res.data.data.ho_ten,
          cccd: res.data.data.cccd
        }));
        setEkycStatus('done');
        setStep(2);
      }
    } catch (e: any) {
      setError(e.response?.data?.message || 'Lỗi kết nối VNPT eKYC. Kiểm tra lại ảnh của bạn.');
      setEkycStatus('idle');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', formData);
      const loginRes = await api.post('/auth/login', { email: formData.email, mat_khau: formData.mat_khau });
      login(loginRes.data.access_token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng ký thất bại. Email, MSV hoặc CCCD đã tồn tại.');
    } finally {
      setLoading(false);
    }
  };


  const FileUploader = ({ field, label, accept = "image/*" }: { field: keyof typeof files, label: string, accept?: string }) => {
    const file = files[field];
    return (
      <div className="relative group rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-all p-4 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden min-h-[120px]">
        <input type="file" accept={accept} onChange={e => handleFileChange(field, e.target.files?.[0] || null)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
        {file ? (
          <div className="flex flex-col items-center gap-2">
            <CheckCircle2 className="text-green-500" size={28} />
            <p className="text-sm font-semibold text-slate-700 max-w-[200px] truncate">{file.name}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-blue-600 transition-colors">
            {field === 'img_face' ? <Camera size={28} /> : <UploadCloud size={28} />}
            <p className="text-xs font-semibold uppercase tracking-wider">{label}</p>
            <p className="text-[11px]">Nhấn để chọn ảnh</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <div className="hidden lg:flex w-[45%] bg-[#0b1120] relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bg-university.png')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-[#0b1120]/90 to-[#0b1120]" />
        
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite_alternate]" />

        <div className="relative z-10 p-16 max-w-lg">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center mb-8 shadow-2xl">
            <span className="text-white font-black text-2xl tracking-tighter">5T</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            Gia nhập hệ thống <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              SV5T Quốc gia
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Hồ sơ số thông minh, bảo mật cấp độ cao với công nghệ VNPT eKYC. Kết nối sinh viên, tổ chức Đoàn - Hội toàn quốc.
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 bg-white relative overflow-y-auto py-12">
        <div className="w-full max-w-[500px] animate-fade-in">
          
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Đăng ký tài khoản</h2>
            <p className="text-slate-500">Trải nghiệm nền tảng số hóa phong trào Sinh viên 5 Tốt</p>
          </div>

          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step >= s ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-110' : 'bg-slate-100 text-slate-400'
                }`}>
                  {step > s ? <CheckCircle2 size={16} /> : s}
                </div>
                {s < 2 && <div className={`w-12 h-1 rounded-full transition-all duration-500 ${step > s ? 'bg-slate-900' : 'bg-slate-100'}`} />}
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3.5 rounded-xl mb-6 text-sm font-medium flex items-center gap-3">
              <span className="text-lg">⚠️</span> {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                <p className="text-slate-700 text-sm font-medium leading-relaxed">
                  Để đảm bảo tính xác thực, hệ thống cần đối chiếu thông tin qua <strong className="text-blue-600">VNPT eKYC</strong>. 
                  Vui lòng tải lên ảnh chụp giấy tờ và ảnh khuôn mặt.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FileUploader field="img_front" label="Mặt trước CCCD" />
                <FileUploader field="img_back" label="Mặt sau CCCD" />
                <div className="col-span-2">
                  <FileUploader field="img_face" label="Ảnh Selfie Khuôn Mặt" />
                </div>
              </div>
              
              {ekycStatus === 'loading' && (
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
                  <span className="text-slate-600 text-sm font-medium">Đang gọi VNPT eKYC AI để phân tích...</span>
                </div>
              )}
              
              <button onClick={handleEkyc} disabled={ekycStatus === 'loading'}
                className="w-full py-3.5 mt-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 group">
                Xác thực Danh tính AI
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="flex items-center gap-3 mb-6 p-4 bg-green-50/50 border border-green-100 rounded-xl">
                <CheckCircle2 size={24} className="text-green-600" />
                <div>
                  <p className="text-green-800 text-sm font-bold">Xác thực eKYC thành công</p>
                  <p className="text-green-600/80 text-xs font-medium mt-0.5">CCCD: {formData.cccd}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-700">Họ và tên</label>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wider">
                      OCR Trích xuất
                    </span>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-900"><User size={18} /></div>
                    <input type="text" required placeholder="Nguyễn Văn A" value={formData.ho_ten} disabled
                      className="w-full pl-11 pr-4 py-3 bg-slate-100 border border-slate-200 text-slate-900 rounded-xl cursor-not-allowed transition-all font-bold" />
                  </div>
                </div>


                <div className="space-y-1.5 sm:col-span-1">
                  <label className="text-sm font-bold text-slate-700">Mã sinh viên</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-900"><User size={18} /></div>
                    <input type="text" required placeholder="VD: 27A4040001" value={formData.msv} onChange={e => setFormData({ ...formData, msv: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/10 transition-all font-medium uppercase" />
                  </div>
                </div>

                <div className="space-y-1.5 sm:col-span-1">
                  <label className="text-sm font-bold text-slate-700">Số điện thoại</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-900">
                      <Phone size={18} />
                    </div>
                    <input type="tel" required placeholder="0987654321" value={formData.so_dien_thoai || ''} onChange={e => setFormData({ ...formData, so_dien_thoai: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/10 transition-all font-medium" />
                  </div>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-sm font-bold text-slate-700">Đơn vị trực thuộc</label>
                  <div className="relative group z-50">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 z-10">
                      <Building size={18} />
                    </div>
                    <Select
                      placeholder="Tìm kiếm và chọn trường..."
                      options={units.map(u => ({ value: u.id, label: u.ten_don_vi, province: u.province }))}
                      value={formData.don_vi_id ? { value: formData.don_vi_id, label: formData.don_vi_id } : null}
                      onChange={(selectedOption: any) => setFormData({ ...formData, don_vi_id: selectedOption?.value || '', province: selectedOption?.province || '' })}
                      filterOption={(candidate, input) => {
                        if (!input) return true;
                        const removeAccents = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
                        return removeAccents(candidate.label).includes(removeAccents(input));
                      }}
                      styles={{
                        control: (base) => ({
                          ...base,
                          paddingLeft: '2.5rem',
                          paddingTop: '0.25rem',
                          paddingBottom: '0.25rem',
                          borderRadius: '0.75rem',
                          borderColor: '#e2e8f0',
                          backgroundColor: '#f8fafc',
                          boxShadow: 'none',
                          '&:hover': {
                            borderColor: '#cbd5e1'
                          }
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected ? '#0f172a' : state.isFocused ? '#f1f5f9' : 'white',
                          color: state.isSelected ? 'white' : '#0f172a',
                          fontWeight: '500'
                        })
                      }}
                      className="font-medium text-slate-900"
                      noOptionsMessage={() => "Không tìm thấy trường nào"}
                    />
                  </div>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-sm font-bold text-slate-700">Email</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-900"><Mail size={18} /></div>
                    <input type="email" required placeholder="email@domain.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/10 transition-all font-medium" />
                  </div>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-sm font-bold text-slate-700">Mật khẩu</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-900"><Lock size={18} /></div>
                    <input type="password" required placeholder="••••••••" value={formData.mat_khau} onChange={e => setFormData({ ...formData, mat_khau: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/10 transition-all font-medium" />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3.5 mt-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center">
                {loading ? 'Đang tạo tài khoản...' : 'Hoàn Tất Đăng Ký'}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <Link to="/login" className="text-slate-500 hover:text-slate-700 text-sm font-bold transition-colors">
              ← Quay lại Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
