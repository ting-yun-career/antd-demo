import { Result } from 'antd'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
import { GlobalContext } from '../../../global/globalProvider'
import { useContext } from 'react'

export const Investments: React.FC<object> = (props: object) => {
  const { locale } = useContext(GlobalContext)

  return (
    <>
      <PageTitle>{locale === 'zh_CN' ? '仪表板 - 投资看板' : 'Investments'}</PageTitle>
      <Result
        status="500"
        title={locale === 'zh_CN' ? '正在架構中' : 'Work in Progress'}
        subTitle={
          locale === 'zh_CN'
            ? '抱歉，此页面仍在建设中。很快就可以用啦。'
            : 'Sorry this page is still under construction. Will be available soon.'
        }
      />
    </>
  )
}
