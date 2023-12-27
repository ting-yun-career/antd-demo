import { useContext } from 'react'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
import { GlobalContext } from '../../../global/globalProvider'

const Tree = () => {
  const { locale, darkMode } = useContext(GlobalContext)

  return (
    <>
      <PageTitle>{locale === 'zh_CN' ? '樹結構' : 'Tree Structure'}</PageTitle>
      <div className="tf-tree tf-dark">
        <ul>
          <li>
            <span className="tf-nc">1</span>
            <ul>
              <li>
                <span className="tf-nc">2</span>
              </li>
              <li>
                <span className="tf-nc">3</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Tree
