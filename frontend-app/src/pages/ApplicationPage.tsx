import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Plus, ChevronRight, CheckCircle, XCircle, Clock, ArrowRight } from 'lucide-react';

const FLOW_STEPS = [
  { key: 'DANG_TAO', label: 'Đang tạo', color: '#94a3b8' },
  { key: 'CHO_DUYET_TRUONG', label: 'Chờ Trường duyệt', color: '#f59e0b' },
  { key: 'DAT_TRUONG', label: 'Đạt cấp Trường', color: '#10b981' },
  { key: 'CHO_DUYET_TINH', label: 'Chờ Tỉnh duyệt', color: '#3b82f6' },
  { key: 'DAT_TINH', label: 'Đạt cấp Tỉnh', color: '#6366f1' },
  { key: 'CHO_DUYET_TW', label: 'Chờ TW duyệt', color: '#8b5cf6' },
  { key: 'DAT_SV5T', label: '🏆 Đạt SV5T', color: '#f59e0b' },
];

const AI_FLAG: Record<string, { label: string; color: string }> = {
  XANH: { label: '🟢 Cờ Xanh — Đủ điều kiện', color: 'bg-green-50 text-green-700 border-green-200' },
  VANG: { label: '🟡 Cờ Vàng — Cần bổ sung', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  DO: { label: '🔴 Cờ Đỏ — Thiếu minh chứng', color: 'bg-red-50 text-red-700 border-red-200' },
};

const STATUS_ICON: Record<string, React.ReactNode> = {
  DANG_TAO: <Clock size={15} className="text-slate-400" />,
  CHO_DUYET_TRUONG: <Clock size={15} className="text-amber-500" />,
  DAT_TRUONG: <CheckCircle size={15} className="text-green-500" />,
  CHO_DUYET_TINH: <Clock size={15} className="text-blue-500" />,
  DAT_TINH: <CheckCircle size={15} className="text-indigo-500" />,
  CHO_DUYET_TW: <Clock size={15} className="text-purple-500" />,
  DAT_SV5T: <CheckCircle size={15} className="text-amber-500" />,
  BI_TU_CHOI: <XCircle size={15} className="text-red-500" />,
};

import { useOutletContext } from 'react-router-dom';

export default function ApplicationPage() {
  const { isRole } = useAuth();
  const { refreshTrigger } = useOutletContext<{ refreshTrigger: number }>();
  const [myApps, setMyApps] = useState<any[]>([]);
  const [pendingApps, setPendingApps] = useState<any[]>([]);
  const [quyChes, setQuyChes] = useState<any[]>([]);
  const [proofs, setProofs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedQuyche, setSelectedQuyche] = useState('');
  const [selectedProofs, setSelectedProofs] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [reviewAction, setReviewAction] = useState<{ id: string; action: string } | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<string[]>([]);
  const [view, setView] = useState<'my' | 'pending'>('my');

  const isStaff = isRole('CB_TRUONG', 'CB_TINH', 'CB_TW', 'ADMIN');
  const isSV = isRole('SINH_VIEN');

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [qcRes] = await Promise.all([api.get('/applications/quy-ches')]);
      setQuyChes(qcRes.data || []);

      if (isSV) {
        const [myRes, proofsRes] = await Promise.all([
          api.get('/applications/my'),
          api.get('/proofs/me'),
        ]);
        setMyApps(myRes.data || []);
        setProofs((proofsRes.data || []).filter((p: any) => p.trang_thai === 'DA_DUYET'));
      }
      if (isStaff) {
        const pendingRes = await api.get('/applications/pending');
        setPendingApps(pendingRes.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);
  useEffect(() => { if (refreshTrigger > 0) fetchAll(); }, [refreshTrigger]);

  const handleCreate = async () => {
    if (!selectedQuyche) { alert('Vui lòng chọn quy chế'); return; }
    setSubmitting(true);
    try {
      await api.post('/applications', { quy_che_id: selectedQuyche, minh_chung_ids: selectedProofs });
      setShowCreate(false);
      fetchAll();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Lỗi tạo hồ sơ');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (id: string) => {
    if (!confirm('Sau khi nộp, hồ sơ sẽ bị KHÓA và không thể chỉnh sửa. Bạn có chắc?')) return;
    try {
      await api.put(`/applications/${id}/submit`);
      fetchAll();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Lỗi nộp hồ sơ');
    }
  };

  const handleReview = async (id: string, trangThai: string) => {
    setSubmitting(true);
    try {
      await api.put(`/applications/${id}/review`, { trang_thai: trangThai });
      setReviewAction(null);
      fetchAll();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Lỗi duyệt hồ sơ');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBatchEscalate = async () => {
    if (selectedBatch.length === 0) { alert('Chọn ít nhất 1 hồ sơ'); return; }
    if (!confirm(`Trình tuyến trên ${selectedBatch.length} hồ sơ đã chọn?`)) return;
    setSubmitting(true);
    try {
      await api.post('/applications/batch-escalate', { appIds: selectedBatch });
      setSelectedBatch([]);
      fetchAll();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Lỗi trình tuyến');
    } finally {
      setSubmitting(false);
    }
  };

  const stateIndex = (state: string) => FLOW_STEPS.findIndex(s => s.key === state);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Hồ Sơ SV5T</h2>
          <p className="text-slate-500 mt-1">Quản lý hồ sơ xét danh hiệu Sinh viên 5 Tốt</p>
        </div>
        <div className="flex gap-2">
          {isSV && !myApps.length && (
            <button onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 transition-all">
              <Plus size={16} /> Tạo hồ sơ
            </button>
          )}
          {isStaff && selectedBatch.length > 0 && (
            <button onClick={handleBatchEscalate} disabled={submitting}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all">
              <ArrowRight size={16} /> Trình tuyến trên ({selectedBatch.length})
            </button>
          )}
        </div>
      </div>

      {/* View toggle for staff */}
      {isStaff && (
        <div className="flex gap-2">
          {[['my', 'Hồ sơ của tôi'], ['pending', `Chờ duyệt (${pendingApps.length})`]].map(([val, label]) => (
            <button key={val} onClick={() => setView(val as any)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${view === val ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`}>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* State Machine Visual */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 overflow-x-auto">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Luồng xét duyệt phân cấp</p>
        <div className="flex items-center gap-1 min-w-max">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.key} className="flex items-center gap-1">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                  style={{ borderColor: step.color, color: step.color }}>
                  {i + 1}
                </div>
                <p className="text-xs text-slate-500 mt-1 text-center max-w-[72px] leading-tight">{step.label}</p>
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <ArrowRight size={12} className="text-slate-300 mb-5 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Tạo Hồ Sơ SV5T Mới</h3>
              <button onClick={() => setShowCreate(false)} className="text-slate-400 hover:text-slate-600 text-xl">×</button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Chọn Quy chế xét danh hiệu *</label>
                <div className="space-y-2">
                  {quyChes.map(qc => (
                    <button key={qc.id} onClick={() => setSelectedQuyche(qc.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${selectedQuyche === qc.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}>
                      <p className="font-medium text-slate-800 text-sm">{qc.don_vi?.ten_don_vi} — Năm học {qc.nam_hoc}</p>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        {(qc.tieu_chis || []).map((t: any) => (
                          <span key={t.id} className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t.ten_tieu_chi}</span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Hạn nộp: {new Date(qc.ngay_dong_cong).toLocaleDateString('vi-VN')}</p>
                    </button>
                  ))}
                  {!quyChes.length && <p className="text-slate-400 text-sm text-center py-4">Chưa có quy chế nào được cấu hình</p>}
                </div>
              </div>

              {proofs.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Gắn Minh chứng đã duyệt ({selectedProofs.length} đã chọn)</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {proofs.map(p => (
                      <label key={p.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedProofs.includes(p.id) ? 'border-green-400 bg-green-50' : 'border-slate-200 hover:border-green-300'}`}>
                        <input type="checkbox" checked={selectedProofs.includes(p.id)}
                          onChange={e => setSelectedProofs(prev => e.target.checked ? [...prev, p.id] : prev.filter(id => id !== p.id))}
                          className="rounded" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-700 truncate">{p.file_url?.split('/').pop()}</p>
                          {p.tieu_chi && <p className="text-xs text-slate-400">{p.tieu_chi.ten_tieu_chi}</p>}
                        </div>
                        <CheckCircle size={15} className={selectedProofs.includes(p.id) ? 'text-green-500 flex-shrink-0' : 'text-slate-200 flex-shrink-0'} />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowCreate(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm hover:bg-slate-50">Hủy</button>
                <button onClick={handleCreate} disabled={submitting || !selectedQuyche}
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50">
                  {submitting ? 'Đang tạo...' : 'Tạo hồ sơ'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewAction && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="font-bold text-slate-800 mb-4">
              {reviewAction.action === 'APPROVE' ? '✅ Xác nhận duyệt hồ sơ' : '❌ Từ chối hồ sơ'}
            </h3>
            <p className="text-sm text-slate-500 mb-5">Quyết định này <strong>không thể hoàn tác</strong>. Bạn có chắc chắn?</p>
            <div className="flex gap-3">
              <button onClick={() => setReviewAction(null)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm">Hủy</button>
              <button disabled={submitting}
                onClick={() => {
                  const nextState = reviewAction.action === 'APPROVE'
                    ? (pendingApps.find(a => a.id === reviewAction.id)?.trang_thai === 'CHO_DUYET_TRUONG' ? 'DAT_TRUONG'
                      : pendingApps.find(a => a.id === reviewAction.id)?.trang_thai === 'CHO_DUYET_TINH' ? 'DAT_TINH'
                      : 'DAT_SV5T')
                    : 'BI_TU_CHOI';
                  handleReview(reviewAction.id, nextState);
                }}
                className={`flex-1 py-2.5 text-white rounded-xl text-sm font-medium disabled:opacity-50 ${reviewAction.action === 'APPROVE' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'}`}>
                {submitting ? 'Đang xử lý...' : reviewAction.action === 'APPROVE' ? 'Xác nhận duyệt' : 'Từ chối'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {/* SINH VIEN: My applications */}
          {isSV && (myApps.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-slate-600 font-medium text-lg">Bạn chưa có hồ sơ SV5T</p>
              <p className="text-slate-400 text-sm mt-1">Hãy tích lũy minh chứng và tạo hồ sơ để tham gia xét danh hiệu</p>
              <button onClick={() => setShowCreate(true)}
                className="mt-5 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all">
                Tạo hồ sơ ngay
              </button>
            </div>
          ) : (
            myApps.map(app => {
              const si = stateIndex(app.trang_thai);
              return (
                <div key={app.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        {STATUS_ICON[app.trang_thai]}
                        <h3 className="font-semibold text-slate-800">
                          {app.quy_che?.don_vi?.ten_don_vi} — {app.quy_che?.nam_hoc}
                        </h3>
                      </div>
                      {app.ai_flag && (
                        <span className={`inline-block text-xs mt-2 px-3 py-1 rounded-xl border font-medium ${AI_FLAG[app.ai_flag]?.color}`}>
                          {AI_FLAG[app.ai_flag]?.label}
                        </span>
                      )}
                    </div>
                    {app.trang_thai === 'DANG_TAO' && !app.khoa && (
                      <button onClick={() => handleSubmit(app.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 flex items-center gap-1">
                        Nộp hồ sơ <ChevronRight size={14} />
                      </button>
                    )}
                    {app.khoa && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-lg">🔒 Đã khóa</span>}
                  </div>

                  {/* Progress bar */}
                  <div className="flex items-center gap-1 flex-wrap">
                    {FLOW_STEPS.map((step, i) => (
                      <div key={step.key} className="flex items-center gap-1">
                        <div className={`h-1.5 rounded-full transition-all ${i <= si ? 'w-8' : 'w-6 opacity-30'}`}
                          style={{ backgroundColor: i <= si ? step.color : '#e2e8f0' }} />
                      </div>
                    ))}
                    <span className="text-xs text-slate-500 ml-1">{FLOW_STEPS[si]?.label}</span>
                  </div>

                  {app.ghi_chu_ai && (
                    <p className="text-xs text-slate-500 mt-3 bg-slate-50 px-3 py-2 rounded-lg">💡 {app.ghi_chu_ai}</p>
                  )}

                  <div className="mt-3 text-xs text-slate-400">
                    {app.minh_chungs?.length || 0} minh chứng đính kèm
                    {app.ngay_nop && <span className="ml-2">· Ngày nộp: {new Date(app.ngay_nop).toLocaleDateString('vi-VN')}</span>}
                  </div>
                </div>
              );
            })
          ))}

          {/* STAFF: Pending applications */}
          {isStaff && view === 'pending' && (pendingApps.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle size={40} className="text-green-400 mx-auto mb-3" />
              <p className="text-slate-500">Không có hồ sơ nào chờ duyệt</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Batch select bar */}
              <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3">
                <label className="flex items-center gap-2 text-sm text-indigo-700 cursor-pointer">
                  <input type="checkbox"
                    checked={selectedBatch.length === pendingApps.filter(a => a.trang_thai.startsWith('DAT')).length && selectedBatch.length > 0}
                    onChange={e => setSelectedBatch(e.target.checked ? pendingApps.filter(a => a.trang_thai.startsWith('DAT')).map((a: any) => a.id) : [])}
                    className="rounded" />
                  Chọn tất cả hồ sơ đã duyệt để trình tuyến trên
                </label>
                <span className="text-xs text-indigo-500 font-medium">Đã chọn: {selectedBatch.length}</span>
              </div>

              {pendingApps.map(app => {
                const canSelect = app.trang_thai.startsWith('DAT');
                return (
                  <div key={app.id} className={`bg-white rounded-2xl border shadow-sm p-5 ${selectedBatch.includes(app.id) ? 'border-indigo-300' : 'border-slate-100'}`}>
                    <div className="flex items-start gap-3">
                      {canSelect && (
                        <input type="checkbox" checked={selectedBatch.includes(app.id)}
                          onChange={e => setSelectedBatch(prev => e.target.checked ? [...prev, app.id] : prev.filter(id => id !== app.id))}
                          className="mt-1 rounded" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          {STATUS_ICON[app.trang_thai]}
                          <p className="font-semibold text-slate-800">{app.nguoi_dung?.ho_ten}</p>
                          <span className="text-xs text-slate-400">{app.nguoi_dung?.msv}</span>
                          {app.ai_flag && (
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${AI_FLAG[app.ai_flag]?.color}`}>
                              {app.ai_flag === 'XANH' ? '🟢' : app.ai_flag === 'VANG' ? '🟡' : '🔴'} {app.ai_flag}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">{app.quy_che?.don_vi?.ten_don_vi} — {app.quy_che?.nam_hoc}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{app.minh_chungs?.length || 0} minh chứng · Nộp: {app.ngay_nop ? new Date(app.ngay_nop).toLocaleDateString('vi-VN') : '—'}</p>
                      </div>
                      {app.trang_thai.startsWith('CHO') && (
                        <div className="flex gap-2">
                          <button onClick={() => setReviewAction({ id: app.id, action: 'APPROVE' })}
                            className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-xl hover:bg-green-100 text-xs font-medium">✅ Duyệt</button>
                          <button onClick={() => setReviewAction({ id: app.id, action: 'REJECT' })}
                            className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-xl hover:bg-red-100 text-xs font-medium">❌ Từ chối</button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
