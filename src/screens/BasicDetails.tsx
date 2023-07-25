//Library imports
import {
  Text,
  View,
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ImageSourcePropType,
} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
//Component imports
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';
import {LoadingImage} from '../components/LoadingImage';
import InputWithLable from '../components/InputWithLable';

//Util imports
import colors from '../utils/colors';
import {IMAGES} from '../utils/images';
import screenNames from '../utils/screenNames';
import {MainStackParams} from '../utils/types';
import {normalize, vh, vw} from '../utils/Dimension';

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
  const [profilePhoto, setProfilePhoto] = useState<ImageSourcePropType>(
    IMAGES.PROFILE,
  );
  const onPressNext = () => {
    setLoadingData(true);
    setTimeout(() => {
      props.navigation.navigate(screenNames.PROFESSIONAL_INFO);
      setLoadingData(false);
    }, 500);
  };
  const onEditProfilePicPress = () => {
    const config = {
      width: 400,
      height: 400,
      cropping: true,
      compressImageQuality: 0.4,
    };
    const cb = image => {
      const url =
        Platform.OS === 'android'
          ? image?.path?.replace('file://', '')
          : `${image?.path}`;
      console.log(image, url)
      setProfilePhoto({uri: url});
    };
    Alert.alert('Upload your profile picture from?', '', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Camera',
        onPress: () => {
          ImagePicker.openCamera(config).then(cb);
        },
      },
      {
        text: 'Library',
        onPress: () => {
          ImagePicker.openPicker(config).then(cb);
        },
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Pressable
          style={styles.profileContainer}
          onPress={onEditProfilePicPress}>
          <LoadingImage
            source={profilePhoto}
            imageStyle={styles.profileImage}
            containerStyle={styles.profileImageInnerContainer}
          />
          <View style={styles.editContainer}>
            <Image source={IMAGES.PEN} style={styles.editIcon} />
          </View>
        </Pressable>
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
          regex={
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          }
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
    marginBottom: vh(20),
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
  profileContainer: {
    height: vh(100),
    width: vh(100),
    borderWidth: vw(1),
    borderRadius: vh(50),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  profileImage: {
    height: vh(100),
    width: vh(100),
  },
  editContainer: {
    height: vh(30),
    width: vh(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: vw(1),
    borderRadius: vh(30),
    position: 'absolute',
    right: -vh(12),
    backgroundColor: colors.WHITE,
  },
  editIcon: {
    height: vh(16),
    width: vh(16),
  },
  profileImageInnerContainer: {
    overflow: 'hidden',
    height: vh(100),
    width: vh(100),
    borderRadius: vh(50),
  },
});
