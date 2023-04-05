import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

type HubStatus = 'NEW' | 'ACTIVE' | 'SUSPENDED';

interface Hub {
  serialNo: string;
  status: HubStatus;
  statusDate: string;
}

const HubManager: React.FC = () => {
  const [hubs, setHubs] = useState<Hub[]>([
    {serialNo: '123', status: 'NEW', statusDate: '01.01.20'},
    {serialNo: '1234', status: 'NEW', statusDate: '01.01.20'},
    {serialNo: '1235', status: 'NEW', statusDate: '01.01.20'},
    {serialNo: 'asdf', status: 'NEW', statusDate: '01.01.20'},
    {serialNo: 'sdffsad', status: 'NEW', statusDate: '01.01.20'},
    {serialNo: 'sdf', status: 'NEW', statusDate: '01.01.20'},
    {serialNo: 'sadfasd', status: 'NEW', statusDate: '01.01.20'},
  ]);

  return (
    <View>
      <Text>Hub Manager</Text>
      <FlatList
        data={hubs}
        keyExtractor={item => item.serialNo}
        renderItem={({item}) => (
          <View style={styles.hubItem}>
            <Text style={styles.hubSerialNo}>Serial No: {item.serialNo}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Status Date: {item.statusDate}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  hubItem: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'lightblue',
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  hubSerialNo: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default HubManager;
