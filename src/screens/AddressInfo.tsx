import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import Divider from '../components/Divider';
import {Dropdown} from 'react-native-element-dropdown';
import {educationOptions, stateOptions} from '../utils/constants';

type Props = {
  navigation: NativeStackNavigationProp<MainStackParams>;
};

const AddressInfo = (props: Props) => {
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [landmark, setLandmark] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [pinCode, setPinCode] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');

  const onPressSubmit = () => {
    setLoadingData(true);
    setTimeout(() => {
      Alert.alert('Your Data saved successfully.');
      setLoadingData(false);
    }, 500);
  };

  const onPressPrevious = () => {
    props.navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <InputWithLable
          value={address}
          placeholder="Address"
          onChangeText={setAddress}
          regex={/^[0-9]+$/}
          icon={IMAGES.BUILDING}
          mainContainerStyle={styles.inputContainer}
        />
        <InputWithLable
          value={landmark}
          placeholder="Landmark"
          onChangeText={setLandmark}
          regex={/^[0-9]+$/}
          icon={IMAGES.BUILDING}
          mainContainerStyle={styles.inputContainer}
        />
        <InputWithLable
          value={city}
          placeholder="City"
          onChangeText={setCity}
          regex={/^[0-9]+$/}
          icon={IMAGES.BUILDING}
          mainContainerStyle={styles.inputContainer}
        />
        <View style={styles.ddContainer}>
          <Dropdown
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={stateOptions}
            maxHeight={vh(240)}
            labelField="label"
            valueField="value"
            placeholder={'Select your state'}
            onChange={item => {
              setSelectedState(item.value);
            }}
          />
        </View>
        <InputWithLable
          value={pinCode}
          placeholder="Pin Code"
          onChangeText={setPinCode}
          regex={/^[0-9]+$/}
          icon={IMAGES.BUILDING}
        />

        <Button
          title="Submit"
          onPress={onPressSubmit}
          loading={loadingData}
          btnStyle={styles.btnContainer}
        />
      </ScrollView>
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

  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.GREY,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
