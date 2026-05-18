(function () {
  'use strict';

  // ─── UTILITIES ───────────────────────────────────────────────────────────────

  function inputStyle(bg) {
    return 'background:' + (bg || '#fff') + ';border:1px solid #E9E4DF;border-radius:12px;' +
      'padding:12px 16px;font-family:Inter,sans-serif;font-size:14px;color:#14375A;' +
      'width:100%;box-sizing:border-box;outline:none;';
  }

  function chatInputStyle() {
    return 'background:#F1F2F4;border:none;border-radius:10px;padding:10px 14px;' +
      'font-family:Inter,sans-serif;font-size:13px;color:#14375A;' +
      'width:100%;box-sizing:border-box;outline:none;';
  }

  function inp(id, type, placeholder, required) {
    return '<input id="' + id + '" type="' + type + '" placeholder="' + placeholder + '"' +
      (required ? ' required' : '') + ' style="' + inputStyle() + '"/>';
  }

  function formatDate(dateStr) {
    var d = new Date(dateStr + 'T12:00:00Z');
    return d.getUTCDate() + '.' + (d.getUTCMonth() + 1) + '.' + d.getUTCFullYear();
  }

  function postJSON(url, data, onSuccess, onError) {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(function (r) {
      if (r.ok) { onSuccess(); } else { onError(); }
    }).catch(onError);
  }

  function showMsg(el, msg, color) {
    el.innerHTML = '<p style="font-family:Inter,sans-serif;font-size:14px;color:' + color + ';margin-top:12px;text-align:center">' + msg + '</p>';
  }

  // ─── FORM WIRING (index.html + yhteys.html) ──────────────────────────────────

  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      data.source = location.pathname;
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Lähetetään...'; }
      var msgEl = document.createElement('div');
      form.appendChild(msgEl);
      postJSON('/api/form', data,
        function () {
          form.innerHTML = '<p style="font-family:Sora,sans-serif;font-weight:700;font-size:16px;color:#14375A;text-align:center;padding:24px">Viesti lähetetty!<br/><span style="font-family:Inter,sans-serif;font-weight:400;font-size:14px;opacity:0.7">Palataan teille 24 tunnissa.</span></p>';
        },
        function () {
          if (btn) { btn.disabled = false; btn.textContent = btn.getAttribute('data-label') || 'Lähetä'; }
          showMsg(msgEl, 'Virhe. Yritä uudelleen tai soita: +358 22 331718', '#e74c3c');
        }
      );
    });
    var btn = form.querySelector('button[type="submit"]');
    if (btn) btn.setAttribute('data-label', btn.textContent);
  });

  // ─── YRITYKSILLE FORM WIRING ──────────────────────────────────────────────────

  var yritysForm = document.getElementById('melers-yritys-form');
  if (yritysForm) {
    var yBtn = yritysForm.querySelector('button[type="submit"]');
    if (yBtn) {
      var yMsg = document.createElement('div');
      yritysForm.appendChild(yMsg);
      yBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var data = { source: 'yrityksille' };
        yritysForm.querySelectorAll('input, textarea').forEach(function (el) {
          if (el.name) data[el.name] = el.value;
        });
        yBtn.disabled = true; yBtn.textContent = 'Lähetetään...';
        postJSON('/api/form', data,
          function () {
            yritysForm.innerHTML = '<p style="font-family:Sora,sans-serif;font-weight:700;font-size:16px;color:#14375A;text-align:center;padding:24px">Tarjouspyyntö lähetetty!<br/><span style="font-family:Inter,sans-serif;font-weight:400;font-size:14px;opacity:0.7">Palataan teille 24 tunnissa.</span></p>';
          },
          function () {
            yBtn.disabled = false; yBtn.textContent = 'Lähetä tarjouspyyntö →';
            showMsg(yMsg, 'Virhe. Soita: +358 22 331718', '#e74c3c');
          }
        );
      });
    }
  }

  // ─── DRIVER BOOKING MODAL ────────────────────────────────────────────────────
  //
  // Rendered as a fixed overlay appended to document.body — fully outside the
  // Next.js React root, so React hydration cannot touch it.
  //
  // Opened by:
  //   1. Any "Tilaa kuljetus" link click (intercepts href=/yhteys links with that text)
  //   2. Automatically on /yhteys page load

  var bookingOverlay = document.createElement('div');
  bookingOverlay.id = 'melers-booking-overlay';
  bookingOverlay.style.cssText = 'position:fixed;inset:0;background:rgba(20,55,90,0.6);z-index:10000;display:none;overflow-y:auto;-webkit-overflow-scrolling:touch';
  bookingOverlay.innerHTML =
    '<div style="min-height:100%;display:flex;align-items:flex-start;justify-content:center;padding:24px 16px">' +
      '<div style="background:#fff;border-radius:24px;width:100%;max-width:680px;padding:40px 36px;position:relative;margin:auto">' +
        '<button id="bk-close" aria-label="Sulje" style="position:absolute;top:16px;right:16px;background:none;border:none;font-size:22px;cursor:pointer;color:#14375A;line-height:1;padding:4px 8px">&#x2715;</button>' +
        '<p style="font-family:Sora,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#FF8F7A;text-transform:uppercase;margin:0 0 10px">Tilaa kuljetus</p>' +
        '<h2 style="font-family:Merriweather,serif;font-weight:400;font-size:32px;color:#14375A;margin:0 0 8px">Varaa nouto</h2>' +
        '<p style="font-family:Inter,sans-serif;color:#14375A;opacity:0.65;margin:0 0 28px;font-size:15px">Nouto tiistaisin tai perjantaisin klo 9\u201315. Valitse sinulle sopiva p\u00e4iv\u00e4.</p>' +
        '<div id="melers-slots" style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px"><p style="font-family:Inter,sans-serif;color:#999;font-size:14px">Ladataan...</p></div>' +
        '<div id="melers-booking-form"></div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(bookingOverlay);

  var slotsLoaded = false;

  function openBookingModal() {
    bookingOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    if (!slotsLoaded) {
      slotsLoaded = true;
      fetch('/api/booking/slots').then(function (r) { return r.json(); }).then(function (data) {
        var container = document.getElementById('melers-slots');
        if (!container) return;
        container.innerHTML = '';
        data.slots.forEach(function (slot) {
          var card = document.createElement('button');
          card.setAttribute('data-date', slot.date);
          card.style.cssText = 'border:2px solid #E9E4DF;border-radius:14px;padding:14px 22px;background:#fff;cursor:pointer;font-family:Sora,sans-serif;text-align:left;min-width:130px;transition:border-color 0.2s,background 0.2s';
          card.innerHTML =
            '<div style="font-weight:700;color:#14375A;font-size:14px">' + slot.fi + '</div>' +
            '<div style="color:#14375A;opacity:0.7;font-size:13px;margin-top:3px">' + formatDate(slot.date) + '</div>';
          card.addEventListener('mouseenter', function () { if (!this.classList.contains('sel')) this.style.borderColor = '#FF8F7A'; });
          card.addEventListener('mouseleave', function () { if (!this.classList.contains('sel')) this.style.borderColor = '#E9E4DF'; });
          card.addEventListener('click', function () {
            document.querySelectorAll('#melers-slots button').forEach(function (b) {
              b.classList.remove('sel'); b.style.borderColor = '#E9E4DF'; b.style.background = '#fff';
            });
            this.classList.add('sel');
            this.style.borderColor = '#FF8F7A';
            this.style.background = '#FFF5F3';
            showBookingForm(slot);
          });
          container.appendChild(card);
        });
      }).catch(function () {
        var c = document.getElementById('melers-slots');
        if (c) c.innerHTML = '<p style="font-family:Inter,sans-serif;color:#e74c3c;font-size:14px">Ei saatavilla. Soita: +358 22 331718</p>';
      });
    }
  }

  function closeBookingModal() {
    bookingOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  document.getElementById('bk-close').addEventListener('click', closeBookingModal);

  // Close on backdrop click (not on panel click)
  bookingOverlay.addEventListener('click', function (e) {
    if (e.target === bookingOverlay || e.target === bookingOverlay.firstElementChild) {
      closeBookingModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeBookingModal();
  });

  function showBookingForm(slot) {
    var container = document.getElementById('melers-booking-form');
    if (!container) return;
    container.innerHTML =
      '<div style="background:#F1F2F4;border-radius:20px;padding:28px;max-width:520px">' +
        '<h3 style="font-family:Sora,sans-serif;font-weight:700;color:#14375A;margin:0 0 18px;font-size:15px">Varaa ' + slot.fi + ' ' + formatDate(slot.date) + '</h3>' +
        '<div style="display:flex;flex-direction:column;gap:12px">' +
          inp('bk-nimi', 'text', 'Nimi *', true) +
          inp('bk-osoite', 'text', 'Noutoosoite *', true) +
          inp('bk-puhelin', 'tel', 'Puhelin') +
          inp('bk-email', 'email', 'S\u00e4hk\u00f6posti') +
          '<textarea id="bk-notes" rows="3" placeholder="Lis\u00e4tiedot (valinnainen)" style="' + inputStyle() + 'resize:none"></textarea>' +
          '<button id="bk-submit" style="background:#FF8F7A;color:#fff;font-family:Sora,sans-serif;font-weight:700;font-size:14px;padding:14px 24px;border:none;border-radius:999px;cursor:pointer">Vahvista varaus \u2192</button>' +
        '</div>' +
        '<div id="bk-msg"></div>' +
      '</div>';

    document.getElementById('bk-submit').addEventListener('click', function () {
      var nimi = document.getElementById('bk-nimi').value.trim();
      var osoite = document.getElementById('bk-osoite').value.trim();
      if (!nimi || !osoite) {
        showMsg(document.getElementById('bk-msg'), 'T\u00e4yt\u00e4 pakolliset kent\u00e4t (*).', '#e74c3c');
        return;
      }
      this.disabled = true; this.textContent = 'L\u00e4hetet\u00e4\u00e4n...';
      var btn = this;
      postJSON('/api/booking/reserve', {
        slot_date: slot.date, nimi: nimi, osoite: osoite,
        puhelin: document.getElementById('bk-puhelin').value,
        email: document.getElementById('bk-email').value,
        lisatiedot: document.getElementById('bk-notes').value,
      },
        function () {
          container.innerHTML =
            '<div style="background:#14375A;color:#fff;border-radius:20px;padding:32px;text-align:center">' +
              '<p style="font-family:Sora,sans-serif;font-weight:700;font-size:20px;margin-bottom:8px">Varaus vahvistettu!</p>' +
              '<p style="font-family:Inter,sans-serif;font-size:15px;opacity:0.8">Nouto ' + slot.fi.toLowerCase() + 'na ' + formatDate(slot.date) + ' klo 9\u201315.<br/>Vahvistus l\u00e4hetetty s\u00e4hk\u00f6postiisi.</p>' +
              '<button id="bk-done" style="margin-top:20px;background:#FF8F7A;color:#fff;font-family:Sora,sans-serif;font-weight:700;font-size:14px;padding:12px 24px;border:none;border-radius:999px;cursor:pointer">Sulje</button>' +
            '</div>';
          document.getElementById('bk-done').addEventListener('click', closeBookingModal);
        },
        function () {
          btn.disabled = false; btn.textContent = 'Vahvista varaus \u2192';
          showMsg(document.getElementById('bk-msg'), 'Virhe. Soita: +358 22 331718', '#e74c3c');
        }
      );
    });
  }

  // Intercept all "Tilaa kuljetus" link clicks across all pages
  document.querySelectorAll('a').forEach(function (a) {
    if (/tilaa kuljetus/i.test(a.textContent) || /varaa kuljetus/i.test(a.textContent)) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        openBookingModal();
      });
    }
  });

  // Auto-open on /yhteys (primary landing page for "Tilaa kuljetus" CTAs)
  if (location.pathname === '/yhteys' || location.pathname === '/yhteys/') {
    openBookingModal();
  }

  // ─── CHAT WIDGET ─────────────────────────────────────────────────────────────

  var chatBtn = document.createElement('button');
  chatBtn.setAttribute('aria-label', 'Avaa chat');
  chatBtn.style.cssText = 'position:fixed;bottom:24px;right:24px;width:56px;height:56px;background:#FF8F7A;border:none;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:22px;box-shadow:0 4px 16px rgba(0,0,0,0.2);z-index:9998;transition:transform 0.15s';
  chatBtn.textContent = '\uD83D\uDCAC';
  chatBtn.addEventListener('mouseenter', function () { this.style.transform = 'scale(1.1)'; });
  chatBtn.addEventListener('mouseleave', function () { this.style.transform = 'scale(1)'; });
  document.body.appendChild(chatBtn);

  var chatPanel = document.createElement('div');
  chatPanel.style.cssText = 'position:fixed;bottom:96px;right:24px;width:300px;background:#fff;border-radius:20px;box-shadow:0 8px 32px rgba(0,0,0,0.15);padding:24px;z-index:9999;display:none;';
  chatPanel.innerHTML =
    '<p style="font-family:Sora,sans-serif;font-weight:700;color:#14375A;margin:0 0 4px">L\u00e4het\u00e4 viesti</p>' +
    '<p style="font-family:Inter,sans-serif;font-size:13px;color:#14375A;opacity:0.6;margin:0 0 16px">Vastaamme 1 arkip\u00e4iv\u00e4ss\u00e4.</p>' +
    '<div style="display:flex;flex-direction:column;gap:10px">' +
      '<input id="chat-nimi" type="text" placeholder="Nimi" style="' + chatInputStyle() + '"/>' +
      '<input id="chat-email" type="email" placeholder="S\u00e4hk\u00f6posti" style="' + chatInputStyle() + '"/>' +
      '<textarea id="chat-viesti" rows="3" placeholder="Kirjoita viesti..." style="' + chatInputStyle() + 'resize:none"></textarea>' +
      '<button id="chat-send" style="background:#FF8F7A;color:#fff;font-family:Sora,sans-serif;font-weight:700;font-size:13px;padding:12px;border:none;border-radius:999px;cursor:pointer">L\u00e4het\u00e4 \u2192</button>' +
    '</div>' +
    '<div id="chat-msg"></div>';
  document.body.appendChild(chatPanel);

  chatBtn.addEventListener('click', function () {
    chatPanel.style.display = chatPanel.style.display === 'none' ? 'block' : 'none';
  });

  document.getElementById('chat-send').addEventListener('click', function () {
    var viesti = document.getElementById('chat-viesti').value.trim();
    if (!viesti) { showMsg(document.getElementById('chat-msg'), 'Kirjoita viesti.', '#e74c3c'); return; }
    this.disabled = true; this.textContent = 'L\u00e4hetet\u00e4\u00e4n...';
    var btn = this;
    postJSON('/api/chat', {
      nimi: document.getElementById('chat-nimi').value,
      email: document.getElementById('chat-email').value,
      viesti: viesti,
      source: location.pathname,
    },
      function () {
        chatPanel.innerHTML =
          '<p style="font-family:Sora,sans-serif;font-weight:700;color:#14375A;margin-bottom:8px">Viesti l\u00e4hetetty!</p>' +
          '<p style="font-family:Inter,sans-serif;font-size:13px;color:#14375A;opacity:0.7">Palataan teille pian. \uD83D\uDC4B</p>';
      },
      function () {
        btn.disabled = false; btn.textContent = 'L\u00e4het\u00e4 \u2192';
        showMsg(document.getElementById('chat-msg'), 'Virhe. Soita: +358 22 331718', '#e74c3c');
      }
    );
  });

})();
