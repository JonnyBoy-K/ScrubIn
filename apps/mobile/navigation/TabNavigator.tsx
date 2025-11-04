import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '@/pages/HomePage';
import ViewShiftPage from '@/pages/ViewShiftPage';
import TradeShiftPage from '@/pages/TradeShiftPage';
import DaysOffPage from '@/pages/DaysOffPage';
import SettingsPage from '@/pages/SettingsPage';
import TabBar from '@/components/MainTabs';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="ViewShift" component={ViewShiftPage} />
            <Tab.Screen name="TradeShift" component={TradeShiftPage} />
            <Tab.Screen name="DaysOff" component={DaysOffPage} />
            <Tab.Screen name="Settings" component={SettingsPage} />
        </Tab.Navigator>
    );
}