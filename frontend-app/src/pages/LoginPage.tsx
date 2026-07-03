import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';



export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [forgotPassStep, setForgotPassStep] = useState(0); // 0: login, 1: email, 2: otp, 3: reset
  const { login, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (token) navigate('/'); }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { email, mat_khau: password });
      login(res.data.access_token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại. Kiểm tra lại email/mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      const res = await api.post('/auth/forgot-password', { email });
      setSuccess(`${res.data.message} (DÀNH CHO HACKATHON: Mã OTP của bạn là ${res.data.devOtp})`);
      setForgotPassStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      const res = await api.post('/auth/verify-otp', { email, otp });
      setSuccess(res.data.message);
      setForgotPassStep(3);
    } catch (err: any) {
      setError(err.response?.data?.message || 'OTP không hợp lệ.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    setLoading(true); setError(''); setSuccess('');
    try {
      const res = await api.post('/auth/reset-password', { email, otp, new_password: newPassword });
      setSuccess(res.data.message);
      setForgotPassStep(0);
      setPassword('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      {/* Left Panel - Premium Brand Visual */}
      <div className="hidden lg:flex w-[45%] bg-[#0b1120] relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bg-university.png')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-[#0b1120]/90 to-[#0b1120]" />
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite_alternate]" />

        <div className="relative z-10 p-16 max-w-lg">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center mb-8 shadow-2xl">
            <span className="text-white font-black text-2xl tracking-tighter">5T</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            Giải pháp số hóa <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Quản lý SV5T
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Nền tảng tích hợp AI OCR và VNPT eKYC giúp tự động hóa 100% quy trình xét duyệt danh hiệu Sinh viên 5 Tốt các cấp.
          </p>
          <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
              <ShieldCheck size={16} className="text-green-400" />
              Bảo mật VNPT eKYC
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
              <span className="text-blue-400 font-bold">AI</span>
              Tích hợp SmartVision
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 bg-white relative">
        <div className="w-full max-w-[440px] animate-fade-in">
          
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Đăng nhập</h2>
            <p className="text-slate-500">Chào mừng bạn quay lại hệ thống SV5T</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3.5 rounded-xl mb-6 text-sm font-medium flex items-center gap-3">
              <span className="text-lg">⚠️</span> {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-100 text-green-600 px-4 py-3.5 rounded-xl mb-6 text-sm font-medium flex items-center gap-3">
              <span className="text-lg">✅</span> {success}
            </div>
          )}

          {forgotPassStep === 0 && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Tài khoản Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all font-medium"
                    placeholder="name@domain.com" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-700">Mật khẩu</label>
                  <button type="button" onClick={() => { setForgotPassStep(1); setError(''); setSuccess(''); }} className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">Quên mật khẩu?</button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                    className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all font-medium"
                    placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3.5 mt-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-slate-900/20">
                {loading ? 'Đang xác thực...' : 'Đăng Nhập'}
                {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          )}

          {forgotPassStep === 1 && (
            <form onSubmit={handleForgotPassEmail} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Nhập Email để nhận mã OTP</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all font-medium"
                    placeholder="name@domain.com" />
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3.5 mt-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-600/20">
                {loading ? 'Đang gửi...' : 'Nhận Mã OTP'}
              </button>
              
              <button type="button" onClick={() => setForgotPassStep(0)} className="w-full text-center text-slate-500 hover:text-slate-700 font-bold text-sm mt-4">
                ← Quay lại đăng nhập
              </button>
            </form>
          )}

          {forgotPassStep === 2 && (
            <form onSubmit={handleForgotPassOtp} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Nhập mã OTP (6 số)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <ShieldCheck size={18} />
                  </div>
                  <input type="text" value={otp} onChange={e => setOtp(e.target.value)} required maxLength={6}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all font-medium text-center tracking-widest text-lg"
                    placeholder="••••••" />
                </div>
                <p className="text-xs text-slate-500 mt-2">Mã OTP đã được gửi về email <b>{email}</b>. Vui lòng kiểm tra hộp thư.</p>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3.5 mt-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-600/20">
                {loading ? 'Đang xác thực...' : 'Xác Nhận OTP'}
              </button>
              
              <button type="button" onClick={() => setForgotPassStep(1)} className="w-full text-center text-slate-500 hover:text-slate-700 font-bold text-sm mt-4">
                ← Đổi Email khác
              </button>
            </form>
          )}

          {forgotPassStep === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Mật khẩu mới</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all font-medium"
                    placeholder="••••••••" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Xác nhận mật khẩu</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all font-medium"
                    placeholder="••••••••" />
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3.5 mt-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 disabled:opacity-50 transition-all shadow-lg shadow-green-600/20">
                {loading ? 'Đang xử lý...' : 'Hoàn Tất Đổi Mật Khẩu'}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-bold transition-colors">
                Đăng ký ngay
              </Link>
            </p>
          </div>

          {/* User requested to remove this test account auto-fill section completely to make it more professional. I'll just remove the TEST_ACCOUNTS render. */}
        </div>
      </div>
    </div>
  );
}
