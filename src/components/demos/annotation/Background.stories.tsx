import { SortParams } from '@antv/s2';
import { useState } from 'react';
import { useEffect, useMemo } from '@storybook/addons';
import { SheetProps } from '../../..';
import { DataTable } from '../../sheet';
import dataCfg from '../pivot-data'
import { chartData as data3 } from '../data/event-anilysis-data';
import { data as data2 } from '../data/simple2-data';
import { data as data1 } from '../data/simple1-data'
import { transformData } from '../util';
import { response, request } from '../data/segments-uv-data';
import * as pageUv from '../data/page-uv-data'

export default {
  title: '字段标注/背景标注',
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



/**
 * 字段标注-背景标注
 * @returns 
 */
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
  }
  return (<div className='table-demo-box'>
    <DataTable {...props} />
  </div>)
}
function getDataAsync(data: any, delay = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transformData(data))
    }, delay)
  })
}
export function Simple1() {
  const [data, setData] = useState<SheetProps['dataConfig']>({} as SheetProps['dataConfig']);

  useEffect(() => {
    getDataAsync(data1).then((d) => {
      setData(d as any);
    });
  }, []);
  const conditions = useMemo(() => {
    if (!data.meta) {
      return undefined;
    }
    return (data.meta as any[])?.reduce((acc, cur) => {
      if (!cur.isDim) {
        acc.background = [...acc.background, { field: cur.id, mapping() { return { fill: '' } } }]
      }
      return acc;
    }, { background: [] });
  }, [data]);
  const props: SheetProps = {
    type: 'pivot',
    options: {
      width: 600,
      height: 480,
      hierarchyType: 'grid',
      conditions,
    },
    dataConfig: {
      ...data,
    },
  }
  return (<div className='table-demo-box'>
    {data?.data && <DataTable {...props} />}
  </div>)
}

export const Simple2 = () => {
  const [data, setData] = useState<SheetProps['dataConfig']>({} as SheetProps['dataConfig']);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getDataAsync(data2, 1000).then((d) => {
      setData(d as any);
      setLoading(false);
    });
  }, []);

  const conditions = useMemo(() => {
    if (!data.meta) {
      return undefined;
    }
    return (data.meta as any[])?.reduce((acc, cur) => {
      if (!cur.isDim) {
        acc.background = [...acc.background, { field: cur.id, mapping() { return { fill: '' } } }]
      }
      return acc;
    }, { background: [] });
  }, [data]);
  const props: SheetProps = {
    type: 'pivot',
    options: {
      width: 600,
      height: 480,
      hierarchyType: 'grid',
      conditions,
    },
    dataConfig: {
      ...data,
    },
    onRangeSort: (p) => {
      console.log('onRangeSort', p)
    }
  }
  return (<div className='table-demo-box'>
    <DataTable {...props} loading={loading} />
  </div>)
}
export const Simple3 = () => {
  const [data, setData] = useState<SheetProps['dataConfig']>({} as SheetProps['dataConfig']);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getDataAsync(data3, 1000).then((d) => {
      setData(d as any);
      setLoading(false);
    });

  }, []);
  const conditions = useMemo(() => {
    if (!data.meta) {
      return undefined;
    }
    return (data.meta as any[])?.reduce((acc, cur) => {
      if (!cur.isDim) {
        acc.background = [...acc.background, { field: cur.id, mapping() { return { fill: '' } } }]
      }
      return acc;
    }, { background: [] });
  }, [data]);
  const props: SheetProps = {
    type: 'pivot',
    options: {
      width: 600,
      height: 480,
      hierarchyType: 'grid',
      conditions,
    },
    dataConfig: {
      ...data,
    },
    onRangeSort: (params: SortParams) => { console.log('onSortChange', params) }
  }
  return (<div className='table-demo-box'>
    <DataTable {...props} loading={loading} />
  </div>)
}
export const Simple4 = () => {
  const [data, setData] = useState<SheetProps['dataConfig']>({} as SheetProps['dataConfig']);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // setLoading(true);
    getDataAsync(response, 1000).then((d) => {
      setData(d as any);
      setLoading(false);
    });

  }, []);
  const conditions = useMemo(() => {
    if (!data.meta) {
      return undefined;
    }
    return (data.meta as any[])?.reduce((acc, cur) => {
      if (!cur.isDim) {
        acc.background = [...acc.background, { field: cur.id, mapping() { return { fill: '' } } }]
      }
      return acc;
    }, { background: [] });
  }, [data]);
  const props: SheetProps = {
    type: 'pivot',
    options: {
      width: 600,
      height: 480,
      hierarchyType: 'grid',
      conditions,
      style: {
        colCfg: {
          hideMeasureColumn: false,
        }
      }
    },
    dataConfig: {
      data: data.data,
      meta: data.meta,
      fields: {
        rows: data?.fields?.columns,// data?.fields?.rows,//['segmentation'],
        // columns: data?.fields?.columns,
        values: request.metrics.map(m => m.id)
      }
    },
  }
  return (<div className='table-demo-box'>
    <DataTable {...props} loading={loading} />
  </div>)
}

export const Simple5 = () => {
  const [data, setData] = useState<SheetProps['dataConfig']>({} as SheetProps['dataConfig']);
  const [loading, setLoading] = useState(false);
  const [uvRequest] = useState(pageUv.request)
  useEffect(() => {
    // setLoading(true);
    getDataAsync(pageUv.resonse).then((d) => {
      setData(d as any);
      setLoading(false);
    });

  }, []);
  const conditions = useMemo(() => {
    if (!data.meta) {
      return undefined;
    }
    return (data.meta as any[])?.reduce((acc, cur) => {
      if (!cur.isDim) {
        acc.background = [...acc.background, { field: cur.id, mapping() { return { fill: '' } } }]
      }
      return acc;
    }, { background: [] });
  }, [data]);
  const props: SheetProps = {
    type: 'pivot',
    options: {
      width: 600,
      height: 480,
      hierarchyType: 'grid',
      conditions,
    },
    dataConfig: {
      ...data,
      data: data.data,
      meta: data.meta,
      fields: {
        columns: ['segmentation'],
        rows: data?.fields?.rows as string[],
        // columns: uvRequest.dimensions,
        values: [...uvRequest.metrics.map(m => m.id)]
      }
    },
  }
  return (<div className='table-demo-box'>
    <DataTable {...props} loading={loading} />
  </div>)
}