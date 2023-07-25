//Library imports
import React, {useState} from 'react';
import {
  View,
  Image,
  ViewStyle,
  ImageStyle,
  StyleSheet,
  ActivityIndicator,
  ImageSourcePropType,
} from 'react-native';
//Util imports
import colors from '../utils/colors';

interface Props {
  source: ImageSourcePropType;
  imageStyle?: ImageStyle;
  containerStyle?: ViewStyle;
}

export const LoadingImage = (props: Props) => {
  const {imageStyle = {}, containerStyle = {}} = props;
  const [isLoading, setIsLoading] = useState(true);

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
