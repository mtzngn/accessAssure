import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ASText from '../../generic/ASText/ASText';
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
      <ASText style={styles.title}>Hub Manager</ASText>
      <ASText style={styles.inputLabel}>Serial No:</ASText>
      <TextInput
        style={styles.hubInput}
        value={serialNo}
        onChangeText={text => setSerialNo(text)}
      />
      <ASText style={styles.inputLabel}>Status:</ASText>
      <TextInput
        style={styles.hubInput}
        value={status}
        onChangeText={text => setStatus(text as HubStatus)}
      />
      <TouchableOpacity style={styles.hubButton} onPress={addHub}>
        <ASText>Add Hub</ASText>
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
            <ASText style={styles.hubSerialNo}>
              Serial No: {item.serialNo}
            </ASText>
            <ASText>Status: {item.status}</ASText>
            <ASText>Status Date: {item.statusDate}</ASText>
            <TouchableOpacity
              style={[styles.hubButton, styles.activateButon]}
              onPress={() => activateHub(item.serialNo)}
              disabled={item.status === 'ACTIVE'}>
              <ASText>Activate</ASText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.hubButton, styles.suspendButton]}
              onPress={() => suspendHub(item.serialNo)}
              disabled={item.status === 'SUSPENDED'}>
              <ASText>Suspend</ASText>
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
