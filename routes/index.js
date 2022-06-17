import express from 'express';
// controllers
import users from '../controllers/user.js';
// middlewares
import {encode} from '../middlewares/auth.js';

const router = express.Router();

router
    .post('/:id', encode, (req, res) => {
        return res
            .status(200)
            .json({
                success: true,
                authorization: req.authToken,
            });
    });

export default router;
