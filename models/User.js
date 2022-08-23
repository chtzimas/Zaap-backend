import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        email: String,
        username: String,
        password: String
    },
    {
        timestamps: true,
        collection: "users",
    }
);

/**
 * @param {String} email
 * @param {String} username
 * @param {String} password
 * @returns {Object} new user object created
 */
userSchema.statics.createUser = async function (email, username, password) {
    try {
        const user = await this.create({email, username, password});
        return user;
    } catch (error) {
        throw error;
    }
}

/**
 * @return {Array} List of all users
 */
userSchema.statics.getUsers = async function () {
    try {
        const users = await this.find();
        return users;
    } catch (error) {
        throw error;
    }
}

/**
 * @param {String} id, user id
 * @return {Object} User profile object
 */
userSchema.statics.getUserById = async function (id) {
    try {
        const user = await this.findOne({_id: id})
        if (!user) throw ({error: 'No user with this id found'});
        return user;
    } catch (error) {
        throw error;
    }
}

/**
 * @param {String} id - id of user
 * @return {Object} - details of action performed
 */
userSchema.statics.deleteUserById = async function (id) {
    try {
        const result = await this.remove({_id: id});
        return result;
    } catch (error) {
        throw error;
    }
}

userSchema.statics.getUserByIds = async function (ids) {
    try {
        const users = await this.find({_id: {$in: ids}});
        return users;
    } catch (error) {
        throw error;
    }
}

export default mongoose.model("User", userSchema);