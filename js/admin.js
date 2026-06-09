// ═══════════════════════════════════════════════════════════════
// HALAMAN ADMIN — Panel Pentadbiran
// ═══════════════════════════════════════════════════════════════

let secretKey    = '';
let isAuthorized = false;

document.addEventListener('DOMContentLoaded', async () => {
  setSchoolInfo();
  applyLang();
  await loadFilterOptions();
  await loadLogTerkini();
  bindEvents();

  // Semak key yang disimpan
  const saved = sessionStorage.getItem('pbd_key');
  if (saved) {
    document.getElementById('inputKey').value = saved;
    await sahkanKey(saved);
  }
});

// ── Set maklumat sekolah ──────────────────
function setSchoolInfo() {
  const logos = document.querySelectorAll('.school-logo');
  logos.forEach(el => { el.src = CONFIG.SCHOOL_LOGO; el.alt = CONFIG.SCHOOL_NAME_BM; });
}

// ── Load pilihan filter ───────────────────
async function loadFilterOptions() {
  try {
    const res  = await fetch(CONFIG.API_URL + '?action=getSemesterList');
    const data = await res.json();

    const semSelect   = document.getElementById('adminSem');
    const tahunSelect = document.getElementById('adminTahun');

    if (semSelect && data.semesters) {
      data.semesters.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s; opt.textContent = s;
        semSelect.appendChild(opt);
      });
    }

    if (tahunSelect && data.tahuns) {
      data.tahuns.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t; opt.textContent = t;
        tahunSelect.appendChild(opt);
      });
    }
  } catch (e) {
    console.error('Gagal load filter:', e);
  }
}

// ── Bind semua events ─────────────────────
function bindEvents() {
  // Key verification
  document.getElementById('btnSahkan').addEventListener('click', async () => {
    const key = document.getElementById('inputKey').value.trim();
    if (key) await sahkanKey(key);
  });

  document.getElementById('inputKey').addEventListener('keypress', async e => {
    if (e.key === 'Enter') {
      const key = document.getElementById('inputKey').value.trim();
      if (key) await sahkanKey(key);
    }
  });

  // Admin action buttons
  const actions = {
    btnBuatFail   : 'buatFail',
    btnClearData  : 'clearData',
    btnApdm       : 'apdmSemua',
    btnClearSetup : 'clearSetup',
    btnSemuaOps   : 'semuaOperasi',
    btnJanaPDF    : 'janaPDF',
    btnShare      : 'shareFail',
  };

  Object.entries(actions).forEach(([btnId, action]) => {
    const btn = document.getElementById(btnId);
    if (btn) btn.addEventListener('click', () => runAction(action, btnId));
  });
}

// ── Sahkan secret key ─────────────────────
async function sahkanKey(key) {
  const L        = getLang();
  const statusEl = document.getElementById('keyStatus');

  statusEl.textContent = '...';
  statusEl.className   = 'key-status';

  try {
    // Test key dengan ping
    const url = CONFIG.API_URL + '?action=getSemesterList&secretKey=' + encodeURIComponent(key);
    const res = await fetch(url);
    await res.json();

    // Simpan key
    secretKey    = key;
    isAuthorized = true;
    sessionStorage.setItem('pbd_key', key);

    statusEl.textContent = L.keyBetul;
    statusEl.className   = 'key-status key-ok';

    // Buka admin panel
    document.getElementById('actionsCard').classList.remove('locked');
    document.getElementById('actionsCard').classList.add('unlocked');

  } catch (e) {
    secretKey    = '';
    isAuthorized = false;
    sessionStorage.removeItem('pbd_key');

    statusEl.textContent = L.keyTidakSah;
    statusEl.className   = 'key-status key-err';
  }
}

// ── Jalankan operasi admin ────────────────
async function runAction(action, btnId) {
  if (!isAuthorized) {
    showToast('❌ Sila sahkan kata kunci dahulu', 'error');
    return;
  }

  const L        = getLang();
  const semester = document.getElementById('adminSem').value;
  const tahun    = document.getElementById('adminTahun').value;

  const konfirmMap = {
    buatFail    : L.konfirmBuatFail,
    clearData   : L.konfirmClearData,
    apdmSemua   : L.konfirmApdm,
    clearSetup  : L.konfirmClearSetup,
    semuaOperasi: L.konfirmSemuaOps,
    janaPDF     : L.konfirmJanaPDF,
    shareFail   : L.konfirmShare,
  };

  const skopTeks = (semester || L.semAll) + ' — ' + (tahun || L.tahunAll);
  const konfirm  = await showConfirm(konfirmMap[action] + '\n\n' + skopTeks + '\n\n' + L.konfirmSoal);
  if (!konfirm) return;

  const btn = document.getElementById(btnId);
  setLoading(btn, true);

  const resultPanel = document.getElementById('resultPanel');
  resultPanel.classList.add('visible');
  resultPanel.querySelector('.result-body').innerHTML = `
    <div class="result-loading">
      <div class="spinner"></div>
      <p>${L.memproses}</p>
    </div>`;

  try {
    let url = CONFIG.API_URL + '?action=' + action
      + '&secretKey=' + encodeURIComponent(secretKey);
    if (semester) url += '&semester=' + encodeURIComponent(semester);
    if (tahun)    url += '&tahun='    + encodeURIComponent(tahun);

    const res  = await fetch(url);
    const data = await res.json();

    if (data.error) {
      resultPanel.querySelector('.result-body').innerHTML = renderError(data.error);
      showToast('❌ ' + data.error, 'error');

      if (data.error === 'Akses ditolak') {
        isAuthorized = false;
        sessionStorage.removeItem('pbd_key');
        document.getElementById('keyStatus').textContent = getLang().keyTidakSah;
        document.getElementById('keyStatus').className   = 'key-status key-err';
        document.getElementById('actionsCard').classList.add('locked');
        document.getElementById('actionsCard').classList.remove('unlocked');
      }
    } else {
      resultPanel.querySelector('.result-body').innerHTML = renderResult(data, action);
      showToast('✅ ' + (data.message || 'Berjaya!'), 'success');
      await loadLogTerkini();
    }
  } catch (e) {
    resultPanel.querySelector('.result-body').innerHTML = renderError('Ralat rangkaian: ' + e.message);
    showToast('❌ Ralat rangkaian', 'error');
  }

  setLoading(btn, false);
}

// ── Render result ─────────────────────────
function renderError(msg) {
  return `<div class="result-error"><h4>❌ Ralat</h4><p>${escHtml(msg)}</p></div>`;
}

function renderResult(data, action) {
  let html = `<div class="result-success"><h4>✅ ${escHtml(data.message || 'Selesai')}</h4>`;

  // janaPDF — render khas dengan links
  if (action === 'janaPDF' && data.hasilJana) {
    html += '<div class="pdf-list">';
    (data.hasilJana || []).forEach(h => {
      html += `
        <div class="pdf-item">
          <strong>${escHtml(h.kunci)}</strong> (${h.jumlah} fail)<br>
          <a href="${escHtml(h.docUrl)}" target="_blank" rel="noopener">📄 Google Doc</a>
          ${h.pdfUrl ? `&nbsp;&nbsp;<a href="${escHtml(h.pdfUrl)}" target="_blank" rel="noopener">🖨️ PDF</a>` : '<span class="warn-text"> ⚠️ PDF gagal</span>'}
        </div>`;
    });
    html += '</div>';
    if ((data.hasilGagal || []).length) {
      html += '<div class="result-gagal"><strong>Gagal:</strong><ul>';
      data.hasilGagal.forEach(g => html += `<li>${escHtml(g)}</li>`);
      html += '</ul></div>';
    }

  // semuaOperasi — render khas
  } else if (action === 'semuaOperasi' && data.hasil) {
    const { apdm, setup } = data.hasil;
    html += `
      <div class="ops-summary">
        <div class="ops-row">
          <span class="ops-label">APDM</span>
          <span class="ops-count ok">${apdm.berjaya.length} ✅</span>
          <span class="ops-count err">${apdm.gagal.length} ❌</span>
        </div>
        <div class="ops-row">
          <span class="ops-label">SETUP</span>
          <span class="ops-count ok">${setup.berjaya.length} ✅</span>
          <span class="ops-count err">${setup.gagal.length} ❌</span>
        </div>
      </div>`;
    if (apdm.berjaya.length || setup.berjaya.length) {
      html += '<ul class="result-list">';
      apdm.berjaya.forEach(n  => html += `<li class="ok">✅ ${escHtml(n)}</li>`);
      apdm.gagal.forEach(n    => html += `<li class="err">❌ ${escHtml(n)}</li>`);
      setup.berjaya.forEach(n => html += `<li class="ok">✅ ${escHtml(n)}</li>`);
      setup.gagal.forEach(n   => html += `<li class="err">❌ ${escHtml(n)}</li>`);
      html += '</ul>';
    }

  // Standard render
  } else {
    if ((data.berjaya || []).length) {
      html += '<ul class="result-list">';
      data.berjaya.forEach(n => html += `<li class="ok">✅ ${escHtml(n)}</li>`);
      html += '</ul>';
    }
    if ((data.gagal || []).length) {
      html += '<div class="result-gagal"><strong>Gagal:</strong><ul>';
      data.gagal.forEach(n => html += `<li>❌ ${escHtml(n)}</li>`);
      html += '</ul></div>';
    }
    if (!(data.berjaya || []).length && !(data.gagal || []).length) {
      html += `<p>${getLang().tiKosong}</p>`;
    }
  }

  html += '</div>';
  return html;
}

// ── Load log terkini ──────────────────────
async function loadLogTerkini() {
  try {
    const res  = await fetch(CONFIG.API_URL + '?action=getLog');
    const data = await res.json();
    const L    = getLang();

    const logBody = document.getElementById('logTable');
    if (!logBody) return;

    const rows = (data.data || []).slice(0, 10);

    if (!rows.length) {
      logBody.innerHTML = `<tr><td colspan="5" class="empty">${L.tiAdaLog}</td></tr>`;
      return;
    }

    logBody.innerHTML = rows.map(row => {
      const sc = row.status === '✅' ? 'status-ok' : row.status === '⚠️' ? 'status-warn' : 'status-err';
      const failShort = row.fail.length > 40 ? row.fail.substring(0, 40) + '…' : row.fail;
      return `<tr>
        <td>${escHtml(row.tarikh)}</td>
        <td>${escHtml(row.masa)}</td>
        <td>${escHtml(row.fungsi)}</td>
        <td class="td-fail" title="${escHtml(row.fail)}">${escHtml(failShort)}</td>
        <td class="${sc}">${escHtml(row.status)}</td>
      </tr>`;
    }).join('');

  } catch (e) {
    console.error('Gagal load log:', e);
  }
}

// ── UI helpers ────────────────────────────
function setLoading(btn, loading) {
  if (!btn) return;
  const L = getLang();
  btn.disabled = loading;
  if (loading) {
    btn.dataset.orig = btn.innerHTML;
    btn.innerHTML = `<span class="spinner-sm"></span> ${L.memproses}`;
  } else {
    btn.innerHTML = btn.dataset.orig || btn.innerHTML;
  }
}

function showToast(msg, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className   = `toast toast-${type} visible`;
  setTimeout(() => toast.classList.remove('visible'), 4000);
}

function showConfirm(msg) {
  return new Promise(resolve => {
    const modal    = document.getElementById('modal');
    const msgEl    = document.getElementById('modalMsg');
    const btnYa    = document.getElementById('modalYa');
    const btnTidak = document.getElementById('modalTidak');
    const L        = getLang();

    msgEl.textContent    = msg;
    btnYa.textContent    = L.btnYa;
    btnTidak.textContent = L.btnTidak;
    modal.classList.add('visible');

    const cleanup = () => modal.classList.remove('visible');
    btnYa.onclick    = () => { cleanup(); resolve(true);  };
    btnTidak.onclick = () => { cleanup(); resolve(false); };
    modal.onclick    = e => { if (e.target === modal) { cleanup(); resolve(false); } };
  });
}

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
