const mongoose = require('mongoose');

const blogModelSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter a title"]
        },
        date: {
            type: String,
            required: [true, "Please enter a date"]
        },
        description: [
            {
                paragraph1: {
                    type: String,
                    required: [true, "Please enter a paragraph1"]
                },
                paragraph2: {
                    type: String,
                    required: false
                },
                paragraph3: {
                    type: String,
                    required: false
                }
            }
        ],
        images: [
            {
                img1: {
                    data: Buffer,
                    contentType: String
                },
                img2: {
                    data: Buffer,
                    contentType: String
                },
                img3: {
                    data: Buffer,
                    contentType: String
                }
            }
        ],
        code: {
            type: String,
            required: false
        },
        link: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Blog = mongoose.model('blog', blogModelSchema);

module.exports = Blog;
