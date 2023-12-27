import { useContext, useState } from 'react'
import { theme } from 'antd'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
import { GlobalContext } from '../../../global/globalProvider'
import cls from 'classnames'

const Tree = () => {
  const { locale, darkMode } = useContext(GlobalContext)
  const [values, setValues] = useState(new Array(15).fill(0).map((_, i) => i))
  const { useToken } = theme
  const { token } = useToken()

  function onValueChange(e: any, i: number) {
    const newValues = [...values]
    newValues[i] = parseInt(e.target.value)
    console.log(newValues)
    setValues(newValues)
  }

  return (
    <>
      <PageTitle>{locale === 'zh_CN' ? '樹結構' : 'Tree Structure'}</PageTitle>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', padding: '0.5rem 0' }}>
          {values.map((value, i) => (
            <input
              style={{
                border: `1px solid ${token.colorTextBase}`,
                backgroundColor: `${token.colorBgContainer}`,
                flex: '1 1 auto',
                maxWidth: '3.5rem',
                textAlign: 'center',
                padding: '1rem 1rem',
              }}
              onChange={(e) => {
                onValueChange(e, i)
              }}
              value={values[i]}
            />
          ))}
        </div>
      </div>
      <div className={cls(['tf-tree', 'tf-gap-sm', { 'tf-dark': darkMode }])} style={{ width: '100%' }}>
        <ul>
          <li>
            <span className="tf-nc">{values[0]}</span>
            <ul>
              <li>
                <span className="tf-nc">{values[1]}</span>
                <ul>
                  <li>
                    <span className="tf-nc">{values[3]}</span>
                    <ul>
                      <li>
                        <span className="tf-nc">{values[7]}</span>
                        <ul>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <span className="tf-nc">{values[8]}</span>
                        <ul>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span className="tf-nc">{values[4]}</span>
                    <ul>
                      <li>
                        <span className="tf-nc">{values[9]}</span>
                        <ul>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <span className="tf-nc">{values[10]}</span>
                        <ul>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <span className="tf-nc">{values[2]}</span>
                <ul>
                  <li>
                    <span className="tf-nc">{values[5]}</span>
                    <ul>
                      <li>
                        <span className="tf-nc">{values[11]}</span>
                        <ul>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <span className="tf-nc">{values[12]}</span>
                        <ul>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span className="tf-nc">{values[6]}</span>
                    <ul>
                      <li>
                        <span className="tf-nc">{values[13]}</span>
                        <ul>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <span className="tf-nc">{values[14]}</span>
                        <ul>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                        </ul>
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
