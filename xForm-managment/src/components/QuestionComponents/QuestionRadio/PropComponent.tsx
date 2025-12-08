import React, { FC, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { QuestionRadioPropsType, OptionType } from './interface'

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, value, options = [], onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options })
  }, [title, isVertical, value, options])

  function handleValuesChange() {
    if (onChange == null) return
    // 触发 onChange 函数
    const newValues = form.getFieldsValue() as QuestionRadioPropsType

    if (newValues.options) {
      // 需要清除 text undefined 的Option
      newValues.options = newValues.options.filter(opt => !(opt.text == null))
    }

    const { options = [] } = newValues
    options.forEach(opt => {
      if (opt.value) return
      opt.value = nanoid(5) // 补齐 opt value
    })

    onChange(newValues)
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter Title' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Option">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有的Option（可Delete） */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前Option Input Box */}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: 'Please enter option content' },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue()
                            let num = 0
                            options.forEach((opt: OptionType) => {
                              if (opt.text === text) num++ // 记录 text 相同的个数，预期只有 1 个（自己）
                            })
                            if (num === 1) return Promise.resolve()
                            return Promise.reject(new Error('和其他Option重复了'))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="Enter option content..." />
                    </Form.Item>

                    {/* 当前Option Delete按钮 */}
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}

              {/* Add option */}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: '', value: '' })}
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
      <Form.Item label="Default selected" name="value">
        <Select
          value={value}
          options={options.map(({ text, value }) => ({ value, label: text || '' }))}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>Vertical arrangement</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
