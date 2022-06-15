import {RouteProp} from '@react-navigation/native';
import {RootStacksParams, RootStacksProp} from '@root/Stacks';
import {useStore} from '@root/useStore';
import ToolBar from '@src/components/ToolBar';
import {useHttp} from '@src/hooks';
import {useUUID} from '@src/utils';
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Logs from './Logs';

interface DebugProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'Debug'>;
}

const Debug: React.FC<DebugProps> = props => {
  const {route, navigation} = props;
  const [logs, bears, increasePopulation, mergeLogs] = useStore(state => [
    state.logs,
    state.bears,
    state.increasePopulation,
    state.mergeLogs,
  ]);

  const [r, setR] = useState(0);

  const {loading, result} = useHttp({
    action: 'soul/selectSouls',
    body: {},
    method: 'GET',
    r: r,
  });

  return (
    <>
      <ToolBar
        onBackPress={() => {
          navigation.goBack();
        }}
        title="测试页面"
      />
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Loading ...</Text>
        </View>
      ) : (
        <View style={{paddingHorizontal: 12}}>
          <TouchableOpacity
            onPress={() => {
              increasePopulation(1);
              // console.log({useUUID: useUUID()});
              mergeLogs({title: 'useUUID', message: useUUID()});
              setR(Math.random());
            }}>
            <Image source={require('@src/images/HelloWorld.png')} />
          </TouchableOpacity>
          <View style={{height: 12}} />
          <Text>{`${route.params?.id} -> ${bears}`}</Text>
          <View style={{height: 12}} />
          <Text>{`Logs size: ${logs.length}`}</Text>
          <Logs logs={logs} />
        </View>
      )}
    </>
  );
};

export default Debug;
