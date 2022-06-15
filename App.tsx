import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTab from '@src/components/BottomTab';
import Debug from '@src/screens/Debug';
import {useDip} from '@src/utils';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {RootStacksProp} from './Stacks';

const Tab = createBottomTabNavigator();
interface AppProps {
  navigation: RootStacksProp;
}

const tabs = [
  {
    name: '首页',
    screen: Debug,
    icon: require('@src/images/menu_global.png'),
  },
  {
    name: '社区',
    screen: Debug,
    icon: require('@src/images/menu_message.png'),
  },
  {
    name: '书屋',
    screen: Debug,
    icon: require('@src/images/menu_book.png'),
  },
  {
    name: '视频',
    screen: Debug,
    icon: require('@src/images/menu_player.png'),
  },
  {
    name: '我的',
    screen: Debug,
    icon: require('@src/images/menu_i.png'),
  },
];

const App: React.FC<AppProps> = props => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {Array.from(tabs, (_, i) => (
          <Tab.Screen
            key={i}
            name={tabs[i].name}
            component={tabs[i].screen}
            options={{
              tabBarLabel: tabs[i].name,
              tabBarBadge: Math.ceil(100 * Math.random()),
              tabBarButton: bottomTabBarButtonProps => (
                <BottomTab
                  {...bottomTabBarButtonProps}
                  item={_}
                  activeColor={'#987123'}
                  index={i}
                />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  viewTabBarStyle: {
    height: useDip(56),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 12,
  },
});

export default App;
