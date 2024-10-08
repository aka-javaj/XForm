import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'
import styles from './Home.module.scss'

// import axios from 'axios'
// import '../_mock/index.ts'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()

  // useEffect(() => {
  //   // fetch('/api/test')
  //   //   .then(res => res.json())
  //   //   .then(data => console.log('fetch data', data))
  //   // mock.js 只能劫持 XMLHttpRequest ，不能劫持 fetch

  //   // axios 内部使用 XMLHttpRequest API ，没用 fetch
  //   axios.get('/api/test').then(res => console.log('axios data', res.data))
  // }, [])

  // useEffect(() => {
  //   // fetch('/api/test')
  //   //   .then(res => res.json())
  //   //   .then(data => console.log('fetch data', data))
  //   // axios.get('/api/test').then(res => console.log('axios data', res.data))
  // })

  // function clickHandler() {
  //   // nav('/login')
  //   nav({
  //     pathname: '/login',
  //     search: 'b=21',
  //   })
  // }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>Questionnaire Survey | Online Voting</Title>
        <Paragraph>A total of 100 questionnaries have been created</Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            Start
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
