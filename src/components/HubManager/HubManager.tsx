import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Alert} from 'react-native';
import ASText from '../../generic/ASText/ASText';
import HubItem from '../HubItem/HubItem';
import AddHubForm from '../AddHubForm/AddHubForm';

type HubStatus = 'NEW' | 'ACTIVE' | 'SUSPENDED';

interface Hub {
  serialNo: string;
  status: HubStatus;
  statusDate: string;
}

const HubManager: React.FC = () => {
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [serialNo, setSerialNo] = useState<string>('');

  const addHub = () => {
    // Check if serialNo already exists in the array.
    const isDuplicateSerialNo = hubs.some(hub => hub.serialNo === serialNo);

    if (isDuplicateSerialNo) {
      Alert.alert('Error', 'A hub with this serial number already exists.');
      return;
    }

    // Check if serialNo is entered.
    if (serialNo.length == 0) {
      Alert.alert('Error', 'Please enter the serial number.');
      return;
    }
    const newHub: Hub = {
      serialNo: serialNo,
      status: 'NEW',
      statusDate: new Date().toISOString().slice(0, 10),
    };
    setHubs([...hubs, newHub]);
    setSerialNo('');
  };

  const activateHub = (serialNo: string) => {
    const updatedHubs: Hub[] = hubs.map(hub =>
      hub.serialNo === serialNo
        ? {
            ...hub,
            status: 'ACTIVE',
            statusDate: new Date().toISOString().slice(0, 10),
          }
        : hub,
    );
    setHubs(updatedHubs);
  };

  const suspendHub = (serialNo: string) => {
    const updatedHubs: Hub[] = hubs.map(hub =>
      hub.serialNo === serialNo
        ? {
            ...hub,
            status: 'SUSPENDED',
            statusDate: new Date().toISOString().slice(0, 10),
          }
        : hub,
    );
    setHubs(updatedHubs);
  };

  return (
    <View style={styles.hubManagerContainer}>
      <ASText style={styles.title}>Hub Manager</ASText>
      <AddHubForm
        serialNo={serialNo}
        setSerialNo={setSerialNo}
        addHub={addHub}
      />
      <FlatList
        data={hubs}
        keyExtractor={item => item.serialNo}
        renderItem={({item}) => (
          <HubItem
            hub={item}
            activateHub={activateHub}
            suspendHub={suspendHub}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  hubManagerContainer: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
});

export default HubManager;
