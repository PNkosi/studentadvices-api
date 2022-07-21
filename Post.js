const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema(
    {
        postTitle: String,
        postBody: String
    }
)


module.exports = PostSchema