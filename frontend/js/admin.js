/**
 * Clean Shield Pro - Admin Dashboard Operations Logic
 * Rajamahendravaram Operations Desk
 * MongoDB Atlas Real-Time Dynamic Integration
 */

let currentAlertCount = 0;
let dashboardPollInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  checkAdminAuth();
  initStorageAlerts();
  loadPricingForm();

  // Set default manual booking date to tomorrow
  const mDate = document.getElementById('mDate');
  if (mDate) {
    const tmrw = new Date();
    tmrw.setDate(tmrw.getDate() + 1);
    mDate.value = tmrw.toISOString().split('T')[0];
  }

  // Periodic MongoDB sync every 15 seconds
  dashboardPollInterval = setInterval(() => {
    const token = localStorage.getItem('csp_admin_token');
    if (token) {
      refreshDashboard(false);
    }
  }, 15000);
});

/* ===================================================================
   Owner Authentication & Session Verification
   =================================================================== */
function checkAdminAuth() {
  const token = localStorage.getItem('csp_admin_token');
  const overlay = document.getElementById('ownerAuthOverlay');
  const layout = document.getElementById('adminLayoutRoot');

  if (!token) {
    // Show login screen
    if (overlay) overlay.style.display = 'flex';
    if (layout) layout.style.display = 'none';
    return false;
  }

  // Authenticated
  if (overlay) overlay.style.display = 'none';
  if (layout) layout.style.display = 'flex';

  // Populate owner chip details
  const storedUser = localStorage.getItem('csp_admin_user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      const nameEl = document.getElementById('ownerDisplayName');
      const letterEl = document.getElementById('ownerAvatarLetter');
      if (nameEl) nameEl.textContent = user.name || user.email;
      if (letterEl) letterEl.textContent = (user.name || user.email || 'O').charAt(0).toUpperCase();
    } catch (e) {}
  }

  // Load live data from MongoDB
  refreshDashboard(true);
  return true;
}

async function handleOwnerLogin(e) {
  e.preventDefault();
  const emailInput = document.getElementById('ownerEmail');
  const passwordInput = document.getElementById('ownerPassword');
  const errorAlert = document.getElementById('authErrorAlert');
  const submitBtn = document.getElementById('loginSubmitBtn');
  const btnText = document.getElementById('loginBtnText');

  const email = emailInput ? emailInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value : '';

  if (!email || !password) {
    if (errorAlert) {
      errorAlert.textContent = 'Please enter both owner email and password.';
      errorAlert.style.display = 'block';
    }
    return;
  }

  if (errorAlert) errorAlert.style.display = 'none';
  if (submitBtn) submitBtn.disabled = true;
  if (btnText) btnText.textContent = 'Verifying credentials...';

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    let data = null;
    try {
      data = await res.json();
    } catch (parseErr) {
      // Response was not JSON (e.g., HTML error page)
    }

    if (res.ok && data && data.success) {
      // Store token and user data
      localStorage.setItem('csp_admin_token', data.token);
      localStorage.setItem('csp_admin_user', JSON.stringify(data.admin));

      // Unlock console
      const overlay = document.getElementById('ownerAuthOverlay');
      const layout = document.getElementById('adminLayoutRoot');
      if (overlay) overlay.style.display = 'none';
      if (layout) layout.style.display = 'flex';

      // Update owner chip
      const nameEl = document.getElementById('ownerDisplayName');
      const letterEl = document.getElementById('ownerAvatarLetter');
      if (nameEl) nameEl.textContent = data.admin.name || data.admin.email;
      if (letterEl) letterEl.textContent = (data.admin.name || 'O').charAt(0).toUpperCase();

      showToast(`Namaste, ${data.admin.name}! Welcome to Clean Shield Pro Operations.`);
      refreshDashboard(true);
    } else {
      if (errorAlert) {
        let msg = 'Authentication failed. Please verify your credentials.';
        if (data && data.message) {
          msg = data.message;
        } else if (res.status === 401) {
          msg = 'Invalid owner credentials. Please verify your email and password.';
        } else if (res.status === 404) {
          msg = `Authentication endpoint not found (HTTP 404 at ${API_BASE_URL}/auth/login).`;
        } else if (res.status === 500) {
          msg = 'Backend server encountered an internal error (HTTP 500). Please check server logs.';
        } else if (res.status === 502 || res.status === 503) {
          msg = 'Backend service is starting up or temporarily sleeping. Please wait 15 seconds and try again.';
        } else if (!res.ok) {
          msg = `Server returned HTTP ${res.status}: ${res.statusText || 'Unable to authenticate'}.`;
        }
        errorAlert.textContent = msg;
        errorAlert.style.display = 'block';
      }
    }
  } catch (err) {
    if (errorAlert) {
      const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      const targetUrl = typeof API_BASE_URL !== 'undefined' ? API_BASE_URL : 'backend server';
      errorAlert.textContent = isLocal
        ? `Cannot reach local backend server at ${targetUrl}. Please verify the server is running on port 5000.`
        : `Cannot reach backend API server at ${targetUrl}. Please verify your connection or that the Render service is online.`;
      errorAlert.style.display = 'block';
    }
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    if (btnText) btnText.textContent = 'Sign In as Owner';
  }
}

function handleOwnerLogout() {
  localStorage.removeItem('csp_admin_token');
  localStorage.removeItem('csp_admin_user');

  const overlay = document.getElementById('ownerAuthOverlay');
  const layout = document.getElementById('adminLayoutRoot');
  if (overlay) overlay.style.display = 'flex';
  if (layout) layout.style.display = 'none';

  showToast('You have signed out from the admin portal.');
}

function fillOwnerAccount(email) {
  const emailInput = document.getElementById('ownerEmail');
  const passwordInput = document.getElementById('ownerPassword');
  if (emailInput) emailInput.value = email;
  if (passwordInput) passwordInput.value = 'CleanShieldPro@2026';
}

function togglePasswordVisibility() {
  const pwdInput = document.getElementById('ownerPassword');
  const showIcon = document.getElementById('eyeIconShow');
  const hideIcon = document.getElementById('eyeIconHide');
  const checkbox = document.getElementById('showPasswordCheckbox');
  if (!pwdInput) return;

  const isPassword = pwdInput.type === 'password';
  pwdInput.type = isPassword ? 'text' : 'password';

  if (showIcon && hideIcon) {
    showIcon.style.display = isPassword ? 'none' : 'block';
    hideIcon.style.display = isPassword ? 'block' : 'none';
  }
  if (checkbox) {
    checkbox.checked = isPassword;
  }
}

function togglePasswordCheckbox(cb) {
  const pwdInput = document.getElementById('ownerPassword');
  const showIcon = document.getElementById('eyeIconShow');
  const hideIcon = document.getElementById('eyeIconHide');
  if (!pwdInput) return;

  pwdInput.type = cb.checked ? 'text' : 'password';
  if (showIcon && hideIcon) {
    showIcon.style.display = cb.checked ? 'none' : 'block';
    hideIcon.style.display = cb.checked ? 'block' : 'none';
  }
}

async function manualSyncDashboard() {
  const pill = document.getElementById('dbStatusPill');
  if (pill) {
    pill.innerHTML = `<span class="badge-dot"></span> Syncing...`;
  }
  await refreshDashboard(true);
  if (pill) {
    pill.innerHTML = `<span class="badge-dot"></span> MongoDB Live`;
  }
  showToast('MongoDB Atlas database synchronized!');
}

/* ===================================================================
   Tab Navigation
   =================================================================== */
function switchTab(tabId, el) {
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  const targetPanel = document.getElementById(tabId);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }

  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.classList.remove('active');
  });
  if (el) el.classList.add('active');

  const titles = {
    'tabBookings': 'Bookings & Operations Management',
    'tabEnquiries': 'Custom Quote Enquiries & Inbound Leads',
    'tabCustomers': 'Customer Directory (15+ Branches Network • 10,000+ Customers)',
    'tabReviews': 'Customer Reviews Moderation',
    'tabPricing': 'Service Pricing Configuration',
    'tabTemplates': 'WhatsApp Official Dispatch Templates'
  };

  const titleEl = document.getElementById('pageTitle');
  if (titleEl && titles[tabId]) {
    titleEl.textContent = titles[tabId];
  }
}

/* ===================================================================
   Refresh Dashboard & KPIs (MongoDB Atlas Powered)
   =================================================================== */
async function refreshDashboard(showSyncFeedback = false) {
  if (window.CleanShieldDB) {
    const fetchers = [];
    if (window.CleanShieldDB.fetchBookings) fetchers.push(window.CleanShieldDB.fetchBookings());
    if (window.CleanShieldDB.fetchEnquiries) fetchers.push(window.CleanShieldDB.fetchEnquiries());
    if (window.CleanShieldDB.fetchReviews) fetchers.push(window.CleanShieldDB.fetchReviews(false));
    await Promise.all(fetchers);
  }

  renderKPIs();
  renderBookingsTable();
  renderEnquiriesTable();
  renderCustomersTable();
  renderReviewsTable();
}

function renderKPIs() {
  const bookings = window.CleanShieldDB.getBookings();
  const enquiries = window.CleanShieldDB.getEnquiries();
  const reviews = window.CleanShieldDB.getReviews(false);

  // Total bookings
  const kpiTotalBookings = document.getElementById('kpiTotalBookings');
  if (kpiTotalBookings) kpiTotalBookings.textContent = bookings.length;

  // Sidebar badge
  const sidebarBookingsBadge = document.getElementById('sidebarBookingsBadge');
  if (sidebarBookingsBadge) sidebarBookingsBadge.textContent = bookings.length;

  // Card header count badge
  const bookingsCountBadge = document.getElementById('bookingsCountBadge');
  if (bookingsCountBadge) bookingsCountBadge.textContent = bookings.length;

  // Total revenue
  const totalRev = bookings.reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
  const kpiTotalRevenue = document.getElementById('kpiTotalRevenue');
  if (kpiTotalRevenue) kpiTotalRevenue.textContent = `₹${totalRev.toLocaleString('en-IN')}`;

  // Active enquiries
  const activeEnq = enquiries.filter(e => e.status !== 'Converted').length;
  const kpiActiveEnquiries = document.getElementById('kpiActiveEnquiries');
  if (kpiActiveEnquiries) kpiActiveEnquiries.textContent = activeEnq;

  // Sidebar enquiries badge
  const sidebarEnquiriesBadge = document.getElementById('sidebarEnquiriesBadge');
  if (sidebarEnquiriesBadge) sidebarEnquiriesBadge.textContent = activeEnq;

  const enquiriesCountBadge = document.getElementById('enquiriesCountBadge');
  if (enquiriesCountBadge) enquiriesCountBadge.textContent = enquiries.length;

  // Customers unique phone count
  const customersCountBadge = document.getElementById('customersCountBadge');
  if (customersCountBadge) {
    const phones = new Set([...bookings.map(b => (b.phone || '').replace(/\D/g, '')), ...enquiries.map(e => (e.phone || '').replace(/\D/g, ''))]);
    customersCountBadge.textContent = phones.size;
  }

  // Sidebar reviews badge
  const sidebarReviewsBadge = document.getElementById('sidebarReviewsBadge');
  if (sidebarReviewsBadge) sidebarReviewsBadge.textContent = reviews.length;

  const reviewsCountBadge = document.getElementById('reviewsCountBadge');
  if (reviewsCountBadge) reviewsCountBadge.textContent = reviews.length;

  // Avg rating
  const kpiAvgRating = document.getElementById('kpiAvgRating');
  const kpiAvgRatingMeta = document.getElementById('kpiAvgRatingMeta');

  if (reviews.length > 0) {
    const avg = (reviews.reduce((s, r) => s + (r.rating || 5), 0) / reviews.length).toFixed(1);
    if (kpiAvgRating) kpiAvgRating.textContent = `${avg} ★`;
    if (kpiAvgRatingMeta) kpiAvgRatingMeta.innerHTML = `<span class="kpi-meta-badge purple">${reviews.length} Verified Review${reviews.length > 1 ? 's' : ''}</span>`;
  } else {
    if (kpiAvgRating) kpiAvgRating.textContent = `0.0 ★`;
    if (kpiAvgRatingMeta) kpiAvgRatingMeta.innerHTML = `<span class="kpi-meta-badge purple">0 Reviews</span>`;
  }
}

/* ===================================================================
   Bookings Table & Management
   =================================================================== */
function renderBookingsTable(filteredList = null) {
  const tbody = document.getElementById('bookingsTableBody');
  if (!tbody) return;

  const bookings = filteredList || window.CleanShieldDB.getBookings();
  const countBadge = document.getElementById('bookingsCountBadge');
  if (countBadge) countBadge.textContent = bookings.length;

  if (bookings.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="empty-table-cell">
          <div class="empty-state-wrap">
            <div class="empty-icon-circle">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
            </div>
            <strong class="empty-title">No Active Bookings in Database Yet</strong>
            <p class="empty-desc">
              The portal is connected to <strong>MongoDB Atlas</strong>. When customers book any service on the website, their orders are added dynamically to the database and will appear here instantly.
            </p>
            <button class="btn-manual-booking" onclick="openManualBookingModal()">
              + Create Phone Booking
            </button>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = bookings.map(b => {
    const statusPillClass = {
      'Pending': 'status-pending',
      'Confirmed': 'status-confirmed',
      'In Progress': 'status-inprogress',
      'Completed': 'status-completed',
      'Cancelled': 'status-cancelled'
    }[b.status] || 'status-pending';

    const cfg = window.CleanShieldDB.getBusinessConfig();
    const waText = `Namaste ${b.customerName}! 🙏 Clean Shield Pro update regarding your booking ${b.id} for ${b.service} (${b.bhk || ''}) on ${b.date}. Current status: *${b.status}*. Address: ${b.address}. Helplines: ${cfg.phone1} / ${cfg.phone2}.`;
    const waUrl = window.CleanShieldDB.getWhatsAppLink(b.phone, waText);
    const emailUrl = window.CleanShieldDB.getEmailConfirmationLink(b);
    const bookingDateStr = b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : 'Recent';

    return `
      <tr>
        <td>
          <div class="cell-id-wrap">
            <span class="id-tag">${b.id}</span>
            <span class="id-date">${bookingDateStr}</span>
          </div>
        </td>
        <td>
          <div class="cell-customer">
            <strong class="customer-name">${b.customerName}</strong>
            <a href="tel:${b.phone.replace(/\s+/g, '')}" class="customer-phone" title="Call customer">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              <span>${b.phone}</span>
            </a>
          </div>
        </td>
        <td>
          <div class="cell-service">
            <span class="service-title">${b.service}</span>
            <span class="service-bhk-pill">${b.bhk || 'Standard'}</span>
          </div>
        </td>
        <td>
          <div class="cell-schedule">
            <span class="schedule-date">📅 ${b.date}</span>
            <span class="schedule-slot">${b.timeSlot}</span>
          </div>
        </td>
        <td>
          <span class="locality-pill">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            ${b.locality}
          </span>
        </td>
        <td>
          <span class="amount-val">₹${Number(b.amount).toLocaleString('en-IN')}</span>
        </td>
        <td>
          <div class="cell-payment">
            <span class="payment-badge ${b.paymentStatus === 'Paid' ? 'paid' : 'pending'}">${b.paymentStatus || 'Pending'}</span>
            <span class="payment-method-label">${b.paymentMethod}</span>
          </div>
        </td>
        <td>
          <select class="status-select-pill ${statusPillClass}" onchange="changeBookingStatus('${b.id}', this.value)">
            <option value="Pending" ${b.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="In Progress" ${b.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option value="Completed" ${b.status === 'Completed' ? 'selected' : ''}>Completed</option>
            <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td>
          <div class="action-btn-group">
            <a href="${waUrl}" target="_blank" rel="noopener" class="btn-table-wa" title="WhatsApp Customer (${b.phone})">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/></svg>
              <span>WhatsApp</span>
            </a>
            <button class="btn-table-info" onclick="showBookingDetail('${b.id}')" title="View Full Details">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              <span>Info</span>
            </button>
            <a href="${emailUrl}" class="btn-table-email" title="Email confirmation to ${cfg.email1} & ${cfg.email2}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </a>
            <button class="btn-table-delete" onclick="handleDeleteBooking('${b.id}', '${(b.customerName || '').replace(/'/g, "\\'")}', '${(b.service || '').replace(/'/g, "\\'")}')" title="Delete this service booking">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              <span>Delete</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function filterBookings() {
  const query = document.getElementById('searchBookingsInput')?.value.toLowerCase().trim() || '';
  const status = document.getElementById('statusFilterSelect')?.value || 'All';

  const all = window.CleanShieldDB.getBookings();
  const filtered = all.filter(b => {
    const matchesQuery = 
      b.id.toLowerCase().includes(query) ||
      b.customerName.toLowerCase().includes(query) ||
      b.phone.includes(query) ||
      b.locality.toLowerCase().includes(query);

    const matchesStatus = (status === 'All') || (b.status === status);

    return matchesQuery && matchesStatus;
  });

  renderBookingsTable(filtered);
}

function changeBookingStatus(bookingId, newStatus) {
  const updated = window.CleanShieldDB.updateBookingStatus(bookingId, newStatus);
  if (updated) {
    showToast(`Booking ${bookingId} updated to "${newStatus}"`);
    renderKPIs();
    renderBookingsTable();
  }
}

function handleDeleteBooking(bookingId, customerName, service) {
  const confirmed = window.confirm(`Are you sure you want to delete this booking?\n\nID: ${bookingId}\nCustomer: ${customerName}\nService: ${service}\n\nThis will permanently delete this service order from MongoDB Atlas.`);
  if (!confirmed) return;

  const deleted = window.CleanShieldDB.deleteBooking(bookingId);
  if (deleted) {
    showToast(`Booking ${bookingId} deleted permanently.`);
    renderKPIs();
    renderBookingsTable();
    renderCustomersTable();
  }
}

function showBookingDetail(bookingId) {
  const b = window.CleanShieldDB.findBooking(bookingId);
  if (!b) return;

  const body = document.getElementById('adminBookingDetailBody');
  const idEl = document.getElementById('adminDetailId');
  if (idEl) idEl.textContent = `${b.id} • ${b.status}`;

  body.innerHTML = `
    <div style="background:#F8FAF9; padding:18px; border-radius:10px; margin-bottom:16px;">
      <h4 style="color:var(--admin-primary); margin-bottom:6px;">Customer Information</h4>
      <p><strong>Name:</strong> ${b.customerName}</p>
      <p><strong>Phone:</strong> ${b.phone}</p>
      <p><strong>Locality:</strong> ${b.locality}, Rajamahendravaram</p>
      <p><strong>Full Address:</strong> ${b.address}</p>
    </div>

    <div style="background:#F8FAF9; padding:18px; border-radius:10px; margin-bottom:16px;">
      <h4 style="color:var(--admin-primary); margin-bottom:6px;">Service & Schedule</h4>
      <p><strong>Service:</strong> ${b.service}</p>
      <p><strong>Configuration:</strong> ${b.bhk || 'Standard'}</p>
      <p><strong>Scheduled Date:</strong> ${b.date}</p>
      <p><strong>Time Window:</strong> ${b.timeSlot}</p>
      <p><strong>Add-ons:</strong> ${b.addons && b.addons.length ? b.addons.join(', ') : 'None'}</p>
      <p><strong>Special Notes:</strong> ${b.notes || 'None specified'}</p>
    </div>

    <div style="background:#F8FAF9; padding:18px; border-radius:10px; margin-bottom:20px;">
      <h4 style="color:var(--admin-primary); margin-bottom:6px;">Commercials & Payment</h4>
      <p><strong>Total Amount:</strong> ₹${Number(b.amount).toLocaleString('en-IN')}</p>
      <p><strong>Payment Mode:</strong> ${b.paymentMethod}</p>
      <p><strong>Payment Status:</strong> ${b.paymentStatus || 'Pending'}</p>
    </div>

    <div style="background:#F4F8F6; border:1px solid #D5EDE3; border-radius:10px; padding:16px; margin-bottom:20px;">
      <h4 style="color:var(--admin-primary); margin-bottom:10px; font-size:0.95rem;">Send Official Confirmation Details</h4>
      
      <!-- WhatsApp Channels -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:10px;">
        <a href="${window.CleanShieldDB.getWhatsAppLink(b.phone, window.CleanShieldDB.getFormattedConfirmationText(b))}" target="_blank" rel="noopener" class="btn-action-wa" style="justify-content:center; text-decoration:none;">
          WhatsApp Customer (${b.phone})
        </a>
        <a href="${window.CleanShieldDB.getWhatsAppLink(window.CleanShieldDB.getBusinessConfig().whatsapp1, window.CleanShieldDB.getFormattedConfirmationText(b))}" target="_blank" rel="noopener" class="btn-action-wa" style="justify-content:center; text-decoration:none; background:#128C7E;">
          WhatsApp Desk (9059639955)
        </a>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px;">
        <a href="${window.CleanShieldDB.getWhatsAppLink(window.CleanShieldDB.getBusinessConfig().whatsapp2, window.CleanShieldDB.getFormattedConfirmationText(b))}" target="_blank" rel="noopener" class="btn-action-wa" style="justify-content:center; text-decoration:none; background:#1EBE5D;">
          WhatsApp Desk (8897312523)
        </a>
        <a href="${window.CleanShieldDB.getEmailConfirmationLink(b)}" class="btn-action-sm" style="display:flex; align-items:center; justify-content:center; gap:6px; background:#0D3B2E; color:#FFFFFF; text-decoration:none; padding:8px;">
          ✉️ Email to Both Inboxes
        </a>
      </div>
      <small style="color:var(--admin-text-muted); display:block; text-align:center; font-size:0.78rem;">
        Email dispatch recipients: madhuripaka756@gmail.com, prasadanem777@gmail.com
      </small>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; margin-top:16px;">
      <button class="btn-table-delete" onclick="closeModal('modalAdminBookingDetail'); handleDeleteBooking('${b.id}', '${(b.customerName || '').replace(/'/g, "\\'")}', '${(b.service || '').replace(/'/g, "\\'")}')" style="padding:7px 14px; font-size:0.82rem;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        <span>Delete Service Booking</span>
      </button>
      <div style="display:flex; gap:10px;">
        <button class="btn-action-sm" onclick="closeModal('modalAdminBookingDetail')">Close</button>
        <button class="btn-action-sm" onclick="window.print()" style="background:#0D3B2E; color:#FFFFFF;">Print Details</button>
      </div>
    </div>
  `;

  openModal('modalAdminBookingDetail');
}

/* ===================================================================
   Enquiries & Leads Management
   =================================================================== */
function renderEnquiriesTable(filteredList = null) {
  const tbody = document.getElementById('enquiriesTableBody');
  if (!tbody) return;

  const enquiries = filteredList || window.CleanShieldDB.getEnquiries();
  const countBadge = document.getElementById('enquiriesCountBadge');
  if (countBadge) countBadge.textContent = enquiries.length;

  if (enquiries.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="empty-table-cell">
          <div class="empty-state-wrap">
            <div class="empty-icon-circle">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/></svg>
            </div>
            <strong class="empty-title">No Inbound Enquiries in Database Yet</strong>
            <p class="empty-desc">
              Custom quote inquiries submitted through the website are logged dynamically into <strong>MongoDB Atlas</strong> and will appear here in real time.
            </p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = enquiries.map(e => {
    const waText = `Namaste ${e.name}! 🙏 Thank you for reaching out to Clean Shield Pro Rajamahendravaram regarding *${e.service}* in ${e.locality}. We received your requirement: "${e.details}". We are ready to provide a custom quotation. May we discuss the specifics?`;
    const waUrl = window.CleanShieldDB.getWhatsAppLink(e.phone, waText);
    const dateStr = e.createdAt ? new Date(e.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : 'Recent';
    const statusClass = {
      'New': 'status-pending',
      'Contacted': 'status-inprogress',
      'Converted': 'status-completed'
    }[e.status] || 'status-pending';

    return `
      <tr>
        <td>
          <div class="cell-id-wrap">
            <span class="id-tag lead-tag">${e.id}</span>
          </div>
        </td>
        <td>
          <div class="cell-customer">
            <strong class="customer-name">${e.name}</strong>
            <a href="tel:${e.phone.replace(/\s+/g, '')}" class="customer-phone" title="Call lead">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              <span>${e.phone}</span>
            </a>
          </div>
        </td>
        <td>
          <span class="service-title">${e.service}</span>
        </td>
        <td>
          <span class="locality-pill">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            ${e.locality}
          </span>
        </td>
        <td>
          <div class="cell-details-note" title="${e.details || ''}">
            ${e.details || 'Standard enquiry'}
          </div>
        </td>
        <td>
          <span class="schedule-date">${dateStr}</span>
        </td>
        <td>
          <select class="status-select-pill ${statusClass}" onchange="changeEnquiryStatus('${e.id}', this.value)">
            <option value="New" ${e.status === 'New' ? 'selected' : ''}>New Lead</option>
            <option value="Contacted" ${e.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
            <option value="Converted" ${e.status === 'Converted' ? 'selected' : ''}>Converted</option>
          </select>
        </td>
        <td>
          <div class="action-btn-group">
            <a href="${waUrl}" target="_blank" rel="noopener" class="btn-table-wa" title="Reply on WhatsApp">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/></svg>
              <span>Reply WA</span>
            </a>
            <button class="btn-table-delete" onclick="handleDeleteEnquiry('${e.id}', '${(e.name || '').replace(/'/g, "\\'")}', '${(e.service || '').replace(/'/g, "\\'")}')" title="Delete lead">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              <span>Delete</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function filterEnquiries() {
  const query = document.getElementById('searchEnquiriesInput')?.value.toLowerCase().trim() || '';
  const all = window.CleanShieldDB.getEnquiries();
  const filtered = all.filter(e => 
    e.id.toLowerCase().includes(query) ||
    e.name.toLowerCase().includes(query) ||
    e.phone.includes(query) ||
    e.locality.toLowerCase().includes(query) ||
    e.service.toLowerCase().includes(query)
  );
  renderEnquiriesTable(filtered);
}

function changeEnquiryStatus(enquiryId, newStatus) {
  window.CleanShieldDB.updateEnquiryStatus(enquiryId, newStatus);
  showToast(`Enquiry ${enquiryId} marked as "${newStatus}"`);
  renderKPIs();
  renderEnquiriesTable();
}

function handleDeleteEnquiry(enquiryId, name, service) {
  const confirmed = window.confirm(`Are you sure you want to delete lead ${enquiryId} from "${name}" (${service || 'Enquiry'})?\n\nThis will permanently delete it from MongoDB Atlas.`);
  if (!confirmed) return;

  const deleted = window.CleanShieldDB.deleteEnquiry(enquiryId);
  if (deleted) {
    showToast(`Lead ${enquiryId} deleted.`);
    renderKPIs();
    renderEnquiriesTable();
    renderCustomersTable();
  }
}

/* ===================================================================
   Customer Directory
   =================================================================== */
function renderCustomersTable() {
  const tbody = document.getElementById('customersTableBody');
  if (!tbody) return;

  const bookings = window.CleanShieldDB.getBookings();
  const enquiries = window.CleanShieldDB.getEnquiries();

  // Aggregate by normalized phone
  const map = new Map();

  bookings.forEach(b => {
    const key = (b.phone || '').replace(/\D/g, '');
    if (!key) return;
    if (!map.has(key)) {
      map.set(key, {
        name: b.customerName,
        phone: b.phone,
        locality: b.locality,
        bookingsCount: 0,
        totalSpent: 0
      });
    }
    const entry = map.get(key);
    entry.bookingsCount += 1;
    entry.totalSpent += (Number(b.amount) || 0);
  });

  enquiries.forEach(e => {
    const key = (e.phone || '').replace(/\D/g, '');
    if (!key) return;
    if (!map.has(key)) {
      map.set(key, {
        name: e.name,
        phone: e.phone,
        locality: e.locality,
        bookingsCount: 0,
        totalSpent: 0
      });
    }
  });

  const list = Array.from(map.values());
  const countBadge = document.getElementById('customersCountBadge');
  if (countBadge) countBadge.textContent = list.length;

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-table-cell">
          <div class="empty-state-wrap">
            <div class="empty-icon-circle">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            </div>
            <strong class="empty-title">No Customer Records Yet</strong>
            <p class="empty-desc">
              Customer contact information and repeat order frequency compile dynamically once bookings are received.
            </p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map(c => `
    <tr>
      <td>
        <div class="cell-customer">
          <strong class="customer-name">${c.name}</strong>
          <span class="customer-type-tag">${c.bookingsCount > 1 ? 'Repeat Client' : 'Direct Customer'}</span>
        </div>
      </td>
      <td>
        <a href="tel:${c.phone.replace(/\s+/g, '')}" class="customer-phone" title="Call customer">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          <span>${c.phone}</span>
        </a>
      </td>
      <td>
        <span class="locality-pill">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          ${c.locality}
        </span>
      </td>
      <td>
        <span class="order-count-badge">${c.bookingsCount} booking${c.bookingsCount === 1 ? '' : 's'}</span>
      </td>
      <td>
        <span class="amount-val">₹${c.totalSpent.toLocaleString('en-IN')}</span>
      </td>
      <td>
        <div class="action-btn-group">
          <a href="${window.CleanShieldDB.getWhatsAppLink(c.phone, `Namaste ${c.name}, greetings from Clean Shield Pro Rajamahendravaram!`)}" target="_blank" rel="noopener" class="btn-table-wa">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/></svg>
            <span>WhatsApp</span>
          </a>
          <button class="btn-table-delete" onclick="handleDeleteCustomerBookings('${c.phone}', '${(c.name || '').replace(/'/g, "\\'")}')" title="Delete all service bookings for this customer">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            <span>Delete</span>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function handleDeleteCustomerBookings(phone, customerName) {
  const confirmed = window.confirm(`Are you sure you want to delete all bookings & services for customer "${customerName}" (${phone})?\n\nThis will remove their entire service history from MongoDB Atlas.`);
  if (!confirmed) return;

  const allBookings = window.CleanShieldDB.getBookings();
  const normalizedPhone = (phone || '').replace(/\D/g, '');
  const toDelete = allBookings.filter(b => (b.phone || '').replace(/\D/g, '') === normalizedPhone);

  toDelete.forEach(b => {
    window.CleanShieldDB.deleteBooking(b.id);
  });

  const allEnquiries = window.CleanShieldDB.getEnquiries();
  const enqToDelete = allEnquiries.filter(e => (e.phone || '').replace(/\D/g, '') === normalizedPhone);
  enqToDelete.forEach(e => {
    window.CleanShieldDB.deleteEnquiry(e.id);
  });

  showToast(`Deleted ${toDelete.length} service records for ${customerName}.`);
  renderKPIs();
  renderBookingsTable();
  renderEnquiriesTable();
  renderCustomersTable();
}

/* ===================================================================
   Reviews Moderation
   =================================================================== */
function renderReviewsTable() {
  const tbody = document.getElementById('reviewsTableBody');
  if (!tbody) return;

  const reviews = window.CleanShieldDB.getReviews(false);
  const countBadge = document.getElementById('reviewsCountBadge');
  if (countBadge) countBadge.textContent = reviews.length;

  if (reviews.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-table-cell">
          <div class="empty-state-wrap">
            <div class="empty-icon-circle" style="background:#FAF0E6; color:#B7791F;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            </div>
            <strong class="empty-title">No Customer Reviews in Database Yet</strong>
            <p class="empty-desc">
              Reviews submitted dynamically by clients on the website are stored in <strong>MongoDB Atlas</strong> and appear here for moderation.
            </p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = reviews.map(r => `
    <tr>
      <td>
        <span class="id-tag">${r.id}</span>
      </td>
      <td>
        <div class="cell-customer">
          <strong class="customer-name">${r.customerName}</strong>
          <span class="locality-pill" style="font-size:0.72rem; padding:1px 6px;">${r.locality}</span>
        </div>
      </td>
      <td>
        <span class="service-title">${r.service}</span>
      </td>
      <td>
        <div class="rating-stars-pill">
          <span>★</span> ${r.rating} / 5
        </div>
      </td>
      <td>
        <div class="review-quote-box">"${r.review}"</div>
      </td>
      <td>
        <div class="action-btn-group">
          <button class="btn-visibility-toggle ${r.approved ? 'is-visible' : 'is-hidden'}" onclick="toggleReview('${r.id}')">
            <span class="vis-dot"></span>
            <span>${r.approved ? 'Visible' : 'Hidden'}</span>
          </button>
          <button class="btn-table-delete" onclick="handleDeleteReview('${r.id}')" title="Delete Review">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            <span>Delete</span>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function handleDeleteReview(reviewId) {
  const confirmed = window.confirm(`Are you sure you want to delete review ${reviewId}?\n\nThis will permanently delete it from MongoDB Atlas.`);
  if (!confirmed) return;

  const deleted = window.CleanShieldDB.deleteReview(reviewId);
  if (deleted) {
    showToast(`Review ${reviewId} deleted.`);
    renderKPIs();
    renderReviewsTable();
  }
}

function toggleReview(reviewId) {
  const updated = window.CleanShieldDB.toggleReviewStatus(reviewId);
  if (updated) {
    showToast(`Review ${reviewId} is now ${updated.approved ? 'Visible' : 'Hidden'}`);
    renderReviewsTable();
    renderKPIs();
  }
}

/* ===================================================================
   Pricing Configuration
   =================================================================== */
function loadPricingForm() {
  const pricing = window.CleanShieldDB.getPricing();
  if (!pricing) return;

  document.getElementById('priceDeep1Bhk').value = pricing.deepCleaning['1 BHK'] || 3499;
  document.getElementById('priceDeep2Bhk').value = pricing.deepCleaning['2 BHK'] || 5499;
  document.getElementById('priceDeep3Bhk').value = pricing.deepCleaning['3 BHK'] || 5999;
  document.getElementById('priceDeep4Bhk').value = pricing.deepCleaning['4 BHK+'] || 7499;

  document.getElementById('pricePest1Bhk').value = pricing.pestControl['1 BHK'] || 1499;
  document.getElementById('pricePest2Bhk').value = pricing.pestControl['2 BHK'] || 1999;
  document.getElementById('pricePest3Bhk').value = pricing.pestControl['3 BHK'] || 2499;
  document.getElementById('pricePestVilla').value = pricing.pestControl['Villas'] || 7499;
}

function handlePricingSave(e) {
  e.preventDefault();
  const newPricing = {
    deepCleaning: {
      '1 BHK': Number(document.getElementById('priceDeep1Bhk').value),
      '2 BHK': Number(document.getElementById('priceDeep2Bhk').value),
      '3 BHK': Number(document.getElementById('priceDeep3Bhk').value),
      '4 BHK+': Number(document.getElementById('priceDeep4Bhk').value)
    },
    pestControl: {
      '1 BHK': Number(document.getElementById('pricePest1Bhk').value),
      '2 BHK': Number(document.getElementById('pricePest2Bhk').value),
      '3 BHK': Number(document.getElementById('pricePest3Bhk').value),
      'Villas': Number(document.getElementById('pricePestVilla').value)
    },
    addons: {
      balconyCleaning: 499,
      fridgeDeepClean: 399,
      chimneyDegrease: 599,
      mattressSanitization: 899
    }
  };

  window.CleanShieldDB.updatePricing(newPricing);
  showToast('Pricing configuration updated! Live booking calculators synchronized.');
}

/* ===================================================================
   Real-time Lead Alerts & Sound Chime
   =================================================================== */
function initStorageAlerts() {
  // Listen for storage events across browser tabs
  window.addEventListener('storage', (e) => {
    if (e.key === 'csp_alerts' && e.newValue) {
      try {
        const alertData = JSON.parse(e.newValue);
        triggerLeadAlertUI(alertData);
      } catch (err) {}
    }
  });

  // Listen for custom events in the same tab
  window.addEventListener('csp_new_lead', (e) => {
    triggerLeadAlertUI(e.detail);
  });
}

function triggerLeadAlertUI(alertData) {
  playAlertChime();
  currentAlertCount += 1;

  const badge = document.getElementById('topbarAlertCount');
  if (badge) badge.textContent = currentAlertCount;

  const banner = document.getElementById('liveLeadBanner');
  const title = document.getElementById('leadBannerTitle');
  const desc = document.getElementById('leadBannerDesc');
  const waBtn = document.getElementById('leadBannerWaBtn');

  if (banner && title && desc) {
    title.textContent = alertData.title || 'New Inbound Lead!';
    desc.textContent = alertData.message;
    if (waBtn) {
      waBtn.href = window.CleanShieldDB.getWhatsAppLink('919494281234', `Hello, reviewing lead ${alertData.id}: ${alertData.message}`);
    }
    banner.style.display = 'flex';
  }

  refreshDashboard();
  showToast(`🚨 ${alertData.title}`);
}

function dismissLeadBanner() {
  const banner = document.getElementById('liveLeadBanner');
  if (banner) banner.style.display = 'none';
}

function showRecentAlerts() {
  const raw = localStorage.getItem('csp_alerts');
  if (raw) {
    try {
      const alert = JSON.parse(raw);
      alert(`${alert.title}\n\n${alert.message}\nTime: ${alert.time}`);
    } catch (e) {
      alert('No new alerts.');
    }
  } else {
    alert('No new alerts.');
  }
}

// Web Audio API beep sound for live lead alerts
function playAlertChime() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
    osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
  } catch (e) {
    // Audio context may require user interaction
  }
}

/* ===================================================================
   Manual Booking Modal (Phone / Walk-in)
   =================================================================== */
function openManualBookingModal() {
  openModal('modalManualBooking');
}

function handleManualBookingSubmit(e) {
  e.preventDefault();
  const customerName = document.getElementById('mCustName').value.trim();
  const phone = document.getElementById('mCustPhone').value.trim();
  const service = document.getElementById('mService').value;
  const bhk = document.getElementById('mBhk').value;
  const date = document.getElementById('mDate').value;
  const timeSlot = document.getElementById('mTime').value;
  const locality = document.getElementById('mLocality').value;
  const amount = Number(document.getElementById('mAmount').value);
  const street = document.getElementById('mAddress').value.trim();
  const paymentMethod = document.getElementById('mPayment').value;

  const newBooking = window.CleanShieldDB.addBooking({
    customerName,
    phone,
    service,
    bhk,
    date,
    timeSlot,
    locality,
    amount,
    address: locality.toLowerCase().includes('rajahmundry') || ['danavaipeta', 'prakash nagar', 'morampudi', 'lalacheruvu', 'dowleswaram', 'diwancheruvu', 'aryapuram', 'innespeta', 'other'].includes(locality.toLowerCase())
      ? `${street}, ${locality}, Rajamahendravaram`
      : `${street}, ${locality}`,
    paymentMethod,
    status: 'Confirmed'
  });

  closeModal('modalManualBooking');
  if (document.getElementById('manualBookingForm')) {
    document.getElementById('manualBookingForm').reset();
  }
  showToast(`Booking ${newBooking.id} created and saved to MongoDB!`);
  refreshDashboard();
}

/* ===================================================================
   WhatsApp Dispatch Templates Copy
   =================================================================== */
function copyTemplate(templateId) {
  const el = document.getElementById(templateId);
  if (!el) return;

  navigator.clipboard.writeText(el.innerText).then(() => {
    showToast('Template copied to clipboard!');
  }).catch(() => {
    showToast('Template copied!');
  });
}

function dispatchTemplateToOffice(templateId) {
  const el = document.getElementById(templateId);
  if (!el) return;
  const cfg = window.CleanShieldDB.getBusinessConfig();
  const text = el.innerText;
  const url = window.CleanShieldDB.getWhatsAppLink(cfg.whatsapp1, text);
  window.open(url, '_blank');
  showToast(`Opening WhatsApp (${cfg.whatsapp1}) with template message...`);
}

/* ===================================================================
   Modal Helpers
   =================================================================== */
function openModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.add('active');
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove('active');
}

function showToast(message) {
  const toast = document.getElementById('cspToast');
  const toastMsg = document.getElementById('toastMessage');
  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
}
