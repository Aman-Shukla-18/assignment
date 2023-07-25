//Library imports
import {
  View,
  Alert,

  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//Component imports
import Button from '../components/Button';
import InputWithLable from '../components/InputWithLable';

//Util imports
import colors from '../utils/colors';
import {IMAGES} from '../utils/images';
import {MainStackParams} from '../utils/types';
import {normalize, vh, vw} from '../utils/Dimension';
import {REGEX, STRINGS, stateOptions} from '../utils/constants';

type Props = {
  navigation: NativeStackNavigationProp<MainStackParams>;
};

const AddressInfo = (props: Props) => {
  const [errors, setErrors] = useState({});
  const [city, setCity] = useState<string>('');
  const [pinCode, setPinCode] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [landmark, setLandmark] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [loadingData, setLoadingData] = useState<boolean>(false);

  const onPressSubmit = () => {
    setLoadingData(true);
    setTimeout(() => {
      Alert.alert('Your Data saved successfully.');
      console.log({
       address, landmark, city, selectedState, pinCode
      })
      setLoadingData(false);
    }, 500);
  };

  const hasError = () => Object.values(errors).includes(true);

  const handleHasError = (val: object) => {
    setErrors({...errors, ...val});
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <InputWithLable
          value={address}
          placeholder="Address"
          onChangeText={setAddress}
          icon={IMAGES.BUILDING}
          mainContainerStyle={styles.inputContainer}
          regex={REGEX.moreThanThreeChar}
          error={STRINGS.address}
          hasError={handleHasError}
        />
        <InputWithLable
          value={landmark}
          placeholder="Landmark"
          onChangeText={setLandmark}
          icon={IMAGES.BUILDING}
          mainContainerStyle={styles.inputContainer}
          regex={REGEX.moreThanThreeChar}
          error={STRINGS.landmark}
          hasError={handleHasError}
        />
        <InputWithLable
          value={city}
          placeholder="City"
          onChangeText={setCity}
          icon={IMAGES.BUILDING}
          mainContainerStyle={styles.inputContainer}
          regex={REGEX.onlyCharacter}
          error={STRINGS.city}
        />
        <View style={styles.ddContainer}>
          <Dropdown
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={stateOptions}
            maxHeight={vh(240)}
            labelField="label"
            valueField="value"
            placeholder={'Select your state'}
            onChange={item => {
              setSelectedState(item.value);
            }}
            renderRightIcon={() => (
              <Image source={IMAGES.ARROW_DOWN} style={styles.dropIcon} />
            )}
          />
        </View>
        <InputWithLable
          value={pinCode}
          placeholder="Pin Code"
          onChangeText={setPinCode}
          icon={IMAGES.BUILDING}
          regex={REGEX.pinCode}
          error={STRINGS.pinCode}
        />

        <Button
          title="Submit"
          onPress={onPressSubmit}
          loading={loadingData}
          btnStyle={styles.btnContainer}
          disabled = {
            hasError() ||
            !(
              address &&
              landmark &&
              selectedState
            )
          }
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddressInfo;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingTop: vh(30),
    paddingHorizontal: vw(26),
  },
  sectionHeading: {
    fontSize: normalize(18),
    color: colors.BLACK,
    fontWeight: 'bold',
    marginBottom: vh(10),
  },
  btnContainer: {
    width: 'auto',
    flex: 1,
  },
  outlinedBtn: {
    backgroundColor: colors.WHITE,
    borderWidth: vw(2),
    borderColor: colors.BLUE,
  },
  btnTitleStyle: {
    color: colors.BLUE,
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
  ddContainer: {
    borderWidth: vw(1),
    padding: vh(10),
    marginBottom: vh(10),
  },
  InputBoxHeadings: {
    fontSize: normalize(14),
    color: colors.BLACK,
    marginBottom: vh(5),
    fontWeight: 'bold',
  },
  btnParentContainer: {
    marginBottom: vh(20),
  },
  inputContainer: {
    marginBottom: vh(10),
  },
  dropIcon: {
    height: vw(20),
    width: vw(20),
    resizeMode: 'contain'
  },
  placeholderStyle: {
    fontSize: normalize(16),
    color: colors.GREY,
    marginLeft: vw(10)
  },
  selectedTextStyle: {
    fontSize: normalize(16),
    marginLeft: vw(10)
  },
});
