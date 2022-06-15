import React, {useEffect} from 'react';
import {AppRegistry, StatusBar, View} from 'react-native';
import createContext from 'zustand/context';
// @ts-ignore
import {name as appName} from './app.json';
import Stacks from './Stacks';
import {useStore} from './useStore';
import RNFS from 'react-native-fs';
import moment from 'moment';
import {useMomentChinaConfig} from '@src/utils';
import {useHttp} from '@src/hooks';

const StoreContext = createContext();

interface DuoleCalculatorProps {}

const DuoleCalculator: React.FC<DuoleCalculatorProps> = props => {
  useEffect(() => {
    console.log({DocumentPath: RNFS.DocumentDirectoryPath});
    // @ts-ignore
    moment.locale('zh-cn', useMomentChinaConfig);
    return function () {};
  }, [props]);

  return (
    <StoreContext.Provider createStore={() => useStore}>
      <View style={{flex: 1}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={'transparent'}
        />
        <Stacks />
        {/* <View style={{height: useHomeIndicatorHeight()}} /> */}
      </View>
    </StoreContext.Provider>
  );
};

AppRegistry.registerComponent(appName, () => DuoleCalculator);
