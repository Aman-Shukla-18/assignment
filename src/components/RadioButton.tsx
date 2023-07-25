//Library imports
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
//Util imports
import {vw} from '../utils/Dimension';
import colors from '../utils/colors';

type Props = {
  initialValue: boolean;
  size: number;
  id: 'M' | 'F';
  getIsSelected: (val: 'M' | 'F') => 'Dispatch<SetStateAction<"M" | "F">>';
};

const RadioButton = (props: Props) => {
  const {initialValue = false, size} = props;

  const onPressRadio = () => {
    props.getIsSelected(props?.id);
  };
  
  return (
    <Pressable
      onPress={onPressRadio}
      style={[
        {
          height: size,
          width: size,
          borderRadius: size / 2,
        },
        styles.outerCircle,
      ]}>
      {initialValue && (
        <View
          style={[
            {
              height: size / 1.5,
              width: size / 1.5,
              borderRadius: size / 3,
            },
            styles.innerDot,
          ]}
        />
      )}
    </Pressable>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  outerCircle: {
    borderWidth: vw(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.BLUE,
  },
  innerDot: {
    backgroundColor: colors.BLUE,
  },
});
