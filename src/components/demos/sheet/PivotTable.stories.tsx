import { Data } from '@antv/s2';
import { Radio, RadioGroup } from '@gio-design/components';
import { ComponentStory } from '@storybook/react';
import { ChangeEventHandler, useRef, useState } from 'react';
import { Adaptive, SheetProps } from '../../..';
import { DataTable } from '../../sheet';
// import Docs from './Table.mdx';
import dataCfg from '../pivot-data'

export default {
  title: '表格形态/透视表 Pivot Table',
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

const Template: ComponentStory<typeof DataTable> = (args) => <div
  className='table-demo-box'>
  <DataTable {...args} />
</div>
export const Default = Template.bind({});

const options: SheetProps['options'] = {
  width: 600,
  height: 480,
  debug: true,
  // showDefaultHeaderActionIcon: false,
  tooltip: {
    showTooltip: true,
    row: {
      showTooltip: false,
    },
  },
  totals: {
    row: {
      showGrandTotals: true,
      showSubTotals: true,
    },
    col: {
      showGrandTotals: true,
      showSubTotals: true,
    }
  }

};
Default.args = {
  options,
  dataConfig: {
    fields: {
      rows: ['province', 'city'],
      columns: ['type', 'sub_type'],
      values: ['number'],
      valueInCols: true,
    },
    meta: dataCfg.meta,
    data: dataCfg.data,
    totalData: dataCfg.totalData as unknown as Data[]
  },
  onCopied: (data) => { console.log('onCopied', data) }

};
export const Tree: ComponentStory<typeof DataTable> = () => {
  const props: SheetProps = {
    type: 'pivot',
    options: {
      width: 600,
      height: 480,
      hierarchyType: 'tree',
      totals: {
        row: {
          showGrandTotals: true,
          showSubTotals: true,
        },
        col: {
          showGrandTotals: true,
          showSubTotals: true,
        }
      }
    },
    dataConfig: {
      fields: {
        rows: ['province', 'city'],
        columns: ['sub_type'],
        values: ['number'],
        valueInCols: false,
      },
      meta: dataCfg.meta,
      data: dataCfg.data,
      totalData: dataCfg.totalData as any
    }
  }
  return (<div className='table-demo-box'>
    <DataTable {...props} />
  </div>)
}

export function CustomTheme() {
  const customTheme = {
    splitLine: {
      horizontalBorderColor: '#ADB2C2',
      horizontalBorderColorOpacity: 0.2,
      horizontalBorderWidth: 4,
      verticalBorderColor: '#ADB2C2',
      verticalBorderColorOpacity: 0.2,
      verticalBorderWidth: 4,
      showShadow: true,
      shadowWidth: 8,
      shadowColors: {
        left: 'rgba(0,0,0,0.1)',
        right: 'rgba(0,0,0,0)',
      },
    },
  }
  const props: SheetProps = {
    type: 'pivot',
    options: {
      width: 600,
      height: 480,
      hierarchyType: 'tree',
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
    themeConfig: { theme: customTheme }
  }
  return (<div className='table-demo-box'>
    <DataTable {...props} />
  </div>)
}
export function AdaptiveContainer() {
  const [adaptive, setAdaptive] = useState<Adaptive>(false)
  const wrapRef = useRef<HTMLDivElement>(null);
  const props: SheetProps = {
    type: 'pivot',
    adaptive,
    options: {
      width: 600,
      height: 480,
      hierarchyType: 'grid',
    },
    dataConfig: {
      fields: {
        rows: ['sub_type', 'city', 'type'],
        // columns: ['type'],
        values: ['number'],
        valueInCols: true,
      },
      meta: dataCfg.meta,
      data: dataCfg.data,
      totalData: dataCfg.totalData as any
    }
  }
  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const adpt = e.target.checked ? { width: true, height: true, getContainer: () => (wrapRef.current as HTMLElement) } : false
    setAdaptive(adpt);
  }
  return (<div>
    <label><input type="checkbox" onChange={handleCheckboxChange} /> 宽高自适应</label>
    <hr />
    <div style={{ border: '1px solid #adadad', padding: '10px' }}>
      <div ref={wrapRef}>
        <DataTable {...props} />
      </div>
    </div></div>)
}
/**
 * 字段标注-背景标注
 * @returns 
 */
export function LayoutWidthType() {
  const [layoutWidth, setLayoutWidth] = useState<string>('adaptive')
  const props: SheetProps = {
    type: 'pivot',
    options: {
      width: 600,
      height: 480,
      hierarchyType: 'grid',
      style: {
        layoutWidthType: layoutWidth as any
      },
      totals: {
        row: {
          showGrandTotals: true,
          showSubTotals: true,
          reverseLayout: true,
          reverseSubLayout: true,
          subTotalsDimensions: ['province'],
        },
        col: {
          showGrandTotals: true,
          showSubTotals: true,
          reverseLayout: true,
          reverseSubLayout: true,
          subTotalsDimensions: ['type'],
        },
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
    <RadioGroup
      onChange={(e) => { setLayoutWidth(e.target.value) }}
      value={layoutWidth}
    >
      <Radio value="adaptive">
        adaptive:行列等宽
      </Radio>
      <Radio value="colAdaptive">
        colAdaptive:列等宽,行头紧凑布局
      </Radio>
      <Radio value="compact">
        compact:行列紧凑布局
      </Radio>
    </RadioGroup>
    <DataTable {...props} />
  </div>)
}