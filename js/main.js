// ═══════════════════════════════════════════════════════════════
// HALAMAN UTAMA — Senarai Fail
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', async () => {
  // Set maklumat sekolah
  setSchoolInfo();

  // Apply bahasa
  applyLang();

  // Load filter options
  await loadFilterOptions();

  // Load semua fail
  await loadSenaraiFail();

  // Bind events
  bindEvents();
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

    const semSelect   = document.getElementById('filterSem');
    const tahunSelect = document.getElementById('filterTahun');

    if (semSelect && data.semesters) {
      data.semesters.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = s;
        semSelect.appendChild(opt);
      });
    }

    if (tahunSelect && data.tahuns) {
      data.tahuns.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        tahunSelect.appendChild(opt);
      });
    }
  } catch (e) {
    console.error('Gagal load filter:', e);
  }
}

// ── Load senarai fail ─────────────────────
async function loadSenaraiFail(semester = '', tahun = '') {
  const container = document.getElementById('failContainer');
  const L         = getLang();

  container.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>${L.memuatData}</p>
    </div>`;

  try {
    let url = CONFIG.API_URL + '?action=getSenaraiFail';
    if (semester) url += '&semester=' + encodeURIComponent(semester);
    if (tahun)    url += '&tahun='    + encodeURIComponent(tahun);

    const res  = await fetch(url);
    const data = await res.json();

    renderSenaraiFail(data.data || []);
  } catch (e) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⚠️</div>
        <p>Gagal memuatkan data. Sila semak sambungan.</p>
        <button class="btn btn-outline" onclick="loadSenaraiFail()">Cuba Semula</button>
      </div>`;
  }
}

// ── Render senarai fail ───────────────────
function renderSenaraiFail(data) {
  const container = document.getElementById('failContainer');
  const L         = getLang();

  if (!data || data.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📁</div>
        <p>${L.tidakAdaData}</p>
      </div>`;
    return;
  }

  // Kumpul ikut semester + tahun
  const kumpulan = {};
  data.forEach(fail => {
    const kunci = fail.semester + ' ' + fail.tahun;
    if (!kumpulan[kunci]) kumpulan[kunci] = [];
    kumpulan[kunci].push(fail);
  });

  let html = '';

  Object.keys(kumpulan).sort().forEach(kunci => {
    const senarai = kumpulan[kunci];

    html += `
    <div class="group-card">
      <div class="group-header">
        <h3>${escHtml(kunci)}</h3>
        <span class="badge">${senarai.length} ${L.kumpulanFail}</span>
      </div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>${L.colBil}</th>
              <th>${L.colNama}</th>
              <th>${L.colLink}</th>
            </tr>
          </thead>
          <tbody>`;

    senarai.forEach((fail, idx) => {
      html += `
            <tr class="${idx % 2 === 0 ? 'row-even' : 'row-odd'}">
              <td class="td-bil">${idx + 1}</td>
              <td class="td-nama">${escHtml(fail.nama)}</td>
              <td class="td-link">`;

      if (fail.link) {
        html += `<a href="${escHtml(fail.link)}" target="_blank" rel="noopener" class="btn-buka">${L.btnBuka}</a>`;
      } else {
        html += `<span class="no-link">—</span>`;
      }

      html += `</td></tr>`;
    });

    html += `
          </tbody>
        </table>
      </div>
    </div>`;
  });

  container.innerHTML = html;
}

// ── Bind events ───────────────────────────
function bindEvents() {
  const btnTapis = document.getElementById('btnTapis');
  const btnReset = document.getElementById('btnReset');

  if (btnTapis) {
    btnTapis.addEventListener('click', () => {
      const sem   = document.getElementById('filterSem').value;
      const tahun = document.getElementById('filterTahun').value;
      loadSenaraiFail(sem, tahun);
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      document.getElementById('filterSem').value   = '';
      document.getElementById('filterTahun').value = '';
      loadSenaraiFail();
    });
  }
}

// ── Helper ────────────────────────────────
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
