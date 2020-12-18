import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { PageHeader, Tabs, Button, Divider } from 'antd'
import Youtube from 'react-youtube'
import { LOAD_MOVIE_DETAIL_REQUEST, LOAD_MOVIE_TRAILER_REQUEST } from '../../../_sagas/types'
import MainImage from '../../utils/MainImage/MainImage'
import LoadingPage from '../LoadingPage/LoadingPage'
import MovieDescription from './Sections/MovieDescription'

const { TabPane } = Tabs;

function MovieDetailPage(props) {

  const dispatch = useDispatch();
  const { currentMovie, loadMovieDetailDone, loadMovieDetailLoading, loadMovieTrailerDone, loadMovieTrailerLoading } = useSelector(state => state.movie)

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
              <Button key="3">Operation</Button>,
              <Button key="2">Operation</Button>,
              <Button key="1" type="primary">Primary</Button>,
            ]}
            footer={<>
              <Divider />
              <Tabs defaultActiveKey="1">
                <TabPane tab="트레일러" key="1"  >
                  <Youtube videoId={currentMovie.trailer?.key} />
                </TabPane>
                <TabPane tab="배우" key="2" >

                </TabPane>
                <TabPane tab="제작사" key="3"  >

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
