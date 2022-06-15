import {useStore} from '@root/useStore';
import {AnyView} from '@src/types';
import {useDip, useStatusBarHeight} from '@src/utils';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface ToolBarProps {
  title: string;
  onBackPress: () => void;
  moreView?: AnyView;
}

const ToolBar: React.FC<ToolBarProps> = props => {
  const {title, onBackPress, moreView} = props;
  const [bears, increasePopulation, setting] = useStore(state => [
    state.bears,
    state.increasePopulation,
    state.setting,
  ]);
  
  return (
    <>
      <View
        style={{
          height: useStatusBarHeight(true, true),
          backgroundColor: 'white',
        }}
      />
      <View style={styles.viewContainer}>
        <TouchableOpacity onPress={onBackPress} activeOpacity={0.88}>
          <Image
            source={require('@src/images/common_back.png')}
            style={styles.viewBack}
          />
        </TouchableOpacity>
        <Text style={{fontSize: useDip(18), color: '#333', fontWeight: '500'}}>
          {title}
        </Text>
        {moreView ?? <View style={styles.viewBack} />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  viewBack: {
    height: useDip(18),
    width: useDip(18),
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    height: useDip(40),
    paddingHorizontal: 16,
  },
});

export default ToolBar;
