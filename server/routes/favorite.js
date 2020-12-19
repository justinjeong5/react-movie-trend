const express = require('express');
const router = express.Router();

const { Favorite } = require('../models/Favorite')
const { auth } = require('../middleware/auth')

//=====================================
//                Favorite
//=====================================

router.post('/favoriteNumber', auth, (req, res) => {
  Favorite.find({ movieId: req.body.movieId })
    .exec((error, favorite) => {
      if (error) {
        return res.status(401).json({ code: 'DatabaseError', message: '좋아요 정보를 찾는 과정에서 문제가 발생했습니다.', error });
      }
      res.status(200).json({ success: true, favoriteNumber: favorite.length })
    })
})

router.post('/changeFavorited', auth, (req, res) => {
  Favorite.find(req.body)
    .exec((error, favorite) => {
      if (error) {
        return res.status(401).json({ code: 'DatabaseError', message: '좋아요를 찾는 과정에서 문제가 발생했습니다.', error });
      }
      if (!favorite.length) {
        // 아직 좋아요가 아닌 경우
        const favorite = new Favorite(req.body)
        favorite.save((error, doc) => {
          if (error) {
            return res.status(401).json({ code: 'DatabaseError', message: '좋아요를 변경하는 과정에서 문제가 발생했습니다.', error });
          }
          res.status(200).json({ success: true, isFavorited: true })
        })
      } else {
        // 이미 좋아요인 경우
        Favorite.findOneAndRemove(req.body)
          .exec((error, doc) => {
            if (error) {
              return res.status(401).json({ code: 'DatabaseError', message: '좋아요를 변경하는 과정에서 문제가 발생했습니다.', error });
            }
            res.status(200).json({ success: true, isFavorited: false })
          })
      }
    })
})

router.post('/isFavorited', auth, (req, res) => {
  Favorite.find(req.body)
    .exec((error, favorite) => {
      if (error) {
        return res.status(401).json({ code: 'DatabaseError', message: '좋아요를 변경하는 과정에서 문제가 발생했습니다.', error });
      }
      return res.status(200).json({ success: true, isFavorited: favorite.length > 0 })
    })
})

router.post('/favoritedList', auth, (req, res) => {
  Favorite.find(req.body)
    .exec((error, favorite) => {
      if (error) {
        return res.status(401).json({ code: 'DatabaseError', message: '좋아요를 변경하는 과정에서 문제가 발생했습니다.', error });
      }
      return res.status(200).json({ success: true, favoritedList: favorite })
    })
})

module.exports = router