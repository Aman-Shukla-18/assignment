import React, {useState} from 'react';
import {View, Image, StyleSheet, ActivityIndicator, ViewStyle, ImageStyle, ImageSourcePropType} from 'react-native';
import colors from '../utils/colors';


interface Props {
  source: ImageSourcePropType
  imageStyle?:ImageStyle ,
  containerStyle?: ViewStyle
}

export const LoadingImage = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const {imageStyle = {}, containerStyle = {}} = props
  return (
    <View style={containerStyle}>
      <Image
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        source={props?.source}
        style={imageStyle}
      />
      {isLoading && (
        <ActivityIndicator
          size={'small'}
          animating={isLoading}
          color={colors.WHITE}
          style={styles.activity}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
