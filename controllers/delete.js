import ChatRoomModel from '../models/ChatRoom.js';
import ChatMessageModel from '../models/ChatMessage.js';

export default {
    deleteRoomById: async (req, res) => {
        try {
            const roomId = req.params.roomId
            const room = await ChatRoomModel.removeChatRoomById(roomId)
            const messages = await ChatMessageModel.removeMessagesByRoomId(roomId)
            return res.status(200).json({
                success: true,
                message: "Operation performed succesfully",
                deletedRoomsCount: room.deletedCount,
                deletedMessagesCount: messages.deletedCount,
            });
        } catch (error) {
            return res.status(500).json({success: false, error: error.message})
        }
    },
    deleteMessageById: async (req, res) => {
        try {
            const messageId = req.params.messageId
            const message = await ChatMessageModel.removeMessageById(messageId)
            return res.status(200).json({
                success: true,
                deletedMessagesCount: message.deletedCount,
            });
        } catch (error) {
            return res.status(500).json({success: false, error: error})
        }
    },
}