const Brand = require('../models/brand')
const asyncHandler = require('express-async-handler');

const createNewBrand = asyncHandler(async (req, res) => {
    const response = await Brand.create(req.body);
    return res.json({
        success: response ? true : false,
        createNewBrand: response ? response : 'Cannot create new band'
    });
});
const getBrands = asyncHandler(async (req, res) => {
    const response = await Brand.find()
    return res.json({
        success: response ? true : false,
        brands: response ? response : 'Cannot get new band'
    });
});
const updateBrand = asyncHandler(async (req, res) => {
    try {
        const { bid } = req.params
        const response = await Brand.findByIdAndUpdate(bid, req.body, {new: true})
        return res.json({
            success: response ? true : false,
            updatedBrand: response ? response : 'Cannot update new blog-category'
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});

const deleteBrand = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (!bid) {
        return res.status(400).json({
            success: false,
            message: 'blog category ID is required'
        });
    }
    const response = await Brand.findByIdAndDelete(bid);
    
    return res.json({
        success: response ? true : false,
        deleteBrand: response ? response : 'Cannot delete blog category'
    });
});

module.exports = {
    createNewBrand,
    getBrands,
    updateBrand,
    deleteBrand
};
