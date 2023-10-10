const Order = require('../models/order')
const User = require('../models/user')
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { coupon } = req.body;
    const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price');
    
    if (!userCart || !userCart.cart) {
        return res.json({
            success: false,
            mes: 'User cart not found or empty'
        });
    }
    const validCartItems = userCart.cart.filter(el => el.product); 
    if (validCartItems.length === 0) {
        return res.json({
            success: false,
            mes: 'No valid products in cart'
        }); 
    }
    const products = validCartItems.map(el => {
        return {
            product: el.product._id,
            count: el.quantity,
            color: el.color
        };
    });
    let total = validCartItems.reduce((sum, el) => el.product.price * el.quantity + sum, 0);
    if (coupon) total = Math.round(total * (1 - coupon /100 ) / 1000 ) * 1000;
    const rs = await Order.create({products, total, orderBy: _id});
    return res.json({
        success: rs ? true : false,
        rs: rs ? rs : 'Something went wrong',
        userCart
    });
});


module.exports = {
    createOrder
}