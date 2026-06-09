// ═══════════════════════════════════════════════════════════════
// TERJEMAHAN — Bahasa Malaysia & English
// ═══════════════════════════════════════════════════════════════

const LANG = {
  BM: {
    navSenarai : 'Senarai Fail',
    navAdmin   : 'Panel Admin',

    heroTajuk      : 'Sistem Pengurusan Fail PBD',
    heroSub        : 'Portal rasmi pengurusan fail penilaian bilik darjah',
    filterSemLabel : 'Semester',
    filterTahunLabel : 'Tahun',
    filterSemAll   : 'Semua Semester',
    filterTahunAll : 'Semua Tahun',
    btnTapis       : 'Tapis',
    btnReset       : 'Reset',
    colBil         : 'Bil.',
    colNama        : 'Nama Fail',
    colLink        : 'Pautan',
    btnBuka        : 'Buka',
    tidakAdaData   : 'Tiada fail dijumpai.',
    memuatData     : 'Memuatkan data...',
    kumpulanFail   : 'fail',

    adminTajuk : 'Panel Pentadbiran',
    adminSub   : 'Akses pentadbiran untuk mengurus fail PBD',
    labelKey   : 'Kata Kunci Rahsia',
    phKey      : 'Masukkan kata kunci...',
    btnSahkan  : 'Sahkan',
    keyBetul   : '✅ Akses dibenarkan',
    keyTidakSah: '❌ Kata kunci tidak sah',
    skopOperasi: 'Skop Operasi',
    semAll     : 'Semua Semester',
    tahunAll   : 'Semua Tahun',
    operasi    : 'Operasi',

    btnBuatFail  : 'Buat Fail Baru',
    btnClearData : 'Kosong Data G3:BO',
    btnApdm      : 'Sambung & Salin APDM',
    btnClearSetup: 'Padam SETUP E4:E',
    btnSemuaOps  : 'Jalankan Semua Operasi',
    btnJanaPDF   : 'Jana Senarai PDF',
    btnShare     : 'Share Fail ke Editor',

    descBuatFail  : 'Cipta fail baru dari template untuk semester dipilih',
    descClearData : 'Kosongkan data markah & ulasan (G3:BO) semua fail',
    descApdm      : 'Sambungkan IMPORTRANGE dan salin data pelajar dari APDM',
    descClearSetup: 'Padam data kolum E baris 4 ke bawah dalam tab SETUP',
    descSemuaOps  : 'Jalankan operasi APDM dan SETUP serentak',
    descJanaPDF   : 'Jana dokumen PDF senarai fail dengan pautan boleh klik',
    descShare     : 'Kongsikan akses fail kepada semua editor berdaftar',

    memproses : 'Memproses...',
    keputusan : 'Keputusan Operasi',
    tiKosong  : 'Tiada fail untuk diproses',

    konfirmBuatFail  : 'Cipta fail baru untuk',
    konfirmClearData : 'Kosongkan data markah untuk',
    konfirmApdm      : 'Salin data APDM untuk',
    konfirmClearSetup: 'Padam SETUP E4:E untuk',
    konfirmSemuaOps  : 'Jalankan semua operasi untuk',
    konfirmJanaPDF   : 'Jana PDF untuk',
    konfirmShare     : 'Share fail untuk',
    konfirmSoal      : 'Teruskan?',
    btnYa            : 'Ya, Teruskan',
    btnTidak         : 'Batal',

    logTajuk  : 'Log Aktiviti Terkini',
    colTarikh : 'Tarikh',
    colMasa   : 'Masa',
    colFungsi : 'Fungsi',
    colFail   : 'Fail',
    colStatus : 'Status',
    tiAdaLog  : 'Tiada log dijumpai.',

    drawerLangBtn : '🌐 Switch to English',
    footer : 'Sistem Pengurusan Fail PBD © 2026 SK Pendidikan Khas Kuantan',
  },

  EN: {
    navSenarai : 'File List',
    navAdmin   : 'Admin Panel',

    heroTajuk      : 'PBD File Management System',
    heroSub        : 'Official portal for classroom assessment file management',
    filterSemLabel : 'Semester',
    filterTahunLabel : 'Year',
    filterSemAll   : 'All Semesters',
    filterTahunAll : 'All Years',
    btnTapis       : 'Filter',
    btnReset       : 'Reset',
    colBil         : 'No.',
    colNama        : 'File Name',
    colLink        : 'Link',
    btnBuka        : 'Open',
    tidakAdaData   : 'No files found.',
    memuatData     : 'Loading data...',
    kumpulanFail   : 'files',

    adminTajuk : 'Administration Panel',
    adminSub   : 'Admin access for managing PBD files',
    labelKey   : 'Secret Key',
    phKey      : 'Enter secret key...',
    btnSahkan  : 'Verify',
    keyBetul   : '✅ Access granted',
    keyTidakSah: '❌ Invalid secret key',
    skopOperasi: 'Operation Scope',
    semAll     : 'All Semesters',
    tahunAll   : 'All Years',
    operasi    : 'Operations',

    btnBuatFail  : 'Create New Files',
    btnClearData : 'Clear Data G3:BO',
    btnApdm      : 'Connect & Copy APDM',
    btnClearSetup: 'Delete SETUP E4:E',
    btnSemuaOps  : 'Run All Operations',
    btnJanaPDF   : 'Generate PDF List',
    btnShare     : 'Share Files to Editors',

    descBuatFail  : 'Create new files from template for selected semester',
    descClearData : 'Clear marks & comments data (G3:BO) from all files',
    descApdm      : 'Connect IMPORTRANGE and copy student data from APDM',
    descClearSetup: 'Delete column E data from row 4 onwards in SETUP tab',
    descSemuaOps  : 'Run APDM and SETUP operations simultaneously',
    descJanaPDF   : 'Generate PDF document of file list with clickable links',
    descShare     : 'Share file access to all registered editors',

    memproses : 'Processing...',
    keputusan : 'Operation Result',
    tiKosong  : 'No files to process',

    konfirmBuatFail  : 'Create new files for',
    konfirmClearData : 'Clear marks data for',
    konfirmApdm      : 'Copy APDM data for',
    konfirmClearSetup: 'Delete SETUP E4:E for',
    konfirmSemuaOps  : 'Run all operations for',
    konfirmJanaPDF   : 'Generate PDF for',
    konfirmShare     : 'Share files for',
    konfirmSoal      : 'Continue?',
    btnYa            : 'Yes, Continue',
    btnTidak         : 'Cancel',

    logTajuk  : 'Recent Activity Log',
    colTarikh : 'Date',
    colMasa   : 'Time',
    colFungsi : 'Function',
    colFail   : 'File',
    colStatus : 'Status',
    tiAdaLog  : 'No log entries found.',

    drawerLangBtn : '🌐 Tukar ke Bahasa Malaysia',
    footer : 'PBD File Management System © 2026 SK Pendidikan Khas Kuantan',
  },
};

// ── Bahasa semasa ─────────────────────────
let currentLang = localStorage.getItem('pbd_lang') || 'BM';

function getLang() {
  return LANG[currentLang];
}

function toggleLang() {
  currentLang = currentLang === 'BM' ? 'EN' : 'BM';
  localStorage.setItem('pbd_lang', currentLang);
  applyLang();
}

function applyLang() {
  const L = getLang();

  // Update teks biasa
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    if (L[key] !== undefined) el.textContent = L[key];
  });

  // Update placeholder
  document.querySelectorAll('[data-ph]').forEach(el => {
    const key = el.getAttribute('data-ph');
    if (L[key] !== undefined) el.placeholder = L[key];
  });

  // Update desktop lang toggle button
  const btnDesktop = document.getElementById('langToggle');
  if (btnDesktop) btnDesktop.textContent = currentLang === 'BM' ? 'EN' : 'BM';

  // Update drawer lang button — guna key khas, bukan data-lang
  const btnDrawer = document.getElementById('langToggleDrawer');
  if (btnDrawer) btnDrawer.textContent = L.drawerLangBtn;

  // Update html lang attribute
  document.documentElement.lang = currentLang === 'BM' ? 'ms' : 'en';
}
