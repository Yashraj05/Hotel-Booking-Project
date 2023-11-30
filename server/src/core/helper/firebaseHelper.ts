import admin from 'firebase-admin'
import {BatchResponse, MulticastMessage} from 'firebase-admin/lib/messaging/messaging-api'

export class FirebaseHelper {
  static async sendNotificationToUser(message: MulticastMessage): Promise<BatchResponse> {
    return await admin.messaging().sendEachForMulticast(message)
  }
}
