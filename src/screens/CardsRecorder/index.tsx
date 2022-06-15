import {RouteProp} from '@react-navigation/native';
import {RootStacksParams, RootStacksProp} from '@root/Stacks';
import {useStore} from '@root/useStore';
import ToolBar from '@src/components/ToolBar';
import {useDip} from '@src/utils';
import React, {useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';

interface CardsRecorderProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'Debug'>;
}

const CardsRecorder: React.FC<CardsRecorderProps> = props => {
  const {route, navigation} = props;
  const [logs, bears, increasePopulation, mergeLogs] = useStore(state => [
    state.logs,
    state.bears,
    state.increasePopulation,
    state.mergeLogs,
  ]);

  const [r, setR] = useState(0);
  const allCardsQuantity = [
    {name: ['D', 'X'], value: 6},
    {name: '4567890JQKA'.split('').reverse(), value: 24},
    {name: '3', value: 6},
  ];
  const people = ['对门', '上联', '上家', '自己', '下家', '下联'];
  // 所有的牌
  const [datas, setDatas] = useState([]);
  // 出牌的记录
  const [records, setRecords] = useState([]);

  useEffect(() => {
    let array = [];
    for (let i = 0; i < allCardsQuantity.length; i++) {
      let item = allCardsQuantity[i];
      for (let j = 0; j < item.name.length; j++) {
        let it = item.name[j];
        array.push({name: it, value: item.value});
      }
    }
    console.log({AllCardsQuantity: array});
    setDatas(array);
    setRecords([]);
    return function () {};
  }, [r]);

  const mergeDatas = (name: string, currentCards: string) => {
    let _datas = [...datas];
    for (let i = 0; i < currentCards.length; i++) {
      let index = _datas.findIndex(
        (item, index) => item.name == currentCards[i],
      );
      _datas[index].value--;
    }
    setDatas(_datas);
    let _records = [...records];
    setRecords(_records.concat({name, value: currentCards}));
  };

  const loadPersonRecords = () => {
    let views = [];
    for (let i = 0; i < people.length; i++) {
      let it = people[i];
      let cards = records.filter((item, index) => item.name == it);
      views.push(
        <View style={{marginVertical: 4}} key={i}>
          <View style={styles.viewRecordsHeader}>
            <Text
              style={{
                fontSize: useDip(18),
                fontWeight: 'bold',
                color: i % 2 == 0 ? '#FC4E61' : '#21c529',
              }}>
              {it}
            </Text>
            <Text
              style={{
                fontSize: useDip(14),
                color: '#666',
              }}>{`剩余: ${
              50 -
              cards.reduce(
                (result, item, index, cards) => result + item.value.length,
                0,
              )
            }张`}</Text>
          </View>
          <View style={{height: 4}} />
          <View style={styles.viewRecordsPersonCards}>
            {cards.map((item, index) => (
              <Text key={index} style={{fontSize: useDip(16), margin: 2}}>
                {item.value}
              </Text>
            ))}
          </View>
        </View>,
      );
    }
    return views;
  };

  return (
    <>
      <ToolBar
        onBackPress={() => {
          navigation.goBack();
        }}
        title="测试页面"
      />
      <ScrollView style={{padding: 12}}>
        <Text style={{fontSize: useDip(20), color: '#333', fontWeight: 'bold'}}>
          剩余的牌
        </Text>
        <View style={{height: 12}} />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row'}}>
            {datas.map((it, i) => (
              <View
                style={{
                  alignItems: 'center',
                  width: ['D', 'X'].includes(it.name) ? 48 : 32,
                }}
                key={i}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: useDip(18),
                      color: {D: '#ff5252', X: '#987123'}?.[it.name] ?? '#333',
                      fontWeight: 'bold',
                    }}>
                    {{D: '大虎', X: '小虎'}?.[it.name] ?? it.name}
                  </Text>
                  <View style={{height: 4}} />
                  <Text style={{fontSize: useDip(16), color: '#666'}}>
                    {it.value}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={{height: 12}} />
        <Text style={{fontSize: useDip(20), color: '#333', fontWeight: 'bold'}}>
          出牌记录
        </Text>
        <View style={{height: 10}} />
        {loadPersonRecords()}
        <Button
          title="记牌"
          onPress={() => {
            let length = Math.floor(Math.random() * 9 + 1);
            let cards = '4567890JQKA';
            let name = people[Math.floor(people.length * Math.random())];
            let card = cards[Math.floor(Math.random() * cards.length)];
            mergeDatas(name, Array.from({length}, (it, i) => card).join(''));
          }}
        />
        <Button
          title="重置"
          onPress={() => {
            setR(Math.random());
          }}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  viewRecordsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewRecordsPersonCards: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
export default CardsRecorder;
