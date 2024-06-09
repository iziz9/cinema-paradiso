/* eslint-disable no-restricted-globals */
self.addEventListener("push", function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };
  console.log("push: ", { resultData, notificationTitle, notificationOptions });
  self.registration.showNotification(notificationTitle, notificationOptions);
});


self.addEventListener("notificationclick", (event) => {
  console.log("notification click");
  const url = "/";
  event.notification.close();
  event.waitUntil(Clients.openWindow(url));
});