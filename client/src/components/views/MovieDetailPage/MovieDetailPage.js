import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { LOAD_MOVIE_DETAIL_REQUEST } from '../../../_sagas/types'

function MovieDetailPage(props) {

  const dispatch = useDispatch();
  const { currentMovie } = useSelector(state => state.movie)

  useEffect(() => {
    dispatch({
      type: LOAD_MOVIE_DETAIL_REQUEST,
      payload: props.match.params.movieId
    })
  }, [])

  return (
    <div>
      movieId : {props.match.params.movieId}
      MovieDetailPage
      {currentMovie && console.log(currentMovie, 'currentMovie')}
    </div>
  )
}

export default withRouter(MovieDetailPage)
