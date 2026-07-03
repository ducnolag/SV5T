import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, XCircle, ArrowLeft, UploadCloud, FileText, Search, Filter, Sparkles, User, Calendar, ShieldCheck, Target, AlertTriangle, X, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const FLOW_STEPS = [
  { key: 'DANG_TAO', label: 'Thu thập', fullLabel: 'Thu thập Minh chứng', color: 'bg-slate-200 text-slate-500', active: 'bg-blue-600 text-white' },
  { key: 'CHO_DUYET_TRUONG', label: 'Cấp Trường', fullLabel: 'Chờ duyệt cấp Trường', color: 'bg-slate-200 text-slate-500', active: 'bg-amber-500 text-white' },
  { key: 'DAT_TRUONG', label: 'Đạt Trường', fullLabel: 'Đạt cấp Trường', color: 'bg-slate-200 text-slate-500', active: 'bg-emerald-500 text-white' },
  { key: 'CHO_DUYET_TINH', label: 'Cấp Tỉnh', fullLabel: 'Chờ duyệt cấp Tỉnh', color: 'bg-slate-200 text-slate-500', active: 'bg-blue-500 text-white' },
  { key: 'DAT_TINH', label: 'Đạt Tỉnh', fullLabel: 'Đạt cấp Tỉnh', color: 'bg-slate-200 text-slate-500', active: 'bg-indigo-500 text-white' },
  { key: 'CHO_DUYET_TW', label: 'Cấp TW', fullLabel: 'Chờ duyệt cấp Trung ương', color: 'bg-slate-200 text-slate-500', active: 'bg-purple-500 text-white' },
  { key: 'DAT_SV5T', label: 'Đạt SV5T', fullLabel: 'Đạt danh hiệu SV5T', color: 'bg-slate-200 text-slate-500', active: 'bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)]' },
];

const STATUS_BADGE: Record<string, { label: string; cls: string }> = {
  DANG_TAO: { label: 'Đang chuẩn bị', cls: 'bg-slate-100 text-slate-700 border-slate-200' },
  CHO_DUYET_TRUONG: { label: 'Chờ Trường', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  DAT_TRUONG: { label: 'Đạt Trường', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  CHO_DUYET_TINH: { label: 'Chờ Tỉnh', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
  DAT_TINH: { label: 'Đạt Tỉnh', cls: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  CHO_DUYET_TW: { label: 'Chờ TW', cls: 'bg-purple-50 text-purple-700 border-purple-200' },
  DAT_SV5T: { label: '🏆 Đạt SV5T', cls: 'bg-amber-100 text-amber-800 border-amber-300 font-black' },
  BI_TU_CHOI: { label: 'Bị từ chối', cls: 'bg-rose-50 text-rose-700 border-rose-200' },
};

export default function ApplicationPage() {
  const { isRole } = useAuth();
  const { refreshTrigger } = useOutletContext<{ refreshTrigger: number }>();
  const [myApps, setMyApps] = useState<any[]>([]);
  const [pendingApps, setPendingApps] = useState<any[]>([]);
  const [quyChes, setQuyChes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [appDetail, setAppDetail] = useState<any>(null);
  const [view, setView] = useState<'my' | 'pending'>('my');
  const [searchQuery, setSearchQuery] = useState('');
  const [userProofs, setUserProofs] = useState<any[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

  const openPreview = (fileUrlString: string) => {
    try {
      const urls = JSON.parse(fileUrlString);
      setPreviewImages(Array.isArray(urls) ? urls : [fileUrlString]);
    } catch {
      setPreviewImages([fileUrlString]);
    }
    setCurrentPreviewIndex(0);
  };

  const isStaff = isRole('CB_TRUONG', 'CB_TINH', 'CB_TW', 'ADMIN');
  const isSV = isRole('SINH_VIEN');

  const [reviewAction, setReviewAction] = useState<{ id: string; action: string } | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const qcRes = await api.get('/applications/quy-ches');
      setQuyChes(qcRes.data || []);

      if (isSV) {
        const myRes = await api.get('/applications/my');
        const apps = myRes.data || [];
        setMyApps(apps);
        const proofsRes = await api.get('/proofs/me');
        setUserProofs(proofsRes.data || []);
        if (apps.length === 1) {
          setSelectedAppId(apps[0].id);
        }
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

  const handleReview = async (id: string, trangThai: string) => {
    setSubmitting(true);
    try {
      await api.put(`/applications/${id}/review`, { trang_thai: trangThai });
      setReviewAction(null);
      fetchAll();
      if (selectedAppId === id) fetchDetail(id);
    } catch (e: any) {
      alert(e.response?.data?.message || 'Lỗi duyệt hồ sơ');
    } finally {
      setSubmitting(false);
    }
  };

  const fetchDetail = async (id: string) => {
    try {
      const res = await api.get(`/applications/${id}`);
      setAppDetail(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchAll(); }, []);
  useEffect(() => { if (refreshTrigger > 0) fetchAll(); }, [refreshTrigger]);

  useEffect(() => {
    if (selectedAppId) {
      fetchDetail(selectedAppId);
    } else {
      setAppDetail(null);
    }
  }, [selectedAppId]);

  const handleCreate = async (quyCheId: string) => {
    setSubmitting(true);
    try {
      const res = await api.post('/applications', { quy_che_id: quyCheId, minh_chung_ids: [] });
      fetchAll();
      setSelectedAppId(res.data.id);
    } catch (e: any) {
      alert(e.response?.data?.message || 'Lỗi tạo hồ sơ');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (id: string) => {
    if (!confirm('Sau khi nộp, hồ sơ sẽ được gửi lên Cấp Trường để xét duyệt. Bạn có chắc chắn?')) return;
    setSubmitting(true);
    try {
      // Lấy tất cả minh chứng hợp lệ (đã được AI xác nhận) của người dùng liên quan đến quy chế này
      const validProofIds = userProofs.filter(p => appDetail.quy_che.tieu_chis.some((tc:any) => tc.id === p.tieu_chi_id) && (p.trang_thai === 'DA_XAC_THUC' || p.trang_thai === 'DA_DUYET' || (p.ai_xac_thuc_muc_do && p.ai_xac_thuc_muc_do >= 80))).map(p => p.id);
      await api.put(`/applications/${id}/submit`, { minh_chung_ids: validProofIds });
      setSelectedAppId(null);
      fetchAll();
      alert('Nộp hồ sơ thành công!');
    } catch (e: any) {
      alert(e.response?.data?.message || 'Lỗi nộp hồ sơ');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPending = pendingApps.filter(a => 
    a.nguoi_dung?.ho_ten?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.nguoi_dung?.msv?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Logic tự động tìm quy chế đang mở mà SV chưa tham gia
  const activeQuyChes = quyChes.filter(qc => {
    // Nếu chưa có app nào với quy chế này, thì coi như "có thể tham gia"
    return !myApps.some(app => app.quy_che?.id === qc.id);
  });

  // --- DETAIL VIEW ---
  if (selectedAppId && appDetail) {
    const isDraft = appDetail.trang_thai === 'DANG_TAO' && !appDetail.khoa;
    let missingCount = 0;
    
    appDetail.quy_che?.tieu_chis?.forEach((tc: any) => {
      const reqCount = tc.so_luong_yeu_cau || 1;
      const validCount = isDraft 
        ? userProofs.filter(p => p.tieu_chi_id === tc.id).length
        : (appDetail.minh_chungs || []).filter((p: any) => p.tieu_chi_id === tc.id).length;
      if (validCount < reqCount) missingCount += (reqCount - validCount);
    });

    const currentStepIndex = FLOW_STEPS.findIndex(s => s.key === appDetail.trang_thai) >= 0 
      ? FLOW_STEPS.findIndex(s => s.key === appDetail.trang_thai) 
      : 0;

    return (
      <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        <button onClick={() => setSelectedAppId(null)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium transition-colors">
          <ArrowLeft size={16} /> Quay lại Danh sách
        </button>
        
        {/* Detail Header - Dashboard Style */}
        <div className="relative overflow-hidden bg-white/70 backdrop-blur-2xl rounded-[2rem] border border-white/80 shadow-xl shadow-slate-200/50 p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${STATUS_BADGE[appDetail.trang_thai]?.cls}`}>
                  {STATUS_BADGE[appDetail.trang_thai]?.label}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border bg-indigo-50 text-indigo-700 border-indigo-200">
                  <Target size={12} /> Tiến độ: {appDetail.quy_che?.tieu_chis?.length ? Math.round((Math.max(0, appDetail.quy_che.tieu_chis.length - missingCount) / appDetail.quy_che.tieu_chis.length) * 100) : 0}%
                </span>
              </div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Dashboard Mục Tiêu SV5T</h2>
              <div className="flex items-center gap-4 text-sm font-medium text-slate-500 mt-2">
                <span className="flex items-center gap-1.5"><Calendar size={16} className="text-indigo-500" /> {appDetail.quy_che?.nam_hoc}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-1.5"><User size={16} className="text-indigo-500" /> {appDetail.nguoi_dung?.ho_ten} ({appDetail.nguoi_dung?.msv})</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              {isDraft && (
                 <button onClick={() => handleSubmit(appDetail.id)} disabled={submitting || missingCount > 0}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:transform-none">
                  {submitting ? 'Đang nộp...' : `Gửi Xét Duyệt ${missingCount > 0 ? `(Còn ${missingCount} mục)` : ''}`}
                 </button>
              )}
              {isStaff && appDetail.trang_thai.startsWith('CHO') && (
                <>
                  <button onClick={() => handleReview(appDetail.id, 'BI_TU_CHOI')} disabled={submitting}
                    className="px-6 py-4 bg-white border-2 border-rose-100 text-rose-600 hover:bg-rose-50 hover:border-rose-200 rounded-2xl font-bold transition-all shadow-sm">Từ chối</button>
                  <button onClick={() => {
                      const nextState = appDetail.trang_thai === 'CHO_DUYET_TRUONG' ? 'DAT_TRUONG' : appDetail.trang_thai === 'CHO_DUYET_TINH' ? 'DAT_TINH' : 'DAT_SV5T';
                      handleReview(appDetail.id, nextState);
                    }} disabled={submitting}
                    className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:-translate-y-1">Xác nhận Đạt Chuẩn</button>
                </>
              )}
            </div>
          </div>

          {/* Premium Timeline Stepper */}
          <div className="mt-12 mb-8 relative z-10 px-2 sm:px-4 hidden sm:block">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-slate-100 -z-10 -translate-y-1/2 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000 ease-in-out" style={{ width: `${(currentStepIndex / (FLOW_STEPS.length - 1)) * 100}%` }}></div>
              </div>
              {FLOW_STEPS.map((step, idx) => {
                const isCompleted = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div key={step.key} className="flex flex-col items-center relative group cursor-default">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-500 shadow-sm ${isCompleted ? step.active : step.color} ${isCurrent ? 'ring-4 ring-indigo-500/30 scale-110 shadow-indigo-500/40' : 'border-2 border-white'}`}>
                      {isCompleted ? <CheckCircle size={18} /> : (idx + 1)}
                    </div>
                    {/* Tooltip for full label */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[11px] py-1 px-2.5 rounded-lg whitespace-nowrap pointer-events-none z-20">
                      {step.fullLabel}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                    </div>
                    {/* Wrapped short label */}
                    <span className={`mt-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide w-16 sm:w-20 text-center leading-tight transition-colors ${isCurrent ? 'text-indigo-600' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cảnh báo Hồ sơ chưa đủ */}
        {isDraft && missingCount > 0 && (
           <div className="bg-amber-50 border border-amber-200 rounded-[2rem] p-5 flex items-center gap-4">
             <div className="p-3 bg-white rounded-full text-amber-500 shadow-sm"><AlertTriangle size={24} /></div>
             <div>
               <h4 className="font-bold text-amber-900">Mục tiêu chưa hoàn thành</h4>
               <p className="text-sm font-medium text-amber-700">Bạn còn thiếu {missingCount} tiêu chí cần bổ sung minh chứng. Hãy cập nhật đầy đủ để đủ điều kiện xét duyệt.</p>
             </div>
           </div>
        )}

        {/* Criteria List Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800">Tiến Độ Theo 5 Tiêu Chí</h3>
          </div>
          
          <div className="grid gap-5">
            {(appDetail.quy_che?.tieu_chis || []).map((tc: any) => {
              const reqCount = tc.so_luong_yeu_cau || 1;
              const tcProofs = isDraft
                ? userProofs.filter(p => p.tieu_chi_id === tc.id)
                : (appDetail.minh_chungs || []).filter((p: any) => p.tieu_chi_id === tc.id);
              
              const isCompleted = tcProofs.length >= reqCount;

              return (
                <div key={tc.id} className={`p-6 rounded-[2rem] border-2 transition-all duration-300 ${isCompleted ? 'border-emerald-100 bg-white shadow-lg shadow-emerald-500/5 hover:border-emerald-200' : 'border-slate-100 bg-white/50 hover:bg-white hover:border-indigo-100 hover:shadow-md'}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg ${isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                          {isCompleted ? <CheckCircle size={20} /> : <Target size={20} />}
                        </div>
                        <h4 className={`text-lg font-black ${isCompleted ? 'text-emerald-900' : 'text-slate-800'}`}>
                          {tc.ten_tieu_chi}
                        </h4>
                        {isCompleted && <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full ml-2">Đã hoàn thành</span>}
                      </div>
                      <div className="pl-13 ml-13">
                        <p className="text-sm text-slate-500 mb-3 font-medium">{tc.mo_ta}</p>
                        <div className="bg-gradient-to-r from-slate-50 to-indigo-50/30 border border-indigo-100/60 rounded-xl p-4 w-full xl:w-4/5 shadow-sm">
                          <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2 flex items-center gap-1.5"><ShieldCheck size={16} className="text-indigo-500"/> Điều kiện xét duyệt (Quy chế 2025-2026)</p>
                          <p className="text-[13px] md:text-sm font-medium text-slate-700 ml-5 leading-relaxed whitespace-pre-line">
                            {(() => {
                              const name = tc.ten_tieu_chi || '';
                              if (name.includes('Học tập')) return '- Điểm trung bình chung học tập cả năm đạt từ 3.2/4.0 trở lên.\n- Sinh viên phải đạt thêm ít nhất 01 trong các tiêu chí sau: Nhận học bổng khuyến khích học tập; Có đề tài NCKH đạt giải cấp Khoa trở lên; Có bài tham luận/nghiên cứu được đăng kỷ yếu, tạp chí; Đạt giải cuộc thi học thuật/khởi nghiệp/sáng tạo từ cấp Học viện; Là thành viên tích cực CLB học thuật.';
                              if (name.includes('Đạo đức')) return '- Điểm rèn luyện đạt từ 80 điểm trở lên;\n- Không vi phạm pháp luật, quy chế của Nhà trường;\n- Đạt thêm ít nhất 01 trong các tiêu chí: Tham gia cuộc thi tìm hiểu Mác-Lênin; Là Đảng viên hoàn thành tốt nhiệm vụ; Tham gia thi về Đảng, Đoàn-Hội; Là thanh niên tiêu biểu/tiên tiến.';
                              if (name.includes('Thể lực')) return 'Sinh viên đạt 01 trong các tiêu chí sau:\n- Đạt danh hiệu "Sinh viên khỏe" từ cấp Học viện trở lên.\n- Tham gia và đạt giải hoặc thi đấu chính thức tại hoạt động thể thao do Học viện, Đoàn - Hội hoặc địa phương tổ chức.\n- Là thành viên tích cực của ít nhất 01 CLB thể thao của Học viện.';
                              if (name.includes('Tình nguyện')) return 'Sinh viên đạt 01 trong 02 tiêu chí sau:\n- Tham gia ít nhất 03 ngày tình nguyện/năm học (01 lần hiến máu = 01 ngày; 01 ngày Chủ nhật xanh/Mùa hè xanh = 01 ngày).\n- Được khen thưởng từ cấp Khoa trở lên về hoạt động tình nguyện HOẶC là người sáng lập/đồng sáng lập dự án tình nguyện thiết thực.';
                              if (name.includes('Hội nhập')) return '- Đạt chứng chỉ tiếng Anh B1 (hoặc tương đương); hoặc điểm học phần ngoại ngữ tích lũy đạt từ 3.0/4.0 hoặc 7.5/10 trở lên.\n- Đạt thêm đồng thời ít nhất 02 tiêu chí khác nhau: Ban chủ nhiệm CLB ngoại ngữ; Tham gia hoạt động giao lưu quốc tế; Tham gia cuộc thi hội nhập/ngoại ngữ; Hoàn thành khóa trang bị kỹ năng THXH; Được khen thưởng công tác Đoàn/Hội/phong trào.';
                              return `Cần hoàn thành tối thiểu ${reqCount} minh chứng hợp lệ.`;
                            })()}
                          </p>
                        </div>
                        
                        <div className="mt-4 flex items-center gap-3">
                          <span className={`text-sm font-bold ${isCompleted ? 'text-emerald-600' : 'text-slate-500'}`}>Tiến độ: {tcProofs.length}/{reqCount}</span>
                          <div className="w-32 h-2.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                            <div className={`h-full ${isCompleted ? 'bg-emerald-500' : 'bg-indigo-500'} transition-all duration-700`} style={{ width: `${Math.min(100, (tcProofs.length/reqCount)*100)}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-64 flex-shrink-0">
                      {tcProofs.length > 0 ? (
                        <div className="flex overflow-x-auto gap-3 h-32 pb-2 scrollbar-thin">
                          {tcProofs.map((proof: any) => (
                            <div key={proof.id} className="w-32 flex-shrink-0 bg-emerald-50 border border-emerald-100 rounded-xl p-1 relative group overflow-hidden h-full flex flex-col justify-center cursor-pointer" onClick={() => openPreview(proof.file_url)}>
                              <div className="w-full h-full rounded-lg overflow-hidden relative bg-white border border-emerald-100/50">
                                {(() => {
                                  let urls: string[] = [];
                                  try { urls = JSON.parse(proof.file_url); } catch { urls = [proof.file_url]; }
                                  const firstUrl = urls[0];
                                  const src = firstUrl?.startsWith('http') ? firstUrl : `http://localhost:3000${firstUrl?.startsWith('/') ? '' : '/'}${firstUrl}`;
                                  return (
                                    <>
                                      <img src={src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Minh chứng" />
                                      {urls.length > 1 && (
                                        <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                                          +{urls.length - 1}
                                        </div>
                                      )}
                                    </>
                                  );
                                })()}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : isDraft ? (
                        <a href="/proofs" className="h-full min-h-[140px] w-full border-2 border-dashed border-slate-300 hover:border-indigo-400 bg-slate-50 hover:bg-indigo-50/50 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:text-indigo-600 transition-all group">
                          <div className="w-12 h-12 bg-white group-hover:bg-indigo-100 rounded-full flex items-center justify-center mb-2 transition-colors shadow-sm">
                            <UploadCloud size={20} className="group-hover:scale-110 transition-transform" />
                          </div>
                          <span className="text-sm font-bold">Mở Kho Minh Chứng</span>
                          <span className="text-xs text-slate-400 mt-1">Để tự động lấy tài liệu</span>
                        </a>
                      ) : (
                        <div className="h-full min-h-[140px] w-full flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl text-slate-400">
                           <FileText size={32} className="mb-2 opacity-50" />
                           <span className="text-sm font-semibold">Chưa có dữ liệu</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Preview Modal for Detail View */}
        {previewImages.length > 0 && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
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

  // --- LIST VIEW ---
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Dynamic Banner for active Applications (Only for Student) */}
      {isSV && activeQuyChes.length > 0 && (
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2rem] p-8 md:p-10 text-white shadow-xl shadow-indigo-500/20 group">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:opacity-10 transition-opacity"></div>
          <div className="relative z-10 md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/30">
                <Sparkles size={14} /> Đợt xét duyệt đang mở
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Hành Trình Chinh Phục Danh Hiệu</h2>
              <p className="text-indigo-100 font-medium leading-relaxed">Năm học {activeQuyChes[0]?.nam_hoc} đã chính thức khởi động. Bắt đầu thu thập minh chứng và hoàn thiện Dashboard tiêu chí của bạn ngay hôm nay!</p>
            </div>
            <button onClick={() => handleCreate(activeQuyChes[0].id)} disabled={submitting}
              className="px-8 py-4 bg-white text-indigo-700 rounded-2xl font-black text-lg shadow-xl shadow-black/10 hover:shadow-2xl hover:scale-105 hover:bg-slate-50 transition-all">
              {submitting ? 'Đang tạo...' : 'Khởi tạo Hồ sơ'}
            </button>
          </div>
        </div>
      )}

      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Quản lý Hồ Sơ</h2>
          <p className="text-slate-500 font-medium mt-1">Theo dõi tiến độ hoàn thành các tiêu chí xét duyệt</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {isStaff && (
            <div className="bg-slate-100 p-1 rounded-xl flex">
              {[['my', 'Hồ sơ của tôi'], ['pending', `Cần xét duyệt (${pendingApps.length})`]].map(([val, label]) => (
                <button key={val} onClick={() => setView(val as any)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${view === val ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}>
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : view === 'pending' && isStaff ? (
        /* ENTERPRISE DATA TABLE FOR STAFF */
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><Filter size={20} className="text-indigo-500"/> Danh sách chờ duyệt</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Tìm tên hoặc MSV..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-full sm:w-64 font-medium transition-all" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-black text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6 whitespace-nowrap">Sinh viên</th>
                  <th className="py-4 px-6 whitespace-nowrap">Tiến độ tiêu chí</th>
                  <th className="py-4 px-6 whitespace-nowrap">Trạng thái hiện tại</th>
                  <th className="py-4 px-6 text-right whitespace-nowrap">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPending.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-16 text-center text-slate-500 font-medium">Không tìm thấy hồ sơ nào chờ duyệt.</td>
                  </tr>
                ) : (
                  filteredPending.map(app => (
                    <tr key={app.id} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="py-4 px-6">
                        <p className="font-bold text-slate-800 text-sm">{app.nguoi_dung?.ho_ten}</p>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{app.nguoi_dung?.msv} • {app.quy_che?.nam_hoc}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-slate-700">{app.minh_chungs?.length || 0}/5</span>
                          <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${((app.minh_chungs?.length || 0)/5)*100}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${STATUS_BADGE[app.trang_thai]?.cls}`}>
                          {STATUS_BADGE[app.trang_thai]?.label}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setReviewAction({ id: app.id, action: 'REJECT' })} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors tooltip" title="Từ chối"><XCircle size={18} /></button>
                          <button onClick={() => setReviewAction({ id: app.id, action: 'APPROVE' })} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors tooltip" title="Duyệt"><CheckCircle size={18} /></button>
                          <button onClick={() => setSelectedAppId(app.id)} className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition-colors">Xem Dashboard</button>
                        </div>
                        <div className="group-hover:hidden text-xs text-slate-400 font-medium">Trượt để thao tác</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* PREMIUM CARDS FOR STUDENT VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myApps.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white border border-slate-200 border-dashed rounded-[2rem] shadow-sm">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={32} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Chưa có mục tiêu</h3>
              <p className="text-slate-500 font-medium max-w-md mx-auto">Bạn chưa tham gia đợt xét duyệt nào. Hãy theo dõi thông báo từ Hội Sinh viên để khởi tạo hồ sơ.</p>
            </div>
          ) : (
            myApps.map(app => (
              <div key={app.id} onClick={() => setSelectedAppId(app.id)} 
                className="group cursor-pointer bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-200 transition-all duration-300 p-6 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 -z-0"></div>
                
                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${STATUS_BADGE[app.trang_thai]?.cls}`}>
                      {STATUS_BADGE[app.trang_thai]?.label}
                    </span>
                  </div>
                  <h3 className="font-black text-xl text-slate-800 leading-snug mb-1 group-hover:text-indigo-600 transition-colors">
                    Dashboard Năm {app.quy_che?.nam_hoc}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">{app.quy_che?.don_vi?.ten_don_vi}</p>
                </div>
                
                <div className="relative z-10 mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 w-full">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                        <span>Tiến độ</span>
                        <span className="text-indigo-600">{app.minh_chungs?.length || 0}/5</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${((app.minh_chungs?.length || 0)/5)*100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Review Confirmation Modal */}
      {reviewAction && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${reviewAction.action === 'APPROVE' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
              {reviewAction.action === 'APPROVE' ? <ShieldCheck size={32} /> : <XCircle size={32} />}
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">
              {reviewAction.action === 'APPROVE' ? 'Phê duyệt hồ sơ?' : 'Từ chối hồ sơ?'}
            </h3>
            <p className="text-sm text-slate-500 font-medium mb-8">Quyết định này sẽ cập nhật trạng thái hồ sơ trực tiếp. Bạn có chắc chắn?</p>
            <div className="flex gap-3">
              <button onClick={() => setReviewAction(null)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors">Hủy thao tác</button>
              <button disabled={submitting}
                onClick={() => {
                  const nextState = reviewAction.action === 'APPROVE'
                    ? (pendingApps.find(a => a.id === reviewAction.id)?.trang_thai === 'CHO_DUYET_TRUONG' ? 'DAT_TRUONG'
                      : pendingApps.find(a => a.id === reviewAction.id)?.trang_thai === 'CHO_DUYET_TINH' ? 'DAT_TINH'
                      : 'DAT_SV5T')
                    : 'BI_TU_CHOI';
                  handleReview(reviewAction.id, nextState);
                }}
                className={`flex-1 py-3 text-white rounded-xl text-sm font-bold disabled:opacity-50 transition-all ${reviewAction.action === 'APPROVE' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/30' : 'bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/30'}`}>
                {submitting ? 'Đang xử lý...' : 'Xác nhận'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
