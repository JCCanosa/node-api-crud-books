import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    pub_date: String
});

export default mongoose.model('Book', bookSchema);