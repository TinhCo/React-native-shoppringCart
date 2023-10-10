const BlogCategory = require('../models/blogCategory')
const asyncHandler = require('express-async-handler');

const createCategory = asyncHandler(async (req, res) => {
    const response = await BlogCategory.create(req.body);
    return res.json({
        success: response ? true : false,
        createdCategory: response ? response : 'Cannot create new blog-category'
    });
});
const getCategory = asyncHandler(async (req, res) => {
    const response = await BlogCategory.find().select('title _id')   
    return res.json({
        success: response ? true : false,
        blogCategories: response ? response : 'Cannot get new blog-category'
    });
});
const updateCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params
    const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        updatedCategory: response ? response : 'Cannot update new blog-category'
    });
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;
    if (!bcid) {
        return res.status(400).json({
            success: false,
            message: 'blog category ID is required'
        });
    }
    const response = await BlogCategory.findByIdAndDelete(bcid);
    
    return res.json({
        success: response ? true : false,
        deletedCategory: response ? response : 'Cannot delete blog category'
    });
});

module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
};
