import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Calendar, Save, ShieldAlert, PlusCircle, CheckCircle } from 'lucide-react';

const CRITERIA_NAMES = ['Học tập tốt', 'Đạo đức tốt', 'Thể lực tốt', 'Tình nguyện tốt', 'Hội nhập tốt'];

export default function RulesManagement() {
  const { isRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const [namHoc, setNamHoc] = useState('2025-2026');
  const [ngayMoCong, setNgayMoCong] = useState('2025-09-01T00:00');
  const [ngayDongCong, setNgayDongCong] = useState('2026-10-15T23:59');
  const [tieuChis, setTieuChis] = useState(
    CRITERIA_NAMES.map((name, i) => ({
      ten_tieu_chi: name,
      thu_tu: i + 1,
      so_luong_yeu_cau: name === 'Học tập tốt' ? 2 : name === 'Tình nguyện tốt' ? 1 : 3,
      mo_ta: ''
    }))
  );

  useEffect(() => {
    // Load current active rules
    api.get('/applications/quy-ches').then(res => {
      const latest = res.data[0];
      if (latest) {
        setNamHoc(latest.nam_hoc);
        setNgayMoCong(new Date(latest.ngay_mo_cong).toISOString().slice(0, 16));
        setNgayDongCong(new Date(latest.ngay_dong_cong).toISOString().slice(0, 16));
        if (latest.tieu_chis && latest.tieu_chis.length > 0) {
          setTieuChis(latest.tieu_chis.sort((a: any, b: any) => a.thu_tu - b.thu_tu));
        }
      }
    }).catch(console.error);
  }, []);

  if (!isRole('CB_TRUONG', 'ADMIN')) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShieldAlert size={48} className="text-slate-300 mb-4" />
        <h3 className="text-lg font-semibold text-slate-600">Không có quyền truy cập</h3>
        <p className="text-slate-400 text-sm mt-1">Trang này chỉ dành cho Admin và Cán bộ Trường</p>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      const processedTieuChis = await Promise.all(tieuChis.map(async (tc) => {
        try {
          const aiRes = await api.post('/ai/extract-criteria', { text: tc.mo_ta });
          return { ...tc, so_luong_yeu_cau: aiRes.data.count };
        } catch (e) {
          console.error('AI Error for', tc.ten_tieu_chi, e);
          return { ...tc, so_luong_yeu_cau: 1 }; // Fallback
        }
      }));

      await api.post('/applications/quy-ches', {
        nam_hoc: namHoc,
        ngay_mo_cong: new Date(ngayMoCong).toISOString(),
        ngay_dong_cong: new Date(ngayDongCong).toISOString(),
        tieu_chis: processedTieuChis
      });
      setSuccess('Đã lưu quy chế thành công! AI đã tự động bóc tách số lượng minh chứng cần thiết.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi lưu quy chế.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <BookOpen className="text-indigo-600" /> Quản lý Quy chế SV5T
        </h2>
        <p className="text-slate-500 mt-1">Thiết lập thời hạn và cập nhật chi tiết các tiêu chí để sinh viên và Chatbot AI nắm rõ.</p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl font-medium flex items-center gap-2">
          <CheckCircle size={20} /> {success}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl font-medium flex items-center gap-2">
          <ShieldAlert size={20} /> {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Calendar size={18} className="text-indigo-500" /> Cấu hình Thời gian
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Năm học áp dụng</label>
              <input type="text" value={namHoc} onChange={e => setNamHoc(e.target.value)} required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 font-medium text-slate-800" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Mở cổng đăng ký</label>
              <input type="datetime-local" value={ngayMoCong} onChange={e => setNgayMoCong(e.target.value)} required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 font-medium text-slate-800" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Đóng cổng đăng ký (Hạn chót)</label>
              <input type="datetime-local" value={ngayDongCong} onChange={e => setNgayDongCong(e.target.value)} required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 font-medium text-slate-800" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            <PlusCircle size={18} className="text-indigo-500" /> Thiết lập 5 Tiêu chí
          </h3>
          <p className="text-sm text-slate-500">Nội dung này sẽ hiển thị ở màn hình Hồ sơ của sinh viên và là nguồn dữ liệu chính cho Chatbot AI tư vấn.</p>

          <div className="space-y-6 mt-4">
            {tieuChis.map((tc, index) => (
              <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-slate-800 text-base">{tc.thu_tu}. Tiêu chí {tc.ten_tieu_chi}</h4>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="md:col-span-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Mô tả điều kiện (Bê nguyên quy chế vào đây, AI sẽ tự động phân tích)</label>
                      <textarea 
                        value={tc.mo_ta} 
                        onChange={e => {
                          const newArr = [...tieuChis];
                          newArr[index].mo_ta = e.target.value;
                          setTieuChis(newArr);
                        }} 
                        required rows={4}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 text-sm font-medium text-slate-700 whitespace-pre-line"
                        placeholder="Ví dụ: - Điểm trung bình >= 3.2/4.0..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-lg shadow-indigo-600/20">
            <Save size={20} />
            {loading ? 'AI đang phân tích & Lưu...' : 'Lưu & Cập nhật Hệ thống'}
          </button>
        </div>
      </form>
    </div>
  );
}
