const mongoose = require('mongoose');

const contactapModelSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a name"]
        },
        mailaddress: {
            type: String,
            required: [true, "Please enter a email"]
        },
        message: {
            type: String,
            required: [true, "Please enter a message"]
        }
    },
    {
        timestamps: true
    }
)

const Contact = mongoose.model('contact', contactapModelSchema);

module.exports = Contact;