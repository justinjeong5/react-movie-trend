import React from 'react'
import { Descriptions, Tag } from 'antd'
import { useSelector } from 'react-redux'

function MovieDescription() {

  const { currentMovie } = useSelector(state => state.movie)

  const getMovieTag = () => {
    const tags = currentMovie.genres.map(genre => {
      return <Tag>{genre.name}</Tag>
    })
    if (currentMovie.adult) {
      tags.unshift(<Tag>청불</Tag>)
    }
    return tags
  }

  const Content = ({ children, extra }) => (
    <div className="content">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );

  return (
    <>
      <Content >
        <Descriptions size="large" column={3}>
          <Descriptions.Item span={2} label="제목">{currentMovie.title}</Descriptions.Item>
          <Descriptions.Item label="분류">{getMovieTag()}</Descriptions.Item>
          <Descriptions.Item label="개봉일">{currentMovie.release_date}</Descriptions.Item>
          <Descriptions.Item label="런타임">{`${currentMovie.runtime}분`}</Descriptions.Item>
          <Descriptions.Item label="개봉">{currentMovie.status}</Descriptions.Item>
          <Descriptions.Item label="후기개수">{currentMovie.vote_count}</Descriptions.Item>
          <Descriptions.Item label="인기도">{currentMovie.popularity}</Descriptions.Item>
          <Descriptions.Item label="평점">{currentMovie.vote_average}</Descriptions.Item>
          <Descriptions.Item label=""> <div style={{ width: '97%', margin: '1rem auto' }}> {currentMovie.overview}</div></Descriptions.Item>
        </Descriptions>
      </Content>
    </>
  )
}

export default MovieDescription
