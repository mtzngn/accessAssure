import React from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import ASText from '../../generic/ASText/ASText';

type Props = {
  serialNo: string;
  setSerialNo: (text: string) => void;
  addHub: () => void;
};

const AddHubForm = ({serialNo, setSerialNo, addHub}: Props) => {
  return (
    <View>
      <ASText style={styles.inputLabel}>Serial No:</ASText>
      <TextInput
        style={styles.hubInput}
        value={serialNo}
        onChangeText={text => setSerialNo(text)}
      />
      <TouchableOpacity style={styles.hubButton} onPress={addHub}>
        <ASText>Add Hub</ASText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default AddHubForm;
