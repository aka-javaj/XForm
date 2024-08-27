import React, { FC, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
import { loginService } from '../services/user'
import { setToken } from '../utils/user-token'
import styles from './Login.module.scss'

import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/userReducer'
const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

const Login: FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm() // 第三方 hook

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()
    form.setFieldsValue({ username, password })
  }, [])

  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = '' } = result
        const { username = '', nickname = '' } = result.results[0]
        setToken(token) // 存储 token
        console.log(result)
        // const { username, nickname } = result
        console.log(username)
        dispatch(loginReducer({ username, nickname })) // 存储到 redux store
        message.success('Login成功')
        console.log('Navigating to:', MANAGE_INDEX_PATHNAME)
        nav(MANAGE_INDEX_PATHNAME) // 导航到“我的问卷”
      },
    }
  )

  const onFinish = (values: any) => {
    const { username, password, remember } = values || {}
    run(username, password) // 执行 ajax
    if (remember) {
      rememberUser(username, password)
      console.log('remember' + username + '_' + password)
    } else {
      deleteUserFromStorage()
      console.log('deleteFromStorage')
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>UserLogin</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: '请输入Username' },
              { type: 'string', min: 5, max: 20, message: 'The character length is between 5-20' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>remember me</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
              <Link to={REGISTER_PATHNAME}>Register</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
