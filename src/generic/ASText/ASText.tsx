import React, {ReactNode} from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';

type Props = {
  children: ReactNode;
  style?: TextStyle;
};
// This is a generic text component, any desired global styling to texts can be applied in here.
const ASText = ({children, style}: Props) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '400',
    fontSize: 13,
  },
});

export default ASText;
