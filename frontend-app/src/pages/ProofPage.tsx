import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { UploadCloud, CheckCircle, XCircle, FileText, X, Sparkles, ChevronRight, ShieldAlert, Building2 } from 'lucide-react';

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

interface OcrResult {
  extractedData: { ho_ten: string; loai_chung_chi: string; ngay_cap: string; don_vi_cap: string };
  confidenceScore: number;
  suggestedCriteria: string;
  isValid: boolean;
  message: string;
}

export default function ProofPage() {
  const { user } = useAuth();
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [tieuChis, setTieuChis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTieuChi, setSelectedTieuChi] = useState('');
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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
    setOcrLoading(true);
    
    try {
      const ocrData = new FormData();
      ocrData.append('file', file);
      ocrData.append('fullName', user?.ho_ten || '');
      const res = await api.post('/ai/ocr', ocrData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setOcrResult(res.data);
      if (res.data.suggestedCriteria && tieuChis.length > 0) {
        const matched = tieuChis.find(t => t.ten_tieu_chi.trim() === res.data.suggestedCriteria.trim());
        if (matched) setSelectedTieuChi(matched.id);
      }
    } catch {
    } finally {
      setOcrLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      if (selectedTieuChi) formData.append('tieu_chi_id', selectedTieuChi);
      if (ocrResult?.isValid) formData.append('ocr_valid', 'true');
      
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

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa minh chứng này?')) return;
    try {
      await api.delete(`/proofs/${id}`);
      fetchProofs();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Lỗi khi xóa minh chứng');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="relative overflow-hidden bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-800 mb-2">Kho Minh Chứng Thông Minh</h2>
            <p className="text-slate-500 font-medium">Hệ thống AI tự động phân tích tính hợp lệ (Tên chính chủ & Đơn vị cấp) để ngăn chặn gian lận.</p>
          </div>
          <div className="hidden sm:flex items-center gap-3 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 text-indigo-700 font-bold">
            <Sparkles size={20} /> AI Anti-Fraud Active
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Upload */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white opacity-50 z-0"></div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <UploadCloud size={20} className="text-indigo-600" /> Tải lên tài liệu
              </h3>
              
              {!selectedFile ? (
                <div 
                  onClick={() => fileRef.current?.click()}
                  className="cursor-pointer border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-white/50 hover:bg-indigo-50/50 rounded-[1.5rem] h-56 flex flex-col items-center justify-center transition-all duration-300 group-hover:shadow-inner"
                >
                  <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <UploadCloud size={28} />
                  </div>
                  <span className="font-bold text-indigo-900 text-base">Kéo thả minh chứng vào đây</span>
                  <span className="text-xs text-indigo-500 mt-1 font-medium px-4 text-center">Hệ thống sẽ quét Tên & Đơn vị cấp bằng AI</span>
                  <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFileSelect} />
                </div>
              ) : (
                <div className="space-y-4 animate-in zoom-in-95 duration-300">
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-start gap-3">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                      <FileText size={24} />
                    </div>
                    <div className="flex-1 min-w-0 mt-1">
                      <p className="font-bold text-slate-800 truncate" title={selectedFile.name}>{selectedFile.name}</p>
                      <p className="text-xs text-slate-500 font-medium">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button onClick={() => { setSelectedFile(null); setOcrResult(null); if (fileRef.current) fileRef.current.value = ''; }}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <X size={18} />
                    </button>
                  </div>

                  {ocrLoading && (
                    <div className="bg-indigo-50/80 border border-indigo-100 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 animate-pulse py-8">
                      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm font-bold text-indigo-700">AI đang quét tính hợp lệ...</span>
                    </div>
                  )}

                  {ocrResult && (
                    <div className={`border rounded-2xl p-5 shadow-sm relative overflow-hidden transition-all ${ocrResult.isValid ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200' : 'bg-gradient-to-br from-rose-50 to-red-50 border-rose-200'}`}>
                      <div className="absolute -right-4 -top-4 opacity-10"><Sparkles size={100} className={ocrResult.isValid ? 'text-emerald-500' : 'text-rose-500'} /></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          {ocrResult.isValid ? <CheckCircle size={20} className="text-emerald-600" /> : <ShieldAlert size={20} className="text-rose-600" />}
                          <h4 className={`font-black ${ocrResult.isValid ? 'text-emerald-900' : 'text-rose-900'}`}>
                            {ocrResult.isValid ? 'Minh chứng hợp lệ' : 'Phát hiện rủi ro'}
                          </h4>
                        </div>
                        
                        {!ocrResult.isValid && (
                          <div className="mb-4 bg-white/60 p-2.5 rounded-xl border border-rose-100 text-rose-700 text-xs font-bold flex gap-2 items-start">
                             <XCircle size={14} className="flex-shrink-0 mt-0.5" />
                             <span>{ocrResult.message}</span>
                          </div>
                        )}

                        <div className={`space-y-2 text-sm font-medium bg-white/60 p-3 rounded-xl border ${ocrResult.isValid ? 'text-emerald-800 border-emerald-100/50' : 'text-rose-800 border-rose-100/50'}`}>
                          <p className="flex justify-between items-center"><span className="opacity-70 flex items-center gap-1"><UserIcon /> Tên:</span> <span className="font-bold">{ocrResult.extractedData.ho_ten}</span></p>
                          <p className="flex justify-between items-center"><span className="opacity-70 flex items-center gap-1"><Building2 size={12} /> Cấp bởi:</span> <span className="font-bold text-right pl-2 truncate">{ocrResult.extractedData.don_vi_cap || 'Không rõ'}</span></p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phân loại Tiêu chí (Tùy chọn)</label>
                    <select value={selectedTieuChi} onChange={e => setSelectedTieuChi(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer">
                      <option value="">-- Để trống nếu chưa rõ --</option>
                      {tieuChis.map(t => <option key={t.id} value={t.id}>{t.ten_tieu_chi}</option>)}
                    </select>
                  </div>

                  <button onClick={handleUpload} disabled={uploading}
                    className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none">
                    {uploading ? 'Đang lưu trữ...' : (ocrResult?.isValid ? 'Lưu và Tự động duyệt' : 'Lưu và Chờ cán bộ duyệt')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-slate-800">Thư viện của tôi ({proofs.length})</h3>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : proofs.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-[2rem] p-12 text-center shadow-sm">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={40} className="text-slate-300" />
              </div>
              <h4 className="text-lg font-bold text-slate-700 mb-1">Thư viện trống</h4>
              <p className="text-slate-500 font-medium">Bạn chưa lưu trữ chứng nhận nào. Kéo thả file vào khung bên trái để bắt đầu.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {proofs.map(proof => {
                const isImage = proof.file_url?.match(/\.(jpeg|jpg|gif|png)$/i) != null;
                const src = proof.file_url?.startsWith('http') ? proof.file_url : `http://localhost:3000${proof.file_url?.startsWith('/') ? '' : '/'}${proof.file_url}`;
                
                // Simplified display: either AI Verified or Warning
                const isVerified = proof.trang_thai === 'DA_XAC_THUC' || proof.trang_thai === 'DA_DUYET' || (proof.ai_xac_thuc_muc_do && proof.ai_xac_thuc_muc_do >= 80);
                
                return (
                  <div key={proof.id} className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all p-4 flex flex-col h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-4 -mt-4 opacity-50 z-0 transition-colors group-hover:bg-indigo-50"></div>
                    
                    <div className="flex items-center justify-between mb-3 relative z-10">
                      <div className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${isVerified ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                        {isVerified ? <CheckCircle size={12} /> : <ShieldAlert size={12} />}
                        {isVerified ? 'AI Xác nhận' : 'AI Cảnh báo'}
                      </div>
                    </div>
                    
                    <div className="flex-1 relative z-10">
                      {isImage ? (
                        <div className="w-full h-36 rounded-2xl bg-slate-100 mb-4 overflow-hidden border border-slate-200 group-hover:border-indigo-200 transition-colors">
                          <img src={src} alt="Proof" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      ) : (
                         <div className="w-full h-36 rounded-2xl bg-slate-50 mb-4 border border-slate-200 flex items-center justify-center">
                            <FileText size={40} className="text-slate-300" />
                         </div>
                      )}
                      <p className="font-bold text-slate-800 text-sm line-clamp-1 mb-1" title={proof.file_url?.split('/').pop()}>{proof.file_url?.split('/').pop()}</p>
                      {proof.tieu_chi ? (
                        <p className="text-xs text-indigo-600 font-semibold line-clamp-1">{proof.tieu_chi.ten_tieu_chi}</p>
                      ) : (
                        <p className="text-xs text-slate-400 font-medium">Chưa phân loại tiêu chí</p>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium relative z-10">
                      <span>{new Date(proof.created_at).toLocaleDateString('vi-VN')}</span>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setPreviewUrl(src)} className="text-indigo-500 hover:text-indigo-700 font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform cursor-pointer">
                          Mở file <ChevronRight size={14} />
                        </button>
                        <button onClick={() => handleDelete(proof.id)} className="text-rose-500 hover:text-rose-700 font-bold flex items-center gap-0.5 transition-colors cursor-pointer" title="Xóa minh chứng">
                          <X size={14} /> Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {previewUrl && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/60 p-4">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col relative animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2"><FileText size={18} /> Xem trước file</h3>
              <button onClick={() => setPreviewUrl(null)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-slate-100/50 p-6 flex items-center justify-center min-h-[500px]">
              {previewUrl.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain rounded-xl shadow-sm" />
              ) : (
                <iframe src={previewUrl} className="w-full h-full min-h-[600px] border-0 rounded-xl shadow-sm bg-white" title="Document Preview" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function UserIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}
