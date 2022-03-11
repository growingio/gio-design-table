import { SortParam } from "@antv/s2";
import { toUpper } from "lodash";

export const isAscSort = (sortMethod: string) => toUpper(sortMethod) === 'ASC';

export const isDescSort = (sortMethod: string) => toUpper(sortMethod) === 'DESC';

export const getSortTypeIcon = (sortParam?: SortParam, isSortCell?: boolean) => {
  if (sortParam?.sortMethod) {
    if (isAscSort(sortParam?.sortMethod)) {
      return 'groupAsc';
    }
    if (isDescSort(sortParam?.sortMethod)) {
      return 'groupDesc';
    }
  }
  if (isSortCell) {
    return 'SortDown';
  }
};