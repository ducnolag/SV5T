import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { UploadCloud, CheckCircle, FileText, X, Sparkles, ShieldAlert, Building2, ChevronLeft, AlertTriangle, ChevronRight as ChevronRightIcon } from 'lucide-react';

interface Proof {
  id: string;
  loai: string;
  file_url: string;
  ten_minh_chung?: string;
  trang_thai: string;
  ai_xac_thuc_muc_do?: number;
  ly_do_loai?: string;
  created_at: string;
  tieu_chi?: { id: string, ten_tieu_chi: string };
}

interface OcrResult {
  extractedData: { ho_ten: string; loai_chung_chi: string; ngay_cap: string; don_vi_cap: string };
  confidenceScore: number;
  suggestedCriteria: string;
  isValid: boolean;
  message: string;
}

interface PendingUpload {
  id: string;
  files: File[];
  tenMinhChung: string;
  selectedTieuChi: string;
  ocrResult: OcrResult | null;
  ocrLoading: boolean;
}

export default function ProofPage() {
  const { user } = useAuth();
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [tieuChis, setTieuChis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  
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
      const uniqueTcs = Array.from(new Map(tcs.map((t: any) => [t.ten_tieu_chi.trim().toLowerCase(), t])).values());
      setTieuChis(uniqueTcs);
    } catch {
      setProofs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProofs(); }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    // Cứ mỗi lần chọn file (dù là 1 hay nhiều file), gộp thành 1 PendingUpload
    const newUpload: PendingUpload = {
      id: Math.random().toString(),
      files,
      tenMinhChung: '',
      selectedTieuChi: '',
      ocrResult: null,
      ocrLoading: true
    };
    
    setPendingUploads(prev => [...prev, newUpload]);
    if (fileRef.current) fileRef.current.value = '';
    
    try {
      const ocrData = new FormData();
      ocrData.append('file', files[0]); // Chỉ OCR file đầu tiên để đoán
      ocrData.append('fullName', user?.ho_ten || '');
      ocrData.append('msv', (user as any)?.msv || ''); // Thêm msv để pass các file dạng danh sách
      const res = await api.post('/ai/ocr', ocrData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setPendingUploads(prev => prev.map(p => {
        if (p.id === newUpload.id) {
          let matchedTieuChi = '';
          if (res.data.suggestedCriteria && tieuChis.length > 0) {
            const matched = tieuChis.find(t => t.ten_tieu_chi.trim() === res.data.suggestedCriteria.trim());
            if (matched) matchedTieuChi = matched.id;
          }
          
          const safeName = files[0].name.replace(/[^a-zA-Z0-9.]/g, '_');
          const isDuplicate = proofs.some(proof => proof.file_url.includes(safeName));
          
          const finalOcr = { ...res.data };
          if (isDuplicate) {
             finalOcr.isValid = false;
             finalOcr.message = `Phát hiện ảnh trùng lặp! Tệp "${files[0].name}" đã được nộp trong hồ sơ của bạn.`;
          }

          return { ...p, ocrResult: finalOcr, ocrLoading: false, selectedTieuChi: matchedTieuChi };
        }
        return p;
      }));
    } catch {
      setPendingUploads(prev => prev.map(p => p.id === newUpload.id ? { ...p, ocrLoading: false } : p));
    }
  };

  const handleUploadAll = async () => {
    if (pendingUploads.length === 0) return;
    setUploading(true);
    try {
      for (const pending of pendingUploads) {
        const formData = new FormData();
        for (const file of pending.files) {
          formData.append('files', file); // Chú ý: phải giống tên trong FilesInterceptor('files')
        }
        if (pending.selectedTieuChi) formData.append('tieu_chi_id', pending.selectedTieuChi);
        if (pending.tenMinhChung) formData.append('ten_minh_chung', pending.tenMinhChung);
        if (pending.ocrResult?.isValid) formData.append('ocr_valid', 'true');
        
        if (pending.ocrResult?.suggestedCriteria && pending.selectedTieuChi) {
           const selectedTc = tieuChis.find(t => t.id === pending.selectedTieuChi);
           if (selectedTc && selectedTc.ten_tieu_chi.trim() !== pending.ocrResult.suggestedCriteria.trim()) {
               formData.append('ai_mismatch', 'true');
               formData.append('ai_suggestion', pending.ocrResult.suggestedCriteria);
           }
        }
        
        await api.post('/proofs/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setPendingUploads([]);
      fetchProofs();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Lỗi upload minh chứng');
    } finally {
      setUploading(false);
    }
  };

  const removePendingUpload = (id: string) => {
    setPendingUploads(prev => prev.filter(p => p.id !== id));
  };

  const updatePendingUpload = (id: string, field: keyof PendingUpload, value: any) => {
    setPendingUploads(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleDelete = async (id: string) => {
    if (deleteConfirmId === id) {
      try {
        await api.delete(`/proofs/${id}`);
        setDeleteConfirmId(null);
        fetchProofs();
      } catch (e: any) {
        alert(e.response?.data?.message || 'Lỗi khi xóa minh chứng');
      }
    } else {
      setDeleteConfirmId(id);
      // Auto dismiss after 3 seconds
      setTimeout(() => setDeleteConfirmId(null), 3000);
    }
  };

  const openPreview = (fileUrlString: string) => {
    try {
      const urls = JSON.parse(fileUrlString);
      setPreviewImages(Array.isArray(urls) ? urls : [fileUrlString]);
    } catch {
      setPreviewImages([fileUrlString]);
    }
    setCurrentPreviewIndex(0);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="relative overflow-hidden bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-800 mb-2">Kho Minh Chứng Thông Minh</h2>
            <p className="text-slate-500 font-medium">Hệ thống tự động phân tích tính hợp lệ và hỗ trợ tải lên hàng loạt ảnh cùng lúc.</p>
          </div>
          <div className="hidden sm:flex items-center gap-3 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 text-indigo-700 font-bold">
            <Sparkles size={20} /> AI Anti-Fraud Active
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Upload Queue */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white opacity-50 z-0"></div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <UploadCloud size={20} className="text-indigo-600" /> Tải lên tài liệu
              </h3>
              
              <div 
                onClick={() => fileRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-white/50 hover:bg-indigo-50/50 rounded-[1.5rem] h-32 flex flex-col items-center justify-center transition-all duration-300 group-hover:shadow-inner mb-6"
              >
                <UploadCloud size={24} className="text-indigo-400 mb-2" />
                <span className="font-bold text-indigo-900 text-sm">Thêm minh chứng mới</span>
                <input ref={fileRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFileSelect} />
              </div>

              {pendingUploads.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-700 text-sm">Danh sách chờ tải lên ({pendingUploads.length})</h4>
                  {pendingUploads.map((pending) => (
                    <div key={pending.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm animate-in zoom-in-95 duration-300 space-y-4 relative">
                      <button onClick={() => removePendingUpload(pending.id)} className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 bg-white rounded-full transition-colors z-20 shadow-sm border border-slate-100">
                        <X size={14} />
                      </button>
                      
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl relative">
                          <FileText size={20} />
                          {pending.files.length > 1 && <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{pending.files.length} ảnh</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800 text-sm truncate">{pending.files[0].name}</p>
                          <p className="text-xs text-slate-500 font-medium">{(pending.files.reduce((acc, f) => acc + f.size, 0) / 1024).toFixed(1)} KB tổng cộng</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <input type="text" placeholder="Tên minh chứng (Vd: Giấy khen Sinh viên giỏi)" value={pending.tenMinhChung} onChange={e => updatePendingUpload(pending.id, 'tenMinhChung', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                        </div>
                        <div>
                          <select value={pending.selectedTieuChi} onChange={e => updatePendingUpload(pending.id, 'selectedTieuChi', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">
                            <option value="">-- Chọn tiêu chí phân loại --</option>
                            {tieuChis.map(t => <option key={t.id} value={t.id}>{t.ten_tieu_chi}</option>)}
                          </select>
                          {pending.ocrResult?.suggestedCriteria && pending.selectedTieuChi && tieuChis.find(t => t.id === pending.selectedTieuChi)?.ten_tieu_chi.trim() !== pending.ocrResult.suggestedCriteria.trim() && (
                            <p className="mt-2 text-xs font-bold text-amber-600 flex items-center gap-1.5 bg-amber-50 p-2 rounded-lg border border-amber-100">
                              <AlertTriangle size={14} /> AI khuyến nghị: {pending.ocrResult.suggestedCriteria}. Bạn đang chọn sai loại minh chứng!
                            </p>
                          )}
                        </div>
                      </div>

                      {pending.ocrLoading && (
                        <div className="text-xs font-bold text-indigo-500 animate-pulse flex items-center gap-2">
                           <div className="w-3 h-3 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div> AI đang quét...
                        </div>
                      )}

                      {pending.ocrResult && (
                        <div className={`p-3 rounded-xl border text-xs ${pending.ocrResult.isValid ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
                          <div className="font-bold flex items-center gap-1.5 mb-1">
                            {pending.ocrResult.isValid ? <CheckCircle size={14} className="text-emerald-600" /> : <ShieldAlert size={14} className="text-rose-600" />}
                            {pending.ocrResult.isValid ? 'Hợp lệ' : 'Phát hiện rủi ro'}
                          </div>
                          {!pending.ocrResult.isValid && (
                            <p className="opacity-90">{pending.ocrResult.message}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  <button onClick={handleUploadAll} disabled={uploading}
                    className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all disabled:opacity-50 mt-4">
                    {uploading ? 'Đang lưu trữ...' : 'Lưu tất cả'}
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
                let urls: string[] = [];
                try { urls = JSON.parse(proof.file_url); } catch { urls = [proof.file_url]; }
                const firstUrl = urls[0];
                const isImage = firstUrl?.match(/\.(jpeg|jpg|gif|png)$/i) != null;
                const src = firstUrl?.startsWith('http') ? firstUrl : `http://localhost:3000${firstUrl?.startsWith('/') ? '' : '/'}${firstUrl}`;
                
                const isVerified = proof.trang_thai === 'DA_XAC_THUC' || proof.trang_thai === 'DA_DUYET' || (proof.ai_xac_thuc_muc_do && proof.ai_xac_thuc_muc_do >= 80);
                
                return (
                  <div key={proof.id} className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all p-4 flex flex-col h-full relative overflow-hidden">
                    <div className="absolute top-6 right-6 z-10 flex gap-2">
                      {deleteConfirmId === proof.id ? (
                        <button onClick={() => handleDelete(proof.id)} className="px-3 py-1 bg-red-500 text-white font-bold text-xs rounded-full shadow-lg hover:bg-red-600 transition-all animate-in zoom-in">
                          Xóa ngay
                        </button>
                      ) : (
                        <button onClick={() => handleDelete(proof.id)} className="p-2 bg-white/90 backdrop-blur-sm text-slate-400 hover:text-red-500 rounded-full shadow-sm hover:shadow transition-all transform hover:scale-110">
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    <div 
                      className="aspect-[4/3] rounded-2xl bg-slate-50 mb-4 overflow-hidden relative group-hover:shadow-inner transition-shadow flex-shrink-0 border border-slate-100 cursor-pointer"
                      onClick={() => openPreview(proof.file_url)}
                    >
                      {isImage ? (
                        <img src={src} alt="Minh chứng" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><FileText size={48} className="text-slate-300" /></div>
                      )}
                      
                      {urls.length > 1 && (
                         <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-lg backdrop-blur-sm">
                           +{urls.length - 1} ảnh
                         </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-bold text-slate-800 text-sm line-clamp-2 leading-snug cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => openPreview(proof.file_url)}>
                            {proof.ten_minh_chung || proof.tieu_chi?.ten_tieu_chi || 'Minh chứng chưa phân loại'}
                          </h4>
                          {isVerified ? (
                            <div className="p-1 bg-emerald-50 text-emerald-500 rounded-full flex-shrink-0" title="Đã xác thực"><CheckCircle size={14} /></div>
                          ) : (
                            <div className="p-1 bg-amber-50 text-amber-500 rounded-full flex-shrink-0" title="Cần kiểm tra"><ShieldAlert size={14} /></div>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-4">
                          <Building2 size={12} />
                          <span className="truncate">{proof.tieu_chi?.ten_tieu_chi || 'Chưa phân loại tiêu chí'}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {new Date(proof.created_at).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {previewImages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl overflow-hidden w-full max-w-4xl max-h-full flex flex-col shadow-2xl relative">
            <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-white">
              <h3 className="font-bold text-slate-800">
                Xem minh chứng {previewImages.length > 1 && `(${currentPreviewIndex + 1}/${previewImages.length})`}
              </h3>
              <button onClick={() => setPreviewImages([])} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 bg-slate-50 overflow-auto p-4 flex items-center justify-center relative min-h-[400px]">
              {previewImages.length > 1 && (
                <>
                  <button 
                    onClick={() => setCurrentPreviewIndex(prev => prev > 0 ? prev - 1 : previewImages.length - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white text-slate-800 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110 z-10">
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={() => setCurrentPreviewIndex(prev => prev < previewImages.length - 1 ? prev + 1 : 0)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white text-slate-800 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110 z-10">
                    <ChevronRightIcon size={24} />
                  </button>
                </>
              )}
              {previewImages[currentPreviewIndex].match(/\.(pdf)$/i) ? (
                <iframe src={previewImages[currentPreviewIndex].startsWith('http') ? previewImages[currentPreviewIndex] : `http://localhost:3000${previewImages[currentPreviewIndex].startsWith('/') ? '' : '/'}${previewImages[currentPreviewIndex]}`} className="w-full h-[70vh] rounded-xl shadow-sm" />
              ) : (
                <img src={previewImages[currentPreviewIndex].startsWith('http') ? previewImages[currentPreviewIndex] : `http://localhost:3000${previewImages[currentPreviewIndex].startsWith('/') ? '' : '/'}${previewImages[currentPreviewIndex]}`} alt="Preview" className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-sm" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
