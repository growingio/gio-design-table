import { i18n as s2I18n, TooltipOperatorMenu } from "@antv/s2";

export type i18nFunc = typeof s2I18n;
export const getSortMenus: (i18n: i18nFunc) => TooltipOperatorMenu[] = (i18n) => [
  {
    key: 'asc',
    icon: 'groupAsc',
    text: i18n('组内升序'),
  },
  {
    key: 'desc',
    icon: 'groupDesc',
    text: i18n('组内降序'),
  },
  {
    key: 'none',
    text: i18n('不排序'),
  },
];


export const getTableSortMenus: (i18n: i18nFunc) => TooltipOperatorMenu[] = (i18n) =>
  [
    {
      key: 'asc',
      icon: 'groupAsc',
      text: i18n('升序'),
    },
    {
      key: 'desc',
      icon: 'groupDesc',
      text: i18n('降序'),
    },
    {
      key: 'none',
      text: i18n('不排序'),
    },
  ];