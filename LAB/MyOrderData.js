const express = require('express');
const router = express.Router();
const Order = require('../models/Orders')

router.post('/myOrderData', async (req, res) => {
    try {
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() - 20); // Subtract 20 minutes

        const eId = await Order.findOne({
            'email': req.body.email,
            'order_data.Order_date': { $gte: currentTime }
        });

        res.json({ orderData: eId });
    } catch (error) {
        res.send("Error", error.message);
    }
});
