export const t = (key: string, locale: string | undefined) => translations[locale ?? '']?.[key] || key
const translations: any = {
  zh_CN: {
    Charts: '圖表',
    'Area Chart': '面积图',
    'Bar Chart': '条形图',
    'Pie Chart': '饼图',
    'Y by Category': '类别的Y值',
    'Relationship Between X and Y': 'X与Y之间的关系',
    'X (unit)': 'X (单位)',
    'Y (unit)': 'Y (单位)',
    'X (category)': 'X (类别)',
    '% By Category': '% 按类别',
  },
}
