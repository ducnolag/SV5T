import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Check, X, Calendar, MapPin, Users } from 'lucide-react';

interface Activity {
  id: string;
  ten_hoat_dong: string;
  don_vi_tc_id: string;
  thoi_gian_bat_dau: string;
  thoi_gian_ket_thuc: string;
  dia_diem: string;
  hinh_thuc_dd: string;
  trang_thai: string;
  tieu_chis: { ten_tieu_chi: string }[];
  don_vi_tc?: { ten_don_vi: string };
  ly_do_tu_choi?: string;
}

interface TieuChi {
  id: string;
  ten_tieu_chi: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  CHO_DUYET: { label: 'Chờ duyệt', color: 'bg-amber-100 text-amber-700' },
  DA_DUYET: { label: 'Đã duyệt', color: 'bg-green-100 text-green-700' },
  TU_CHOI: { label: 'Từ chối', color: 'bg-red-100 text-red-700' },
};

const HINH_THUC: Record<string, string> = {
  CAMERA: '📷 Camera vnFace',
  EXCEL: '📋 Danh sách Excel',
  KET_HOP: '🔀 Kết hợp',
};

import { useOutletContext } from 'react-router-dom';

export default function ActivityPage() {
  const { isRole } = useAuth();
  const { refreshTrigger } = useOutletContext<{ refreshTrigger: number }>();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [tieuChis, setTieuChis] = useState<TieuChi[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('ALL');
  const [form, setForm] = useState({
    ten_hoat_dong: '', don_vi_tc_id: '', dia_diem: '',
    thoi_gian_bat_dau: '', thoi_gian_ket_thuc: '',
    hinh_thuc_dd: 'CAMERA', tieu_chi_id: '',
  });
  const [reviewModal, setReviewModal] = useState<{ id: string; action: 'duyet' | 'tuchoi' } | null>(null);
  const [lyDo, setLyDo] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const canCreate = isRole('CB_TRUONG', 'CB_TINH', 'CB_TW', 'LCH_CLB', 'ADMIN');
  const canApprove = isRole('CB_TRUONG', 'CB_TINH', 'CB_TW', 'ADMIN');

  const fetch = async () => {
    setLoading(true);
    try {
      const [actRes, unitRes] = await Promise.all([
        api.get('/activities'),
        api.get('/units'),
      ]);
      setActivities(actRes.data || []);
      setUnits(unitRes.data || []);
      // Try to get criteria from applications/quy-ches
      const qcRes = await api.get('/applications/quy-ches').catch(() => ({ data: [] }));
      const tcs = (qcRes.data || []).flatMap((qc: any) => qc.tieu_chis || []);
      setTieuChis(tcs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);
  useEffect(() => { if (refreshTrigger > 0) fetch(); }, [refreshTrigger]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/activities', form);
      setShowForm(false);
      setForm({ ten_hoat_dong: '', don_vi_tc_id: '', dia_diem: '', thoi_gian_bat_dau: '', thoi_gian_ket_thuc: '', hinh_thuc_dd: 'CAMERA', tieu_chi_id: '' });
      fetch();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Lỗi tạo hoạt động');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReview = async (id: string, trangThai: string, lyDoTuChoi?: string) => {
    setSubmitting(true);
    try {
      await api.put(`/activities/${id}/approve`, { trang_thai: trangThai, ly_do_tu_choi: lyDoTuChoi });
      setReviewModal(null);
      fetch();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Lỗi cập nhật trạng thái');
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = filter === 'ALL' ? activities : activities.filter(a => a.trang_thai === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Hoạt Động Phong Trào</h2>
          <p className="text-slate-500 mt-1">Quản lý và tham gia các hoạt động SV5T</p>
        </div>
        {canCreate && (
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 font-medium text-sm">
            <Plus size={16} /> Tạo hoạt động
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[['ALL', 'Tất cả'], ['CHO_DUYET', 'Chờ duyệt'], ['DA_DUYET', 'Đã duyệt'], ['TU_CHOI', 'Từ chối']].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === val ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
            }`}>{label} {val === 'ALL' ? `(${activities.length})` : `(${activities.filter(a => a.trang_thai === val).length})`}
          </button>
        ))}
      </div>

      {/* Create Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Tạo hoạt động mới</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tên hoạt động *</label>
                <input required value={form.ten_hoat_dong} onChange={e => setForm({ ...form, ten_hoat_dong: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="VD: Hội thảo Kỹ năng mềm..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Đơn vị tổ chức *</label>
                <select required value={form.don_vi_tc_id} onChange={e => setForm({ ...form, don_vi_tc_id: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400">
                  <option value="">-- Chọn đơn vị --</option>
                  {units.map(u => <option key={u.id} value={u.id}>{u.ten_don_vi}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tiêu chí SV5T liên quan</label>
                <select value={form.tieu_chi_id} onChange={e => setForm({ ...form, tieu_chi_id: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400">
                  <option value="">-- Chọn tiêu chí --</option>
                  {tieuChis.map(t => <option key={t.id} value={t.id}>{t.ten_tieu_chi}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Địa điểm</label>
                <input value={form.dia_diem} onChange={e => setForm({ ...form, dia_diem: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400"
                  placeholder="VD: Hội trường A, tầng 3..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Bắt đầu *</label>
                  <input required type="datetime-local" value={form.thoi_gian_bat_dau} onChange={e => setForm({ ...form, thoi_gian_bat_dau: e.target.value })}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kết thúc *</label>
                  <input required type="datetime-local" value={form.thoi_gian_ket_thuc} onChange={e => setForm({ ...form, thoi_gian_ket_thuc: e.target.value })}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hình thức điểm danh *</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(HINH_THUC).map(([val, label]) => (
                    <button type="button" key={val} onClick={() => setForm({ ...form, hinh_thuc_dd: val })}
                      className={`py-2 px-2 rounded-xl border text-xs font-medium transition-all text-center ${
                        form.hinh_thuc_dd === val ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-blue-300'
                      }`}>{label}</button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium text-sm">Hủy</button>
                <button type="submit" disabled={submitting}
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm disabled:opacity-50">
                  {submitting ? 'Đang tạo...' : 'Tạo hoạt động'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {reviewModal.action === 'duyet' ? '✅ Xác nhận duyệt hoạt động' : '❌ Từ chối hoạt động'}
            </h3>
            {reviewModal.action === 'tuchoi' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Lý do từ chối *</label>
                <textarea value={lyDo} onChange={e => setLyDo(e.target.value)} rows={3}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-400"
                  placeholder="Nhập lý do từ chối..." />
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => { setReviewModal(null); setLyDo(''); }}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 text-sm font-medium">Hủy</button>
              <button disabled={submitting || (reviewModal.action === 'tuchoi' && !lyDo)}
                onClick={() => handleReview(reviewModal.id, reviewModal.action === 'duyet' ? 'DA_DUYET' : 'TU_CHOI', lyDo)}
                className={`flex-1 py-2.5 text-white rounded-xl font-medium text-sm disabled:opacity-50 ${reviewModal.action === 'duyet' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>
                {submitting ? 'Đang xử lý...' : reviewModal.action === 'duyet' ? 'Xác nhận duyệt' : 'Từ chối'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activity List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📅</div>
          <p className="text-slate-500 font-medium">Chưa có hoạt động nào</p>
          {canCreate && <p className="text-slate-400 text-sm mt-1">Nhấn "Tạo hoạt động" để bắt đầu</p>}
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map(act => {
            const statusCfg = STATUS_CONFIG[act.trang_thai] || { label: act.trang_thai, color: 'bg-slate-100 text-slate-600' };
            const start = new Date(act.thoi_gian_bat_dau);
            return (
              <div key={act.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-semibold text-slate-800">{act.ten_hoat_dong}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusCfg.color}`}>{statusCfg.label}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {start.toLocaleDateString('vi-VN')} {start.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                      {act.dia_diem && <span className="flex items-center gap-1"><MapPin size={12} /> {act.dia_diem}</span>}
                      <span className="flex items-center gap-1"><Users size={12} /> {HINH_THUC[act.hinh_thuc_dd] || act.hinh_thuc_dd}</span>
                      {act.don_vi_tc && <span>🏛 {act.don_vi_tc.ten_don_vi}</span>}
                    </div>
                    {act.tieu_chis?.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {act.tieu_chis.map(t => (
                          <span key={t.ten_tieu_chi} className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full">{t.ten_tieu_chi}</span>
                        ))}
                      </div>
                    )}
                    {act.ly_do_tu_choi && (
                      <p className="text-xs text-red-500 mt-2 bg-red-50 px-3 py-1.5 rounded-lg">❌ Lý do: {act.ly_do_tu_choi}</p>
                    )}
                  </div>

                  {/* Actions */}
                  {canApprove && act.trang_thai === 'CHO_DUYET' && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => setReviewModal({ id: act.id, action: 'duyet' })}
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-xl hover:bg-green-100 text-xs font-medium transition-colors">
                        <Check size={13} /> Duyệt
                      </button>
                      <button onClick={() => setReviewModal({ id: act.id, action: 'tuchoi' })}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-xl hover:bg-red-100 text-xs font-medium transition-colors">
                        <X size={13} /> Từ chối
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
