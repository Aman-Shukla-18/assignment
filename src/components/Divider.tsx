//Library imports
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
//Util imports
import colors from '../utils/colors';
import {vh} from '../utils/Dimension';

type Props = {
  style?: ViewStyle;
};

const Divider = (props: Props) => {
  const {style = {}} = props;
  return <View style={[styles.divider, style]} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    backgroundColor: colors.GREY,
    height: vh(1),
    width: '100%',
    marginVertical: vh(10),
  },
});
