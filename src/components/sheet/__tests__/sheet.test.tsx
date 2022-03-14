import { render } from '@testing-library/react';
import * as mockDataConfig from './data/simple-data.json';
import { DataTable } from '..';
import { OptionsConfig } from '../..';

const s2Options: OptionsConfig = {
  width: 600,
  height: 600,
  hierarchyType: 'grid',
};
describe('Spread Sheet Tests', () => {
  const hasScrollBar = (container: HTMLElement) => {
    const s2Container = container.querySelector('.gio-d-table-container') as HTMLElement;
    const res = (
      (s2Container.scrollWidth > s2Container.clientWidth ||
        document.body.scrollWidth > window.innerWidth) &&
      window.getComputedStyle(s2Container).overflow !== 'hidden'
    );
    return res;
  };

  describe('Mount Sheet tests', () => {

    test('should display scroll bar if s2Options.width more than browser window width', () => {
      const { container } = render(<div><DataTable
        options={{
          ...s2Options,
          width: window.innerWidth + 100,
        }}
        adaptive={false}
        dataConfig={mockDataConfig as any}
      /></div>);
      expect(container).toMatchSnapshot();
      expect(hasScrollBar(container)).toBeFalsy();
    });

  });
});