// ==============================================
// CONFIG — แก้เฉพาะ 2 บรรทัดนี้
// ==============================================
var GAS_URL = 'https://script.google.com/macros/s/AKfycbzQpHPEwl0II5R1MXW3g4-tyiKu6y7DTq43HSDe3af4e-UTkJOkBtStBhB7HVK7Y1b6/exec';
var PHOTO_GAS_URL = 'https://script.google.com/macros/s/AKfycbw88dEHyeK631w9SIh2QVrwaUUabErKkrRTJtOPVYLl8WZ66DGAjRUAZ-geZ5pXbuNFOw/exec';

// ADMIN hardcode
var _adm = {
  id: 'admin',
  username: 'admin',
  password: 'admin1234',
  name: 'ผู้ดูแลระบบ',
  role: 'admin',
  status: 'approved',
  branch: 'สำนักงานใหญ่',
  position: 'ผู้ดูแลระบบ',
  email: 'admin@pea.co.th'
};

var MT_TEMPLATE_B64 = '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';

// ==============================================
// GAS HELPERS
// ==============================================

function gasPost(params, cb) {
  fetch(GAS_URL, {
    method: 'POST',
    redirect: 'follow',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(params)
  })
    .then(function (r) { return r.json(); })
    .then(function (r) { cb(null, r); })
    .catch(function (e) { cb(e, null); });
}

function checkDbStatus() {
  gasPost({ action: 'getSettings', docId: 'ping' }, function (err, r) {
    setDbStatus(!err && r && r.ok);
  });
}

function setDbStatus(ok) {
  var dot = document.getElementById('dbDot');
  var txt = document.getElementById('dbStatusText');
  dot.className = 'db-dot' + (ok ? '' : ' err');
  txt.textContent = ok ? 'GAS OK' : 'ออฟไลน์';
}

// ==============================================
// VARS
// ==============================================

var currentUser = null;
var matRows = [];
var forgotUserId = null;
var photoData = { meter: [null], work: [null, null], equip: [null, null] };
var cache = { materials: [], customers: [], branches: [] };
var appSettings = {};
var sigData = null;
var _historyRecsCache = [];
var _usersCache = [];
var _allRecsCache = [];
var _currentHistoryRecs = [];
var _currentHistoryUserId = '';
var _currentHistoryUserName = '';
var _orderRecsCache = [];
var _editPhotoRecId = null;
var _editPhotoData = { meter: [null], work: [null, null], equip: [null, null] };
var _csvBrRowsCache = [];
var _csvCustRowsCache = [];
var _csvMatRowsCache = [];

var PROVINCES = [
  'กรุงเทพมหานคร', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร',
  'ขอนแก่น', 'จันทบุรี', 'ฉะเชิงเทรา', 'ชลบุรี', 'ชัยนาท',
  'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่', 'ตรัง',
  'ตราด', 'ตาก', 'นครนายก', 'นครปฐม', 'นครพนม',
  'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส',
  'น่าน', 'บึงกาฬ', 'บุรีรัมย์', 'ปทุมธานี', 'ประจวบคีรีขันธ์',
  'ปราจีนบุรี', 'ปัตตานี', 'พระนครศรีอยุธยา', 'พะเยา', 'พังงา',
  'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์',
  'แพร่', 'ภูเก็ต', 'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน',
  'ยโสธร', 'ยะลา', 'ร้อยเอ็ด', 'ระนอง', 'ระยอง',
  'ราชบุรี', 'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย',
  'ศรีสะเกษ', 'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ',
  'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 'สิงห์บุรี',
  'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์', 'หนองคาย',
  'หนองบัวลำภู', 'อ่างทอง', 'อำนาจเจริญ', 'อุดรธานี', 'อุตรดิตถ์',
  'อุทัยธานี', 'อุบลราชธานี'
];

// ==============================================
// INIT
// ==============================================

(function () {
  var sel = document.getElementById('br_province');
  PROVINCES.forEach(function (p) {
    var o = document.createElement('option');
    o.value = p; o.textContent = p;
    sel.appendChild(o);
  });
  checkDbStatus();
})();

// ==============================================
// LOADING
// ==============================================

function showLoading(t) {
  document.getElementById('loadingText').textContent = t || 'กำลังโหลด...';
  document.getElementById('loadingOverlay').classList.add('active');
}
function hideLoading() {
  document.getElementById('loadingOverlay').classList.remove('active');
}

// ==============================================
// AUTH
// ==============================================

function doLogin() {
  var u = gv('loginUsername');
  var p = document.getElementById('loginPassword').value;
  if (!u || !p) { showAlert('loginAlert', 'กรุณากรอกข้อมูล', 'danger'); return; }

  if (_adm && u === _adm.username) {
    if (p === _adm.password) loginSuccess(_adm);
    else showAlert('loginAlert', 'รหัสผ่านไม่ถูกต้อง', 'danger');
    return;
  }

  showLoading('กำลังเข้าสู่ระบบ...');
  gasPost({ action: 'login', username: u, password: p }, function (err, r) {
    hideLoading();
    if (err || !r) { showAlert('loginAlert', 'เชื่อมต่อไม่ได้', 'danger'); return; }
    if (!r.ok) {
      var msg = r.error === 'user_not_found' ? 'ไม่พบผู้ใช้' :
        r.error === 'wrong_password' ? 'รหัสผ่านไม่ถูกต้อง' :
        r.error === 'not_approved' ? 'บัญชียังไม่ได้รับอนุมัติ' : 'เกิดข้อผิดพลาด';
      showAlert('loginAlert', msg, 'danger'); return;
    }
    loginSuccess(r.user);
  });
}

function loginSuccess(user) {
  currentUser = user;
  document.getElementById('navUser').textContent = ' ' + currentUser.name;
  var adm = document.getElementById('navAdmin');
  adm.style.display = (currentUser.role === 'admin') ? '' : 'none';
  var orderNav = document.getElementById('navOrder');
  if (orderNav) orderNav.style.display =
    (currentUser.role === 'admin' || currentUser.role === 'staff') ? '' : 'none';
  document.getElementById('f_branch').value = currentUser.branch || '';
  document.getElementById('f_provider').value = currentUser.name || '';
  document.getElementById('f_position').value = currentUser.position || '';
  setNow();
  getLocation();
  document.getElementById('loginPage').classList.remove('active');
  document.getElementById('mainApp').classList.add('active');
  var nb1 = document.getElementById('navBR1');
  var nhi = document.getElementById('navHistory');
  if (nb1) nb1.style.display = '';
  if (nhi) nhi.style.display = '';
  loadAllCache(function () { renderHistory(); });
  setTimeout(function () { initSignature(); }, 300);
}

function doLogout() {
  currentUser = null;
  cache = { materials: [], customers: [], branches: [] };
  document.getElementById('mainApp').classList.remove('active');
  document.getElementById('loginPage').classList.add('active');
  document.getElementById('loginUsername').value = '';
  document.getElementById('loginPassword').value = '';
}

function doRegister() {
  var name = gv('regName');
  var uname = gv('regUsername');
  var pass = document.getElementById('regPassword').value;
  var conf = document.getElementById('regConfirm').value;
  var email = gv('regEmail');
  var branch = gv('regBranch');
  var position = gv('regPosition');
  if (!name || !uname || !pass || !email || !branch) {
    showAlert('regAlert', 'กรุณากรอกข้อมูลที่จำเป็น', 'danger'); return;
  }
  if (pass !== conf) { showAlert('regAlert', 'รหัสผ่านไม่ตรงกัน', 'danger'); return; }
  showLoading('กำลังสมัครใช้งาน...');
  gasPost({
    action: 'register', data: {
      username: uname, password: pass, name: name,
      email: email, branch: branch, position: position,
      role: 'user', status: 'pending', createdAt: Date.now()
    }
  }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) {
      var msg = r && r.error === 'duplicate_username'
        ? 'รหัสประจำตัวนี้ถูกใช้แล้ว' : 'เกิดข้อผิดพลาด';
      showAlert('regAlert', msg, 'warning'); return;
    }
    showAlert('regAlert', 'สมัครสำเร็จ! รอการอนุมัติ', 'success');
    setTimeout(showLogin, 2000);
  });
}

function showLogin() {
  document.getElementById('loginPage').classList.add('active');
  document.getElementById('registerPage').classList.remove('active');
}
function showRegister() {
  if (cache.branches.length === 0) loadBranches();
  document.getElementById('loginPage').classList.remove('active');
  document.getElementById('registerPage').classList.add('active');
}

// ==============================================
// FORGOT PASSWORD
// ==============================================

function openForgot() {
  forgotUserId = null;
  ['fg_uid', 'fg_email', 'fg_newpass', 'fg_confirmpass']
    .forEach(function (id) { document.getElementById(id).value = ''; });
  document.getElementById('forgotStep1').style.display = '';
  document.getElementById('forgotStep2').style.display = 'none';
  document.getElementById('forgotAlert').innerHTML = '';
  document.getElementById('forgotModal').style.display = 'flex';
}
function closeForgot() { document.getElementById('forgotModal').style.display = 'none'; }

function verifyForgot() {
  var uid = gv('fg_uid'), email = gv('fg_email');
  if (!uid || !email) { showAlert('forgotAlert', 'กรุณากรอกข้อมูล', 'danger'); return; }
  showLoading('กำลังตรวจสอบ...');
  gasPost({ action: 'getUsers' }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { showAlert('forgotAlert', 'เกิดข้อผิดพลาด', 'danger'); return; }
    var user = r.rows.find(function (u) {
      return u.username === uid && u.email === email;
    });
    if (!user) { showAlert('forgotAlert', 'ไม่พบข้อมูล', 'danger'); return; }
    forgotUserId = user.id;
    document.getElementById('forgotStep1').style.display = 'none';
    document.getElementById('forgotStep2').style.display = '';
  });
}

function doResetPassword() {
  var np = document.getElementById('fg_newpass').value;
  var cp = document.getElementById('fg_confirmpass').value;
  if (!np) { showAlert('forgotAlert', 'กรุณากรอกรหัสผ่านใหม่', 'danger'); return; }
  if (np !== cp) { showAlert('forgotAlert', 'รหัสผ่านไม่ตรงกัน', 'danger'); return; }
  showLoading('กำลังเปลี่ยนรหัสผ่าน...');
  gasPost({ action: 'updateUser', id: forgotUserId, data: { password: np } }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { showAlert('forgotAlert', 'เกิดข้อผิดพลาด', 'danger'); return; }
    showAlert('forgotAlert', 'เปลี่ยนรหัสผ่านสำเร็จ!', 'success');
    setTimeout(function () { closeForgot(); showLogin(); }, 1800);
  });
}

// ==============================================
// PROFILE
// ==============================================

function openProfile() {
  if (!currentUser) return;
  document.getElementById('p_name').value = currentUser.name || '';
  document.getElementById('p_email').value = currentUser.email || '';
  document.getElementById('p_branch').value = currentUser.branch || '';
  document.getElementById('p_position').value = currentUser.position || '';
  document.getElementById('p_newpass').value = '';
  document.getElementById('p_confirmpass').value = '';
  document.getElementById('profileAlert').innerHTML = '';
  document.getElementById('profileModal').style.display = 'flex';
}
function closeProfile() { document.getElementById('profileModal').style.display = 'none'; }

function saveProfile() {
  var name = gv('p_name');
  var email = gv('p_email');
  var position = gv('p_position');
  var np = document.getElementById('p_newpass').value;
  var cp = document.getElementById('p_confirmpass').value;
  if (!name) { showAlert('profileAlert', 'กรุณากรอกชื่อ', 'danger'); return; }
  if (np && np !== cp) { showAlert('profileAlert', 'รหัสผ่านไม่ตรงกัน', 'danger'); return; }
  var upd = { name: name, email: email, position: position };
  if (np) upd.password = np;
  if (currentUser.id === 'admin') {
    Object.assign(currentUser, upd);
    document.getElementById('navUser').textContent = ' ' + name;
    document.getElementById('f_provider').value = name;
    document.getElementById('f_position').value = position;
    showAlert('profileAlert', 'บันทึกสำเร็จ', 'success');
    setTimeout(closeProfile, 1200); return;
  }
  showLoading('กำลังบันทึก...');
  gasPost({ action: 'updateUser', id: currentUser.id, data: upd }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { showAlert('profileAlert', 'เกิดข้อผิดพลาด', 'danger'); return; }
    Object.assign(currentUser, upd);
    document.getElementById('navUser').textContent = ' ' + name;
    document.getElementById('f_provider').value = name;
    document.getElementById('f_position').value = position;
    showAlert('profileAlert', 'บันทึกสำเร็จ', 'success');
    setTimeout(closeProfile, 1200);
  });
}

// ==============================================
// CACHE LOADERS
// ==============================================

function loadAllCache(cb) {
  showLoading('กำลังโหลดข้อมูล...');
  var done = 0;
  function check() { done++; if (done === 4) { hideLoading(); if (cb) cb(); } }
  loadSettings(check);
  loadMaterials(check);
  loadCustomers(check);
  loadBranches(check);
}
function loadMaterials(cb) {
  gasPost({ action: 'getMaterials' }, function (err, r) {
    cache.materials = (r && r.rows) ? r.rows : [];
    renderMatTable();
    if (cb) cb();
  });
}
function loadCustomers(cb) {
  gasPost({ action: 'getCustomers' }, function (err, r) {
    cache.customers = (r && r.rows) ? r.rows : [];
    if (cb) cb();
  });
}
function loadBranches(cb) {
  gasPost({ action: 'getBranches' }, function (err, r) {
    cache.branches = (r && r.rows) ? r.rows : [];
    if (cb) cb();
  });
}
function loadSettings(cb) {
  gasPost({ action: 'getSettings', docId: 'main' }, function (err, r) {
    if (r && r.ok) { appSettings = r.data || {}; showRefPrice(); }
    var docId = getMtDocId();
    gasPost({ action: 'getSettings', docId: docId }, function (err2, r2) {
      if (r2 && r2.ok) Object.assign(appSettings, r2.data || {});
      if (cb) cb();
    });
  });
}

// ==============================================
// BRANCH DROPDOWN
// ==============================================

function filterRegBranch() { buildBranchDD('regBranch', 'regBranchDropdown'); }
function filterEuBranch() { buildBranchDD('eu_branch', 'euBranchDropdown'); }
function buildBranchDD(inputId, ddId) {
  var input = document.getElementById(inputId);
  var val = input.value.toLowerCase();
  var dd = document.getElementById(ddId);
  var filtered = cache.branches.filter(function (b) {
    if (!val) return true;
    return (b.name || '').toLowerCase().includes(val) || (b.province || '').toLowerCase().includes(val);
  });
  if (!filtered.length) { dd.style.display = 'none'; return; }
  dd.innerHTML = '';
  filtered.slice(0, 12).forEach(function (b) {
    var item = document.createElement('div');
    item.style.cssText = 'padding:8px 12px;cursor:pointer;border-bottom:1px solid #f1f5f9;font-size:13px';
    item.innerHTML = '<b>' + esc(b.name) + '</b><span style="color:#6b7280;font-size:11px;margin-left:6px">' + esc(b.province) + ' / ' + esc(b.zone) + '</span>';
    item.onclick = function (e) { e.preventDefault(); e.stopPropagation(); input.value = b.name; dd.style.display = 'none'; };
    item.onmousedown = function (e) { e.preventDefault(); };
    item.onmouseover = function () { this.style.background = '#f5eefa'; };
    item.onmouseout = function () { this.style.background = ''; };
    dd.appendChild(item);
  });
  dd.style.display = 'block';
}
document.addEventListener('click', function (e) {
  [['regBranch', 'regBranchDropdown'], ['eu_branch', 'euBranchDropdown']].forEach(function (pair) {
    var inp = document.getElementById(pair[0]);
    var dd = document.getElementById(pair[1]);
    if (dd && inp && !inp.contains(e.target) && !dd.contains(e.target)) dd.style.display = 'none';
  });
});

// ==============================================
// BRANCHES ADMIN
// ==============================================

function saveBranch() {
  var name = gv('br_name'), province = gv('br_province'), zone = gv('br_zone'), editId = gv('br_editId');
  if (!name || !province || !zone) { alert('กรุณากรอกชื่อ จังหวัด และเขต'); return; }
  var data = { name: name, province: province, zone: zone };
  showLoading('กำลังบันทึก...');
  var params = editId
    ? { action: 'updateBranch', id: editId, data: data }
    : { action: 'addBranch', data: data };
  gasPost(params, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { alert('เกิดข้อผิดพลาด'); return; }
    clearBranchForm();
    loadBranches(function () { renderBranches(); });
  });
}
function deleteBranch(id) {
  if (!confirm('ต้องการลบ?')) return;
  showLoading('กำลังลบ...');
  gasPost({ action: 'deleteBranch', id: id }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { alert('เกิดข้อผิดพลาด'); return; }
    cache.branches = cache.branches.filter(function (b) { return b.id !== id; });
    renderBranches();
  });
}
function editBranch(id) {
  var b = cache.branches.find(function (x) { return x.id === id; });
  if (!b) return;
  document.getElementById('br_name').value = b.name || '';
  document.getElementById('br_province').value = b.province || '';
  document.getElementById('br_zone').value = b.zone || '';
  document.getElementById('br_editId').value = b.id;
}
function clearBranchForm() {
  ['br_name', 'br_editId'].forEach(function (id) { document.getElementById(id).value = ''; });
  document.getElementById('br_province').value = '';
  document.getElementById('br_zone').value = '';
}
function renderBranches() {
  var kw = gv('brSearch').toLowerCase();
  var all = cache.branches.slice().sort(function (a, b) { return (a.name || '').localeCompare(b.name || '', 'th'); });
  var shown = kw ? all.filter(function (b) { return (b.name || '').toLowerCase().includes(kw) || (b.province || '').includes(kw); }) : all;
  var h = '<table><thead><tr><th>ลำดับ</th><th>ชื่อ กฟฟ./สาขา</th><th>จังหวัด</th><th>เขต</th><th>จัดการ</th></tr></thead><tbody>';
  if (!shown.length) h += '<tr><td colspan="5" style="text-align:center;color:#9ca3af;padding:20px">ไม่มีรายการ</td></tr>';
  shown.forEach(function (b, i) {
    var bid = b.id.replace(/'/g, "\\'");
    h += '<tr><td style="color:#9ca3af">' + (i + 1) + '</td><td><b>' + esc(b.name || '') + '</b></td><td>' + esc(b.province || '') + '</td><td><span class="badge badge-blue">' + esc(b.zone || '') + '</span></td>';
    h += '<td style="white-space:nowrap"><button class="btn btn-outline btn-sm" onclick="editBranch(\'' + bid + '\')">แก้ไข</button> <button class="btn btn-danger btn-sm" onclick="deleteBranch(\'' + bid + '\')">ลบ</button></td></tr>';
  });
  h += '</tbody></table><div style="font-size:13px;color:#6b7280;margin-top:8px">แสดง ' + shown.length + ' / ' + all.length + ' รายการ</div>';
  document.getElementById('branchTable').innerHTML = h;
}

// ==============================================
// CSV IMPORT BRANCHES
// ==============================================

function importBrRowsFromCache() { importBrRows(_csvBrRowsCache); }
function handleBrCsvDrop(e) { e.preventDefault(); e.currentTarget.classList.remove('dragover'); if (e.dataTransfer.files[0]) processBrCsv(e.dataTransfer.files[0]); }
function handleBrCsvFile(inp) { if (inp.files[0]) processBrCsv(inp.files[0]); }
function processBrCsv(file) {
  parseFile(file, function (allRows) {
    var si = 0;
    if (allRows.length) { var fl = String(allRows[0][0] || '').toLowerCase(); if (fl.includes('กฟฟ') || fl.includes('ชื่อ')) si = 1; }
    var rows = [];
    for (var i = si; i < allRows.length; i++) {
      var cols = allRows[i];
      if (!cols[0]) continue;
      rows.push({ name: String(cols[0] || '').trim(), province: String(cols[1] || '').trim(), zone: String(cols[2] || '').trim() });
    }
    if (!rows.length) { document.getElementById('csvBrPreview').innerHTML = '<div class="alert alert-danger">ไม่พบข้อมูล</div>'; return; }
    _csvBrRowsCache = rows;
    var ph = '<div class="alert alert-info">พบ ' + rows.length + ' รายการ</div>';
    ph += '<div style="display:flex;gap:10px"><button class="btn btn-success btn-sm" onclick="importBrRowsFromCache()">นำเข้าทั้งหมด</button><button class="btn btn-outline btn-sm" onclick="document.getElementById(\'csvBrPreview\').innerHTML=\'\'">ยกเลิก</button></div>';
    document.getElementById('csvBrPreview').innerHTML = ph;
  });
}
function importBrRows(rows) {
  showLoading('กำลังนำเข้า...');
  gasPost({ action: 'batchAdd', collection: 'branches', rows: rows }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { alert('เกิดข้อผิดพลาด'); return; }
    document.getElementById('csvBrPreview').innerHTML = '<div class="alert alert-success">นำเข้า ' + rows.length + ' รายการสำเร็จ!</div>';
    loadBranches(function () { renderBranches(); });
  });
}

// ==============================================
// CUSTOMERS
// ==============================================

function onPeaInput() {
  var peaVal = gv('f_pea');
  var found = cache.customers.find(function (c) { return c.pea === peaVal; });
  var label = document.getElementById('peaMatchLabel');
  var custInp = document.getElementById('f_customer');
  var addrInp = document.getElementById('f_address');
  var hint = document.getElementById('peaHint');
  if (found) {
    label.innerHTML = '<span class="pea-match found">OK พบข้อมูล</span>';
    custInp.value = found.name || ''; custInp.readOnly = true;
    addrInp.value = found.address || ''; addrInp.readOnly = true;
    hint.style.display = 'block';
  } else {
    label.innerHTML = peaVal ? '<span class="pea-match notfound">ไม่พบ - กรอกเองได้</span>' : '';
    custInp.readOnly = false; addrInp.readOnly = false; hint.style.display = 'none';
  }
}
function saveCustomer() {
  var pea = gv('c_pea'), name = gv('c_name'), address = gv('c_address'), branch = gv('c_branch'), editId = gv('c_editId');
  if (!pea || !name) { alert('กรุณากรอก PEA และชื่อ'); return; }
  var data = { pea: pea, name: name, address: address, branch: branch };
  showLoading('กำลังบันทึก...');
  var params = editId ? { action: 'updateCustomer', id: editId, data: data } : { action: 'addCustomer', data: data };
  gasPost(params, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { alert('เกิดข้อผิดพลาด'); return; }
    clearCustomerForm();
    loadCustomers(function () { renderCustomers(); });
  });
}
function deleteCustomer(id) {
  if (!confirm('ต้องการลบ?')) return;
  showLoading('กำลังลบ...');
  gasPost({ action: 'deleteCustomer', id: id }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { alert('เกิดข้อผิดพลาด'); return; }
    cache.customers = cache.customers.filter(function (c) { return c.id !== id; });
    renderCustomers();
  });
}
function editCustomer(id) {
  var c = cache.customers.find(function (x) { return x.id === id; });
  if (!c) return;
  document.getElementById('c_pea').value = c.pea || '';
  document.getElementById('c_name').value = c.name || '';
  document.getElementById('c_address').value = c.address || '';
  document.getElementById('c_branch').value = c.branch || '';
  document.getElementById('c_editId').value = c.id;
}
function clearCustomerForm() {
  ['c_pea', 'c_name', 'c_address', 'c_branch', 'c_editId']
    .forEach(function (id) { document.getElementById(id).value = ''; });
}
function renderCustomers() {
  var kw = gv('custSearch').toLowerCase();
  var shown = kw ? cache.customers.filter(function (c) { return (c.pea || '').includes(kw) || (c.name || '').toLowerCase().includes(kw); }) : cache.customers;
  var h = '<table><thead><tr><th>ลำดับ</th><th>PEA</th><th>ชื่อ</th><th>ที่อยู่</th><th>สาขา</th><th>จัดการ</th></tr></thead><tbody>';
  if (!shown.length) h += '<tr><td colspan="6" style="text-align:center;color:#9ca3af;padding:20px">ไม่มีรายการ</td></tr>';
  shown.forEach(function (c, i) {
    var cid = c.id.replace(/'/g, "\\'");
    h += '<tr><td>' + (i + 1) + '</td><td><b>' + esc(c.pea || '') + '</b></td><td>' + esc(c.name || '') + '</td><td>' + esc(c.address || '-') + '</td><td>' + esc(c.branch || '-') + '</td>';
    h += '<td style="white-space:nowrap"><button class="btn btn-outline btn-sm" onclick="editCustomer(\'' + cid + '\')">แก้ไข</button> <button class="btn btn-danger btn-sm" onclick="deleteCustomer(\'' + cid + '\')">ลบ</button></td></tr>';
  });
  h += '</tbody></table>';
  document.getElementById('customerTable').innerHTML = h;
}

// ==============================================
// CSV IMPORT CUSTOMERS
// ==============================================

function importCustRowsFromCache() { importCustRows(_csvCustRowsCache); }
function handleCustCsvDrop(e) { e.preventDefault(); e.currentTarget.classList.remove('dragover'); if (e.dataTransfer.files[0]) processCustCsv(e.dataTransfer.files[0]); }
function handleCustCsvFile(inp) { if (inp.files[0]) processCustCsv(inp.files[0]); }
function processCustCsv(file) {
  parseFile(file, function (allRows) {
    var si = 0;
    if (allRows.length) { var fl = String(allRows[0][0] || '').toLowerCase(); if (fl.includes('pea') || fl.includes('เลข')) si = 1; }
    var rows = [];
    for (var i = si; i < allRows.length; i++) {
      var cols = allRows[i];
      if (!cols[0] || !cols[1]) continue;
      rows.push({ pea: String(cols[0] || '').trim(), name: String(cols[1] || '').trim(), address: String(cols[2] || '').trim(), branch: String(cols[3] || '').trim() });
    }
    if (!rows.length) { document.getElementById('csvCustPreview').innerHTML = '<div class="alert alert-danger">ไม่พบข้อมูล</div>'; return; }
    _csvCustRowsCache = rows;
    var ph = '<div class="alert alert-info">พบ ' + rows.length + ' รายการ</div>';
    ph += '<div style="display:flex;gap:10px"><button class="btn btn-success btn-sm" onclick="importCustRowsFromCache()">นำเข้าทั้งหมด</button><button class="btn btn-outline btn-sm" onclick="document.getElementById(\'csvCustPreview\').innerHTML=\'\'">ยกเลิก</button></div>';
    document.getElementById('csvCustPreview').innerHTML = ph;
  });
}
function importCustRows(rows) {
  showLoading('กำลังนำเข้า...');
  gasPost({ action: 'batchAdd', collection: 'customers', rows: rows }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { alert('เกิดข้อผิดพลาด'); return; }
    document.getElementById('csvCustPreview').innerHTML = '<div class="alert alert-success">นำเข้า ' + rows.length + ' รายการ!</div>';
    loadCustomers(function () { renderCustomers(); });
  });
}

// ==============================================
// MATERIALS
// ==============================================

function getFormMaterials() { return cache.materials.filter(function (m) { return m.inuse === 'ใช้'; }); }
function saveMaterial() {
  var code = gv('m_code'), desc = gv('m_desc'), unit = gv('m_unit'),
    price = parseFloat(gv('m_price')) || 0, type = gv('m_type'),
    inuse = document.getElementById('m_inuse').value, editId = gv('m_editId');
  if (!code || !desc || !price) { alert('กรุณากรอกรหัส รายละเอียด ราคากลาง'); return; }
  var data = { code: code, desc: desc, unit: unit, price: price, type: type, inuse: inuse };
  showLoading('กำลังบันทึก...');
  var params = editId ? { action: 'updateMaterial', id: editId, data: data } : { action: 'addMaterial', data: data };
  gasPost(params, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { alert('เกิดข้อผิดพลาด'); return; }
    clearMaterialForm();
    loadMaterials(function () { renderMaterials(); });
  });
}
function deleteMaterial(id) {
  if (!confirm('ต้องการลบ?')) return;
  showLoading('กำลังลบ...');
  gasPost({ action: 'deleteMaterial', id: id }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { alert('เกิดข้อผิดพลาด'); return; }
    cache.materials = cache.materials.filter(function (m) { return m.id !== id; });
    renderMaterials(); renderMatTable();
  });
}
function editMaterial(id) {
  var m = cache.materials.find(function (x) { return x.id === id; });
  if (!m) return;
  document.getElementById('m_code').value = m.code;
  document.getElementById('m_desc').value = m.desc;
  document.getElementById('m_unit').value = m.unit || '';
  document.getElementById('m_price').value = m.price;
  document.getElementById('m_type').value = m.type || '';
  document.getElementById('m_inuse').value = m.inuse || 'ใช้';
  document.getElementById('m_editId').value = m.id;
}
function clearMaterialForm() {
  ['m_code', 'm_desc', 'm_unit', 'm_price', 'm_type', 'm_editId']
    .forEach(function (id) { document.getElementById(id).value = ''; });
  document.getElementById('m_inuse').value = 'ใช้';
}
function renderMaterials() {
  var f = document.querySelector('input[name="matFilter"]:checked');
  f = f ? f.value : 'all';
  var shown = f === 'all' ? cache.materials : cache.materials.filter(function (m) { return m.inuse === f; });
  var h = '<table><thead><tr><th>ลำดับ</th><th>รหัส</th><th>รายละเอียด</th><th>หน่วย</th><th>ราคากลาง</th><th>ประเภท</th><th>ใช้งาน</th><th>ค่าบริการ</th><th>จัดการ</th></tr></thead><tbody>';
  if (!shown.length) h += '<tr><td colspan="9" style="text-align:center;color:#9ca3af;padding:20px">ไม่มีรายการ</td></tr>';
  shown.forEach(function (m, i) {
    var mid = m.id.replace(/'/g, "\\'");
    var bc = m.inuse === 'ใช้' ? 'badge-green' : 'badge-gray';
    h += '<tr><td>' + (i + 1) + '</td><td><b>' + esc(m.code) + '</b></td><td>' + esc(m.desc) + '</td><td>' + esc(m.unit || '-') + '</td>';
    h += '<td style="text-align:right">' + fmt(m.price) + '</td>';
    h += '<td><span class="badge badge-blue">' + esc(m.type || '-') + '</span></td>';
    h += '<td><span class="badge ' + bc + '">' + esc(m.inuse || 'ใช้') + '</span></td>';
    h += '<td style="text-align:right;font-weight:600;color:#4a1660">' + fmt(m.price * 1.31 * 1.15) + '</td>';
    h += '<td style="white-space:nowrap"><button class="btn btn-outline btn-sm" onclick="editMaterial(\'' + mid + '\')">แก้ไข</button> <button class="btn btn-danger btn-sm" onclick="deleteMaterial(\'' + mid + '\')">ลบ</button></td></tr>';
  });
  h += '</tbody></table>';
  document.getElementById('materialTable').innerHTML = h;
  var cnt = document.getElementById('matCount');
  if (cnt) cnt.textContent = 'แสดง ' + shown.length + ' / ' + cache.materials.length + ' รายการ';
}

// ==============================================
// CSV IMPORT MATERIALS
// ==============================================

function importCsvRowsFromCache() { importCsvRows(_csvMatRowsCache); }
function handleCsvDrop(e) { e.preventDefault(); e.currentTarget.classList.remove('dragover'); if (e.dataTransfer.files[0]) processCsvFile(e.dataTransfer.files[0]); }
function handleCsvFile(inp) { if (inp.files[0]) processCsvFile(inp.files[0]); }
function processCsvFile(file) {
  parseFile(file, function (allRows) {
    var si = 0;
    if (allRows.length) { var fl = String(allRows[0][0] || '').toLowerCase(); if (fl.includes('รหัส') || fl.includes('code')) si = 1; }
    var rows = [];
    for (var i = si; i < allRows.length; i++) {
      var cols = allRows[i];
      if (!cols[0] || !cols[1]) continue;
      var price = parseFloat(cols[3]);
      if (isNaN(price) || price <= 0) continue;
      var inuse = String(cols[5] || 'ใช้').trim();
      if (inuse !== 'ใช้' && inuse !== 'ไม่ใช้') inuse = 'ใช้';
      rows.push({ code: String(cols[0] || '').trim(), desc: String(cols[1] || '').trim(), unit: String(cols[2] || '').trim(), price: price, type: String(cols[4] || '').trim(), inuse: inuse });
    }
    if (!rows.length) { document.getElementById('csvPreview').innerHTML = '<div class="alert alert-danger">ไม่พบข้อมูล</div>'; return; }
    _csvMatRowsCache = rows;
    var ph = '<div class="alert alert-info">พบ ' + rows.length + ' รายการ</div>';
    ph += '<div style="display:flex;gap:10px"><button class="btn btn-success btn-sm" onclick="importCsvRowsFromCache()">นำเข้าทั้งหมด</button><button class="btn btn-outline btn-sm" onclick="document.getElementById(\'csvPreview\').innerHTML=\'\'">ยกเลิก</button></div>';
    document.getElementById('csvPreview').innerHTML = ph;
  });
}
function importCsvRows(rows) {
  showLoading('กำลังนำเข้า...');
  gasPost({ action: 'batchAdd', collection: 'materials', rows: rows }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { alert('เกิดข้อผิดพลาด'); return; }
    document.getElementById('csvPreview').innerHTML = '<div class="alert alert-success">นำเข้า ' + rows.length + ' รายการ!</div>';
    loadMaterials(function () { renderMaterials(); });
  });
}

// ==============================================
// RECORDS — SAVE
// ==============================================

function saveRecord() {
  var mins = parseFloat(document.getElementById('part2Minutes').value) || 0;
  var p1 = document.getElementById('part1Check').checked ? 570 : 0;
  var p2 = mins * 9.5;
  var p3 = 0;
  matRows.forEach(function (r) { p3 += r.price * r.qty * 1.31 * 1.15; });
  var total = p1 + p2 + p3;
  var photoUrls = { meter: [null], work: [null, null], equip: [null, null] };
  ['meter', 'work', 'equip'].forEach(function (g) {
    photoData[g].forEach(function (p, idx) {
      if (p && p.url) photoUrls[g][idx] = p.url;
      else if (typeof p === 'string') photoUrls[g][idx] = p;
      else photoUrls[g][idx] = null;
    });
  });
  var rec = {
    savedBy: currentUser.name, savedById: currentUser.id, savedAt: Date.now(),
    branch: gv('f_branch'), pea: gv('f_pea'), customer: gv('f_customer'),
    address: gv('f_address'), coords: gv('f_coords'), datetime: getDatetimeValue(),
    part1: p1, part2Minutes: mins, part2: p2,
    materials: JSON.stringify(matRows),
    part3: p3, total: total, vat: total * 0.07, grand: total * 1.07,
    provider: gv('f_provider'), position: gv('f_position'),
    receiver: gv('f_receiver'), phone: gv('f_phone'),
    signature: sigData || null, photos: JSON.stringify(photoUrls)
  };
  showLoading('กำลังบันทึกรายการ...');
  gasPost({ action: 'addRecord', data: rec }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { alert('เกิดข้อผิดพลาด'); return; }
    alert('บันทึกรายการสำเร็จ!');
    resetForm(); renderHistory();
  });
}

function resetForm() {
  ['f_pea', 'f_customer', 'f_address', 'f_receiver', 'f_phone']
    .forEach(function (id) { document.getElementById(id).value = ''; });
  document.getElementById('f_customer').readOnly = false;
  document.getElementById('f_address').readOnly = false;
  document.getElementById('peaMatchLabel').innerHTML = '';
  document.getElementById('peaHint').style.display = 'none';
  if (currentUser) {
    document.getElementById('f_provider').value = currentUser.name || '';
    document.getElementById('f_position').value = currentUser.position || '';
    document.getElementById('f_branch').value = currentUser.branch || '';
  }
  document.getElementById('part1Check').checked = false;
  document.getElementById('part1Label').classList.remove('checked');
  document.getElementById('part2Minutes').value = '';
  document.getElementById('part2Total').value = '';
  matRows = []; renderMatTable();
  resetPhotoSlots(); clearSignature();
  setNow(); getLocation(); calcAll();
}
function clearForm() { if (!confirm('ต้องการล้างแบบฟอร์ม?')) return; resetForm(); }

// ==============================================
// HISTORY
// ==============================================

function renderHistory() {
  var kw = gv('histSearch').toLowerCase();
  showLoading('กำลังโหลดประวัติ...');
  gasPost({ action: 'getRecords' }, function (err, r) {
    hideLoading();
    _historyRecsCache = (r && r.rows) ? r.rows : [];
    // parse materials/photos จาก string กลับเป็น object
    _historyRecsCache.forEach(function (rec) {
      if (typeof rec.materials === 'string') { try { rec.materials = JSON.parse(rec.materials); } catch (e) { rec.materials = []; } }
      if (typeof rec.photos === 'string') { try { rec.photos = JSON.parse(rec.photos); } catch (e) { rec.photos = {}; } }
    });
    _historyRecsCache.sort(function (a, b) { return (b.savedAt || 0) - (a.savedAt || 0); });
    var recs = _historyRecsCache.slice();
    if (currentUser.role !== 'admin') {
      recs = recs.filter(function (rec) { return String(rec.savedById) === String(currentUser.id); });
    }
    if (kw) {
      recs = recs.filter(function (rec) {
        return (rec.pea || '').includes(kw) || (rec.customer || '').toLowerCase().includes(kw)
          || (rec.branch || '').toLowerCase().includes(kw) || (rec.savedBy || '').toLowerCase().includes(kw);
      });
    }
    var cnt = document.getElementById('histCount');
    if (cnt) cnt.textContent = 'แสดง ' + recs.length + ' รายการ';
    var isAdmin = currentUser.role === 'admin';
    var h = '';
    if (!recs.length) {
      h = '<p style="color:#9ca3af;text-align:center;padding:24px">ยังไม่มีรายการ</p>';
    } else {
      h = '<div style="overflow-x:auto"><table><thead><tr><th>วันที่</th><th>ผู้ใช้ไฟฟ้า</th><th>PEA</th><th>สาขา</th><th>รวมทั้งสิ้น</th><th>บันทึกโดย</th><th></th></tr></thead><tbody>';
      recs.forEach(function (rec) {
        var dt = rec.savedAt ? new Date(rec.savedAt).toLocaleString('th-TH') : '';
        var canEdit = isAdmin || String(rec.savedById) === String(currentUser.id);
        var rid = rec.id.replace(/'/g, "\\'");
        h += '<tr><td>' + dt + '</td><td>' + esc(rec.customer || '-') + '</td><td>' + esc(rec.pea || '-') + '</td><td>' + esc(rec.branch || '-') + '</td>';
        h += '<td style="text-align:right;font-weight:600">' + fmt(rec.grand) + ' B</td><td>' + esc(rec.savedBy || '-') + '</td>';
        h += '<td style="white-space:nowrap;display:flex;gap:4px"><button class="btn btn-outline btn-sm" onclick="viewRecord(\'' + rid + '\')">ดู</button>';
        if (canEdit) {
          h += '<button class="btn btn-warning btn-sm" onclick="openEditRecordById(\'' + rid + '\')">แก้ไข</button>';
          h += '<button class="btn btn-danger btn-sm" onclick="deleteRecord(\'' + rid + '\')">ลบ</button>';
        }
        h += '</td></tr>';
      });
      h += '</tbody></table></div>';
    }
    document.getElementById('historyTable').innerHTML = h;
    var delAll = document.getElementById('histDeleteAll');
    if (delAll && currentUser.role === 'admin' && recs.length) {
      delAll.innerHTML = '<button class="btn btn-danger btn-sm" onclick="deleteAllRecords()"><i class="fa fa-trash"></i> ลบประวัติทั้งหมด (' + recs.length + ')</button>';
    } else if (delAll) { delAll.innerHTML = ''; }
  });
}

function deleteRecord(id) {
  if (!confirm('ต้องการลบ?')) return;
  showLoading('กำลังลบ...');
  gasPost({ action: 'deleteRecord', id: id }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { alert('เกิดข้อผิดพลาด'); return; }
    renderHistory();
  });
}

function openEditRecordById(id) {
  var rec = _historyRecsCache.find(function (x) { return String(x.id) === String(id); })
    || (_currentHistoryRecs || []).find(function (x) { return String(x.id) === String(id); });
  if (!rec) { alert('ไม่พบรายการ'); return; }
  openEditRecord(id, rec);
}
function openEditRecord(id, rec) {
  document.getElementById('er_branch').value = rec.branch || '';
  document.getElementById('er_pea').value = rec.pea || '';
  document.getElementById('er_customer').value = rec.customer || '';
  document.getElementById('er_address').value = rec.address || '';
  document.getElementById('er_provider').value = rec.provider || '';
  document.getElementById('er_position').value = rec.position || '';
  document.getElementById('er_receiver').value = rec.receiver || '';
  document.getElementById('er_phone').value = rec.phone || '';
  document.getElementById('er_datetime').value = rec.datetime || '';
  document.getElementById('er_id').value = id;
  document.getElementById('editRecordAlert').innerHTML = '';
  document.getElementById('editRecordModal').style.display = 'flex';
}
function closeEditRecord() { document.getElementById('editRecordModal').style.display = 'none'; }
function saveEditRecord() {
  var id = document.getElementById('er_id').value;
  var data = {
    branch: gv('er_branch'), pea: gv('er_pea'), customer: gv('er_customer'),
    address: gv('er_address'), provider: gv('er_provider'), position: gv('er_position'),
    receiver: gv('er_receiver'), phone: gv('er_phone'), datetime: gv('er_datetime'),
    editedBy: currentUser.name, editedAt: Date.now()
  };
  showLoading('กำลังบันทึก...');
  gasPost({ action: 'updateRecord', id: id, data: data }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { showAlert('editRecordAlert', 'เกิดข้อผิดพลาด', 'danger'); return; }
    showAlert('editRecordAlert', 'บันทึกสำเร็จ', 'success');
    setTimeout(function () { closeEditRecord(); renderHistory(); }, 1000);
  });
}

// ==============================================
// VIEW RECORD (print window) — คงเดิมทั้งหมด
// ==============================================

function viewRecord(id) {
  var rec = _historyRecsCache.find(function (x) { return String(x.id) === String(id); })
    || (_currentHistoryRecs || []).find(function (x) { return String(x.id) === String(id); })
    || (_allRecsCache || []).find(function (x) { return String(x.id) === String(id); });
  if (!rec) { alert('ไม่พบรายการ'); return; }
  var mats = rec.materials;
  if (typeof mats === 'string') { try { mats = JSON.parse(mats); } catch (e) { mats = []; } }
  var mt = '';
  (mats || []).forEach(function (m, i) {
    mt += '<tr><td style="text-align:center">' + (i + 1) + '</td><td>' + esc(m.code) + '</td><td>' + esc(m.desc) + '</td><td style="text-align:center">' + m.qty + '</td><td style="text-align:center">' + esc(m.unit || '') + '</td></tr>';
  });
  var ph = rec.photos;
  if (typeof ph === 'string') { try { ph = JSON.parse(ph); } catch (e) { ph = {}; } }
  var phtml = '';
  if (ph) {
    var ni = '<div style="background:#eee;height:60px;display:flex;align-items:center;justify-content:center;border-radius:4px;color:#999;font-size:10px">ไม่มีรูป</div>';
    phtml = '<div style="margin-top:8px"><div style="font-weight:700;font-size:11px;color:#4a1660;margin-bottom:4px">ภาพถ่ายประกอบ</div><table style="width:100%;border:none"><tr>';
    var m0 = ph.meter && ph.meter[0];
    phtml += '<td style="width:20%;border:none;padding:2px;vertical-align:top;font-size:10px"><b>มิเตอร์</b><br>' + (m0 ? '<img src="' + driveImg(m0) + '" style="width:100%;border-radius:3px">' : ni) + '</td>';
    phtml += '<td style="width:40%;border:none;padding:2px;vertical-align:top;font-size:10px"><b>ปฏิบัติงาน</b><br><div style="display:flex;gap:3px">';
    for (var wi = 0; wi < 2; wi++) { var w = ph.work && ph.work[wi]; phtml += w ? '<img src="' + driveImg(w) + '" style="width:50%;border-radius:3px">' : '<div style="width:50%">' + ni + '</div>'; }
    phtml += '</div></td>';
    phtml += '<td style="width:40%;border:none;padding:2px;vertical-align:top;font-size:10px"><b>อุปกรณ์แก้ไข</b><br><div style="display:flex;gap:3px">';
    for (var ei = 0; ei < 2; ei++) { var eq = ph.equip && ph.equip[ei]; phtml += eq ? '<img src="' + driveImg(eq) + '" style="width:50%;border-radius:3px">' : '<div style="width:50%">' + ni + '</div>'; }
    phtml += '</div></td></tr></table></div>';
  }
  var r = [];
  r.push('<div style="text-align:center;margin-bottom:8px"><div style="font-size:16px;font-weight:700;color:#4a1660">การไฟฟ้าส่วนภูมิภาค</div>');
  r.push('<div style="font-size:13px;font-weight:700;color:#4a1660">ค่าบริการงานแก้กระแสไฟฟ้าขัดข้อง (บร.1)</div><hr style="border:1px solid #4a1660;margin:6px 0"></div>');
  r.push('<table style="width:100%;border:none;margin-bottom:6px;font-size:12px">');
  r.push('<tr><td style="border:none;padding:2px"><b>กฟภ.สาขา:</b> ' + esc(rec.branch) + '</td><td style="border:none;padding:2px"><b>PEA:</b> ' + esc(rec.pea) + '</td></tr>');
  r.push('<tr><td style="border:none;padding:2px"><b>ผู้ใช้ไฟฟ้า:</b> ' + esc(rec.customer) + '</td><td style="border:none;padding:2px"><b>ที่อยู่:</b> ' + esc(rec.address) + '</td></tr>');
  r.push('<tr><td style="border:none;padding:2px"><b>พิกัด:</b> ' + esc(rec.coords) + '</td><td style="border:none;padding:2px"><b>วันที่:</b> ' + esc(rec.datetime) + '</td></tr></table>');
  if (mt) {
    r.push('<div style="font-weight:700;color:#4a1660;font-size:12px;margin:6px 0 3px;border-bottom:1px solid #4a1660;padding-bottom:3px">รายการพัสดุ</div>');
    r.push('<table><thead><tr style="background:#4a1660;color:#fff;font-size:11px"><th style="padding:4px">ลำดับ</th><th style="padding:4px">รหัส</th><th style="padding:4px">รายละเอียด</th><th style="padding:4px">จำนวน</th><th style="padding:4px">หน่วย</th></tr></thead><tbody style="font-size:11px">' + mt + '</tbody></table>');
  }
  r.push('<div style="font-weight:700;color:#4a1660;font-size:12px;margin:8px 0 3px;border-bottom:1px solid #4a1660;padding-bottom:3px">สรุปค่าบริการ</div>');
  r.push('<table style="font-size:12px"><thead><tr style="background:#4a1660;color:#fff"><th style="padding:4px;width:40px">ลำดับ</th><th style="padding:4px">รายการ</th><th style="padding:4px;text-align:right;width:120px">จำนวนเงิน (บาท)</th></tr></thead><tbody>');
  r.push('<tr><td style="text-align:center;padding:4px">1</td><td style="padding:4px">ปลด-สับอุปกรณ์ตัดตอนแรงสูง</td><td style="text-align:right;padding:4px">' + fmt(rec.part1) + '</td></tr>');
  r.push('<tr><td style="text-align:center;padding:4px">2</td><td style="padding:4px">ค่าบริการตรวจสอบ (' + rec.part2Minutes + ' นาที x 9.50)</td><td style="text-align:right;padding:4px">' + fmt(rec.part2) + '</td></tr>');
  r.push('<tr><td style="text-align:center;padding:4px">3</td><td style="padding:4px">ค่าอุปกรณ์ในการแก้ไข</td><td style="text-align:right;padding:4px">' + fmt(rec.part3) + '</td></tr>');
  r.push('<tr style="background:#f5eefa;font-weight:700"><td colspan="2" style="text-align:right;padding:4px">ยอดรวม</td><td style="text-align:right;padding:4px">' + fmt(rec.total) + '</td></tr>');
  r.push('<tr style="background:#f5eefa"><td colspan="2" style="text-align:right;padding:4px">ภาษีมูลค่าเพิ่ม 7%</td><td style="text-align:right;padding:4px">' + fmt(rec.vat) + '</td></tr>');
  r.push('<tr style="background:#4a1660;color:#fff;font-weight:700;font-size:14px"><td colspan="2" style="text-align:right;padding:5px">รวมทั้งสิ้น</td><td style="text-align:right;padding:5px">' + fmt(rec.grand) + '</td></tr>');
  r.push('</tbody></table>');
  r.push(phtml);
  r.push('<table style="width:100%;border:none;margin-top:10px;font-size:12px"><tr>');
  r.push('<td style="width:50%;border:none;padding:4px;vertical-align:top"><b style="color:#4a1660">ผู้ให้บริการ</b><br>ชื่อ: ' + esc(rec.provider) + '<br>ตำแหน่ง: ' + esc(rec.position) + '<div style="margin-top:20px;border-bottom:1px dotted #999;width:180px"></div><div style="font-size:10px;color:#999;margin-top:2px">ลงชื่อผู้ให้บริการ</div></td>');
  r.push('<td style="width:50%;border:none;padding:4px;vertical-align:top"><b style="color:#4a1660">ผู้รับบริการ</b><br>ชื่อ: ' + esc(rec.receiver) + '<br>');
  if (rec.signature) r.push('<div style="margin-top:4px"><img src="' + rec.signature + '" style="max-width:180px;max-height:60px"></div>');
  r.push('โทร: ' + esc(rec.phone) + '<div style="margin-top:20px;border-bottom:1px dotted #999;width:180px"></div><div style="font-size:10px;color:#999;margin-top:2px">ลงชื่อผู้รับบริการ</div></td></tr></table>');
  if (rec.editedAt) r.push('<p style="margin-top:6px;font-size:10px;color:#9ca3af">แก้ไขล่าสุด: ' + new Date(rec.editedAt).toLocaleString('th-TH') + ' โดย ' + esc(rec.editedBy) + '</p>');
  var body = r.join('');
  var w2 = window.open('', '_blank', 'width=800,height=900');
  var css = 'body{font-family:Sarabun,sans-serif;padding:15px;color:#1a202c;max-width:720px;margin:0 auto;font-size:12px}table{width:100%;border-collapse:collapse}th,td{padding:4px 6px;border:1px solid #ddd}th{background:#4a1660;color:#fff}p{margin:2px 0}@media print{.no-print{display:none!important}body{padding:10px}@page{size:A4;margin:10mm}}';
  var hh = '<html><head><meta charset=UTF-8><link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700&display=swap" rel="stylesheet"><style>' + css + '</style></head><body><div id=RC></div><div class="no-print" style="text-align:center;margin-top:12px"><button onclick=window.print() style="padding:8px 24px;background:#4a1660;color:#fff;border:none;border-radius:6px;cursor:pointer;font-family:Sarabun;font-size:14px;font-weight:600">Print</button></div></body></html>';
  w2.document.open(); w2.document.write(hh); w2.document.close();
  w2.document.getElementById('RC').innerHTML = body;
}

// ==============================================
// ADMIN USERS
// ==============================================

function renderUsers() {
  showLoading('กำลังโหลดผู้ใช้...');
  gasPost({ action: 'getUsers' }, function (err, r) {
    _usersCache = (r && r.rows) ? r.rows : [];
    gasPost({ action: 'getRecords' }, function (err2, r2) {
      hideLoading();
      _allRecsCache = (r2 && r2.rows) ? r2.rows : [];
      var h = '<div style="overflow-x:auto"><table><thead><tr><th>ชื่อ</th><th>รหัส</th><th>รหัสผ่าน</th><th>สาขา</th><th>ตำแหน่ง</th><th>บทบาท</th><th>สถานะ</th><th>จัดการ</th></tr></thead><tbody>';
      _usersCache.forEach(function (u) {
        var badge = u.status === 'approved' ? 'badge-green' : u.status === 'pending' ? 'badge-yellow' : 'badge-red';
        var stTH = u.status === 'approved' ? 'อนุมัติแล้ว' : u.status === 'pending' ? 'รออนุมัติ' : 'ปฏิเสธ';
        var recCount = _allRecsCache.filter(function (rec) { return String(rec.savedById) === String(u.id); }).length;
        var uid = u.id.replace(/'/g, "\\'");
        var rc = u.role === 'admin' ? 'badge-blue' : 'badge-green';
        h += '<tr><td>' + esc(u.name) + '</td><td><code>' + esc(u.username) + '</code></td><td><code>' + esc(u.password || '') + '</code></td><td>' + esc(u.branch || '-') + '</td><td>' + esc(u.position || '-') + '</td>';
        h += '<td><span class="badge ' + rc + '">' + u.role + '</span></td><td><span class="badge ' + badge + '">' + stTH + '</span></td>';
        h += '<td><div style="display:flex;gap:4px;flex-wrap:wrap"><button class="btn btn-warning btn-sm" onclick="openEditUserById(\'' + uid + '\')">แก้ไข</button>';
        h += '<button class="btn btn-outline btn-sm" onclick="openUserHistoryById(\'' + uid + '\')">ประวัติ' + (recCount > 0 ? ' <span style="background:#742582;color:#fff;border-radius:20px;padding:1px 6px;font-size:11px">' + recCount + '</span>' : '') + '</button>';
        if (u.status === 'pending') {
          h += '<button class="btn btn-success btn-sm" onclick="approveUser(\'' + uid + '\')">OK</button>';
          h += '<button class="btn btn-danger btn-sm" onclick="rejectUser(\'' + uid + '\')">X</button>';
        }
        if (u.id !== currentUser.id) h += '<button class="btn btn-danger btn-sm" onclick="deleteUser(\'' + uid + '\')">ลบ</button>';
        h += '</div></td></tr>';
      });
      h += '</tbody></table></div>';
      document.getElementById('userTable').innerHTML = h;
    });
  });
}

function approveUser(id) {
  showLoading('กำลังอัปเดต...');
  gasPost({ action: 'updateUser', id: id, data: { status: 'approved' } }, function (err, r) { hideLoading(); renderUsers(); });
}
function rejectUser(id) {
  showLoading('กำลังอัปเดต...');
  gasPost({ action: 'updateUser', id: id, data: { status: 'rejected' } }, function (err, r) { hideLoading(); renderUsers(); });
}
function deleteUser(id) {
  if (!confirm('ต้องการลบผู้ใช้?')) return;
  showLoading('กำลังลบ...');
  gasPost({ action: 'deleteUser', id: id }, function (err, r) { hideLoading(); renderUsers(); });
}
function openEditUserById(id) { var u = _usersCache.find(function (x) { return String(x.id) === String(id); }); if (u) openEditUser(u); }
function openUserHistoryById(id) { var u = _usersCache.find(function (x) { return String(x.id) === String(id); }); if (u) openUserHistory(id, u.name, _allRecsCache); }
function openEditUser(u) {
  document.getElementById('eu_id').value = u.id;
  document.getElementById('eu_name').value = u.name || '';
  document.getElementById('eu_username').value = u.username || '';
  document.getElementById('eu_email').value = u.email || '';
  document.getElementById('eu_position').value = u.position || '';
  document.getElementById('eu_branch').value = u.branch || '';
  document.getElementById('euBranchDropdown').style.display = 'none';
  document.getElementById('eu_role').value = u.role || 'user';
  document.getElementById('eu_status').value = u.status || 'approved';
  document.getElementById('eu_password').value = '';
  document.getElementById('editUserAlert').innerHTML = '';
  document.getElementById('editUserModal').style.display = 'flex';
}
function closeEditUser() { document.getElementById('editUserModal').style.display = 'none'; }
function saveEditUser() {
  var id = document.getElementById('eu_id').value;
  var name = gv('eu_name'), email = gv('eu_email'), position = gv('eu_position'),
    branch = gv('eu_branch'), role = gv('eu_role'), status = gv('eu_status'),
    newpass = document.getElementById('eu_password').value.trim();
  if (!name) { showAlert('editUserAlert', 'กรุณากรอกชื่อ', 'danger'); return; }
  var data = { name: name, email: email, position: position, branch: branch, role: role, status: status };
  if (newpass) data.password = newpass;
  showLoading('กำลังบันทึก...');
  gasPost({ action: 'updateUser', id: id, data: data }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { showAlert('editUserAlert', 'เกิดข้อผิดพลาด', 'danger'); return; }
    showAlert('editUserAlert', 'บันทึกสำเร็จ', 'success');
    setTimeout(function () { closeEditUser(); renderUsers(); }, 900);
  });
}

function openUserHistory(userId, userName, allRecs) {
  _currentHistoryRecs = allRecs || [];
  _currentHistoryUserId = userId;
  _currentHistoryUserName = userName;
  document.getElementById('userHistoryTitle').textContent = 'ประวัติ บร.1 ของ: ' + userName;
  var recs = _currentHistoryRecs.filter(function (rec) { return String(rec.savedById) === String(userId); });
  var h = '';
  if (!recs.length) {
    h = '<p style="color:#9ca3af;text-align:center;padding:24px">ยังไม่มีรายการ</p>';
  } else {
    h = '<div style="margin-bottom:8px;font-size:13px;color:#6b7280">พบ ' + recs.length + ' รายการ</div>';
    h += '<div style="overflow-x:auto"><table><thead><tr><th>วันที่</th><th>ผู้ใช้ไฟฟ้า</th><th>PEA</th><th>สาขา</th><th>รวมทั้งสิ้น</th><th></th></tr></thead><tbody>';
    recs.forEach(function (rec) {
      var dt = rec.savedAt ? new Date(rec.savedAt).toLocaleString('th-TH') : '';
      var rid = rec.id.replace(/'/g, "\\'");
      h += '<tr><td>' + dt + '</td><td>' + esc(rec.customer || '-') + '</td><td>' + esc(rec.pea || '-') + '</td><td>' + esc(rec.branch || '-') + '</td>';
      h += '<td style="text-align:right;font-weight:600;color:#4a1660">' + fmt(rec.grand) + ' B</td>';
      h += '<td style="white-space:nowrap;display:flex;gap:4px"><button class="btn btn-outline btn-sm" onclick="viewRecord(\'' + rid + '\')">ดู</button><button class="btn btn-warning btn-sm" onclick="openEditRecordById(\'' + rid + '\');closeUserHistory()">แก้ไข</button><button class="btn btn-danger btn-sm" onclick="deleteRecordFromModal(\'' + rid + '\')">ลบ</button></td></tr>';
    });
    h += '</tbody></table></div>';
  }
  document.getElementById('userHistoryContent').innerHTML = h;
  document.getElementById('userHistoryModal').style.display = 'flex';
}
function closeUserHistory() { document.getElementById('userHistoryModal').style.display = 'none'; }
function deleteRecordFromModal(recId) {
  if (!confirm('ต้องการลบ?')) return;
  showLoading('กำลังลบ...');
  gasPost({ action: 'deleteRecord', id: recId }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { alert('เกิดข้อผิดพลาด'); return; }
    _currentHistoryRecs = _currentHistoryRecs.filter(function (rec) { return String(rec.id) !== String(recId); });
    renderHistory();
    openUserHistory(_currentHistoryUserId, _currentHistoryUserName, _currentHistoryRecs);
  });
}

// ==============================================
// MAT TABLE
// ==============================================

function addMat() { matRows.push({ id: Date.now(), code: '', desc: '', unit: '', qty: 1, price: 0 }); renderMatTable(); }
function renderMatTable() {
  var h = '';
  matRows.forEach(function (row) {
    var displayVal = row.code ? row.code + ' | ' + row.desc : '';
    var total = row.price * row.qty * 1.31 * 1.15;
    h += '<tr><td style="position:relative"><input type="text" value="' + esc(displayVal) + '" placeholder="พิมพ์รหัสหรือชื่อ..." oninput="matSearch(' + row.id + ',this)" onfocus="matSearch(' + row.id + ',this)" style="font-size:12px">';
    h += '<div id="matDD_' + row.id + '" style="position:absolute;left:0;top:100%;min-width:350px;z-index:9999;background:#fff;border:1px solid #c084e8;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,.15);max-height:50vh;overflow-y:auto;display:none;padding:4px 0"></div></td>';
    h += '<td><input type="text" value="' + esc(row.desc) + '" readonly style="font-size:13px"></td>';
    h += '<td><input type="text" value="' + esc(row.unit) + '" readonly style="width:58px;font-size:13px"></td>';
    h += '<td><input type="number" min="1" value="' + row.qty + '" style="width:65px;font-size:13px" onchange="matQtyChange(' + row.id + ',this)"></td>';
    h += '<td class="hide-mobile"><input type="text" value="' + fmt4(row.price) + '" readonly style="font-size:13px"></td>';
    h += '<td class="hide-mobile" style="font-weight:600;color:#4a1660">' + fmt4(total) + '</td>';
    h += '<td><button class="btn btn-danger btn-sm" onclick="removeMat(' + row.id + ')">X</button></td></tr>';
  });
  if (!matRows.length) h = '<tr><td colspan="7" style="text-align:center;color:#9ca3af;padding:18px">ยังไม่มีรายการพัสดุ</td></tr>';
  document.getElementById('matBody').innerHTML = h;
  calcAll();
}
function matSearch(rowId, inp) {
  var val = inp.value.toLowerCase();
  var mats = getFormMaterials();
  var dd = document.getElementById('matDD_' + rowId);
  if (!dd) return;
  var filtered = val ? mats.filter(function (m) { return (m.code || '').toLowerCase().includes(val) || (m.desc || '').toLowerCase().includes(val); }) : mats;
  filtered.sort(function (a, b) { return (a.code || '').localeCompare(b.code || ''); });
  if (!filtered.length) { dd.innerHTML = '<div style="padding:8px;color:#9ca3af;font-size:12px">ไม่พบพัสดุ</div>'; dd.style.display = 'block'; return; }
  dd.innerHTML = '';
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:8px 12px;font-weight:700;color:#4a1660;font-size:14px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center';
  hdr.innerHTML = 'เลือกพัสดุ (' + filtered.length + ' รายการ)<span style="cursor:pointer;color:#9ca3af;font-size:20px" onclick="closeMatDD()">x</span>';
  dd.appendChild(hdr);
  filtered.slice(0, 20).forEach(function (m) {
    var item = document.createElement('div');
    item.style.cssText = 'padding:6px 10px;cursor:pointer;border-bottom:1px solid #f1f5f9;font-size:12px';
    item.innerHTML = '<b>' + esc(m.code) + '</b><span style="color:#6b7280;margin-left:6px">' + esc(m.desc) + '</span><span style="color:#4a1660;margin-left:6px;font-weight:600">' + fmt(m.price) + ' บ.</span>';
    item.onmousedown = function (e) { e.preventDefault(); matSelectItem(rowId, m); closeMatDD(); };
    item.onmouseover = function () { this.style.background = '#f5eefa'; };
    item.onmouseout = function () { this.style.background = ''; };
    dd.appendChild(item);
  });
  dd.style.display = 'block';
}
function matSelectItem(rowId, m) {
  var row = matRows.find(function (r) { return r.id === rowId; });
  if (row) { row.code = m.code; row.desc = m.desc; row.unit = m.unit || ''; row.price = m.price; }
  renderMatTable();
}
function closeMatDD() { document.querySelectorAll('[id^="matDD_"]').forEach(function (dd) { dd.style.display = 'none'; }); }
document.addEventListener('click', function (e) {
  document.querySelectorAll('[id^="matDD_"]').forEach(function (dd) {
    if (!dd.contains(e.target) && dd.previousElementSibling && !dd.previousElementSibling.contains(e.target)) dd.style.display = 'none';
  });
});
function matQtyChange(id, inp) { var row = matRows.find(function (r) { return r.id === id; }); if (row) row.qty = parseFloat(inp.value) || 1; renderMatTable(); }
function removeMat(id) { matRows = matRows.filter(function (r) { return r.id !== id; }); renderMatTable(); }

// ==============================================
// CALC
// ==============================================

function calcAll() {
  var chk = document.getElementById('part1Check');
  var p1 = chk.checked ? 570 : 0;
  document.getElementById('part1Label').classList.toggle('checked', p1 > 0);
  var mins = parseFloat(document.getElementById('part2Minutes').value) || 0;
  var p2 = mins * 9.5;
  document.getElementById('part2Total').value = fmt(p2) + ' บาท';
  var p3 = 0;
  matRows.forEach(function (r) { p3 += r.price * r.qty * 1.31 * 1.15; });
  document.getElementById('part3Total').textContent = fmt(p3);
  var total = p1 + p2 + p3, vat = total * 0.07, grand = total + vat;
  [['s1', p1], ['s2', p2], ['s3', p3], ['sTotal', total], ['sVat', vat], ['sGrand', grand]]
    .forEach(function (x) { document.getElementById(x[0]).textContent = fmt(x[1]); });
}

// ==============================================
// PHOTOS
// ==============================================

function triggerPhoto(g, i) {
  var modal = document.getElementById('photoChoiceModal');
  if (!modal) return;
  modal.style.display = 'flex';
  modal.setAttribute('data-group', g);
  modal.setAttribute('data-index', i);
}
function closePhotoChoice() { document.getElementById('photoChoiceModal').style.display = 'none'; }
function chooseCamera() {
  var modal = document.getElementById('photoChoiceModal');
  var g = modal.getAttribute('data-group'), i = parseInt(modal.getAttribute('data-index'));
  closePhotoChoice();
  var inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*'; inp.capture = 'environment';
  inp.onchange = function () { handlePhoto(g, i, inp); }; inp.click();
}
function chooseGallery() {
  var modal = document.getElementById('photoChoiceModal');
  var g = modal.getAttribute('data-group'), i = parseInt(modal.getAttribute('data-index'));
  closePhotoChoice();
  var inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*';
  inp.onchange = function () { handlePhoto(g, i, inp); }; inp.click();
}
function handlePhoto(g, i, input) {
  var file = input.files[0]; if (!file) return;
  var reader = new FileReader();
  reader.onload = function (e) {
    var img = new Image();
    img.onload = function () {
      var canvas = document.createElement('canvas'), MAX = 800, w = img.width, h = img.height;
      if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; }
      if (h > MAX) { w = Math.round(w * MAX / h); h = MAX; }
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      var b64 = canvas.toDataURL('image/jpeg', 0.7);
      renderPhotoSlot(g, i, b64);
      var fname = g + '_' + i + '_' + Date.now() + '.jpg';
      showLoading('กำลังอัปโหลดรูป...');
      fetch(PHOTO_GAS_URL, { method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ action: 'uploadPhoto', base64: b64, filename: fname }) })
        .then(function (r) { return r.json(); })
        .then(function (r) {
          hideLoading();
          if (r && r.ok) { photoData[g][i] = { url: r.url, fileId: r.fileId }; }
          else { alert('อัปโหลดรูปไม่สำเร็จ'); photoData[g][i] = null; renderPhotoSlot(g, i, null); }
        })
        .catch(function () { hideLoading(); alert('เชื่อมต่อ Google Drive ไม่ได้'); photoData[g][i] = null; renderPhotoSlot(g, i, null); });
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
function renderPhotoSlot(g, i, src) {
  var slot = document.getElementById('slot_' + g + '_' + i); if (!slot) return;
  var imgSrc = null;
  if (src) { if (typeof src === 'string') imgSrc = src; else if (src.url) imgSrc = src.url; }
  if (imgSrc) {
    slot.classList.add('has-img'); slot.querySelector('.ph').style.display = 'none';
    var img = slot.querySelector('img');
    if (!img) { img = document.createElement('img'); slot.insertBefore(img, slot.firstChild); }
    img.src = driveImg(imgSrc);
  } else {
    slot.classList.remove('has-img'); slot.querySelector('.ph').style.display = '';
    var img2 = slot.querySelector('img'); if (img2) img2.remove();
  }
}
function removePhoto(g, i, event) {
  event.stopPropagation();
  var pd = photoData[g][i];
  if (pd && pd.fileId) {
    fetch(PHOTO_GAS_URL, { method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ action: 'deletePhoto', fileId: pd.fileId }) }).catch(function () {});
  }
  photoData[g][i] = null; renderPhotoSlot(g, i, null);
  var slot = document.getElementById('slot_' + g + '_' + i);
  if (slot) { var inp = slot.querySelector('input[type=file]'); if (inp) inp.value = ''; }
}
function resetPhotoSlots() {
  photoData = { meter: [null], work: [null, null], equip: [null, null] };
  [['meter', 1], ['work', 2], ['equip', 2]].forEach(function (x) { for (var i = 0; i < x[1]; i++) renderPhotoSlot(x[0], i, null); });
}

// ==============================================
// SIGNATURE PAD
// ==============================================

var sigCanvas = null, sigCtx = null, sigDrawing = false;

function initSignature() { updateSigPreview(); }
function openSignatureModal() {
  var modal = document.getElementById('sigModal'); if (!modal) return;
  modal.style.display = 'flex';
  sigCanvas = document.getElementById('sigModalCanvas');
  var container = sigCanvas.parentElement;
  sigCanvas.width = container.offsetWidth; sigCanvas.height = container.offsetHeight;
  sigCtx = sigCanvas.getContext('2d');
  sigCtx.strokeStyle = '#1a202c'; sigCtx.lineWidth = 3; sigCtx.lineCap = 'round'; sigCtx.lineJoin = 'round';
  if (sigData) { var img = new Image(); img.onload = function () { sigCtx.drawImage(img, 0, 0, sigCanvas.width, sigCanvas.height); }; img.src = sigData; }
  sigCanvas.onmousedown = function (e) { sigDrawing = true; sigCtx.beginPath(); sigCtx.moveTo(e.offsetX, e.offsetY); };
  sigCanvas.onmousemove = function (e) { if (!sigDrawing) return; sigCtx.lineTo(e.offsetX, e.offsetY); sigCtx.stroke(); };
  sigCanvas.onmouseup = function () { sigDrawing = false; };
  sigCanvas.onmouseleave = function () { sigDrawing = false; };
  sigCanvas.ontouchstart = function (e) { e.preventDefault(); sigDrawing = true; var rect = sigCanvas.getBoundingClientRect(), t = e.touches[0]; sigCtx.beginPath(); sigCtx.moveTo(t.clientX - rect.left, t.clientY - rect.top); };
  sigCanvas.ontouchmove = function (e) { e.preventDefault(); if (!sigDrawing) return; var rect = sigCanvas.getBoundingClientRect(), t = e.touches[0]; sigCtx.lineTo(t.clientX - rect.left, t.clientY - rect.top); sigCtx.stroke(); };
  sigCanvas.ontouchend = function () { sigDrawing = false; };
}
function clearSigModal() { if (sigCanvas && sigCtx) sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height); }
function saveSigModal() { if (sigCanvas) sigData = sigCanvas.toDataURL('image/png', 0.5); document.getElementById('sigModal').style.display = 'none'; updateSigPreview(); }
function cancelSigModal() { document.getElementById('sigModal').style.display = 'none'; }
function updateSigPreview() {
  var preview = document.getElementById('sigPreview'); if (!preview) return;
  preview.innerHTML = sigData
    ? '<img src="' + sigData + '" style="max-height:60px;border:1px solid #e2e8f0;border-radius:6px"><button class="btn btn-outline btn-sm" onclick="clearSignature()" style="margin-left:8px;font-size:11px">ล้าง</button>'
    : '<span style="color:#9ca3af;font-size:13px">ยังไม่ได้เซ็นชื่อ</span>';
}
function clearSignature() { sigData = null; updateSigPreview(); }

// ==============================================
// NAV
// ==============================================

function switchTab(t) {
  ['BR1', 'History', 'Admin', 'Order'].forEach(function (x) {
    document.getElementById('tab' + x).classList.remove('active');
    var n = document.getElementById('nav' + x); if (n) n.classList.remove('active');
  });
  var map = { br1: 'BR1', history: 'History', admin: 'Admin', order: 'Order' };
  document.getElementById('tab' + map[t]).classList.add('active');
  document.getElementById('nav' + map[t]).classList.add('active');
  if (t === 'history') renderHistory();
  if (t === 'order') renderOrderTab();
  if (t === 'admin') { renderUsers(); renderBranches(); renderMaterials(); renderCustomers(); }
}
function switchAdminTab(t) {
  var tabs = ['users', 'branches', 'customers', 'settings', 'materials'];
  document.querySelectorAll('#adminTabs .tab').forEach(function (el, i) { el.classList.toggle('active', tabs[i] === t); });
  ['atUsers', 'atBranches', 'atCustomers', 'atSettings', 'atMaterials'].forEach(function (id) { document.getElementById(id).classList.remove('active'); });
  var map = { users: 'atUsers', branches: 'atBranches', customers: 'atCustomers', settings: 'atSettings', materials: 'atMaterials' };
  document.getElementById(map[t]).classList.add('active');
  if (t === 'users') renderUsers();
  if (t === 'branches') renderBranches();
  if (t === 'customers') renderCustomers();
  if (t === 'materials') renderMaterials();
  if (t === 'settings') { var inp = document.getElementById('set_refPrice'); if (inp) inp.value = appSettings.refPrice || ''; }
}

// ==============================================
// SETTINGS
// ==============================================

function saveSettings() {
  var data = { refPrice: gv('set_refPrice') };
  showLoading('กำลังบันทึก...');
  gasPost({ action: 'saveSettings', docId: 'main', data: data }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { showAlert('settingsAlert', 'เกิดข้อผิดพลาด', 'danger'); return; }
    appSettings.refPrice = data.refPrice; showRefPrice();
    showAlert('settingsAlert', 'บันทึกสำเร็จ', 'success');
  });
}
function showRefPrice() {
  var banner = document.getElementById('refPriceBanner'), text = document.getElementById('refPriceText');
  if (!banner || !text) return;
  if (appSettings.refPrice) { text.textContent = 'ราคามาตราอ้างอิง: ' + appSettings.refPrice; banner.style.display = 'flex'; }
  else banner.style.display = 'none';
}

// ==============================================
// EDIT PHOTOS IN HISTORY
// ==============================================

function openEditPhotos(recId) {
  var rec = _historyRecsCache.find(function (x) { return String(x.id) === String(recId); });
  if (!rec) { alert('ไม่พบรายการ'); return; }
  _editPhotoRecId = recId;
  var ph = rec.photos; if (typeof ph === 'string') { try { ph = JSON.parse(ph); } catch (e) { ph = {}; } }
  _editPhotoData = { meter: [ph && ph.meter ? ph.meter[0] : null], work: [ph && ph.work ? ph.work[0] : null, ph && ph.work ? ph.work[1] : null], equip: [ph && ph.equip ? ph.equip[0] : null, ph && ph.equip ? ph.equip[1] : null] };
  var h = '';
  [['meter', 'PEA มิเตอร์', 1], ['work', 'ปฏิบัติงาน', 2], ['equip', 'อุปกรณ์', 2]].forEach(function (g) {
    h += '<div style="margin-bottom:12px"><b style="color:#4a1660">' + g[1] + '</b><div style="display:flex;gap:8px;margin-top:6px">';
    for (var i = 0; i < g[2]; i++) {
      var src = _editPhotoData[g[0]][i], imgSrc = src ? driveImg(src) : '';
      h += '<div style="flex:1;position:relative">';
      h += imgSrc ? '<img src="' + imgSrc + '" style="width:100%;border-radius:6px;border:1px solid #ddd">' : '<div style="background:#f3f4f6;height:80px;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#9ca3af;font-size:12px">ไม่มีรูป</div>';
      h += '<div style="margin-top:4px;display:flex;gap:4px"><label class="btn btn-outline btn-sm" style="cursor:pointer;flex:1;justify-content:center"><i class="fa fa-camera"></i> เปลี่ยน<input type="file" accept="image/*" style="display:none" onchange="editPhotoChange(\'' + g[0] + '\',' + i + ',this)"></label>';
      if (imgSrc) h += '<button class="btn btn-danger btn-sm" onclick="editPhotoRemove(\'' + g[0] + '\',' + i + ')"><i class="fa fa-trash"></i></button>';
      h += '</div></div>';
    }
    h += '</div></div>';
  });
  document.getElementById('editPhotosContent').innerHTML = h;
  document.getElementById('editPhotosModal').style.display = 'flex';
}
function closeEditPhotos() { document.getElementById('editPhotosModal').style.display = 'none'; }
function editPhotoChange(g, i, input) {
  var file = input.files[0]; if (!file) return;
  var reader = new FileReader();
  reader.onload = function (e) {
    var img = new Image();
    img.onload = function () {
      var canvas = document.createElement('canvas'), MAX = 800, w = img.width, h = img.height;
      if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; }
      if (h > MAX) { w = Math.round(w * MAX / h); h = MAX; }
      canvas.width = w; canvas.height = h; canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      var b64 = canvas.toDataURL('image/jpeg', 0.7), fname = g + '_' + i + '_' + Date.now() + '.jpg';
      showLoading('กำลังอัปโหลดรูป...');
      fetch(PHOTO_GAS_URL, { method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ action: 'uploadPhoto', base64: b64, filename: fname }) })
        .then(function (r) { return r.json(); })
        .then(function (r) { hideLoading(); if (r && r.ok) { _editPhotoData[g][i] = r.url; openEditPhotos(_editPhotoRecId); } else alert('อัปโหลดไม่สำเร็จ'); })
        .catch(function () { hideLoading(); alert('เชื่อมต่อไม่ได้'); });
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
function editPhotoRemove(g, i) { _editPhotoData[g][i] = null; openEditPhotos(_editPhotoRecId); }
function saveEditPhotos() {
  if (!_editPhotoRecId) return;
  showLoading('กำลังบันทึกรูป...');
  gasPost({ action: 'updateRecord', id: _editPhotoRecId, data: { photos: JSON.stringify(_editPhotoData) } }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { alert('เกิดข้อผิดพลาด'); return; }
    closeEditPhotos(); renderHistory(); alert('บันทึกรูปสำเร็จ');
  });
}

// ==============================================
// MT TEMPLATE
// ==============================================

function uploadMtTemplate(input) {
  var file = input.files[0]; if (!file) return;
  if (!file.name.endsWith('.docx')) { alert('กรุณาเลือกไฟล์ .docx'); return; }
  var reader = new FileReader();
  reader.onload = function (e) {
    var b64 = e.target.result.split(',')[1], docId = getMtDocId();
    showLoading('กำลังอัปโหลด template...');
    gasPost({ action: 'saveSettings', docId: docId, data: { mtTemplateB64: b64, mtTemplateName: file.name, mtTemplateDate: Date.now() } }, function (err, r) {
      hideLoading();
      if (err || !r || !r.ok) { alert('อัปโหลดไม่สำเร็จ'); return; }
      appSettings.mtTemplateB64 = b64; appSettings.mtTemplateName = file.name; appSettings.mtTemplateDate = Date.now();
      updateTemplateInfo(); alert('อัปโหลด template สำเร็จ!');
    });
  };
  reader.readAsDataURL(file);
}
function resetMtTemplate() {
  if (!confirm('ต้องการใช้ template เริ่มต้น?')) return;
  showLoading('กำลังรีเซ็ต...');
  gasPost({ action: 'saveSettings', docId: getMtDocId(), data: { mtTemplateB64: '', mtTemplateName: '', mtTemplateDate: '' } }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { alert('เกิดข้อผิดพลาด'); return; }
    appSettings.mtTemplateB64 = ''; appSettings.mtTemplateName = '';
    updateTemplateInfo(); alert('ใช้ template เริ่มต้นแล้ว');
  });
}
function downloadCurrentTemplate() {
  var b64 = appSettings.mtTemplateB64 || MT_TEMPLATE_B64;
  var binary = atob(b64), arr = new Uint8Array(binary.length);
  for (var i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
  var blob = new Blob([arr], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  var url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url; a.download = 'mt_template.docx'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}
function updateTemplateInfo() {
  var el = document.getElementById('currentTemplateInfo'); if (!el) return;
  if (appSettings.mtTemplateName) {
    var d = appSettings.mtTemplateDate ? new Date(appSettings.mtTemplateDate).toLocaleString('th-TH') : '';
    el.innerHTML = '<span class="badge badge-green"><i class="fa fa-file-word"></i> ' + appSettings.mtTemplateName + '</span><span style="margin-left:8px;font-size:11px;color:#9ca3af">' + d + '</span>';
  } else el.innerHTML = '<span class="badge badge-gray">ใช้ template เริ่มต้น</span>';
}

// ==============================================
// ADMIN DELETE ALL
// ==============================================

function deleteAllRecords() {
  if (!confirm('ต้องการลบประวัติ บร.1 ทั้งหมด?')) return;
  if (!confirm('ยืนยันอีกครั้ง - ข้อมูลจะหายถาวร!')) return;
  showLoading('กำลังลบทั้งหมด...');
  gasPost({ action: 'batchDelete', collection: 'records' }, function (err, r) {
    hideLoading(); renderHistory(); renderUsers(); alert('ลบประวัติทั้งหมดแล้ว');
  });
}
function deleteAllBranches() {
  if (!confirm('ต้องการลบ กฟฟ./สาขา ทั้งหมด?')) return;
  showLoading('กำลังลบทั้งหมด...');
  gasPost({ action: 'batchDelete', collection: 'branches' }, function (err, r) {
    hideLoading(); cache.branches = []; renderBranches(); alert('ลบสาขาทั้งหมดแล้ว');
  });
}
function deleteAllCustomers() {
  if (!confirm('ต้องการลบผู้ใช้ไฟฟ้าทั้งหมด?')) return;
  showLoading('กำลังลบทั้งหมด...');
  gasPost({ action: 'batchDelete', collection: 'customers' }, function (err, r) {
    hideLoading(); cache.customers = []; renderCustomers(); alert('ลบผู้ใช้ไฟฟ้าทั้งหมดแล้ว');
  });
}
function deleteAllMaterials() {
  if (!confirm('ต้องการลบพัสดุทั้งหมด?')) return;
  showLoading('กำลังลบทั้งหมด...');
  gasPost({ action: 'batchDelete', collection: 'materials' }, function (err, r) {
    hideLoading(); cache.materials = []; renderMaterials(); renderMatTable(); alert('ลบพัสดุทั้งหมดแล้ว');
  });
}
function deleteAllUsers() {
  if (!confirm('ต้องการลบผู้ใช้งานทั้งหมด? (ยกเว้น admin)')) return;
  showLoading('กำลังลบทั้งหมด...');
  gasPost({ action: 'batchDelete', collection: 'users' }, function (err, r) {
    hideLoading(); renderUsers(); alert('ลบผู้ใช้งานทั้งหมดแล้ว');
  });
}

// ==============================================
// ORDER TAB
// ==============================================

function renderOrderTab() {
  var isAdmin = currentUser.role === 'admin', userBranch = currentUser.branch || '';
  showLoading('กำลังโหลดใบสั่ง...');
  gasPost({ action: 'getRecords' }, function (err, r) {
    hideLoading();
    _orderRecsCache = (r && r.rows) ? r.rows : [];
    _orderRecsCache.forEach(function (rec) {
      if (typeof rec.materials === 'string') { try { rec.materials = JSON.parse(rec.materials); } catch (e) { rec.materials = []; } }
      if (typeof rec.photos === 'string') { try { rec.photos = JSON.parse(rec.photos); } catch (e) { rec.photos = {}; } }
    });
    _orderRecsCache.sort(function (a, b) { return (b.savedAt || 0) - (a.savedAt || 0); });
    var recs = isAdmin ? _orderRecsCache : _orderRecsCache.filter(function (rec) { return rec.branch === userBranch; });
    renderOrderList(recs); renderMtList(recs);
  });
}
function renderOrderList(recs) {
  var h = '<div style="overflow-x:auto"><table><thead><tr><th>วันที่</th><th>ผู้ใช้ไฟฟ้า</th><th>PEA</th><th>สาขา</th><th>รวมทั้งสิ้น</th><th>สถานะ</th><th></th></tr></thead><tbody>';
  if (!recs.length) h += '<tr><td colspan="7" style="text-align:center;color:#9ca3af;padding:20px">ไม่มีรายการ</td></tr>';
  recs.forEach(function (rec) {
    var dt = rec.savedAt ? new Date(rec.savedAt).toLocaleString('th-TH') : '';
    var rid = rec.id.replace(/'/g, "\\'"), st = rec.orderStatus || 'รอนำเข้าระบบ SAP';
    h += '<tr><td>' + dt + '</td><td>' + esc(rec.customer || '-') + '</td><td>' + esc(rec.pea || '-') + '</td><td>' + esc(rec.branch || '-') + '</td><td style="text-align:right;font-weight:600">' + fmt(rec.grand) + ' B</td>';
    h += '<td><select onchange="updateOrderStatus(\'' + rid + '\',this.value)" style="font-size:12px"><option value="รอนำเข้าระบบ SAP"' + (st === 'รอนำเข้าระบบ SAP' ? ' selected' : '') + '>รอนำเข้าระบบ SAP</option><option value="สร้างใบสั่งคิดค่าบริการแล้ว"' + (st === 'สร้างใบสั่งคิดค่าบริการแล้ว' ? ' selected' : '') + '>สร้างใบสั่งแล้ว</option></select></td>';
    h += '<td><button class="btn btn-outline btn-sm" onclick="viewRecord(\'' + rid + '\')"><i class="fa fa-eye"></i> ดู</button></td></tr>';
  });
  h += '</tbody></table></div>';
  document.getElementById('orderListContent').innerHTML = h;
}
function updateOrderStatus(id, status) {
  gasPost({ action: 'updateRecord', id: id, data: { orderStatus: status } }, function () {});
}
function renderMtList(recs) {
  var h = '<div style="overflow-x:auto"><table><thead><tr><th>วันที่</th><th>ผู้ใช้ไฟฟ้า</th><th>PEA</th><th>สาขา</th><th>รวมทั้งสิ้น</th><th></th></tr></thead><tbody>';
  if (!recs.length) h += '<tr><td colspan="6" style="text-align:center;color:#9ca3af;padding:20px">ไม่มีรายการ</td></tr>';
  recs.forEach(function (rec) {
    var dt = rec.savedAt ? new Date(rec.savedAt).toLocaleString('th-TH') : '', rid = rec.id.replace(/'/g, "\\'");
    h += '<tr><td>' + dt + '</td><td>' + esc(rec.customer || '-') + '</td><td>' + esc(rec.pea || '-') + '</td><td>' + esc(rec.branch || '-') + '</td><td style="text-align:right;font-weight:600">' + fmt(rec.grand) + ' B</td>';
    h += '<td><button class="btn btn-primary btn-sm" onclick="openMtForm(\'' + rid + '\')"><i class="fa fa-file-circle-plus"></i> สร้างใบ มท.</button></td></tr>';
  });
  h += '</tbody></table></div>';
  document.getElementById('mtListContent').innerHTML = h;
}

// ==============================================
// มท. FORM
// ==============================================

function openMtForm(recId) {
  var rec = _orderRecsCache.find(function (x) { return String(x.id) === String(recId); });
  if (!rec) { alert('ไม่พบรายการ'); return; }
  document.getElementById('mt_recId').value = recId;
  document.getElementById('mt_name').value = rec.customer || '';
  document.getElementById('mt_address').value = rec.address || '';
  document.getElementById('mt_contract').value = '';
  loadMtApprovers();
  document.getElementById('mtFormAlert').innerHTML = '';
  document.getElementById('mtFormModal').style.display = 'flex';
}
function closeMtForm() { document.getElementById('mtFormModal').style.display = 'none'; }
function loadMtApprovers() {
  var sel = document.getElementById('mt_approver');
  sel.innerHTML = '<option value="">-- เลือกผู้อนุมัติ --</option>';
  (appSettings.mtApprovers || []).forEach(function (a) {
    var opt = document.createElement('option');
    opt.value = a.name + '|' + a.position;
    opt.textContent = a.name + ' (' + a.position + ')';
    sel.appendChild(opt);
  });
}
function confirmMtForm() {
  var recId = document.getElementById('mt_recId').value;
  var name = gv('mt_name'), address = gv('mt_address'), contract = gv('mt_contract'), approverVal = gv('mt_approver');
  if (!name || !contract || !approverVal) { showAlert('mtFormAlert', 'กรุณากรอกข้อมูลให้ครบ', 'danger'); return; }
  var parts = approverVal.split('|'), approverName = parts[0] || '', approverPosition = parts[1] || '';
  var rec = _orderRecsCache.find(function (x) { return String(x.id) === String(recId); });
  if (!rec) { alert('ไม่พบรายการ'); return; }
  var mtData = { recId: recId, name: name, address: address, contract: contract, approverName: approverName, approverPosition: approverPosition, rec: rec, settings: appSettings, createdAt: Date.now(), createdBy: currentUser.name };
  showLoading('กำลังสร้างใบ มท....');
  gasPost({ action: 'addMtDoc', data: mtData }, function (err, r) {
    hideLoading(); closeMtForm(); generateMtPdf(mtData);
  });
}
function generateMtPdf(data) {
  var rec = data.rec, s = data.settings || appSettings || {};
  var now = new Date();
  var thM = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  var dateStr = now.getDate() + ' ' + thM[now.getMonth()] + ' ' + (now.getFullYear() + 543);
  var templateData = {
    mt_number: s.mtNumber || '', mt_branch: s.mtBranch || '', mt_addr: s.mtAddr || '',
    mt_road: s.mtRoad || '', mt_tambon: s.mtTambon || '', mt_amphoe: s.mtAmphoe || '',
    mt_province: s.mtProvince || '', mt_zipcode: s.mtZipcode || '',
    date1: dateStr, name1: data.name || '', address1: data.address || '', contract: data.contract || '',
    provider: rec.provider || '', work_date: extractDate(rec.datetime || ''),
    price1: fmt(rec.part1 || 0), price2: fmt(rec.part2 || 0), price3: fmt(rec.part3 || 0),
    price4: fmt(rec.vat || 0), total: fmt(rec.grand || 0), total_text: bahtText(rec.grand || 0),
    approver_name: data.approverName || '', approver_pos: data.approverPosition || ''
  };
  try {
    var tpl = appSettings.mtTemplateB64 || MT_TEMPLATE_B64;
    var binary = atob(tpl), arr = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
    var zip = new PizZip(arr);
    var doc = new window.docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
    doc.render(templateData);
    var out = doc.getZip().generate({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    var url = URL.createObjectURL(out), a = document.createElement('a');
    a.href = url; a.download = 'มท_' + (rec.pea || '') + '_' + new Date().toISOString().slice(0, 10) + '.docx';
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    alert('ดาวน์โหลดไฟล์ มท. สำเร็จ!');
  } catch (e) { alert('สร้างไฟล์ มท. ไม่สำเร็จ: ' + e.message); console.error(e); }
}

// ==============================================
// มท. SETTINGS
// ==============================================

function getMtDocId() { var branch = currentUser.branch || 'default'; return 'mt_' + branch.replace(/[/\s.]/g, '_'); }
function saveMtSettings() {
  var data = {
    mtBranchDisplay: currentUser.branch || '', mtNumber: gv('set_mtNumber'), mtBranch: gv('set_mtBranch'),
    mtAddr: gv('set_mtAddr'), mtRoad: gv('set_mtRoad'), mtTambon: gv('set_mtTambon'),
    mtAmphoe: gv('set_mtAmphoe'), mtProvince: gv('set_mtProvince'), mtZipcode: gv('set_mtZipcode')
  };
  var approvers = [];
  for (var i = 1; i <= 5; i++) { var n = gv('set_apName' + i), p = gv('set_apPos' + i); if (n) approvers.push({ name: n, position: p }); }
  data.mtApprovers = approvers;
  showLoading('กำลังบันทึก...');
  gasPost({ action: 'saveSettings', docId: getMtDocId(), data: data }, function (err, r) {
    hideLoading();
    if (err || !r || !r.ok) { showAlert('mtSettingsAlert', 'เกิดข้อผิดพลาด', 'danger'); return; }
    Object.assign(appSettings, data);
    showAlert('mtSettingsAlert', 'บันทึกสำเร็จ (' + currentUser.branch + ')', 'success');
  });
}
function loadMtSettingsForm() {
  var brLabel = document.getElementById('mtBranchLabel');
  if (brLabel) brLabel.textContent = currentUser.branch || '';
  showLoading('กำลังโหลดตั้งค่า...');
  gasPost({ action: 'getSettings', docId: getMtDocId() }, function (err, r) {
    hideLoading();
    if (r && r.ok) Object.assign(appSettings, r.data || {});
    fillMtForm(); updateTemplateInfo();
  });
}
function fillMtForm() {
  var s = appSettings;
  [['set_mtNumber', 'mtNumber'], ['set_mtBranch', 'mtBranch'], ['set_mtAddr', 'mtAddr'],
    ['set_mtRoad', 'mtRoad'], ['set_mtTambon', 'mtTambon'], ['set_mtAmphoe', 'mtAmphoe'],
    ['set_mtProvince', 'mtProvince'], ['set_mtZipcode', 'mtZipcode']].forEach(function (x) {
      var el = document.getElementById(x[0]); if (el) el.value = s[x[1]] || '';
    });
  var approvers = s.mtApprovers || [];
  for (var j = 1; j <= 5; j++) {
    var a = approvers[j - 1] || {};
    var ne = document.getElementById('set_apName' + j), pe = document.getElementById('set_apPos' + j);
    if (ne) ne.value = a.name || ''; if (pe) pe.value = a.position || '';
  }
}
function filterMtProvince() {
  var inp = document.getElementById('set_mtProvince'), val = inp.value.toLowerCase(), dd = document.getElementById('mtProvinceDD');
  if (!dd) return;
  var filtered = PROVINCES.filter(function (p) { return p.toLowerCase().includes(val); });
  if (!filtered.length || !val) { dd.style.display = 'none'; return; }
  dd.innerHTML = '';
  filtered.forEach(function (p) {
    var item = document.createElement('div');
    item.style.cssText = 'padding:6px 10px;cursor:pointer;border-bottom:1px solid #f1f5f9;font-size:13px';
    item.textContent = p;
    item.onclick = function (e) { e.preventDefault(); e.stopPropagation(); inp.value = p; dd.style.display = 'none'; };
    item.onmousedown = function (e) { e.preventDefault(); };
    item.onmouseover = function () { this.style.background = '#f5eefa'; };
    item.onmouseout = function () { this.style.background = ''; };
    dd.appendChild(item);
  });
  dd.style.display = 'block';
}
function switchOrderTab(t) {
  var tabs = ['orderList', 'mtList', 'mtSettings'];
  document.querySelectorAll('#orderTabs .tab').forEach(function (el, i) { el.classList.toggle('active', tabs[i] === t); });
  ['otOrderList', 'otMtList', 'otMtSettings'].forEach(function (id) { document.getElementById(id).classList.remove('active'); });
  var map = { orderList: 'otOrderList', mtList: 'otMtList', mtSettings: 'otMtSettings' };
  document.getElementById(map[t]).classList.add('active');
  if (t === 'mtSettings') loadMtSettingsForm();
}

// ==============================================
// BAHT TEXT
// ==============================================

function bahtText(num) {
  num = parseFloat(num) || 0;
  var t = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
  var u = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];
  var baht = Math.floor(num), satang = Math.round((num - baht) * 100);
  function readNum(n) {
    if (n === 0) return 'ศูนย์';
    var s = '', digits = String(n).split('').map(Number), len = digits.length;
    for (var i = 0; i < len; i++) {
      var d = digits[i], pos = len - i - 1;
      if (d === 0) continue;
      if (pos === 1 && d === 2) s += 'ยี่';
      else if (pos === 1 && d === 1) s += '';
      else if (pos === 0 && d === 1 && len > 1) s += 'เอ็ด';
      else s += t[d];
      if (!(pos === 0 && d === 1 && len > 1)) s += u[pos];
      if (pos === 1 && d === 1) s += u[pos];
    }
    return s;
  }
  var result = '';
  if (baht > 0) result += readNum(baht) + 'บาท';
  if (satang > 0) result += readNum(satang) + 'สตางค์';
  if (baht === 0 && satang === 0) result = 'ศูนย์บาทถ้วน';
  if (satang === 0 && baht > 0) result += 'ถ้วน';
  return result;
}

// ==============================================
// PARSE EXCEL/CSV
// ==============================================

function parseFile(file, callback) {
  var name = file.name.toLowerCase();
  if (name.endsWith('.xlsx') || name.endsWith('.xls')) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = new Uint8Array(e.target.result), wb = XLSX.read(data, { type: 'array' });
      var ws = wb.Sheets[wb.SheetNames[0]];
      callback(XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' }));
    };
    reader.readAsArrayBuffer(file);
  } else {
    var reader = new FileReader();
    reader.onload = function (e) {
      var text = e.target.result;
      if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
      var lines = text.split(/\r?\n/).filter(function (l) { return l.trim(); });
      callback(lines.map(function (l) { return l.split(',').map(function (c) { return c.trim().replace(/^"|"$/g, ''); }); }));
    };
    reader.readAsText(file);
  }
}

// ==============================================
// UTILS
// ==============================================

function gv(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
function setNow() {
  var now = new Date();
  var thM = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var display = now.getDate() + ' ' + thM[now.getMonth()] + ' ' + (now.getFullYear() + 543) + ' ' + pad(now.getHours()) + ':' + pad(now.getMinutes()) + ' น.';
  var iso = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate()) + 'T' + pad(now.getHours()) + ':' + pad(now.getMinutes());
  document.getElementById('f_datetime_display').value = display;
  document.getElementById('f_datetime').value = iso;
}
function syncDatetimeFromDisplay() { document.getElementById('f_datetime').value = document.getElementById('f_datetime_display').value; }
function getDatetimeValue() { return document.getElementById('f_datetime_display').value || document.getElementById('f_datetime').value; }
function getLocation() {
  if (!navigator.geolocation) { document.getElementById('f_coords').value = 'ไม่รองรับ GPS'; return; }
  document.getElementById('f_coords').value = 'กำลังระบุพิกัด...';
  navigator.geolocation.getCurrentPosition(
    function (p) { document.getElementById('f_coords').value = p.coords.latitude.toFixed(6) + ', ' + p.coords.longitude.toFixed(6); },
    function () { document.getElementById('f_coords').value = 'ไม่สามารถระบุพิกัดได้'; }
  );
}
function showAlert(id, msg, type) { document.getElementById(id).innerHTML = '<div class="alert alert-' + type + '">' + msg + '</div>'; }
function fmt4(n) { return (parseFloat(n) || 0).toLocaleString('th-TH', { minimumFractionDigits: 4, maximumFractionDigits: 4 }); }
function fmt(n) { return (parseFloat(n) || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function extractDate(dt) {
  if (!dt) return '';
  var m = dt.match(/^(\d+\s+\S+\s+\d+)/); if (m) return m[1];
  if (dt.indexOf('T') > -1) {
    var d = new Date(dt);
    var thM = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    return d.getDate() + ' ' + thM[d.getMonth()] + ' ' + (d.getFullYear() + 543);
  }
  return dt;
}
function esc(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function driveImg(url) {
  if (!url) return '';
  var m = url.match(/[?&]id=([a-zA-Z0-9_-]+)/); if (m) return 'https://lh3.googleusercontent.com/d/' + m[1];
  var m2 = url.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m2) return 'https://lh3.googleusercontent.com/d/' + m2[1];
  return url;
}

// Init
setNow();
renderMatTable();