import { View, Text, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { addSubItem } from '../../functions.js';
import styles from './AddSubItemMenuStyles.js';

const AddSubItemMenu = ({ courseName, itemName, refetch, setAddSubItemMenu }) => {

  const [subName, setSubName] = useState("");
  const [subWeight, setSubWeight] = useState("");
  const [subGrade, setSubGrade] = useState("");

  const addNewSubItem = async () => {

    const newSubItemData = {
      courseName: courseName,
      itemName: itemName,
      subName: subName,
      subWeight: subWeight,
      subGrade: subGrade
    };

    try {
      await addSubItem(newSubItemData);
      refetch();
      setAddSubItemMenu(false);
    } catch (err) {
      console.log(err.message);
    }

  };
  
  return (
    <View style={styles.mainView}>
      <View style={styles.formView}>
        <View style={styles.addSubItemContainer}>
          <Text style={styles.addSubItemText}>
            Add a New SubItem
          </Text>
        </View>
        <View style={styles.addSubItemInputContainer}>
          <TextInput
            style={styles.addSubItemInput}
            placeholder="Name"
            onChangeText={name => setSubName(name)}
          />
        </View>
        <View style={styles.addSubItemInputContainer}>
          <TextInput
            style={styles.addSubItemInput}
            placeholder="Weight"
            onChangeText={weight => setSubWeight(weight)}
          />
        </View>
        <View style={styles.addSubItemInputContainer}>
          <TextInput
            style={styles.addSubItemInput}
            placeholder="Grade"
            onChangeText={grade => setSubGrade(grade)}
          />
        </View>
        <View style={styles.addSubItemButtonContainer}>
          <Button 
            title="Add SubItem" 
            onPress={addNewSubItem}
          />
        </View>
        <View style={styles.addSubItemButtonContainer}>
          <Button
            title="Cancel" 
            color="#c70000"
            onPress={() => setAddSubItemMenu(false)}
          />
        </View>
      </View>
    </View>
  )
}

export default AddSubItemMenu