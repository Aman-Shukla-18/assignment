import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {normalize, vh, vw} from '../utils/Dimension';
import {updateData, uploadImage} from '../utils/firebaseServices';
import {addUserDetails, loader, logout} from '../redux/actions';
import SimpleToast from 'react-native-simple-toast';
import {getUserDetailById, setOnlineStatusById} from '../utils/apiCallers';
import colors from '../utils/colors';
import InputWithLable from '../components/InputWithLable';
import {IMAGES} from '../utils/images';
import ImagePicker from 'react-native-image-crop-picker';
import Button from '../components/Button';
import fonts from '../utils/fonts';
import {LoadingImage} from '../components/LoadingImage';
import {STRINGS} from '../utils/constants';

const Profile = () => {
  const userDetail = useSelector(state => state?.userDetail?.userDetails);
  const [registering, setRegistering] = useState(false);
  const [profilePic, setProfilePic] = useState(userDetail?.avatar);
  const [passError, setPassError] = useState('');
  const userNameRef = useRef();
  const passwordRef = useRef();
  const aboutRef = useRef();
  const dispatch = useDispatch();

  const onLogout = () => {
    setOnlineStatusById(userDetail.userId, false);
    dispatch(logout());
    SimpleToast.show('User Logged out');
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
  const onSave = async () => {
    if (passValidation(passwordRef?.current?.getValue())) {
      const Data = {
        userName: userNameRef?.current?.getValue(),
        email: userDetail?.email,
        password: passwordRef?.current?.getValue(),
        avatar: profilePic,
        about: aboutRef?.current?.getValue(),
      };
      setRegistering(true);
      dispatch(loader(true));
      updateData(`/users/${userDetail.userId}`, Data, () => {
        getUserDetailById(userDetail.userId, d => {
          dispatch(
            addUserDetails({
              ...d,
              password: Data?.password,
            }),
          );
        });
        SimpleToast.show('Saved Succesfull');
        setRegistering(false);
        dispatch(loader(false));
      });
    }
  };
  const onEditProfilePicPress = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      compressImageQuality: 0.4,
    }).then(image => {
      const url =
        Platform.OS === 'android'
          ? image?.path?.replace('file://', '')
          : `${image?.path}`;
      console.log(image, url);
      uploadImage(url, `${userDetail?.userId}.jpeg`, url => {
        setProfilePic(url);
      });
    });
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.infoContainer}>
        <View>
          <LoadingImage
            source={{uri: profilePic}}
            imageStyle={styles.profilePic}
            containerStyle={styles.profilePicContainer}
          />
          <Pressable style={styles?.editBox} onPress={onEditProfilePicPress}>
            <Image source={IMAGES?.EDIT_PENCIL} style={styles?.editImg} />
          </Pressable>
        </View>
      </View>
      <Text style={styles.userName}>{userDetail?.userName}</Text>
      <View style={styles?.bottomContainer}>
        <InputWithLable
          ref={userNameRef}
          lable="User Name"
          value={userDetail?.userName}
          lableStyle={styles.lableStyle}
        />
        <InputWithLable
          lable="Email"
          value={userDetail?.email}
          editable={false}
          lableStyle={styles.lableStyle}
        />
        <InputWithLable
          ref={passwordRef}
          lable="Password"
          value={userDetail?.password}
          forPassword={true}
          lableStyle={styles.lableStyle}
          error={passError}
          setError={setPassError}
        />
        <InputWithLable
          ref={aboutRef}
          lable="About"
          value={userDetail?.about || ''}
          lableStyle={styles.lableStyle}
          multiline={true}
        />
      </View>
      <View style={styles?.btnContainer}>
        <Button
          title={'Save'}
          onPress={registering ? null : onSave}
          btnStyle={styles?.btnStyle}
        />
        <Button
          title={'Logout'}
          onPress={registering ? null : onLogout}
          btnStyle={styles?.btnStyle}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors?.MIRAGE,
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    height: vh(200),
    width: vh(200),
    borderRadius: vh(100),
    borderWidth: vw(5),
    backgroundColor: colors.EBONY_CLAY,
    borderColor: colors?.WHITE,
  },
  profilePicContainer: {
    marginTop: vh(50),
  },
  userName: {
    fontSize: vh(26),
    marginBottom: vh(30),
    alignSelf: 'center',
    fontFamily: fonts?.PoppinsBold,
    color: colors?.WHITE,
  },
  InputBoxHeadings: {
    fontSize: normalize(12),
    marginLeft: vw(5),
    color: colors?.WHITE,
  },
  lableStyle: {
    fontSize: normalize(14),
    fontFamily: fonts?.PoppinsMedium,
    color: colors?.WHITE,
  },
  btn: {
    flex: 1,
    margin: vh(10),
    padding: vh(10),
    borderRadius: vh(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors?.MAIN_GRAY,
  },
  editImg: {
    height: vh(15),
    width: vh(15),
  },
  editBox: {
    position: 'absolute',
    right: '5%',
    bottom: '5%',
    backgroundColor: colors?.WHITE,
    padding: vh(10),
    borderRadius: vh(20),
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: colors?.EBONY_CLAY,
    padding: vh(20),
    borderTopLeftRadius: vh(30),
    borderTopRightRadius: vh(30),
  },
  btnContainer: {
    flexDirection: 'row',
    backgroundColor: colors?.EBONY_CLAY,
    justifyContent: 'space-evenly',
    paddingBottom: vh(20),
  },
  btnStyle: {
    backgroundColor: colors?.MIRAGE,
  },
});
