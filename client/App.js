import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header'
import CourseContent from './components/CourseContent';

export default function App() {
  return (
    <View style={styles.container}>
      <Header/>
      <CourseContent/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
