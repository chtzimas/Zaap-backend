import UserModel from '../models/User.js';

export default {
    onCreateUser: async (req, res) => {
        try {
            const {email, username, password} = req.body
            const {userExists, emailExists, usernameExists} = await UserModel.userExistsInfo(email, username)
            if (userExists) {
                let error
                if (emailExists && !usernameExists) {
                    error = {message: "Email is already in use."}
                } else if (!emailExists && usernameExists) {
                    error = {message: "Username is already in use."}
                } else {
                    error = {message: "Email and username are already in use."}
                }
                return res.status(409).send(error)
            }
            const user = await UserModel.createUser(email, username, password);
            return res.status(201).json({success: true, user: user})
        } catch (error) {
            return res.status(500).json({success: false, error: error})
        }
    },
    onGetAllUsers: async (req, res) => {
        try {
            const users = await UserModel.getUsers()
            return res.status(200).json({success: true, users})
        } catch (error) {
            return res.status(500).json({success: false, error: error})
        }
    },
    onGetUserById: async (req, res) => {
        try {
            const user = await UserModel.getUserById(req.params.id);
            return res.status(200).json({success: true, user});
        } catch (error) {
            return res.status(500).json({success: false, error: error})
        }
    },
    onDeleteUserById: async (req, res) => {
        try {
            const user = await UserModel.deleteUserById(req.params.id);
            return res.status(200).json({
                success: true,
                message: `Deleted a count of ${user.deletedCount} user.`
            });
        } catch (error) {
            return res.status(500).json({success: false, error: error})
        }
    },
}