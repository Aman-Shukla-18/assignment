import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../utils/colors';
import {normalize, vh, vw} from '../utils/Dimension';
import Button from '../components/Button';
import screenNames from '../utils/screenNames';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParams} from '../utils/types';
import InputWithLable from '../components/InputWithLable';
import {IMAGES} from '../utils/images';
import RadioButton from '../components/RadioButton';

type Props = {
  navigation: NativeStackNavigationProp<MainStackParams>;
};

const BasicDetails = (props: Props) => {
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [fName, setFName] = useState<string>('');
  const [lName, setLName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const onPressNext = () => {
    setLoadingData(true);
    setTimeout(() => {
      props.navigation.navigate(screenNames.PROFESSIONAL_INFO);
      setLoadingData(false);
    }, 500);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView bounces = {false}>
        <InputWithLable
          label="First Name*"
          value={fName}
          placeholder="Enter your first name here"
          icon={IMAGES.USER}
          onChangeText={setFName}
          regex={/^[A-Za-z]+$/}
        />
        <InputWithLable
          label="Last Name*"
          value={lName}
          placeholder="Enter your last name here"
          icon={IMAGES.USER}
          onChangeText={setLName}
          regex={/^[A-Za-z]+$/}
        />
        <InputWithLable
          label="Phone Number*"
          value={phoneNumber}
          placeholder="Enter your 10 digit phone number"
          icon={IMAGES.CALL}
          onChangeText={setPhoneNumber}
          regex={/^[0-9]+$/}
        />

        <InputWithLable
          label="Email*"
          value={email}
          placeholder="Your email goes here"
          icon={IMAGES.EMAIL}
          onChangeText={setEmail}
          regex={ /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/}
        />
        <View style={styles.genderRow}>
          <View style={styles.radioRow}>
            <RadioButton
              size={vw(20)}
              id="M"
              initialValue={gender === 'M'}
              getIsSelected={setGender}
            />
            <Text style={styles.radioLabel}>Male</Text>
          </View>
          <View style={styles.radioRow}>
            <RadioButton
              size={vw(20)}
              id="F"
              initialValue={gender === 'F'}
              getIsSelected={setGender}
            />
            <Text style={styles.radioLabel}>Female</Text>
          </View>
        </View>
        <InputWithLable
          label="Password*"
          value={password}
          placeholder="Enter your first name here"
          icon={IMAGES.LOCK}
          onChangeText={setPassword}
          regex={/^[0-9]+$/}
          forPassword
        />

        <InputWithLable
          label="Confirm Password*"
          value={confirmPassword}
          placeholder="Enter your first name here"
          icon={IMAGES.LOCK}
          onChangeText={setConfirmPassword}
          regex={/^[0-9]+$/}
          forPassword
        />
        <Button
          title="Next"
          onPress={onPressNext}
          loading={loadingData}
          btnStyle={styles.btnContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BasicDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingTop: vh(30),
    paddingHorizontal: vw(26),
  },
  heading: {
    fontSize: normalize(22),
    color: colors.BLACK,
    fontWeight: 'bold',
    letterSpacing: vw(1),
  },
  btnContainer: {
    width: '100%',
  },
  radioRow: {
    flexDirection: 'row',
  },
  genderRow: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginBottom: vh(20),
  },
  radioLabel: {
    marginLeft: vw(10),
    fontSize: normalize(16),
  },
});
