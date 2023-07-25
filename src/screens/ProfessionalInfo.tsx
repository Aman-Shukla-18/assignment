// Library imports
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Component imports
import Button from '../components/Button';
import Divider from '../components/Divider';
import InputWithLable from '../components/InputWithLable';

// Util imports
import colors from '../utils/colors';
import {IMAGES} from '../utils/images';
import screenNames from '../utils/screenNames';
import {MainStackParams} from '../utils/types';
import {normalize, vh, vw} from '../utils/Dimension';
import {REGEX, STRINGS, educationOptions} from '../utils/constants';

type Props = {
  navigation: NativeStackNavigationProp<MainStackParams>;
};

const ProfessionalInfo = (props: Props) => {
  const [errors, setErrors] = useState({});
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [yearOfPassing, setYearOfPassing] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const [domain, setDomain] = useState<string>('');

  const onPressNext = () => {
    setLoadingData(true);
    setTimeout(() => {
      props.navigation.navigate(screenNames.ADDRESS);
      setLoadingData(false);
      console.log({
        education,
        yearOfPassing,
        grade,
        experience,
        designation,
        domain,
      });
    }, 500);
  };

  const hasError = () => Object.values(errors).includes(true);

  const onPressPrevious = () => {
    props.navigation.goBack();
  };

  const handleHasError = (val: object) => {
    setErrors({...errors, ...val});
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeading}>Educational Info</Text>
        <Text style={styles.InputBoxHeadings}>Education*</Text>
        <View style={styles.ddContainer}>
          <Dropdown
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={educationOptions}
            maxHeight={vh(250)}
            labelField="label"
            valueField="value"
            placeholder={'Select your qualification'}
            onChange={item => {
              setEducation(item.value);
            }}
            value={education}
            renderRightIcon={() => (
              <Image source={IMAGES.ARROW_DOWN} style={styles.dropIcon} />
            )}
          />
        </View>
        <InputWithLable
          label="Year Of Passing*"
          value={yearOfPassing}
          placeholder="Enter year of passing"
          onChangeText={setYearOfPassing}
          regex={REGEX.onlyNumber}
          error={STRINGS.yearOfPassing}
          hasError={handleHasError}
        />
        <InputWithLable
          label="Grade"
          value={grade}
          placeholder="Enter your grade or percentage"
          onChangeText={setGrade}
          regex={REGEX.characterAndNumber}
          error={STRINGS.grade}
          hasError={handleHasError}
        />
        <Divider />
        <Text style={styles.sectionHeading}>Professional Info</Text>
        <InputWithLable
          label="Experience"
          value={experience}
          placeholder="Enter the year of Experience"
          onChangeText={setExperience}
          regex={REGEX.onlyNumber}
          error={STRINGS.experience}
          hasError={handleHasError}
        />
        <InputWithLable
          label="Designation"
          value={designation}
          placeholder="Enter Designation"
          onChangeText={setDesignation}
          regex={REGEX.characterAndNumber}
          error={STRINGS.designation}
          hasError={handleHasError}
        />
        <InputWithLable
          label="Domain"
          value={domain}
          placeholder="Enter your Domain"
          onChangeText={setDomain}
          regex={REGEX.characterAndNumber}
          error={STRINGS.domain}
          hasError={handleHasError}
        />
        <View style={[styles.radioRow, styles.btnParentContainer]}>
          <Button
            title="Previous"
            onPress={onPressPrevious}
            btnStyle={[styles.btnContainer, styles.outlinedBtn]}
            titleStyle={styles.btnTitleStyle}
          />
          <Button
            title="Next"
            onPress={onPressNext}
            loading={loadingData}
            btnStyle={styles.btnContainer}
            disabled={hasError() || !(education && yearOfPassing)}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ProfessionalInfo;

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
