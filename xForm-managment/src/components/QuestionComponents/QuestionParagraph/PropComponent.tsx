import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox } from 'antd'
import { QuestionParagraphPropsType } from './interface'

const { TextArea } = Input

const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item
        label="Paragraph content"
        name="text"
        rules={[{ required: true, message: 'Please enter aragraph content' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>Center alignment</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
