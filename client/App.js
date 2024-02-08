import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, View } from 'react-native';
import Header from './components/Header/Header'
import {useState} from 'react'
import Home from './components/Home/Home';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoursePage from './components/CoursePage/CoursePage';

export default function App() {

  const queryClient = new QueryClient();
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <View style={styles.container}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen 
              name="Home"
              component={Home}
            />
            <Stack.Screen 
              name="Course"
              component={CoursePage}
            />
          </Stack.Navigator>
        </View>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
  },
  background: {
    flex: 1,
  }
});
