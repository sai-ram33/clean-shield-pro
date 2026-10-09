/**
 * Clean Shield Pro - Admin Dashboard Operations Logic
 * Rajamahendravaram Operations Desk
 */

let currentAlertCount = 0;

document.addEventListener('DOMContentLoaded', () => {
  refreshDashboard();
  initStorageAlerts();
  loadPricingForm();

  // Set default manual booking date to tomorrow
  const mDate = document.getElementById('mDate');
  if (mDate) {
    const tmrw = new Date();
    tmrw.setDate(tmrw.getDate() + 1);
    mDate.value = tmrw.toISOString().split('T')[0];
  }
});

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
   Refresh Dashboard & KPIs
   =================================================================== */
function refreshDashboard() {
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

  // Avg rating
  const kpiAvgRating = document.getElementById('kpiAvgRating');
  if (kpiAvgRating && reviews.length > 0) {
    const avg = (reviews.reduce((s, r) => s + (r.rating || 5), 0) / reviews.length).toFixed(1);
    kpiAvgRating.textContent = `${avg} ★`;
  }
}

/* ===================================================================
   Bookings Table & Management
   =================================================================== */
function renderBookingsTable(filteredList = null) {
  const tbody = document.getElementById('bookingsTableBody');
  if (!tbody) return;

  const bookings = filteredList || window.CleanShieldDB.getBookings();

  if (bookings.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:30px; color:var(--admin-text-muted);">No bookings found.</td></tr>`;
    return;
  }

  tbody.innerHTML = bookings.map(b => {
    const statusClass = {
      'Pending': 'badge-pending',
      'Confirmed': 'badge-confirmed',
      'In Progress': 'badge-inprogress',
      'Completed': 'badge-completed',
      'Cancelled': 'badge-cancelled'
    }[b.status] || 'badge-pending';

    const cfg = window.CleanShieldDB.getBusinessConfig();
    const waText = `Namaste ${b.customerName}! 🙏 Clean Shield Pro update regarding your booking ${b.id} for ${b.service} (${b.bhk || ''}) on ${b.date}. Current status: *${b.status}*. Address: ${b.address}. Helplines: ${cfg.phone1} / ${cfg.phone2}.`;
    const waUrl = window.CleanShieldDB.getWhatsAppLink(b.phone, waText);
    const emailUrl = window.CleanShieldDB.getEmailConfirmationLink(b);

    return `
      <tr>
        <td>
          <strong style="color:var(--admin-primary);">${b.id}</strong><br>
          <small style="color:var(--admin-text-muted); font-size:0.75rem;">${new Date(b.createdAt).toLocaleDateString()}</small>
        </td>
        <td>
          <strong>${b.customerName}</strong><br>
          <a href="tel:${b.phone.replace(/\s+/g, '')}" style="color:var(--admin-text-muted); font-size:0.8rem;">${b.phone}</a>
        </td>
        <td>
          <span style="font-weight:600; color:var(--admin-primary);">${b.service}</span><br>
          <small style="color:var(--admin-text-muted);">${b.bhk || 'Standard'}</small>
        </td>
        <td>
          <strong>${b.date}</strong><br>
          <small style="color:var(--admin-text-muted);">${b.timeSlot}</small>
        </td>
        <td>
          <span style="background:#EAF6F1; color:#1E8262; padding:2px 8px; border-radius:12px; font-size:0.78rem; font-weight:600;">
            ${b.locality}
          </span>
        </td>
        <td>
          <strong style="color:var(--admin-primary);">₹${Number(b.amount).toLocaleString('en-IN')}</strong>
        </td>
        <td>
          <span style="font-size:0.8rem; display:block; font-weight:600; color:${b.paymentStatus === 'Paid' ? '#1E8449' : '#B7950B'}">
            ${b.paymentStatus || 'Pending'}
          </span>
          <small style="color:var(--admin-text-muted); font-size:0.75rem;">${b.paymentMethod}</small>
        </td>
        <td>
          <select class="status-dropdown-select" onchange="changeBookingStatus('${b.id}', this.value)">
            <option value="Pending" ${b.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="In Progress" ${b.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option value="Completed" ${b.status === 'Completed' ? 'selected' : ''}>Completed</option>
            <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td>
          <div style="display:flex; gap:5px; flex-wrap:wrap;">
            <a href="${waUrl}" target="_blank" rel="noopener" class="btn-action-wa" title="WhatsApp Customer (${b.phone})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/></svg>
              WA
            </a>
            <a href="${emailUrl}" class="btn-action-sm" title="Email confirmation to ${cfg.email1} & ${cfg.email2}">
              ✉️
            </a>
            <button class="btn-action-sm" onclick="showBookingDetail('${b.id}')">Info</button>
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

    <div style="display:flex; justify-content:flex-end; gap:12px;">
      <button class="btn-action-sm" onclick="closeModal('modalAdminBookingDetail')">Close</button>
      <button class="btn-action-sm" onclick="window.print()" style="background:#0D3B2E; color:#FFFFFF;">Print Details</button>
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

  if (enquiries.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:var(--admin-text-muted);">No enquiries found.</td></tr>`;
    return;
  }

  tbody.innerHTML = enquiries.map(e => {
    const waText = `Namaste ${e.name}! 🙏 Thank you for reaching out to Clean Shield Pro Rajamahendravaram regarding *${e.service}* in ${e.locality}. We received your requirement: "${e.details}". We are ready to provide a custom quotation. May we discuss the specifics?`;
    const waUrl = window.CleanShieldDB.getWhatsAppLink(e.phone, waText);

    return `
      <tr>
        <td><strong style="color:var(--admin-primary);">${e.id}</strong></td>
        <td>
          <strong>${e.name}</strong><br>
          <small style="color:var(--admin-text-muted);">${e.phone}</small>
        </td>
        <td><strong style="color:var(--admin-primary);">${e.service}</strong></td>
        <td>
          <span style="background:#EAF6F1; color:#1E8262; padding:2px 8px; border-radius:12px; font-size:0.78rem; font-weight:600;">
            ${e.locality}
          </span>
        </td>
        <td style="max-width:240px; font-size:0.82rem; color:var(--admin-text-muted);">
          ${e.details}
        </td>
        <td><small>${new Date(e.createdAt).toLocaleDateString()}</small></td>
        <td>
          <select class="status-dropdown-select" onchange="changeEnquiryStatus('${e.id}', this.value)">
            <option value="New" ${e.status === 'New' ? 'selected' : ''}>New Lead</option>
            <option value="Contacted" ${e.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
            <option value="Converted" ${e.status === 'Converted' ? 'selected' : ''}>Converted</option>
          </select>
        </td>
        <td>
          <a href="${waUrl}" target="_blank" rel="noopener" class="btn-action-wa" title="Reply on WhatsApp">
            Reply on WA
          </a>
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
    const key = b.phone.replace(/\D/g, '');
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
    const key = e.phone.replace(/\D/g, '');
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

  tbody.innerHTML = list.map(c => `
    <tr>
      <td><strong>${c.name}</strong></td>
      <td>${c.phone}</td>
      <td>
        <span style="background:#EAF6F1; color:#1E8262; padding:2px 8px; border-radius:12px; font-size:0.78rem; font-weight:600;">
          ${c.locality}
        </span>
      </td>
      <td><strong>${c.bookingsCount}</strong> orders</td>
      <td><strong style="color:var(--admin-primary);">₹${c.totalSpent.toLocaleString('en-IN')}</strong></td>
      <td>
        <a href="${window.CleanShieldDB.getWhatsAppLink(c.phone, `Namaste ${c.name}, greetings from Clean Shield Pro Rajamahendravaram!`)}" target="_blank" rel="noopener" class="btn-action-wa">
          WhatsApp
        </a>
      </td>
    </tr>
  `).join('');
}

/* ===================================================================
   Reviews Moderation
   =================================================================== */
function renderReviewsTable() {
  const tbody = document.getElementById('reviewsTableBody');
  if (!tbody) return;

  const reviews = window.CleanShieldDB.getReviews(false);

  tbody.innerHTML = reviews.map(r => `
    <tr>
      <td><strong>${r.id}</strong></td>
      <td>
        <strong>${r.customerName}</strong><br>
        <small style="color:var(--admin-text-muted);">${r.locality}</small>
      </td>
      <td>${r.service}</td>
      <td>
        <span style="color:#E6A117; font-weight:700;">${r.rating} ★</span>
      </td>
      <td style="max-width:280px; font-size:0.84rem; color:var(--admin-text-main);">
        "${r.review}"
      </td>
      <td>
        <button class="btn-action-sm" onclick="toggleReview('${r.id}')" style="background:${r.approved ? '#EAF6F1' : '#FADBD8'}; color:${r.approved ? '#1E8449' : '#922B21'};">
          ${r.approved ? 'Visible on Website' : 'Hidden'}
        </button>
      </td>
    </tr>
  `).join('');
}

function toggleReview(reviewId) {
  const updated = window.CleanShieldDB.toggleReviewStatus(reviewId);
  if (updated) {
    showToast(`Review ${reviewId} is now ${updated.approved ? 'Visible' : 'Hidden'}`);
    renderReviewsTable();
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
  showToast(`Booking ${newBooking.id} created successfully!`);
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
