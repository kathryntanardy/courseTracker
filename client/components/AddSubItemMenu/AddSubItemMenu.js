import { View, Text, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { addSubItem, editSubItem } from '../../functions.js';
import styles from './AddSubItemMenuStyles.js';

const AddSubItemMenu = ({ courseName, itemName, refetch, setAddSubItemMenu, editSubItemMenu, setEditSubItemMenu, editSubItemData }) => {

  const [subItemName, setSubItemName] = useState(editSubItemMenu ? editSubItemData.name : "");
  const [oldSubItemName, setOldSubItemName] = useState(editSubItemMenu ? editSubItemData.name : "");
  const [subItemWeight, setSubItemWeight] = useState(editSubItemMenu ? editSubItemData.weight.toString() : "");
  const [subItemTotalMarks, setSubItemTotalMarks] = useState(editSubItemMenu ? editSubItemData.totalMarks.toString() : "");
  const [subItemMarksGiven, setSubItemMarksGiven] = useState(editSubItemMenu ? editSubItemData.marksGiven.toString() : "");

  const saveSubItemData = async () => {

    const newSubItemData = {
      courseName: courseName,
      itemName: itemName,
      name: subItemName,
      weight: Number(subItemWeight),
      totalMarks: Number(subItemTotalMarks),
      marksGiven: Number(subItemMarksGiven)
    };

    try {

      if (editSubItemMenu) {
        newSubItemData.subItemName = oldSubItemName;
        newSubItemData.name = subItemName;
        await editSubItem(newSubItemData);
      } else {
        await addSubItem(newSubItemData); 
      }

      refetch();
      setAddSubItemMenu(false);
      setEditSubItemMenu(false);
    } catch (err) {
      console.log(err.message);
    }
  };
  
  const cancelButton = () => {

    setAddSubItemMenu(false);
    setEditSubItemMenu(false);

  }

  return (
    <View style={styles.mainView}>
      <View style={styles.formView}>
        <View style={styles.addSubItemContainer}>
          <Text style={styles.addSubItemText}>
            {editSubItemMenu ? `Edit ${editSubItemData.name}` : "Add a new SubItem"}
          </Text>
        </View>
        <View style={styles.addSubItemInputContainer}>
          <TextInput
            style={styles.addSubItemInput}
            placeholder="Name"
            value={subItemName}
            onChangeText={name => setSubItemName(name)}
          />
        </View>
        <View style={styles.addSubItemInputContainer}>
          <TextInput
            style={styles.addSubItemInput}
            placeholder="Weight"
            value={subItemWeight}
            onChangeText={weight => setSubItemWeight(weight)}
          />
        </View>
        <View style={styles.addSubItemInputContainer}>
          <TextInput
            style={styles.addSubItemInput}
            placeholder="Total Marks"
            value={subItemTotalMarks}
            onChangeText={marks => setSubItemTotalMarks(marks)}
          />
        </View>
        <View style={styles.addSubItemInputContainer}>
          <TextInput
            style={styles.addSubItemInput}
            placeholder="Grade"
            value={subItemMarksGiven}
            onChangeText={grade => setSubItemMarksGiven(grade)}
          />
        </View>
        <View style={styles.addSubItemButtonContainer}>
          <Button 
            title={editSubItemMenu ? "Edit SubItem" : "Add SubItem"}
            onPress={saveSubItemData}
          />
        </View>
        <View style={styles.addSubItemButtonContainer}>
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

export default AddSubItemMenu