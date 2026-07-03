import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { User, Mail, CreditCard, Save, CheckCircle, Building } from 'lucide-react';
import Select from 'react-select';

export default function ProfilePage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    ho_ten: '',
    msv: '',
    so_dien_thoai: '',
    ten_don_vi: '',
    don_vi_id: '',
    province: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [units, setUnits] = useState<any[]>([]);

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
        console.warn('Could not load universities json');
      });
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/me');
        setFormData({
          ho_ten: res.data.ho_ten || '',
          msv: res.data.msv || '',
          so_dien_thoai: res.data.so_dien_thoai || '',
          ten_don_vi: res.data.ten_don_vi || '',
          don_vi_id: res.data.don_vi_id || '',
          province: '',
        });
      } catch (err) {
        // Fallback to local storage user
        if (user) {
          setFormData({
            ho_ten: user.ho_ten || '',
            msv: (user as any).msv || '',
            so_dien_thoai: (user as any).so_dien_thoai || '',
            ten_don_vi: '',
            don_vi_id: '',
            province: '',
          });
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const res = await api.post('/auth/me', formData); // Using our POST /auth/me route
      // Update local storage context if needed
      // Currently context reads from localStorage, we might just reload or update it
      const token = localStorage.getItem('token');
      if (token) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        window.location.reload(); // Quick way to update context
      }
      setSuccess(true);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Lỗi cập nhật thông tin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="relative overflow-hidden bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <User size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-800">Hồ Sơ Cá Nhân</h2>
              <p className="text-slate-500 font-medium">Cập nhật thông tin chính xác để AI đối chiếu minh chứng.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  Họ và tên đầy đủ <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="ho_ten"
                    disabled
                    value={formData.ho_ten}
                    className="pl-10 w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium text-slate-500"
                  />
                </div>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
                  Đã khóa sau khi eKYC
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  Số điện thoại
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="so_dien_thoai"
                    value={formData.so_dien_thoai}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="VD: 0987654321"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  Email <span className="text-slate-400 font-normal">(Chỉ đọc)</span>
                </label>
                <div className="relative opacity-70">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="pl-10 w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  {user?.role === 'CB_TINH' ? 'Tỉnh / Thành phố trực thuộc' : user?.role === 'CB_TW' ? 'Cơ quan Trung ương' : 'Trường / Đơn vị trực thuộc'}
                </label>
                {['SINH_VIEN', 'CB_TINH', 'CB_TW'].includes(user?.role || '') ? (
                  <div className="relative opacity-70">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Building size={18} />
                    </div>
                    <input
                      type="text"
                      disabled
                      value={formData.ten_don_vi || (user?.role === 'CB_TW' ? 'Trung ương Hội Sinh viên' : 'Đang cập nhật...')}
                      className="pl-10 w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium cursor-not-allowed"
                    />
                  </div>
                ) : (
                  <div className="relative z-50">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 z-10">
                      <Building size={18} />
                    </div>
                    <Select
                      placeholder={formData.ten_don_vi || "Tìm kiếm và chọn trường..."}
                      options={units.map(u => ({ value: u.id, label: u.ten_don_vi, province: u.province }))}
                      value={formData.don_vi_id ? { value: formData.don_vi_id, label: formData.ten_don_vi || formData.don_vi_id } : null}
                      onChange={(selectedOption: any) => setFormData({ ...formData, don_vi_id: selectedOption?.value || '', ten_don_vi: selectedOption?.label || '', province: selectedOption?.province || '' })}
                      filterOption={(candidate, input) => {
                        if (!input) return true;
                        const removeAccents = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
                        return removeAccents(candidate.label).includes(removeAccents(input));
                      }}
                      styles={{
                        control: (base) => ({
                          ...base,
                          paddingLeft: '2rem',
                          paddingTop: '0.25rem',
                          paddingBottom: '0.25rem',
                          borderRadius: '0.75rem',
                          borderColor: '#e2e8f0',
                          backgroundColor: '#f8fafc',
                          boxShadow: 'none'
                        })
                      }}
                    />
                  </div>
                )}
              </div>

              {user?.role === 'SINH_VIEN' && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Mã Sinh Viên</label>
                  <div className="relative opacity-70">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <CreditCard size={18} />
                    </div>
                    <input
                      type="text"
                      name="msv"
                      disabled
                      value={formData.msv}
                      className="pl-10 w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium cursor-not-allowed"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              {success && (
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg font-bold text-sm">
                  <CheckCircle size={18} /> Cập nhật thành công!
                </div>
              )}
              <div className="ml-auto">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all disabled:opacity-50"
                >
                  <Save size={18} /> {loading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
