import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import uuid from 'react-native-uuid';
import Toast from 'react-native-simple-toast';
import {vh, vw, normalize} from '../utils/Dimension';
import {setData} from '../utils/firebaseServices';
import {useDispatch} from 'react-redux';
import {loader} from '../redux/actions';
import screenNames from '../utils/screenNames';
import colors from '../utils/colors';
import InputWithLable from '../components/InputWithLable';
import fonts from '../utils/fonts';
import Button from '../components/Button';
import {STRINGS} from '../utils/constants';

const Registrationscreen = props => {
  const [registering, setRegistering] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const emailValidation = email => {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (reg.test(email)) {
      setEmailError('');
      return true;
    } else {
      setEmailError(STRINGS.EMAIL_ERROR);
      return false;
    }
  };
  const passValidation = pass => {
    if (pass.length >= 3 && pass.length <= 8) {
      setPassError('');
      return true;
    } else {
      setPassError(STRINGS.PASSWORD_ERROR);
      return false;
    }
  };

  const onRegister = async () => {
    if (
      emailValidation(emailRef?.current?.getValue()) &&
      passValidation(passwordRef?.current?.getValue())
    ) {
      const Data = {
        userId: uuid.v4(),
        userName: userNameRef?.current?.getValue(),
        email: emailRef?.current?.getValue(),
        password: passwordRef?.current?.getValue(),
        about: `Hey i'm ${userNameRef?.current?.getValue()}, Message me if you want to chat`,
        avatar:
          'https://icon-library.com/images/user-icon-png-transparent/user-icon-png-transparent-6.jpg',
      };
      setRegistering(true);
      dispatch(loader(true));
      setData(`/users/${Data.userId}`, Data, () => {
        dispatch(loader(false));
        Toast.show('Registration Succesfull');
        setRegistering(false);
        props?.navigation?.navigate(screenNames.LOGIN);
      });
    }
  };
  const onLoginPress = () => {
    props.navigation.navigate(screenNames.LOGIN);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.circle} />
      <Text style={styles.registrationText}>Create Account</Text>
      <View style={{marginTop: vh(50), width: vw(250)}}>
        <InputWithLable
          ref={userNameRef}
          lable="User Name"
          value={''}
          forPassword={false}
          lableStyle={styles.lableStyle}
        />
        <InputWithLable
          ref={emailRef}
          lable="Email"
          value={''}
          forPassword={false}
          lableStyle={styles.lableStyle}
          error={emailError}
        />
        <InputWithLable
          ref={passwordRef}
          lable="Password"
          value={''}
          forPassword={true}
          lableStyle={styles.lableStyle}
          error={passError}
        />
        <Button
          title={'Register'}
          onPress={registering ? null : onRegister}
          btnStyle={styles?.btn}
        />
      </View>
      <Text style={styles.InputBoxHeadings}>
        Already registered?{' '}
        <Text onPress={onLoginPress} style={styles.loginBtn}>
          Login
        </Text>
      </Text>
    </View>
  );
};

export default Registrationscreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors?.MIRAGE,
    alignItems: 'center',
    paddingTop: vh(250),
  },
  circle: {
    height: vh(600),
    width: vw(350),
    borderBottomLeftRadius: vh(230),
    borderBottomRightRadius: vh(300),
    left: vw(-50),
    top: vh(-400),
    position: 'absolute',
    backgroundColor: colors?.EBONY_CLAY,
  },
  registrationText: {
    color: colors?.WHITE,
    fontSize: normalize(35),
    fontFamily: fonts?.PoppinsExtraBold,
    letterSpacing: 1.4,
  },
  lableStyle: {
    fontFamily: fonts?.PoppinsRegular,
    fontSize: normalize(14),
    color: colors?.WHITE,
  },
  InputBoxHeadings: {
    fontSize: normalize(12),
    fontFamily: fonts?.PoppinsRegular,
    color: colors?.WHITE,
  },
  btn: {
    marginTop: vh(50),
    marginBottom: vh(20),
  },
  loginBtn: {
    color: colors?.WHITE,
    fontFamily: fonts?.PoppinsBold,
  },
});
