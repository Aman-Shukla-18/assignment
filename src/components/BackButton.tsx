//Library imports
import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
//Util imports
import {IMAGES} from '../utils/images';
import {vh, vw} from '../utils/Dimension';

type Props = {
  navigation: any;
};

const BackButton = (props: Props) => {
  return (
    <Pressable style={styles.mainContainer} onPress={props.navigation.goBack}>
      <Image source={IMAGES.LEFT_ARROW} style={styles.icon} />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  mainContainer: {
    marginLeft: vw(14),
  },
  icon: {
    height: vh(24),
    width: vw(24),
    resizeMode: 'contain',
  },
});
