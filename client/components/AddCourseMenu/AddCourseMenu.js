import { Image, View, Text, ScrollView, FlatList, TouchableOpacity, Pressable, Button, TextInput } from 'react-native'
import { useState } from 'react'
import { addCourse } from '../../functions.js';
import styles from './AddCourseMenuStyles.js';

const AddCourseMenu = ({ setAddCourseMenu, refetch }) => {

  const [courseName, setCourseName] = useState("");
  const [credits, setCredits] = useState("");

  const addNewCourse = () => {

    const newCourseData = {
      name: courseName,
      items: [],
      credits: Number(credits)
    }

    try {
      addCourse(newCourseData);
      setAddCourseMenu(false);
      refetch();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.formView}>
        <View style={styles.addCourseContainer}>
          <Text style={styles.addCourseText}>
            Add a New Course
          </Text>
        </View>
        <View style={styles.addCourseInputContainer}>
          <TextInput
            style={styles.addCourseInput}
            placeholder="Course Name"
            onChangeText={name => setCourseName(name)}
          />
        </View>
        <View style={styles.addCourseInputContainer}>
          <TextInput
            style={styles.addCourseInput}
            placeholder="Number of Credits"
            onChangeText={numCredits => setCredits(numCredits)}
          />
        </View>
        <View style={styles.addCourseButtonContainer}>
          <Button 
            title="Add Course" 
            onPress={addNewCourse}
          />
        </View>
        <View style={styles.addCourseButtonContainer}>
          <Button
            title="Cancel" 
            color="#c70000"
            onPress={() => setAddCourseMenu(false)}
          />
        </View>
      </View>
    </View>
  )
}

export default AddCourseMenu