const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    
     image: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            text: {
                type: String
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            }
        }
    ],

},
    {
        timestamps: true
    });

module.exports = mongoose.model('blog', blogSchema);