import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { Clock, TrendingUp, CheckCircle, AlertCircle, Zap, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, FileText, Target } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });
  const [appsList, setAppsList] = useState<any[]>([]);
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [criteriaProgress, setCriteriaProgress] = useState([0, 0, 0, 0, 0]);
  const [deadline, setDeadline] = useState<Date | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    api.get('/applications/quy-ches').then(res => {
      if (res.data && res.data.length > 0) {
        setDeadline(new Date(res.data[0].ngay_dong_cong));
      }
    }).catch(() => {});

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
                    const proofCount = userProofs.filter((p: any) => {
                      if (p.tieu_chi_id === tc.id) return true;
                      if (p.tieu_chi?.ten_tieu_chi?.trim().toLowerCase() === tc.ten_tieu_chi.trim().toLowerCase()) return true;
                      return false;
                    }).length;
                    const req = tc.so_luong_yeu_cau || 1;
                    return Math.min(100, Math.round((proofCount / req) * 100));
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
        setAppsList(list);
        setStats({ total: list.length, pending: list.filter((a: any) => a.trang_thai.startsWith('CHO')).length, approved: list.filter((a: any) => a.trang_thai.startsWith('DAT')).length });
      }).catch(() => {});
    }
  }, [user]);

  const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
    DANG_TAO: { label: 'Đang tạo hồ sơ', bg: 'bg-slate-100', text: 'text-slate-700' },
    CHO_DUYET_TRUONG: { label: 'Chờ duyệt cấp Trường', bg: 'bg-yellow-100', text: 'text-yellow-700' },
    DAT_TRUONG: { label: 'SV5T cấp Trường', bg: 'bg-green-100', text: 'text-green-700' },
    CHO_DUYET_TINH: { label: 'Chờ duyệt cấp Tỉnh', bg: 'bg-blue-100', text: 'text-blue-700' },
    DAT_TINH: { label: 'SV5T cấp Tỉnh', bg: 'bg-indigo-100', text: 'text-indigo-700' },
    CHO_DUYET_TW: { label: 'Chờ duyệt Trung ương', bg: 'bg-purple-100', text: 'text-purple-700' },
    DAT_SV5T: { label: 'SV5T cấp Trung ương', bg: 'bg-amber-100', text: 'text-amber-700' },
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

  const handlePrint = () => {
    window.print();
  };

  const pieData = [
    { name: 'Đang chờ duyệt', value: stats.pending, color: '#f59e0b' },
    { name: 'Đã hoàn tất', value: stats.approved, color: '#10b981' },
    { name: 'Đã từ chối', value: stats.total - stats.pending - stats.approved, color: '#ef4444' }
  ].filter(d => d.value > 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8 dashboard-container">
      {/* Header - Hidden on print if you want, but good for report title */}
      <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-[2rem] p-10 text-white shadow-xl relative overflow-hidden print:rounded-none print:shadow-none print:bg-none print:text-black print:p-4 print:border-b-2 print:border-slate-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl print:hidden"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/30 rounded-full -ml-12 -mb-12 blur-xl print:hidden"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-2">Báo Cáo Thống Kê Sinh Viên 5 Tốt</h2>
            <p className="text-indigo-100 text-lg font-medium print:text-slate-600">Theo dõi tiến trình hồ sơ các cấp</p>
          </div>
          <button onClick={handlePrint} className="print-visible no-print flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur transition-colors shadow-sm border border-white/20">
            <FileText size={20} />
            Xuất Báo Cáo (PDF)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:grid-cols-3">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group print:shadow-none print:border-slate-300">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform print:hidden">
            <FileText size={28} />
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 print:text-slate-600">Tổng số hồ sơ</p>
          <div className="text-5xl font-black text-slate-800">{stats.total}</div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all group relative overflow-hidden print:shadow-none print:border-slate-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-8 -mt-8 -z-0 print:hidden"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform print:hidden">
              <Clock size={28} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 print:text-slate-600">Đang chờ duyệt</p>
            <div className="text-5xl font-black text-amber-600">{stats.pending}</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all group relative overflow-hidden print:shadow-none print:border-slate-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 -z-0 print:hidden"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform print:hidden">
              <CheckCircle size={28} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 print:text-slate-600">Đã hoàn tất</p>
            <div className="text-5xl font-black text-emerald-600">{stats.approved}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-block">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 print:shadow-none print:border-slate-300 avoid-break">
          <h3 className="font-black text-slate-800 text-xl mb-6 flex items-center gap-2">
            <TrendingUp size={24} className="text-indigo-500 print:hidden" />
            Tỉ lệ Trạng thái
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {!isRole('CAN_BO_TRUONG') && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 print:shadow-none print:border-slate-300 avoid-break">
            <h3 className="font-black text-slate-800 text-xl mb-6">Phân cấp xét duyệt</h3>
            <div className="flex flex-col gap-4">
              <div className="p-5 rounded-2xl border-2 border-slate-100 flex items-center justify-between bg-slate-50 print:bg-white print:border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 text-slate-500 rounded-xl flex items-center justify-center font-bold text-xl print:border print:border-slate-300">1</div>
                  <div>
                    <h4 className="font-bold text-slate-700 text-lg">Cấp Trường</h4>
                    <p className="text-sm text-slate-500 font-medium">Thu thập minh chứng và xét duyệt sơ bộ</p>
                  </div>
                </div>
                <CheckCircle className="text-slate-300" size={28} />
              </div>
              
              <div className="p-5 rounded-2xl border-2 border-blue-100 flex items-center justify-between bg-blue-50/50 print:bg-white print:border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-200 text-blue-700 rounded-xl flex items-center justify-center font-bold text-xl print:border print:border-slate-300">2</div>
                  <div>
                    <h4 className="font-bold text-blue-800 text-lg">Cấp Thành Phố</h4>
                    <p className="text-sm text-blue-600/80 font-medium">Thẩm định hồ sơ do Trường đề xuất</p>
                  </div>
                </div>
                {isRole('CB_TINH') ? <div className="px-4 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-full print:bg-slate-200 print:text-black">Nhiệm vụ của bạn</div> : <CheckCircle className="text-blue-300" size={28} />}
              </div>

              <div className="p-5 rounded-2xl border-2 border-amber-100 flex items-center justify-between bg-amber-50/50 print:bg-white print:border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-200 text-amber-700 rounded-xl flex items-center justify-center font-bold text-xl print:border print:border-slate-300">3</div>
                  <div>
                    <h4 className="font-bold text-amber-800 text-lg">Cấp Trung Ương</h4>
                    <p className="text-sm text-amber-700/80 font-medium">Phê duyệt danh hiệu Sinh viên 5 tốt toàn quốc</p>
                  </div>
                </div>
                {isRole('CB_TW') ? <div className="px-4 py-1.5 bg-amber-500 text-white text-sm font-bold rounded-full print:bg-slate-200 print:text-black">Nhiệm vụ của bạn</div> : <Target className="text-amber-300" size={28} />}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden page-break-before print:shadow-none print:border-none">
        <div className="p-8 border-b border-slate-100 print:border-slate-800">
          <h3 className="font-black text-slate-800 text-xl">Danh sách Hồ sơ Trình Tuyến</h3>
          <p className="text-slate-500 mt-1 font-medium">Danh sách thống kê phục vụ công tác đối soát.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider print:bg-white print:border-b-2 print:border-slate-800">
                <th className="px-8 py-4 font-bold border-b border-slate-200">Sinh Viên</th>
                <th className="px-8 py-4 font-bold border-b border-slate-200">Mã SV</th>
                <th className="px-8 py-4 font-bold border-b border-slate-200">Trạng Thái</th>
                <th className="px-8 py-4 font-bold border-b border-slate-200">Năm Học</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 print:divide-slate-300">
              {appsList.length > 0 ? appsList.map(app => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors avoid-break">
                  <td className="px-8 py-4 font-bold text-slate-800">{app.nguoi_dung?.ho_ten}</td>
                  <td className="px-8 py-4 text-slate-600 font-medium">{app.nguoi_dung?.msv}</td>
                  <td className="px-8 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      app.trang_thai.startsWith('CHO') ? 'bg-amber-100 text-amber-700 print:border print:border-amber-500' : 'bg-emerald-100 text-emerald-700 print:border print:border-emerald-500'
                    }`}>
                      {STATUS_CONFIG[app.trang_thai]?.label || app.trang_thai}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-slate-500">{app.quy_che?.nam_hoc}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-slate-500 font-medium">Không có hồ sơ nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
