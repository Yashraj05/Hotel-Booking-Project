import { isSupported, getMessaging, getToken, onMessage, deleteToken } from 'firebase/messaging';

import { app } from './config';

export const getFcmToken = async () => {
  try {
    const isSupportedPushAPI = await isSupported();

    if (!isSupportedPushAPI) {
      console.log('Push notifications are not supported!');
      return undefined;
    }

    const messaging = getMessaging(app);

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Do not have permission!');
      return undefined;
    }

    const fcmToken = await getToken(messaging, {
      vapidKey:'BMK7PV5m6U8G_uckU0BjKcELwsLy2fsq7mHWHWGv22mOetqiUTnBymMSGYklLlsuAsCCjZhAZ2Wi37fdYuGX0Aw',
    });
    if (!fcmToken) {
      console.log('Can not get token');
      return undefined;
    }

    return fcmToken;
  } catch (error) {
    console.log(error);
  }
};

export const onMessageListener = async () => {
  const isSupportedPushAPI = await isSupported();
  if (!isSupportedPushAPI) {
    console.log('Push notifications are not supported!');
    return undefined;
  }

  const messaging = getMessaging(app);
  return new Promise((resolve, reject) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
};

export const onDeleteFcmToken = async () => {
  const messaging = getMessaging(app);
  await deleteToken(messaging);
};