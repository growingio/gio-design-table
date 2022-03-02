// import { Menu, Dropdown, MenuProps } from 'antd';
import { isEmpty, map } from 'lodash';
import React from 'react';
import {
  S2CellType,
  TooltipOperatorMenu,
  TooltipOperatorOptions,
} from '@antv/s2';
import { Icon } from '../TooltipIcon';
import './index.less';
import { TOOLTIP_PREFIX_CLS } from '../../../../common'
import { usePrefixCls } from '@gio-design/utils';
import { Dropdown, List } from '@gio-design/components'
import { CascaderItem } from '@gio-design/components/es/cascader';

const { Item } = List;
interface TooltipOperatorProps extends TooltipOperatorOptions {
  onlyMenu?: boolean;
  cell: S2CellType;
  // onClick: (...args: unknown[]) => void;
}

/**
 * tooltip menu
 *  - UI
 *  - actions
 *    delay 300ms show
 */

export const TooltipOperator = (props: TooltipOperatorProps) => {
  const { menus, onlyMenu, onClick: onMenuClick, cell } = props;
  const tooltipPrefixCls = usePrefixCls(TOOLTIP_PREFIX_CLS);

  const renderTitle = (menu: TooltipOperatorMenu) => {
    const icon = menu.icon && <Icon
      icon={menu.icon}
      className={`${tooltipPrefixCls}-operator-icon`}
    />;
    return (
      <Item value={menu.key} prefix={icon}
        onClick={(v, e) => {
          console.log('list item click===>', v, e, cell)
          menu.onClick?.(cell)
        }}>
        {menu.text}
      </Item>
    );
  };

  const renderMenu = (menu: TooltipOperatorMenu) => {
    const { key, text, children } = menu;

    if (!isEmpty(children)) {
      return (
        <CascaderItem label={text || key} value={key} key={key}>
          <List>
            {map(children, (subMenu: TooltipOperatorMenu) => renderMenu(subMenu))}
          </List>
        </CascaderItem>
      );
    }

    return renderTitle(menu)

  };

  const renderMenus = () => {
    if (onlyMenu) {
      return (
        <List
          className={`${tooltipPrefixCls}-operator-menus`}
          onClick={(v, e) => {
            console.log('list onlyMenu click', v, e)
            onMenuClick?.(v, e)
          }}
        >
          {map(menus, (operatorMenu: TooltipOperatorMenu) => renderMenu(operatorMenu))}
        </List>
      );
    }

    return map(menus, (menu: TooltipOperatorMenu) => {
      const { key, children } = menu;
      const menuRender = !isEmpty(children) ? (
        <List
          className={`${tooltipPrefixCls}-operator-menus`}
          onClick={onMenuClick}
        >
          {map(menus, (operatorMenu: TooltipOperatorMenu) => renderMenu(operatorMenu))}
        </List>
      ) : (
        <></>
      );

      return (
        <Dropdown key={key} content={menuRender}>
          {renderTitle(menu)}
        </Dropdown>
      );
    });
  };


  if (isEmpty(menus)) {
    return null;
  }
  return <div className={`${tooltipPrefixCls}-operator`}>{renderMenus()}</div>

};
