//Library imports
import {
  Text,
  TextStyle,
  ViewStyle,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

//Util imports
import colors from '../utils/colors';
import {normalize, vh, vw} from '../utils/Dimension';

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  titleStyle?: TextStyle;
  btnStyle?: ViewStyle;
  outlined?: boolean;
}

const Button = (props: Props) => {
  const {
    title,
    onPress,
    disabled = false,
    loading = false,
    outlined = false,
    titleStyle,
    btnStyle,
  } = props;
  const [isDisabled, setIsDisabled] = useState(disabled);
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    setIsDisabled(disabled);
  }, [disabled]);
  
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);
  return (
    <Pressable
      style={[
        styles.btn,
        {
          backgroundColor: isDisabled ? `${colors?.BLUE}40` : colors?.BLUE,
        },
        btnStyle,
      ]}
      onPress={isLoading || isDisabled ? null : onPress}>
      {isLoading ? (
        <ActivityIndicator color={colors?.WHITE} size={'small'} />
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
    marginHorizontal: vh(5),
    borderRadius: vw(2),
    height: vh(50),
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: normalize(16),
    color: colors?.WHITE,
  },
});
