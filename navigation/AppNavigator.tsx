import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    HomeScreen,
    HorizontalDotScreen,
    HorizontalThumbnailScreen,
    VerticalDotScreen,
    VerticalThumbnailScreen,
} from '../screens';
import { NavigationContainer } from '@react-navigation/native';

const AppStack = createStackNavigator();

interface AppNavigatorProps {}

export const AppNavigator: React.FunctionComponent<AppNavigatorProps> = () => (
    <NavigationContainer>
        <AppStack.Navigator initialRouteName="Home">
            <AppStack.Screen name="Home" component={HomeScreen} />
            <AppStack.Screen name="HorizontalThumbnail" component={HorizontalThumbnailScreen} />
            <AppStack.Screen name="VerticalThumbnail" component={VerticalThumbnailScreen} />
            <AppStack.Screen name="HorizontalDot" component={HorizontalDotScreen} />
            <AppStack.Screen name="VerticalDot" component={VerticalDotScreen} />
        </AppStack.Navigator>
    </NavigationContainer>
);
