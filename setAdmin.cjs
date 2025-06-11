const admin = require("firebase-admin");
const serviceAccount = require("./functions/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uid = "8zfmpeiXzeOL1GsJhOATOir1Bvn2";

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    process.exit(0);
  })
  .catch(() => {
    process.exit(1);
  });