import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import ASText from '../../generic/ASText/ASText';

type Hub = {
  serialNo: string;
  status: string;
  statusDate: string;
};

type Props = {
  hub: Hub;
  activateHub: (serialNo: string) => void;
  suspendHub: (serialNo: string) => void;
};

const HubItem = ({hub, activateHub, suspendHub}: Props) => {
  const renderButtons = () => {
    return (
      <>
        <TouchableOpacity
          style={[styles.hubButton, styles.activateButon]}
          onPress={() => activateHub(hub.serialNo)}
          disabled={hub.status === 'ACTIVE'}>
          <ASText>Activate</ASText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.hubButton, styles.suspendButton]}
          onPress={() => suspendHub(hub.serialNo)}
          disabled={hub.status === 'SUSPENDED'}>
          <ASText>Suspend</ASText>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View
      style={[
        styles.hubItem,
        hub.status === 'SUSPENDED' && styles.suspendedHubItem,
        hub.status === 'ACTIVE' && styles.activeHubItem,
      ]}>
      <ASText style={styles.hubSerialNo}>Serial No: {hub.serialNo}</ASText>
      <ASText>Status: {hub.status}</ASText>
      <ASText>Status Date: {hub.statusDate}</ASText>
      {renderButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default HubItem;
