/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts(
    "https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js"
  );

  
  // Initialize the Firebase app in the service worker by passing the generated config
  const firebaseConfig = {
    apiKey: "AIzaSyCNegG2kURSuCtLs9cKPExxGtcuN6rcl58",
    authDomain: "my-new-web-app-ce424.firebaseapp.com",
    projectId: "my-new-web-app-ce424",
    storageBucket: "my-new-web-app-ce424.appspot.com",
    messagingSenderId: "859333011498",
    appId: "1:859333011498:web:c4ea99188a35362461fb53",
    measurementId: "G-KM15670BDQ"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Retrieve firebase messaging
  const messaging = firebase.messaging();
  
  messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message: ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
  
    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(notificationTitle, notificationOptions);
  });