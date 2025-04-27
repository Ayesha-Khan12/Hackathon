importScripts(
  "https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAJe0Z0W1Uc-6pikF7oLC_M3Hgo71VhVDs",
  authDomain: "ewokes-8d007.firebaseapp.com",
  projectId: "ewokes-8d007",
  storageBucket: "ewokes-8d007.firebasestorage.app",
  messagingSenderId: "417694572360",
  appId: "1:417694572360:web:cd1fd04fb6434d39a85d7d",
  measurementId: "G-SW7LEV09Q1",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log("Background FCM:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo_transparent.png", // Optional
  });
  self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    const url = event.notification.data?.url || "/";
    event.waitUntil(clients.openWindow(url));
  });
});
