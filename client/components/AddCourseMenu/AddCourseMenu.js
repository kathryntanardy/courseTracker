import { View, Text, Button, TextInput } from 'react-native'
import { useState } from 'react'
import { addCourse } from '../../functions.js';
import styles from './AddCourseMenuStyles.js';
import ColorPicker, { Panel3, BrightnessSlider, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';

const AddCourseMenu = ({ setAddCourseMenu, refetch }) => {

  const [courseName, setCourseName] = useState("");
  const [credits, setCredits] = useState("");
  const [courseColour, setCourseColour] = useState("");

  const addNewCourse = async () => {

    const newCourseData = {
      name: courseName,
      items: [],
      credits: Number(credits),
      colour: courseColour
    }

    try {
      await addCourse(newCourseData);
      refetch();
      setAddCourseMenu(false);
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
        <View>
          <ColorPicker 
            style={styles.colorPickerContainer}
            onChange={({ hex }) => setCourseColour(hex)}
          >
            <Panel3 centerChannel='saturation' />
            <BrightnessSlider style={{ marginTop: '10%' }} />
          </ColorPicker>
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