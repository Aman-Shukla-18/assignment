import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {normalize, vh, vw} from '../utils/Dimension';
import colors from '../utils/colors';
import {IMAGES} from '../utils/images';
import {useEffect} from 'react';

interface Props {
  value: string
  editable: boolean,
  forPassword: boolean,
  multiline: boolean,
  label: string,
  labelStyle:TextStyle ,
  error: string,

}

const InputWithLable = forwardRef((props: Props, ref) => {
  const {labelStyle = {}, editable = true} = props;
  const [value, setValue] = useState(props?.value);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [error, setError] = useState(props.error || '');
  useEffect(() => {
    setError(props?.error);
  }, [props?.error]);

  useImperativeHandle(ref, () => ({
    getValue: () => value,
  }));
  const onTogglePrivacy = () => {
    setIsPassVisible(p => !p);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.InputBoxHeadings, labelStyle]}>{props?.label}</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          value={value}
          editable={editable}
          secureTextEntry={props?.forPassword && !isPassVisible}
          onChangeText={setValue}
          multiline={props?.multiline}
        />
        {props?.forPassword && (
          <Pressable onPress={onTogglePrivacy}>
            <Image
              source={
                isPassVisible
                  ? IMAGES?.VISIBLE_PASS_IMG
                  : IMAGES?.HIDDEN_PASS_IMG
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
    minHeight: vh(80),
  },
  textInput: {
    flex: 1,
    paddingHorizontal: vw(0),
    paddingVertical: vh(5),
    fontSize: normalize(16),
    color: colors?.MIRAGE,
  },
  InputBoxHeadings: {
    fontSize: normalize(12),
    color: colors.MANATE,
    marginBottom: vh(5),
    marginLeft: vw(10),
  },
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    borderRadius: vh(20),
    paddingHorizontal: vh(10),
    alignItems: 'center',
  },
  passShowHideBtn: {
    height: vh(20),
    width: vw(20),
    tintColor: colors?.MIRAGE,
  },
  errorMsgTxt: {
    fontSize: normalize(10),
    color: colors.THUNDERBIRD,
    marginLeft: vw(10),
    marginTop: vh(5),
  },
});
