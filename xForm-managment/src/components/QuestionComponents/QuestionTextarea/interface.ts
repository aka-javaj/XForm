export type QuestionTextareaPropsType = {
  title?: string
  placeholder?: string

  onChange?: (newProps: QuestionTextareaPropsType) => void
  disabled?: boolean
}

export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: 'Input field title',
  placeholder: 'Please enter...',
}
