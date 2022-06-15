import {useStore} from '@root/useStore';
import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';

interface HelloWorldProps {}

const HelloWorld: React.FC<HelloWorldProps> = props => {
  const [bears, increasePopulation, setting] = useStore(state => [
    state.bears,
    state.increasePopulation,
    state.setting,
  ]);

  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          increasePopulation(1);
        }}>
        <Image
          source={require('@src/images/HelloWorld.png')}
          style={{tintColor: setting.theme}}
        />
      </TouchableOpacity>
      <View style={{height: 12}} />
      <Text>{bears}</Text>
    </View>
  );
};

export default HelloWorld;
