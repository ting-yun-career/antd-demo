import React from 'react'
import { Formik, Form, ErrorMessage, FormikHelpers, FormikProps } from 'formik'
import { Input, Button, Select, Form as AntForm } from 'antd'

import { useContext } from 'react'
import { GlobalContext } from '../../../global/globalProvider'
import { PageTitle } from '../../../components/PageTitle/PageTitle'

interface FormValues {
  country: string
  state: string
  zip: string
  province: string
  postalCode: string
}

export const InteractiveForm: React.FC = () => {
  const { locale } = useContext(GlobalContext)

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {}

    if (!values.country) {
      errors.country = 'Required'
    }

    if (values.country === 'USA') {
      if (!values.state) {
        errors.state = 'Required'
      }
      if (!values.zip) {
        errors.zip = 'Required'
      }
    } else if (values.country === 'Canada') {
      if (!values.province) {
        errors.province = 'Required'
      }
      if (!values.postalCode) {
        errors.postalCode = 'Required'
      }
    }

    return errors
  }

  return (
    <>
      <PageTitle>{locale === 'zh_CN' ? '表单 - 高互动' : 'Form - Interactive'}</PageTitle>
      <Formik
        initialValues={{
          country: '',
          state: '',
          zip: '',
          province: '',
          postalCode: '',
        }}
        validate={validate}
        onSubmit={(values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }}
      >
        {(formikProps: FormikProps<FormValues>) => (
          <Form>
            <AntForm.Item name="country">
              <Select
                value={formikProps.values.country}
                onChange={(value) => formikProps.setFieldValue('country', value)}
                onBlur={formikProps.handleBlur}
                placeholder="Select a country"
              >
                <Select.Option value="USA">USA</Select.Option>
                <Select.Option value="Canada">Canada</Select.Option>
              </Select>
            </AntForm.Item>
            {formikProps.touched.country && <ErrorMessage name="country" component="div" />}

            {formikProps.values.country === 'USA' && (
              <>
                <AntForm.Item name="state">
                  <Select
                    value={formikProps.values.state}
                    onChange={(value) => formikProps.setFieldValue('state', value)}
                    onBlur={formikProps.handleBlur}
                    placeholder="Select a state"
                  >
                    <Select.Option value="NY">New York</Select.Option>
                    <Select.Option value="CA">California</Select.Option>
                    {/* Add more states as needed */}
                  </Select>
                </AntForm.Item>
                {formikProps.touched.state && <ErrorMessage name="state" component="div" />}
                <AntForm.Item name="zip">
                  <Input
                    value={formikProps.values.zip}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    placeholder="ZIP"
                  />
                </AntForm.Item>
                {formikProps.touched.zip && <ErrorMessage name="zip" component="div" />}
              </>
            )}

            {formikProps.values.country === 'Canada' && (
              <>
                <AntForm.Item name="province">
                  <Select
                    value={formikProps.values.province}
                    onChange={(value) => formikProps.setFieldValue('province', value)}
                    onBlur={formikProps.handleBlur}
                    placeholder="Select a province"
                  >
                    <Select.Option value="ON">Ontario</Select.Option>
                    <Select.Option value="QC">Quebec</Select.Option>
                    {/* Add more provinces as needed */}
                  </Select>
                  {formikProps.touched.province && <ErrorMessage name="province" component="div" />}
                </AntForm.Item>
                <AntForm.Item name="postalCode">
                  <Input
                    value={formikProps.values.postalCode}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    placeholder="Postal Code"
                  />
                  {formikProps.touched.postalCode && <ErrorMessage name="postalCode" component="div" />}
                </AntForm.Item>
              </>
            )}

            <Button
              type="primary"
              htmlType="submit"
              disabled={!formikProps.isValid || Object.keys(formikProps.touched).length < 2}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}
