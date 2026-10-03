/**
 * Clean Shield Pro - Customer Website Application Logic
 * Rajamahendravaram, AP
 */

document.addEventListener('DOMContentLoaded', () => {
  initComparisonSlider();
  initReviews();
  initStarPicker();
  setDefaultBookingDate();
  calculateBookingPrice();
});

/* ===================================================================
   Modal Controller
   =================================================================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close when clicking on backdrop
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Close with Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => {
      m.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
});

/* ===================================================================
   Toast Notifications
   =================================================================== */
function showToast(message, duration = 4000) {
  const toast = document.getElementById('cspToast');
  const toastMsg = document.getElementById('toastMessage');
  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }
}

/* ===================================================================
   Mobile Navigation Toggle
   =================================================================== */
function toggleMobileNav() {
  const nav = document.getElementById('navMenu');
  if (nav.style.display === 'flex') {
    nav.style.display = 'none';
  } else {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '78px';
    nav.style.left = '0';
    nav.style.width = '100%';
    nav.style.backgroundColor = '#FFFFFF';
    nav.style.padding = '20px';
    nav.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
  }
}

/* ===================================================================
   Before & After Comparison Slider
   =================================================================== */
function initComparisonSlider() {
  const slider = document.getElementById('comparisonSliderInput');
  const afterOverlay = document.getElementById('comparisonAfterOverlay');
  const handle = document.getElementById('sliderHandle');

  if (!slider || !afterOverlay || !handle) return;

  function updateSlider(val) {
    afterOverlay.style.width = `${val}%`;
    handle.style.left = `${val}%`;
  }

  slider.addEventListener('input', (e) => {
    updateSlider(e.target.value);
  });

  // Default at 50%
  updateSlider(50);
}

/* ===================================================================
   Booking Modal & Dynamic Pricing Calculator
   =================================================================== */
function openBookingModal(serviceName = 'Home Deep Cleaning', bhk = '2 BHK') {
  const serviceSelect = document.getElementById('bookingServiceSelect');
  if (serviceSelect) {
    if (serviceName.includes('Pest')) {
      serviceSelect.value = 'Pest Control';
    } else {
      serviceSelect.value = 'Home Deep Cleaning';
    }
  }
  selectBhk(bhk);
  openModal('modalBooking');
}

function selectBhk(bhk) {
  document.querySelectorAll('.bhk-btn').forEach(btn => {
    if (btn.getAttribute('data-bhk') === bhk) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  const bhkInput = document.getElementById('selectedBhkInput');
  if (bhkInput) bhkInput.value = bhk;
  calculateBookingPrice();
}

function selectPaymentMethod(methodName) {
  document.querySelectorAll('.payment-method-card').forEach(card => {
    const radio = card.querySelector('input[type="radio"]');
    if (radio && radio.value === methodName) {
      radio.checked = true;
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  const upiBox = document.getElementById('upiQrBox');
  if (upiBox) {
    if (methodName.includes('UPI')) {
      upiBox.classList.add('active');
    } else {
      upiBox.classList.remove('active');
    }
  }
}

function setDefaultBookingDate() {
  const dateInput = document.getElementById('bookingDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = new Date().toISOString().split('T')[0];
  }
}

function calculateBookingPrice() {
  const service = document.getElementById('bookingServiceSelect')?.value || 'Home Deep Cleaning';
  const bhk = document.getElementById('selectedBhkInput')?.value || '2 BHK';
  const pricing = window.CleanShieldDB ? window.CleanShieldDB.getPricing() : null;

  let basePrice = 4500;
  if (pricing) {
    if (service === 'Home Deep Cleaning') {
      basePrice = pricing.deepCleaning[bhk] || 4500;
    } else {
      basePrice = pricing.pestControl[bhk] || 5000;
    }
  }

  let addOnTotal = 0;
  if (document.getElementById('addonBalcony')?.checked) addOnTotal += 500;
  if (document.getElementById('addonFridge')?.checked) addOnTotal += 400;
  if (document.getElementById('addonChimney')?.checked) addOnTotal += 600;
  if (document.getElementById('addonMattress')?.checked) addOnTotal += 700;

  const total = basePrice + addOnTotal;

  const titleEl = document.getElementById('priceSummaryTitle');
  const totalEl = document.getElementById('priceSummaryTotal');

  if (titleEl) {
    titleEl.textContent = `${service} (${bhk})${addOnTotal > 0 ? ' + Add-ons' : ''}`;
  }
  if (totalEl) {
    totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
  }

  return { service, bhk, basePrice, addOnTotal, total };
}

function handleBookingSubmit(e) {
  e.preventDefault();
  const { service, bhk, total } = calculateBookingPrice();

  const customerName = document.getElementById('customerName').value.trim();
  const customerPhone = document.getElementById('customerPhone').value.trim();
  const customerEmail = document.getElementById('customerEmail')?.value.trim() || '';
  const date = document.getElementById('bookingDate').value;
  const timeSlot = document.getElementById('bookingTime').value;
  const locality = document.getElementById('bookingLocality').value;
  const streetAddress = document.getElementById('customerAddress').value.trim();

  const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'Cash on Delivery (COD)';

  // Collect selected addons
  const addons = [];
  if (document.getElementById('addonBalcony')?.checked) addons.push('Balcony Deep Clean');
  if (document.getElementById('addonFridge')?.checked) addons.push('Fridge Sanitization');
  if (document.getElementById('addonChimney')?.checked) addons.push('Chimney Degreasing');
  if (document.getElementById('addonMattress')?.checked) addons.push('Mattress Steam');

  const bookingData = {
    customerName,
    phone: customerPhone,
    email: customerEmail,
    locality,
    address: `${streetAddress}, ${locality}, Rajamahendravaram`,
    service,
    bhk,
    addons,
    amount: total,
    date,
    timeSlot,
    paymentMethod: selectedPayment
  };

  const newBooking = window.CleanShieldDB.addBooking(bookingData);

  // Close booking modal
  closeModal('modalBooking');

  // Render receipt modal with WhatsApp and Email confirmation options
  renderReceiptModal(newBooking);

  // Show Toast
  showToast(`Booking ${newBooking.id} created successfully! Choose WhatsApp or Email confirmation below.`);
}

function renderReceiptModal(booking) {
  const container = document.getElementById('receiptContent');
  if (!container) return;

  const cfg = window.CleanShieldDB.getBusinessConfig();
  const waMsg = window.CleanShieldDB.getFormattedConfirmationText(booking);

  // WhatsApp links to primary and secondary numbers
  const waLink1 = window.CleanShieldDB.getWhatsAppLink(cfg.whatsapp1, waMsg);
  const waLink2 = window.CleanShieldDB.getWhatsAppLink(cfg.whatsapp2, waMsg);
  
  // Email confirmation link
  const emailLink = window.CleanShieldDB.getEmailConfirmationLink(booking);

  container.innerHTML = `
    <div style="text-align:center; padding:10px 0 16px;">
      <div style="width:60px; height:60px; background:#EAF4F0; border-radius:50%; margin:0 auto 12px; display:flex; align-items:center; justify-content:center; color:#25A27A;">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
      <h3 style="color:var(--color-primary); font-size:1.35rem; margin-bottom:4px;">Booking Reserved Successfully!</h3>
      <p style="color:var(--color-text-muted); font-size:0.88rem;">Your booking reference number is:</p>
      <div style="font-size:1.5rem; font-weight:800; color:var(--color-primary); letter-spacing:1px; background:#F8FAF9; padding:6px 18px; border-radius:8px; display:inline-block; margin:6px 0; border:1.5px dashed #BED8CC;">
        ${booking.id}
      </div>
    </div>

    <!-- Booking Summary Details -->
    <div style="background:#F8FAF9; border-radius:12px; padding:16px; margin-bottom:18px; font-size:0.88rem; border:1px solid #E0EBE6;">
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:var(--color-text-muted);">Customer:</span>
        <strong style="color:var(--color-primary);">${booking.customerName} (${booking.phone})</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:var(--color-text-muted);">Service & Size:</span>
        <strong style="color:var(--color-primary);">${booking.service} (${booking.bhk})</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:var(--color-text-muted);">Date & Slot:</span>
        <strong>${booking.date} | ${booking.timeSlot}</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:var(--color-text-muted);">Location:</span>
        <span style="text-align:right; max-width:60%; font-weight:500;">${booking.address}</span>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:var(--color-text-muted);">Payment Mode:</span>
        <strong>${booking.paymentMethod}</strong>
      </div>
      <div style="display:flex; justify-content:space-between; border-top:1px solid #E0EBE6; padding-top:10px; margin-top:8px;">
        <strong style="color:var(--color-primary); font-size:1rem;">Total Service Fee:</strong>
        <strong style="color:var(--color-primary); font-size:1.2rem;">₹${Number(booking.amount).toLocaleString('en-IN')}</strong>
      </div>
    </div>

    <!-- Confirmation Actions Section -->
    <div style="background:#F4F8F6; border:1px solid #D5EDE3; border-radius:10px; padding:14px; margin-bottom:18px;">
      <div style="font-weight:700; color:var(--color-primary); font-size:0.9rem; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
        <span>📲 Send Confirmation Details</span>
      </div>

      <!-- WhatsApp Options -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
        <a href="${waLink1}" target="_blank" rel="noopener" class="btn-action-wa" style="justify-content:center; padding:10px; font-size:0.84rem; text-decoration:none;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/></svg>
          WhatsApp (${cfg.whatsapp1})
        </a>
        <a href="${waLink2}" target="_blank" rel="noopener" class="btn-action-wa" style="justify-content:center; padding:10px; font-size:0.84rem; text-decoration:none; background-color:#1EBE5D;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/></svg>
          WhatsApp (${cfg.whatsapp2})
        </a>
      </div>

      <!-- Email Confirmation Option -->
      <a href="${emailLink}" class="modal-submit-btn" style="display:flex; align-items:center; justify-content:center; gap:8px; background:linear-gradient(135deg, #185644 0%, #0D3B2E 100%); color:#FFFFFF; text-decoration:none; padding:11px; font-size:0.88rem; margin:0 0 10px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        Send Email to ${cfg.email1} & ${cfg.email2}
      </a>
      <small style="color:var(--color-text-muted); display:block; text-align:center; font-size:0.78rem;">
        Recipient: ${cfg.email1}, ${cfg.email2} ${booking.email ? `(cc: ${booking.email})` : ''}
      </small>
    </div>

    <div style="display:flex; justify-content:center;">
      <button onclick="window.print()" class="btn-service-book" style="padding:10px 24px;">
        Print / Save PDF Receipt
      </button>
    </div>
  `;

  openModal('modalReceipt');
}

/* ===================================================================
   Custom Quote Request Modal
   =================================================================== */
function openQuoteModal(serviceName) {
  const serviceInput = document.getElementById('quoteServiceName');
  const title = document.getElementById('quoteModalTitle');
  if (serviceInput) serviceInput.value = serviceName;
  if (title) title.textContent = `Get Quote: ${serviceName}`;
  openModal('modalQuote');
}

function handleQuoteSubmit(e) {
  e.preventDefault();
  const service = document.getElementById('quoteServiceName').value;
  const name = document.getElementById('quoteName').value.trim();
  const phone = document.getElementById('quotePhone').value.trim();
  const locality = document.getElementById('quoteLocality').value;
  const preferredDate = document.getElementById('quotePreferredDate').value;
  const details = document.getElementById('quoteDetails').value.trim();

  const enquiry = window.CleanShieldDB.addEnquiry({
    name,
    phone,
    service,
    locality,
    preferredDate,
    details
  });

  closeModal('modalQuote');
  showToast(`Enquiry ${enquiry.id} sent! Our Rajamahendravaram team is connecting on WhatsApp.`);

  // Open direct WhatsApp chat with enquiry info
  const waMsg = `*CLEAN SHIELD PRO - QUOTE ENQUIRY (${enquiry.id})*\n\n` +
    `*Name:* ${name}\n` +
    `*Phone:* ${phone}\n` +
    `*Service:* ${service}\n` +
    `*Locality:* ${locality}\n` +
    `*Details:* ${details}\n\n` +
    `Please share estimation and team availability.`;

  const cfg = window.CleanShieldDB.getBusinessConfig();
  window.open(window.CleanShieldDB.getWhatsAppLink(cfg.whatsapp1, waMsg), '_blank');
}

/* ===================================================================
   Track Booking
   =================================================================== */
function handleTrackSubmit(e) {
  e.preventDefault();
  const query = document.getElementById('trackInput').value.trim();
  const resultDiv = document.getElementById('trackResultContainer');
  if (!resultDiv) return;

  const booking = window.CleanShieldDB.findBooking(query);

  if (!booking) {
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
      <div style="background:#FDF2E9; border:1px solid #F5CBA7; color:#A04000; padding:16px; border-radius:8px; text-align:center;">
        <strong>No booking found for "${query}"</strong><br>
        Please check your Booking ID (e.g. CSP-84921) or registered phone number.
      </div>
    `;
    return;
  }

  // Calculate timeline states based on booking.status
  const statusLevels = {
    'Pending': 1,
    'Confirmed': 2,
    'Assigned': 3,
    'In Progress': 4,
    'Completed': 5
  };
  const currentLevel = statusLevels[booking.status] || 2;

  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    <div style="background:#F8FAF9; border:1px solid var(--color-border); border-radius:12px; padding:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; border-bottom:1px solid #E2ECE7; padding-bottom:12px;">
        <div>
          <span style="font-size:0.8rem; color:var(--color-text-muted); text-transform:uppercase;">Booking ID</span>
          <h4 style="color:var(--color-primary); font-size:1.25rem;">${booking.id}</h4>
        </div>
        <div style="text-align:right;">
          <span style="background:${booking.status === 'Completed' ? '#D5EDE3' : '#F9F3EA'}; color:${booking.status === 'Completed' ? '#1E8262' : '#C59245'}; font-weight:700; font-size:0.85rem; padding:4px 12px; border-radius:20px; display:inline-block;">
            ${booking.status}
          </span>
        </div>
      </div>

      <div class="tracking-timeline">
        <div class="timeline-step ${currentLevel >= 1 ? 'completed' : ''}">
          <div class="timeline-step-dot"></div>
          <div class="timeline-step-title">Booking Received</div>
          <div class="timeline-step-time">Logged on ${new Date(booking.createdAt).toLocaleDateString()}</div>
        </div>

        <div class="timeline-step ${currentLevel >= 2 ? 'completed' : (currentLevel === 1 ? 'current' : '')}">
          <div class="timeline-step-dot"></div>
          <div class="timeline-step-title">Confirmed & Slot Reserved</div>
          <div class="timeline-step-time">${booking.date} (${booking.timeSlot})</div>
        </div>

        <div class="timeline-step ${currentLevel >= 3 ? 'completed' : (currentLevel === 2 ? 'current' : '')}">
          <div class="timeline-step-dot"></div>
          <div class="timeline-step-title">Cleaning Pros Assigned</div>
          <div class="timeline-step-time">Rajamahendravaram Mobile Van Unit #2</div>
        </div>

        <div class="timeline-step ${currentLevel >= 4 ? 'completed' : (currentLevel === 3 ? 'current' : '')}">
          <div class="timeline-step-dot"></div>
          <div class="timeline-step-title">En Route / In Progress</div>
          <div class="timeline-step-time">Dispatched to ${booking.locality}</div>
        </div>

        <div class="timeline-step ${currentLevel >= 5 ? 'completed' : (currentLevel === 4 ? 'current' : '')}">
          <div class="timeline-step-dot"></div>
          <div class="timeline-step-title">Service Completed & Sanitized</div>
          <div class="timeline-step-time">Quality inspection signed off</div>
        </div>
      </div>

      <div style="margin-top:16px; padding-top:14px; border-top:1px solid #E2ECE7; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div>
          <div style="font-weight:600; color:var(--color-primary);">${booking.service} (${booking.bhk || ''})</div>
          <div style="font-size:0.85rem; color:var(--color-text-muted);">${booking.address}</div>
        </div>
        <a href="${window.CleanShieldDB.getWhatsAppLink(window.CleanShieldDB.getBusinessConfig().whatsapp1, `Namaste Clean Shield Pro, checking live dispatch status for my booking ${booking.id}...`)}" target="_blank" rel="noopener" class="btn-service-book" style="padding:6px 14px; font-size:0.82rem;">
          Chat with Support
        </a>
      </div>
    </div>
  `;
}

/* ===================================================================
   Customer Reviews
   =================================================================== */
function initReviews() {
  const container = document.getElementById('reviewsContainer');
  if (!container) return;

  const reviews = window.CleanShieldDB.getReviews(true);
  
  // Keep the 3rd column "Share your experience" card intact, prepend the review cards
  const shareCard = container.querySelector('.share-experience-card');

  // Clear existing review cards only
  const existingCards = container.querySelectorAll('.review-card');
  existingCards.forEach(c => c.remove());

  // Render first two reviews or all
  reviews.slice(0, 2).forEach(rev => {
    const card = document.createElement('div');
    card.className = 'review-card';
    
    // Initials
    const initials = rev.customerName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    // Stars
    let starsHtml = '';
    for (let i = 0; i < (rev.rating || 5); i++) {
      starsHtml += '&#9733;';
    }

    card.innerHTML = `
      <div class="review-stars">${starsHtml}</div>
      <p class="review-text">"${rev.review}"</p>
      <div class="review-author-info">
        <div class="author-avatar">${initials}</div>
        <div>
          <div class="author-name">${rev.customerName}</div>
          <div class="author-locality">${rev.locality} • ${rev.service}</div>
        </div>
      </div>
    `;

    container.insertBefore(card, shareCard);
  });
}

function initStarPicker() {
  const picker = document.getElementById('starPicker');
  const ratingInput = document.getElementById('reviewRatingInput');
  if (!picker || !ratingInput) return;

  const stars = picker.querySelectorAll('.star');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.getAttribute('data-rating'), 10);
      ratingInput.value = rating;
      stars.forEach(s => {
        if (parseInt(s.getAttribute('data-rating'), 10) <= rating) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
    });
  });
}

function handleReviewSubmit(e) {
  e.preventDefault();
  const rating = parseInt(document.getElementById('reviewRatingInput').value, 10);
  const customerName = document.getElementById('reviewerName').value.trim();
  const locality = document.getElementById('reviewerLocality').value.trim();
  const service = document.getElementById('reviewService').value.trim();
  const review = document.getElementById('reviewComment').value.trim();

  window.CleanShieldDB.addReview({
    customerName,
    rating,
    locality,
    service,
    review
  });

  closeModal('modalReview');
  showToast('Thank you! Your review has been submitted.');
  initReviews();
}
