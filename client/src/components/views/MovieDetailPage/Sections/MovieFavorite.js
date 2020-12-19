import React, { useEffect, useState } from 'react'
import { Tag } from 'antd'
import { HeartTwoTone, HeartOutlined, LoadingOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { LOAD_FAVORITE_NUMBER_REQUEST, CHANGE_FAVORITE_REQUEST, LOAD_IS_FAVORITED_REQUEST } from '../../../../_sagas/types';

function MovieFavorite() {

  const dispatch = useDispatch();
  const { isFavorited, favoriteNumber, loadFavoriteNumberLoading, loadFavoriteNumberDone, loadIsFavoritedDone } = useSelector(state => state.favorite)
  const { currentMovie } = useSelector(state => state.movie)
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    if (currentUser && currentMovie) {
      dispatch({
        type: LOAD_IS_FAVORITED_REQUEST,
        payload: {
          userFrom: currentUser._id,
          movieId: currentMovie.id,
        }
      })
    }
  }, [currentUser, currentMovie])

  useEffect(() => {
    if (currentMovie) {
      dispatch({
        type: LOAD_FAVORITE_NUMBER_REQUEST,
        payload: {
          movieId: currentMovie.id
        }
      })
    }
  }, [currentMovie, isFavorited])

  const handleFavorite = () => {
    dispatch({
      type: CHANGE_FAVORITE_REQUEST,
      payload: {
        userFrom: currentUser._id,
        movieId: currentMovie.id,
        movieTitle: currentMovie.title,
        movieOriginalTitle: currentMovie.original_title,
        movieRate: currentMovie.vote_average,
        movieRuntime: currentMovie.runtime,
        movieReleased: currentMovie.release_date,
        moviePoster: currentMovie.poster_path,
        movieImage: currentMovie.backdrop_path,
        movieGenre: currentMovie.genres,
        movieDescription: currentMovie.overview,
        movieRate: currentMovie.vote_average,
      }
    })
  }

  return (
    <div>
      {loadFavoriteNumberLoading && <LoadingOutlined />}
      {loadFavoriteNumberDone &&
        <Tag icon={loadIsFavoritedDone &&
          (isFavorited
            ? <HeartTwoTone twoToneColor="#eb2f96" onClick={handleFavorite} />
            : <HeartOutlined onClick={handleFavorite} />)
        }>
          {favoriteNumber}
        </Tag>
      }
    </div >
  )
}

export default MovieFavorite
