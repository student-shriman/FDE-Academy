import React, { useState, useEffect, useCallback } from 'react';
import { 
  Shield, 
  Users, 
  UserCheck, 
  GraduationCap, 
  Award, 
  Trash2, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Lock,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { apiGetAdminUsers, apiUpdateUserRole, apiDeleteUser, apiGetAdminStats } from '../services/api';

export default function Admin({ user, onNavigate }) {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const loadData = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const [fetchedUsers, fetchedStats] = await Promise.all([
        apiGetAdminUsers(user.id),
        apiGetAdminStats(user.id)
      ]);
      setUsers(fetchedUsers);
      setStats(fetchedStats);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to load user directory.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      loadData();
    }
  }, [user, loadData]);

  const handleRoleChange = async (targetUserId, newRole) => {
    setProcessingId(targetUserId);
    setStatusMessage(null);
    setErrorMessage(null);
    try {
      await apiUpdateUserRole(user.id, targetUserId, newRole);
      setStatusMessage(`User role successfully updated to ${newRole.toUpperCase()}.`);
      // Update local state
      setUsers(prev => prev.map(u => u.id === targetUserId ? { ...u, role: newRole } : u));
      // Refresh stats
      const updatedStats = await apiGetAdminStats(user.id);
      setStats(updatedStats);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to update user role.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDeleteUser = async (targetUser) => {
    if (targetUser.id === user.id) {
      setErrorMessage('You cannot delete your own active administrator account.');
      return;
    }
    const confirmed = window.confirm(`Are you sure you want to delete user "${targetUser.name}" (${targetUser.email || targetUser.identifier})? This action will permanently remove their account and progress.`);
    if (!confirmed) return;

    setProcessingId(targetUser.id);
    setStatusMessage(null);
    setErrorMessage(null);
    try {
      await apiDeleteUser(user.id, targetUser.id);
      setStatusMessage(`User "${targetUser.name}" was successfully removed.`);
      setUsers(prev => prev.filter(u => u.id !== targetUser.id));
      const updatedStats = await apiGetAdminStats(user.id);
      setStats(updatedStats);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to delete user.');
    } finally {
      setProcessingId(null);
    }
  };

  // Filter users based on query and role filter
  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      (u.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.identifier || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    if (roleFilter === 'all') return matchesSearch;
    return matchesSearch && u.role === roleFilter;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-pink-400">
                <Shield className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                <span>RBAC &amp; User Control Center</span>
                <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  Admin Only
                </span>
              </h1>
            </div>
            <p className="text-slate-400 text-sm mt-1.5">
              Manage user roles, platform permissions, and review real-time learner progress across FDE Academy.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={loading}
              className="flex items-center gap-2 py-2 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
              title="Refresh roster"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 py-2 px-3.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-semibold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>

        {/* Status / Error alerts */}
        {statusMessage && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="font-medium">{statusMessage}</span>
            </div>
            <button onClick={() => setStatusMessage(null)} className="text-emerald-400 hover:text-white text-xs">&times;</button>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button onClick={() => setErrorMessage(null)} className="text-rose-400 hover:text-white text-xs">&times;</button>
          </div>
        )}

        {/* KPI Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Total Users</span>
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">{stats.total_users}</div>
              <div className="text-[11px] text-slate-500 mt-1">Platform Accounts</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Admins</span>
                <Shield className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-rose-300">{stats.admins}</div>
              <div className="text-[11px] text-slate-500 mt-1">Full Privileges</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Reviewers</span>
                <Award className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-cyan-300">{stats.reviewers}</div>
              <div className="text-[11px] text-slate-500 mt-1">Submission Reviewers</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Students</span>
                <GraduationCap className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-300">{stats.students}</div>
              <div className="text-[11px] text-slate-500 mt-1">Active Learners</div>
            </div>

            <div className="col-span-2 lg:col-span-1 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Completions</span>
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300">{stats.total_completions}</div>
              <div className="text-[11px] text-slate-500 mt-1">Subtopics Finished</div>
            </div>
          </div>
        )}

        {/* User Management Section */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 sm:p-6 space-y-5">
          
          {/* Controls Bar: Search & Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or phone..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto overflow-x-auto">
              {['all', 'admin', 'reviewer', 'student'].map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer whitespace-nowrap ${
                    roleFilter === role
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {role === 'all' ? 'All Roles' : role}
                </button>
              ))}
            </div>

          </div>

          {/* User Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] font-mono border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Identifier / Contact</th>
                  <th className="py-3 px-4">Auth Type</th>
                  <th className="py-3 px-4">Role &amp; Permissions</th>
                  <th className="py-3 px-4 text-center">Progress</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-slate-500">
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                        <span>Loading user directory...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-slate-500">
                      No users match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => {
                    const isSelf = u.id === user.id;
                    const isBusy = processingId === u.id;

                    return (
                      <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                        
                        {/* Avatar & Name */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 flex items-center justify-center shrink-0">
                              {u.avatar_url ? (
                                <img src={u.avatar_url} alt={u.name} className="w-full h-full rounded-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-cyan-300 font-bold text-xs">
                                  {(u.name || 'U').charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-white flex items-center gap-2">
                                <span>{u.name}</span>
                                {isSelf && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                                    You
                                  </span>
                                )}
                              </div>
                              <div className="text-slate-500 text-[11px] font-mono">ID: #{u.id}</div>
                            </div>
                          </div>
                        </td>

                        {/* Identifier */}
                        <td className="py-3 px-4 font-mono text-xs text-slate-300">
                          <div>{u.email || u.identifier}</div>
                          {u.phone && <div className="text-slate-500 text-[11px]">{u.phone}</div>}
                        </td>

                        {/* Auth Type */}
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            u.auth_type === 'google'
                              ? 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                              : u.auth_type === 'phone'
                              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                              : 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            <span className="capitalize">{u.auth_type || 'email'}</span>
                          </span>
                        </td>

                        {/* Role Selector */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <select
                              value={u.role}
                              disabled={isBusy}
                              onChange={(e) => handleRoleChange(u.id, e.target.value)}
                              className={`bg-slate-950 border text-xs font-bold rounded-lg px-2.5 py-1.5 transition-colors cursor-pointer focus:outline-none ${
                                u.role === 'admin'
                                  ? 'border-rose-500/50 text-rose-300'
                                  : u.role === 'reviewer'
                                  ? 'border-cyan-500/50 text-cyan-300'
                                  : 'border-slate-700 text-slate-300'
                              }`}
                            >
                              <option value="student">Student</option>
                              <option value="reviewer">Reviewer</option>
                              <option value="admin">Admin</option>
                            </select>
                            {isBusy && <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" />}
                          </div>
                        </td>

                        {/* Progress */}
                        <td className="py-3 px-4 text-center">
                          <div className="font-mono font-bold text-emerald-400">
                            {u.completed_subtopics || 0}
                          </div>
                          <div className="text-[10px] text-slate-500">subtopics</div>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteUser(u)}
                            disabled={isSelf || isBusy}
                            title={isSelf ? 'Cannot delete your own account' : 'Delete user'}
                            className={`p-2 rounded-lg transition-colors ${
                              isSelf 
                                ? 'text-slate-600 cursor-not-allowed opacity-40' 
                                : 'text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer'
                            }`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}
