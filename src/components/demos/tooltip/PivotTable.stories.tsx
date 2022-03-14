import { Data } from '@antv/s2';
import { ComponentStory } from '@storybook/react';
import { SheetProps } from '../../..';
import { DataTable } from '../../sheet';
// import Docs from './Table.mdx';
import dataCfg from '../pivot-data'

export default {
  title: '组件/Tooltip',
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

  // totals: {
  //   row: {
  //     showGrandTotals: true,
  //     showSubTotals: true,
  //     reverseLayout: true,
  //     reverseSubLayout: true,
  //     subTotalsDimensions: ['province'],
  //   },
  //   col: {
  //     showGrandTotals: true,
  //     showSubTotals: true,
  //     reverseLayout: true,
  //     reverseSubLayout: true,
  //     subTotalsDimensions: ['type'],
  //   },
  // },
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

};
export const Simple1: ComponentStory<typeof DataTable> = () => {
  const props: SheetProps = {
    type: 'pivot',
    options: {
      width: 600,
      height: 480,
      tooltip: {
        showTooltip: true,
        col: {
          operation: {
            hiddenColumns: false,
            trend: false,
            onClick: (p) => {
              console.log('col-tooltip operation clicked', p)
            }
          }
        },
        row: {
          showTooltip: false,
        },
        data: {
          showTooltip: false,
        }
      }
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
    }
  }
  return (<div className='table-demo-box'>
    <DataTable {...props} />
  </div>)
}
