import { SortParams } from '@antv/s2';
import { SheetProps } from '../../../index';
import { DataTable } from '../../sheet';
import { data } from '../data/sort-data'

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

      },
    },
    dataConfig: {
      fields: {
        rows: ["province", "city"],
        columns: ["sub_type"],
        values: ["cost"]
      },
      meta: data.meta,
      data: data.originData,
      totalData: data.totalData as any,
      sortMeta: [{ field: 'city', canSort: false }],
      sortParams: [
        { sortFieldId: 'province', sortMethod: 'asc' },
        // {
        //   sortFieldId: 'city', sortByMeasure: 'cost', sortMethod: 'desc', query: {
        //     $$extra$$: "cost",
        //     sub_type: "笔"
        //   }
        // },
        // { sortFieldId: 'city', sortMethod: 'asc' },
      ]
    },
    onRangeSort: (params: SortParams) => { console.log('onRangeSort', params) }
  }
  return (<div className='table-demo-box'>
    <DataTable {...props} />
  </div>)
}
export const ValueInColsSort = () => {
  const props: SheetProps = {
    type: 'pivot',
    options: {
      width: 600,
      height: 480,
      hierarchyType: 'grid',

    },
    dataConfig: {
      fields: {
        rows: ["province", "city"],
        columns: ["type"],
        values: ["cost"],
        valueInCols: false,
      },
      meta: data.meta,
      data: data.originData,
      totalData: data.totalData as any,
      sortParams: [
        { sortFieldId: 'province', sortMethod: 'asc', /* sortBy: ['吉林', '浙江'] */ },
        { sortFieldId: 'city', sortByMeasure: 'cost' },
        { sortFieldId: 'type', sortBy: ['纸张', '笔'] },
      ]
    },
    onRangeSort: (params: SortParams) => { console.log('onRangeSort', params) }
  }
  return (<div className='table-demo-box'>
    <DataTable {...props} />
  </div>)
}