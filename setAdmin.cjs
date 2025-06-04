// setAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require("./functions/serviceAccountKey.json");
const logger = require("./logger.cjs");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// הכנס כאן את ה-UID של המשתמש שברצונך להפוך לאדמין
const uid = "Xch5Z5BX0DgXqiMCy3OKTmqlFaA2";

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    logger.log("🟢 Custom claim 'admin' הוגדר בהצלחה ל-UID:", uid);
    process.exit(0);
  })
  .catch((err) => {
    logger.error("🔴 שגיאה בהגדרת ה-Custom claim:", err);
    process.exit(1);
  });