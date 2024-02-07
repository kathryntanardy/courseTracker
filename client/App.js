import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, View } from 'react-native';
import Header from './components/Header/Header'
import {useState} from 'react'
import CourseContent from './components/CourseContent/CourseContent';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <View style={styles.container}>
      <CourseContent/>
    </View>
    </QueryClientProvider>
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
