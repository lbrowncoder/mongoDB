
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const filmSchema = new Schema ({
    id: String,
    title: String, 
    year:Date,
    runtime: Number,
    actors: Array,
})

const Movie = mongoose.model('film', filmSchema, "film")
module.exports = Movie;