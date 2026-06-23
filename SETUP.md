# ขั้นตอนตั้งค่าระบบ บร.1 (Firebase + Google Drive)

## ส่วนที่ 1 - สร้าง Firebase Project

1. ไปที่ https://console.firebase.google.com
2. กด "Add project" (สร้างโปรเจกต์)
3. ตั้งชื่อ: `PEA-BR1`
4. ปิด Google Analytics (ไม่จำเป็น) แล้วกด "Create project"
5. รอสักครู่แล้วกด "Continue"

## ส่วนที่ 2 - เปิด Firestore Database

1. ในหน้า Firebase Console เลือก "Build" > "Firestore Database"
2. กด "Create database"
3. เลือก Location: `asia-southeast1` (สิงคโปร์) หรือ `asia-southeast2`
4. เลือก "Start in test mode" (เพื่อทดสอบก่อน)
5. กด "Create"

## ส่วนที่ 3 - สร้าง Web App เพื่อรับ Config

1. ในหน้า Firebase Console กดไอคอน "</>" (Web) ที่หน้าหลัก
2. ตั้งชื่อ: `PEA-BR1-Web`
3. ไม่ต้องติ๊ก Firebase Hosting
4. กด "Register app"
5. จะเห็น Firebase Config แบบนี้:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "pea-br1.firebaseapp.com",
  projectId: "pea-br1",
  storageBucket: "pea-br1.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

6. Copy ค่าทั้งหมดไว้

## ส่วนที่ 4 - ใส่ Config ลงใน index.html

เปิด `index.html` ใน VS Code แล้วหาบรรทัดนี้:

```javascript
var firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  ...
};
```

แทนที่ด้วยค่าที่ Copy มาจาก Firebase Console

## ส่วนที่ 5 - สร้าง Firestore Index

เปิด browser ไปที่ `index.html` แล้ว login ด้วย admin/admin1234
ถ้าเปิด Console (F12) แล้วเห็น error เกี่ยวกับ index
ให้คลิกลิงก์ใน error เพื่อสร้าง index อัตโนมัติ

Index ที่ต้องการ:
- Collection: `records` | Fields: `savedById` ASC, `savedAt` DESC

## ส่วนที่ 6 - ตั้งค่า Google Drive สำหรับรูปภาพ (ถ้าต้องการ)

1. เปิด Google Drive สร้างโฟลเดอร์ชื่อ `PEA_BR1_Photos`
2. คลิกขวาที่โฟลเดอร์ > "Share" > เปลี่ยนเป็น "Anyone with the link"
3. Copy Folder ID จาก URL:
   `https://drive.google.com/drive/folders/[FOLDER_ID]`
4. ไปที่ https://script.google.com สร้างโปรเจกต์ใหม่
5. วาง Code จาก `PhotoUpload.gs`
6. ใส่ FOLDER_ID ที่ Copy มา
7. Deploy > New deployment > Web app > Anyone > Deploy
8. Copy URL แล้วใส่ใน `index.html` ที่ `PHOTO_GAS_URL`

## ส่วนที่ 7 - ทดสอบระบบ

1. เปิด `index.html` ด้วย Live Server
2. Login: admin / admin1234
3. ดู navbar ขวาบน ต้องขึ้น "Firebase OK"
4. ทดสอบเพิ่มสาขา พัสดุ ผู้ใช้ไฟฟ้า
5. ทดสอบบันทึก บร.1

## ส่วนที่ 8 - Security Rules (สำหรับ Production)

เมื่อทดสอบเสร็จ ต้องเปลี่ยน Firestore Rules:

ไปที่ Firebase Console > Firestore > Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

หมายเหตุ: ระบบนี้ใช้ภายใน กฟภ. เท่านั้น
ไม่ได้เปิดให้ public ใช้งาน จึงใช้ rules แบบ open ได้

## Admin Login

```
รหัสประจำตัว: admin
รหัสผ่าน:     admin1234
```
