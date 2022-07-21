//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const _ = require("lodash");

const PostSchema = require("./Post")

const port = process.env.PORT || 5000;

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Connecting to the database
mongoose.connect('mongodb://localhost:27017/blogDB');

// Getting an instance of the current connection
const db = mongoose.connection


// Building Schema into a model
const Post = mongoose.model("Post", PostSchema)


app.get("/", (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) console.log(err)
        else {
            if (posts.length === 0) {
                res.redirect("/compose")
            }
            else {
                res.render("home", {
                    content: homeStartingContent,
                    posts: posts
                })
            }
        }
    })
})

app.get("/about", (req, res) => {
    res.render("about", { content: aboutContent })
})

app.get("/contact", (req, res) => {
    res.render("contact", { content: contactContent })
})

app.get("/compose", (req, res) => {
    res.render("compose");
})

app.post("/", (req, res) => {
    const postTitle = req.body.postTitle;
    const postBody = req.body.postBody;

    const post = new Post({
        postTitle,
        postBody
    })

    post.save((err, post) => {
        if (err) console.log(err)
        else console.log(`${post.postTitle} saved successfully!`)
    })

    Post.find({}, (err, posts) => {
        console.log(posts)
    })
    res.redirect("/")
})

Handling GET request for each single post
app.get("/posts/:postTitle", (req, res) => {
    const requestedTitle = _.lowerCase(req.params.postTitle);
    
    posts.forEach(post => {
        const storedTitle = _.lowerCase(post.title);

        if (storedTitle === requestedTitle) {
            res.render("post", { title: post.title, content: post.body })
        }
    });
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});