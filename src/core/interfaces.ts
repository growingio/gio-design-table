import { S2DataConfig, S2Options, ThemeCfg, Palette } from "@antv/s2";

export interface SortMeta {
  field: string,
  canSort: boolean
}

export interface ThemePalette extends Palette {
  bgConditionColors?: string[][]
}
export interface GioThemeConfig extends ThemeCfg {
  palette?: ThemePalette,
}
export type GioS2Options = S2Options
export interface GioS2DataConfig extends S2DataConfig {
  sortMeta?: SortMeta[]
}