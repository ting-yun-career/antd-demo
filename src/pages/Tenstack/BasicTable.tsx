import { useContext } from 'react'
import { GlobalContext } from '../../global/globalProvider'
import { PageTitle } from '../../components/PageTitle/PageTitle'

export const BasicTable: React.FC<object> = (props: object) => {
  const { locale } = useContext(GlobalContext)

  return (
    <>
      <PageTitle>{locale === 'en_US' ? 'Basic Example' : '基本示例'}</PageTitle>
    </>
  )
}
