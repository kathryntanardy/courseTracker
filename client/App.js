import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, View } from 'react-native';
import Header from './components/Header'
import {useState} from 'react'
import CourseContent from './components/CourseContent';

export default function App() {


  return (
    <>
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require('./img/background.png')
        }>
  
          <CourseContent/>
      </ImageBackground>
    </View>
    <View>
    
    </View>
    </>
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
