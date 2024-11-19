const Order = require("./order.model")

const createAOrder = async (req, res) => {
    try {
        const newOrder = await Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        console.error("Error creating an order", error);
        res.status(500).json({message: "Failed to create an order"})
    }
};

const getOrderByEmail = async(req, res) => {
    try {
        const {email} = req.params;
        const orders = await Order.find({email}).sort({createdAt: -1});
        if(!orders){
            return res.status(404).json({message: "Order not found"})
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error in fetching orders", error);
        res.status(500).json({message: "Failed to fetch orders"})
    }
}

module.exports = {
    createAOrder,
    getOrderByEmail
}