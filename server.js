const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const db = require("./index");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const Movie = require("./models/movie");
const Watch = require("./Watch");
const { aggregate } = require("./models/movie");
const { collection } = require("./index");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

//get all film
app.get(`/films`, async (req, res) => {
  const films = await User.find();
  return res.status(200).send(films);
});

db.once("open", async () => {
  if ((await Movie.countDocuments().exec()) > 0) return;

  Promise.all([Movie]).then(() => console.log("All the films!"));
});

// Pagination

app.get("/films", pagination(Movie), async (req, res) => {
  res.json(res.paginatedResults);
});

function pagination(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model
        .find()
        .sort({ title: 1 })
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

// Create a Film
app.post("/watch", async (req, res) => {
  try {
    const addFilm = new Watch({
      _id: "0eafaadje5fad",
      title: "The Wizard of Oz",
    });
    Watch.create(addFilm, function () {
      console.log(addFilm);
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//Find new film added
app.get("/films/:id", async (req, res) => {
  const matchingFilm = await client
    .db("movie")
    .collection("films")
    .findOne({ _id: new ObjectId(req.params.id) });

  res.json({
    message: "Here is the film you added",
    data: matchingFilm,
  });
});

//delete
app.delete("/films/:id", async (req, res) => {
  await client
    .db("movie")
    .collection("films")
    .deleteOne({ _id: new ObjectId(req.params.id) });

  res.json({
    message: "Deleted a film",
  });
});

app.listen(3000, () => console.log('server is running'))






// require('dotenv').config();

// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient
// const { restart } = require('nodemon');


// mongoose
// .connect('mongodb://localhost:27017/movie', {
//     // dbName: 'Movie',    
//     // dbCollection: 'film',
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     })
// .then(() => {
//     console.log('mongobd connected')
// })
// .catch((err) => console.log(err.message))

// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('conneced to database'))
// // db.listCollections().toArray().then(collection => console.log({collection}))
// // console.log(mongoose.connection)
// app.use(express.json())

// const filmsRouter = require('./routes/films')
// app.use(filmsRouter)

// app.get('/', (req, res ) => {
//     res.send ('Hello World')
// })

// app.listen(3000, () => console.log('server is running'))

