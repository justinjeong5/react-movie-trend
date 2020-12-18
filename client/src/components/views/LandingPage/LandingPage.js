import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { Typography, Row, Col, Card, Divider } from 'antd'
import { LOAD_MOVIES_REQUEST } from '../../../_sagas/types';
import LoadingPage from '../LoadingPage/LoadingPage'
import { IMAGE_URL } from '../../../Config'
import { v4 as uuidv4 } from 'uuid'
import MainImage from './Sections/MainImage';
const { Title } = Typography

function LandingPage(props) {

  const dispatch = useDispatch();
  const { logoutUserDone } = useSelector(state => state.user)
  const { movieData, pageNumber, loadMoviesDone, loadMoviesLoading } = useSelector(state => state.movie)

  useEffect(() => {
    if (logoutUserDone) {
      props.history.push('/login');
    }
  }, [logoutUserDone])

  useEffect(() => {
    dispatch({
      type: LOAD_MOVIES_REQUEST,
      payload: pageNumber
    })
  }, [])

  useEffect(() => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (!loadMoviesLoading && pageNumber < 100) {
          dispatch({
            type: LOAD_MOVIES_REQUEST,
            payload: pageNumber,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [loadMoviesLoading, pageNumber]);

  const renderMovieCard = movieData?.map((movie) => {
    return (
      <Col xl={4} lg={6} md={8} sm={12} xs={24} key={uuidv4()}>
        <Card
          hoverable
          cover={<img alt="example" src={`${IMAGE_URL}/w500${movie.poster_path}`} />}
        >
          <Link to={`/movie/${movie.id}`}>
            <Card.Meta title={movie.title} description={movie.overview ? `${movie.overview.slice(0, 30)}...` : '(내용 요약 없음)'} />
          </Link>
        </Card>
      </Col >
    )
  });

  return (
    <>
      {loadMoviesLoading && <LoadingPage />}
      {loadMoviesDone && <>
        <MainImage />
        <Divider />
        <div style={{ width: '85%', margin: '1rem auto' }}>
          <Title level={2} >오늘의 영화</Title>
          <Row gutter={[16, 16]}>
            {renderMovieCard}
          </Row>
        </div>
      </>
      }
    </>
  )
}

export default withRouter(LandingPage);
