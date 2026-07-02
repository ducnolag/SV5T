import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Upload, CheckCircle, XCircle, Clock, AlertCircle, FileText, Eye, X } from 'lucide-react';

interface Proof {
  id: string;
  loai: string;
  file_url: string;
  trang_thai: string;
  ai_xac_thuc_muc_do?: number;
  ly_do_loai?: string;
  created_at: string;
  tieu_chi?: { ten_tieu_chi: string };
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  DANG_XL: { label: 'Đang xử lý OCR', color: 'bg-blue-100 text-blue-700', icon: <Clock size={13} /> },
  DA_XAC_THUC: { label: 'Đã xác thực sơ bộ', color: 'bg-indigo-100 text-indigo-700', icon: <CheckCircle size={13} /> },
  CAN_KIEM_TRA: { label: 'Cần kiểm tra', color: 'bg-amber-100 text-amber-700', icon: <AlertCircle size={13} /> },
  DA_DUYET: { label: 'Đã duyệt', color: 'bg-green-100 text-green-700', icon: <CheckCircle size={13} /> },
  BI_LOAI: { label: 'Bị loại', color: 'bg-red-100 text-red-700', icon: <XCircle size={13} /> },
};

interface OcrResult {
  extractedData: { ho_ten: string; loai_chung_chi: string; ngay_cap: string };
  confidenceScore: number;
  suggestedCriteria: string;
}

export default function ProofPage() {
  const { isRole } = useAuth();
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [tieuChis, setTieuChis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTieuChi, setSelectedTieuChi] = useState('');
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);
  const [reviewModal, setReviewModal] = useState<{ proof: Proof } | null>(null);
  const [lyDo, setLyDo] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const canApprove = isRole('CB_TRUONG', 'CB_TINH', 'ADMIN');

  const fetchProofs = async () => {
    setLoading(true);
    try {
      const [pRes, qcRes] = await Promise.all([
        api.get('/proofs/me'),
        api.get('/applications/quy-ches').catch(() => ({ data: [] })),
      ]);
      setProofs(pRes.data || []);
      const tcs = (qcRes.data || []).flatMap((qc: any) => qc.tieu_chis || []);
      setTieuChis(tcs);
    } catch {
      setProofs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProofs(); }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setOcrResult(null);
    // Call OCR preview
    try {
      const res = await api.post('/ai/ocr', { imageUrl: file.name });
      setOcrResult(res.data);
      if (res.data.suggestedCriteria && tieuChis.length > 0) {
        const matched = tieuChis.find(t => t.ten_tieu_chi.includes(res.data.suggestedCriteria.split(' ')[0]));
        if (matched) setSelectedTieuChi(matched.id);
      }
    } catch {
      // OCR failed silently
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('tieu_chi_id', selectedTieuChi);
      await api.post('/proofs/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSelectedFile(null);
      setOcrResult(null);
      setSelectedTieuChi('');
      if (fileRef.current) fileRef.current.value = '';
      fetchProofs();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Lỗi upload minh chứng');
    } finally {
      setUploading(false);
    }
  };

  const handleReview = async (id: string, trangThai: string) => {
    setSubmitting(true);
    try {
      await api.put(`/proofs/${id}/review`, { trang_thai: trangThai, ly_do_loai: lyDo });
      setReviewModal(null);
      setLyDo('');
      fetchProofs();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Lỗi duyệt minh chứng');
    } finally {
      setSubmitting(false);
    }
  };

  const grouped = {
    pending: proofs.filter(p => ['DANG_XL', 'CAN_KIEM_TRA'].includes(p.trang_thai)),
    approved: proofs.filter(p => p.trang_thai === 'DA_DUYET'),
    rejected: proofs.filter(p => p.trang_thai === 'BI_LOAI'),
    verified: proofs.filter(p => p.trang_thai === 'DA_XAC_THUC'),
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Minh Chứng SV5T</h2>
        <p className="text-slate-500 mt-1">Upload giấy khen, chứng chỉ — AI OCR tự động bóc tách</p>
      </div>

      {/* Upload Zone */}
      {!canApprove && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-6 hover:border-blue-400 transition-colors">
          <div className="text-center">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Upload size={24} className="text-blue-500" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Upload Minh Chứng</h3>
            <p className="text-xs text-slate-500 mb-4">Hỗ trợ PDF, JPG, PNG. VNPT SmartReader sẽ tự động OCR.</p>
            <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFileSelect} />
            {!selectedFile ? (
              <button onClick={() => fileRef.current?.click()}
                className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                Chọn file
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 text-left">
                  <FileText size={20} className="text-blue-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{selectedFile.name}</p>
                    <p className="text-xs text-slate-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button onClick={() => { setSelectedFile(null); setOcrResult(null); if (fileRef.current) fileRef.current.value = ''; }}
                    className="ml-auto text-slate-400 hover:text-red-500">
                    <X size={16} />
                  </button>
                </div>

                {/* OCR Result */}
                {ocrResult && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={15} className="text-green-600" />
                      <p className="text-sm font-semibold text-green-800">AI OCR hoàn tất (SmartReader)</p>
                      <span className="ml-auto text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                        {Math.round(ocrResult.confidenceScore * 100)}% chính xác
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-green-700">
                      <p>👤 {ocrResult.extractedData.ho_ten}</p>
                      <p>📄 {ocrResult.extractedData.loai_chung_chi}</p>
                      <p>📅 Ngày cấp: {ocrResult.extractedData.ngay_cap}</p>
                      <p>✨ Gợi ý tiêu chí: <strong>{ocrResult.suggestedCriteria}</strong></p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 text-left">Tiêu chí SV5T liên quan</label>
                  <select value={selectedTieuChi} onChange={e => setSelectedTieuChi(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400">
                    <option value="">-- Hệ thống tự động phân loại --</option>
                    {tieuChis.map(t => <option key={t.id} value={t.id}>{t.ten_tieu_chi}</option>)}
                  </select>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => { setSelectedFile(null); setOcrResult(null); }}
                    className="flex-1 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm hover:bg-slate-50">Hủy</button>
                  <button onClick={handleUpload} disabled={uploading}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
                    {uploading ? 'Đang upload...' : 'Xác nhận & Upload'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Xét duyệt minh chứng</h3>
            <p className="text-sm text-slate-600 mb-4">File: <strong>{reviewModal.proof.file_url?.split('/').pop()}</strong></p>
            {reviewModal.proof.trang_thai === 'CAN_KIEM_TRA' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Lý do loại (nếu từ chối)</label>
                <textarea value={lyDo} onChange={e => setLyDo(e.target.value)} rows={3}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-400"
                  placeholder="Nhập lý do loại..." />
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => { setReviewModal(null); setLyDo(''); }}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm">Hủy</button>
              <button disabled={submitting} onClick={() => handleReview(reviewModal.proof.id, 'BI_LOAI')}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium disabled:opacity-50">Loại</button>
              <button disabled={submitting} onClick={() => handleReview(reviewModal.proof.id, 'DA_DUYET')}
                className="flex-1 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium disabled:opacity-50">Duyệt</button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Đã duyệt', count: grouped.approved.length, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
          { label: 'Chờ xử lý', count: grouped.pending.length, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
          { label: 'Đã xác thực', count: grouped.verified.length, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
          { label: 'Bị loại', count: grouped.rejected.length, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-4 text-center`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Proof List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : proofs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">📄</div>
          <p className="text-slate-500">Chưa có minh chứng nào được upload</p>
        </div>
      ) : (
        <div className="space-y-3">
          {proofs.map(proof => {
            const cfg = STATUS_CONFIG[proof.trang_thai] || { label: proof.trang_thai, color: 'bg-slate-100 text-slate-600', icon: null };
            return (
              <div key={proof.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText size={18} className="text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{proof.file_url?.split('/').pop()}</p>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${cfg.color}`}>
                      {cfg.icon} {cfg.label}
                    </span>
                    {proof.tieu_chi && (
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{proof.tieu_chi.ten_tieu_chi}</span>
                    )}
                    {proof.ai_xac_thuc_muc_do && (
                      <span className="text-xs text-slate-400">AI: {proof.ai_xac_thuc_muc_do}% chính xác</span>
                    )}
                  </div>
                  {proof.ly_do_loai && <p className="text-xs text-red-500 mt-1">❌ {proof.ly_do_loai}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-slate-400 whitespace-nowrap">{new Date(proof.created_at).toLocaleDateString('vi-VN')}</p>
                  {canApprove && ['CAN_KIEM_TRA', 'DA_XAC_THUC'].includes(proof.trang_thai) && (
                    <button onClick={() => setReviewModal({ proof })}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
                      <Eye size={14} />
                    </button>
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
