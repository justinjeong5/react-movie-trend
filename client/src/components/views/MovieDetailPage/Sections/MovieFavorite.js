import React, { useEffect, useState } from 'react'
import { Tag } from 'antd'
import { HeartTwoTone, HeartOutlined, LoadingOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { LOAD_FAVORITE_NUMBER_REQUEST } from '../../../../_sagas/types';

function MovieFavorite() {

  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false)
  const { favorite, loadFavoriteNumberLoading, loadFavoriteNumberDone } = useSelector(state => state.favorite)
  const { currentMovie } = useSelector(state => state.movie)

  const handleFavorite = () => {
    setIsFavorite(prev => !prev)
  }

  useEffect(() => {
    dispatch({
      type: LOAD_FAVORITE_NUMBER_REQUEST,
      payload: {
        movieId: currentMovie.id
      }
    })
  }, [])

  return (
    <div>
      {loadFavoriteNumberLoading && <LoadingOutlined />}
      {loadFavoriteNumberDone &&
        (isFavorite
          ? <Tag icon={<HeartTwoTone twoToneColor="#eb2f96" onClick={handleFavorite} />}>{favorite.favoriteNumber}</Tag>
          : <Tag icon={<HeartOutlined onClick={handleFavorite} />}>{favorite.favoriteNumber}</Tag>
        )
      }
    </div >
  )
}

export default MovieFavorite
