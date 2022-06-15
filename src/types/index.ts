import {JSXElementConstructor, ReactElement} from 'react';
import {ImageRequireSource} from 'react-native';

/** TYPES */
export interface Account {
  id: string;
}

export interface Setting {
  theme: string;
}

export interface Log {
  id?: string;
  title: string;
  message: string;
  time?: string;
}

/** BottomTabBarProps */
export type BottomTabItem = {
  name: string;
  screen: any;
  icon: ImageRequireSource;
};

/** `FlatList` 源码 `ReactNode` 类型 */
export type AnyView = ReactElement<any, string | JSXElementConstructor<any>>;

export interface useZustand {
  /** Zustand 默认 */
  bears: number;
  increasePopulation: (n: number) => void;
  removeAllBears: () => void;
  /** 自定义 */
  account: Account;
  mergeAccount: (account: Account) => void;
  clearAccount: () => void;
  setting: Setting;
  mergeSetting: (setting: Setting) => void;
  clearSetting: () => void;
  /** 日志 */
  logs: Log[];
  mergeLogs: (log: Log) => void;
  clearLogs: () => void;
}

/** DEFAULT_DATAS */
export const DEFAULT_ACCOUNT: Account = {
  id: '',
};

export const DEFAULT_SETTING: Setting = {
  theme: '#987123',
};
