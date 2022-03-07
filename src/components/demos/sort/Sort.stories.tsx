import { SortParams } from '@antv/s2';
import { SheetProps } from '../../../../dist';
import { DataTable } from '../../sheet';
// import Docs from './Table.mdx';
import dataCfg from '../pivot-data'

export default {
  title: '排序/表格排序',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: DataTable,
  parameters: {
    // docs: {
    //   page: Docs,
    // },
  },
};


export function Default() {
  const props: SheetProps = {
    type: 'pivot',
    options: {
      width: 600,
      height: 480,
      hierarchyType: 'grid',
      conditions: {
        background: [
          {
            field: 'number',
            mapping() {
              return {
                // fill 是背景字段下唯一必须的字段，用于指定文本颜色
                fill: '',
              };
            },
          },
        ],
      },
    },
    dataConfig: {
      fields: {
        rows: ['province', 'city'],
        columns: ['type', 'sub_type'],
        values: ['number'],
        valueInCols: true,
      },
      meta: dataCfg.meta,
      data: dataCfg.data,
      totalData: dataCfg.totalData as any
    },
    onSortChange: (params: SortParams) => { console.log('onSortChange', params) }
  }
  return (<div className='table-demo-box'>
    <DataTable {...props} />
  </div>)
}