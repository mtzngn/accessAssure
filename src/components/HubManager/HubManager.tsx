import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type HubStatus = 'NEW' | 'ACTIVE' | 'SUSPENDED';

interface Hub {
  serialNo: string;
  status: HubStatus;
  statusDate: string;
}

const HubManager: React.FC = () => {
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [serialNo, setSerialNo] = useState<string>('');
  const [status, setStatus] = useState<HubStatus>('NEW');

  const addHub = () => {
    const newHub: Hub = {
      serialNo: serialNo,
      status: status,
      statusDate: new Date().toISOString().slice(0, 10),
    };
    setHubs([...hubs, newHub]);
    setSerialNo('');
    setStatus('NEW');
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
      <Text style={styles.title}>Hub Manager</Text>
      <Text style={styles.inputLabel}>Serial No:</Text>
      <TextInput
        style={styles.hubInput}
        value={serialNo}
        onChangeText={text => setSerialNo(text)}
      />
      <Text style={styles.inputLabel}>Status:</Text>
      <TextInput
        style={styles.hubInput}
        value={status}
        onChangeText={text => setStatus(text as HubStatus)}
      />
      <TouchableOpacity style={styles.hubButton} onPress={addHub}>
        <Text>Add Hub</Text>
      </TouchableOpacity>
      <FlatList
        data={hubs}
        keyExtractor={item => item.serialNo}
        renderItem={({item}) => (
          <View
            style={[
              styles.hubItem,
              item.status === 'SUSPENDED' && styles.suspendedHubItem,
              item.status === 'ACTIVE' && styles.activeHubItem,
            ]}>
            <Text style={styles.hubSerialNo}>Serial No: {item.serialNo}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Status Date: {item.statusDate}</Text>
            <TouchableOpacity
              style={[styles.hubButton, styles.activateButon]}
              onPress={() => activateHub(item.serialNo)}
              disabled={item.status === 'ACTIVE'}>
              <Text>Activate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.hubButton, styles.suspendButton]}
              onPress={() => suspendHub(item.serialNo)}
              disabled={item.status === 'SUSPENDED'}>
              <Text>Suspend</Text>
            </TouchableOpacity>
          </View>
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
  hubItem: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#222831',
    padding: 10,
    marginVertical: 5,
  },
  suspendedHubItem: {
    borderColor: '#F38181',
  },
  activeHubItem: {
    borderColor: '#00ADB5',
  },
  hubSerialNo: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hubInput: {
    borderWidth: 1,
    borderColor: '#00ADB5',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  inputLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  hubButton: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#00ADB5',
    display: 'flex',
    alignItems: 'center',
  },
  activateButon: {
    backgroundColor: '#00ADB5',
  },
  suspendButton: {
    backgroundColor: '#F38181',
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
});

export default HubManager;
