import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {forwardRef, useState} from 'react';
import {normalize, vh, vw} from '../utils/Dimension';
import colors from '../utils/colors';
import {IMAGES} from '../utils/images';
import {useEffect} from 'react';

interface Props {
  value: string;
  placeholder?: string
  editable?: boolean;
  forPassword?: boolean;
  multiline?: boolean;
  label?: string;
  labelStyle?: TextStyle;
  error?: string;
  icon? : ImageSourcePropType
  onChangeText: (val: string) => void
  regex: RegExp ,
  mainContainerStyle?: ViewStyle
}

const InputWithLable = forwardRef((props: Props, ref) => {
  const {labelStyle = {}, editable = true, placeholder = '',mainContainerStyle = {}} = props;
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [error, setError] = useState(props.error || '');
  useEffect(() => {
    if (props?.error) {
      setError(props?.error);
    }
  }, [props?.error]);

  const onTogglePrivacy = () => {
    setIsPassVisible(p => !p);
  };

  return (
    <View style={[styles.mainContainer, mainContainerStyle]}>
      {props?.label && <Text style={[styles.InputBoxHeadings, labelStyle]}>{props?.label}</Text>}
      <View style={styles.textInputContainer}>
        {props?.icon && <Image source={props.icon} style = {styles.passShowHideBtn}  />}
        <TextInput
          style={styles.textInput}
          value={props?.value}
          editable={editable}
          secureTextEntry={props?.forPassword && !isPassVisible}
          onChangeText={(t) => {
            if(props?.regex){
              if(t == ''){
                props?.onChangeText(t) 
              }
              else {
                props.regex.test(t) && props?.onChangeText(t) 
              }
            }
            else {
              props?.onChangeText(t)}}
            }
          multiline={props?.multiline}
          placeholder={placeholder}
          placeholderTextColor={colors.GREY}
        />
        {props?.forPassword && (
          <Pressable onPress={onTogglePrivacy}>
            <Image
              source={
                isPassVisible
                  ? IMAGES?.SHOW
                  : IMAGES?.HIDDEN
              }
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
    fontWeight: 'bold'
  },
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    borderWidth: vw(1),
    padding: vh(10),
    alignItems: 'center',
  },
  passShowHideBtn: {
    height: vh(20),
    width: vh(20),
    tintColor: colors.BLUE,
    resizeMode: 'contain'
  },
  errorMsgTxt: {
    fontSize: normalize(10),
    color: colors.BLACK,
    marginLeft: vw(10),
    marginTop: vh(5),
  },
});
