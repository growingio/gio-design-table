import {
  CornerCell, CornerHeaderConfig, CornerNodeType,
  SortParam, EXTRA_FIELD, SERIES_NUMBER_FIELD,
  VALUE_FIELD, GuiIcon, S2Event
} from '@antv/s2'
import { Event as CanvasEvent } from '@antv/g-canvas';
import { find, get, isEqual } from 'lodash';
import { getSortTypeIcon } from '../util'
import { GioS2DataConfig } from '..';

export class CustomCornerCell extends CornerCell {
  protected isSortCell() {

    const { field } = this.meta;
    return this.meta.cornerType === CornerNodeType.Row && !isEqual(field, EXTRA_FIELD)
      && !isEqual(field, SERIES_NUMBER_FIELD) && !isEqual(field, VALUE_FIELD);

  }


  protected handleRestOptions(...[headerConfig]: [CornerHeaderConfig]) {
    this.headerConfig = { ...headerConfig };
    const { query, field } = this.meta;
    const sortParams = this.spreadsheet.dataCfg.sortParams;
    const { sortMeta = [] } = this.spreadsheet.dataCfg as GioS2DataConfig;
    const sort = sortMeta.find(s => s.field === field);
    const noSort = isEqual(sort?.canSort, false);
    // 当前单元格是否为需要展示排序 icon 单元格, dataCfg.sortMeta 配置 canSort===false时 不展示排序icon
    const isSortCell = this.isSortCell() && !noSort;

    const sortParam = find(
      sortParams,
      (item) =>
        isSortCell &&
        item?.sortFieldId === field &&
        isEqual(get(item, 'query'), query),
    ) as SortParam;
    const type = getSortTypeIcon(sortParam, isSortCell);
    this.headerConfig.sortParam = {
      ...this.headerConfig.sortParam || {},
      ...(sortParam || { query }),
      type,
    };


  }

  protected showSortIcon() {
    if (this.spreadsheet.options.showDefaultHeaderActionIcon) {
      const { sortParam } = this.headerConfig;
      const { query } = this.meta;


      // sortParam的query，和type本身可能会 undefined,
      return (
        isEqual(get(sortParam, 'query'), query) &&
        get(sortParam, 'type') &&
        get(sortParam, 'type') !== 'none'
      ) as boolean;
    }
    return false;
  }

  // 绘制排序icon
  protected drawSortIcons() {
    if (!this.showSortIcon()) {
      return;
    }

    const { icon, text } = this.getStyle() || {};
    const { sortParam } = this.headerConfig;
    const position = this.getIconPosition();
    const sortIcon = new GuiIcon({
      name: get(sortParam, 'type', 'none'),
      ...position,
      width: icon?.size,
      height: icon?.size,
      fill: text?.fill,
    });
    sortIcon.on('click', (event: CanvasEvent) => {
      this.spreadsheet.emit(S2Event.GLOBAL_ACTION_ICON_CLICK, event);
      this.spreadsheet.handleGroupSort(event, this.meta);
    });
    this.add(sortIcon);
    this.actionIcons.push(sortIcon);
  }
}