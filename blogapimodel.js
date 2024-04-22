// const mongoose = require('mongoose');

// const blogModelSchema = mongoose.Schema(
//     {
//         title: {
//             type: String,
//             required: [true, "Please enter a title"]
//         },
//         date: {
//             type: String,
//             required: [true, "Please enter a date"]
//         },
//         description: [
//             {
//                 paragraph1: {
//                     type: String,
//                     required: [true, "Please enter a paragraph1"]
//                 },
//                 paragraph2: {
//                     type: String,
//                     required: false
//                 },
//                 paragraph3: {
//                     type: String,
//                     required: false
//                 }
//             }
//         ],
//         images: [
//             {
//                 img1: {
//                     data: Buffer,
//                     contentType: String
//                 },
//                 img2: {
//                     data: Buffer,
//                     contentType: String
//                 },
//                 img3: { 
//                     data: Buffer,
//                     contentType: String
//                 }
//             }
//         ],
//         code: {
//             type: String,
//             required: false
//         },
//         link: {
//             type: String,
//             required: false
//         }
//     },
//     {
//         timestamps: true
//     }
// )

// const Blog = mongoose.model('blog', blogModelSchema);

// module.exports = Blog;


const mongoose = require('mongoose');

const blogModelSchema = new mongoose.Schema({
    post_id: {
        type: String,
        unique: true // Ensure uniqueness
    },
    title: {
        type: String,
        required: [true, "Please enter a title"]
    },
    date_published: {
        type: Date,
        required: [true, "Please enter a date_published"]
    },
    categories: {
        type: [String],
        required: [true, "Please enter a categories"]
    },
    description: { 
        type: [{
            paragraph1: {
                type: String,
                required: [true, "Please enter a paragraph1"]
            },
            paragraph2: {
                type: String
            },
            paragraph3: {
                type: String
            }
        }],
        required: false
    },
    featured_image: {
        type: String,
        required: false
    },
    code: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    }
});

const Blog = mongoose.model('Blog', blogModelSchema);

module.exports = Blog;