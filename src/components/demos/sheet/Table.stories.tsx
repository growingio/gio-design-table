import { ComponentStory } from '@storybook/react';
import { useMemo, useState } from 'react';
import { useEffect } from '@storybook/addons';
import { SheetProps } from '../../..';
import { DataTable } from '../../sheet';
import { prod } from '../simple-data'

export default {
  title: '表格形态/明细表 Table',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: DataTable,
  parameters: {
    docs: {
      // page: Docs,
    },
  },
};

const Template: ComponentStory<typeof DataTable> = (args) => <div
  className='table-demo-box'>
  <DataTable {...args} />
</div>
export const Default = Template.bind({});
const options = {
  width: 600,
  height: 480,
  conditions: {
    background: [
      {
        field: 'price',
        mapping() {
          return {
            fill: ''
          }
        }
      }
    ]
  }
};
Default.args = {
  options,
  dataConfig: {
    fields: { columns: ['province', 'city', 'type', 'price', 'cost'] },
    meta: [
      {
        field: 'province',
        name: '省份',
      },
      {
        field: 'city',
        name: '城市',
      },
      {
        field: 'type',
        name: '商品类别',
      },
      {
        field: 'price',
        name: '价格',
      },
      {
        field: 'cost',
        name: '成本',
      },
    ],
    data: prod as any,
    sortMeta: [{ field: 'city', canSort: false }]
  },
  type: 'table'
}
export const Empty = Template.bind({});
Empty.args = {
  options,
  dataConfig: {
    fields: { columns: ['province', 'city', 'type', 'price', 'cost'] },
    meta: [
      {
        field: 'province',
        name: '省份',
      },
      {
        field: 'city',
        name: '城市',
      },
      {
        field: 'type',
        name: '商品类别',
      },
      {
        field: 'price',
        name: '价格',
      },
      {
        field: 'cost',
        name: '成本',
      },
    ],
    data: []
  },
  type: 'table'
}
export const Sort: ComponentStory<typeof DataTable> = () => {
  const [data, setData] = useState<any[]>([]);
  const getData = () => new Promise((resolve) => {
    setTimeout(() => resolve(prod as any[]), 1000)
  });
  useEffect(() => {

    getData().then(res => {
      setData(res as any[]);
    })
  }, [])

  const dataCfg: SheetProps['dataConfig'] = {
    fields: { columns: ['province', 'city', 'type', 'price', 'cost'] },
    meta: [
      {
        field: 'province',
        name: '省份',
      },
      {
        field: 'city',
        name: '城市',
      },
      {
        field: 'type',
        name: '商品类别',
      },
      {
        field: 'price',
        name: '价格',
      },
      {
        field: 'cost',
        name: '成本',
      },
    ],
    data,
    sortParams: [
      {
        sortFieldId: 'price',
        sortMethod: 'ASC',
      },
    ],
  }
  return <div
    className='table-demo-box'>
    <DataTable options={{
      width: 600,
      height: 480,
    }} type="table" dataConfig={dataCfg} />
  </div>
}
export const ShowSeriesNumber: ComponentStory<typeof DataTable> = () => {

  const generateRawData = (row: any, col: any) => {
    const res = [];

    const rowKeys = Object.keys(row);
    const colKeys = Object.keys(col);

    for (let i = 0; i < row[rowKeys[0]]; i++) {
      for (let j = 0; j < row[rowKeys[1]]; j++) {
        for (let m = 0; m < col[colKeys[0]]; m++) {
          for (let n = 0; n < col[colKeys[1]]; n++) {
            res.push({
              province: `p${i}`,
              city: `c${j}`,
              type: `type${m}`,
              subType: `subType${n}`,
              number: i * n,
            });
          }
        }
      }
    }

    return res;
  }

  const dataSet = useMemo(() => generateRawData(
    { province: 100, city: 10 },
    { type: 100, sub_type: 10 },
  ), []);
  const s2DataConfig = {
    fields: {
      columns: ['province', 'city', 'type', 'subType', 'number'],
    },
    data: dataSet
  };
  const s2Options = {
    width: 600,
    height: 480,
    showSeriesNumber: true,

  };
  return <div
    className='table-demo-box'>
    <DataTable options={s2Options} type="table" dataConfig={s2DataConfig} />
  </div>
}