import { View, Text, Button, TextInput } from 'react-native'
import { useState } from 'react'
import { addCourse, editCourse } from '../../functions.js';
import styles from './AddCourseMenuStyles.js';
import ColorPicker, { Panel3, BrightnessSlider } from 'reanimated-color-picker';

const AddCourseMenu = ({ setAddCourseMenu, refetch, editCourseData, editCourseMenu, setEditCourseMenu }) => {

  const [courseName, setCourseName] = useState(editCourseMenu ? editCourseData.name : "");
  const [oldCourseName, setOldCourseName] = useState(editCourseMenu ? editCourseData.name : "");
  const [courseCredits, setCourseCredits] = useState(editCourseMenu ? editCourseData.credits.toString() : "");
  const [courseColour, setCourseColour] = useState(editCourseMenu ? editCourseData.colour : {});

  const addNewCourse = async () => {

    try {

      if (editCourseMenu) {

        const editCourseData = {
          courseName: oldCourseName,
          name: courseName,
          credits: Number(courseCredits),
          colour: courseColour
        };

        await editCourse(editCourseData);
      } else {

        const newCourseData = {
          name: courseName,
          items: [],
          credits: Number(courseCredits),
          colour: courseColour
        }

        await addCourse(newCourseData);
      }

      refetch();
      setAddCourseMenu(false);
      setEditCourseMenu(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const cancelButton = () => {
    setAddCourseMenu(false);
    setEditCourseMenu(false);
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.formView}>
        <View style={styles.addCourseContainer}>
          <Text style={styles.addCourseText}>
            {editCourseMenu ? `Edit ${editCourseData.name}` : "Add a New Course"}
          </Text>
        </View>
        <View style={styles.addCourseInputContainer}>
          <TextInput
            style={styles.addCourseInput}
            placeholder="Course Name"
            value={courseName}
            onChangeText={name => setCourseName(name)}
          />
        </View>
        <View style={styles.addCourseInputContainer}>
          <TextInput
            style={styles.addCourseInput}
            placeholder="Number of Credits"
            value={courseCredits}
            onChangeText={numCredits => setCourseCredits(numCredits)}
          />
        </View>
        <View>
          <ColorPicker
            style={styles.colorPickerContainer}
            value={courseColour.hex}
            onChange={(colour) => setCourseColour(colour)}
          >
            <Panel3 centerChannel='saturation' />
            <BrightnessSlider style={{ marginTop: '10%' }} />
          </ColorPicker>
        </View>
        <View style={styles.addCourseButtonContainer}>
          <Button 
            title={editCourseMenu ? "Edit Course" : "Add Course"} 
            onPress={addNewCourse}
          />
        </View>
        <View style={styles.addCourseButtonContainer}>
          <Button
            title="Cancel" 
            color="#c70000"
            onPress={cancelButton}
          />
        </View>
      </View>
    </View>
  )
}

export default AddCourseMenu