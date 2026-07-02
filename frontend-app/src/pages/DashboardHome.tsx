import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { Clock, TrendingUp, CheckCircle, AlertCircle, Zap, ArrowRight } from 'lucide-react';

const CRITERIA_NAMES = ['Học tập tốt', 'Đạo đức tốt', 'Thể lực tốt', 'Tình nguyện tốt', 'Hội nhập tốt'];
const CRITERIA_COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

interface Recommendation {
  id: string;
  title: string;
  matched_criteria: string;
  source: string;
  date: string;
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
  const [myApp, setMyApp] = useState<any>(null);
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });
  const deadline = new Date('2026-10-15T23:59:59');

  const criteriaProgress = [68, 80, 45, 90, 55];

  useEffect(() => {
    if (isRole('SINH_VIEN')) {
      api.get('/applications/my').then(r => setMyApp(r.data[0] || null)).catch(() => {});
      api.get(`/ai/recommendations/${user?.id || 'default'}`).then(r => setRecs(r.data)).catch(() => {});
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
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Zap size={18} className="text-amber-500" /> Đề xuất Hoạt động (AI)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {recs.map(r => (
                <div key={r.id} className="p-4 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-slate-800 line-clamp-1">{r.title}</p>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500" />
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-medium">{r.matched_criteria}</span>
                    <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{r.source}</span>
                  </div>
                </div>
              ))}
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
