import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { Clock, TrendingUp, CheckCircle, AlertCircle, Zap, ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const CRITERIA_NAMES = ['Học tập tốt', 'Đạo đức tốt', 'Thể lực tốt', 'Tình nguyện tốt', 'Hội nhập tốt'];
const CRITERIA_COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

interface Recommendation {
  id: string;
  title: string;
  matched_criteria: string;
  source: string;
  date: string;
  postLink?: string;
  pictures?: string[];
}

function CircleProgress({ value, label, color }: { value: number; label: string; color: string }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16">
        <svg width="64" height="64" className="-rotate-90">
          <circle cx="32" cy="32" r={r} fill="none" stroke="#f1f5f9" strokeWidth="6" />
          <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="6"
            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-slate-700">{value}%</span>
        </div>
      </div>
      <p className="text-xs font-semibold text-slate-600 text-center leading-tight tracking-wide">{label}</p>
    </div>
  );
}

function CountdownBanner({ deadline }: { deadline: Date | null }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!deadline) return;
    const update = () => {
      const diff = deadline.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft('Đã đóng cổng'); return; }
      const days = Math.floor(diff / 86400000);
      const hrs = Math.floor((diff % 86400000) / 3600000);
      setTimeLeft(`${days} ngày ${hrs} giờ`);
    };
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, [deadline]);

  if (!deadline) return null;
  return (
    <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
          <Clock size={20} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Hạn nộp hồ sơ năm học</p>
          <p className="text-lg font-bold text-slate-800">{deadline.toLocaleDateString('vi-VN')}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Còn lại</p>
        <p className="text-xl font-bold text-blue-600">{timeLeft}</p>
      </div>
    </div>
  );
}

export default function DashboardHome() {
  const { user, isRole } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [myApp, setMyApp] = useState<any>(null);
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });
  const [criteriaProgress, setCriteriaProgress] = useState([0, 0, 0, 0, 0]);
  const deadline = new Date('2026-10-15T23:59:59');

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isRole('SINH_VIEN')) {
      api.get('/applications/my').then(r => {
        if (r.data[0]) {
          api.get(`/applications/${r.data[0].id}`).then(res => {
            setMyApp(res.data);
            api.get('/proofs/me').then(proofRes => {
              const userProofs = proofRes.data || [];
              if (res.data.quy_che?.tieu_chis) {
                const progress = CRITERIA_NAMES.map(name => {
                  const tc = res.data.quy_che.tieu_chis.find((t: any) => t.ten_tieu_chi.includes(name.split(' ')[0]));
                  if (tc) {
                    const hasProof = userProofs.some((p: any) => p.tieu_chi_id === tc.id);
                    return hasProof ? 100 : 0;
                  }
                  return 0;
                });
                setCriteriaProgress(progress);
                const missing = CRITERIA_NAMES.filter((_, i) => progress[i] === 0);
                if (missing.length > 0) {
                  api.get(`/ai/recommendations/${user?.id || 'default'}?missing=${encodeURIComponent(missing.join(','))}`)
                     .then(r => setRecs(r.data))
                     .catch(() => {});
                }
              }
            });
          });
        }
      }).catch(() => {});
    }
    if (isRole('CB_TRUONG', 'CB_TINH', 'CB_TW', 'ADMIN')) {
      api.get('/applications/pending').then(r => {
        const list = r.data || [];
        setStats({ total: list.length, pending: list.filter((a: any) => a.trang_thai.startsWith('CHO')).length, approved: list.filter((a: any) => a.trang_thai.startsWith('DAT')).length });
      }).catch(() => {});
    }
  }, [user]);

  const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
    DANG_TAO: { label: 'Đang tạo hồ sơ', bg: 'bg-slate-100', text: 'text-slate-700' },
    CHO_DUYET_TRUONG: { label: 'Chờ duyệt cấp Trường', bg: 'bg-yellow-100', text: 'text-yellow-700' },
    DAT_TRUONG: { label: 'Đạt cấp Trường', bg: 'bg-green-100', text: 'text-green-700' },
    CHO_DUYET_TINH: { label: 'Chờ duyệt cấp Tỉnh', bg: 'bg-blue-100', text: 'text-blue-700' },
    DAT_TINH: { label: 'Đạt cấp Tỉnh', bg: 'bg-indigo-100', text: 'text-indigo-700' },
    CHO_DUYET_TW: { label: 'Chờ duyệt Trung ương', bg: 'bg-purple-100', text: 'text-purple-700' },
    DAT_SV5T: { label: 'Đạt danh hiệu SV5T', bg: 'bg-amber-100', text: 'text-amber-700' },
    BI_TU_CHOI: { label: 'Bị từ chối', bg: 'bg-red-100', text: 'text-red-700' },
  };

  if (isRole('SINH_VIEN')) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Tổng quan Cá nhân</h2>
          <p className="text-slate-500 mt-1">Xin chào {user?.email}, theo dõi tiến độ danh hiệu của bạn.</p>
        </div>

        <CountdownBanner deadline={deadline} />

        {/* Application Status */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Tình trạng Hồ sơ</h3>
            {myApp ? (
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1.5 rounded-md text-sm font-bold ${STATUS_CONFIG[myApp.trang_thai]?.bg} ${STATUS_CONFIG[myApp.trang_thai]?.text}`}>
                  {STATUS_CONFIG[myApp.trang_thai]?.label}
                </span>
                {myApp.ai_flag && (
                  <span className={`px-3 py-1.5 rounded-md text-sm font-bold border ${
                    myApp.ai_flag === 'XANH' ? 'bg-green-50 text-green-700 border-green-200' :
                    myApp.ai_flag === 'VANG' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    Đánh giá sơ bộ: {myApp.ai_flag === 'XANH' ? 'Đủ điều kiện' : myApp.ai_flag === 'VANG' ? 'Thiếu minh chứng' : 'Không đạt'}
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-amber-600 font-medium bg-amber-50 px-3 py-1.5 rounded-md border border-amber-100 w-fit">
                <AlertCircle size={16} /> Bạn chưa khởi tạo hồ sơ xét duyệt
              </div>
            )}
          </div>
          {myApp && (
            <div className="text-right">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Ngày nộp</p>
              <p className="text-lg font-semibold text-slate-800">{myApp.ngay_nop ? new Date(myApp.ngay_nop).toLocaleDateString('vi-VN') : '—'}</p>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-600" /> Tiến độ 5 Tiêu chí
            </h3>
            <span className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-md text-sm">
              Đạt {Math.round(criteriaProgress.reduce((a, b) => a + b, 0) / 5)}%
            </span>
          </div>
          <div className="flex justify-between items-center px-4">
            {CRITERIA_NAMES.map((name, i) => (
              <CircleProgress key={name} value={criteriaProgress[i]} label={name} color={CRITERIA_COLORS[i]} />
            ))}
          </div>
        </div>

        {/* AI Recs */}
        {recs.length > 0 && (
          <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-50 rounded-full blur-2xl opacity-60 -ml-10 -mb-10 pointer-events-none"></div>

            <div className="relative z-10 flex justify-between items-end mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Zap size={22} className="text-amber-500 drop-shadow-sm" fill="currentColor" /> Đề xuất Hoạt động (AI)
                </h3>
                <p className="text-sm text-slate-500 mt-1">Các hoạt động phù hợp giúp bạn hoàn thiện tiêu chí còn thiếu</p>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <button onClick={() => scroll('left')} className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all shadow-sm">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={() => scroll('right')} className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all shadow-sm">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            {/* Mobile swipe instruction */}
            <div className="sm:hidden mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-full w-fit">
                <span>Vuốt ngang để xem</span>
                <ArrowRight size={14} />
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => scroll('left')} className="p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 transition-all shadow-sm"><ChevronLeft size={16} /></button>
                <button onClick={() => scroll('right')} className="p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 transition-all shadow-sm"><ChevronRight size={16} /></button>
              </div>
            </div>

            <div ref={scrollRef} className="relative z-10 flex overflow-x-auto snap-x snap-mandatory gap-5 pb-6 pt-2 scrollbar-hide -mx-6 px-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {/* Add custom CSS to hide scrollbar while keeping functionality */}
              <style dangerouslySetInnerHTML={{__html: `
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
              `}} />
              {recs.map(r => {
                const getFallback = (criteria: string | undefined) => {
                  if (!criteria) return 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80';
                  if (criteria.includes('Học')) return 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80';
                  if (criteria.includes('Đạo')) return 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80';
                  if (criteria.includes('Thể')) return 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=800&q=80';
                  if (criteria.includes('Tình')) return 'https://images.unsplash.com/photo-1593113589914-07599014dd8f?auto=format&fit=crop&w=800&q=80';
                  if (criteria.includes('Hội')) return 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80';
                  return 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80';
                };
                
                const imgSrc = (r.pictures && r.pictures.length > 0) ? r.pictures[0] : getFallback(r.matched_criteria);
                
                return (
                <a key={r.id} href={r.postLink || '#'} target="_blank" rel="noopener noreferrer" 
                  className="snap-center w-[300px] md:w-[350px] flex-shrink-0 flex flex-col rounded-3xl bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-8px_rgba(79,70,229,0.15)] hover:-translate-y-1 hover:border-indigo-100 transition-all duration-300 cursor-pointer group overflow-hidden relative" style={{ height: 'auto' }}>
                  
                  <div className="w-full h-[200px] flex-shrink-0 overflow-hidden relative bg-slate-50">
                    <img 
                      src={imgSrc} 
                      alt={r.title} 
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.src = getFallback(r.matched_criteria) }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-90"></div>
                    
                    {/* Sleek Criteria Tag */}
                    <div className="absolute top-4 left-4 z-30">
                      <span className="flex items-center gap-1.5 bg-white/95 backdrop-blur text-slate-800 px-3 py-1 rounded-lg text-xs font-bold tracking-wide shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                        {r.matched_criteria}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 z-30">
                      <span className="text-white/90 text-[11px] font-semibold bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-md">
                        {r.date}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow bg-white">
                    <h4 className="font-bold text-slate-800 line-clamp-3 leading-snug group-hover:text-indigo-600 transition-colors mb-4 text-[17px]">{r.title}</h4>
                    
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 max-w-[80%]">
                        <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-600">
                          <Zap size={12} fill="currentColor" />
                        </div>
                        <p className="text-[13px] text-slate-600 font-medium truncate">
                          {r.source}
                        </p>
                      </div>
                      <div className="text-slate-300 group-hover:text-indigo-600 transition-colors">
                        <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </a>
              )})}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Hệ thống Quản lý</h2>
        <p className="text-slate-500 mt-1">Trung tâm xét duyệt và thống kê hồ sơ trực tuyến</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {[
          { label: 'Tổng số hồ sơ', value: stats.total, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Chờ xét duyệt', value: stats.pending, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Đã hoàn tất', value: stats.approved, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{s.label}</p>
            <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
          <CheckCircle size={18} className="text-emerald-500" /> Chức năng chính
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { t: 'Hoạt động', d: 'Quản lý, tạo mới và phê duyệt phong trào' },
            { t: 'Minh chứng', d: 'Xác minh tài liệu OCR tự động từ sinh viên' },
            { t: 'Hồ sơ', d: 'Duyệt hồ sơ và trình lên tuyến cao hơn' }
          ].map(x => (
            <div key={x.t} className="p-4 rounded-lg bg-slate-50 border border-slate-100">
              <p className="font-semibold text-slate-800 mb-1">{x.t}</p>
              <p className="text-sm text-slate-500">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
