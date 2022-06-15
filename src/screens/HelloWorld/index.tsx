import {useStore} from '@root/useStore';
import React from 'react';
import {Image, View, Text} from 'react-native';

interface HelloWorldProps {}

const HelloWorld: React.FC<HelloWorldProps> = props => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image source={require('@src/images/HelloWorld.png')} />
      <Text>{useStore().bears}</Text>
    </View>
  );
};

export default HelloWorld;
