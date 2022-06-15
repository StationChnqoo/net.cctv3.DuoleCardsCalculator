import {Log} from '@src/types';
import {useSortedByTime} from '@src/utils';
import moment from 'moment';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

interface LogsProps {
  logs: Log[];
}

const Logs: React.FC<LogsProps> = props => {
  const {logs} = props;
  return (
    <FlatList
      data={useSortedByTime(logs)}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => item.id}
      renderItem={({item}) => (
        <View style={{padding: 12, borderRadius: 8, backgroundColor: 'white'}}>
          <View style={styles.viewHeader}>
            <Text style={{fontSize: 16, fontWeight: 'bold', flex: 1}}>
              {item.id.slice(0, 16)}...
            </Text>
            <Text style={{fontSize: 14, color: '#666'}}>
              {moment(item.time).fromNow()}
            </Text>
          </View>
          <View style={{height: 8}} />
          <Text
            style={{
              fontSize: 14,
              color: '#333',
            }}>{`Title: ${item.title}`}</Text>
          <View style={{height: 4}} />
          <Text
            style={{
              fontSize: 14,
              color: '#666',
            }}>{`Message: ${item.message}`}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{height: 12}} />}
    />
  );
};

const styles = StyleSheet.create({
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default Logs;
