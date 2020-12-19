import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { List, Space, Avatar, Typography, Divider, Card, Tooltip } from 'antd'
import { StarOutlined, HeartOutlined, MessageOutlined } from '@ant-design/icons'
import { LOAD_FAVORITED_LIST_REQUEST } from '../../../_sagas/types';
import LoadingPage from '../LoadingPage/LoadingPage';
import { IMAGE_URL } from '../../../Config'


const { Title } = Typography;

function FavoritePage() {

  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user)
  const { favoritedList, loadFavoritedListLoading, loadFavoritedListDone } = useSelector(state => state.favorite)

  useEffect(() => {
    if (currentUser) {
      dispatch({
        type: LOAD_FAVORITED_LIST_REQUEST,
        payload: {
          userFrom: currentUser._id,
        }
      })
    }
  }, [currentUser])

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <div style={{ width: '80%', margin: '1rem auto' }}>
      <Title level={2} style={{ margin: '5rem 0 auto' }} >내가 좋아하는 영화들</Title>
      <Divider />
      {loadFavoritedListLoading && <LoadingPage />}
      {loadFavoritedListDone && <List
        itemLayout="vertical"
        size="large"
        dataSource={favoritedList}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <Tooltip title="영화 평점">
                <IconText icon={StarOutlined} text={item.movieRate} key="list-vertical-star-o" />
              </Tooltip>,
              <IconText icon={HeartOutlined} text="56" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
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
  )
}

export default FavoritePage
