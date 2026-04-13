const express = require('express');
const Item = require('../models/Item');
const authenticateToken = require('../middlewares/jwtAuth');
const uploadMiddleware = require('../middlewares/fileUpload');

const router = express.Router();

// Add a new item (Requires Authentication & Image Upload)
router.post('/', authenticateToken, uploadMiddleware.single('imageFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: 'failure', message: 'Image file is required.' });
        }

        const newItem = new Item({
            title: req.body.title,
            cost: req.body.cost,
            imageUrl: req.file.path.replace(/\\/g, '/') // Standardize path separators
        });

        const savedItem = await newItem.save();
        res.status(201).json({ status: 'success', data: savedItem });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error while saving item.', error: error.message });
    }
});

// Retrieve all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.status(200).json({ status: 'success', data: items });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to fetch items.' });
    }
});

module.exports = router;
