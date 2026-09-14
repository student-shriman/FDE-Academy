// API client for AI Academy with Supabase Cloud PostgreSQL authentication

export async function apiSignUp(payload) {
  let res;
  try {
    res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (networkErr) {
    throw new Error('Could not connect to backend server. Please verify the API service is active.');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Sign up failed. Please check your details.');
  }
  const data = await res.json();
  return data.user;
}

export async function apiSignIn(identifier, password) {
  let res;
  try {
    res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });
  } catch (networkErr) {
    throw new Error('Could not connect to backend server. Please verify the API service is active.');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Invalid credentials. Please check your Gmail/phone and password.');
  }
  const data = await res.json();
  return data.user;
}

export async function apiGoogleSignIn(credential) {
  let res;
  try {
    res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
    });
  } catch (networkErr) {
    throw new Error('Could not connect to backend server. Please verify the API service is active.');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Google authentication failed. Please try again.');
  }
  const data = await res.json();
  return data.user;
}

export async function apiGetProgress(userId) {
  if (!userId) return null;
  try {
    const res = await fetch(`/api/progress?user_id=${userId}`);
    if (!res.ok) throw new Error('Failed to fetch progress');
    return await res.json();
  } catch (err) {
    // Fallback to localStorage
    const saved = localStorage.getItem(`fde_progress_${userId}`) || '{}';
    const completed = JSON.parse(saved);
    const subIds = Object.keys(completed).filter(k => completed[k]);
    return {
      completed_subtopics: subIds,
      total_completed: subIds.length,
      total_subtopics: 223,
      overall_percentage: Math.round((subIds.length / 223) * 1000) / 10,
      p0_completed_count: subIds.filter(s => s.startsWith('sub_') && parseInt(s.replace('sub_', '')) <= 30).length,
      p0_total_subtopics: 30,
      p0_percentage: Math.round((subIds.length / 30) * 1000) / 10,
      completed_hours: subIds.length * 2,
      total_hours: 398.2,
    };
  }
}

export async function apiToggleProgress(userId, subtopicId, chapterId) {
  if (!userId || !subtopicId) return null;
  try {
    const res = await fetch('/api/progress/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, subtopic_id: subtopicId, chapter_id: chapterId }),
    });
    if (!res.ok) throw new Error('Failed to toggle progress');
    return await res.json();
  } catch (err) {
    // Local fallback
    const key = `fde_progress_${userId}`;
    const saved = JSON.parse(localStorage.getItem(key) || '{}');
    saved[subtopicId] = !saved[subtopicId];
    localStorage.setItem(key, JSON.stringify(saved));
    return apiGetProgress(userId);
  }
}

// --- ADMIN RBAC API CLIENT ---

export async function apiGetAdminUsers(adminUserId) {
  const res = await fetch(`/api/admin/users?admin_user_id=${adminUserId}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Failed to fetch users.');
  }
  const data = await res.json();
  return data.users;
}

export async function apiUpdateUserRole(adminUserId, targetUserId, newRole) {
  const res = await fetch(`/api/admin/users/${targetUserId}/role`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ admin_user_id: adminUserId, role: newRole }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Failed to update user role.');
  }
  return await res.json();
}

export async function apiDeleteUser(adminUserId, targetUserId) {
  const res = await fetch(`/api/admin/users/${targetUserId}?admin_user_id=${adminUserId}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Failed to delete user.');
  }
  return await res.json();
}

export async function apiGetAdminStats(adminUserId) {
  const res = await fetch(`/api/admin/stats?admin_user_id=${adminUserId}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Failed to fetch admin stats.');
  }
  return await res.json();
}

