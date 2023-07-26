//Library imports
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TextStyle,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import React, {forwardRef, useState} from 'react';
//Util imports
import colors from '../utils/colors';
import {IMAGES} from '../utils/images';
import {normalize, vh, vw} from '../utils/Dimension';

interface Props {
  id: string;
  value: string;
  placeholder?: string;
  editable?: boolean;
  forPassword?: boolean;
  multiline?: boolean;
  label?: string;
  labelStyle?: TextStyle;
  error?: string;
  icon?: ImageSourcePropType;
  onChangeText: (val: string) => void;
  regex: RegExp;
  mainContainerStyle?: ViewStyle;
  hasError?: (val: object) => void;
}

const InputWithLable = forwardRef((props: Props, ref) => {
  const {
    labelStyle = {},
    editable = true,
    placeholder = '',
    mainContainerStyle = {},
    hasError = () => {},
  } = props;
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [error, setError] = useState('');

  const onTogglePrivacy = () => {
    setIsPassVisible(p => !p);
  };

  return (
    <View style={[styles.mainContainer, mainContainerStyle]}>
      {props?.label && (
        <Text style={[styles.InputBoxHeadings, labelStyle]}>
          {props?.label}
        </Text>
      )}
      <View style={styles.textInputContainer}>
        {props?.icon && (
          <Image source={props.icon} style={styles.icon} />
        )}
        <TextInput
          style={styles.textInput}
          value={props?.value}
          editable={editable}
          secureTextEntry={props?.forPassword && !isPassVisible}
          onChangeText={t => {
            if (props?.regex) {
              props?.onChangeText(t);
              if (props.regex.test(t)) {
                let tempObj = {};
                tempObj[props?.id] = false;
                setError('');
                hasError(tempObj);
              } else {
                let tempObj = {};
                tempObj[props?.id] = true;
                setError(props.error);
                hasError(tempObj);
              }
            } else {
              props?.onChangeText(t);
            }
          }}
          multiline={props?.multiline}
          placeholder={placeholder}
          placeholderTextColor={colors.GREY}
        />
        {props?.forPassword && (
          <Pressable onPress={onTogglePrivacy}>
            <Image
              source={isPassVisible ? IMAGES?.SHOW : IMAGES?.HIDDEN}
              style={styles.passShowHideBtn}
            />
          </Pressable>
        )}
      </View>
      {error !== '' && <Text style={styles.errorMsgTxt}>{error}</Text>}
    </View>
  );
});

export default InputWithLable;

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: vh(20),
  },
  textInput: {
    flex: 1,
    paddingHorizontal: vw(0),
    paddingVertical: vh(5),
    fontSize: normalize(16),
    color: colors.BLACK,
    marginLeft: vw(16),
  },
  InputBoxHeadings: {
    fontSize: normalize(14),
    color: colors.BLACK,
    marginBottom: vh(5),
    fontWeight: 'bold',
  },
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    borderWidth: vw(1),
    paddingVertical: vh(10),
    paddingRight: vw(16),
    alignItems: 'center',
  },
  icon: {
    height: vh(20),
    width: vh(20),
    tintColor: colors.BLUE,
    resizeMode: 'contain',
    marginLeft: vw(16)
  },
  passShowHideBtn: {
    height: vh(26),
    width: vh(26),
    tintColor: colors.BLUE,
    resizeMode: 'contain',
  },
  errorMsgTxt: {
    fontSize: normalize(10),
    color: colors.RED,
    marginLeft: vw(10),
    marginTop: vh(5),
  },
});
