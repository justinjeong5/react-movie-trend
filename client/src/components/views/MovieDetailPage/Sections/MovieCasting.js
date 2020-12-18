import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Row, Col, Empty } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'
import { LOAD_MOVIE_CASTING_REQUEST } from '../../../../_sagas/types';
import LoadingPage from '../../LoadingPage/LoadingPage';
import { IMAGE_URL } from '../../../../Config';

function MovieCasting() {

  const dispatch = useDispatch();
  const { currentMovie, loadMovieDetailDone, loadMovieCastingLoading, loadMovieCastingDone } = useSelector(state => state.movie)

  useEffect(() => {
    if (loadMovieDetailDone) {
      dispatch({
        type: LOAD_MOVIE_CASTING_REQUEST,
        payload: currentMovie.id
      })
    }
  }, [loadMovieDetailDone])

  return (
    <div>
      {loadMovieCastingLoading && <LoadingPage />}
      {loadMovieCastingDone && <>
        <Row gutter={[16, 16]}>
          {currentMovie.casting?.map(cast => {
            return (<>
              <Col xl={4} lg={6} md={8} sm={12} xs={24} key={uuidv4()}>
                {cast.profile_path
                  ? <Card
                    style={{ width: 180 }}
                    cover={<img alt="example" src={`${IMAGE_URL}/w500/${cast.profile_path}`} />}
                  >
                    <Card.Meta title={cast.name} description={cast.character} />
                  </Card>
                  :
                  <Card style={{ width: 180 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 270 }}>
                      <Empty description='' />
                    </div>
                    <Card.Meta title={cast.name} description={cast.character} />
                  </Card>
                }
              </Col>
            </>)
          })}
        </Row>
      </>}
    </div>
  )
}

export default MovieCasting
