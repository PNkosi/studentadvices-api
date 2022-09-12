const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    title: String,
    content: String 
})


module.exports = PostSchema