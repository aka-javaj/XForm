export type QuestionInputPropsType = {
  title?: string
  placeholder?: string

  onChange?: (newProps: QuestionInputPropsType) => void
  disabled?: boolean
}

export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: 'Input field title',
  placeholder: 'Please enter...',
}
