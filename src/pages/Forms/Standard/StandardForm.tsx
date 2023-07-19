import {
  AutoComplete,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Slider,
  Switch,
  TimePicker,
  Upload,
} from 'antd'
import { useContext } from 'react'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
import { GlobalContext } from '../../../global/globalProvider'

const StandardForm = () => {
  const { locale } = useContext(GlobalContext)
  const [baiscForm] = Form.useForm()
  const [advancedForm] = Form.useForm()

  const formItemStyle = { minWidth: '100px' }

  const colResp = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }

  const { RangePicker } = DatePicker

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  return (
    <>
      <PageTitle>{locale === 'zh_CN' ? '表单 - 标准格式' : 'StandardForm - Standard'}</PageTitle>
      <Row gutter={[10, 20]}>
        <Col {...colResp}>
          <Card title={locale === 'zh_CN' ? '基层组件' : 'Basic Form Elements'} style={{ width: '100%' }}>
            <Form form={baiscForm} layout="vertical">
              <Form.Item name="text" label={locale === 'zh_CN' ? '一般输入' : 'Text'} style={formItemStyle}>
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label={locale === 'zh_CN' ? '密码键入' : 'Password'}
                style={formItemStyle}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item name="textarea" label={locale === 'zh_CN' ? '多行输入' : 'Textarea'} style={formItemStyle}>
                <Input.TextArea showCount />
              </Form.Item>
              <Form.Item name="select" label={locale === 'zh_CN' ? '單选菜單' : 'Select'} hasFeedback>
                <Select
                  placeholder="Please select"
                  options={[
                    { value: 1, label: 'Option 1' },
                    { value: 2, label: 'Option 2' },
                    { value: 3, label: 'Option 3' },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item name="radio" label={locale === 'zh_CN' ? '单选按钮' : 'Radio'} style={formItemStyle}>
                <Radio.Group>
                  <Radio value={1}>A</Radio>
                  <Radio value={2}>B</Radio>
                  <Radio value={3}>C</Radio>
                  <Radio value={4}>D</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="checkbox" label={locale === 'zh_CN' ? '多选按钮' : 'Checkbox'} style={formItemStyle}>
                <Checkbox.Group
                  options={[
                    { value: 1, label: 'A' },
                    { value: 2, label: 'B' },
                    { value: 3, label: 'C' },
                    { value: 4, label: 'D' },
                  ]}
                />
              </Form.Item>
              <Form.Item name="multiselect" label={locale === 'zh_CN' ? '復选菜单' : 'MultiSelect'} hasFeedback>
                <Select
                  mode={'multiple'}
                  placeholder="Please select"
                  options={[
                    { value: 1, label: 'Option 1' },
                    { value: 2, label: 'Option 2' },
                    { value: 3, label: 'Option 3' },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item name="autocomplete" label={locale === 'zh_CN' ? '自动筛选' : 'AutoComplete'}>
                <AutoComplete
                  options={[
                    { label: 'Option A', value: 'A' },
                    { label: 'Option B', value: 'B' },
                    { label: 'Option C', value: 'C' },
                  ]}
                  filterOption={(inputValue, option) => {
                    return option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }}
                  placeholder="try typing 'A' or 'B' or 'C'"
                />
              </Form.Item>
              <Form.Item
                name="numberValue"
                label={locale === 'zh_CN' ? '数值输入' : 'Numeral Value'}
                style={formItemStyle}
              >
                <InputNumber min={1} max={99} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="toggle" label={locale === 'zh_CN' ? '简易开关' : 'Toggle'} valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item name="slider" label={locale === 'zh_CN' ? '滑动取值' : 'Slider'}>
                <Slider
                  marks={{
                    0: 'A',
                    20: 'B',
                    40: 'C',
                    60: 'D',
                    80: 'E',
                    100: 'F',
                  }}
                />
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col {...colResp}>
          <Card title={locale === 'zh_CN' ? '高級組件' : 'Advanced Form Elements'} style={{ width: '100%' }}>
            <Form form={advancedForm} layout="vertical">
              <Form.Item name="date" label={locale === 'zh_CN' ? '日期输入' : 'Date Picker'}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="time" label={locale === 'zh_CN' ? '时间输入' : 'Time Picker'}>
                <TimePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="daterange" label={locale === 'zh_CN' ? '日期范围' : 'Date/Time Range Picker'}>
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="upload"
                label={locale === 'zh_CN' ? '上传文件' : 'Upload'}
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                {/*Delete Link: https://designer.mocky.io/manage/delete/6c242589-3339-438b-927b-f7a5bcb53536/4MtrNbJRfTyLRt8fAkE0K8n0s7xgTPxVM5G5*/}
                <Upload.Dragger action="https://run.mocky.io/v3/6c242589-3339-438b-927b-f7a5bcb53536">
                  <div>
                    <span className="material-symbols-outlined" style={{ fontSize: '3em' }}>
                      attach_file_add
                    </span>
                  </div>
                  <div>Click or drag file to this area to upload</div>
                </Upload.Dragger>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default StandardForm
