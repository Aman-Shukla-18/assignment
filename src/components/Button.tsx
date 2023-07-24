import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../utils/colors';
import {normalize, vh, vw} from '../utils/Dimension';

interface Props {
  title: string
  onPress: () => void
  disabled: boolean,
  loading: boolean,
  titleStyle:TextStyle ,
  btnStyle: ViewStyle,
}

const Button = (props: Props) => {
  const {
    title,
    onPress,
    disabled = false,
    loading = false,
    titleStyle,
    btnStyle,
  } = props;
  useEffect(() => {
    setIsDisabled(disabled);
  }, [disabled]);
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);
  const [isDisabled, setIsDisabled] = useState(disabled);
  const [isLoading, setIsLoading] = useState(loading);
  return (
    <Pressable
      style={[
        styles.btn,
        {
          backgroundColor: isDisabled ? colors?.MANATE : colors?.EBONY_CLAY,
        },
        btnStyle,
      ]}
      onPress={isLoading ? null : onPress}>
      {isLoading ? (
        <ActivityIndicator color={colors?.MANATE} size={'small'} />
      ) : (
        <Text style={[styles.btnText, titleStyle]}>{title}</Text>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: vh(10),
    paddingHorizontal: vw(40),
    borderRadius: vh(8),
    margin: vh(5),
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: normalize(16),
    color: colors?.WHITE,
  },
});
