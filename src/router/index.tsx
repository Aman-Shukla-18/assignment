import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '../utils/screenNames';
import BasicDetails from '../screens/BasicDetails';
import ProfessionalInfo from '../screens/ProfessionalInfo';
import AddressInfo from '../screens/AddressInfo';

const Stack = createStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, presentation: 'card'}}>
      <Stack.Screen name={screenNames.BASIC} component={BasicDetails} />
      <Stack.Screen name={screenNames.PROFESSIONAL_INFO} component={ProfessionalInfo} />
      <Stack.Screen name={screenNames.ADDRESS} component={AddressInfo} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
