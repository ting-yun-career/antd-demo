import React from 'react'
import { Form, Select, Input, Button, Row, Col } from 'antd'
import { useContext } from 'react'
import { GlobalContext } from '../../../global/globalProvider'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
const { Option } = Select

type Country = 'USA' | 'Canada'

const countries: Country[] = ['USA', 'Canada']
interface StateProvince {
  value: string
  label: string
}

const statesProvinces: Record<Country, StateProvince[]> = {
  USA: [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
  ],
  Canada: [
    { value: 'AB', label: 'Alberta' },
    { value: 'BC', label: 'British Columbia' },
    { value: 'MB', label: 'Manitoba' },
    { value: 'NB', label: 'New Brunswick' },
    { value: 'NL', label: 'Newfoundland and Labrador' },
    { value: 'NS', label: 'Nova Scotia' },
    { value: 'ON', label: 'Ontario' },
    { value: 'PE', label: 'Prince Edward Island' },
    { value: 'QC', label: 'Quebec' },
    { value: 'SK', label: 'Saskatchewan' },
    { value: 'NT', label: 'Northwest Territories' },
    { value: 'NU', label: 'Nunavut' },
    { value: 'YT', label: 'Yukon' },
  ],
}

export const InteractiveForm: React.FC = () => {
  const { locale } = useContext(GlobalContext)
  const [form] = Form.useForm()

  const onFormSubmit = (values: any) => {
    console.log('Form values:', values)
  }

  const handleCountryChange = () => {
    form.setFieldsValue({
      stateProvince: undefined,
      zipPostal: undefined,
    })
  }

  const handleStateProvinceChange = () => {
    form.setFieldsValue({
      zipPostal: undefined,
    })
  }

  return (
    <>
      <PageTitle>{locale === 'zh_CN' ? '表单 - 依賴互动' : 'Form - Interactive'}</PageTitle>

      <Form form={form} layout="vertical" onFinish={onFormSubmit}>
        <Row gutter={8}>
          <Col style={{ width: 100 }}>
            <Form.Item label="Suite" name={['address', 'suite']}>
              <Input placeholder="Suite" />
            </Form.Item>
          </Col>
          <Col flex="auto">
            <Form.Item
              label="Street"
              name={['address', 'street']}
              rules={[{ required: true, message: 'Street Required' }]}
            >
              <Input placeholder="Street" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="country" label="Country" rules={[{ required: true, message: 'Please select a country!' }]}>
          <Select placeholder="Select Country" onChange={handleCountryChange}>
            {countries.map((country) => (
              <Option key={country} value={country}>
                {country}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item dependencies={['country']} noStyle>
          {({ getFieldValue }) => {
            const country: Country | undefined = getFieldValue('country')
            return (
              <Form.Item
                name="stateProvince"
                label={country === 'USA' ? 'State' : 'Province'}
                rules={[{ required: true, message: 'Please select a state/province!' }]}
              >
                <Select
                  placeholder={country === 'USA' ? 'Select State' : 'Select Province'}
                  onChange={handleStateProvinceChange}
                >
                  {country &&
                    statesProvinces[country].map(({ value, label }) => (
                      <Option key={value} value={value}>
                        {label}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            )
          }}
        </Form.Item>

        <Form.Item dependencies={['country']} noStyle>
          {({ getFieldValue }) => {
            const country: Country | undefined = getFieldValue('country')
            const zipPostalLabel = country === 'USA' ? 'Zip Code' : 'Postal Code'
            return (
              <Form.Item
                name="zipPostal"
                label={zipPostalLabel}
                rules={[
                  { required: true, message: 'Required' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const country: Country | undefined = getFieldValue('country')
                      if (country === 'USA' && !/^\d{5}$/.test(value)) {
                        return Promise.reject('Zip code should be 5 digits.')
                      } else if (country === 'Canada' && !/^[A-Z]\d[A-Z] ?\d[A-Z]\d$/.test(value)) {
                        return Promise.reject('Invalid postal code format.')
                      }
                      return Promise.reject('Please select a country first.')
                    },
                  }),
                ]}
                validateTrigger="onBlur"
              >
                <Input placeholder={zipPostalLabel} />
              </Form.Item>
            )
          }}
        </Form.Item>

        <div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  )
}
