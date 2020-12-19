import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { List, Space, Avatar, Typography, Divider, Card, Tooltip, Tag } from 'antd'
import { StarOutlined, MessageOutlined, HeartTwoTone } from '@ant-design/icons'
import { LOAD_FAVORITED_LIST_REQUEST, CHANGE_FAVORITE_REQUEST } from '../../../_sagas/types';
import LoadingPage from '../LoadingPage/LoadingPage';
import { IMAGE_URL } from '../../../Config'


const { Title } = Typography;

function FavoritePage() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user)
  const { favoritedList, loadFavoritedListLoading, loadFavoritedListDone, changeFavoriteDone, changeFavoriteLoading } = useSelector(state => state.favorite)
  let movieDetailsPageFrontRef = React.createRef();

  useEffect(() => {
    if (movieDetailsPageFrontRef) {
      movieDetailsPageFrontRef.scrollIntoView();
    }
    if (currentUser || changeFavoriteDone) {
      dispatch({
        type: LOAD_FAVORITED_LIST_REQUEST,
        payload: {
          userFrom: currentUser._id,
        }
      })
    }
  }, [currentUser, changeFavoriteDone])

  const IconText = ({ icon, text }) => (
    <Space>
      {icon}
      {text}
    </Space>
  );

  const handleFavorite = (movie) => () => {
    console.log(movie, 'handleFavorite: movie')
    console.log(movie.movieTitle, movie.id, 'handleFavorite: movie.movieTitle')
    dispatch({
      type: CHANGE_FAVORITE_REQUEST,
      payload: {
        userFrom: currentUser._id,
        movieId: movie.movieId,
      }
    })
  }

  return (
    <>
      <div ref={node => (movieDetailsPageFrontRef = node)} />
      <div style={{ width: '80%', margin: '1rem auto' }}>
        <Title level={2} style={{ margin: '5rem 0 auto' }} >내가 좋아하는 영화들</Title>
        <Divider />
        {(loadFavoritedListLoading || changeFavoriteLoading) && <LoadingPage />}
        {loadFavoritedListDone && <List
          itemLayout="vertical"
          size="large"
          dataSource={favoritedList}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[
                <IconText icon={<StarOutlined />} text={item.movieRate} key="list-vertical-star-o" />,
                <IconText icon={<HeartTwoTone twoToneColor="#eb2f96" onClick={handleFavorite(item)} />} text="56" key="list-vertical-like-o" />,
                <IconText icon={<MessageOutlined />} text="2" key="list-vertical-message" />,
              ]}
              extra={
                <Card
                  hoverable
                  style={{ borderRadius: 10, maxHeight: 240, height: 'auto', width: 'auto', }}
                  cover={<img
                    alt="moviePoster"
                    src={`${IMAGE_URL}/w500${item.moviePoster}`}
                    style={{ borderRadius: 10, maxHeight: 240, height: 'auto', width: 'auto', }}
                  />} />
              }
            >
              <List.Item.Meta
                avatar={<Avatar size='large' src={`${IMAGE_URL}/w500${item.movieImage}`} />}
                title={<Link to={`/movie/${item.movieId}`}>{item.movieTitle}</Link>}
                description={item.movieOriginalTitle}
              />
              { item.movieDescription}
            </List.Item >
          )}
        />}
      </div >
    </>
  )
}

export default FavoritePage
