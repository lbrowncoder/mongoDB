const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const watchSchema = new Schema ({
    id: String,
    title: String, 
    year:Date,
    runtime: Number,
    actors: Array,
})


const Watch = mongoose.model("watch", watchSchema);