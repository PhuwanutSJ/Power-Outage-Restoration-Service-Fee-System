
// ==============================================
// ใส่ Firebase Config ของคุณตรงนี้
// ==============================================
var firebaseConfig = {
  apiKey: 'AIzaSyCE91RMxbRIarpLA7SejyLXDulALxMczYQ',
  authDomain: 'phuwanut2026.firebaseapp.com',
  projectId: 'phuwanut2026',
  storageBucket: 'phuwanut2026.firebasestorage.app',
  messagingSenderId: '770889896269',
  appId: '1:770889896269:web:3ac45fb96b4ad7808b2704'
};

// GAS URL สำหรับ upload รูปไป Google Drive
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

// Init Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

var currentUser = null;
var matRows = [];
var forgotUserId = null;
var photoData = {
  meter: [null],
  work: [null, null],
  equip: [null, null]
};
var cache = {
  materials: [],
  customers: [],
  branches: []
};

var PROVINCES = [
  'กรุงเทพมหานคร','กระบี่','กาญจนบุรี',
  'กาฬสินธุ์','กำแพงเพชร','ขอนแก่น',
  'จันทบุรี','ฉะเชิงเทรา','ชลบุรี',
  'ชัยนาท','ชัยภูมิ','ชุมพร',
  'เชียงราย','เชียงใหม่','ตรัง',
  'ตราด','ตาก','นครนายก',
  'นครปฐม','นครพนม','นครราชสีมา',
  'นครศรีธรรมราช','นครสวรรค์','นนทบุรี',
  'นราธิวาส','น่าน','บึงกาฬ',
  'บุรีรัมย์','ปทุมธานี','ประจวบคีรีขันธ์',
  'ปราจีนบุรี','ปัตตานี','พระนครศรีอยุธยา',
  'พะเยา','พังงา','พัทลุง',
  'พิจิตร','พิษณุโลก','เพชรบุรี',
  'เพชรบูรณ์','แพร่','ภูเก็ต',
  'มหาสารคาม','มุกดาหาร','แม่ฮ่องสอน',
  'ยโสธร','ยะลา','ร้อยเอ็ด',
  'ระนอง','ระยอง','ราชบุรี',
  'ลพบุรี','ลำปาง','ลำพูน',
  'เลย','ศรีสะเกษ','สกลนคร',
  'สงขลา','สตูล','สมุทรปราการ',
  'สมุทรสงคราม','สมุทรสาคร','สระแก้ว',
  'สระบุรี','สิงห์บุรี','สุโขทัย',
  'สุพรรณบุรี','สุราษฎร์ธานี','สุรินทร์',
  'หนองคาย','หนองบัวลำภู','อ่างทอง',
  'อำนาจเจริญ','อุดรธานี','อุตรดิตถ์',
  'อุทัยธานี','อุบลราชธานี'
];

// -- INIT --
(function(){
  var sel = document.getElementById('br_province');
  PROVINCES.forEach(function(p){
    var o = document.createElement('option');
    o.value = p;
    o.textContent = p;
    sel.appendChild(o);
  });
  // Test Firebase connection
  db.collection('_ping').doc('test')
    .set({t:Date.now()})
    .then(function(){setDbStatus(true);})
    .catch(function(){setDbStatus(false);});
})();

function setDbStatus(ok){
  var dot = document.getElementById('dbDot');
  var txt = document.getElementById('dbStatusText');
  dot.className = 'db-dot' + (ok?'':' err');
  txt.textContent = ok?'Firebase OK':'ออฟไลน์';
}

// -- LOADING --
function showLoading(t){
  var el = document.getElementById('loadingText');
  el.textContent = t || 'กำลังโหลด...';
  var ov = document.getElementById('loadingOverlay');
  ov.classList.add('active');
}
function hideLoading(){
  var ov = document.getElementById('loadingOverlay');
  ov.classList.remove('active');
}

// -- AUTH --
function doLogin(){
  var u = gv('loginUsername');
  var p = document.getElementById('loginPassword').value;
  if(!u||!p){
    showAlert('loginAlert','กรุณากรอกข้อมูล','danger');
    return;
  }
  // check admin hardcode
  if(_adm && u===_adm.username){
    if(p===_adm.password){
      loginSuccess(_adm);
    } else {
      showAlert('loginAlert','รหัสผ่านไม่ถูกต้อง','danger');
    }
    return;
  }
  showLoading('กำลังเข้าสู่ระบบ...');
  db.collection('users')
    .where('username','==',u)
    .get()
    .then(function(snap){
      hideLoading();
      if(snap.empty){
        showAlert('loginAlert','ไม่พบผู้ใช้','danger');
        return;
      }
      var doc = snap.docs[0];
      var usr = doc.data();
      usr.id = doc.id;
      if(usr.password !== p){
        showAlert('loginAlert','รหัสผ่านไม่ถูกต้อง','danger');
        return;
      }
      if(usr.status !== 'approved'){
        showAlert('loginAlert','บัญชียังไม่ได้รับอนุมัติ','warning');
        return;
      }
      loginSuccess(usr);
    })
    .catch(function(e){
      hideLoading();
      showAlert('loginAlert','เชื่อมต่อไม่ได้','danger');
    });
}

function loginSuccess(user){
  currentUser = user;
  var nav = document.getElementById('navUser');
  nav.textContent = ' ' + currentUser.name;
  var adm = document.getElementById('navAdmin');
  adm.style.display = currentUser.role==='admin'?'':'none';
  document.getElementById('f_branch').value =
    currentUser.branch || '';
  document.getElementById('f_provider').value =
    currentUser.name || '';
  document.getElementById('f_position').value =
    currentUser.position || '';
  setNow();
  getLocation();
  document.getElementById('loginPage')
    .classList.remove('active');
  document.getElementById('mainApp')
    .classList.add('active');
  loadAllCache(function(){renderHistory();});
}

function doLogout(){
  currentUser = null;
  cache = {materials:[],customers:[],branches:[]};
  document.getElementById('mainApp')
    .classList.remove('active');
  document.getElementById('loginPage')
    .classList.add('active');
  document.getElementById('loginUsername').value = '';
  document.getElementById('loginPassword').value = '';
}

function doRegister(){
  var name = gv('regName');
  var uname = gv('regUsername');
  var pass = document.getElementById('regPassword').value;
  var conf = document.getElementById('regConfirm').value;
  var email = gv('regEmail');
  var branch = gv('regBranch');
  var position = gv('regPosition');
  if(!name||!uname||!pass||!email||!branch){
    showAlert('regAlert','กรุณากรอกข้อมูลที่จำเป็น','danger');
    return;
  }
  if(pass!==conf){
    showAlert('regAlert','รหัสผ่านไม่ตรงกัน','danger');
    return;
  }
  showLoading('กำลังสมัครใช้งาน...');
  // check duplicate username
  db.collection('users')
    .where('username','==',uname)
    .get()
    .then(function(snap){
      if(!snap.empty){
        hideLoading();
        showAlert('regAlert','รหัสประจำตัวนี้ถูกใช้แล้ว','warning');
        return;
      }
      return db.collection('users').add({
        username: uname,
        password: pass,
        name: name,
        email: email,
        branch: branch,
        position: position,
        role: 'user',
        status: 'pending',
        createdAt: Date.now()
      });
    })
    .then(function(ref){
      hideLoading();
      if(ref){
        showAlert('regAlert','สมัครสำเร็จ! รอการอนุมัติ','success');
        setTimeout(showLogin, 2000);
      }
    })
    .catch(function(){
      hideLoading();
      showAlert('regAlert','เกิดข้อผิดพลาด','danger');
    });
}

function showLogin(){
  document.getElementById('loginPage').classList.add('active');
  document.getElementById('registerPage')
    .classList.remove('active');
}
function showRegister(){
  if(cache.branches.length===0) loadBranches();
  document.getElementById('loginPage')
    .classList.remove('active');
  document.getElementById('registerPage')
    .classList.add('active');
}

// -- FORGOT --
function openForgot(){
  forgotUserId = null;
  ['fg_uid','fg_email','fg_newpass','fg_confirmpass']
    .forEach(function(id){
      document.getElementById(id).value = '';
    });
  document.getElementById('forgotStep1').style.display = '';
  document.getElementById('forgotStep2').style.display = 'none';
  document.getElementById('forgotAlert').innerHTML = '';
  document.getElementById('forgotModal').style.display = 'flex';
}
function closeForgot(){
  document.getElementById('forgotModal').style.display = 'none';
}
function verifyForgot(){
  var uid = gv('fg_uid');
  var email = gv('fg_email');
  if(!uid||!email){
    showAlert('forgotAlert','กรุณากรอกข้อมูล','danger');
    return;
  }
  showLoading('กำลังตรวจสอบ...');
  db.collection('users')
    .where('username','==',uid)
    .where('email','==',email)
    .get()
    .then(function(snap){
      hideLoading();
      if(snap.empty){
        showAlert('forgotAlert','ไม่พบข้อมูล','danger');
        return;
      }
      forgotUserId = snap.docs[0].id;
      document.getElementById('forgotAlert').innerHTML = '';
      document.getElementById('forgotStep1').style.display = 'none';
      document.getElementById('forgotStep2').style.display = '';
    })
    .catch(function(){
      hideLoading();
      showAlert('forgotAlert','เกิดข้อผิดพลาด','danger');
    });
}
function doResetPassword(){
  var np = document.getElementById('fg_newpass').value;
  var cp = document.getElementById('fg_confirmpass').value;
  if(!np){
    showAlert('forgotAlert','กรุณากรอกรหัสผ่านใหม่','danger');
    return;
  }
  if(np!==cp){
    showAlert('forgotAlert','รหัสผ่านไม่ตรงกัน','danger');
    return;
  }
  showLoading('กำลังเปลี่ยนรหัสผ่าน...');
  db.collection('users').doc(forgotUserId)
    .update({password:np})
    .then(function(){
      hideLoading();
      showAlert('forgotAlert','เปลี่ยนรหัสผ่านสำเร็จ!','success');
      setTimeout(function(){closeForgot();showLogin();},1800);
    })
    .catch(function(){
      hideLoading();
      showAlert('forgotAlert','เกิดข้อผิดพลาด','danger');
    });
}

// -- PROFILE --
function openProfile(){
  if(!currentUser) return;
  document.getElementById('p_name').value = currentUser.name||'';
  document.getElementById('p_email').value = currentUser.email||'';
  document.getElementById('p_branch').value = currentUser.branch||'';
  document.getElementById('p_position').value = currentUser.position||'';
  document.getElementById('p_newpass').value = '';
  document.getElementById('p_confirmpass').value = '';
  document.getElementById('profileAlert').innerHTML = '';
  document.getElementById('profileModal').style.display = 'flex';
}
function closeProfile(){
  document.getElementById('profileModal').style.display = 'none';
}
function saveProfile(){
  var name = gv('p_name');
  var email = gv('p_email');
  var position = gv('p_position');
  var np = document.getElementById('p_newpass').value;
  var cp = document.getElementById('p_confirmpass').value;
  if(!name){
    showAlert('profileAlert','กรุณากรอกชื่อ','danger');
    return;
  }
  if(np && np!==cp){
    showAlert('profileAlert','รหัสผ่านไม่ตรงกัน','danger');
    return;
  }
  if(currentUser.id==='admin'){
    // admin hardcode - update local only
    Object.assign(currentUser,{name:name,email:email,position:position});
    if(np) currentUser.password = np;
    document.getElementById('navUser').textContent = ' '+name;
    document.getElementById('f_provider').value = name;
    document.getElementById('f_position').value = position;
    showAlert('profileAlert','บันทึกสำเร็จ','success');
    setTimeout(closeProfile, 1200);
    return;
  }
  var upd = {name:name,email:email,position:position};
  if(np) upd.password = np;
  showLoading('กำลังบันทึก...');
  db.collection('users').doc(currentUser.id)
    .update(upd)
    .then(function(){
      hideLoading();
      Object.assign(currentUser,upd);
      document.getElementById('navUser').textContent = ' '+name;
      document.getElementById('f_provider').value = name;
      document.getElementById('f_position').value = position;
      showAlert('profileAlert','บันทึกสำเร็จ','success');
      setTimeout(closeProfile, 1200);
    })
    .catch(function(){
      hideLoading();
      showAlert('profileAlert','เกิดข้อผิดพลาด','danger');
    });
}

// -- CACHE --
function loadAllCache(cb){
  showLoading('กำลังโหลดข้อมูล...');
  var done = 0;
  function check(){done++;if(done===3){hideLoading();if(cb)cb();}}
  loadMaterials(check);
  loadCustomers(check);
  loadBranches(check);
}
function loadMaterials(cb){
  db.collection('materials').get()
    .then(function(snap){
      cache.materials = [];
      snap.forEach(function(doc){
        var d = doc.data();
        d.id = doc.id;
        cache.materials.push(d);
      });
      renderMatTable();
      if(cb)cb();
    })
    .catch(function(){if(cb)cb();});
}
function loadCustomers(cb){
  db.collection('customers').get()
    .then(function(snap){
      cache.customers = [];
      snap.forEach(function(doc){
        var d = doc.data();
        d.id = doc.id;
        cache.customers.push(d);
      });
      if(cb)cb();
    })
    .catch(function(){if(cb)cb();});
}
function loadBranches(cb){
  db.collection('branches').get()
    .then(function(snap){
      cache.branches = [];
      snap.forEach(function(doc){
        var d = doc.data();
        d.id = doc.id;
        cache.branches.push(d);
      });
      if(cb)cb();
    })
    .catch(function(){if(cb)cb();});
}

// -- BRANCH DROPDOWN --
function filterRegBranch(){buildBranchDD('regBranch','regBranchDropdown');}
function filterEuBranch(){buildBranchDD('eu_branch','euBranchDropdown');}
function buildBranchDD(inputId,ddId){
  var input = document.getElementById(inputId);
  var val = input.value.toLowerCase();
  var dd = document.getElementById(ddId);
  var filtered = cache.branches.filter(function(b){
    if(!val) return true;
    return (b.name||'').toLowerCase().includes(val)
      || (b.province||'').toLowerCase().includes(val);
  });
  if(!filtered.length){dd.style.display='none';return;}
  dd.innerHTML = '';
  filtered.slice(0,12).forEach(function(b){
    var item = document.createElement('div');
    item.style.cssText =
      'padding:8px 12px;cursor:pointer;' +
      'border-bottom:1px solid #f1f5f9;font-size:13px';
    item.innerHTML =
      '<b>'+esc(b.name)+'</b>' +
      '<span style="color:#6b7280;font-size:11px;margin-left:6px">' +
      esc(b.province)+' / '+esc(b.zone)+'</span>';
    item.onmousedown = function(e){
      e.preventDefault();
      input.value = b.name;
      dd.style.display = 'none';
    };
    item.onmouseover = function(){this.style.background='#f5eefa';};
    item.onmouseout = function(){this.style.background='';};
    dd.appendChild(item);
  });
  dd.style.display = 'block';
}
document.addEventListener('click',function(e){
  var pairs = [
    ['regBranch','regBranchDropdown'],
    ['eu_branch','euBranchDropdown']
  ];
  pairs.forEach(function(pair){
    var inp = document.getElementById(pair[0]);
    var dd = document.getElementById(pair[1]);
    if(dd && inp && !inp.contains(e.target) && !dd.contains(e.target)){
      dd.style.display = 'none';
    }
  });
});

// -- BRANCHES ADMIN --
function saveBranch(){
  var name = gv('br_name');
  var province = gv('br_province');
  var zone = gv('br_zone');
  var editId = gv('br_editId');
  if(!name||!province||!zone){
    alert('กรุณากรอกชื่อ จังหวัด และเขต');
    return;
  }
  var data = {name:name,province:province,zone:zone};
  showLoading('กำลังบันทึก...');
  var promise;
  if(editId){
    promise = db.collection('branches').doc(editId).update(data);
  } else {
    promise = db.collection('branches').add(data);
  }
  promise.then(function(){
    hideLoading();
    clearBranchForm();
    loadBranches(function(){renderBranches();});
  }).catch(function(){
    hideLoading();
    alert('เกิดข้อผิดพลาด');
  });
}
function deleteBranch(id){
  if(!confirm('ต้องการลบ?')) return;
  showLoading('กำลังลบ...');
  db.collection('branches').doc(id).delete()
    .then(function(){
      hideLoading();
      cache.branches = cache.branches.filter(function(b){
        return b.id !== id;
      });
      renderBranches();
    })
    .catch(function(){hideLoading();alert('เกิดข้อผิดพลาด');});
}
function editBranch(id){
  var b = cache.branches.find(function(x){return x.id===id;});
  if(!b) return;
  document.getElementById('br_name').value = b.name||'';
  document.getElementById('br_province').value = b.province||'';
  document.getElementById('br_zone').value = b.zone||'';
  document.getElementById('br_editId').value = b.id;
}
function clearBranchForm(){
  ['br_name','br_editId'].forEach(function(id){
    document.getElementById(id).value = '';
  });
  document.getElementById('br_province').value = '';
  document.getElementById('br_zone').value = '';
}
function renderBranches(){
  var kw = gv('brSearch').toLowerCase();
  var all = cache.branches.slice().sort(function(a,b){
    return (a.name||'').localeCompare(b.name||'','th');
  });
  var shown = all;
  if(kw){
    shown = all.filter(function(b){
      return (b.name||'').toLowerCase().includes(kw)
        || (b.province||'').includes(kw);
    });
  }
  var h = '<table><thead><tr>';
  h += '<th>ลำดับ</th><th>ชื่อ กฟฟ./สาขา</th>';
  h += '<th>จังหวัด</th><th>เขต</th><th>จัดการ</th>';
  h += '</tr></thead><tbody>';
  if(!shown.length){
    h += '<tr><td colspan="5" style="text-align:center;';
    h += 'color:#9ca3af;padding:20px">ไม่มีรายการ</td></tr>';
  }
  shown.forEach(function(b,i){
    var bid = b.id.replace(/'/g,"\\'");
    h += '<tr><td style="color:#9ca3af">'+(i+1)+'</td>';
    h += '<td><b>'+esc(b.name||'')+'</b></td>';
    h += '<td>'+esc(b.province||'')+'</td>';
    h += '<td><span class="badge badge-blue">';
    h += esc(b.zone||'')+'</span></td>';
    h += '<td style="white-space:nowrap">';
    h += '<button class="btn btn-outline btn-sm"';
    h += ' onclick="editBranch(\''+bid+'\')">แก้ไข</button> ';
    h += '<button class="btn btn-danger btn-sm"';
    h += ' onclick="deleteBranch(\''+bid+'\')">ลบ</button>';
    h += '</td></tr>';
  });
  h += '</tbody></table>';
  h += '<div style="font-size:13px;color:#6b7280;margin-top:8px">';
  h += 'แสดง '+shown.length+' / '+all.length+' รายการ</div>';
  document.getElementById('branchTable').innerHTML = h;
}

// -- CSV IMPORT BRANCHES --
var _csvBrRowsCache = [];
function importBrRowsFromCache(){importBrRows(_csvBrRowsCache);}
function handleBrCsvDrop(e){
  e.preventDefault();
  e.currentTarget.classList.remove('dragover');
  if(e.dataTransfer.files[0]) processBrCsv(e.dataTransfer.files[0]);
}
function handleBrCsvFile(inp){if(inp.files[0])processBrCsv(inp.files[0]);}
function processBrCsv(file){
  if(!file.name.endsWith('.csv')){alert('กรุณาเลือก .csv');return;}
  var reader = new FileReader();
  reader.onload = function(e){
    var text = e.target.result;
    if(text.charCodeAt(0)===0xFEFF) text = text.slice(1);
    var lines = text.split(/\r?\n/).filter(function(l){return l.trim();});
    var si = 0;
    var fl = (lines[0]||'').toLowerCase();
    if(fl.includes('กฟฟ')||fl.includes('ชื่อ')) si = 1;
    var rows = [];
    for(var i=si;i<lines.length;i++){
      var cols = lines[i].split(',').map(function(c){
        return c.trim().replace(/^"|"$/g,'');
      });
      if(!cols[0]) continue;
      rows.push({name:cols[0],province:cols[1]||'',zone:cols[2]||''});
    }
    if(!rows.length){
      document.getElementById('csvBrPreview').innerHTML =
        '<div class="alert alert-danger">ไม่พบข้อมูล</div>';
      return;
    }
    var ph = '<div class="alert alert-info">พบ '+rows.length+' รายการ</div>';
    _csvBrRowsCache = rows;
    ph += '<div style="display:flex;gap:10px">';
    ph += '<button class="btn btn-success btn-sm"';
    ph += ' onclick="importBrRowsFromCache()">นำเข้าทั้งหมด</button>';
    ph += '<button class="btn btn-outline btn-sm"';
    ph += " onclick=\"document.getElementById('csvBrPreview').innerHTML=''\">";
    ph += 'ยกเลิก</button></div>';
    document.getElementById('csvBrPreview').innerHTML = ph;
  };
  reader.readAsText(file,'UTF-8');
}
function importBrRows(rows){
  showLoading('กำลังนำเข้า...');
  var batch = db.batch();
  rows.forEach(function(r){
    var ref = db.collection('branches').doc();
    batch.set(ref,r);
  });
  batch.commit().then(function(){
    hideLoading();
    document.getElementById('csvBrPreview').innerHTML =
      '<div class="alert alert-success">นำเข้า '+rows.length+' รายการสำเร็จ!</div>';
    loadBranches(function(){renderBranches();});
  }).catch(function(){
    hideLoading();
    alert('เกิดข้อผิดพลาด');
  });
}

// -- CUSTOMERS --
function onPeaInput(){
  var peaVal = gv('f_pea');
  var found = cache.customers.find(function(c){return c.pea===peaVal;});
  var label = document.getElementById('peaMatchLabel');
  var custInp = document.getElementById('f_customer');
  var addrInp = document.getElementById('f_address');
  var hint = document.getElementById('peaHint');
  if(found){
    label.innerHTML = '<span class="pea-match found">OK พบข้อมูล</span>';
    custInp.value = found.name||'';
    custInp.readOnly = true;
    addrInp.value = found.address||'';
    addrInp.readOnly = true;
    hint.style.display = 'block';
  } else {
    label.innerHTML = peaVal
      ? '<span class="pea-match notfound">ไม่พบ - กรอกเองได้</span>'
      : '';
    custInp.readOnly = false;
    addrInp.readOnly = false;
    hint.style.display = 'none';
  }
}
function saveCustomer(){
  var pea = gv('c_pea');
  var name = gv('c_name');
  var address = gv('c_address');
  var branch = gv('c_branch');
  var editId = gv('c_editId');
  if(!pea||!name){alert('กรุณากรอก PEA และชื่อ');return;}
  var data = {pea:pea,name:name,address:address,branch:branch};
  showLoading('กำลังบันทึก...');
  var promise;
  if(editId){
    promise = db.collection('customers').doc(editId).update(data);
  } else {
    promise = db.collection('customers').add(data);
  }
  promise.then(function(){
    hideLoading();
    clearCustomerForm();
    loadCustomers(function(){renderCustomers();});
  }).catch(function(){hideLoading();alert('เกิดข้อผิดพลาด');});
}
function deleteCustomer(id){
  if(!confirm('ต้องการลบ?')) return;
  showLoading('กำลังลบ...');
  db.collection('customers').doc(id).delete()
    .then(function(){
      hideLoading();
      cache.customers = cache.customers.filter(function(c){return c.id!==id;});
      renderCustomers();
    })
    .catch(function(){hideLoading();alert('เกิดข้อผิดพลาด');});
}
function editCustomer(id){
  var c = cache.customers.find(function(x){return x.id===id;});
  if(!c) return;
  document.getElementById('c_pea').value = c.pea||'';
  document.getElementById('c_name').value = c.name||'';
  document.getElementById('c_address').value = c.address||'';
  document.getElementById('c_branch').value = c.branch||'';
  document.getElementById('c_editId').value = c.id;
}
function clearCustomerForm(){
  ['c_pea','c_name','c_address','c_branch','c_editId']
    .forEach(function(id){document.getElementById(id).value='';});
}
function renderCustomers(){
  var kw = gv('custSearch').toLowerCase();
  var shown = cache.customers;
  if(kw){
    shown = cache.customers.filter(function(c){
      return (c.pea||'').includes(kw)
        || (c.name||'').toLowerCase().includes(kw);
    });
  }
  var h = '<table><thead><tr><th>ลำดับ</th><th>PEA</th>';
  h += '<th>ชื่อ</th><th>ที่อยู่</th><th>สาขา</th><th>จัดการ</th>';
  h += '</tr></thead><tbody>';
  if(!shown.length){
    h += '<tr><td colspan="6" style="text-align:center;';
    h += 'color:#9ca3af;padding:20px">ไม่มีรายการ</td></tr>';
  }
  shown.forEach(function(c,i){
    var cid = c.id.replace(/'/g,"\\'");
    h += '<tr><td>'+(i+1)+'</td>';
    h += '<td><b>'+esc(c.pea||'')+'</b></td>';
    h += '<td>'+esc(c.name||'')+'</td>';
    h += '<td>'+esc(c.address||'-')+'</td>';
    h += '<td>'+esc(c.branch||'-')+'</td>';
    h += '<td style="white-space:nowrap">';
    h += '<button class="btn btn-outline btn-sm"';
    h += ' onclick="editCustomer(\''+cid+'\')">แก้ไข</button> ';
    h += '<button class="btn btn-danger btn-sm"';
    h += ' onclick="deleteCustomer(\''+cid+'\')">ลบ</button>';
    h += '</td></tr>';
  });
  h += '</tbody></table>';
  document.getElementById('customerTable').innerHTML = h;
}

// -- CSV IMPORT CUSTOMERS --
var _csvCustRowsCache = [];
function importCustRowsFromCache(){importCustRows(_csvCustRowsCache);}
function handleCustCsvDrop(e){
  e.preventDefault();
  e.currentTarget.classList.remove('dragover');
  if(e.dataTransfer.files[0]) processCustCsv(e.dataTransfer.files[0]);
}
function handleCustCsvFile(inp){if(inp.files[0])processCustCsv(inp.files[0]);}
function processCustCsv(file){
  if(!file.name.endsWith('.csv')){alert('กรุณาเลือก .csv');return;}
  var reader = new FileReader();
  reader.onload = function(e){
    var text = e.target.result;
    if(text.charCodeAt(0)===0xFEFF) text = text.slice(1);
    var lines = text.split(/\r?\n/).filter(function(l){return l.trim();});
    var si = 0;
    var fl = (lines[0]||'').toLowerCase();
    if(fl.includes('pea')||fl.includes('เลข')) si = 1;
    var rows = [];
    for(var i=si;i<lines.length;i++){
      var cols = lines[i].split(',').map(function(c){
        return c.trim().replace(/^"|"$/g,'');
      });
      if(cols.length<2||!cols[0]||!cols[1]) continue;
      rows.push({pea:cols[0],name:cols[1],address:cols[2]||'',branch:cols[3]||''});
    }
    if(!rows.length){
      document.getElementById('csvCustPreview').innerHTML =
        '<div class="alert alert-danger">ไม่พบข้อมูล</div>';
      return;
    }
    _csvCustRowsCache = rows;
    var ph = '<div class="alert alert-info">พบ '+rows.length+' รายการ</div>';
    ph += '<div style="display:flex;gap:10px">';
    ph += '<button class="btn btn-success btn-sm"';
    ph += ' onclick="importCustRowsFromCache()">นำเข้าทั้งหมด</button>';
    ph += '<button class="btn btn-outline btn-sm"';
    ph += " onclick=\"document.getElementById('csvCustPreview').innerHTML=''\">";
    ph += 'ยกเลิก</button></div>';
    document.getElementById('csvCustPreview').innerHTML = ph;
  };
  reader.readAsText(file,'UTF-8');
}
function importCustRows(rows){
  showLoading('กำลังนำเข้า...');
  var batch = db.batch();
  rows.forEach(function(r){
    var ref = db.collection('customers').doc();
    batch.set(ref,r);
  });
  batch.commit().then(function(){
    hideLoading();
    document.getElementById('csvCustPreview').innerHTML =
      '<div class="alert alert-success">นำเข้า '+rows.length+' รายการ!</div>';
    loadCustomers(function(){renderCustomers();});
  }).catch(function(){hideLoading();alert('เกิดข้อผิดพลาด');});
}

// -- MATERIALS --
function getFormMaterials(){
  return cache.materials.filter(function(m){return m.inuse==='ใช้';});
}
function saveMaterial(){
  var code = gv('m_code');
  var desc = gv('m_desc');
  var unit = gv('m_unit');
  var price = parseFloat(gv('m_price'))||0;
  var type = gv('m_type');
  var inuse = document.getElementById('m_inuse').value;
  var editId = gv('m_editId');
  if(!code||!desc||!price){
    alert('กรุณากรอกรหัส รายละเอียด ราคากลาง');
    return;
  }
  var data = {code:code,desc:desc,unit:unit,price:price,type:type,inuse:inuse};
  showLoading('กำลังบันทึก...');
  var promise;
  if(editId){
    promise = db.collection('materials').doc(editId).update(data);
  } else {
    promise = db.collection('materials').add(data);
  }
  promise.then(function(){
    hideLoading();
    clearMaterialForm();
    loadMaterials(function(){renderMaterials();});
  }).catch(function(){hideLoading();alert('เกิดข้อผิดพลาด');});
}
function deleteMaterial(id){
  if(!confirm('ต้องการลบ?')) return;
  showLoading('กำลังลบ...');
  db.collection('materials').doc(id).delete()
    .then(function(){
      hideLoading();
      cache.materials = cache.materials.filter(function(m){return m.id!==id;});
      renderMaterials();
      renderMatTable();
    })
    .catch(function(){hideLoading();alert('เกิดข้อผิดพลาด');});
}
function editMaterial(id){
  var m = cache.materials.find(function(x){return x.id===id;});
  if(!m) return;
  document.getElementById('m_code').value = m.code;
  document.getElementById('m_desc').value = m.desc;
  document.getElementById('m_unit').value = m.unit||'';
  document.getElementById('m_price').value = m.price;
  document.getElementById('m_type').value = m.type||'';
  document.getElementById('m_inuse').value = m.inuse||'ใช้';
  document.getElementById('m_editId').value = m.id;
}
function clearMaterialForm(){
  ['m_code','m_desc','m_unit','m_price','m_type','m_editId']
    .forEach(function(id){document.getElementById(id).value='';});
  document.getElementById('m_inuse').value = 'ใช้';
}
function renderMaterials(){
  var f = document.querySelector('input[name="matFilter"]:checked');
  f = f ? f.value : 'all';
  var shown = f==='all'
    ? cache.materials
    : cache.materials.filter(function(m){return m.inuse===f;});
  var h = '<table><thead><tr>';
  h += '<th>ลำดับ</th><th>รหัส</th><th>รายละเอียด</th>';
  h += '<th>หน่วย</th><th>ราคากลาง</th><th>ประเภท</th>';
  h += '<th>ใช้งาน</th><th>ค่าบริการ</th><th>จัดการ</th>';
  h += '</tr></thead><tbody>';
  if(!shown.length){
    h += '<tr><td colspan="9" style="text-align:center;';
    h += 'color:#9ca3af;padding:20px">ไม่มีรายการ</td></tr>';
  }
  shown.forEach(function(m,i){
    var mid = m.id.replace(/'/g,"\\'");
    h += '<tr><td>'+(i+1)+'</td>';
    h += '<td><b>'+esc(m.code)+'</b></td>';
    h += '<td>'+esc(m.desc)+'</td>';
    h += '<td>'+esc(m.unit||'-')+'</td>';
    h += '<td style="text-align:right">'+fmt(m.price)+'</td>';
    h += '<td><span class="badge badge-blue">';
    h += esc(m.type||'-')+'</span></td>';
    var bc = m.inuse==='ใช้'?'badge-green':'badge-gray';
    h += '<td><span class="badge '+bc+'">';
    h += esc(m.inuse||'ใช้')+'</span></td>';
    h += '<td style="text-align:right;font-weight:600;color:#4a1660">';
    h += fmt(m.price*1.31*1.15)+'</td>';
    h += '<td style="white-space:nowrap">';
    h += '<button class="btn btn-outline btn-sm"';
    h += ' onclick="editMaterial(\''+mid+'\')">แก้ไข</button> ';
    h += '<button class="btn btn-danger btn-sm"';
    h += ' onclick="deleteMaterial(\''+mid+'\')">ลบ</button>';
    h += '</td></tr>';
  });
  h += '</tbody></table>';
  document.getElementById('materialTable').innerHTML = h;
  var cnt = document.getElementById('matCount');
  if(cnt){
    cnt.textContent = 'แสดง '+shown.length+' / '+cache.materials.length+' รายการ';
  }
}

// -- CSV IMPORT MATERIALS --
var _csvMatRowsCache = [];
function importCsvRowsFromCache(){importCsvRows(_csvMatRowsCache);}
function handleCsvDrop(e){
  e.preventDefault();
  e.currentTarget.classList.remove('dragover');
  if(e.dataTransfer.files[0]) processCsvFile(e.dataTransfer.files[0]);
}
function handleCsvFile(inp){if(inp.files[0])processCsvFile(inp.files[0]);}
function processCsvFile(file){
  if(!file.name.endsWith('.csv')){alert('กรุณาเลือก .csv');return;}
  var reader = new FileReader();
  reader.onload = function(e){
    var text = e.target.result;
    if(text.charCodeAt(0)===0xFEFF) text = text.slice(1);
    var lines = text.split(/\r?\n/).filter(function(l){return l.trim();});
    var si = 0;
    var fl = (lines[0]||'').toLowerCase();
    if(fl.includes('รหัส')||fl.includes('code')) si = 1;
    var rows = [];
    for(var i=si;i<lines.length;i++){
      var cols = lines[i].split(',').map(function(c){
        return c.trim().replace(/^"|"$/g,'');
      });
      if(cols.length<4||!cols[0]||!cols[1]) continue;
      var price = parseFloat(cols[3]);
      if(isNaN(price)||price<=0) continue;
      var inuse = (cols[5]||'ใช้').trim();
      if(inuse!=='ใช้'&&inuse!=='ไม่ใช้') inuse = 'ใช้';
      rows.push({
        code:cols[0],desc:cols[1],unit:cols[2]||'',
        price:price,type:cols[4]||'',inuse:inuse
      });
    }
    if(!rows.length){
      document.getElementById('csvPreview').innerHTML =
        '<div class="alert alert-danger">ไม่พบข้อมูล</div>';
      return;
    }
    _csvMatRowsCache = rows;
    var ph = '<div class="alert alert-info">พบ '+rows.length+' รายการ</div>';
    ph += '<div style="display:flex;gap:10px">';
    ph += '<button class="btn btn-success btn-sm"';
    ph += ' onclick="importCsvRowsFromCache()">นำเข้าทั้งหมด</button>';
    ph += '<button class="btn btn-outline btn-sm"';
    ph += " onclick=\"document.getElementById('csvPreview').innerHTML=''\">";
    ph += 'ยกเลิก</button></div>';
    document.getElementById('csvPreview').innerHTML = ph;
  };
  reader.readAsText(file,'UTF-8');
}
function importCsvRows(rows){
  showLoading('กำลังนำเข้า...');
  var batch = db.batch();
  rows.forEach(function(r){
    var ref = db.collection('materials').doc();
    batch.set(ref,r);
  });
  batch.commit().then(function(){
    hideLoading();
    document.getElementById('csvPreview').innerHTML =
      '<div class="alert alert-success">นำเข้า '+rows.length+' รายการ!</div>';
    loadMaterials(function(){renderMaterials();});
  }).catch(function(){hideLoading();alert('เกิดข้อผิดพลาด');});
}

// -- RECORDS --
function saveRecord(){
  var mins = parseFloat(
    document.getElementById('part2Minutes').value
  ) || 0;
  var p1 = document.getElementById('part1Check').checked ? 570 : 0;
  var p2 = mins * 9.5;
  var p3 = 0;
  matRows.forEach(function(r){p3+=r.price*r.qty*1.31*1.15;});
  var total = p1+p2+p3;
    // แปลง photoData เป็น URL เท่านั้น (ไม่เก็บ base64)
    var photoUrls = {meter:[null],work:[null,null],equip:[null,null]};
    ['meter','work','equip'].forEach(function(g){
      photoData[g].forEach(function(p,idx){
        if(p && p.url) photoUrls[g][idx] = p.url;
        else if(typeof p==='string') photoUrls[g][idx] = p;
        else photoUrls[g][idx] = null;
      });
    });
    var rec = {
    savedBy: currentUser.name,
    savedById: currentUser.id,
    savedAt: Date.now(),
    branch: gv('f_branch'),
    pea: gv('f_pea'),
    customer: gv('f_customer'),
    address: gv('f_address'),
    coords: gv('f_coords'),
    datetime: getDatetimeValue(),
    part1: p1,
    part2Minutes: mins,
    part2: p2,
    materials: JSON.parse(JSON.stringify(matRows)),
    part3: p3,
    total: total,
    vat: total*0.07,
    grand: total*1.07,
    provider: gv('f_provider'),
    position: gv('f_position'),
    receiver: gv('f_receiver'),
    phone: gv('f_phone'),
    photos: photoUrls
  };
  showLoading('กำลังบันทึกรายการ...');
  db.collection('records').add(rec)
    .then(function(){
      hideLoading();
      alert('บันทึกรายการสำเร็จ!');
      resetForm();
      renderHistory();
    })
    .catch(function(){
      hideLoading();
      alert('เกิดข้อผิดพลาด');
    });
}

function resetForm(){
  ['f_pea','f_customer','f_address','f_receiver','f_phone']
    .forEach(function(id){document.getElementById(id).value='';});
  document.getElementById('f_customer').readOnly = false;
  document.getElementById('f_address').readOnly = false;
  document.getElementById('peaMatchLabel').innerHTML = '';
  document.getElementById('peaHint').style.display = 'none';
  if(currentUser){
    document.getElementById('f_provider').value = currentUser.name||'';
    document.getElementById('f_position').value = currentUser.position||'';
    document.getElementById('f_branch').value = currentUser.branch||'';
  }
  document.getElementById('part1Check').checked = false;
  document.getElementById('part1Label').classList.remove('checked');
  document.getElementById('part2Minutes').value = '';
  document.getElementById('part2Total').value = '';
  matRows = [];
  renderMatTable();
  resetPhotoSlots();
  setNow();
  getLocation();
  calcAll();
}
function clearForm(){
  if(!confirm('ต้องการล้างแบบฟอร์ม?')) return;
  resetForm();
}

// -- HISTORY --
var _historyRecsCache = [];

function renderHistory(){
  var kw = gv('histSearch').toLowerCase();
  showLoading('กำลังโหลดประวัติ...');
  var query;
  if(currentUser.role==='admin'){
    query = db.collection('records');
  } else {
    query = db.collection('records')
      .where('savedById','==',currentUser.id);
  }
  query.get()
    .then(function(snap){
      hideLoading();
      _historyRecsCache = [];
      snap.forEach(function(doc){
        var d = doc.data();
        d.id = doc.id;
        _historyRecsCache.push(d);
      });
      // sort client-side แทน Firestore orderBy
      _historyRecsCache.sort(function(a,b){
        return (b.savedAt||0) - (a.savedAt||0);
      });
      var recs = _historyRecsCache.slice();
      if(kw){
        recs = recs.filter(function(r){
          return (r.pea||'').includes(kw)
            || (r.customer||'').toLowerCase().includes(kw)
            || (r.branch||'').toLowerCase().includes(kw)
            || (r.savedBy||'').toLowerCase().includes(kw);
        });
      }
      var cnt = document.getElementById('histCount');
      if(cnt) cnt.textContent = 'แสดง '+recs.length+' รายการ';
      var isAdmin = currentUser.role==='admin';
      var h = '';
      if(!recs.length){
        h = '<p style="color:#9ca3af;text-align:center;';
        h += 'padding:24px">ยังไม่มีรายการ</p>';
      } else {
        h = '<div style="overflow-x:auto"><table><thead><tr>';
        h += '<th>วันที่</th><th>ผู้ใช้ไฟฟ้า</th><th>PEA</th>';
        h += '<th>สาขา</th><th>รวมทั้งสิ้น</th>';
        h += '<th>บันทึกโดย</th><th></th>';
        h += '</tr></thead><tbody>';
        recs.forEach(function(r){
          var dt = r.savedAt
            ? new Date(r.savedAt).toLocaleString('th-TH')
            : '';
          var canEdit = isAdmin
            || String(r.savedById)===String(currentUser.id);
          var rid = r.id.replace(/'/g,"\\'");
          h += '<tr><td>'+dt+'</td>';
          h += '<td>'+esc(r.customer||'-')+'</td>';
          h += '<td>'+esc(r.pea||'-')+'</td>';
          h += '<td>'+esc(r.branch||'-')+'</td>';
          h += '<td style="text-align:right;font-weight:600">';
          h += fmt(r.grand)+' B</td>';
          h += '<td>'+esc(r.savedBy||'-')+'</td>';
          h += '<td style="white-space:nowrap;display:flex;gap:4px">';
          h += '<button class="btn btn-outline btn-sm"';
          h += ' onclick="viewRecord(\''+rid+'\')">ดู</button>';
          if(canEdit){
            h += '<button class="btn btn-warning btn-sm"';
            h += ' onclick="openEditRecordById(\''+rid+'\')">แก้ไข</button>';
            h += '<button class="btn btn-danger btn-sm"';
            h += ' onclick="deleteRecord(\''+rid+'\')">ลบ</button>';
          }
          h += '</td></tr>';
        });
        h += '</tbody></table></div>';
      }
      document.getElementById('historyTable').innerHTML = h;
    })
    .catch(function(){
      hideLoading();
      document.getElementById('historyTable').innerHTML =
        '<p style="color:#dc2626;padding:20px">โหลดไม่สำเร็จ</p>';
    });
}

function deleteRecord(id){
  if(!confirm('ต้องการลบ?')) return;
  showLoading('กำลังลบ...');
  db.collection('records').doc(id).delete()
    .then(function(){hideLoading();renderHistory();})
    .catch(function(){hideLoading();alert('เกิดข้อผิดพลาด');});
}

function openEditRecordById(id){
  var r = _historyRecsCache.find(function(x){
    return String(x.id)===String(id);
  });
  if(!r){
    r = (_currentHistoryRecs||[]).find(function(x){
      return String(x.id)===String(id);
    });
  }
  if(!r){alert('ไม่พบรายการ');return;}
  openEditRecord(id,r);
}
function openEditRecord(id,r){
  document.getElementById('er_branch').value = r.branch||'';
  document.getElementById('er_pea').value = r.pea||'';
  document.getElementById('er_customer').value = r.customer||'';
  document.getElementById('er_address').value = r.address||'';
  document.getElementById('er_provider').value = r.provider||'';
  document.getElementById('er_position').value = r.position||'';
  document.getElementById('er_receiver').value = r.receiver||'';
  document.getElementById('er_phone').value = r.phone||'';
  document.getElementById('er_datetime').value = r.datetime||'';
  document.getElementById('er_id').value = id;
  document.getElementById('editRecordAlert').innerHTML = '';
  document.getElementById('editRecordModal').style.display = 'flex';
}
function closeEditRecord(){
  document.getElementById('editRecordModal').style.display = 'none';
}
function saveEditRecord(){
  var id = document.getElementById('er_id').value;
  var data = {
    branch: gv('er_branch'),
    pea: gv('er_pea'),
    customer: gv('er_customer'),
    address: gv('er_address'),
    provider: gv('er_provider'),
    position: gv('er_position'),
    receiver: gv('er_receiver'),
    phone: gv('er_phone'),
    datetime: gv('er_datetime'),
    editedBy: currentUser.name,
    editedAt: Date.now()
  };
  showLoading('กำลังบันทึก...');
  db.collection('records').doc(id).update(data)
    .then(function(){
      hideLoading();
      showAlert('editRecordAlert','บันทึกสำเร็จ','success');
      setTimeout(function(){closeEditRecord();renderHistory();},1000);
    })
    .catch(function(){
      hideLoading();
      showAlert('editRecordAlert','เกิดข้อผิดพลาด','danger');
    });
}

// -- VIEW RECORD (print window) --
function viewRecord(id){
  var rec = _historyRecsCache.find(function(x){
    return String(x.id)===String(id);
  });
  if(!rec) rec = (_currentHistoryRecs||[]).find(function(x){
    return String(x.id)===String(id);
  });
  if(!rec) rec = (_allRecsCache||[]).find(function(x){
    return String(x.id)===String(id);
  });
  if(!rec){alert('ไม่พบรายการ');return;}
  var mats = rec.materials;
  if(typeof mats==='string'){
    try{mats=JSON.parse(mats);}catch(e){mats=[];}
  }
  var mt = '';
  (mats||[]).forEach(function(m,i){
    mt += '<tr>';
    mt += '<td style="text-align:center">'+(i+1)+'</td>';
    mt += '<td>'+esc(m.code)+'</td>';
    mt += '<td>'+esc(m.desc)+'</td>';
    mt += '<td style="text-align:center">'+m.qty+'</td>';
    mt += '<td style="text-align:center">';
    mt += esc(m.unit||'')+'</td>';
    mt += '</tr>';
  });
  var ph = rec.photos;
  if(typeof ph==='string'){
    try{ph=JSON.parse(ph);}catch(e){ph={};}
  }
  var phtml = '';
  if(ph){
    var ni = '<div style="background:#eee;height:60px;';
    ni += 'display:flex;align-items:center;';
    ni += 'justify-content:center;border-radius:4px;';
    ni += 'color:#999;font-size:10px">ไม่มีรูป</div>';
    phtml = '<div style="margin-top:8px">';
    phtml += '<div style="font-weight:700;font-size:11px;';
    phtml += 'color:#4a1660;margin-bottom:4px">';
    phtml += 'ภาพถ่ายประกอบ</div>';
    phtml += '<table style="width:100%;border:none"><tr>';
    var m0 = ph.meter&&ph.meter[0];
    phtml += '<td style="width:20%;border:none;padding:2px;';
    phtml += 'vertical-align:top;font-size:10px">';
    phtml += '<b>มิเตอร์</b><br>';
    if(m0){
      phtml += '<img src="'+driveImg(m0)+'"';
      phtml += ' style="width:100%;border-radius:3px">';
    } else { phtml += ni; }
    phtml += '</td>';
    phtml += '<td style="width:40%;border:none;padding:2px;';
    phtml += 'vertical-align:top;font-size:10px">';
    phtml += '<b>ปฏิบัติงาน</b><br>';
    phtml += '<div style="display:flex;gap:3px">';
    for(var wi=0;wi<2;wi++){
      var w = ph.work&&ph.work[wi];
      if(w){
        phtml += '<img src="'+driveImg(w)+'"';
        phtml += ' style="width:50%;border-radius:3px">';
      } else { phtml += '<div style="width:50%">'+ni+'</div>'; }
    }
    phtml += '</div></td>';
    phtml += '<td style="width:40%;border:none;padding:2px;';
    phtml += 'vertical-align:top;font-size:10px">';
    phtml += '<b>อุปกรณ์แก้ไข</b><br>';
    phtml += '<div style="display:flex;gap:3px">';
    for(var ei=0;ei<2;ei++){
      var eq = ph.equip&&ph.equip[ei];
      if(eq){
        phtml += '<img src="'+driveImg(eq)+'"';
        phtml += ' style="width:50%;border-radius:3px">';
      } else { phtml += '<div style="width:50%">'+ni+'</div>'; }
    }
    phtml += '</div></td></tr></table></div>';
  }
  var r = [];
  // Header
  r.push('<div style="text-align:center;margin-bottom:8px">');
  r.push('<div style="font-size:16px;font-weight:700;');
  r.push('color:#4a1660">การไฟฟ้าส่วนภูมิภาค</div>');
  r.push('<div style="font-size:13px;font-weight:700;');
  r.push('color:#4a1660">');
  r.push('ค่าบริการงานแก้กระแสไฟฟ้าขัดข้อง (บร.1)</div>');
  r.push('<hr style="border:1px solid #4a1660;margin:6px 0">');
  r.push('</div>');
  // Info
  r.push('<table style="width:100%;border:none;');
  r.push('margin-bottom:6px;font-size:12px">');
  r.push('<tr><td style="border:none;padding:2px">');
  r.push('<b>กฟภ.สาขา:</b> '+esc(rec.branch)+'</td>');
  r.push('<td style="border:none;padding:2px">');
  r.push('<b>PEA:</b> '+esc(rec.pea)+'</td></tr>');
  r.push('<tr><td style="border:none;padding:2px">');
  r.push('<b>ผู้ใช้ไฟฟ้า:</b> '+esc(rec.customer)+'</td>');
  r.push('<td style="border:none;padding:2px">');
  r.push('<b>ที่อยู่:</b> '+esc(rec.address)+'</td></tr>');
  r.push('<tr><td style="border:none;padding:2px">');
  r.push('<b>พิกัด:</b> '+esc(rec.coords)+'</td>');
  r.push('<td style="border:none;padding:2px">');
  r.push('<b>วันที่:</b> '+esc(rec.datetime)+'</td></tr>');
  r.push('</table>');
  // Materials
  if(mt){
    r.push('<div style="font-weight:700;color:#4a1660;');
    r.push('font-size:12px;margin:6px 0 3px;');
    r.push('border-bottom:1px solid #4a1660;');
    r.push('padding-bottom:3px">รายการพัสดุ</div>');
    r.push('<table><thead>');
    r.push('<tr style="background:#4a1660;color:#fff;');
    r.push('font-size:11px">');
    r.push('<th style="padding:4px">ลำดับ</th>');
    r.push('<th style="padding:4px">รหัส</th>');
    r.push('<th style="padding:4px">รายละเอียด</th>');
    r.push('<th style="padding:4px">จำนวน</th>');
    r.push('<th style="padding:4px">หน่วย</th>');
    r.push('</tr></thead><tbody style="font-size:11px">');
    r.push(mt+'</tbody></table>');
  }
  // Summary
  r.push('<div style="font-weight:700;color:#4a1660;');
  r.push('font-size:12px;margin:8px 0 3px;');
  r.push('border-bottom:1px solid #4a1660;');
  r.push('padding-bottom:3px">สรุปค่าบริการ</div>');
  r.push('<table style="font-size:12px">');
  r.push('<thead><tr style="background:#4a1660;color:#fff">');
  r.push('<th style="padding:4px;width:40px">ลำดับ</th>');
  r.push('<th style="padding:4px">รายการ</th>');
  r.push('<th style="padding:4px;text-align:right;');
  r.push('width:120px">จำนวนเงิน (บาท)</th>');
  r.push('</tr></thead><tbody>');
  r.push('<tr><td style="text-align:center;padding:4px">1</td>');
  r.push('<td style="padding:4px">');
  r.push('ปลด-สับอุปกรณ์ตัดตอนแรงสูง</td>');
  r.push('<td style="text-align:right;padding:4px">');
  r.push(fmt(rec.part1)+'</td></tr>');
  r.push('<tr><td style="text-align:center;padding:4px">2</td>');
  r.push('<td style="padding:4px">ค่าบริการตรวจสอบ (');
  r.push(rec.part2Minutes+' นาที x 9.50)</td>');
  r.push('<td style="text-align:right;padding:4px">');
  r.push(fmt(rec.part2)+'</td></tr>');
  r.push('<tr><td style="text-align:center;padding:4px">3</td>');
  r.push('<td style="padding:4px">ค่าอุปกรณ์ในการแก้ไข</td>');
  r.push('<td style="text-align:right;padding:4px">');
  r.push(fmt(rec.part3)+'</td></tr>');
  r.push('<tr style="background:#f5eefa;font-weight:700">');
  r.push('<td colspan="2" style="text-align:right;');
  r.push('padding:4px">ยอดรวม</td>');
  r.push('<td style="text-align:right;padding:4px">');
  r.push(fmt(rec.total)+'</td></tr>');
  r.push('<tr style="background:#f5eefa">');
  r.push('<td colspan="2" style="text-align:right;');
  r.push('padding:4px">ภาษีมูลค่าเพิ่ม 7%</td>');
  r.push('<td style="text-align:right;padding:4px">');
  r.push(fmt(rec.vat)+'</td></tr>');
  r.push('<tr style="background:#4a1660;color:#fff;');
  r.push('font-weight:700;font-size:14px">');
  r.push('<td colspan="2" style="text-align:right;');
  r.push('padding:5px">รวมทั้งสิ้น</td>');
  r.push('<td style="text-align:right;padding:5px">');
  r.push(fmt(rec.grand)+'</td></tr>');
  r.push('</tbody></table>');
  // อุปกรณ์คืน
  r.push('<div style="font-weight:700;color:#4a1660;');
  r.push('font-size:12px;margin:8px 0 3px;');
  r.push('border-bottom:1px solid #4a1660;');
  r.push('padding-bottom:3px">รายการอุปกรณ์คืน</div>');
  r.push('<table style="font-size:11px"><thead>');
  r.push('<tr style="background:#f8fafc">');
  r.push('<th style="padding:4px">ลำดับ</th>');
  r.push('<th style="padding:4px">รหัสพัสดุ</th>');
  r.push('<th style="padding:4px">รายละเอียด</th>');
  r.push('<th style="padding:4px">หน่วย</th>');
  r.push('<th style="padding:4px">จำนวน</th>');
  r.push('<th style="padding:4px">สภาพ</th>');
  r.push('</tr></thead><tbody>');
  if(mats&&mats.length){
    (mats).forEach(function(m,i){
      r.push('<tr>');
      r.push('<td style="text-align:center;padding:3px">');
      r.push((i+1)+'</td>');
      r.push('<td style="padding:3px">'+esc(m.code)+'</td>');
      r.push('<td style="padding:3px">'+esc(m.desc)+'</td>');
      r.push('<td style="text-align:center;padding:3px">');
      r.push(esc(m.unit||'')+'</td>');
      r.push('<td style="text-align:center;padding:3px">');
      r.push(m.qty+'</td>');
      r.push('<td style="padding:3px">');
      r.push('................................</td>');
      r.push('</tr>');
    });
  } else {
    r.push('<tr><td colspan="6" style="text-align:center;');
    r.push('padding:8px;color:#999">- ไม่มีรายการ -</td></tr>');
  }
  r.push('</tbody></table>');
  // Photos
  r.push(phtml);
  // Signatures
  r.push('<table style="width:100%;border:none;');
  r.push('margin-top:10px;font-size:12px"><tr>');
  r.push('<td style="width:50%;border:none;padding:4px;');
  r.push('vertical-align:top">');
  r.push('<b style="color:#4a1660">ผู้ให้บริการ</b><br>');
  r.push('ชื่อ: '+esc(rec.provider)+'<br>');
  r.push('ตำแหน่ง: '+esc(rec.position));
  r.push('<div style="margin-top:20px;border-bottom:');
  r.push('1px dotted #999;width:180px"></div>');
  r.push('<div style="font-size:10px;color:#999;');
  r.push('margin-top:2px">ลงชื่อผู้ให้บริการ</div>');
  r.push('</td>');
  r.push('<td style="width:50%;border:none;padding:4px;');
  r.push('vertical-align:top">');
  r.push('<b style="color:#4a1660">ผู้รับบริการ</b><br>');
  r.push('ชื่อ: '+esc(rec.receiver)+'<br>');
  r.push('โทร: '+esc(rec.phone));
  r.push('<div style="margin-top:20px;border-bottom:');
  r.push('1px dotted #999;width:180px"></div>');
  r.push('<div style="font-size:10px;color:#999;');
  r.push('margin-top:2px">ลงชื่อผู้รับบริการ</div>');
  r.push('</td></tr></table>');
  if(rec.editedAt){
    r.push('<p style="margin-top:6px;font-size:10px;');
    r.push('color:#9ca3af">แก้ไขล่าสุด: ');
    r.push(new Date(rec.editedAt).toLocaleString('th-TH'));
    r.push(' โดย '+esc(rec.editedBy)+'</p>');
  }
  var body = r.join('');
  var w2 = window.open('','_blank','width=800,height=900');
  var css = 'body{font-family:Sarabun,sans-serif;';
  css += 'padding:15px;color:#1a202c;max-width:720px;';
  css += 'margin:0 auto;font-size:12px}';
  css += 'table{width:100%;border-collapse:collapse}';
  css += 'th,td{padding:4px 6px;border:1px solid #ddd}';
  css += 'th{background:#4a1660;color:#fff}';
  css += 'p{margin:2px 0}';
  css += '@media print{';
  css += '.no-print{display:none!important}';
  css += 'body{padding:10px}';
  css += '@page{size:A4;margin:10mm}}';
  var hh = '<html><head><meta charset=UTF-8>';
  hh += '<link href="https://fonts.googleapis.com/';
  hh += 'css2?family=Sarabun:wght@400;600;700&';
  hh += 'display=swap" rel="stylesheet">';
  hh += '<style>'+css+'</style>';
  hh += '</head><body>';
  hh += '<div id=RC></div>';
  hh += '<div class="no-print" style="text-align:center;';
  hh += 'margin-top:12px">';
  hh += '<button onclick=window.print() style="';
  hh += 'padding:8px 24px;background:#4a1660;color:#fff;';
  hh += 'border:none;border-radius:6px;cursor:pointer;';
  hh += 'font-family:Sarabun;font-size:14px;';
  hh += 'font-weight:600">Print</button></div>';
  hh += '</body></html>';
  w2.document.open();
  w2.document.write(hh);
  w2.document.close();
  w2.document.getElementById('RC').innerHTML = body;
}

// -- ADMIN USERS --
var _usersCache = [];
var _allRecsCache = [];
var _currentHistoryRecs = [];
var _currentHistoryUserId = '';
var _currentHistoryUserName = '';

function renderUsers(){
  showLoading('กำลังโหลดผู้ใช้...');
  db.collection('users').get()
    .then(function(snap){
      _usersCache = [];
      snap.forEach(function(doc){
        var d = doc.data();
        d.id = doc.id;
        _usersCache.push(d);
      });
      return db.collection('records').get();
    })
    .then(function(snap){
      hideLoading();
      _allRecsCache = [];
      snap.forEach(function(doc){
        var d = doc.data();
        d.id = doc.id;
        _allRecsCache.push(d);
      });
      var h = '<div style="overflow-x:auto"><table><thead><tr>';
      h += '<th>ชื่อ</th><th>รหัส</th><th>รหัสผ่าน</th>';
      h += '<th>สาขา</th><th>ตำแหน่ง</th>';
      h += '<th>บทบาท</th><th>สถานะ</th><th>จัดการ</th>';
      h += '</tr></thead><tbody>';
      _usersCache.forEach(function(u){
        var badge = u.status==='approved'?'badge-green'
          : u.status==='pending'?'badge-yellow':'badge-red';
        var stTH = u.status==='approved'?'อนุมัติแล้ว'
          : u.status==='pending'?'รออนุมัติ':'ปฏิเสธ';
        var recCount = _allRecsCache.filter(function(r){
          return String(r.savedById)===String(u.id);
        }).length;
        var uid = u.id.replace(/'/g,"\\'");
        h += '<tr><td>'+esc(u.name)+'</td>';
        h += '<td><code>'+esc(u.username)+'</code></td>';
        h += '<td><code>'+esc(u.password||'')+'</code></td>';
        h += '<td>'+esc(u.branch||'-')+'</td>';
        h += '<td>'+esc(u.position||'-')+'</td>';
        var rc = u.role==='admin'?'badge-blue':'badge-green';
        h += '<td><span class="badge '+rc+'">'+u.role+'</span></td>';
        h += '<td><span class="badge '+badge+'">'+stTH+'</span></td>';
        h += '<td><div style="display:flex;gap:4px;flex-wrap:wrap">';
        h += '<button class="btn btn-warning btn-sm"';
        h += ' onclick="openEditUserById(\''+uid+'\')">แก้ไข</button>';
        h += '<button class="btn btn-outline btn-sm"';
        h += ' onclick="openUserHistoryById(\''+uid+'\')">ประวัติ';
        if(recCount>0){
          h += ' <span style="background:#742582;color:#fff;';
          h += 'border-radius:20px;padding:1px 6px;font-size:11px">';
          h += recCount+'</span>';
        }
        h += '</button>';
        if(u.status==='pending'){
          h += '<button class="btn btn-success btn-sm"';
          h += ' onclick="approveUser(\''+uid+'\')">OK</button>';
          h += '<button class="btn btn-danger btn-sm"';
          h += ' onclick="rejectUser(\''+uid+'\')">X</button>';
        }
        if(u.id!==currentUser.id){
          h += '<button class="btn btn-danger btn-sm"';
          h += ' onclick="deleteUser(\''+uid+'\')">ลบ</button>';
        }
        h += '</div></td></tr>';
      });
      h += '</tbody></table></div>';
      document.getElementById('userTable').innerHTML = h;
    })
    .catch(function(){
      hideLoading();
      document.getElementById('userTable').innerHTML =
        '<p style="color:#dc2626;padding:20px">โหลดไม่สำเร็จ</p>';
    });
}

function approveUser(id){
  showLoading('กำลังอัปเดต...');
  db.collection('users').doc(id).update({status:'approved'})
    .then(function(){hideLoading();renderUsers();})
    .catch(function(){hideLoading();alert('เกิดข้อผิดพลาด');});
}
function rejectUser(id){
  showLoading('กำลังอัปเดต...');
  db.collection('users').doc(id).update({status:'rejected'})
    .then(function(){hideLoading();renderUsers();})
    .catch(function(){hideLoading();alert('เกิดข้อผิดพลาด');});
}
function deleteUser(id){
  if(!confirm('ต้องการลบผู้ใช้?')) return;
  showLoading('กำลังลบ...');
  db.collection('users').doc(id).delete()
    .then(function(){hideLoading();renderUsers();})
    .catch(function(){hideLoading();alert('เกิดข้อผิดพลาด');});
}
function openEditUserById(id){
  var u = _usersCache.find(function(x){
    return String(x.id)===String(id);
  });
  if(u) openEditUser(u);
}
function openUserHistoryById(id){
  var u = _usersCache.find(function(x){
    return String(x.id)===String(id);
  });
  if(u) openUserHistory(id,u.name,_allRecsCache);
}
function openEditUser(u){
  document.getElementById('eu_id').value = u.id;
  document.getElementById('eu_name').value = u.name||'';
  document.getElementById('eu_username').value = u.username||'';
  document.getElementById('eu_email').value = u.email||'';
  document.getElementById('eu_position').value = u.position||'';
  document.getElementById('eu_branch').value = u.branch||'';
  document.getElementById('euBranchDropdown').style.display = 'none';
  document.getElementById('eu_role').value = u.role||'user';
  document.getElementById('eu_status').value = u.status||'approved';
  document.getElementById('eu_password').value = '';
  document.getElementById('editUserAlert').innerHTML = '';
  document.getElementById('editUserModal').style.display = 'flex';
}
function closeEditUser(){
  document.getElementById('editUserModal').style.display = 'none';
}
function saveEditUser(){
  var id = document.getElementById('eu_id').value;
  var name = gv('eu_name');
  var email = gv('eu_email');
  var position = gv('eu_position');
  var branch = gv('eu_branch');
  var role = gv('eu_role');
  var status = gv('eu_status');
  var newpass = document.getElementById('eu_password').value.trim();
  if(!name){showAlert('editUserAlert','กรุณากรอกชื่อ','danger');return;}
  var data = {
    name:name,email:email,position:position,
    branch:branch,role:role,status:status
  };
  if(newpass) data.password = newpass;
  showLoading('กำลังบันทึก...');
  db.collection('users').doc(id).update(data)
    .then(function(){
      hideLoading();
      showAlert('editUserAlert','บันทึกสำเร็จ','success');
      setTimeout(function(){closeEditUser();renderUsers();},900);
    })
    .catch(function(){
      hideLoading();
      showAlert('editUserAlert','เกิดข้อผิดพลาด','danger');
    });
}

function openUserHistory(userId,userName,allRecs){
  _currentHistoryRecs = allRecs||[];
  _currentHistoryUserId = userId;
  _currentHistoryUserName = userName;
  document.getElementById('userHistoryTitle').textContent =
    'ประวัติ บร.1 ของ: '+userName;
  var recs = _currentHistoryRecs.filter(function(r){
    return String(r.savedById)===String(userId);
  });
  var h = '';
  if(!recs.length){
    h = '<p style="color:#9ca3af;text-align:center;';
    h += 'padding:24px">ยังไม่มีรายการ</p>';
  } else {
    h = '<div style="margin-bottom:8px;font-size:13px;';
    h += 'color:#6b7280">พบ '+recs.length+' รายการ</div>';
    h += '<div style="overflow-x:auto"><table><thead><tr>';
    h += '<th>วันที่</th><th>ผู้ใช้ไฟฟ้า</th><th>PEA</th>';
    h += '<th>สาขา</th><th>รวมทั้งสิ้น</th><th></th>';
    h += '</tr></thead><tbody>';
    recs.forEach(function(r){
      var dt = r.savedAt
        ? new Date(r.savedAt).toLocaleString('th-TH')
        : '';
      var rid = r.id.replace(/'/g,"\\'");
      h += '<tr><td>'+dt+'</td>';
      h += '<td>'+esc(r.customer||'-')+'</td>';
      h += '<td>'+esc(r.pea||'-')+'</td>';
      h += '<td>'+esc(r.branch||'-')+'</td>';
      h += '<td style="text-align:right;font-weight:600;';
      h += 'color:#4a1660">'+fmt(r.grand)+' B</td>';
      h += '<td style="white-space:nowrap;display:flex;gap:4px">';
      h += '<button class="btn btn-outline btn-sm"';
      h += ' onclick="viewRecord(\''+rid+'\')">ดู</button>';
      h += '<button class="btn btn-warning btn-sm"';
      h += ' onclick="openEditRecordById(\''+rid+'\');';
      h += 'closeUserHistory()">แก้ไข</button>';
      h += '<button class="btn btn-danger btn-sm"';
      h += ' onclick="deleteRecordFromModal(\''+rid+'\')">ลบ</button>';
      h += '</td></tr>';
    });
    h += '</tbody></table></div>';
  }
  document.getElementById('userHistoryContent').innerHTML = h;
  document.getElementById('userHistoryModal').style.display = 'flex';
}
function closeUserHistory(){
  document.getElementById('userHistoryModal').style.display = 'none';
}
function deleteRecordFromModal(recId){
  if(!confirm('ต้องการลบ?')) return;
  showLoading('กำลังลบ...');
  db.collection('records').doc(recId).delete()
    .then(function(){
      hideLoading();
      _currentHistoryRecs = _currentHistoryRecs.filter(function(r){
        return String(r.id)!==String(recId);
      });
      renderHistory();
      openUserHistory(
        _currentHistoryUserId,
        _currentHistoryUserName,
        _currentHistoryRecs
      );
    })
    .catch(function(){hideLoading();alert('เกิดข้อผิดพลาด');});
}

// -- MAT TABLE --
function addMat(){
  matRows.push({
    id:Date.now(),code:'',desc:'',unit:'',qty:1,price:0
  });
  renderMatTable();
}
function renderMatTable(){
  var h = '';
  matRows.forEach(function(row){
    var displayVal = '';
    if(row.code){
      displayVal = row.code+' | '+row.desc;
    }
    var total = row.price*row.qty*1.31*1.15;
    h += '<tr><td style="position:relative">';
    h += '<input type="text" value="'+esc(displayVal)+'"';
    h += ' placeholder="พิมพ์รหัสหรือชื่อพัสดุ..."';
    h += ' oninput="matSearch('+row.id+',this)"';
    h += ' onfocus="matSearch('+row.id+',this)"';
    h += ' style="font-size:12px">';
    h += '<div id="matDD_'+row.id+'"';
    h += ' style="position:absolute;z-index:50;';
    h += 'background:#fff;border:1px solid #c084e8;';
    h += 'border-radius:6px;';
    h += 'box-shadow:0 4px 12px rgba(0,0,0,.1);';
    h += 'max-height:160px;overflow-y:auto;';
    h += 'width:100%;display:none;left:0;';
    h += 'top:calc(100% - 2px)"></div>';
    h += '</td>';
    h += '<td><input type="text" value="'+esc(row.desc);
    h += '" readonly style="font-size:13px"></td>';
    h += '<td><input type="text" value="'+esc(row.unit);
    h += '" readonly style="width:58px;font-size:13px"></td>';
    h += '<td><input type="number" min="1"';
    h += ' value="'+row.qty+'"';
    h += ' style="width:65px;font-size:13px"';
    h += ' onchange="matQtyChange('+row.id+',this)"></td>';
    h += '<td><input type="text" value="'+fmt(row.price);
    h += '" readonly style="font-size:13px"></td>';
    h += '<td style="font-weight:600;color:#4a1660">';
    h += fmt(total)+'</td>';
    h += '<td><button class="btn btn-danger btn-sm"';
    h += ' onclick="removeMat('+row.id+')">X</button>';
    h += '</td></tr>';
  });
  if(!matRows.length){
    h = '<tr><td colspan="7" style="text-align:center;';
    h += 'color:#9ca3af;padding:18px">';
    h += 'ยังไม่มีรายการพัสดุ</td></tr>';
  }
  document.getElementById('matBody').innerHTML = h;
  calcAll();
}
function matSearch(rowId,inp){
  var val = inp.value.toLowerCase();
  var mats = getFormMaterials();
  var dd = document.getElementById('matDD_'+rowId);
  if(!dd) return;
  var filtered = mats;
  if(val){
    filtered = mats.filter(function(m){
      return (m.code||'').toLowerCase().includes(val)
        || (m.desc||'').toLowerCase().includes(val);
    });
  }
  if(!filtered.length){
    dd.innerHTML = '<div style="padding:8px;';
    dd.innerHTML += 'color:#9ca3af;font-size:12px">';
    dd.innerHTML += 'ไม่พบพัสดุ</div>';
    dd.style.display = 'block';
    return;
  }
  dd.innerHTML = '';
  filtered.slice(0,10).forEach(function(m){
    var item = document.createElement('div');
    item.style.cssText =
      'padding:6px 10px;cursor:pointer;' +
      'border-bottom:1px solid #f1f5f9;font-size:12px';
    item.innerHTML =
      '<b>'+esc(m.code)+'</b>' +
      '<span style="color:#6b7280;margin-left:6px">' +
      esc(m.desc)+'</span>' +
      '<span style="color:#4a1660;margin-left:6px;' +
      'font-weight:600">'+fmt(m.price)+' บ.</span>';
    item.onmousedown = function(e){
      e.preventDefault();
      matSelectItem(rowId,m);
      dd.style.display = 'none';
    };
    item.onmouseover = function(){
      this.style.background = '#f5eefa';
    };
    item.onmouseout = function(){
      this.style.background = '';
    };
    dd.appendChild(item);
  });
  dd.style.display = 'block';
}
function matSelectItem(rowId,m){
  var row = matRows.find(function(r){return r.id===rowId;});
  if(row){
    row.code = m.code;
    row.desc = m.desc;
    row.unit = m.unit||'';
    row.price = m.price;
  }
  renderMatTable();
}
// ปิด dropdown เมื่อคลิกที่อื่น
document.addEventListener('click',function(e){
  var dds = document.querySelectorAll('[id^="matDD_"]');
  dds.forEach(function(dd){
    if(!dd.contains(e.target) &&
       !dd.previousElementSibling.contains(e.target)){
      dd.style.display = 'none';
    }
  });
});
function matCodeChange(id,sel){
  var m = cache.materials.find(function(x){
    return x.code===sel.value;
  });
  var row = matRows.find(function(r){return r.id===id;});
  if(row){
    row.code = sel.value;
    row.desc = m?m.desc:'';
    row.unit = m?m.unit||'':'';
    row.price = m?m.price:0;
  }
  renderMatTable();
}
function matQtyChange(id,inp){
  var row = matRows.find(function(r){return r.id===id;});
  if(row) row.qty = parseFloat(inp.value)||1;
  renderMatTable();
}
function removeMat(id){
  matRows = matRows.filter(function(r){return r.id!==id;});
  renderMatTable();
}

// -- CALC --
function calcAll(){
  var chk = document.getElementById('part1Check');
  var p1 = chk.checked?570:0;
  document.getElementById('part1Label')
    .classList.toggle('checked',p1>0);
  var mins = parseFloat(
    document.getElementById('part2Minutes').value
  )||0;
  var p2 = mins*9.5;
  document.getElementById('part2Total').value = fmt(p2)+' บาท';
  var p3 = 0;
  matRows.forEach(function(r){p3+=r.price*r.qty*1.31*1.15;});
  document.getElementById('part3Total').textContent = fmt(p3);
  var total = p1+p2+p3;
  var vat = total*0.07;
  var grand = total+vat;
  var vals = [
    ['s1',p1],['s2',p2],['s3',p3],
    ['sTotal',total],['sVat',vat],['sGrand',grand]
  ];
  vals.forEach(function(x){
    document.getElementById(x[0]).textContent = fmt(x[1]);
  });
}

// -- PHOTOS --
function triggerPhoto(g,i){
  var slot = document.getElementById('slot_'+g+'_'+i);
  slot.querySelector('input[type=file]').click();
}
function handlePhoto(g,i,input){
  var file = input.files[0];
  if(!file) return;
  var reader = new FileReader();
  reader.onload = function(e){
    var img = new Image();
    img.onload = function(){
      var canvas = document.createElement('canvas');
      var MAX = 800;
      var w = img.width;
      var h = img.height;
      if(w>MAX){h=Math.round(h*MAX/w);w=MAX;}
      if(h>MAX){w=Math.round(w*MAX/h);h=MAX;}
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(img,0,0,w,h);
      var b64 = canvas.toDataURL('image/jpeg',0.7);
      // แสดง preview ทันที
      renderPhotoSlot(g,i,b64);
      // upload ไป Google Drive
      var fname = g+'_'+i+'_'+Date.now()+'.jpg';
      showLoading('กำลังอัปโหลดรูป...');
      fetch(PHOTO_GAS_URL,{
        method:'POST',
        redirect:'follow',
        headers:{'Content-Type':'text/plain'},
        body:JSON.stringify({
          action:'uploadPhoto',
          base64:b64,
          filename:fname
        })
      })
      .then(function(r){return r.json();})
      .then(function(r){
        hideLoading();
        if(r && r.ok){
          // เก็บ Drive URL + fileId
          photoData[g][i] = {
            url: r.url,
            fileId: r.fileId
          };
        } else {
          alert('อัปโหลดรูปไม่สำเร็จ');
          photoData[g][i] = null;
          renderPhotoSlot(g,i,null);
        }
      })
      .catch(function(){
        hideLoading();
        alert('เชื่อมต่อ Google Drive ไม่ได้');
        photoData[g][i] = null;
        renderPhotoSlot(g,i,null);
      });
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
function renderPhotoSlot(g,i,src){
  var slot = document.getElementById('slot_'+g+'_'+i);
  if(!slot) return;
  // src อาจเป็น base64, URL, หรือ object {url:...}
  var imgSrc = null;
  if(src){
    if(typeof src==='string') imgSrc = src;
    else if(src.url) imgSrc = src.url;
  }
  if(imgSrc){
    slot.classList.add('has-img');
    slot.querySelector('.ph').style.display = 'none';
    var img = slot.querySelector('img');
    if(!img){
      img = document.createElement('img');
      slot.insertBefore(img,slot.firstChild);
    }
    img.src = driveImg(imgSrc);
  } else {
    slot.classList.remove('has-img');
    slot.querySelector('.ph').style.display = '';
    var img2 = slot.querySelector('img');
    if(img2) img2.remove();
  }
}
function removePhoto(g,i,event){
  event.stopPropagation();
  // ลบจาก Google Drive ด้วย
  var pd = photoData[g][i];
  if(pd && pd.fileId){
    fetch(PHOTO_GAS_URL,{
      method:'POST',
      redirect:'follow',
      headers:{'Content-Type':'text/plain'},
      body:JSON.stringify({
        action:'deletePhoto',
        fileId:pd.fileId
      })
    }).catch(function(){});
  }
  photoData[g][i] = null;
  renderPhotoSlot(g,i,null);
  var slot = document.getElementById('slot_'+g+'_'+i);
  if(slot){
    var inp = slot.querySelector('input[type=file]');
    if(inp) inp.value = '';
  }
}
function resetPhotoSlots(){
  photoData = {meter:[null],work:[null,null],equip:[null,null]};
  var groups = [['meter',1],['work',2],['equip',2]];
  groups.forEach(function(x){
    for(var i=0;i<x[1];i++) renderPhotoSlot(x[0],i,null);
  });
}

// -- NAV --
function switchTab(t){
  ['BR1','History','Admin'].forEach(function(x){
    document.getElementById('tab'+x).classList.remove('active');
    var n = document.getElementById('nav'+x);
    if(n) n.classList.remove('active');
  });
  var map = {br1:'BR1',history:'History',admin:'Admin'};
  document.getElementById('tab'+map[t]).classList.add('active');
  document.getElementById('nav'+map[t]).classList.add('active');
  if(t==='history') renderHistory();
  if(t==='admin'){
    renderUsers();
    renderBranches();
    renderMaterials();
    renderCustomers();
  }
}
function switchAdminTab(t){
  var tabs = ['users','branches','customers','materials'];
  document.querySelectorAll('#adminTabs .tab')
    .forEach(function(el,i){
      el.classList.toggle('active',tabs[i]===t);
    });
  var ids = ['atUsers','atBranches','atCustomers','atMaterials'];
  ids.forEach(function(id){
    document.getElementById(id).classList.remove('active');
  });
  var map = {
    users:'atUsers',branches:'atBranches',
    customers:'atCustomers',materials:'atMaterials'
  };
  document.getElementById(map[t]).classList.add('active');
  if(t==='users') renderUsers();
  if(t==='branches') renderBranches();
  if(t==='customers') renderCustomers();
  if(t==='materials') renderMaterials();
}

// -- UTILS --
function gv(id){
  var el = document.getElementById(id);
  return el ? el.value.trim() : '';
}
function setNow(){
  var now = new Date();
  var thM = [
    'มกราคม','กุมภาพันธ์','มีนาคม','เมษายน',
    'พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม',
    'กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'
  ];
  var pad = function(n){return String(n).padStart(2,'0');};
  var display = now.getDate()+' '+thM[now.getMonth()]+' ';
  display += (now.getFullYear()+543)+' ';
  display += pad(now.getHours())+':'+pad(now.getMinutes())+' น.';
  var iso = now.getFullYear()+'-';
  iso += pad(now.getMonth()+1)+'-'+pad(now.getDate());
  iso += 'T'+pad(now.getHours())+':'+pad(now.getMinutes());
  document.getElementById('f_datetime_display').value = display;
  document.getElementById('f_datetime').value = iso;
}
function syncDatetimeFromDisplay(){
  document.getElementById('f_datetime').value =
    document.getElementById('f_datetime_display').value;
}
function getDatetimeValue(){
  return document.getElementById('f_datetime_display').value
    || document.getElementById('f_datetime').value;
}
function getLocation(){
  if(!navigator.geolocation){
    document.getElementById('f_coords').value = 'ไม่รองรับ GPS';
    return;
  }
  document.getElementById('f_coords').value = 'กำลังระบุพิกัด...';
  navigator.geolocation.getCurrentPosition(
    function(p){
      document.getElementById('f_coords').value =
        p.coords.latitude.toFixed(6)+', '+
        p.coords.longitude.toFixed(6);
    },
    function(){
      document.getElementById('f_coords').value =
        'ไม่สามารถระบุพิกัดได้';
    }
  );
}
function showAlert(id,msg,type){
  document.getElementById(id).innerHTML =
    '<div class="alert alert-'+type+'">'+msg+'</div>';
}
function fmt(n){
  return (parseFloat(n)||0).toLocaleString('th-TH',{
    minimumFractionDigits:2,
    maximumFractionDigits:2
  });
}
function esc(s){
  return (s||'')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}
// แปลง Drive URL ให้แสดงรูปได้
function driveImg(url){
  if(!url) return '';
  // แปลง drive.google.com/uc?id=XXX
  var m = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if(m) return 'https://lh3.googleusercontent.com/d/'+m[1];
  // แปลง drive.google.com/file/d/XXX
  var m2 = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if(m2) return 'https://lh3.googleusercontent.com/d/'+m2[1];
  // ถ้าเป็น lh3 อยู่แล้ว หรือ base64 ให้ใช้ตรงๆ
  return url;
}

setNow();
renderMatTable();
