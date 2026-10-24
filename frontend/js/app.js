/**
 * Manjusha Cleaning & Pest Control Services - Customer Website Application Logic
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
  updateMyServicesBadge();
  window.addEventListener('csp_my_services_updated', updateMyServicesBadge);
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

async function handleBookingSubmit(e) {
  e.preventDefault();
  
  const submitBtn = e.target.querySelector('button[type="submit"]') || document.querySelector('.modal-submit-btn');
  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Confirm Booking Request &rarr;';

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
  const exactLocationEl = document.getElementById('customerExactLocation') || document.getElementById('customerAddress') || document.getElementById('bookAddress');

  const customerName = nameEl ? nameEl.value.trim() : '';
  const customerPhone = phoneEl ? phoneEl.value.trim() : '';
  const customerAltPhone = altPhoneEl ? altPhoneEl.value.trim() : '';
  const customerEmail = emailEl ? emailEl.value.trim() : '';
  const date = dateEl ? dateEl.value : '';
  const timeSlot = timeEl ? timeEl.value : '08:30 AM - 12:30 PM';
  const locality = localityEl ? localityEl.value : 'Rajahmundry - Danavaipeta';
  const exactLocation = exactLocationEl ? exactLocationEl.value.trim() : '';
  const fullAddress = exactLocation ? `${exactLocation}${locality ? ', ' + locality : ''}` : locality;

  // Frontend Validation
  if (!customerName) {
    alert('Please enter your full name.');
    if (nameEl) nameEl.focus();
    return;
  }

  let rawDigits = customerPhone.replace(/\D/g, '');
  if (rawDigits.length === 12 && rawDigits.startsWith('91')) rawDigits = rawDigits.slice(2);
  if (rawDigits.length === 11 && rawDigits.startsWith('0')) rawDigits = rawDigits.slice(1);

  if (!/^[6-9]\d{9}$/.test(rawDigits)) {
    alert('Please enter a valid 10-digit Indian mobile number (e.g. 9848012345 or +919848012345).');
    if (phoneEl) phoneEl.focus();
    return;
  }

  if (!date) {
    alert('Please select your preferred service date.');
    if (dateEl) dateEl.focus();
    return;
  }

  const chosenDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (chosenDate < today) {
    alert('Preferred service date cannot be in the past.');
    if (dateEl) dateEl.focus();
    return;
  }

  if (!exactLocation) {
    alert('Please enter your exact location (Flat/House No., Building Name, Street & Landmark).');
    if (exactLocationEl) exactLocationEl.focus();
    return;
  }

  const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'Cash on Delivery (COD)';

  // Collect selected addons
  const addons = [];
  if (document.getElementById('addonBalcony')?.checked) addons.push('Balcony Deep Clean');
  if (document.getElementById('addonFridge')?.checked) addons.push('Fridge Sanitization');
  if (document.getElementById('addonChimney')?.checked) addons.push('Chimney Degreasing');
  if (document.getElementById('addonMattress')?.checked) addons.push('Mattress Steam');

  const bookingData = {
    customerName,
    phone: rawDigits,
    altPhone: customerAltPhone,
    email: customerEmail,
    locality,
    exactLocation,
    address: fullAddress,
    service,
    bhk,
    addons,
    amount: total,
    date,
    timeSlot,
    paymentMethod: selectedPayment
  };

  // Detect if customer is using a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Synchronously open blank window on desktop before await to guarantee popup blockers do not block it
  let preOpenedWindow = null;
  if (!isMobile) {
    try {
      preOpenedWindow = window.open('about:blank', '_blank');
      if (preOpenedWindow) {
        preOpenedWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Opening WhatsApp...</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f0fdf4; color: #166534; text-align: center; }
    .spinner { width: 38px; height: 38px; border: 4px solid #bbf7d0; border-top-color: #16a34a; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 14px; }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="spinner"></div>
  <h2 style="margin:0 0 8px; font-size:1.3rem;">Connecting to WhatsApp...</h2>
  <p style="margin:0; font-size:0.9rem; color:#15803D;">Reserving your Manjusha Cleaning & Pest Control Services appointment.</p>
</body>
</html>`);
      }
    } catch (popupErr) {
      preOpenedWindow = null;
    }
  }

  // Prevent multiple clicks
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⏳ Reserving & Launching WhatsApp...</span>`;
  }

  try {
    const result = await window.CleanShieldDB.addBookingAsync(bookingData);
    const newBooking = result.booking;
    const whatsappUrl = result.whatsappUrl;
    const whatsappMsg = result.whatsappConfirmationText;

    // Close booking input modal
    closeModal('modalBooking');

    // Render receipt confirmation modal in main tab
    const receiptContainer = document.getElementById('receiptContent');
    if (receiptContainer) {
      renderReceiptModal(newBooking, whatsappUrl, whatsappMsg);
    } else {
      showToast(`Booking ${newBooking.id} reserved! Please confirm via WhatsApp.`);
    }

    // Record that WhatsApp confirmation was automatically initiated
    window.CleanShieldDB.recordWhatsAppInitiated(newBooking.id);

    // Automatically launch WhatsApp without popup blockers
    if (preOpenedWindow && !preOpenedWindow.closed) {
      preOpenedWindow.location.href = whatsappUrl;
    } else {
      // On mobile devices (or desktop if new tab was prevented), direct navigation immediately opens the WhatsApp application
      window.location.href = whatsappUrl;
    }
  } catch (err) {
    if (preOpenedWindow && !preOpenedWindow.closed) {
      preOpenedWindow.close();
    }
    console.error('Booking submission error:', err);
    alert(`Could not create booking: ${err.message || 'Please check your connection and try again.'}`);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  }
}

function renderReceiptModal(booking, customWaUrl = null, customWaMsg = null) {
  const container = document.getElementById('receiptContent');
  if (!container) return;

  const cfg = window.CleanShieldDB.getBusinessConfig();
  const waUrl = customWaUrl || window.CleanShieldDB.getWhatsAppConfirmationUrl(booking);
  const waMsg = customWaMsg || window.CleanShieldDB.getWhatsAppConfirmationText(booking);

  // Email confirmation link
  const emailLink = window.CleanShieldDB.getEmailConfirmationLink(booking);

  container.innerHTML = `
    <div style="text-align:center; padding:10px 0 16px;">
      <div style="width:58px; height:58px; background:#FEF3C7; border:2px solid #F59E0B; border-radius:50%; margin:0 auto 12px; display:flex; align-items:center; justify-content:center; color:#D97706;">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      </div>
      <h3 style="color:var(--color-primary); font-size:1.35rem; margin-bottom:4px;">Booking Reserved • Awaiting WhatsApp Confirmation</h3>
      <p style="color:var(--color-text-muted); font-size:0.86rem; margin-bottom:8px;">Your unique booking reference ID:</p>
      <div style="font-size:1.45rem; font-weight:800; color:var(--color-primary); letter-spacing:1px; background:#F8FAF9; padding:6px 18px; border-radius:8px; display:inline-block; border:1.5px dashed #BED8CC;">
        ${booking.id}
      </div>
      <div style="margin-top:6px;">
        <span style="background:#FEF3C7; color:#92400E; border:1px solid #FCD34D; font-size:0.75rem; font-weight:800; padding:3px 10px; border-radius:12px; text-transform:uppercase; letter-spacing:0.5px;">
          Status: Pending WhatsApp Confirmation
        </span>
      </div>
    </div>

    <!-- PRIMARY ACTION: WHATSAPP CONFIRMATION BOX -->
    <div style="background:#F0FDF4; border:2px solid #22C55E; border-radius:12px; padding:18px; margin-bottom:20px; box-shadow:0 4px 14px rgba(34,197,94,0.15);">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
        <span style="background:#22C55E; color:#FFFFFF; font-size:0.75rem; font-weight:800; padding:2px 8px; border-radius:10px;">ACTION REQUIRED</span>
        <strong style="color:#15803D; font-size:1rem;">Complete Confirmation in WhatsApp</strong>
      </div>
      <p style="font-size:0.86rem; color:#166534; margin:0 0 14px; line-height:1.4;">
        To prevent fake bookings, please click the button below to open WhatsApp with your prefilled booking details, then press <strong>"Send"</strong>. Our operations desk will verify your message and confirm your appointment.
      </p>

      <a href="${waUrl}" target="_blank" rel="noopener" onclick="window.CleanShieldDB.recordWhatsAppInitiated('${booking.id}')" class="btn-action-wa" style="display:flex; align-items:center; justify-content:center; gap:10px; padding:12px 18px; font-size:1rem; font-weight:700; border-radius:8px; text-decoration:none; background:#25D366; color:#FFFFFF; box-shadow:0 3px 10px rgba(37,211,102,0.4); text-align:center;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/></svg>
        <span>Open WhatsApp & Send Confirmation</span>
      </a>

      <div style="font-size:0.78rem; color:#65A30D; margin-top:10px; line-height:1.3; text-align:center;">
        🔒 <em>Note: Opening WhatsApp alone does not confirm your booking. You must press Send in WhatsApp.</em>
      </div>

      <!-- Prefilled Message Preview Accordion -->
      <details style="margin-top:12px; background:#FFFFFF; border:1px solid #BBF7D0; border-radius:8px; padding:8px 12px; font-size:0.8rem; color:#374151;">
        <summary style="cursor:pointer; font-weight:600; color:#15803D;">View prefilled WhatsApp message text</summary>
        <pre style="white-space:pre-wrap; margin:8px 0 0; font-family:monospace; font-size:0.76rem; background:#F9FAFB; padding:8px; border-radius:6px; color:#1F2937;">${waMsg}</pre>
      </details>
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
        <strong style="color:var(--color-primary);">${booking.service} (${booking.bhk || ''})</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:var(--color-text-muted);">Date & Slot:</span>
        <strong>${booking.date} | ${booking.timeSlot}</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:var(--color-text-muted);">Locality:</span>
        <strong style="color:var(--color-primary);">${booking.locality || 'Rajamahendravaram'}</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:var(--color-text-muted);">Exact Location:</span>
        <span style="text-align:right; max-width:60%; font-weight:500;">${booking.exactLocation || booking.address}</span>
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

    <!-- Quick Navigation & Tracking Buttons -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:18px;">
      <button type="button" class="btn-service-book" onclick="closeModal('modalReceipt'); trackFromMyServices('${booking.id}');" style="padding:10px 14px; font-size:0.86rem; justify-content:center; display:flex; align-items:center; gap:6px;">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        Track Live Status
      </button>
      <button type="button" onclick="closeModal('modalReceipt'); openMyServicesModal();" style="background:#FFFFFF; border:1.5px solid var(--color-primary); color:var(--color-primary); border-radius:8px; font-weight:700; padding:10px 14px; font-size:0.86rem; cursor:pointer;">
        View in My Services
      </button>
    </div>

    <!-- Email Desk Fallback -->
    <div style="text-align:center; padding-top:4px;">
      <a href="${emailLink}" style="font-size:0.82rem; color:var(--color-primary); text-decoration:underline;">
        Send copy via Email to desk (${cfg.email1})
      </a>
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
  const waMsg = `*MANJUSHA CLEANING & PEST CONTROL SERVICES - QUOTE ENQUIRY (${enquiry.id})*\n\n` +
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
   Track Booking (MongoDB Atlas Live Sync & Locality Display)
   =================================================================== */
async function handleTrackSubmit(e, overrideQuery = null) {
  if (e && e.preventDefault) e.preventDefault();
  const queryInput = document.getElementById('trackInput');
  const query = (overrideQuery || (queryInput ? queryInput.value.trim() : '')).trim();
  if (queryInput && overrideQuery) queryInput.value = overrideQuery;

  const resultDiv = document.getElementById('trackResultContainer');
  if (!resultDiv) return;

  if (!query) {
    resultDiv.innerHTML = `
      <div style="background:#FFF3F3; border:1px solid #FFD0D0; border-radius:8px; padding:14px; color:#C0392B; text-align:center; font-size:0.9rem;">
        Please enter your Booking ID (e.g. CSP-12345) or registered 10-digit mobile number.
      </div>
    `;
    return;
  }

  resultDiv.innerHTML = `
    <div style="text-align:center; padding:24px 16px; color:var(--color-text-muted);">
      <div style="display:inline-block; width:28px; height:28px; border:3px solid #25A27A; border-top-color:transparent; border-radius:50%; animation:spin 0.8s linear infinite; margin-bottom:8px;"></div>
      <div style="font-size:0.9rem; font-weight:600; color:var(--color-primary);">Checking live status in MongoDB...</div>
    </div>
  `;

  const booking = await window.CleanShieldDB.findBookingAsync(query);

  if (!booking) {
    resultDiv.innerHTML = `
      <div style="background:#FFF3F3; border:1px solid #FFD0D0; border-radius:10px; padding:18px; color:#C0392B; text-align:center;">
        <strong style="font-size:1rem; display:block; margin-bottom:4px;">No booking found matching "${query}"</strong>
        <span style="font-size:0.86rem; color:#666; display:block; margin-bottom:12px;">Please verify your Booking ID or registered 10-digit mobile number.</span>
        <button type="button" onclick="openMyServicesModal()" class="btn-service-book" style="padding:6px 16px; font-size:0.82rem; background:var(--color-primary);">
          View My Saved Services &rarr;
        </button>
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
          <div style="font-weight:800; font-size:1.25rem; color:var(--color-primary);">${booking.id}</div>
        </div>
        <span class="status-badge status-${(booking.status || 'Pending').toLowerCase().replace(/\s+/g, '')}" style="font-size:0.85rem; padding:4px 14px; border-radius:20px; font-weight:700;">
          ${booking.status || 'Pending'}
        </span>
      </div>

      ${booking.status === 'Pending' ? `
      <div style="background:#FEF3C7; border:1.5px solid #FCD34D; border-radius:10px; padding:12px 14px; margin-bottom:14px; font-size:0.85rem; color:#92400E; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <div style="max-width:70%;">
          <strong>⚠️ Awaiting Customer WhatsApp Confirmation:</strong><br>
          <span style="font-size:0.8rem; color:#78350F;">Please ensure you sent the prefilled WhatsApp message to our operations desk. Once verified, this booking will be marked as Confirmed.</span>
        </div>
        <a href="${window.CleanShieldDB.getWhatsAppConfirmationUrl(booking)}" target="_blank" rel="noopener" onclick="window.CleanShieldDB.recordWhatsAppInitiated('${booking.id}')" class="btn-action-wa" style="padding:6px 14px; font-size:0.82rem; text-decoration:none; white-space:nowrap; background:#25D366; color:#fff;">
          Open WhatsApp to Confirm
        </a>
      </div>` : ''}

      <div class="tracking-timeline">
        <div class="timeline-step ${currentLevel >= 1 ? 'completed' : ''}">
          <div class="timeline-step-dot"></div>
          <div class="timeline-step-title">Booking Received</div>
          <div class="timeline-step-time">${booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'Confirmed'}</div>
        </div>

        <div class="timeline-step ${currentLevel >= 2 ? 'completed' : (currentLevel === 1 ? 'current' : '')}">
          <div class="timeline-step-dot"></div>
          <div class="timeline-step-title">Confirmed & Scheduled</div>
          <div class="timeline-step-time">${booking.date} (${booking.timeSlot || '09:00 AM'})</div>
        </div>

        <div class="timeline-step ${currentLevel >= 3 ? 'completed' : (currentLevel === 2 ? 'current' : '')}">
          <div class="timeline-step-dot"></div>
          <div class="timeline-step-title">Cleaning Pros Assigned</div>
          <div class="timeline-step-time">Rajamahendravaram Mobile Van Unit</div>
        </div>

        <div class="timeline-step ${currentLevel >= 4 ? 'completed' : (currentLevel === 3 ? 'current' : '')}">
          <div class="timeline-step-dot"></div>
          <div class="timeline-step-title">En Route / In Progress</div>
          <div class="timeline-step-time">Dispatched to ${booking.locality || 'Customer Location'}</div>
        </div>

        <div class="timeline-step ${currentLevel >= 5 ? 'completed' : (currentLevel === 4 ? 'current' : '')}">
          <div class="timeline-step-dot"></div>
          <div class="timeline-step-title">Service Completed & Sanitized</div>
          <div class="timeline-step-time">Quality inspection signed off</div>
        </div>
      </div>

      <div style="margin-top:16px; padding-top:14px; border-top:1px solid #E2ECE7; display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
        <div>
          <div style="font-weight:700; color:var(--color-primary); font-size:1.02rem;">${booking.service} (${booking.bhk || ''})</div>
          <div style="font-size:0.86rem; color:#444; margin-top:3px;">
            <strong>Locality:</strong> ${booking.locality || 'Rajamahendravaram'}
          </div>
          <div style="font-size:0.86rem; color:#444; margin-top:2px;">
            <strong>Exact Location:</strong> ${booking.exactLocation || booking.address}
          </div>
          <div style="font-size:0.86rem; color:var(--color-text-muted); margin-top:3px;">
            <strong>Amount:</strong> ₹${Number(booking.amount || 0).toLocaleString('en-IN')} &bull; <em>${booking.paymentMethod || 'COD'}</em>
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:6px;">
          <a href="${window.CleanShieldDB.getWhatsAppLink(window.CleanShieldDB.getBusinessConfig().whatsapp1, `Namaste Manjusha Cleaning & Pest Control Services, checking live dispatch status for my booking ${booking.id}...`)}" target="_blank" rel="noopener" class="btn-action-wa" style="padding:7px 14px; font-size:0.82rem; text-decoration:none; justify-content:center;">
            WhatsApp Support
          </a>
          <button type="button" onclick="closeModal('modalTrack'); openMyServicesModal();" style="background:#FFFFFF; border:1px solid var(--color-primary); color:var(--color-primary); border-radius:6px; font-size:0.8rem; font-weight:700; padding:6px 12px; cursor:pointer;">
            View in My Services &rarr;
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ===================================================================
   MY SERVICES (Amazon "My Orders" Style User Portal)
   =================================================================== */
function updateMyServicesBadge() {
  const list = window.CleanShieldDB ? window.CleanShieldDB.getMyServices() : [];
  const badges = document.querySelectorAll('.my-services-badge');
  badges.forEach(b => {
    b.textContent = list.length;
    b.style.display = list.length > 0 ? 'inline-flex' : 'none';
  });
}

function openMyServicesModal() {
  renderMyServicesList();
  openModal('modalMyServices');
}

function renderMyServicesList() {
  const container = document.getElementById('myServicesListContainer');
  const countBadge = document.getElementById('myServicesHeaderCount');
  if (!container) return;

  const bookings = window.CleanShieldDB ? window.CleanShieldDB.getMyServices() : [];

  if (countBadge) {
    countBadge.textContent = `${bookings.length} ${bookings.length === 1 ? 'Booking' : 'Bookings'}`;
  }
  updateMyServicesBadge();

  if (bookings.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:38px 16px;">
        <div style="width:68px; height:68px; background:#F0F6F3; border-radius:50%; margin:0 auto 14px; display:flex; align-items:center; justify-content:center; color:#25A27A;">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
          </svg>
        </div>
        <h4 style="color:var(--color-primary); font-size:1.2rem; margin-bottom:6px;">No Service Bookings Yet</h4>
        <p style="color:var(--color-text-muted); font-size:0.88rem; max-width:340px; margin:0 auto 18px;">
          When you place a booking for cleaning or odorless pest control, it will automatically appear here just like Amazon "My Orders".
        </p>
        <button type="button" class="btn-service-book" onclick="closeModal('modalMyServices'); openBookingModal('Full Home Deep Cleaning', '2 BHK');" style="padding:10px 24px;">
          Book a Service Now
        </button>

        <div style="margin-top:28px; padding-top:20px; border-top:1px dashed #D6E5DE;">
          <div style="font-weight:600; font-size:0.86rem; color:var(--color-primary); margin-bottom:6px;">
            Booked on another phone or browser?
          </div>
          <p style="font-size:0.82rem; color:var(--color-text-muted); margin-bottom:10px;">
            Enter your registered 10-digit mobile number to pull your bookings:
          </p>
          <div style="display:flex; max-width:320px; margin:0 auto; gap:6px;">
            <input type="tel" id="myServicesPhoneLookup" class="form-control" placeholder="10-digit mobile number" style="padding:8px 12px; font-size:0.88rem;">
            <button type="button" id="myServicesLookupBtn" onclick="lookupMyServicesByPhone()" class="btn-service-book" style="white-space:nowrap; padding:8px 16px; font-size:0.84rem;">
              Find
            </button>
          </div>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = bookings.map(b => {
    const statusClass = (b.status || 'Confirmed').toLowerCase().replace(/\s+/g, '');
    const amountStr = Number(b.amount || 0) > 0 ? `₹${Number(b.amount).toLocaleString('en-IN')}` : 'Free Inspection / Quote';
    const locStr = b.locality || 'Rajamahendravaram';
    const exactStr = b.exactLocation || b.address || 'Standard Location';

    return `
      <div class="my-service-card" style="background:#FFFFFF; border:1px solid #DFECE6; border-radius:12px; padding:16px; margin-bottom:14px; box-shadow:0 2px 6px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px; border-bottom:1px solid #EDF3F0; padding-bottom:10px; margin-bottom:12px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.5px; color:var(--color-text-muted); font-weight:700;">BOOKING REFERENCE</span>
              <span style="font-size:0.78rem; color:#666;">Placed on ${b.createdAt ? new Date(b.createdAt).toLocaleDateString() : (b.date || 'Recent')}</span>
            </div>
            <div style="font-size:1.15rem; font-weight:800; color:var(--color-primary); margin-top:2px;">
              ${b.id}
            </div>
          </div>
          <div style="text-align:right;">
            <span class="status-badge status-${statusClass}" style="font-size:0.8rem; padding:4px 12px; border-radius:20px; font-weight:700;">
              ${b.status || 'Confirmed'}
            </span>
            <div style="font-size:1rem; font-weight:800; color:var(--color-primary); margin-top:3px;">
              ${amountStr}
            </div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr; gap:8px; margin-bottom:14px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:1.15rem;">🧹</span>
            <strong style="color:var(--color-primary); font-size:0.98rem;">${b.service}</strong>
            ${b.bhk ? `<span style="font-size:0.8rem; background:#EBF4F0; color:var(--color-primary); padding:2px 8px; border-radius:6px; font-weight:700;">${b.bhk}</span>` : ''}
          </div>

          <div style="font-size:0.86rem; color:#555; display:flex; align-items:center; gap:6px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#25A27A"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
            <strong>Scheduled:</strong> ${b.date} &bull; ${b.timeSlot || '09:00 AM'}
          </div>

          <div style="font-size:0.86rem; color:#555; display:flex; align-items:flex-start; gap:6px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#25A27A" style="flex-shrink:0; margin-top:2px;"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            <div>
              <strong>Locality:</strong> ${locStr}<br>
              <strong>Exact Location:</strong> ${exactStr}
            </div>
          </div>
        </div>

        ${b.status === 'Pending' ? `
        <div style="background:#FEF3C7; border:1px solid #FCD34D; border-radius:8px; padding:10px 12px; margin-bottom:12px; font-size:0.82rem; color:#92400E; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <span>⚠️ <strong>Awaiting WhatsApp Confirmation:</strong> Please send the prefilled WhatsApp message to verify your booking.</span>
          <a href="${window.CleanShieldDB.getWhatsAppConfirmationUrl(b)}" target="_blank" rel="noopener" onclick="window.CleanShieldDB.recordWhatsAppInitiated('${b.id}')" style="background:#25D366; color:#fff; padding:5px 12px; border-radius:6px; font-weight:700; text-decoration:none; font-size:0.78rem; white-space:nowrap;">
            Open WhatsApp
          </a>
        </div>` : ''}

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; border-top:1px solid #EDF3F0; padding-top:12px;">
          <button type="button" class="btn-service-book" onclick="trackFromMyServices('${b.id}')" style="padding:7px 16px; font-size:0.84rem; display:inline-flex; align-items:center; gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            Track Status
          </button>
          
          <a href="${window.CleanShieldDB.getWhatsAppLink(window.CleanShieldDB.getBusinessConfig().whatsapp1, `Namaste Manjusha Cleaning & Pest Control Services, inquiring on my booking ${b.id} (${b.service})...`)}" target="_blank" rel="noopener" class="btn-action-wa" style="padding:7px 14px; font-size:0.82rem; text-decoration:none;">
            WhatsApp Support
          </a>

          <button type="button" onclick="closeModal('modalMyServices'); openBookingModal('${b.service}', '${b.bhk || '2 BHK'}');" style="background:#FFFFFF; border:1px solid #CBDCD4; color:var(--color-primary); padding:6px 12px; border-radius:6px; font-size:0.8rem; font-weight:700; cursor:pointer;">
            Book Again
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function trackFromMyServices(bookingId) {
  closeModal('modalMyServices');
  openModal('modalTrack');
  const trackInput = document.getElementById('trackInput');
  if (trackInput) trackInput.value = bookingId;
  handleTrackSubmit(null, bookingId);
}

async function lookupMyServicesByPhone() {
  const input = document.getElementById('myServicesPhoneLookup');
  const phone = input ? input.value.trim() : '';
  const btn = document.getElementById('myServicesLookupBtn');
  if (!phone || phone.length < 7) {
    alert('Please enter your 10-digit mobile number.');
    return;
  }
  if (btn) btn.textContent = 'Searching...';

  try {
    const res = await fetch(`${API_BASE_URL}/bookings/track/${encodeURIComponent(phone)}`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        window.CleanShieldDB.saveToMyServices(json.data);
        renderMyServicesList();
        showToast(`Found booking ${json.data.id}! Added to My Services.`);
        return;
      }
    }
    alert(`No bookings found matching mobile number "${phone}".`);
  } catch (err) {
    alert('Could not connect to database. Please check your connection.');
  } finally {
    if (btn) btn.textContent = 'Find';
  }
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
