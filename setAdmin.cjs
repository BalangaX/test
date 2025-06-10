const admin = require("firebase-admin");
const serviceAccount = require("./functions/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uid = "8zfmpeiXzeOL1GsJhOATOir1Bvn2";

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log("🟢 Custom claim 'admin' הוגדר בהצלחה ל-UID:", uid);
    process.exit(0);
  })
  .catch((err) => {
    console.error("🔴 שגיאה בהגדרת ה-Custom claim:", err);
    process.exit(1);
  });