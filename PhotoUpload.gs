// PhotoUpload.gs - Google Apps Script สำหรับ upload รูปภาพไป Google Drive
// ใช้คู่กับระบบ บร.1 (Firebase version)

// === ตั้งค่า ===
// สร้าง folder ใน Google Drive แล้วใส่ ID ตรงนี้
var DRIVE_FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action;

    if (action === 'ping') {
      return jsonResp({ok: true, message: 'pong'});
    }

    if (action === 'uploadPhoto') {
      var b64 = data.base64; // base64 string (without prefix)
      var filename = data.filename || 'photo_' + Date.now() + '.jpg';

      // ลบ prefix ถ้ามี
      if (b64.indexOf(',') > -1) {
        b64 = b64.split(',')[1];
      }

      var blob = Utilities.newBlob(
        Utilities.base64Decode(b64),
        'image/jpeg',
        filename
      );

      var folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
      var file = folder.createFile(blob);
      file.setSharing(
        DriveApp.Access.ANYONE_WITH_LINK,
        DriveApp.Permission.VIEW
      );

      var fileId = file.getId();
      var url = 'https://drive.google.com/uc?id=' + fileId;

      return jsonResp({
        ok: true,
        fileId: fileId,
        url: url
      });
    }

    if (action === 'deletePhoto') {
      var fileId = data.fileId;
      if (fileId) {
        try {
          DriveApp.getFileById(fileId).setTrashed(true);
        } catch(e) {}
      }
      return jsonResp({ok: true});
    }

    return jsonResp({ok: false, error: 'Unknown action'});

  } catch(err) {
    return jsonResp({ok: false, error: err.toString()});
  }
}

function doGet(e) {
  return jsonResp({ok: true, message: 'Photo Upload API'});
}

function jsonResp(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
