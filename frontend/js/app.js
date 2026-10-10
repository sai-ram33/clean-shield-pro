/**
 * Clean Shield Pro - Customer Website Application Logic
 * Rajamahendravaram, AP
 * Brand Palette: Dark Green (#0D3B2E), Light Sage (#25A27A), Luxury Gold (#D4A359)
 */

document.addEventListener('DOMContentLoaded', () => {
  initComparisonSlider();
  initReviews();
  initStarPicker();
  setDefaultBookingDate();
  calculateBookingPrice();
  initUrlCategory();
});

/* ===================================================================
   Category Switcher: Cleaning Services & Pesticides / Pest Control
   Supports both index.html tabs and services.html left sidebar
   =================================================================== */
function switchServiceCategory(categoryKey, btn) {
  // Update buttons across tabs and sidebar buttons
  document.querySelectorAll('.category-tab-btn, .sidebar-category-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  
  if (btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
  }

  // Also highlight any other element matching the category
  document.querySelectorAll(`[data-category="${categoryKey}"]`).forEach(b => {
    b.classList.add('active');
    b.setAttribute('aria-selected', 'true');
  });

  // Update panels
  const cleaningPanel = document.getElementById('panel-cleaning');
  const pesticidesPanel = document.getElementById('panel-pesticides');

  if (categoryKey === 'cleaning') {
    if (cleaningPanel) cleaningPanel.classList.add('active');
    if (pesticidesPanel) pesticidesPanel.classList.remove('active');
  } else if (categoryKey === 'pesticides') {
    if (cleaningPanel) cleaningPanel.classList.remove('active');
    if (pesticidesPanel) pesticidesPanel.classList.add('active');
  }

  // Reset any search filter
  const searchInput = document.getElementById('catalogFilterInput');
  if (searchInput) {
    searchInput.value = '';
    filterCatalogServices('');
  }
}

function initUrlCategory() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('category') || params.get('cat');
  if (cat) {
    if (cat.toLowerCase().includes('pest')) {
      const pestBtn = document.getElementById('sidebarBtnPesticides') || document.getElementById('tabBtnPesticides');
      switchServiceCategory('pesticides', pestBtn);
    } else {
      const cleanBtn = document.getElementById('sidebarBtnCleaning') || document.getElementById('tabBtnCleaning');
      switchServiceCategory('cleaning', cleanBtn);
    }
  }
}

function clearCatalogSearch() {
  const searchInput = document.getElementById('catalogFilterInput');
  if (searchInput) {
    searchInput.value = '';
    filterCatalogServices('');
    searchInput.focus();
  }
}

function switchCategoryWithQuery(catKey, btnId) {
  const btn = document.getElementById(btnId);
  const searchInput = document.getElementById('catalogFilterInput');
  const currentQuery = searchInput ? searchInput.value : '';
  switchServiceCategory(catKey, btn);
  if (searchInput && currentQuery) {
    searchInput.value = currentQuery;
    filterCatalogServices(currentQuery);
  }
}

function filterCatalogServices(query) {
  const q = (query || '').trim().toLowerCase();
  
  // Show / hide clear button in header search bar
  const clearBtn = document.getElementById('headerSearchClear');
  if (clearBtn) {
    clearBtn.style.display = q.length > 0 ? 'inline-flex' : 'none';
  }

  const activePanel = document.querySelector('.services-category-panel.active');
  if (!activePanel) return;

  const cards = activePanel.querySelectorAll('.service-card');
  let matchCount = 0;
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (!q || text.includes(q)) {
      card.style.display = 'flex';
      matchCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const emptyMsg = document.getElementById('catalogEmptyMsg');
  if (emptyMsg) {
    if (matchCount === 0 && q.length > 0) {
      // Check other category panel for matches to assist user
      const isCleaning = activePanel.id === 'panel-cleaning';
      const otherPanelId = isCleaning ? 'panel-pesticides' : 'panel-cleaning';
      const otherPanel = document.getElementById(otherPanelId);
      let otherMatches = 0;
      if (otherPanel) {
        otherPanel.querySelectorAll('.service-card').forEach(c => {
          if (c.textContent.toLowerCase().includes(q)) otherMatches++;
        });
      }

      if (otherMatches > 0) {
        const otherCatName = isCleaning ? 'Pesticide Cleaning Services' : 'Home Cleaning Services';
        const targetCatKey = isCleaning ? 'pesticides' : 'cleaning';
        const targetBtnId = isCleaning ? 'sidebarBtnPesticides' : 'sidebarBtnCleaning';
        emptyMsg.innerHTML = `
          <h4 style="color:var(--color-primary); font-size:1.15rem; margin-bottom:8px;">No Matching Services in this Category</h4>
          <p style="font-size:0.92rem; margin-bottom:14px; color:var(--color-text-muted);">Found <strong>${otherMatches} match${otherMatches > 1 ? 'es' : ''}</strong> for "${q}" under <strong>${otherCatName}</strong>.</p>
          <button type="button" class="btn-book-service" style="padding:9px 20px; font-size:0.88rem; cursor:pointer;" onclick="switchCategoryWithQuery('${targetCatKey}', '${targetBtnId}')">
            Switch to ${otherCatName} &rarr;
          </button>
        `;
      } else {
        emptyMsg.innerHTML = `
          <h4 style="color:var(--color-primary); font-size:1.15rem; margin-bottom:6px;">No Matching Services Found</h4>
          <p style="font-size:0.88rem; color:var(--color-text-muted);">Try clearing your search query or check spelling.</p>
        `;
      }
      emptyMsg.style.display = 'block';
    } else {
      emptyMsg.style.display = matchCount === 0 ? 'block' : 'none';
    }
  }
}

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
   Dynamic Pricing Multi-Service & Multi-BHK Map
   =================================================================== */
const SERVICE_PRICING_TABLE = {
  // Cleaning Services
  'Full Home Deep Cleaning': { '1 BHK': 3499, '2 BHK': 5499, '3 BHK': 5999, '4 BHK+': 7499 },
  'Bathroom & Toilet Descaling': { '1 BHK': 599, '2 BHK': 1099, '3 BHK': 1599, '4 BHK+': 2099 },
  'Kitchen & Chimney Degreasing': { '1 BHK': 1499, '2 BHK': 1999, '3 BHK': 2499, '4 BHK+': 2999 },
  'Sofa & Upholstery Shampooing': { '1 BHK': 1199, '2 BHK': 1999, '3 BHK': 2499, '4 BHK+': 2999 },
  'Water Tank Jet Wash': { '1 BHK': 1199, '2 BHK': 1499, '3 BHK': 1999, '4 BHK+': 2499 },
  'Floor Scrubbing & Machine Buffing': { '1 BHK': 1999, '2 BHK': 2999, '3 BHK': 4499, '4 BHK+': 5999 },
  'Move-in / Vacant Flat Cleaning': { '1 BHK': 2999, '2 BHK': 3999, '3 BHK': 4999, '4 BHK+': 6999 },
  'Balcony, Window & Mesh Cleaning': { '1 BHK': 699, '2 BHK': 1199, '3 BHK': 1499, '4 BHK+': 1999 },
  'Commercial Deep Cleaning': { '1 BHK': 0, '2 BHK': 0, '3 BHK': 0, '4 BHK+': 0 },
  'Industrial & Warehouse Cleaning': { '1 BHK': 0, '2 BHK': 0, '3 BHK': 0, '4 BHK+': 0 },
  'AMC (Annual Maintenance Contract)': { '1 BHK': 0, '2 BHK': 0, '3 BHK': 0, '4 BHK+': 0 },

  // Pesticides & Pest Control Services
  'Odorless Cockroach Control': { '1 BHK': 1499, '2 BHK': 1999, '3 BHK': 2499, '4 BHK+': 3199 },
  'Anti-Termite Drill Treatment': { '1 BHK': 2999, '2 BHK': 3499, '3 BHK': 4499, '4 BHK+': 7499 },
  'Bed Bug Eradication': { '1 BHK': 1999, '2 BHK': 2699, '3 BHK': 3399, '4 BHK+': 4299 },
  'Mosquito & Drain Fly Fogging': { '1 BHK': 1299, '2 BHK': 1699, '3 BHK': 2199, '4 BHK+': 2999 },
  'Ants Perimeter Barrier': { '1 BHK': 1499, '2 BHK': 1999, '3 BHK': 2499, '4 BHK+': 3499 },
  'Rodent & Rat Proofing': { '1 BHK': 1699, '2 BHK': 2199, '3 BHK': 2699, '4 BHK+': 3499 },
  'Full House Pest Shield Combo': { '1 BHK': 2499, '2 BHK': 3299, '3 BHK': 3999, '4 BHK+': 5499 },
  'Commercial Pest Control': { '1 BHK': 0, '2 BHK': 0, '3 BHK': 0, '4 BHK+': 0 },
  'Industrial Pest Control & Fumigation': { '1 BHK': 0, '2 BHK': 0, '3 BHK': 0, '4 BHK+': 0 },
  'Pest Control AMC (Annual Maintenance Contract)': { '1 BHK': 0, '2 BHK': 0, '3 BHK': 0, '4 BHK+': 0 },
  'Pest Control AMC': { '1 BHK': 0, '2 BHK': 0, '3 BHK': 0, '4 BHK+': 0 }
};

/* ===================================================================
   Booking Modal & Dynamic Pricing Calculator
   =================================================================== */
function openBookingModal(serviceName = 'Full Home Deep Cleaning', bhk = 'Standard') {
  const serviceInput = document.getElementById('bookingServiceInput');
  const serviceDisplay = document.getElementById('bookingServiceDisplay');
  const packageDisplay = document.getElementById('bookingPackageDisplay');
  const modalTitle = document.getElementById('bookingModalTitle');

  if (serviceInput && serviceName) serviceInput.value = serviceName;
  if (serviceDisplay && serviceName) serviceDisplay.textContent = serviceName;
  if (packageDisplay && bhk) packageDisplay.textContent = bhk;
  if (modalTitle && serviceName) modalTitle.textContent = `Book: ${serviceName}`;

  // Default date to tomorrow
  const dateInput = document.getElementById('bookingDate') || document.getElementById('bookDate');
  if (dateInput && !dateInput.value) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  const serviceSelect = document.getElementById('bookingServiceSelect');
  if (serviceSelect && serviceName) {
    for (let i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].value.toLowerCase() === serviceName.toLowerCase() ||
          serviceName.toLowerCase().includes(serviceSelect.options[i].value.toLowerCase())) {
        serviceSelect.selectedIndex = i;
        break;
      }
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
    if (methodName.includes('UPI') || methodName.includes('Paytm') || methodName.includes('PhonePe')) {
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
  const service = document.getElementById('bookingServiceSelect')?.value || 'Full Home Deep Cleaning';
  const bhk = document.getElementById('selectedBhkInput')?.value || '2 BHK';

  const isB2B = service.includes('Commercial') || service.includes('Industrial') || service.includes('AMC');

  let basePrice = 5499;
  if (window.CleanShieldDB && typeof window.CleanShieldDB.getPackagePrice === 'function') {
    const customPrice = window.CleanShieldDB.getPackagePrice(service, bhk);
    if (customPrice !== null) {
      basePrice = customPrice;
    } else if (SERVICE_PRICING_TABLE[service] && SERVICE_PRICING_TABLE[service][bhk] !== undefined) {
      basePrice = SERVICE_PRICING_TABLE[service][bhk];
    }
  } else if (SERVICE_PRICING_TABLE[service] && SERVICE_PRICING_TABLE[service][bhk] !== undefined) {
    basePrice = SERVICE_PRICING_TABLE[service][bhk];
  }

  let addOnTotal = 0;
  const getAddonPrice = (name, fallback) => {
    if (window.CleanShieldDB && window.CleanShieldDB.getPackagePrice) {
      const p = window.CleanShieldDB.getPackagePrice('Add-on', name);
      if (p !== null) return p;
    }
    return fallback;
  };
  if (document.getElementById('addonBalcony')?.checked) addOnTotal += getAddonPrice('Balcony', 499);
  if (document.getElementById('addonFridge')?.checked) addOnTotal += getAddonPrice('Refrigerator', 399);
  if (document.getElementById('addonChimney')?.checked) addOnTotal += getAddonPrice('Chimney', 599);
  if (document.getElementById('addonMattress')?.checked) addOnTotal += getAddonPrice('Mattress', 899);

  const total = isB2B ? 0 : (basePrice + addOnTotal);

  const titleEl = document.getElementById('priceSummaryTitle');
  const totalEl = document.getElementById('priceSummaryTotal');

  if (titleEl) {
    if (isB2B) {
      titleEl.textContent = `${service} (Site Inspection & Free Proposal)`;
    } else {
      titleEl.textContent = `${service} (${bhk})${addOnTotal > 0 ? ' + Add-ons' : ''}`;
    }
  }
  if (totalEl) {
    if (isB2B) {
      totalEl.textContent = 'Custom Quote';
    } else {
      totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
    }
  }

  return { service, bhk, basePrice, addOnTotal, total, isB2B };
}

function handleBookingSubmit(e) {
  e.preventDefault();
  
  let service = 'Full Home Deep Cleaning';
  let bhk = '2 BHK';
  let total = 4500;

  const serviceSelect = document.getElementById('bookingServiceSelect');
  const serviceInput = document.getElementById('bookingServiceInput');
  if (serviceSelect) {
    const calc = calculateBookingPrice();
    service = calc.service;
    bhk = calc.bhk;
    total = calc.total;
  } else if (serviceInput) {
    service = serviceInput.value || 'Full Home Deep Cleaning';
    const selectedPill = document.querySelector('.widget-pill-btn.selected');
    if (selectedPill) {
      bhk = selectedPill.querySelector('span')?.textContent || 'Standard';
      const priceStr = selectedPill.querySelector('strong')?.textContent || '';
      total = parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 1999;
    }
  }

  const nameEl = document.getElementById('customerName') || document.getElementById('bookName');
  const phoneEl = document.getElementById('customerPhone') || document.getElementById('bookPhone');
  const altPhoneEl = document.getElementById('customerAltPhone') || document.getElementById('bookAltPhone');
  const emailEl = document.getElementById('customerEmail');
  const dateEl = document.getElementById('bookingDate') || document.getElementById('bookDate');
  const timeEl = document.getElementById('bookingTime') || document.getElementById('bookTime');
  const localityEl = document.getElementById('bookingLocality');
  const addressEl = document.getElementById('customerAddress') || document.getElementById('bookAddress');

  const customerName = nameEl ? nameEl.value.trim() : '';
  const customerPhone = phoneEl ? phoneEl.value.trim() : '';
  const customerAltPhone = altPhoneEl ? altPhoneEl.value.trim() : '';
  const customerEmail = emailEl ? emailEl.value.trim() : '';
  const date = dateEl ? dateEl.value : '';
  const timeSlot = timeEl ? timeEl.value : '09:00 AM';
  const locality = localityEl ? localityEl.value : 'Rajamahendravaram';
  const streetAddress = addressEl ? addressEl.value.trim() : '';

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
    altPhone: customerAltPhone,
    email: customerEmail,
    locality,
    address: localityEl ? `${streetAddress}, ${locality}` : streetAddress,
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

  // Render receipt modal if available, otherwise show confirmation toast
  const receiptContainer = document.getElementById('receiptContent');
  if (receiptContainer) {
    renderReceiptModal(newBooking);
  } else {
    showToast(`Booking ${newBooking.id} created successfully! Our team will contact you on ${customerPhone}.`);
    alert(`Booking Confirmed!\nBooking ID: ${newBooking.id}\nService: ${service}\nDate: ${date}\nThank you for choosing Clean Shield Pro!`);
  }
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
        <span style="color:var(--color-text-muted);">Customer Name:</span>
        <strong style="color:var(--color-primary);">${booking.customerName}</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:var(--color-text-muted);">Primary Mobile:</span>
        <strong>${booking.phone}</strong>
      </div>
      ${booking.altPhone ? `
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:var(--color-text-muted);">Secondary Mobile:</span>
        <strong>${booking.altPhone}</strong>
      </div>` : ''}
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:var(--color-text-muted);">Service:</span>
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
        Send Email to Official Desk
      </a>
      <small style="color:var(--color-text-muted); display:block; text-align:center; font-size:0.78rem;">
        Recipients: ${cfg.email1}, ${cfg.email2}
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
  const serviceInput = document.getElementById('quoteServiceName') || document.getElementById('quoteServiceInput');
  const title = document.getElementById('quoteModalTitle');
  if (serviceInput && serviceName) serviceInput.value = serviceName;
  if (title && serviceName) title.textContent = `Get Quote: ${serviceName}`;
  openModal('modalQuote');
}

function handleQuoteSubmit(e) {
  e.preventDefault();
  const serviceInput = document.getElementById('quoteServiceName') || document.getElementById('quoteServiceInput');
  const service = serviceInput ? serviceInput.value : 'Custom Quote';
  const name = document.getElementById('quoteName').value.trim();
  const phone = document.getElementById('quotePhone').value.trim();
  const locality = document.getElementById('quoteLocality')?.value || 'Rajamahendravaram';
  const preferredDate = document.getElementById('quotePreferredDate')?.value || '';
  const details = (document.getElementById('quoteDetails') || document.getElementById('quoteMessage'))?.value.trim() || '';

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
    resultDiv.innerHTML = `
      <div style="background:#FFF3F3; border:1px solid #FFD0D0; border-radius:8px; padding:16px; color:#C0392B; text-align:center;">
        <strong>No booking found for "${query}"</strong><br>
        <span style="font-size:0.88rem;">Please check your Booking ID (e.g. CSP-2026-1001) or 10-digit phone number.</span>
      </div>
    `;
    return;
  }

  // Visual status levels
  const statusLevels = {
    'Pending': 1,
    'Confirmed': 2,
    'Assigned': 3,
    'In Progress': 4,
    'Completed': 5
  };
  const currentLevel = statusLevels[booking.status] || 2;

  resultDiv.innerHTML = `
    <div style="background:#F8FAF9; border:1px solid #E2ECE7; border-radius:12px; padding:18px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid #E2ECE7; padding-bottom:10px;">
        <div>
          <span style="font-size:0.8rem; color:var(--color-text-muted);">Booking Reference</span>
          <div style="font-weight:800; font-size:1.15rem; color:var(--color-primary);">${booking.id}</div>
        </div>
        <span class="status-badge status-${booking.status.toLowerCase().replace(' ', '')}" style="font-size:0.82rem; padding:4px 12px; border-radius:20px; font-weight:700;">
          ${booking.status}
        </span>
      </div>

      <div class="tracking-timeline">
        <div class="timeline-step ${currentLevel >= 1 ? 'completed' : ''}">
          <div class="timeline-step-dot"></div>
          <div class="timeline-step-title">Booking Received</div>
          <div class="timeline-step-time">${booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'Confirmed'}</div>
        </div>

        <div class="timeline-step ${currentLevel >= 2 ? 'completed' : (currentLevel === 1 ? 'current' : '')}">
          <div class="timeline-step-dot"></div>
          <div class="timeline-step-title">Confirmed & Scheduled</div>
          <div class="timeline-step-time">${booking.date} (${booking.timeSlot})</div>
        </div>

        <div class="timeline-step ${currentLevel >= 3 ? 'completed' : (currentLevel === 2 ? 'current' : '')}">
          <div class="timeline-step-dot"></div>
          <div class="timeline-step-title">Cleaning Pros Assigned</div>
          <div class="timeline-step-time">Rajamahendravaram Mobile Van Unit</div>
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
async function initReviews() {
  const container = document.getElementById('reviewsContainer');
  if (!container) return;

  // Dynamically fetch approved reviews from MongoDB Atlas
  const reviews = window.CleanShieldDB && window.CleanShieldDB.fetchReviews
    ? await window.CleanShieldDB.fetchReviews(true)
    : (window.CleanShieldDB ? window.CleanShieldDB.getReviews(true) : []);

  // Keep the 3rd column "Share your experience" card intact
  const shareCard = container.querySelector('.share-experience-card');

  // Clear existing review cards
  const existingCards = container.querySelectorAll('.review-card, .empty-review-invite');
  existingCards.forEach(c => c.remove());

  if (!reviews || reviews.length === 0) {
    const emptyCard = document.createElement('div');
    emptyCard.className = 'review-card empty-review-invite';
    emptyCard.style.cssText = 'border:1px dashed var(--color-border); background:#FAFDFB; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; min-height:220px; padding:24px;';
    emptyCard.innerHTML = `
      <div style="font-size:2rem; margin-bottom:8px;">✨</div>
      <strong style="color:var(--color-primary); font-size:1.05rem; margin-bottom:6px;">No Customer Reviews Yet</strong>
      <p style="color:var(--color-text-muted); font-size:0.85rem; margin:0; line-height:1.4;">Reviews submitted by verified clients will appear here dynamically. Booked a service with us? Share your feedback!</p>
    `;
    if (shareCard) {
      container.insertBefore(emptyCard, shareCard);
    } else {
      container.appendChild(emptyCard);
    }
    return;
  }

  // Render dynamic reviews from MongoDB Atlas
  reviews.slice(0, 4).forEach(rev => {
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

    if (shareCard) {
      container.insertBefore(card, shareCard);
    } else {
      container.appendChild(card);
    }
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
  const customerName = document.getElementById('reviewCustomerName').value.trim();
  const locality = document.getElementById('reviewLocality').value.trim();
  const service = document.getElementById('reviewService').value;
  const rating = parseInt(document.getElementById('reviewRatingInput').value, 10);
  const review = document.getElementById('reviewText').value.trim();

  window.CleanShieldDB.addReview({
    customerName,
    locality,
    service,
    rating,
    review
  });

  closeModal('modalReview');
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) reviewForm.reset();
  showToast('Thank you! Your review has been saved to the database.');
  initReviews();
}
