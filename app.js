/**
 * SCIS Email Signature Generator Application Logic
 * Primary Brand Color: #13284B
 * Official Signature Gray: #808285 (SCIS Brand Identity Guidelines Ver. 1.1)
 */

(function () {
  'use strict';

  // Campus Presets Definition
  const CAMPUS_DATA = {
    hongqiao_main: {
      label: 'Hongqiao Campus',
      address: '1161 Hongqiao Road, Changning, Shanghai, China 200051',
      phone: '86-21-6261-4338'
    },
    hongqiao_ece: {
      label: 'Hongqiao ECE Campus',
      address: '2212 Hongqiao Road, Changning, Shanghai, China 200336',
      phone: '86-21-6295-1222'
    },
    pudong: {
      label: 'Pudong Campus',
      address: '198 Hengqiao Road, Zhoupu, Pudong, Shanghai, China 201315',
      phone: '86-21-5812-9888'
    }
  };

  // Official Signature Gray Color Code as specified in SCIS Brand Identity Guidelines Ver. 1.1
  const COLOR_GRAY = '#808285';
  const COLOR_BLACK = '#000000';
  const COLOR_BLUE = '#0066cc';
  const DEFAULT_DOMAIN = 'scis-china.org';

  // SCIS 30th Anniversary Logo Settings (Expires end of June 30, 2027)
  const ANNIVERSARY_LOGO_URL = 'https://www.scis.edu.cn/public/SCIS-logo-30-anniversary-240-60.png';
  const ANNIVERSARY_EXPIRY_DATE = new Date('2027-07-01T00:00:00+08:00'); // Valid through June 30, 2027

  function isAnniversaryActive() {
    return new Date() < ANNIVERSARY_EXPIRY_DATE;
  }

  // DOM Elements
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const jobTitleInput = document.getElementById('jobTitle');
  const emailInput = document.getElementById('email');
  const extensionInput = document.getElementById('extension');
  const campusSelect = document.getElementById('campus');
  
  const presetAddressEl = document.getElementById('presetAddress');
  const presetPhoneEl = document.getElementById('presetPhone');
  const previewBox = document.getElementById('previewBox');
  
  const copyRichBtn = document.getElementById('copyRichBtn');
  const copyHtmlBtn = document.getElementById('copyHtmlBtn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  // Initialize event listeners
  function init() {
    [firstNameInput, lastNameInput, jobTitleInput, emailInput, extensionInput].forEach(input => {
      input.addEventListener('input', updateSignature);
    });

    // Auto-complete email on blur if user entered username only
    emailInput.addEventListener('blur', () => {
      const formatted = getFormattedEmail(emailInput.value);
      if (formatted !== emailInput.value) {
        emailInput.value = formatted;
        updateSignature();
      }
    });

    campusSelect.addEventListener('change', () => {
      updateCampusInfo();
      updateSignature();
    });

    copyRichBtn.addEventListener('click', copyRichSignature);
    copyHtmlBtn.addEventListener('click', copyHtmlCode);

    initTabs();
    updateCampusInfo();
    updateSignature();
  }

  // Update Campus Info card text
  function updateCampusInfo() {
    const campusKey = campusSelect.value;
    const campus = CAMPUS_DATA[campusKey] || CAMPUS_DATA.hongqiao_main;
    
    presetAddressEl.textContent = campus.address;
    // Display phone number without extra "Phone: " prefix (info-label already renders "Phone:")
    presetPhoneEl.textContent = campus.phone;
  }

  // Format Extension string
  function getFormattedPhone(basePhone, ext) {
    if (!ext || !ext.trim()) {
      return `Phone: ${basePhone}`;
    }
    const cleanExt = ext.trim().replace(/^ext\.?\s*/i, '');
    return `Phone: ${basePhone} ext. ${cleanExt}`;
  }

  // Smart Email Formatter (Auto-completes @scis-china.org domain)
  function getFormattedEmail(rawInput) {
    if (!rawInput || !rawInput.trim()) {
      return `llin@${DEFAULT_DOMAIN}`;
    }
    let trimmed = rawInput.trim();
    if (!trimmed.includes('@')) {
      return `${trimmed}@${DEFAULT_DOMAIN}`;
    }
    const parts = trimmed.split('@');
    const username = parts[0];
    const domain = parts[1];
    
    if (!domain || domain.toLowerCase() !== DEFAULT_DOMAIN) {
      return `${username}@${DEFAULT_DOMAIN}`;
    }
    return trimmed;
  }

  // Generate full HTML Signature string
  function generateSignatureHTML() {
    const firstName = firstNameInput.value.trim() || 'Li';
    const lastName = lastNameInput.value.trim();
    const fullName = lastName ? `${firstName} ${lastName}` : firstName;
    
    const jobTitle = jobTitleInput.value.trim() || 'Math Teacher';
    const email = getFormattedEmail(emailInput.value);
    const ext = extensionInput.value.trim();
    
    const campusKey = campusSelect.value;
    const campus = CAMPUS_DATA[campusKey] || CAMPUS_DATA.hongqiao_main;
    
    const phoneStr = getFormattedPhone(campus.phone, ext);

    // Font stack: Gill Sans (SCIS Brand Identity Guidelines Ver. 1.1)
    const fontStack = "'Gill Sans', 'Gill Sans MT', Calibri, sans-serif";

    // 30th Anniversary Logo block (Active through June 30, 2027)
    let logoHtml = '';
    if (isAnniversaryActive()) {
      logoHtml = `<div style="margin-top: 10px; line-height: 1;">` +
        `<a href="https://www.scis-china.org" target="_blank" style="text-decoration: none; border: 0;">` +
        `<img src="${ANNIVERSARY_LOGO_URL}" alt="SCIS 30th Anniversary" width="240" height="60" style="display: block; border: 0; width: 240px; height: 60px; outline: none; text-decoration: none;" />` +
        `</a>` +
        `</div>`;
    }

    return `<div style="font-family: ${fontStack}; line-height: 1.35; margin: 0; padding: 0;">` +
      `<div style="font-family: ${fontStack}; font-size: 10.5pt; font-weight: bold; color: ${COLOR_BLACK}; margin-bottom: 2px;">${escapeHtml(fullName)}</div>` +
      `<div style="font-family: ${fontStack}; font-size: 10pt; font-weight: normal; color: ${COLOR_GRAY}; margin-bottom: 2px;">${escapeHtml(jobTitle)}</div>` +
      `<div style="font-family: ${fontStack}; font-size: 10pt; font-weight: bold; color: ${COLOR_BLACK}; margin-bottom: 2px;">Shanghai Community International School</div>` +
      `<div style="font-family: ${fontStack}; font-size: 10pt; font-weight: normal; color: ${COLOR_GRAY}; margin-bottom: 2px;">${escapeHtml(campus.address)}</div>` +
      `<div style="font-family: ${fontStack}; font-size: 10pt; font-weight: normal; color: ${COLOR_GRAY}; margin-bottom: 2px;">${phoneStr}</div>` +
      `<div style="font-family: ${fontStack}; font-size: 10pt; font-weight: normal; color: ${COLOR_GRAY};">Email: <a href="mailto:${escapeHtml(email)}" style="color: ${COLOR_BLUE}; text-decoration: underline;">${escapeHtml(email)}</a> Website: <a href="https://www.scis-china.org" target="_blank" style="color: ${COLOR_BLUE}; text-decoration: underline;">www.scis-china.org</a></div>` +
      logoHtml +
      `</div>`;
  }

  // Plain text fallback signature
  function generateSignaturePlainText() {
    const firstName = firstNameInput.value.trim() || 'Li';
    const lastName = lastNameInput.value.trim();
    const fullName = lastName ? `${firstName} ${lastName}` : firstName;
    
    const jobTitle = jobTitleInput.value.trim() || 'Math Teacher';
    const email = getFormattedEmail(emailInput.value);
    const ext = extensionInput.value.trim();
    
    const campusKey = campusSelect.value;
    const campus = CAMPUS_DATA[campusKey] || CAMPUS_DATA.hongqiao_main;
    const phoneStr = getFormattedPhone(campus.phone, ext);

    return `${fullName}\n` +
      `${jobTitle}\n` +
      `Shanghai Community International School\n` +
      `${campus.address}\n` +
      `${phoneStr}\n` +
      `Email: ${email} Website: www.scis-china.org`;
  }

  // Update Live Preview box
  function updateSignature() {
    previewBox.innerHTML = generateSignatureHTML();
  }

  // Helper to safely track Umami custom events
  function trackEvent(eventName, eventData) {
    if (window.umami && typeof window.umami.track === 'function') {
      try {
        window.umami.track(eventName, eventData);
      } catch (e) {
        console.warn('Umami event tracking error:', e);
      }
    }
  }

  // Copy Signature to Clipboard as Rich Text
  async function copyRichSignature() {
    const htmlString = generateSignatureHTML();
    const plainTextString = generateSignaturePlainText();
    trackEvent('copy-signature-rich', { campus: campusSelect.value });

    // 1. Try Clipboard API with ClipboardItem
    if (navigator.clipboard && window.ClipboardItem) {
      try {
        const htmlBlob = new Blob([htmlString], { type: 'text/html' });
        const textBlob = new Blob([plainTextString], { type: 'text/plain' });
        const item = new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob
        });
        await navigator.clipboard.write([item]);
        showToast('Signature copied! Ready to paste into Outlook.');
        return;
      } catch (err) {
        console.warn('ClipboardItem failed, falling back to selection copy:', err);
      }
    }

    // 2. Fallback: DOM Range Selection Copy
    try {
      const range = document.createRange();
      range.selectNodeContents(previewBox);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      
      const successful = document.execCommand('copy');
      selection.removeAllRanges();
      
      if (successful) {
        showToast('Signature copied! Ready to paste into Outlook.');
      } else {
        throw new Error('execCommand failed');
      }
    } catch (err) {
      console.error('Copy failed:', err);
      showToast('Copy failed. Please manually select and copy the signature.');
    }
  }

  // Copy Raw HTML Code to Clipboard
  async function copyHtmlCode() {
    const htmlString = generateSignatureHTML();
    trackEvent('copy-signature-html', { campus: campusSelect.value });

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(htmlString);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = htmlString;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast('Raw HTML code copied to clipboard!');
    } catch (err) {
      console.error('HTML Copy failed:', err);
      showToast('Failed to copy HTML code.');
    }
  }

  // Show Toast Message
  let toastTimer = null;
  function showToast(msg) {
    toastMsg.textContent = msg;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // Tab switching logic for Outlook instructions
  function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const activePane = document.getElementById(targetTab);
        if (activePane) activePane.classList.add('active');
      });
    });
  }

  // Helper HTML Escaper
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
