import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Users, Building2, Lock, Unlock, Plus, RefreshCw, Shield } from 'lucide-react';

interface NguoiDung {
  id: string;
  ho_ten: string;
  email: string;
  msv?: string;
  vai_tro: string;
  trang_thai: string;
  don_vi?: { ten_don_vi: string };
}

const VAI_TRO_LABELS: Record<string, string> = {
  SINH_VIEN: 'Sinh viên',
  CB_TRUONG: 'Cán bộ Trường',
  CB_TINH: 'Cán bộ Tỉnh/TP',
  CB_TW: 'Cán bộ TW',
  LCH_CLB: 'Lãnh đạo CLB/Khoa',
  ADMIN: 'Quản trị viên',
};

const VAI_TRO_COLORS: Record<string, string> = {
  SINH_VIEN: 'bg-blue-100 text-blue-700',
  CB_TRUONG: 'bg-green-100 text-green-700',
  CB_TINH: 'bg-purple-100 text-purple-700',
  CB_TW: 'bg-red-100 text-red-700',
  LCH_CLB: 'bg-orange-100 text-orange-700',
  ADMIN: 'bg-slate-100 text-slate-700',
};

export default function AdminPage() {
  const { isRole } = useAuth();
  const [tab, setTab] = useState<'users' | 'units'>('users');
  const [users, setUsers] = useState<NguoiDung[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAddUnit, setShowAddUnit] = useState(false);
  const [newUnit, setNewUnit] = useState({ ten_don_vi: '', cap_do: 'KHOA_CLB', parent_id: '' });
  const [submitting, setSubmitting] = useState(false);

  if (!isRole('ADMIN', 'CB_TRUONG')) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Shield size={48} className="text-slate-300 mb-4" />
        <h3 className="text-lg font-semibold text-slate-600">Không có quyền truy cập</h3>
        <p className="text-slate-400 text-sm mt-1">Trang này chỉ dành cho Admin và Cán bộ Trường</p>
      </div>
    );
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      // These endpoints need to be added to auth-service and unit-service
      const [unitRes] = await Promise.all([
        api.get('/units'),
      ]);
      setUnits(unitRes.data || []);
      // Mock users from seed data
      setUsers([
        { id: '1', ho_ten: 'Nguyễn Văn An', email: 'sinhvien1@vnu.edu.vn', msv: '21020001', vai_tro: 'SINH_VIEN', trang_thai: 'ACTIVE' },
        { id: '2', ho_ten: 'Trần Thị Bình', email: 'sinhvien2@vnu.edu.vn', msv: '21020002', vai_tro: 'SINH_VIEN', trang_thai: 'ACTIVE' },
        { id: '3', ho_ten: 'Lê Văn Cường', email: 'cbtruong@vnu.edu.vn', vai_tro: 'CB_TRUONG', trang_thai: 'ACTIVE' },
        { id: '4', ho_ten: 'Phạm Thị Dung', email: 'cbtinh@sv5t.vn', vai_tro: 'CB_TINH', trang_thai: 'ACTIVE' },
        { id: '5', ho_ten: 'Hoàng Văn Em', email: 'cbtw@sv5t.vn', vai_tro: 'CB_TW', trang_thai: 'ACTIVE' },
        { id: '6', ho_ten: 'Admin System', email: 'admin@sv5t.vn', vai_tro: 'ADMIN', trang_thai: 'ACTIVE' },
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAddUnit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/units', newUnit);
      setShowAddUnit(false);
      setNewUnit({ ten_don_vi: '', cap_do: 'KHOA_CLB', parent_id: '' });
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Lỗi thêm đơn vị');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredUsers = users.filter(u =>
    u.ho_ten.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.msv || '').includes(search)
  );

  const CAP_DO_LABELS: Record<string, string> = { TW: 'Trung ương', TINH: 'Tỉnh/TP', TRUONG: 'Trường', KHOA_CLB: 'Khoa/CLB' };
  const CAP_DO_COLORS: Record<string, string> = { TW: 'bg-red-100 text-red-700', TINH: 'bg-purple-100 text-purple-700', TRUONG: 'bg-blue-100 text-blue-700', KHOA_CLB: 'bg-green-100 text-green-700' };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Quản trị Hệ thống</h2>
        <p className="text-slate-500 mt-1">Quản lý tài khoản, đơn vị và cấu hình hệ thống</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[['users', Users, 'Tài khoản'], ['units', Building2, 'Đơn vị']].map(([val, Icon, label]) => (
          <button key={val as string} onClick={() => setTab(val as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              tab === val ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
            }`}>
            <Icon size={16} />
            {label as string}
          </button>
        ))}
        <button onClick={fetchData} className="ml-auto p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500">
          <RefreshCw size={16} />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : tab === 'users' ? (
        <div className="space-y-4">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Tìm kiếm theo tên, email, MSV..."
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white" />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(VAI_TRO_LABELS).slice(0, 3).map(([role, label]) => (
              <div key={role} className="bg-white border border-slate-100 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-slate-800">{users.filter(u => u.vai_tro === role).length}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Họ tên</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email / MSV</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Vai trò</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {u.ho_ten[0]}
                        </div>
                        <span className="font-medium text-slate-800">{u.ho_ten}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">
                      <p>{u.email}</p>
                      {u.msv && <p className="text-xs text-slate-400">MSV: {u.msv}</p>}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${VAI_TRO_COLORS[u.vai_tro] || 'bg-slate-100 text-slate-600'}`}>
                        {VAI_TRO_LABELS[u.vai_tro] || u.vai_tro}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`flex items-center gap-1 text-xs ${u.trang_thai === 'ACTIVE' ? 'text-green-600' : 'text-red-500'}`}>
                        {u.trang_thai === 'ACTIVE' ? <Unlock size={12} /> : <Lock size={12} />}
                        {u.trang_thai === 'ACTIVE' ? 'Hoạt động' : 'Bị khóa'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filteredUsers.length && (
              <div className="text-center py-10 text-slate-400">Không tìm thấy tài khoản</div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => setShowAddUnit(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700">
              <Plus size={16} /> Thêm đơn vị
            </button>
          </div>

          {showAddUnit && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-5">Thêm đơn vị mới</h3>
                <form onSubmit={handleAddUnit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tên đơn vị *</label>
                    <input required value={newUnit.ten_don_vi} onChange={e => setNewUnit({ ...newUnit, ten_don_vi: e.target.value })}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400"
                      placeholder="VD: CLB Lập trình ĐHQGHN" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Cấp độ *</label>
                    <select value={newUnit.cap_do} onChange={e => setNewUnit({ ...newUnit, cap_do: e.target.value })}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400">
                      {Object.entries(CAP_DO_LABELS).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Đơn vị cha</label>
                    <select value={newUnit.parent_id} onChange={e => setNewUnit({ ...newUnit, parent_id: e.target.value })}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400">
                      <option value="">-- Không có (Root) --</option>
                      {units.map(u => <option key={u.id} value={u.id}>{u.ten_don_vi}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setShowAddUnit(false)}
                      className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm">Hủy</button>
                    <button type="submit" disabled={submitting}
                      className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium disabled:opacity-50">
                      {submitting ? 'Đang thêm...' : 'Thêm đơn vị'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tên đơn vị</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cấp độ</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {units.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800">{u.ten_don_vi}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${CAP_DO_COLORS[u.cap_do] || 'bg-slate-100 text-slate-600'}`}>
                        {CAP_DO_LABELS[u.cap_do] || u.cap_do}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs ${u.trang_thai ? 'text-green-600' : 'text-red-500'}`}>
                        {u.trang_thai ? '✓ Hoạt động' : '✗ Tạm dừng'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!units.length && (
              <div className="text-center py-10 text-slate-400">Chưa có đơn vị nào</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
