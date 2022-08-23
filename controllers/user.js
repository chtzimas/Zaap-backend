import UserModel from '../models/User.js';

export default {
    onCreateUser: async (req, res) => {
        try {
            const {email, username, password} = req.body
            const user = await UserModel.createUser(email, username, password);
            return res.status(200).json({success: true, data: user})
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