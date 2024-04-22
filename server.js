const express = require('express');

const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger'); 

const app = express();

const mongoose = require('mongoose');

const cors = require('cors');

const Contact = require('./contactapimodel');
const Blog = require('./blogapimodel');




app.use(express.json()) // meterwear app will take responce in json 

app.use(cors()); // Enable CORS for all routes

const PORT = 4000;




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


/** 
 * @swagger
 * /contacts:
 *   get:
 *     description: this end point is used to get the contacted members
 *     parameters:
 *       - name: user_name
 *         mailaddress: user_mail_address
 *         message: user_message
 *     responses:
 *      200:
 *         description: User information retrieved successfully
 *       404:
 *         description: User not found
 */


app.get('/', (req, res) => {
    res.send('express app is up');
})

// contact api 
app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.create(req.body);
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.delete('/contacts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const contacts = await Contact.findByIdAndDelete(id);
        if (!contacts) {
            res.status(400).json({ message: "can not find the item" });
        }
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.body })
    }
})


// blog api

app.post('/blog', async (req, res) => {
    try {
        const newBlogPost = new Blog(req.body);
        const savedPost = await newBlogPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.body })
    }
})

app.get('/blog', async (req, res) => {
    try {
        const newBlogPost = await Blog.find({})
        res.status(200).json(newBlogPost);
    } catch (error) {
        res.status(500).json({ message: error.body })
    }
})

app.get('/blog/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/blog/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBlogData = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogData, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.delete('/blog/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            res.status(404).json({ message: "blog not found" })
        }
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// blog catalog api 

app.get('/blogcatalog', async (req, res) => {
    try {
        const blogs = await Blog.find({}, '_id title description.paragraph1 date_published categories');

        // Modify the response to include only id, title, and date
        const modifiedResponse = blogs.map(blog => ({
            id: blog._id,
            title: blog.title,
            into: blog.description[0].paragraph1,
            date: blog.date_published, 
            categories: blog.categories
        }));

        res.status(200).json(modifiedResponse);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});


mongoose.connect('mongodb+srv://nagendrayakkaladevara:LXSeYtMk2sAnEY0k@nagendrayakkaladevara.d27kwgk.mongodb.net/portfolio-API?retryWrites=true&w=majority&appName=nagendrayakkaladevara')
    .then(() => {
        app.listen(PORT, () => {
            console.log('app is up');
            console.log('running on port:' + PORT);
            console.log(`Server listening on port ${PORT}`);
            console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
        })
        console.log('connected to mongodb');
    }).catch((error) => {
        console.log(error);
    })