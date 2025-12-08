import React, { FC } from 'react'
import { Form, Input, Checkbox, Space, Button } from 'antd'
import { nanoid } from 'nanoid'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { QuestionCheckboxPropsType, OptionType } from './interface'

const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [], onChange, disabled } = props
  const [form] = Form.useForm()

  function handleValuesChange() {
    if (onChange == null) return

    const newValues = form.getFieldsValue() as QuestionCheckboxPropsType

    if (newValues.list) {
      newValues.list = newValues.list.filter(opt => !(opt.text == null))
    }

    const { list = [] } = newValues
    list.forEach(opt => {
      if (opt.value) return
      opt.value = nanoid(5)
    })

    onChange(newValues)
  }

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ title, isVertical, list }}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enteritle' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Option">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有的Option（可Delete） */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前Option 是否选中 */}
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    {/* 当前Option Input Box */}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: 'Enter option content' },
                        {
                          validator: (_, text) => {
                            const { list = [] } = form.getFieldsValue()
                            let num = 0
                            list.forEach((opt: OptionType) => {
                              if (opt.text === text) num++ // 记录 text 相同的个数，预期只有 1 个（自己）
                            })
                            if (num === 1) return Promise.resolve()
                            return Promise.reject(new Error('It is repeated with other options'))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="Please enter option content..." />
                    </Form.Item>

                    {/* 当前Option Delete按钮 */}
                    {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}

              {/* Add option */}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: '', value: '', checked: false })}
                  icon={<PlusOutlined />}
                  block
                >
                  Add option
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>Vertical arrangement.</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
