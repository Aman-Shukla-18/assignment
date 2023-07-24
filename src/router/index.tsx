import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '../utils/screenNames';
import BasicDetails from '../screens/BasicDetails';
import ProfessionalInfo from '../screens/ProfessionalInfo';
import AddressInfo from '../screens/AddressInfo';
import { StyleSheet, Text } from 'react-native';
import colors from '../utils/colors';
import { normalize, vw } from '../utils/Dimension';
import BackButton from '../components/BackButton';

const Stack = createStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name={screenNames.BASIC} component={BasicDetails}
      options={{
        headerShadowVisible: false,
        headerStyle: styles.headerStyle,
        headerTitle: () => <Text style = {styles.heading}>Register</Text>,
      }} />
      <Stack.Screen name={screenNames.PROFESSIONAL_INFO} component={ProfessionalInfo}
      
      options={({navigation}) => (
        {
          headerLeft: () =>  <BackButton navigation = {navigation} />,
          headerShadowVisible: false,
          headerStyle: styles.headerStyle,
          headerTitle: () => <Text style = {styles.heading}>Your Info</Text>,
        }
      )}/>
      <Stack.Screen name={screenNames.ADDRESS} component={AddressInfo}
      options={({navigation}) => (
        {
          headerLeft: () =>  <BackButton navigation = {navigation} />,
          headerShadowVisible: false,
          headerStyle: styles.headerStyle,
          headerTitle: () => <Text style = {styles.heading}>Your Address</Text>,
        }
      )} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({
  title: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: vw(20),
  },
  heading: {
    fontSize: normalize(22),
    color: colors.BLACK,
    fontWeight: 'bold',
    letterSpacing: vw(1)
  },
  headerStyle: {
    backgroundColor: colors.WHITE,
  },
})
