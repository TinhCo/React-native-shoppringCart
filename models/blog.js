const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    numberViews:{
        type: Number,
        default: 0
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    dislikes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }   
    ],
    image: {
        type: String,
        default: 'https://media.istockphoto.com/id/1130150680/vi/anh/blog-v%C3%A0-kh%C3%A1i-ni%E1%BB%87m-trang-web-th%C3%B4ng-tin-n%E1%BB%81n-n%C6%A1i-l%C3%A0m-vi%E1%BB%87c-c%C3%B3-v%C4%83n-b%E1%BA%A3n.jpg?s=612x612&w=0&k=20&c=gaTeQwDR7B392Xhh-CFdtUFCSmeyr55vVibvm9Xf2tE='
    },
    author: {
        type: String,
        default: 'Admin'
    }

}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);