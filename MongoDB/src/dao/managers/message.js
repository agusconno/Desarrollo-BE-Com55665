import Message from '../models/messageModel.js';

export class MessagesManager {
  async sendMessage(user, message) {
    try {
      // Lógica para enviar un mensaje
      const newMessage = new Message({ user, message });
      await newMessage.save();
      return newMessage;
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      throw error;
    }
  }

  async getMessages() {
    try {
      // Lógica para obtener todos los mensajes
      const messages = await Message.find();
      return messages;
    } catch (error) {
      console.error('Error al obtener mensajes:', error);
      throw error;
    }
  }


}
