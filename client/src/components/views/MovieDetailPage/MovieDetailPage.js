import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { PageHeader, Tabs, Button, Divider } from 'antd'
import Youtube from 'react-youtube'
import { LOAD_MOVIE_DETAIL_REQUEST, LOAD_MOVIE_TRAILER_REQUEST } from '../../../_sagas/types'
import MainImage from '../../utils/MainImage/MainImage'
import LoadingPage from '../LoadingPage/LoadingPage'
import MovieDescription from './Sections/MovieDescription'
import MovieCasting from './Sections/MovieCasting'
import MovieMaker from './Sections/MovieMaker'
import MovieReview from './Sections/MovieReview'
import MovieFavorite from './Sections/MovieFavorite'

const { TabPane } = Tabs;

function MovieDetailPage(props) {

  const dispatch = useDispatch();
  const { currentMovie, loadMovieDetailDone, loadMovieTrailerDone, loadMovieTrailerLoading } = useSelector(state => state.movie)

  useEffect(() => {
    dispatch({
      type: LOAD_MOVIE_DETAIL_REQUEST,
      payload: props.match.params.movieId
    })
  }, [])

  useEffect(() => {
    if (loadMovieDetailDone) {
      dispatch({
        type: LOAD_MOVIE_TRAILER_REQUEST,
        payload: props.match.params.movieId
      })
    }
  }, [loadMovieDetailDone])

  return (
    <div>
      {loadMovieTrailerLoading && <LoadingPage />}
      {loadMovieTrailerDone && <>
        <MainImage movie={currentMovie} />
        <div style={{ width: '80%', margin: '1rem auto' }}>
          <PageHeader
            className="site-page-header-responsive"
            onBack={() => window.history.back()}
            title={currentMovie.title}
            subTitle={currentMovie.original_title}
            extra={[
              <MovieFavorite />,
            ]}
            footer={<>
              <Divider />
              <Tabs defaultActiveKey="1" style={{ marginBottom: 50 }}>
                <TabPane tab="트레일러" key="1" >
                  <br />
                  <Youtube videoId={currentMovie.trailer?.key} />
                </TabPane>
                <TabPane tab="배우" key="2" >
                  <br />
                  <MovieCasting />
                </TabPane>
                <TabPane tab="후기 및 평점" key="3"  >
                  <br />
                  <MovieReview />
                </TabPane>
                <TabPane tab="제작사" key="4" >
                  <br />
                  <MovieMaker />
                </TabPane>
              </Tabs>
            </>}
          >
            <Divider />
            <MovieDescription />
          </PageHeader>
        </div>
      </>}
    </div>
  )
}

export default withRouter(MovieDetailPage)
