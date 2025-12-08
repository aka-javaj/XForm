/**
 * @description 生成组件列表
 * @author Haihua XU
 */

const Mock = require('mockjs')

const Random = Mock.Random

function getComponentList() {
    return [
        // Info
        {
            fe_id: 'c1', // 注意，由于统计页，左侧和中间需要数据完全一直，所以要写死 fe_id ，不能用 Random.id()
            type: 'questionInfo', // 组件类型，不能重复，前后端统一好
            title: 'Survey Information',
            isHidden: false,
            isLocked: false,
            props: { title: '问卷Title', desc: '问卷描述...' }
        },
        // Title
        {
            fe_id: 'c2',
            type: 'questionTitle', // 组件类型，不能重复，前后端统一好
            title: 'Title',
            isHidden: false,
            isLocked: false,
            props: { text: '个人信息调研', level: 1, isCenter: false }
        },
        // Input
        {
            fe_id: 'c3',
            type: 'questionInput',
            title: 'Input Box1',
            isHidden: false,
            isLocked: false,
            props: { title: 'Your name', placeholder: 'Please enter 姓名...' }
        },
        // Input
        {
            fe_id: 'c4',
            type: 'questionInput',
            title: 'Input Box2',
            isHidden: false,
            isLocked: false,
            props: { title: 'Your phone', placeholder: 'Please enter 电话...' }
        },
        // Textarea
        {
            fe_id: 'c5',
            type: 'questionTextarea',
            title: 'Multi-line Text Input',
            isHidden: false,
            isLocked: false,
            props: { title: 'Your hobbies', placeholder: 'Please enter ...' }
        },
        // Paragraph
        {
            fe_id: 'c6',
            type: 'questionParagraph',
            title: 'Paragraph',
            isHidden: false,
            isLocked: false,
            props: { text: 'Paragraph1\nParagraph2', isCenter: false }
        },
        // Radio
        {
            fe_id: 'c7',
            type: 'questionRadio',
            title: 'Single Choice',
            isHidden: false,
            isLocked: false,
            props: {
                title: 'Single-choice Title',
                isVertical: false,
                options: [
                  { value: 'item1', text: 'A' },
                  { value: 'item2', text: 'B' },
                  { value: 'item3', text: 'C' },
                ],
                value: '',
              }
        },
        // Checkbox
        {
            fe_id: 'c8',
            type: 'questionCheckbox',
            title: 'Multiple Choice',
            isHidden: false,
            isLocked: false,
            props: {
                title: 'Multiple-choice Title',
                isVertical: false,
                list: [
                    { value: 'item1', text: 'A', checked: true },
                    { value: 'item2', text: 'B', checked: false },
                    { value: 'item3', text: 'C', checked: false },
                ],
              }
        }
    ]
}

module.exports = getComponentList
