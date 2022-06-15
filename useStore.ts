import AsyncStorage from '@react-native-async-storage/async-storage';
import {DEFAULT_ACCOUNT, DEFAULT_SETTING, useZustand} from '@src/types';
import {useTimeFormatter, useUUID} from '@src/utils';
import create from 'zustand';
import {devtools, persist} from 'zustand/middleware';

const useStore = create<useZustand>(
  devtools(
    persist(
      (set, get) => ({
        /** Zustand 默认 */
        bears: 0,
        increasePopulation: n => set(state => ({bears: state.bears + n})),
        removeAllBears: () => set({bears: 0}),
        /** 自定义 */
        account: DEFAULT_ACCOUNT,
        mergeAccount: account => set({account}),
        clearAccount: () => set({account: DEFAULT_ACCOUNT}),
        setting: DEFAULT_SETTING,
        mergeSetting: setting => set({setting}),
        clearSetting: () => set({setting: DEFAULT_SETTING}),
        logs: [],
        mergeLogs: log =>
          set(state => ({
            logs: [...state.logs].concat(
              Object.assign({}, log, {id: useUUID(), time: useTimeFormatter()}),
            ),
          })),
        clearLogs: () => set({logs: []}),
      }),
      {
        name: 'Cached useStorage',
        getStorage: () => AsyncStorage,
        /** 白名单 */
        partialize: state => ({
          bears: state.bears,
          account: state.account,
          logs: state.logs,
        }),
      },
    ),
    {anonymousActionType: 'useStore.action'},
  ),
);

export {useStore};
