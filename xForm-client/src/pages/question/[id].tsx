import PageWrapper from '@/components/PageWrapper'
import { getQuestionById } from '@/services/question'
import { getComponent } from '@/components/QuestionComponents'
import styles from '@/styles/Question.module.scss'

type PropsType = {
  errno: number,
  data?: {
    id: string
    title: string
    desc?: string
    js?: string
    css?: string
    isPublished: boolean
    isDeleted: boolean
    componentList: Array<any>
  }
  msg?: string
}

export default function Question(props: PropsType) {
  const { errno, data, msg = '' } = props

  // 数据错误
  if (errno !== 0) {
    return <PageWrapper title="错误">
      <h1>错误</h1>
      <p>{msg}</p>
    </PageWrapper>
  }

  const { id, title = '', desc = '', isDeleted, isPublished, componentList = [] } = data || {}

  // 已经被Delete的，提示错误
  if (isDeleted) {
    return <PageWrapper title={title} desc={desc}>
      <h1>{title}</h1>
      <p>The survey has been deleted</p>
    </PageWrapper>
  }

  // 尚未发布的，提示错误
  if (!isPublished) {
    return <PageWrapper title={title} desc={desc}>
      <h1>{title}</h1>
      <p>该问卷尚未发布</p>
    </PageWrapper>
  }
  
  // 遍历组件
  const ComponentListElem = <>
    {componentList.map(c => {
      const ComponentElem = getComponent(c)
      return <div key={c.fe_id} className={styles.componentWrapper}>
        {ComponentElem}
      </div>
    })}
  </>

  return <PageWrapper title={title} desc={desc}>
    {/* <form method='post' action="http://localhost:3001/api/answer"> */}
    <form method='post' action="/api/answer">
      <input type="hidden" name="questionId" value={id}/>
      
      {ComponentListElem}

      <div className={styles.submitBtnContainer}>
        {/* <input type="submit" value="提交"/> */}
        <button type="submit">Submit</button>
      </div>
    </form>
  </PageWrapper>
}

export async function getServerSideProps(context: any) {
  const { id = '' } = context.params

  // 根据 id 获取问卷数据
  const data = await getQuestionById(id)
  // console.log('answerInfo', data)
  return {
    props: data
  }
}
