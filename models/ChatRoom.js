import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const chatRoomSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        userIds: Array,
        type: String,
        chatInitiator: String,
    },
    {
        timestamps: true,
        collection: "chatrooms",
    }
);

/**
 * @param {String} userId - id of user
 * @return {Array} array of all chatroom that the user belongs to
 */
chatRoomSchema.statics.getChatRoomsByUserId = async function (userId) {
    try {
        const rooms = await this.find({userIds: {$all: [userId]}});
        return rooms;
    } catch (error) {
        throw error;
    }
}

/**
 * @param {String} roomId - id of chatroom
 * @return {Object} chatroom
 */
chatRoomSchema.statics.getChatRoomByRoomId = async function (roomId) {
    try {
        const room = await this.findOne({_id: roomId});
        return room;
    } catch (error) {
        throw error;
    }
}

/**
 * @param {Array} userIds - array of strings of userIds
 * @param {String} chatInitiator - user who initiated the chat
 */
chatRoomSchema.statics.initiateChat = async function (userIds, chatInitiator) {
    try {
        const availableRoom = await this.findOne({
            userIds: {
                $size: userIds.length,
                $all: [...userIds],
            }
        });
        if (availableRoom) {
            return {
                isNew: false,
                message: 'retrieving an old chat room',
                chatRoomId: availableRoom._doc._id,
                type: availableRoom._doc.type,
            };
        }

        const newRoom = await this.create({userIds, chatInitiator});
        return {
            isNew: true,
            message: 'creating a new chatroom',
            chatRoomId: newRoom._doc._id,
            type: newRoom._doc.type,
        };
    } catch (error) {
        console.log('error on start chat method', error);
        throw error;
    }
}

/**
 * @param {String} roomId - the id of the chat room the user wishes to remove
 */
chatRoomSchema.statics.removeChatRoomById = async function (roomId) {
    try {
        const room = this.remove({_id: roomId})
        return room
    } catch (error) {
        console.log('error on removing a chatroom by id', error);
        throw error;
    }
}

export default mongoose.model("ChatRoom", chatRoomSchema);