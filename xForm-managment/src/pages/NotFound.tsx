import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Result, Button } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'

const NotFound: FC = () => {
  const nav = useNavigate()

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry，the page is lost"
      extra={
        <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
          Return Index
        </Button>
      }
    ></Result>
  )
}

export default NotFound
