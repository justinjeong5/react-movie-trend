import React from 'react'
import { withRouter } from 'react-router-dom'

function MovieDetailPage(props) {
  return (
    <div>
      movieId : {props.match.params.movieId}
      MovieDetailPage
    </div>
  )
}

export default withRouter(MovieDetailPage)
