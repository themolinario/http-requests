import {StyleSheet} from 'react-native';
import { NavigationContainer, NavigatorScreenParams} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {StatusBar} from "expo-status-bar";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import {GlobalStyles} from "./constants/styles";
import { Ionicons } from '@expo/vector-icons';
import IconButton from "./components/UI/IconButton";

export interface StackParamList {
    Overview: NavigatorScreenParams<BottomTabsParamList>
    Manage: undefined,
}

export interface BottomTabsParamList  {
    Recent: undefined,
    All: undefined
}


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
    return(
        <BottomTabs.Navigator
            screenOptions={({navigation}) =>({
                headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
                headerTintColor: 'white',
                tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
                tabBarActiveTintColor: GlobalStyles.colors.accent500,
                headerRight: ({tintColor}) => (
                    <IconButton
                        name="add"
                        size={24}
                        color={tintColor}
                        onPress={() => {
                            navigation.navigate('ManageExpense')
                        }}
                    />
                )
        })}>
            <BottomTabs.Screen
                name="RecentExpenses"
                component={RecentExpenses}
                options={{
                    title: 'Recent Expenses',
                    tabBarLabel: 'Recent',
                    tabBarIcon: ({color, size}) =>
                        <Ionicons name="hourglass" size={size} color={color} />
                }}
            />
            <BottomTabs.Screen
                name="All Expenses"
                component={AllExpenses}
                options={{
                    title: 'All Expenses',
                    tabBarLabel: 'All',
                    tabBarIcon: ({color, size}) =>
                        <Ionicons name="calendar" size={size} color={color} />
                }}
            />
        </BottomTabs.Navigator>
    )
}

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
                    headerTintColor: 'white',
                }}>
                    <Stack.Screen
                        name="ExpensesOverview"
                        component={ExpensesOverview}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ManageExpense"
                        component={ManageExpense}
                        options={{
                            presentation: 'modal'
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
