import { useContext } from 'react'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
import { GlobalContext } from '../../../global/globalProvider'
import cls from 'classnames'

const Tree = () => {
  const { locale, darkMode } = useContext(GlobalContext)

  return (
    <>
      <PageTitle>{locale === 'zh_CN' ? '樹結構' : 'Tree Structure'}</PageTitle>
      <div className={cls(['tf-tree', 'tf-gap-sm', { 'tf-dark': darkMode }])}>
        <ul>
          <li>
            <span className="tf-nc">1</span>
            <ul>
              <li>
                <span className="tf-nc">2</span>
                <ul>
                  <li>
                    <span className="tf-nc">4</span>
                    <ul>
                      <li>
                        <span className="tf-nc">8</span>
                      </li>
                      <li>
                        <span className="tf-nc">9</span>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span className="tf-nc">5</span>
                    <ul>
                      <li>
                        <span className="tf-nc">10</span>
                      </li>
                      <li>
                        <span className="tf-nc">11</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <span className="tf-nc">3</span>
                <ul>
                  <li>
                    <span className="tf-nc">6</span>
                    <ul>
                      <li>
                        <span className="tf-nc">12</span>
                      </li>
                      <li>
                        <span className="tf-nc">13</span>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span className="tf-nc">7</span>
                    <ul>
                      <li>
                        <span className="tf-nc">14</span>
                      </li>
                      <li>
                        <span className="tf-nc">15</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Tree
