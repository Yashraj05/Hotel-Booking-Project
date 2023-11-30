import admin from 'firebase-admin'

var serviceAccount = require("/home/my/Desktop/Hotel-Booking-Project/server/envFiles/my-new-web-app-ce424-firebase-adminsdk-744co-3f238c406b.json");
async function firebaseInitialize() {

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
    
}
export default firebaseInitialize