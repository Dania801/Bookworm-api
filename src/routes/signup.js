import express from 'express';
import User from '../models/User';
import { sendConfirmationEmail } from '../mailer';

const router = express.Router();

router.post('/', (req, res) => {
    console.log('Got a request');
    const { credentials } = req.body;
    console.log('Credentials ==> ', credentials);
    User.create(credentials).then(user => {
        if(user){
            user.setConfirmationToken();
            user.save().then(userRecord => {
                sendConfirmationEmail(userRecord);
            });
            res.status(201).json({ user: user.toAuthJSON() });
        } else {
            res.status(400).json({ errors: { global: "Invalid credentials! "}});
        }
    })
});

export default router;