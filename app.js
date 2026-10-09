/**
 * NR Audio Visual - Main Client Logic
 * Domain: nraudiovisual.in
 */

import { siteConfig } from './config.js';

// Expose config globally for inline scripts if needed
window.NR_CONFIG = siteConfig;

/* ==========================================================================
   1. Theme Management (Paper vs Backstage)
   ========================================================================== */
function initTheme() {
  const root = document.documentElement;
  const storageKey = 'nr_theme_preference';
  
  // Safe read from localStorage
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch (e) {
    console.warn('localStorage not available for theme');
  }

  // System preference fallback
  if (!savedTheme) {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    savedTheme = prefersDark ? 'dark' : 'light';
  }

  setTheme(savedTheme, false);

  // Bind toggle buttons
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next, true);
    });
  });

  // Listen for OS theme changes if user hasn't explicitly set
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      try {
        if (!localStorage.getItem(storageKey)) {
          setTheme(e.matches ? 'dark' : 'light', false);
        }
      } catch (err) {}
    });
  }
}

function setTheme(theme, save = true) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }

  if (save) {
    try {
      localStorage.setItem('nr_theme_preference', theme);
    } catch (e) {}
  }

  // Update theme toggle icons across the DOM
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Paper (Light)' : 'Backstage (Dark)'} theme`);
    btn.innerHTML = theme === 'dark'
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
  });
}

/* ==========================================================================
   2. Quote Drawer & Persistent Cart
   ========================================================================== */
const QUOTE_STORAGE_KEY = 'nr_quote_list_items';

export function getQuoteList() {
  try {
    const raw = localStorage.getItem(QUOTE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveQuoteList(items) {
  try {
    localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {}
  updateQuoteUI();
}

export function addToQuote(item) {
  const current = getQuoteList();
  const exists = current.some(i => i.id === item.id);
  if (!exists) {
    current.push({
      id: item.id,
      name: item.name,
      category: item.category || 'Equipment',
      type: item.type || 'AV',
    });
    saveQuoteList(current);
    showToast(`Added "${item.name}" to your quote`);
  } else {
    showToast(`"${item.name}" is already in your quote`);
  }
  openQuoteDrawer();
}

export function removeFromQuote(itemId) {
  const current = getQuoteList().filter(i => i.id !== itemId);
  saveQuoteList(current);
}

export function clearQuoteList() {
  saveQuoteList([]);
}

function updateQuoteUI() {
  const list = getQuoteList();
  const count = list.length;

  // Update badges
  document.querySelectorAll('.quote-badge-count').forEach(badge => {
    badge.textContent = count.toString();
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  });

  // Render drawer body
  const container = document.getElementById('drawer-items-list');
  const emptyState = document.getElementById('drawer-empty-state');
  const drawerFooter = document.getElementById('drawer-footer-actions');

  if (container) {
    container.innerHTML = '';
    if (count === 0) {
      if (emptyState) emptyState.style.display = 'flex';
      if (drawerFooter) drawerFooter.style.display = 'none';
    } else {
      if (emptyState) emptyState.style.display = 'none';
      if (drawerFooter) drawerFooter.style.display = 'block';

      list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'drawer-item';
        div.innerHTML = `
          <div>
            <div class="drawer-item-title">${escapeHtml(item.name)}</div>
            <div class="drawer-item-cat">${escapeHtml(item.category)} · No Price Shown (Quote Only)</div>
          </div>
          <button class="drawer-item-remove" data-id="${item.id}" aria-label="Remove ${escapeHtml(item.name)}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        `;
        container.appendChild(div);
      });

      // Bind remove buttons
      container.querySelectorAll('.drawer-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          removeFromQuote(id);
        });
      });
    }
  }
}

function openQuoteDrawer() {
  const drawer = document.getElementById('quote-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer) drawer.classList.add('open');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuoteDrawer() {
  const drawer = document.getElementById('quote-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function initQuoteDrawer() {
  document.querySelectorAll('.quote-drawer-trigger').forEach(btn => {
    btn.addEventListener('click', openQuoteDrawer);
  });

  const closeBtn = document.getElementById('close-drawer-btn');
  const overlay = document.getElementById('drawer-overlay');

  if (closeBtn) closeBtn.addEventListener('click', closeQuoteDrawer);
  if (overlay) overlay.addEventListener('click', closeQuoteDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeQuoteDrawer();
  });

  // Bind dynamic add-to-quote buttons in catalogue
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add-to-quote]');
    if (btn) {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const cat = btn.getAttribute('data-category');
      if (id && name) {
        addToQuote({ id, name, category: cat });
      }
    }
  });

  updateQuoteUI();
}

/* ==========================================================================
   3. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const closeBtn = document.getElementById('close-mobile-nav');

  if (!toggleBtn || !drawer) return;

  function toggle() {
    drawer.classList.toggle('open');
    document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', toggle);
  if (closeBtn) closeBtn.addEventListener('click', toggle);

  drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   4. Accordion Logic (FAQ)
   ========================================================================== */
function initAccordions() {
  const container = document.querySelector('.faq-accordion');
  if (container && siteConfig.faqs && siteConfig.faqs.length > 0) {
    container.innerHTML = siteConfig.faqs.map((faq, idx) => `
      <div class="faq-item ${idx === 0 ? 'active' : ''}">
        <button class="faq-trigger" type="button" aria-expanded="${idx === 0 ? 'true' : 'false'}">
          <span>${escapeHtml(faq.question)}</span>
          <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-content">
          <p>${escapeHtml(faq.answer)}</p>
        </div>
      </div>
    `).join('');
  }

  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const wasActive = item.classList.contains('active');
      
      // Close all others
      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('active');
        const trig = other.querySelector('.faq-trigger');
        if (trig) trig.setAttribute('aria-expanded', 'false');
      });

      if (!wasActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   5. Lightbox Modal for Gallery
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  const galleryContainer = document.querySelector('.gallery-masonry');
  if (galleryContainer && siteConfig.gallery && siteConfig.gallery.length > 0) {
    galleryContainer.innerHTML = siteConfig.gallery.map(item => `
      <div class="gallery-item" data-lightbox-src="${item.photo}" data-lightbox-title="${escapeHtml(item.title)}" data-lightbox-meta="${escapeHtml(item.subtitle || item.meta || item.venue || item.category)}">
        <img src="${item.photo}" alt="${escapeHtml(item.title)}" loading="lazy" onerror="this.src='images/wedding-stage-banner.jpg'" />
        <div class="gallery-caption">
          <div class="gallery-title">${escapeHtml(item.title)}</div>
          <div class="gallery-subtitle">${escapeHtml(item.subtitle || `${item.category} · ${item.venue || ''}`)}</div>
        </div>
      </div>
    `).join('');
  }

  if (!modal) return;

  document.querySelectorAll('[data-lightbox-src]').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-lightbox-src');
      const title = item.getAttribute('data-lightbox-title') || '';
      const meta = item.getAttribute('data-lightbox-meta') || '';
      if (modalImg) modalImg.src = src;
      if (modalCaption) modalCaption.innerHTML = `<strong>${escapeHtml(title)}</strong><br><small>${escapeHtml(meta)}</small>`;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function close() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });
}

/* ==========================================================================
   6. Contact & Quote Form Handler (WhatsApp & Mailto & Netlify)
   ========================================================================== */
function initQuoteForm() {
  const form = document.getElementById('quote-request-form');
  if (!form) return;

  // Pre-fill selected city if URL parameter or city page
  const urlParams = new URLSearchParams(window.location.search);
  const cityParam = urlParams.get('city');
  const citySelect = document.getElementById('form-city');
  if (cityParam && citySelect) {
    citySelect.value = cityParam.toLowerCase();
  }

  // Pre-select equipment chips from quote list
  const quoteItems = getQuoteList();
  const selectedGearSet = new Set(quoteItems.map(i => i.name));

  document.querySelectorAll('.chip-btn').forEach(chip => {
    const val = chip.getAttribute('data-value');
    if (selectedGearSet.has(val)) {
      chip.classList.add('selected');
    }

    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value.trim();
    const phone = form.querySelector('[name="phone"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const city = form.querySelector('[name="city"]')?.value.trim();
    const eventType = form.querySelector('[name="eventType"]')?.value.trim();
    const eventDate = form.querySelector('[name="eventDate"]')?.value.trim();
    const venue = form.querySelector('[name="venue"]')?.value.trim() || 'To be decided';
    const audience = form.querySelector('[name="audience"]')?.value.trim() || 'Not specified';
    const notes = form.querySelector('[name="notes"]')?.value.trim() || 'None';

    // Collect chosen equipment chips + items in cart
    const selectedChips = Array.from(document.querySelectorAll('.chip-btn.selected')).map(c => c.getAttribute('data-value'));
    const allGear = Array.from(new Set([...selectedChips, ...quoteItems.map(i => i.name)]));

    if (!name || !phone || !city || !eventType || !eventDate) {
      showToast('Please fill in all required fields (Name, Phone, City, Event Type, Date)');
      return;
    }

    // Save to Admin Panel Inquiries CRM
    try {
      const existingInquiries = JSON.parse(localStorage.getItem('nr_event_inquiries') || '[]');
      existingInquiries.unshift({
        id: 'inq_' + Date.now(),
        name,
        phone,
        email: email || 'Not provided',
        city,
        eventType,
        eventDate,
        venue,
        audience,
        notes,
        equipment: allGear,
        status: 'New',
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('nr_event_inquiries', JSON.stringify(existingInquiries));
    } catch (err) {
      console.warn('Could not save inquiry to local storage', err);
    }

    // Format Rider-style quote message for WhatsApp
    let msg = `*NEW AV RENTAL QUOTE REQUEST*\n`;
    msg += `------------------------------------\n`;
    msg += `*Client Name:* ${name}\n`;
    msg += `*Phone / WhatsApp:* ${phone}\n`;
    msg += `*Email:* ${email || 'Not provided'}\n`;
    msg += `*City:* ${city.toUpperCase()} (Served from City Centre)\n`;
    msg += `*Event Type:* ${eventType}\n`;
    msg += `*Date of Event:* ${eventDate}\n`;
    msg += `*Venue Location:* ${venue}\n`;
    msg += `*Estimated Audience:* ${audience}\n`;
    msg += `------------------------------------\n`;
    msg += `*EQUIPMENT RIDER / REQUIREMENTS:*\n`;
    if (allGear.length > 0) {
      allGear.forEach(item => {
        msg += `• ${item}\n`;
      });
    } else {
      msg += `• Full custom setup recommendation requested\n`;
    }
    msg += `------------------------------------\n`;
    msg += `*Additional Notes:* ${notes}\n`;
    msg += `------------------------------------\n`;
    msg += `Sent via nraudiovisual.in quote request`;

    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${siteConfig.contact.phoneClean.replace('+', '')}?text=${encodedMsg}`;

    // Prompt user choice or open WhatsApp directly
    window.open(whatsappUrl, '_blank');
    showToast('Opening WhatsApp with your formatted equipment rider...');
  });

  // Mailto fallback button
  const mailBtn = document.getElementById('send-email-fallback');
  if (mailBtn) {
    mailBtn.addEventListener('click', () => {
      const name = form.querySelector('[name="name"]')?.value.trim() || 'Client';
      const city = form.querySelector('[name="city"]')?.value.trim() || 'Hyderabad / Bangalore / Mumbai';
      const date = form.querySelector('[name="eventDate"]')?.value.trim() || 'Upcoming';
      const notes = form.querySelector('[name="notes"]')?.value.trim() || '';

      const quoteItems = getQuoteList().map(i => i.name).join('\n- ');
      const subject = encodeURIComponent(`AV Rental Quote Request - ${name} (${city}, ${date})`);
      const body = encodeURIComponent(
        `Hello NR Audio Visual,\n\nI would like to request a quote for equipment rental:\n\n` +
        `Name: ${name}\n` +
        `City: ${city}\n` +
        `Event Date: ${date}\n\n` +
        `Selected Equipment:\n- ${quoteItems || 'Please suggest appropriate package'}\n\n` +
        `Notes: ${notes}\n\nThank you!`
      );
      window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
    });
  }
}

/* ==========================================================================
   7. Category Filtering for Products Catalogue
   ========================================================================== */
function initCatalogueFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.onclick = () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const cards = document.querySelectorAll('#catalogue-cards-container .gear-card, .gear-grid .gear-card');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const type = card.getAttribute('data-type');
        if (filter === 'all' || cat === filter || type === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    };
  });
}

/* ==========================================================================
   8. Console Fader Subtle Ambient Motion on Scroll
   ========================================================================== */
function initFaderMotion() {
  const faders = document.querySelectorAll('.fader-thumb');
  if (faders.length === 0) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    faders.forEach((thumb, idx) => {
      const offset = (Math.sin(scrolled * 0.005 + idx * 1.5) + 1) * 35; // 0px to 70px
      thumb.style.top = `${offset}%`;
    });
  }, { passive: true });
}

/* ==========================================================================
   9. Imaginary Floating Background Illustrations
   ========================================================================== */
function initImaginaryBackgroundArt() {
  if (document.querySelector('.global-bg-decorations')) return;

  const bgWrapper = document.createElement('div');
  bgWrapper.className = 'global-bg-decorations';
  bgWrapper.setAttribute('aria-hidden', 'true');

  bgWrapper.innerHTML = `
    <!-- 1. Floating Acoustic Frequency Rings -->
    <div class="float-art-node node-1">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="90" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 6"/>
        <circle cx="100" cy="100" r="60" stroke="currentColor" stroke-width="1"/>
        <circle cx="100" cy="100" r="30" stroke="currentColor" stroke-width="1.5"/>
        <path d="M85 130V75L125 65V120" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        <circle cx="75" cy="130" r="12" fill="currentColor"/>
        <circle cx="115" cy="120" r="12" fill="currentColor"/>
      </svg>
    </div>

    <!-- 2. Dual Oscillating Sine Waveforms -->
    <div class="float-art-node node-2">
      <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 90 Q 50 10, 90 90 T 170 90" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M10 90 Q 50 170, 90 90 T 170 90" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 4"/>
        <line x1="90" y1="20" x2="90" y2="160" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/>
      </svg>
    </div>

    <!-- 3. Geometric Concert Spotlight Prism -->
    <div class="float-art-node node-3">
      <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="110,20 190,75 190,165 110,205 30,165 30,75" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="110" cy="110" r="50" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4"/>
        <path d="M100 135V80L130 70V125" stroke="currentColor" stroke-width="2.5"/>
        <circle cx="92" cy="135" r="9" fill="currentColor"/>
        <circle cx="122" cy="125" r="9" fill="currentColor"/>
      </svg>
    </div>

    <!-- 4. Mixing Console Fader Matrix -->
    <div class="float-art-node node-4">
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="20" x2="30" y2="140" stroke="currentColor" stroke-width="2"/>
        <line x1="80" y1="20" x2="80" y2="140" stroke="currentColor" stroke-width="2"/>
        <line x1="130" y1="20" x2="130" y2="140" stroke="currentColor" stroke-width="2"/>
        <rect x="20" y="50" width="20" height="12" rx="2" fill="currentColor"/>
        <rect x="70" y="90" width="20" height="12" rx="2" fill="currentColor"/>
        <rect x="120" y="35" width="20" height="12" rx="2" fill="currentColor"/>
      </svg>
    </div>

    <!-- 5. Audio Spectrum Equalizer Ribbons -->
    <div class="float-art-node node-5">
      <svg viewBox="0 0 260 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="70" width="12" height="40" rx="3" fill="currentColor" opacity="0.7"/>
        <rect x="30" y="45" width="12" height="65" rx="3" fill="currentColor" opacity="0.8"/>
        <rect x="50" y="20" width="12" height="90" rx="3" fill="currentColor"/>
        <rect x="70" y="35" width="12" height="75" rx="3" fill="currentColor"/>
        <rect x="90" y="60" width="12" height="50" rx="3" fill="currentColor" opacity="0.8"/>
        <rect x="110" y="15" width="12" height="95" rx="3" fill="currentColor"/>
        <rect x="130" y="40" width="12" height="70" rx="3" fill="currentColor"/>
        <rect x="150" y="55" width="12" height="55" rx="3" fill="currentColor" opacity="0.8"/>
        <rect x="170" y="25" width="12" height="85" rx="3" fill="currentColor"/>
        <rect x="190" y="50" width="12" height="60" rx="3" fill="currentColor" opacity="0.8"/>
        <rect x="210" y="70" width="12" height="40" rx="3" fill="currentColor" opacity="0.6"/>
        <rect x="230" y="85" width="12" height="25" rx="3" fill="currentColor" opacity="0.4"/>
      </svg>
    </div>

    <!-- 6. XLR Cable Loop & Roadcase Ball Corner -->
    <div class="float-art-node node-6">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 60 C 80 10, 140 120, 90 160 C 50 190, 30 110, 120 70 C 180 40, 170 140, 190 180" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="185" cy="175" r="8" fill="currentColor"/>
        <rect x="20" y="20" width="40" height="40" rx="4" stroke="currentColor" stroke-width="2"/>
        <circle cx="28" cy="28" r="4" fill="currentColor"/>
      </svg>
    </div>

    <!-- 7. Acoustic Subwoofer Radial Pressure Waves -->
    <div class="float-art-node node-7">
      <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="20" fill="currentColor" opacity="0.3"/>
        <circle cx="90" cy="90" r="45" stroke="currentColor" stroke-width="2" stroke-dasharray="8 6"/>
        <circle cx="90" cy="90" r="70" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 6"/>
        <circle cx="90" cy="90" r="85" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4"/>
      </svg>
    </div>

    <!-- 8. Line Array Column Speaker Silhouette Vector -->
    <div class="float-art-node node-8">
      <svg viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="55" y="10" width="50" height="130" rx="4" stroke="currentColor" stroke-width="2"/>
        <line x1="55" y1="35" x2="105" y2="35" stroke="currentColor" stroke-width="1"/>
        <line x1="55" y1="60" x2="105" y2="60" stroke="currentColor" stroke-width="1"/>
        <line x1="55" y1="85" x2="105" y2="85" stroke="currentColor" stroke-width="1"/>
        <line x1="55" y1="110" x2="105" y2="110" stroke="currentColor" stroke-width="1"/>
        <line x1="80" y1="140" x2="80" y2="175" stroke="currentColor" stroke-width="4"/>
        <rect x="40" y="175" width="80" height="40" rx="4" stroke="currentColor" stroke-width="2.5"/>
        <circle cx="80" cy="195" r="10" stroke="currentColor" stroke-width="2"/>
      </svg>
    </div>
  `;

  document.body.prepend(bgWrapper);
}

/* ==========================================================================
   10. Interactive Capabilities Showcase (Matching Video Layout)
   ========================================================================== */
function initCapabilitiesShowcase() {
  const container = document.getElementById('capabilities-showcase-container');
  if (!container) return;

  const capabilitiesData = [
    {
      index: 0,
      kicker: "01 / AUDIO REINFORCEMENT",
      title: "Sound Reinforcement & Line-Array PA",
      desc: "High-definition vertical column speakers and active subwoofers tuned for intelligible speech and punchy musical dynamics without painful feedback or dead zones.",
      image: "images/ld-systems-column-array.jpg",
      alt: "LD Systems column line array PA speaker on powered subwoofer base",
      badgeLeft: "Live Sound & PA",
      badgeRight: "120° Wide Coverage",
      metrics: [
        { label: "AUDIENCE RANGE", val: "50 to 1,500+" },
        { label: "DISPERSION", val: "120° Horizontal" },
        { label: "SUBWOOFER BASE", val: "Active Pole-Mount" }
      ],
      chips: ["LD Systems Column PA", "Active Subwoofer Base", "Yamaha TF5 Console", "Stage Monitors"],
      quoteId: "ld-systems-column",
      quoteName: "LD Systems Column Line-Array PA",
      quoteCategory: "Sound",
      whatsappMsg: "Hi Ramavath, I would like to quote for the Sound Reinforcement and Line-Array PA",
      specsUrl: "/services.html#service-sound"
    },
    {
      index: 1,
      kicker: "02 / WIRELESS RF SYSTEMS",
      title: "Rack-Mounted Shure Wireless Mics",
      desc: "Tour-grade Shure wireless receiver racks paired with rugged handheld vocal microphones. Pre-scanned clean frequencies eliminate signal dropouts across crowded venue floors.",
      image: "images/shure-wireless-rack.jpg",
      alt: "Rack-mounted Shure wireless receivers with handheld wireless microphones",
      badgeLeft: "UHF Wireless RF",
      badgeRight: "Clean UHF Bands",
      metrics: [
        { label: "FREQUENCY TECH", val: "True Diversity UHF" },
        { label: "TRANSMITTERS", val: "Handhelds & Lapels" },
        { label: "ENCLOSURE", val: "Shock Road Rack" }
      ],
      chips: ["Shure UHF Receivers", "Handheld Transmitters", "Antenna Distro", "Shock-Mount Road Rack"],
      quoteId: "shure-wireless-rack",
      quoteName: "Rack-Mounted Shure Wireless Mic Kit",
      quoteCategory: "Wireless Mics",
      whatsappMsg: "Hi Ramavath, I would like to quote for Rack-Mounted Shure Wireless Mics",
      specsUrl: "/products.html"
    },
    {
      index: 2,
      kicker: "03 / STAGE BACKLINE",
      title: "Live Band Backline & Instruments",
      desc: "Stage instruments ready for touring players, worship teams, and wedding musicians: touch-sensitive keyboards, all-mesh electronic drums, and high-headroom bass amps.",
      image: "images/band-backline-banner.jpg",
      alt: "Alesis electronic drums, Yamaha keyboard, and bass amp backline",
      badgeLeft: "Stage Instruments",
      badgeRight: "Touring Backline",
      metrics: [
        { label: "KEYBOARDS", val: "Yamaha PSR-I500" },
        { label: "PERCUSSION", val: "Alesis Mesh Kit" },
        { label: "STAGE AMP", val: "Bass Combo 3-Band EQ" }
      ],
      chips: ["Yamaha PSR-I500", "Alesis Mesh Drums", "Bass Amp Combo", "Instrument Stands"],
      quoteId: "alesis-drum-kit",
      quoteName: "Alesis Electronic Drum Kit & Throne",
      quoteCategory: "Backline",
      whatsappMsg: "Hi Ramavath, I would like to quote for Live Band Backline Gear",
      specsUrl: "/products.html"
    },
    {
      index: 3,
      kicker: "04 / VISUAL PRODUCTION",
      title: "LED Video Walls & Projectors",
      desc: "High-impact visual production tailored to venue sightlines: fine-pitch modular LED video walls, high-lumen digital projectors with fast-fold screens, and fluid-head recording camcorders.",
      image: "images/led-video-wall.jpg",
      alt: "Vibrant modular LED video wall and video recording setup",
      badgeLeft: "LED & Video IMAG",
      badgeRight: "Modular 4K IMAG",
      metrics: [
        { label: "SCREEN PANELS", val: "Ultra-Fine Pitch LED" },
        { label: "PROJECTORS", val: "High-Lumen Fast-Fold" },
        { label: "CAMERA RIG", val: "Fluid-Head IMAG Cam" }
      ],
      chips: ["Modular LED Tiles", "Digital Projectors", "Fast-Fold Screens", "Fluid-Head Camcorders"],
      quoteId: "led-video-walls",
      quoteName: "High-Resolution Modular LED Video Walls",
      quoteCategory: "LED Walls",
      whatsappMsg: "Hi Ramavath, I would like to quote for LED Video Walls and Displays",
      specsUrl: "/services.html#service-visuals"
    }
  ];

  let currentIndex = 0;
  let isAutoCycling = true;
  let isHovered = false;
  const cycleDuration = 8000; // 8.0 seconds per slide (generous, relaxed reading pace)
  let startTime = Date.now();

  const stageWrap = document.getElementById('stage-media-wrap');
  const mainImg = document.getElementById('stage-main-img');
  const badgeLeftText = document.getElementById('stage-badge-left-text');
  const badgeRightText = document.getElementById('stage-badge-right-text');
  const kickerText = document.getElementById('stage-kicker-text');
  const titleElem = document.getElementById('stage-title');
  const descElem = document.getElementById('stage-desc');
  const metricsRow = document.getElementById('stage-metrics-row');
  const gearSection = document.getElementById('stage-gear-section');
  const addQuoteBtn = document.getElementById('stage-add-quote-btn');
  const whatsappBtn = document.getElementById('stage-whatsapp-btn');
  const specsLink = document.getElementById('stage-specs-link');

  const tabs = document.querySelectorAll('.capability-tab');
  const toggleBtn = document.getElementById('autocycle-toggle-btn');
  const toggleStatusText = document.getElementById('autocycle-status-text');

  function renderActive(index) {
    const data = capabilitiesData[index];
    if (!data) return;

    // Smooth, cinematic crossfade image transition
    if (stageWrap && mainImg) {
      const currentSrc = mainImg.getAttribute('src');
      if (currentSrc !== data.image) {
        const nextImg = document.createElement('img');
        nextImg.className = 'stage-media-img stage-media-crossfade';
        nextImg.alt = data.alt;
        nextImg.src = data.image;

        const onImageReady = () => {
          stageWrap.appendChild(nextImg);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              nextImg.classList.add('is-active');
              setTimeout(() => {
                mainImg.src = data.image;
                mainImg.alt = data.alt;
                nextImg.remove();
              }, 900);
            });
          });
        };

        if (nextImg.complete) {
          onImageReady();
        } else {
          nextImg.onload = onImageReady;
        }
      }
    } else if (mainImg) {
      mainImg.src = data.image;
      mainImg.alt = data.alt;
    }

    // Gentle dissolve transition for stage text
    const textElements = [badgeLeftText, badgeRightText, kickerText, titleElem, descElem].filter(Boolean);
    textElements.forEach(el => {
      el.style.transition = 'opacity 0.3s ease';
      el.style.opacity = '0.35';
    });

    setTimeout(() => {
      if (badgeLeftText) badgeLeftText.textContent = data.badgeLeft;
      if (badgeRightText) badgeRightText.textContent = data.badgeRight;
      if (kickerText) kickerText.textContent = data.kicker;
      if (titleElem) titleElem.textContent = data.title;
      if (descElem) descElem.textContent = data.desc;
      textElements.forEach(el => {
        el.style.opacity = '1';
      });
    }, 180);

    // Render metrics
    if (metricsRow) {
      metricsRow.innerHTML = data.metrics.map(m => `
        <div class="stage-metric-box">
          <span class="stage-metric-label">${escapeHtml(m.label)}</span>
          <span class="stage-metric-val">${escapeHtml(m.val)}</span>
        </div>
      `).join('');
    }

    // Render gear chips
    if (gearSection) {
      gearSection.innerHTML = data.chips.map(chip => `
        <span class="stage-gear-tag">${escapeHtml(chip)}</span>
      `).join('');
    }

    // Update quote button attributes
    if (addQuoteBtn) {
      addQuoteBtn.setAttribute('data-id', data.quoteId);
      addQuoteBtn.setAttribute('data-name', data.quoteName);
      addQuoteBtn.setAttribute('data-category', data.quoteCategory);
    }

    // Update WhatsApp link
    if (whatsappBtn) {
      const cleanPhone = '919133133003';
      whatsappBtn.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(data.whatsappMsg)}`;
      whatsappBtn.setAttribute('aria-label', `WhatsApp Ramavath for ${data.title} quote`);
    }

    // Update specs link
    if (specsLink) {
      specsLink.href = data.specsUrl;
    }

    // Update active tab styles
    tabs.forEach((tab, i) => {
      if (i === index) {
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
      }
      // Reset progress bar on all tabs
      const pBar = document.getElementById(`tab-progress-${i}`);
      if (pBar) {
        pBar.style.width = '0%';
      }
    });

    startTime = Date.now();
  }

  // Click on tab switches active immediately
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.getAttribute('data-tab-index'), 10);
      if (!isNaN(idx) && idx !== currentIndex) {
        currentIndex = idx;
        renderActive(currentIndex);
      }
    });

    // Keyboard accessibility
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        tab.click();
      }
    });
  });

  // Toggle Auto-cycling
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isAutoCycling = !isAutoCycling;
      if (isAutoCycling) {
        toggleBtn.classList.remove('paused');
        if (toggleStatusText) toggleStatusText.textContent = 'Active';
        startTime = Date.now();
      } else {
        toggleBtn.classList.add('paused');
        if (toggleStatusText) toggleStatusText.textContent = 'Paused';
        const activeBar = document.getElementById(`tab-progress-${currentIndex}`);
        if (activeBar) activeBar.style.width = '0%';
      }
    });
  }

  // Pause on hover
  container.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  container.addEventListener('mouseleave', () => {
    isHovered = false;
    startTime = Date.now();
  });

  // Smooth progress bar and auto-cycle countdown loop
  function stepCycle() {
    if (isAutoCycling && !isHovered) {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / cycleDuration) * 100);

      const activeBar = document.getElementById(`tab-progress-${currentIndex}`);
      if (activeBar) {
        activeBar.style.width = `${pct}%`;
      }

      if (elapsed >= cycleDuration) {
        currentIndex = (currentIndex + 1) % capabilitiesData.length;
        renderActive(currentIndex);
      }
    }
    requestAnimationFrame(stepCycle);
  }

  // Initial render
  renderActive(0);
  requestAnimationFrame(stepCycle);
}

/* ==========================================================================
   11. Toast Utility
   ========================================================================== */
export function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

/* ==========================================================================
   12. Dynamic Content Synchronization (Connected to Admin Panel)
   ========================================================================== */

function getCataloguePhoto(item) {
  const defaultPhotoMap = {
    'stage-lighting': 'images/lighting-rig.jpg',
    'projectors-screens': 'images/projector-screen.jpg',
    'led-video-walls': 'images/led-video-wall.jpg',
    'led-screen': 'images/led-screen.jpg',
    'flower-decoration': 'images/flower-decoration.jpg',
    'marriage-events': 'images/marriage-events.jpg',
    'yamaha-tf5': 'images/yamaha-tf5-mixer.jpg',
    'shure-wireless-rack': 'images/shure-wireless-rack.jpg',
    'ld-systems-column': 'images/ld-systems-column-array.jpg',
    'yamaha-psr-i500': 'images/yamaha-psr-i500-keyboard.jpg',
    'alesis-drum-kit': 'images/alesis-drum-kit.jpg',
    'bass-amp': 'images/bass-amp.jpg',
    'small-combo-amp': 'images/bass-amp.jpg',
    'camcorder-tripod': 'images/camcorder-tripod.jpg',
  };
  return item.photo || (item.photos && item.photos[0]) || defaultPhotoMap[item.id] || 'images/yamaha-tf5-mixer.jpg';
}

function syncCatalogue() {
  const container = document.getElementById('catalogue-cards-container');
  if (!container || !siteConfig.catalogue) return;

  const phoneClean = (siteConfig.contact?.phoneClean || '919133133003').replace('+', '');

  container.innerHTML = siteConfig.catalogue.map(item => {
    const specsHtml = (item.specs || []).map(s => `<span class="gear-spec-chip">${escapeHtml(s)}</span>`).join('');
    const waText = encodeURIComponent(`Hi Ramavath, I am interested in renting the ${item.name}`);
    const photoSrc = getCataloguePhoto(item);
    const mediaHtml = `<img src="${photoSrc}" alt="${escapeHtml(item.name)}" class="gear-media-img" loading="lazy" onerror="this.onerror=null; this.src='images/yamaha-tf5-mixer.jpg';" />`;

    return `
      <article class="gear-card" data-category="${escapeHtml(item.category || '')}" data-type="${escapeHtml(item.type || item.category || '')}" onclick="window.location.href='/product-details.html?id=${encodeURIComponent(item.id)}'" style="cursor: pointer;">
        <a href="/product-details.html?id=${encodeURIComponent(item.id)}" class="gear-media-wrapper" aria-label="View ${escapeHtml(item.name)} specifications">
          ${mediaHtml}
        </a>
        <div class="gear-card-body">
          <div class="gear-card-meta">${escapeHtml(item.category || 'Gear')} · ${escapeHtml(item.type || 'Sound')}</div>
          <h3 class="gear-card-title"><a href="/product-details.html?id=${encodeURIComponent(item.id)}" style="color: inherit; text-decoration: none;">${escapeHtml(item.name)}</a></h3>
          <p class="gear-card-summary">${escapeHtml(item.summary || '')}</p>
          <div class="gear-spec-chips">
            ${specsHtml}
          </div>
          <div class="gear-card-actions" onclick="event.stopPropagation();">
            <button type="button" class="btn-rider" data-add-to-quote data-id="${escapeHtml(item.id)}" data-name="${escapeHtml(item.name)}" data-category="${escapeHtml(item.category || 'Gear')}">+ Add to Quote</button>
            <a href="https://wa.me/${phoneClean}?text=${waText}" class="btn-whatsapp-card" target="_blank" rel="noopener" aria-label="WhatsApp Ramavath about ${escapeHtml(item.name)}">
              <svg viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3"/></svg>
              <span>WhatsApp</span>
            </a>
            <a href="/product-details.html?id=${encodeURIComponent(item.id)}" class="gear-detail-link" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-hot); text-decoration: underline; font-weight: 600; margin-left: auto;">Specs →</a>
          </div>
        </div>
      </article>
    `;
  }).join('');

  const filterAllBtn = document.getElementById('filter-all-btn');
  if (filterAllBtn) {
    filterAllBtn.textContent = `All Equipment (${siteConfig.catalogue.length})`;
  }
}

function syncHomeFeaturedGear() {
  const container = document.getElementById('home-featured-gear');
  if (!container || !siteConfig.catalogue) return;

  const phoneClean = (siteConfig.contact?.phoneClean || '919133133003').replace('+', '');
  const featuredItems = siteConfig.catalogue.slice(0, 3);

  container.innerHTML = featuredItems.map(item => {
    const specsHtml = (item.specs || []).slice(0, 3).map(s => `<span class="gear-spec-chip">${escapeHtml(s)}</span>`).join('');
    const waText = encodeURIComponent(`Hi Ramavath, I am interested in renting the ${item.name}`);
    const photoSrc = getCataloguePhoto(item);
    const mediaHtml = `<img src="${photoSrc}" alt="${escapeHtml(item.name)}" class="gear-media-img" loading="lazy" onerror="this.onerror=null; this.src='images/yamaha-tf5-mixer.jpg';" />`;

    return `
      <article class="gear-card" onclick="window.location.href='/product-details.html?id=${encodeURIComponent(item.id)}'" style="cursor: pointer;">
        <a href="/product-details.html?id=${encodeURIComponent(item.id)}" class="gear-media-wrapper" aria-label="View ${escapeHtml(item.name)} specifications">
          ${mediaHtml}
        </a>
        <div class="gear-card-body">
          <div class="gear-card-meta">${escapeHtml(item.category || 'Gear')} · ${escapeHtml(item.type || 'Sound')}</div>
          <h3 class="gear-card-title"><a href="/product-details.html?id=${encodeURIComponent(item.id)}" style="color: inherit; text-decoration: none;">${escapeHtml(item.name)}</a></h3>
          <p class="gear-card-summary">${escapeHtml(item.summary || '')}</p>
          <div class="gear-spec-chips">
            ${specsHtml}
          </div>
          <div class="gear-card-actions" onclick="event.stopPropagation();">
            <button type="button" class="btn-rider" data-add-to-quote data-id="${escapeHtml(item.id)}" data-name="${escapeHtml(item.name)}" data-category="${escapeHtml(item.category || 'Gear')}">+ Add to Quote</button>
            <a href="https://wa.me/${phoneClean}?text=${waText}" class="btn-whatsapp-card" target="_blank" rel="noopener" aria-label="WhatsApp Ramavath about ${escapeHtml(item.name)}">
              <svg viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3"/></svg>
              <span>WhatsApp</span>
            </a>
            <a href="/product-details.html?id=${encodeURIComponent(item.id)}" class="gear-detail-link" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-hot); text-decoration: underline; font-weight: 600; margin-left: auto;">Specs →</a>
          </div>
        </div>
      </article>
    `;
  }).join('');

  initFeaturedGearSlider();
}

function initFeaturedGearSlider() {
  const container = document.getElementById('home-featured-gear');
  if (!container) return;

  const cards = container.querySelectorAll('.gear-card');
  if (cards.length <= 1) return;

  let dotsContainer = document.getElementById('featured-gear-dots');
  if (!dotsContainer) {
    dotsContainer = document.createElement('div');
    dotsContainer.id = 'featured-gear-dots';
    dotsContainer.className = 'gear-slider-dots';
    dotsContainer.setAttribute('aria-label', 'Featured equipment slide indicators');
    container.parentNode.appendChild(dotsContainer);
  }

  dotsContainer.innerHTML = Array.from(cards).map((_, idx) => `
    <button type="button" class="gear-slider-dot ${idx === 0 ? 'active' : ''}" data-slide="${idx}" aria-label="Go to Slide ${idx + 1}"></button>
  `).join('');

  const dots = dotsContainer.querySelectorAll('.gear-slider-dot');
  let currentIndex = 0;
  let autoSlideTimer = null;
  let isPaused = false;
  let touchStartX = 0;
  let touchEndX = 0;

  function goToSlide(index) {
    if (window.innerWidth >= 640) {
      container.style.transform = '';
      return;
    }
    currentIndex = (index + cards.length) % cards.length;
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    if (window.innerWidth >= 640) return;
    autoSlideTimer = setInterval(() => {
      if (!isPaused && window.innerWidth < 640) {
        goToSlide(currentIndex + 1);
      }
    }, 3500);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  function pauseBriefly() {
    isPaused = true;
    stopAutoSlide();
    setTimeout(() => {
      isPaused = false;
      startAutoSlide();
    }, 5000);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      goToSlide(idx);
      pauseBriefly();
    });
  });

  // Touch swipe support
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    isPaused = true;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }
    pauseBriefly();
  }, { passive: true });

  container.addEventListener('mouseenter', () => { isPaused = true; });
  container.addEventListener('mouseleave', () => { isPaused = false; });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 640) {
      container.style.transform = '';
      stopAutoSlide();
    } else {
      goToSlide(currentIndex);
      startAutoSlide();
    }
  });

  if (window.innerWidth < 640) {
    goToSlide(0);
    startAutoSlide();
  }
}

function syncHeroAndProtocol() {
  if (siteConfig.hero) {
    const badge = document.getElementById('hero-badge-text') || document.querySelector('.hero-editorial-badge span') || document.querySelector('.hero-editorial-badge');
    if (badge && siteConfig.hero.badge) {
      badge.textContent = siteConfig.hero.badge;
    }

    const coverage = document.getElementById('hero-coverage-label') || document.querySelector('.hero-coverage-row span:first-child');
    if (coverage && siteConfig.hero.coverageLabel) {
      coverage.textContent = siteConfig.hero.coverageLabel;
    }

    const headline = document.getElementById('hero-headline-text');
    if (headline && siteConfig.hero.headline) headline.textContent = siteConfig.hero.headline;

    const lead = document.getElementById('hero-lead-text');
    if (lead && siteConfig.hero.lead) lead.textContent = siteConfig.hero.lead;

    const gearName = document.getElementById('hero-gear-name');
    if (gearName && siteConfig.hero.featuredGearName) gearName.textContent = siteConfig.hero.featuredGearName;

    const gearSpec = document.getElementById('hero-gear-spec');
    if (gearSpec && siteConfig.hero.featuredGearSpec) gearSpec.textContent = siteConfig.hero.featuredGearSpec;
  }

  // 4-Step Rental Protocol
  if (siteConfig.protocol && siteConfig.protocol.length > 0) {
    const protoContainer = document.getElementById('protocol-cards-container') || document.querySelector('.process-grid');
    if (protoContainer) {
      protoContainer.innerHTML = siteConfig.protocol.map(step => `
        <div class="process-card">
          <div class="process-step-num">${escapeHtml(step.step || '01')}</div>
          <h3 class="process-title">${escapeHtml(step.title || '')}</h3>
          <p class="process-desc">${escapeHtml(step.desc || '')}</p>
        </div>
      `).join('');
    }
  }

  // Event Types Marquee Ribbon
  if (siteConfig.marquee && siteConfig.marquee.length > 0) {
    const marqueeTrack = document.getElementById('marquee-track-container') || document.querySelector('.marquee-track');
    if (marqueeTrack) {
      const itemsHtml = siteConfig.marquee.map(item => `
        <div class="marquee-item"><span>${escapeHtml(item)}</span><span class="marquee-dot"></span></div>
      `).join('');
      marqueeTrack.innerHTML = itemsHtml + itemsHtml;
    }
  }
}

function syncAbout() {
  if (siteConfig.about) {
    const missionH = document.getElementById('about-mission-headline');
    if (missionH && siteConfig.about.missionHeadline) {
      missionH.textContent = siteConfig.about.missionHeadline;
    }

    const missionS = document.getElementById('about-mission-story');
    if (missionS && siteConfig.about.missionStory) {
      const paragraphs = siteConfig.about.missionStory.split(/\n\n+/).filter(Boolean);
      missionS.innerHTML = paragraphs.map(p => `<p style="margin-bottom: 1.25rem; font-size: 1.05rem; line-height: 1.65;">${escapeHtml(p)}</p>`).join('');
    }

    const cmtList = document.getElementById('about-commitments-list');
    if (cmtList && siteConfig.about.commitments && siteConfig.about.commitments.length > 0) {
      cmtList.innerHTML = siteConfig.about.commitments.map(cmt => `
        <li>✓ <strong>${escapeHtml(cmt.title)}:</strong> ${escapeHtml(cmt.desc)}</li>
      `).join('');
    }
  }
}

function syncPackages() {
  const container = document.getElementById('packages-grid-container');
  if (!container || !siteConfig.packages || siteConfig.packages.length === 0) return;

  const phoneClean = (siteConfig.contact?.phoneClean || '919133133003').replace('+', '');

  const packagePhotos = [
    'images/ld-systems-column-array.jpg',
    'images/church-worship-av.jpg',
    'images/stage-concert-banner.jpg'
  ];

  container.innerHTML = siteConfig.packages.map((pkg, idx) => {
    const isFeatured = idx === 1;
    const photo = pkg.photo || packagePhotos[idx % packagePhotos.length];
    const waText = encodeURIComponent(`Hi Ramavath, I am interested in the ${pkg.name}`);
    const equipmentList = (pkg.includedEquipment || []).map(eq => `
      <li class="package-list-item">
        <svg class="package-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${escapeHtml(eq)}</span>
      </li>
    `).join('');

    return `
      <article class="package-card ${isFeatured ? 'featured' : ''}">
        <div class="package-card-media">
          <img src="${photo}" alt="${escapeHtml(pkg.name)}" loading="lazy" />
        </div>
        <div class="package-card-body">
          <div class="package-kicker" ${isFeatured ? 'style="color: var(--accent-hot);"' : ''}>${isFeatured ? 'POPULAR' : 'BUNDLE'} / 0${idx + 1}</div>
          <h2 class="package-title">${escapeHtml(pkg.name)}</h2>
          <div class="package-audience">Audience: ${escapeHtml(pkg.audienceGuideline || 'Custom Audience')}</div>
          <p class="package-desc">${escapeHtml(pkg.summary || '')}</p>
          <ul class="package-list">
            ${equipmentList}
          </ul>
          <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-top: 1.25rem;">
            <a href="/contact.html" class="btn-primary" style="width: 100%; text-align: center;">Request a Quote for ${escapeHtml(pkg.name)}</a>
            <a href="https://wa.me/${phoneClean}?text=${waText}" class="btn-whatsapp-card" style="width: 100%; justify-content: center; padding: 0.75rem; font-size: 0.88rem;" target="_blank" rel="noopener" aria-label="WhatsApp Ramavath about ${escapeHtml(pkg.name)}">
              <svg viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3"/></svg>
              <span>WhatsApp Ramavath for Quick Quote</span>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function syncEvents() {
  const container = document.getElementById('events-grid-container');
  const events = siteConfig.eventTypes || siteConfig.eventSolutions;
  if (!container || !events || events.length === 0) return;

  const eventBanners = [
    'images/wedding-stage-banner.jpg',
    'images/church-worship-av.jpg',
    'images/corporate-summit-banner.jpg',
    'images/stage-concert-banner.jpg',
    'images/band-backline-banner.jpg',
    'images/led-video-wall.jpg'
  ];

  container.innerHTML = events.map((evt, idx) => {
    const banner = evt.photo || evt.banner || eventBanners[idx % eventBanners.length];
    return `
      <article class="event-box">
        <div class="event-box-media">
          <img src="${banner}" alt="${escapeHtml(evt.title)}" loading="lazy" />
        </div>
        <div class="event-box-body">
          <div class="event-box-num">GENRE / 0${idx + 1}</div>
          <h3 class="event-box-title">${escapeHtml(evt.title)}</h3>
          <p class="event-box-tagline">${escapeHtml(evt.tagline || '')}</p>
          <div class="event-box-rider">
            <div class="event-box-rider-label">Typical Equipment Mix:</div>
            <div class="event-box-rider-text">${escapeHtml(evt.typicalSetup || '')}</div>
            <div style="margin-top: 1rem;">
              <a href="/contact.html" class="btn-primary" style="padding: 0.45rem 1rem; font-size: 0.82rem;">Quote for ${escapeHtml(evt.title)} →</a>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function syncServices() {
  const container = document.getElementById('services-list-container');
  if (!container || !siteConfig.services || siteConfig.services.length === 0) return;

  const servicePhotos = [
    'images/ld-systems-column-array.jpg',
    'images/alesis-drum-kit.jpg',
    'images/shure-wireless-rack.jpg',
    'images/camcorder-tripod.jpg',
    'images/lighting-rig.jpg',
    'images/led-screen.jpg',
    'images/flower-decoration.jpg',
    'images/marriage-events.jpg',
    'images/corporate-summit-banner.jpg',
    'images/av-engineer-banner.jpg'
  ];

  const serviceKickers = [
    'LIVE ACOUSTICS',
    'INSTRUMENTS & AMPS',
    'RF CLARITY',
    'VIDEO CAPTURE',
    'STAGE ATMOSPHERE',
    'HIGH-RES VISUALS',
    'FLORAL & STYLING',
    'WEDDING EXPERIENCES',
    'PROJECTION SYSTEMS',
    'LIVE CREW'
  ];

  container.innerHTML = siteConfig.services.map((srv, idx) => {
    const photo = srv.photo || servicePhotos[idx % servicePhotos.length];
    const kicker = srv.kicker || serviceKickers[idx] || 'PRODUCTION';
    const isReversed = idx % 2 !== 0;
    const num = (idx + 1).toString().padStart(2, '0');
    const highlights = (srv.equipmentHighlights || []).map(h => `<span>${escapeHtml(h)}</span>`).join('');

    return `
      <article class="hero-grid" style="align-items: center;">
        <div style="${isReversed ? 'order: 2;' : ''}">
          <div class="section-kicker"><span class="kicker-number">${num}</span><span>${escapeHtml(kicker)}</span></div>
          <h2 style="font-size: 2rem; margin-bottom: 1rem;">${escapeHtml(srv.title)}</h2>
          <p style="margin-bottom: 1.25rem;">${escapeHtml(srv.fullDesc || srv.shortDesc || '')}</p>
          <div class="bento-gear-tags" style="border: 0; padding: 0; margin-bottom: 1.75rem;">
            ${highlights}
          </div>
          <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
            <button type="button" class="btn-rider" data-add-to-quote data-id="${escapeHtml(srv.id)}" data-name="${escapeHtml(srv.title)}" data-category="${escapeHtml(kicker)}">+ Add to Quote</button>
            <a href="/contact.html" class="btn-primary" style="padding: 0.55rem 1.2rem; font-size: 0.9rem;">Request ${escapeHtml(srv.title)} Quote</a>
            <a href="/products.html" class="btn-secondary" style="padding: 0.55rem 1.2rem; font-size: 0.9rem;">Browse Fleet</a>
          </div>
        </div>
        <div style="${isReversed ? 'order: 1;' : ''} background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); overflow: hidden; padding: 1.5rem; text-align: center;">
          <img src="${photo}" alt="${escapeHtml(srv.title)}" style="border-radius: var(--radius-lg); aspect-ratio: 4/3; object-fit: cover; width: 100%;" loading="eager" decoding="async" onerror="this.onerror=null; this.src='images/wedding-stage-banner.jpg';" />
          <div style="margin-top: 1rem; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">
            ${escapeHtml(srv.title)} · Professional Hire & Staging Fleet
          </div>
        </div>
      </article>
      ${idx < siteConfig.services.length - 1 ? '<hr class="hairline-divider" />' : ''}
    `;
  }).join('');
}

function syncBrandAndContact() {
  if (siteConfig.contact) {
    if (siteConfig.contact.phone) {
      document.querySelectorAll('.contact-phone-display').forEach(el => {
        el.textContent = siteConfig.contact.phone;
      });
      document.querySelectorAll('.fab-circle-btn.fab-call').forEach(el => {
        el.href = `tel:${siteConfig.contact.phoneClean || siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`;
        el.setAttribute('aria-label', `Call ${siteConfig.contact.phone}`);
      });
    }
    if (siteConfig.contact.email) {
      document.querySelectorAll('.contact-email-display').forEach(el => {
        el.textContent = siteConfig.contact.email;
        if (el.tagName === 'A') el.href = `mailto:${siteConfig.contact.email}`;
      });
      document.querySelectorAll('.fab-circle-btn.fab-email').forEach(el => {
        el.href = `mailto:${siteConfig.contact.email}`;
        el.setAttribute('aria-label', `Email ${siteConfig.contact.email}`);
      });
    }
    if (siteConfig.contact.whatsappUrl) {
      document.querySelectorAll('.fab-circle-btn.fab-whatsapp:not([data-city-override])').forEach(el => {
        el.href = siteConfig.contact.whatsappUrl;
      });
    }
  }
}

/* ==========================================================================
   11. Scroll-to-Reveal & Slide-to-Reveal Engine
   ========================================================================== */
let revealObserver = null;

export function applyRevealClasses() {
  // 1. Two-Column Split Sections: Slide from Left & Right
  // Hero grids across pages (index, about, services, contact)
  document.querySelectorAll('.hero-grid').forEach(grid => {
    const children = Array.from(grid.children).filter(el => el.offsetParent !== null || el.tagName !== 'SCRIPT');
    if (children.length >= 2) {
      if (!children[0].classList.contains('reveal-slide-left') && !children[0].classList.contains('reveal-up') && !children[0].classList.contains('reveal')) {
        children[0].classList.add('reveal-slide-left');
      }
      if (!children[1].classList.contains('reveal-slide-right') && !children[1].classList.contains('reveal-up') && !children[1].classList.contains('reveal')) {
        children[1].classList.add('reveal-slide-right');
      }
    }
  });

  // Split showcase in capabilities on Home
  const capContainer = document.getElementById('capabilities-showcase-container');
  if (capContainer && capContainer.children.length >= 2) {
    if (!capContainer.children[0].classList.contains('reveal-slide-left')) {
      capContainer.children[0].classList.add('reveal-slide-left');
    }
    if (!capContainer.children[1].classList.contains('reveal-slide-right')) {
      capContainer.children[1].classList.add('reveal-slide-right');
    }
  }

  // 2. Process / Protocol steps (alternating and staggered slide)
  const processCards = document.querySelectorAll('.process-grid .process-card');
  processCards.forEach((card, idx) => {
    if (!card.classList.contains('reveal') && !card.classList.contains('reveal-up') && !card.classList.contains('reveal-slide-left') && !card.classList.contains('reveal-slide-right')) {
      if (idx === 0) {
        card.classList.add('reveal-slide-left');
      } else if (idx === processCards.length - 1) {
        card.classList.add('reveal-slide-right');
      } else {
        card.classList.add('reveal-up');
        card.style.setProperty('--reveal-delay', `${idx * 160}ms`);
      }
    }
  });

  // 3. Section Headers, Subtitles & Kickers (Slide up smoothly)
  document.querySelectorAll('.section-header, .page-header-body, .section-kicker, .hero-lead, .section-title, .section-subtitle').forEach(el => {
    if (!el.classList.contains('reveal') &&
        !el.classList.contains('reveal-up') &&
        !el.classList.contains('reveal-slide-left') &&
        !el.classList.contains('reveal-slide-right') &&
        !el.closest('.reveal-slide-left') &&
        !el.closest('.reveal-slide-right')) {
      el.classList.add('reveal-up');
    }
  });

  // 4. Cards in Grids (Equipment, Packages, Services, Events, Galleries, Cities, FAQs)
  const gridItemSelectors = [
    '.gear-card',
    '.package-card',
    '.event-box',
    '.city-card',
    '.gallery-card',
    '.gallery-item',
    '.faq-item',
    '.service-card',
    '.bento-card'
  ];

  gridItemSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((card, idx) => {
      if (!card.classList.contains('reveal') &&
          !card.classList.contains('reveal-up') &&
          !card.classList.contains('reveal-slide-left') &&
          !card.classList.contains('reveal-slide-right') &&
          !card.classList.contains('reveal-zoom')) {
        card.classList.add('reveal-up');
        card.style.setProperty('--reveal-delay', `${(idx % 4) * 140}ms`);
      }
    });
  });

  // 5. Featured Zoom Cards / Marquee / Closing Call-to-Action
  document.querySelectorAll('.marquee-band, .package-card.featured, .banner-cta, .cta-panel').forEach(el => {
    if (!el.classList.contains('reveal-zoom') && !el.classList.contains('reveal-up') && !el.classList.contains('reveal-slide-left')) {
      el.classList.add('reveal-zoom');
    }
  });
}

export function observeRevealElements() {
  applyRevealClasses();

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll(
    '.reveal, .reveal-up, .reveal-slide-left, .reveal-left, .reveal-slide-right, .reveal-right, .reveal-zoom, [data-reveal]'
  );

  if (prefersReducedMotion) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });
  }

  const windowHeight = window.innerHeight;

  elements.forEach((el, i) => {
    if (el.classList.contains('is-revealed')) return;

    const rect = el.getBoundingClientRect();
    // If element is already in initial view, reveal with staggered sequence
    if (rect.top < windowHeight * 0.92 && rect.bottom > 0) {
      setTimeout(() => {
        el.classList.add('is-revealed');
      }, Math.min(i * 100, 600));
    } else {
      revealObserver.observe(el);
    }
  });
}

export function initScrollReveal() {
  observeRevealElements();

  // Safety fallback: ensure all elements above fold are revealed even if observer is delayed
  setTimeout(() => {
    document.querySelectorAll(
      '.reveal, .reveal-up, .reveal-slide-left, .reveal-left, .reveal-slide-right, .reveal-right, .reveal-zoom, [data-reveal]'
    ).forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('is-revealed');
      }
    });
  }, 1200);
}

function deepMerge(target, source) {
  if (!source || typeof source !== 'object') return target;
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key] || typeof target[key] !== 'object' || Array.isArray(target[key])) {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

export function refreshAllDynamicContent() {
  try {
    let override = localStorage.getItem('nr_site_data_override') || localStorage.getItem('nr_site_config_override');
    if (override) {
      if (override.includes('/assets/photos/') || override.includes('/assets/banners/')) {
        override = override.replace(/\/assets\/photos\//g, 'images/').replace(/\/assets\/banners\//g, 'images/');
        localStorage.setItem('nr_site_data_override', override);
        localStorage.setItem('nr_site_config_override', override);
      }
      const parsed = JSON.parse(override);
      deepMerge(siteConfig, parsed);
    }
  } catch (e) {}

  syncCatalogue();
  syncHomeFeaturedGear();
  syncHeroAndProtocol();
  syncPackages();
  syncEvents();
  syncServices();
  syncAbout();
  syncBrandAndContact();
  initAccordions();
  initCatalogueFilters();
  updateQuoteUI();
  observeRevealElements();
}

window.addEventListener('nr-config-updated', () => {
  refreshAllDynamicContent();
});

window.addEventListener('storage', (e) => {
  if (e.key === 'nr_site_data_override' || e.key === 'nr_site_config_override') {
    refreshAllDynamicContent();
  }
});

/* ==========================================================================
   12. Floating Scroll-to-Top Button
   ========================================================================== */
export function initScrollToTop() {
  let btn = document.getElementById('scroll-to-top-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'scroll-to-top-btn';
    btn.className = 'fab-scroll-top';
    btn.setAttribute('aria-label', 'Scroll to top of page');
    btn.setAttribute('title', 'Scroll to top');
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    `;
    document.body.appendChild(btn);
  }

  const handleScroll = () => {
    if (window.scrollY > 300) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   13. Global Floating Contact Speed Dial (WhatsApp, Call, Email - Icons Only)
   ========================================================================== */
export function initFloatingContactWidget() {
  // If legacy floating-actions-bar exists, remove or replace it
  const oldBars = document.querySelectorAll('.floating-actions-bar');
  oldBars.forEach(oldBar => {
    if (!document.getElementById('floating-contact-widget')) {
      const widget = createContactWidgetElement();
      oldBar.replaceWith(widget);
    } else {
      oldBar.remove();
    }
  });

  let widget = document.getElementById('floating-contact-widget');
  if (!widget) {
    widget = createContactWidgetElement();
    document.body.appendChild(widget);
  }

  const trigger = document.getElementById('fab-main-trigger');
  if (!trigger || trigger.dataset.initialized === 'true') return;
  trigger.dataset.initialized = 'true';

  const toggleWidget = (forceState) => {
    const isCurrentlyOpen = widget.classList.contains('is-open');
    const targetState = typeof forceState === 'boolean' ? forceState : !isCurrentlyOpen;

    if (targetState) {
      widget.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.setAttribute('title', 'Close contact options');
    } else {
      widget.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('title', 'Contact options');
    }
  };

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleWidget();
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (widget.classList.contains('is-open') && !widget.contains(e.target)) {
      toggleWidget(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && widget.classList.contains('is-open')) {
      toggleWidget(false);
      trigger.focus();
    }
  });

  // Close when any child action button is tapped
  const items = widget.querySelectorAll('.fab-circle-btn');
  items.forEach((item) => {
    item.addEventListener('click', () => {
      setTimeout(() => toggleWidget(false), 200);
    });
  });
}

function createContactWidgetElement() {
  const widget = document.createElement('div');
  widget.className = 'floating-contact-widget';
  widget.id = 'floating-contact-widget';
  widget.setAttribute('aria-label', 'Quick contact menu');

  const phone = siteConfig?.contact?.phoneClean || '+919133133003';
  const whatsappUrl = siteConfig?.contact?.whatsappUrl || 'https://wa.me/919133133003';
  const email = siteConfig?.contact?.email || 'ramavathn813@gmail.com';

  widget.innerHTML = `
    <div class="fab-speed-dial-group" id="fab-speed-dial-group" role="menu" aria-label="Quick contact options">
      <a href="mailto:${email}" class="fab-circle-btn fab-email" role="menuitem" aria-label="Email ${email}" title="Email" data-tooltip="Email">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </a>
      <a href="tel:${phone}" class="fab-circle-btn fab-call" role="menuitem" aria-label="Call ${phone}" title="Call" data-tooltip="Call">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </a>
      <a href="${whatsappUrl}" class="fab-circle-btn fab-whatsapp" role="menuitem" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp NR Audio Visual" title="WhatsApp" data-tooltip="WhatsApp">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3"/>
        </svg>
      </a>
    </div>
    <button type="button" class="fab-main-trigger" id="fab-main-trigger" aria-haspopup="true" aria-expanded="false" aria-controls="fab-speed-dial-group" aria-label="Toggle contact options" title="Quick contact">
      <span class="fab-trigger-icon fab-icon-open" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      </span>
      <span class="fab-trigger-icon fab-icon-close" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </span>
    </button>
  `;
  return widget;
}

/* ==========================================================================
   DOM Ready Bootstrapper
   ========================================================================== */
function bootApp() {
  initTheme();
  initQuoteDrawer();
  initMobileNav();
  initAccordions();
  initLightbox();
  initQuoteForm();
  initCatalogueFilters();
  initFaderMotion();
  initImaginaryBackgroundArt();
  initCapabilitiesShowcase();

  // Run dynamic data sync from siteConfig
  refreshAllDynamicContent();

  // Initialize scroll-to-reveal and slide-to-reveal engine
  initScrollReveal();

  // Initialize floating scroll to top button
  initScrollToTop();

  // Initialize global floating contact speed dial
  initFloatingContactWidget();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}
