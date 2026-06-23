# 🔥 คู่มือตั้งค่า Firebase สำหรับระบบ บร.1

---

## 📁 โครงสร้างโฟลเดอร์

```
📂 pea-br1/
    ├── index.html          ← ไฟล์ pea_br1_firebase.html (เปลี่ยนชื่อเป็นนี้)
    └── FIREBASE_SETUP.md   ← ไฟล์คู่มือนี้
```

---

## 🚀 ขั้นตอนที่ 1 — สร้าง Firebase Project

1. เปิดเบราว์เซอร์ไปที่ **https://console.firebase.google.com**
2. กด **"Add project"** หรือ **"เพิ่มโปรเจ็กต์"**
3. ตั้งชื่อ Project เช่น `pea-br1-system`
4. **ปิด** Google Analytics (ไม่จำเป็น) → กด **Create project**
5. รอสักครู่ → กด **Continue**

---

## 🚀 ขั้นตอนที่ 2 — เปิดใช้ Firestore Database

1. เมนูซ้ายมือ → **Build** → **Firestore Database**
2. กด **"Create database"**
3. เลือก **"Start in test mode"** (ทดสอบก่อน)
4. เลือก Location: **asia-southeast1 (Singapore)** → กด **Enable**

> ⚠️ Test mode ใช้ได้ 30 วัน ต้องตั้ง Security Rules ภายหลัง

---

## 🚀 ขั้นตอนที่ 3 — เปิดใช้ Storage (สำหรับรูปภาพ)

1. เมนูซ้ายมือ → **Build** → **Storage**
2. กด **"Get started"**
3. เลือก **"Start in test mode"** → กด **Next**
4. เลือก Location: **asia-southeast1** → กด **Done**

---

## 🚀 ขั้นตอนที่ 4 — คัดลอก Firebase Config

1. เมนูซ้ายมือ → **Project Overview** (รูปบ้าน)
2. กดไอคอน **`</>`** (Web app)
3. ตั้งชื่อ App เช่น `pea-br1-web` → กด **Register app**
4. จะได้โค้ดแบบนี้:

```javascript
const firebaseConfig = {
  apiKey:            "AIzaSy.......................",
  authDomain:        "pea-br1-system.firebaseapp.com",
  projectId:         "pea-br1-system",
  storageBucket:     "pea-br1-system.appspot.com",
  messagingSenderId: "123456789012",
  appId:             "1:123456789012:web:abcdef123456"
};
```

5. **คัดลอกค่าทั้งหมด**

---

## 🚀 ขั้นตอนที่ 5 — วาง Config ใน index.html

เปิดไฟล์ `index.html` ใน VS Code
หาบรรทัดนี้ (ประมาณบรรทัดที่ 200):

```javascript
// ╔══════════════════════════════════════════╗
// ║   🔧 วาง Firebase Config ของคุณตรงนี้   ║
// ╚══════════════════════════════════════════╝
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
```

**แทนที่ค่า YOUR_... ด้วยค่าจริงที่คัดลอกมา** แล้วกด `Ctrl+S`

---

## 🚀 ขั้นตอนที่ 6 — ตั้ง Security Rules (สำคัญมาก!)

### Firestore Rules
1. Firebase Console → **Firestore** → แท็บ **Rules**
2. วางโค้ดนี้ทับของเดิม:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users collection
    match /pea_users/{userId} {
      allow read, write: if true; // ควบคุมด้วย app logic
    }

    // Materials - อ่านได้ทุกคน, เขียนได้เฉพาะ admin (จัดการใน app)
    match /pea_materials/{matId} {
      allow read, write: if true;
    }

    // Records
    match /pea_records/{recordId} {
      allow read, write: if true;
    }
  }
}
```

3. กด **Publish**

### Storage Rules
1. Firebase Console → **Storage** → แท็บ **Rules**
2. วางโค้ดนี้:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

3. กด **Publish**

---

## 🚀 ขั้นตอนที่ 7 — รันระบบ

### วิธีที่ 1: Live Server (VS Code)
- ติดตั้ง Extension **Live Server**
- คลิกขวา `index.html` → **Open with Live Server**
- เปิดที่ `http://127.0.0.1:5500`

### วิธีที่ 2: เปิดไฟล์ตรง
- ดับเบิลคลิก `index.html`

> ⚠️ Firebase Storage **ต้องใช้ Live Server หรือ https** เท่านั้น
> ถ้าเปิดไฟล์ตรง (file://) รูปภาพจะอัปโหลดไม่ได้

---

## 🔑 บัญชีเริ่มต้น

| Username | Password | บทบาท |
|----------|----------|-------|
| `admin`  | `admin1234` | Admin |

> เปลี่ยนรหัสผ่าน Admin ได้ใน Firebase Console → Firestore → pea_users → admin

---

## 📊 โครงสร้างข้อมูลใน Firestore

```
Firestore
├── 📁 pea_users/
│   ├── admin          ← document id = "admin"
│   │   ├── username: "admin"
│   │   ├── password: "admin1234"
│   │   ├── name: "ผู้ดูแลระบบ"
│   │   ├── role: "admin"
│   │   └── status: "approved"
│   └── {autoId}       ← User ที่สมัครใหม่
│
├── 📁 pea_materials/
│   ├── PEA-001        ← document id = รหัสพัสดุ
│   │   ├── code: "PEA-001"
│   │   ├── desc: "สายไฟแรงสูง..."
│   │   ├── unit: "ม."
│   │   ├── price: 850
│   │   ├── type: "สายไฟ"
│   │   └── inuse: "ใช้"
│   └── ...
│
└── 📁 pea_records/
    └── rec_1234567890  ← document id
        ├── savedAt: Timestamp
        ├── customer: "นายสมชาย..."
        ├── grand: 5432.10
        ├── photoUrls: { meter:[url], work:[url,url], equip:[url,url] }
        └── ...

Storage
└── 📁 records/
    └── rec_1234567890/
        ├── meter_0.jpg
        ├── work_0.jpg
        ├── work_1.jpg
        ├── equip_0.jpg
        └── equip_1.jpg
```

---

## 🌐 Deploy ให้ทุกคนเข้าถึงได้ (ไม่ต้องเปิดคอมตลอด)

### วิธีที่ 1: Firebase Hosting (ฟรี แนะนำ)

```bash
# ติดตั้ง Node.js ก่อนที่ https://nodejs.org
# แล้วรันคำสั่งใน Terminal / Command Prompt

npm install -g firebase-tools
firebase login
firebase init hosting
# เลือก project: pea-br1-system
# Public directory: . (จุด)
# Single-page app: No
firebase deploy
```

ได้ URL เช่น: `https://pea-br1-system.web.app` 🎉

### วิธีที่ 2: Netlify Drop (ง่ายที่สุด ฟรี)
1. ไปที่ **https://app.netlify.com/drop**
2. ลากโฟลเดอร์ `pea-br1/` ไปวาง
3. ได้ URL ทันที เช่น `https://amazing-name-123.netlify.app`

---

## ❓ แก้ปัญหาที่พบบ่อย

| ปัญหา | สาเหตุ | วิธีแก้ |
|-------|--------|---------|
| Firebase ✗ ใน Navbar | Config ผิด | ตรวจสอบ apiKey / projectId |
| อัปโหลดรูปไม่ได้ | เปิดแบบ file:// | ใช้ Live Server |
| ข้อมูลไม่ sync | Rules ไม่อนุญาต | ตรวจสอบ Firestore Rules |
| เข้าระบบไม่ได้ | Firestore ยังไม่เปิด | ทำขั้นตอนที่ 2 ให้ครบ |

