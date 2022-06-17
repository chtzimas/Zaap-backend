// utils
import makeValidation from '@withvoid/make-validation';
// models
import UserModel, {USER_TYPES} from '../models/User.js';

export default {
    onCreateUser: async (req, res) => {
        try {
            const {firstName, lastName, email, type} = req.body
            const result = makeValidation(types => {
                return {
                    payload: req.body,
                    checks: {
                        firstName: {type: types.string, options: {empty: false}},
                        lastName: {type: types.string, options: {empty: false}},
                        email: {type: types.string, options: {empty: false}},
                        type: {
                            type: types.enum,
                            options: {enum: USER_TYPES}
                        }
                    }
                }
            })

            if (!result.success) {
                return res.status(400).json({...result})
            }

            // only execute everything below once I am sure that the data is
            // correct
            const user = await UserModel.createUser(firstName, lastName, email, type);

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