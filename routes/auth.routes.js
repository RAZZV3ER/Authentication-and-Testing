const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Account = require('../models/Account');

const router = express.Router();

// Registration Endpoint
router.post('/signup', async (req, res) => {
    try {
        const { emailAddress, passKey } = req.body;

        const existingAccount = await Account.findOne({ emailAddress });
        if (existingAccount) {
            return res.status(409).json({ message: 'Account with this email already exists.' });
        }

        const saltRounds = 10;
        const hashedPassKey = await bcrypt.hash(passKey, saltRounds);

        const newAccount = new Account({
            emailAddress,
            passKey: hashedPassKey
        });

        await newAccount.save();
        res.status(201).json({ status: 'success', message: 'Account registered successfully.' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Registration failed due to server error.' });
    }
});

// Login Endpoint
router.post('/signin', async (req, res) => {
    try {
        const { emailAddress, passKey } = req.body;

        const account = await Account.findOne({ emailAddress });
        if (!account) {
            return res.status(404).json({ status: 'failed', message: 'Account could not be found.' });
        }

        const passwordMatches = await bcrypt.compare(passKey, account.passKey);
        if (!passwordMatches) {
            return res.status(401).json({ status: 'failed', message: 'Incorrect credentials provided.' });
        }

        const jwtSecret = process.env.JWT_SECRET_KEY || 'my_super_secret_key_123';
        const sessionToken = jwt.sign(
            { accountId: account._id },
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.status(200).json({ status: 'success', token: sessionToken });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Sign-in failed.' });
    }
});

module.exports = router;
