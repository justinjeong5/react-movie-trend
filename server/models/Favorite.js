const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const favoriteSchema = mongoose.Schema({
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  movieId: {
    type: String,
  },
  movieTitle: {
    type: String,
  },
  movieRate: {
    type: String,
  },
  movieRuntime: {
    type: Number,
  },
  movieReleased: {
    type: String,
  },
  moviePoster: {
    type: String,
  },
  movieImage: {
    type: String,
  },
  movieGenre: {
    type: Array,
    default: []
  },
  movieDescription: {
    type: String,
  },
  movieOriginalTitle: {
    type: String,
  },
  movieRate: {
    type: Number,
    default: 0,
  }
})

const Favorite = mongoose.model('Favorite', favoriteSchema)

module.exports = { Favorite }