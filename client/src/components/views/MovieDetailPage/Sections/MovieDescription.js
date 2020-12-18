import React from 'react'
import { Descriptions, Tag, Tooltip } from 'antd'
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
          <Descriptions.Item key='title' span={2} label="제목">{currentMovie.title}</Descriptions.Item>
          <Descriptions.Item key='sort' label="분류">{getMovieTag()}</Descriptions.Item>
          <Descriptions.Item key='released' label="개봉일">{currentMovie.release_date}</Descriptions.Item>
          <Descriptions.Item key='runtime' label="런타임">{`${currentMovie.runtime}분`}</Descriptions.Item>
          <Descriptions.Item key='status' label="개봉">{currentMovie.status}</Descriptions.Item>
          <Descriptions.Item key='reviewCount' label="후기개수">{currentMovie.vote_count}</Descriptions.Item>
          <Descriptions.Item key='popularity' label="인기도">
            <Tooltip
              title={<span>인기도는 다음과 같은 지표를 참고하여 산출합니다. <br />
                    좋아요가 눌린 수, 조회수, 영상목록에 담긴 수, 전날의 인기도</span>}>
              {currentMovie.popularity}
            </Tooltip>
          </Descriptions.Item>
          <Descriptions.Item key='rate' label="평점">{currentMovie.vote_average}</Descriptions.Item>
          <Descriptions.Item key='description' label=""> <div style={{ width: '97%', margin: '1rem auto' }}> {currentMovie.overview}</div></Descriptions.Item>
        </Descriptions>
      </Content>
    </>
  )
}

export default MovieDescription
