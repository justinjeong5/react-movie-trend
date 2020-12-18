import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { PageHeader, Tabs, Button, Statistic, Descriptions, Tag, Divider } from 'antd'
import Youtube from 'react-youtube'
import { LOAD_MOVIE_DETAIL_REQUEST, LOAD_MOVIE_TRAILER_REQUEST } from '../../../_sagas/types'
import MainImage from '../../utils/MainImage/MainImage'
import LoadingPage from '../LoadingPage/LoadingPage'
import movie from '../../../_reducers/movie'

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

  const getMovieTag = () => {
    const tags = currentMovie.genres.map(genre => {
      return <Tag>{genre.name}</Tag>
    })
    if (currentMovie.adult) {
      tags.unshift(<Tag>성인등급</Tag>)
    }
    return tags
  }

  const renderContent = () => (
    <Descriptions size="large" column={3}>
      <Descriptions.Item span={2} label="제목">{currentMovie.title}</Descriptions.Item>
      <Descriptions.Item label="분류">{getMovieTag()}</Descriptions.Item>
      <Descriptions.Item label="개봉일">{currentMovie.release_date}</Descriptions.Item>
      <Descriptions.Item label="런타임">{`${currentMovie.runtime}분`}</Descriptions.Item>
      <Descriptions.Item label="평점">{currentMovie.vote_average}</Descriptions.Item>
      <Descriptions.Item label="평점개수">{currentMovie.vote_count}</Descriptions.Item>
      <Descriptions.Item label="인기도">{currentMovie.popularity}</Descriptions.Item>
      <Descriptions.Item label="개봉">{currentMovie.status}</Descriptions.Item>
      <Descriptions.Item label=""> <div style={{ width: '97%', margin: '1rem auto' }}> {currentMovie.overview}</div></Descriptions.Item>
    </Descriptions>
  );

  const extraContent = (
    <div
      style={{
        display: 'flex',
        width: 'max-content',
        justifyContent: 'flex-end',
      }}
    >
      <Statistic
        title="Status"
        value="Pending"
        style={{
          marginRight: 32,
        }}
      />
      <Statistic title="Price" prefix="$" value={568.08} />
    </div>
  );

  const Content = ({ children, extra }) => (
    <div className="content">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );

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
            <Content extra={extraContent}>{renderContent()}</Content>
          </PageHeader>
        </div>
      </>}


    </div>
  )
}

export default withRouter(MovieDetailPage)
