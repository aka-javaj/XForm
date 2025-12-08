import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInfoPropsType } from './interface'

const { TextArea } = Input

const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item label="" name="title" rules={[{ required: true, message: 'please enter title' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
