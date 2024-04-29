import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import PostListScreen from './screens/PostListScreen/PostListScreen.view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const Navigation = () => {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          lazy: true,
          tabBarContentContainerStyle: {paddingTop: insets.top},
        }}>
        <Tab.Screen name="Hot" component={PostListScreen} />
        <Tab.Screen name="New" component={PostListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
