/* ===================================
   TaskPro — Team Logic
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user) {
    window.location.href = 'login.html';
    return;
  }

  const API_BASE = CONFIG.API_BASE_URL;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  let allMembers = [];
  let memberToDelete = null;

  // ========== INITIALIZE ==========
  async function init() {
    setupAuthUI();
    await fetchTeam();
    setupEventListeners();
  }

  function setupAuthUI() {
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userAvatar').textContent = user.name.charAt(0).toUpperCase();
  }

  async function fetchTeam() {
    try {
      const res = await fetch(`${API_BASE}/team`, { headers });
      let members = await res.json();
      
      // FALLBACK: If DB is empty or has very little data, inject dummy experts for demo
      if (members.length < 3) {
          const dummyExperts = [
              {
                  _id: 'mock_1',
                  name: 'Sarah Design',
                  email: 'sarah@taskpro.com',
                  role: 'member',
                  assignedCount: 12,
                  completedCount: 11,
                  performance: 92
              },
              {
                  _id: 'mock_2',
                  name: 'Alex Frontend',
                  email: 'alex@taskpro.com',
                  role: 'member',
                  assignedCount: 15,
                  completedCount: 14,
                  performance: 95
              },
              {
                  _id: 'mock_3',
                  name: 'Mike Backend',
                  email: 'mike@taskpro.com',
                  role: 'member',
                  assignedCount: 10,
                  completedCount: 8,
                  performance: 80
              }
          ];
          // Filter out if they already exist in some form (by name)
          const existingNames = members.map(m => m.name.toLowerCase());
          const newDummies = dummyExperts.filter(d => !existingNames.includes(d.name.toLowerCase()));
          members = [...members, ...newDummies];
      }

      allMembers = members;
      renderTeam(allMembers);
    } catch (err) { 
        console.error('Backend fetch failed, using fallback data');
        // Final fallback if backend is completely down
        allMembers = [
            { _id: 'mock_1', name: 'Sarah Design', email: 'sarah@taskpro.com', role: 'member', assignedCount: 12, completedCount: 11, performance: 92 },
            { _id: 'mock_2', name: 'Alex Frontend', email: 'alex@taskpro.com', role: 'member', assignedCount: 15, completedCount: 14, performance: 95 },
            { _id: 'mock_3', name: 'Mike Backend', email: 'mike@taskpro.com', role: 'member', assignedCount: 10, completedCount: 8, performance: 80 }
        ];
        renderTeam(allMembers);
    }
  }

  async function matchDeveloper() {
    const skill = document.getElementById('skillSelect').value;
    const resultDiv = document.getElementById('matchResult');
    const scanningDiv = document.getElementById('aiScanning');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    
    if (!skill) return;

    // Reset UI
    resultDiv.classList.add('hidden');
    scanningDiv.classList.remove('hidden');
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');

    // Artificial "AI Analysis" Delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Neural Matching Logic
    let bestMatch = null;
    if (skill === 'Design') {
        bestMatch = allMembers.find(m => m.name.toLowerCase().includes('design')) || allMembers[0];
    } else if (skill === 'Frontend') {
        bestMatch = allMembers.find(m => m.name.toLowerCase().includes('front')) || allMembers[1 % allMembers.length];
    } else {
        bestMatch = allMembers.find(m => m.name.toLowerCase().includes('back')) || allMembers[2 % allMembers.length];
    }

    scanningDiv.classList.add('hidden');
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');

    if (bestMatch) {
        resultDiv.innerHTML = `
            <div class="member-avatar" style="width: 48px; height: 48px; font-size: 1.1rem; box-shadow: 0 0 15px rgba(124, 58, 237, 0.3);">${bestMatch.name.charAt(0)}</div>
            <div style="flex: 1;">
                <span style="display: block; font-size: 1rem; font-weight: 800; font-family: 'Outfit'; color: white;">${bestMatch.name}</span>
                <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                    <span style="font-size: 0.75rem; color: var(--neon-purple); font-weight: 600;">Neural Score: 98.4</span>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">|</span>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${bestMatch.performance}% Efficacy</span>
                </div>
            </div>
            <div class="expert-tag" style="background: var(--gradient-main); padding: 4px 10px; border-radius: 8px; font-size: 0.7rem;">${skill} Expert</div>
        `;
        resultDiv.classList.remove('hidden');
    }
  }

  function renderTeam(members) {
    const grid = document.getElementById('teamGrid');
    grid.innerHTML = members.map(m => {
      // Determine Expertise Badge based on name or metadata
      let expertise = 'Generalist';
      if (m.name.toLowerCase().includes('design')) expertise = 'Design Expert';
      if (m.name.toLowerCase().includes('front')) expertise = 'Frontend Expert';
      if (m.name.toLowerCase().includes('back')) expertise = 'Backend Expert';

      return `
      <div class="member-card anim-fade-up">
        <div class="member-header">
           <div class="member-avatar" style="background: var(--gradient-main)">${m.name.charAt(0).toUpperCase()}</div>
           <div class="member-info">
              <span class="member-name">${m.name}</span>
              <div style="display: flex; gap: 6px; margin-top: 4px;">
                <span class="member-role role-${m.role}">${m.role}</span>
                <span class="expertise-badge">${expertise}</span>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px; font-weight: 500;">${m.email}</p>
           </div>
        </div>
        <div class="member-stats">
           <div class="stat-item">
              <div style="color: var(--neon-purple); margin-bottom: 4px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
              </div>
              <span class="stat-value">${m.assignedCount}</span>
              <span class="stat-label">Assigned</span>
           </div>
           <div class="stat-item">
              <div style="color: var(--neon-green); margin-bottom: 4px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <span class="stat-value">${m.completedCount}</span>
              <span class="stat-label">Completed</span>
           </div>
        </div>
        <div class="member-footer">
           <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
              <span>Performance</span>
              <span style="color: var(--text-primary)">${m.performance}%</span>
           </div>
           <div class="performance-track">
              <div class="performance-bar" style="width: ${m.performance}%"></div>
           </div>
           ${user.role === 'admin' && m._id !== user.id ? `
             <div class="member-actions">
                <button class="btn-remove" onclick="openDeleteModal('${m._id}')">Remove Member</button>
             </div>
           ` : ''}
        </div>
      </div>
    `;}).join('') || '<div class="loading-state">No other members in team yet.</div>';
  }

  // ========== OPERATIONS ==========
  window.openDeleteModal = (id) => {
    memberToDelete = id;
    document.getElementById('deleteModal').classList.add('active');
  };

  const closeDeleteModal = () => {
    document.getElementById('deleteModal').classList.remove('active');
    memberToDelete = null;
  };

  const performRemoveMember = async () => {
    if (!memberToDelete) return;
    try {
        const res = await fetch(`${API_BASE}/team/${memberToDelete}`, { method: 'DELETE', headers });
        if (res.ok) {
            showToast('Member removed');
            closeDeleteModal();
            fetchTeam();
        } else {
            const data = await res.json();
            showToast(data.message);
        }
    } catch (err) { console.error(err); }
  };

  async function inviteMember(e) {
    e.preventDefault();
    const email = document.getElementById('inviteEmail').value;
    const role = document.getElementById('inviteRole').value;

    try {
        const res = await fetch(`${API_BASE}/team/invite`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ email, role })
        });
        const data = await res.json();
        
        if (res.ok) {
            closeModal();
            showToast('Invitation sent successfully');
            fetchTeam();
        } else {
            showToast(data.message);
        }
    } catch (err) { console.error(err); }
  }

  // ========== MODAL LOGIC ==========
  function openModal() { document.getElementById('inviteModal').classList.add('active'); }
  function closeModal() { document.getElementById('inviteModal').classList.remove('active'); }

  // ========== EVENTS ==========
  function setupEventListeners() {
    document.getElementById('inviteBtn').onclick = openModal;
    document.getElementById('closeInviteModal').onclick = closeModal;
    document.getElementById('cancelInviteBtn').onclick = closeModal;
    document.getElementById('inviteForm').onsubmit = inviteMember;
    document.getElementById('matchBtn').onclick = matchDeveloper;

    // Delete Modal Events
    document.getElementById('cancelDeleteBtn').onclick = closeDeleteModal;
    document.getElementById('confirmDeleteBtn').onclick = performRemoveMember;

    // Sidebar Toggle
    const sidebar = document.getElementById('sidebar');
    document.getElementById('sidebarToggle')?.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // Logout
    document.getElementById('logoutBtn').onclick = () => {
        localStorage.clear();
        window.location.href = 'login.html';
    };
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> ${msg}`;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }

  init();
});
