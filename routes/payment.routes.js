const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    try {
        const { amountToBePaid } = req.body;

        if (amountToBePaid > 0) {
            return res.status(200).json({
                status: 'success',
                message: `Payment of ${amountToBePaid} processed successfully.`
            });
        } else {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid amount. Payment must be greater than zero.'
            });
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Payment processing encountered an error.' });
    }
});

module.exports = router;
