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

  // ─── DRIVER BOOKING CALENDAR ─────────────────────────────────────────────────

  var bookingRoot = document.getElementById('melers-driver-booking');
  if (bookingRoot) {
    bookingRoot.innerHTML =
      '<div style="padding:60px 24px;background:#fff">' +
        '<div style="max-width:900px;margin:0 auto">' +
          '<p style="font-family:Sora,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#FF8F7A;text-transform:uppercase;margin-bottom:12px">Tilaa kuljetus</p>' +
          '<h2 style="font-family:Merriweather,serif;font-weight:400;font-size:36px;color:#14375A;margin:0 0 8px">Varaa nouto</h2>' +
          '<p style="font-family:Inter,sans-serif;color:#14375A;opacity:0.65;margin-bottom:32px">Nouto tiistaisin tai perjantaisin klo 9–15. Valitse sinulle sopiva päivä.</p>' +
          '<div id="melers-slots" style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:32px"><p style="font-family:Inter,sans-serif;color:#999">Ladataan...</p></div>' +
          '<div id="melers-booking-form"></div>' +
        '</div>' +
      '</div>';

    fetch('/api/booking/slots').then(function (r) { return r.json(); }).then(function (data) {
      var container = document.getElementById('melers-slots');
      container.innerHTML = '';
      data.slots.forEach(function (slot) {
        var card = document.createElement('button');
        card.setAttribute('data-date', slot.date);
        card.style.cssText = 'border:2px solid #E9E4DF;border-radius:16px;padding:16px 24px;background:#fff;cursor:pointer;font-family:Sora,sans-serif;text-align:left;min-width:140px;transition:border-color 0.2s,background 0.2s';
        card.innerHTML =
          '<div style="font-weight:700;color:#14375A;font-size:14px">' + slot.fi + '</div>' +
          '<div style="color:#14375A;opacity:0.7;font-size:13px;margin-top:4px">' + formatDate(slot.date) + '</div>';
        card.addEventListener('mouseenter', function () { if (!this.classList.contains('sel')) this.style.borderColor = '#FF8F7A'; });
        card.addEventListener('mouseleave', function () { if (!this.classList.contains('sel')) this.style.borderColor = '#E9E4DF'; });
        card.addEventListener('click', function () {
          document.querySelectorAll('#melers-slots button').forEach(function (b) {
            b.classList.remove('sel');
            b.style.borderColor = '#E9E4DF';
            b.style.background = '#fff';
          });
          this.classList.add('sel');
          this.style.borderColor = '#FF8F7A';
          this.style.background = '#FFF5F3';
          showBookingForm(slot);
        });
        container.appendChild(card);
      });
    }).catch(function () {
      document.getElementById('melers-slots').innerHTML =
        '<p style="font-family:Inter,sans-serif;color:#e74c3c">Ei saatavilla. Soita: +358 22 331718</p>';
    });
  }

  function showBookingForm(slot) {
    var container = document.getElementById('melers-booking-form');
    if (!container) return;
    container.style.display = 'block';
    container.innerHTML =
      '<div style="background:#F1F2F4;border-radius:20px;padding:32px;max-width:520px">' +
        '<h3 style="font-family:Sora,sans-serif;font-weight:700;color:#14375A;margin:0 0 20px;font-size:16px">Varaa ' + slot.fi + ' ' + formatDate(slot.date) + '</h3>' +
        '<div style="display:flex;flex-direction:column;gap:12px">' +
          inp('bk-nimi', 'text', 'Nimi *', true) +
          inp('bk-osoite', 'text', 'Noutoosoite *', true) +
          inp('bk-puhelin', 'tel', 'Puhelin') +
          inp('bk-email', 'email', 'Sähköposti') +
          '<textarea id="bk-notes" rows="3" placeholder="Lisätiedot (valinnainen)" style="' + inputStyle() + 'resize:none"></textarea>' +
          '<button id="bk-submit" style="background:#FF8F7A;color:#fff;font-family:Sora,sans-serif;font-weight:700;font-size:14px;padding:14px 24px;border:none;border-radius:999px;cursor:pointer">Vahvista varaus →</button>' +
        '</div>' +
        '<div id="bk-msg"></div>' +
      '</div>';

    document.getElementById('bk-submit').addEventListener('click', function () {
      var nimi = document.getElementById('bk-nimi').value.trim();
      var osoite = document.getElementById('bk-osoite').value.trim();
      if (!nimi || !osoite) {
        showMsg(document.getElementById('bk-msg'), 'Täytä pakolliset kentät (*).', '#e74c3c');
        return;
      }
      this.disabled = true; this.textContent = 'Lähetetään...';
      var btn = this;
      postJSON('/api/booking/reserve', {
        slot_date: slot.date,
        nimi: nimi,
        osoite: osoite,
        puhelin: document.getElementById('bk-puhelin').value,
        email: document.getElementById('bk-email').value,
        lisatiedot: document.getElementById('bk-notes').value,
      },
        function () {
          container.innerHTML =
            '<div style="background:#14375A;color:#fff;border-radius:20px;padding:32px;text-align:center">' +
              '<p style="font-family:Sora,sans-serif;font-weight:700;font-size:20px;margin-bottom:8px">Varaus vahvistettu!</p>' +
              '<p style="font-family:Inter,sans-serif;font-size:15px;opacity:0.8">Nouto ' + slot.fi.toLowerCase() + 'na ' + formatDate(slot.date) + ' klo 9–15.<br/>Vahvistus lähetetty sähköpostiisi.</p>' +
            '</div>';
        },
        function () {
          btn.disabled = false; btn.textContent = 'Vahvista varaus →';
          showMsg(document.getElementById('bk-msg'), 'Virhe. Soita: +358 22 331718', '#e74c3c');
        }
      );
    });
  }

  // ─── CHAT WIDGET ─────────────────────────────────────────────────────────────

  var chatBtn = document.createElement('button');
  chatBtn.setAttribute('aria-label', 'Avaa chat');
  chatBtn.style.cssText = 'position:fixed;bottom:24px;right:24px;width:56px;height:56px;background:#FF8F7A;border:none;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:22px;box-shadow:0 4px 16px rgba(0,0,0,0.2);z-index:9998;transition:transform 0.15s';
  chatBtn.textContent = '💬';
  chatBtn.addEventListener('mouseenter', function () { this.style.transform = 'scale(1.1)'; });
  chatBtn.addEventListener('mouseleave', function () { this.style.transform = 'scale(1)'; });
  document.body.appendChild(chatBtn);

  var chatPanel = document.createElement('div');
  chatPanel.style.cssText = 'position:fixed;bottom:96px;right:24px;width:300px;background:#fff;border-radius:20px;box-shadow:0 8px 32px rgba(0,0,0,0.15);padding:24px;z-index:9999;display:none;';
  chatPanel.innerHTML =
    '<p style="font-family:Sora,sans-serif;font-weight:700;color:#14375A;margin:0 0 4px">Lähetä viesti</p>' +
    '<p style="font-family:Inter,sans-serif;font-size:13px;color:#14375A;opacity:0.6;margin:0 0 16px">Vastaamme 1 arkipäivässä.</p>' +
    '<div style="display:flex;flex-direction:column;gap:10px">' +
      '<input id="chat-nimi" type="text" placeholder="Nimi" style="' + chatInputStyle() + '"/>' +
      '<input id="chat-email" type="email" placeholder="Sähköposti" style="' + chatInputStyle() + '"/>' +
      '<textarea id="chat-viesti" rows="3" placeholder="Kirjoita viesti..." style="' + chatInputStyle() + 'resize:none"></textarea>' +
      '<button id="chat-send" style="background:#FF8F7A;color:#fff;font-family:Sora,sans-serif;font-weight:700;font-size:13px;padding:12px;border:none;border-radius:999px;cursor:pointer">Lähetä →</button>' +
    '</div>' +
    '<div id="chat-msg"></div>';
  document.body.appendChild(chatPanel);

  chatBtn.addEventListener('click', function () {
    chatPanel.style.display = chatPanel.style.display === 'none' ? 'block' : 'none';
  });

  document.getElementById('chat-send').addEventListener('click', function () {
    var viesti = document.getElementById('chat-viesti').value.trim();
    if (!viesti) { showMsg(document.getElementById('chat-msg'), 'Kirjoita viesti.', '#e74c3c'); return; }
    this.disabled = true; this.textContent = 'Lähetetään...';
    var btn = this;
    postJSON('/api/chat', {
      nimi: document.getElementById('chat-nimi').value,
      email: document.getElementById('chat-email').value,
      viesti: viesti,
      source: location.pathname,
    },
      function () {
        chatPanel.innerHTML =
          '<p style="font-family:Sora,sans-serif;font-weight:700;color:#14375A;margin-bottom:8px">Viesti lähetetty!</p>' +
          '<p style="font-family:Inter,sans-serif;font-size:13px;color:#14375A;opacity:0.7">Palataan teille pian. 👋</p>';
      },
      function () {
        btn.disabled = false; btn.textContent = 'Lähetä →';
        showMsg(document.getElementById('chat-msg'), 'Virhe. Soita: +358 22 331718', '#e74c3c');
      }
    );
  });

})();
