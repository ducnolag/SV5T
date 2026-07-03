import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../utils/useSocket';
import { Bell, LogOut, Home, CheckSquare, Award, FileText, X, MessageCircle, ChevronRight, User } from 'lucide-react';
import { useState } from 'react';
import ChatbotWidget from '../components/ChatbotWidget';

const ROLE_LABELS: Record<string, string> = {
  SINH_VIEN: 'Sinh viên',
  CB_TRUONG: 'Cán bộ Trường',
  CB_TINH: 'Cán bộ Tỉnh/TP',
  CB_TW: 'Cán bộ TW',
  LCH_CLB: 'Liên Chi Hội/CLB',
  ADMIN: 'Quản trị viên',
};

const ROLE_COLORS: Record<string, string> = {
  SINH_VIEN: 'bg-blue-50 text-blue-700 border-blue-200',
  CB_TRUONG: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  CB_TINH: 'bg-purple-50 text-purple-700 border-purple-200',
  CB_TW: 'bg-rose-50 text-rose-700 border-rose-200',
  LCH_CLB: 'bg-amber-50 text-amber-700 border-amber-200',
  ADMIN: 'bg-slate-100 text-slate-700 border-slate-300',
};

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { notification, clearNotification, refreshTrigger } = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotif, setShowNotif] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const isStaff = user && ['CB_TRUONG', 'CB_TINH', 'CB_TW', 'ADMIN'].includes(user.role);

  const navItems = [
    { name: 'Tổng quan', path: '/', icon: Home, show: true },
    { name: 'Duyệt hồ sơ', path: '/applications', icon: CheckSquare, show: isStaff },
    { name: 'Minh Chứng', path: '/proofs', icon: Award, show: user?.role === 'SINH_VIEN' },
    { name: 'Hồ Sơ SV5T', path: '/applications', icon: FileText, show: user?.role === 'SINH_VIEN' },
    { name: 'Quản lý Quy chế', path: '/rules', icon: FileText, show: isStaff },
    { name: 'Hồ Sơ Cá Nhân', path: '/profile', icon: User, show: true },
  ].filter(i => i.show);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sleek Light Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col shadow-sm">
        
        {/* Logo */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-lg shadow-sm">
              5T
            </div>
            <div>
              <h1 className="text-slate-900 font-bold tracking-tight">SV5T Portal</h1>
              <p className="text-slate-500 text-xs">Phiên bản chuyên nghiệp</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 font-bold text-sm">
              {(user?.ho_ten || user?.email)?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-slate-800 text-sm font-semibold truncate">{user?.ho_ten || user?.email}</p>
              <span className={`inline-block mt-0.5 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${ROLE_COLORS[user?.role || '']}`}>
                {ROLE_LABELS[user?.role || ''] || user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}>
                <Icon size={18} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                {item.name}
                {isActive && <ChevronRight size={16} className="ml-auto text-blue-400" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <button onClick={() => { logout(); navigate('/login'); }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm">
            <LogOut size={16} />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative w-full pb-16 md:pb-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shadow-sm z-10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="md:hidden w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-sm">
              5T
            </div>
            <div>
              <h2 className="text-slate-800 font-bold text-base md:text-lg truncate max-w-[200px] md:max-w-none">Hệ thống Quản lý Sinh viên 5 Tốt</h2>
              <p className="text-[10px] md:text-xs text-slate-500 font-medium">
                {isStaff ? 'Chế độ cán bộ' : 'Không gian sinh viên'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)}
                className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors">
                <Bell size={20} />
                {notification && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                )}
              </button>
              
              {showNotif && notification && (
                <div className="absolute right-0 mt-2 w-[280px] md:w-80 bg-white rounded-lg shadow-xl border border-slate-200 p-4 z-50">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-slate-800 text-sm">Thông báo mới</h4>
                    <button onClick={() => { clearNotification(); setShowNotif(false); }}
                      className="text-slate-400 hover:text-slate-600">
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-md border border-slate-100">{notification}</p>
                </div>
              )}
            </div>
            <button onClick={() => { logout(); navigate('/login'); }} className="md:hidden p-2 text-red-500 hover:bg-red-50 rounded-lg">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Content Box */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8">
          <Outlet context={{ refreshTrigger }} />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-16 z-50 px-2 shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className={`flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
              <Icon size={20} />
              <span className="text-[10px] mt-1 truncate max-w-[60px] text-center font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Corporate AI Chatbot */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[100] flex flex-col items-end gap-3">
        {showChatbot && <ChatbotWidget onClose={() => setShowChatbot(false)} />}
        
        <button onClick={() => setShowChatbot(!showChatbot)}
          className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
          {showChatbot ? <X size={20} className="md:w-6 md:h-6" /> : <MessageCircle size={20} className="md:w-6 md:h-6" />}
        </button>
      </div>
    </div>
  );
}
