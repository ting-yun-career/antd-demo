import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../../../global/globalProvider'
import { PageTitle } from '../../../components/PageTitle/PageTitle'

export const InteractiveForm: React.FC = () => {
  const { locale } = useContext(GlobalContext)

  return (
    <>
      <PageTitle>{locale === 'zh_CN' ? '表单 - 高互动' : 'Form - Interactive'}</PageTitle>
    </>
  )
}
