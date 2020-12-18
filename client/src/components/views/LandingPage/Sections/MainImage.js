import React from 'react'
import { useSelector } from 'react-redux'
import { Typography } from 'antd'
import { IMAGE_URL } from '../../../../Config'
const { Title } = Typography

function MainImage() {
  const { movieData } = useSelector(state => state.movie)

  return (
    <>
      <div style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0) 39%, rgba(0,0,0,0) 41%, rgba(0,0,0,0.65) 100%), url(${IMAGE_URL}/w1280${movieData[0].backdrop_path}), #1c1c1c`,
        backgroundSize: '100% cover',
        backgroundPosition: 'center, center',
        width: '100%',
        height: 500,
        position: 'relative'
      }} >
        <div>
          <div style={{ position: 'absolute', maxWidth: 500, bottom: '2rem', marginLeft: '2rem' }}>
            <Title style={{ color: 'white' }} level={2}>{movieData[0].title}</Title>
            <p style={{ color: 'white', fontSize: '1rem' }}>{movieData[0].overview.slice(0, 45)}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainImage
