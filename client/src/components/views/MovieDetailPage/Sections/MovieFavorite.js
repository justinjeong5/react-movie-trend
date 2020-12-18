import React, { useEffect, useState } from 'react'
import { Tag } from 'antd'
import { HeartTwoTone, HeartOutlined, LoadingOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { LOAD_FAVORITE_NUMBER_REQUEST, CHANGE_FAVORITE_REQUEST, LOAD_IS_FAVORITED_REQUEST } from '../../../../_sagas/types';

function MovieFavorite() {

  const dispatch = useDispatch();
  const { favorite, loadFavoriteNumberLoading, loadFavoriteNumberDone, loadIsFavoritedDone } = useSelector(state => state.favorite)
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
  }, [currentMovie, favorite.isFavorited])

  const handleFavorite = () => {
    dispatch({
      type: CHANGE_FAVORITE_REQUEST,
      payload: {
        userFrom: currentUser._id,
        movieId: currentMovie.id,
      }
    })
  }

  return (
    <div>
      {loadFavoriteNumberLoading && <LoadingOutlined />}
      {loadFavoriteNumberDone &&
        <Tag icon={loadIsFavoritedDone &&
          (favorite.isFavorited
            ? <HeartTwoTone twoToneColor="#eb2f96" onClick={handleFavorite} />
            : <HeartOutlined onClick={handleFavorite} />)
        }>
          {favorite.favoriteNumber}
        </Tag>
      }
    </div >
  )
}

export default MovieFavorite
