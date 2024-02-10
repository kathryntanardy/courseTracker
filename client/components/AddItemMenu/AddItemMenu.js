import { View, Text, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { addItem, editItem } from '../../functions.js';
import styles from './AddItemMenuStyles.js';

const AddItemMenu = ({ courseName, refetch, setAddItemMenu, editItemMenu, setEditItemMenu, editItemData }) => {

    const [itemName, setItemName] = useState(editItemMenu ? editItemData.name : "");
    const [oldItemName, setOldItemName] = useState(editItemMenu ? editItemData.name : "");
    const [itemWeight, setItemWeight] = useState(editItemMenu ? editItemData.weight.toString() : "");
    const [itemTotalMarks, setItemTotalMarks] = useState(editItemMenu && editItemData.totalMarks !== -1 ? editItemData.totalMarks.toString() : "");
    const [itemGrade, setItemGrade] = useState(editItemMenu && editItemData.grade !== -1 ? editItemData.grade.toString() : "");

    const saveData = async () => {

      const newItem = {
        courseName: courseName,
        itemName: itemName,
        weight: Number(itemWeight),
        totalMarks: Number(itemTotalMarks),
        grade: Number(itemGrade),
        percentage: -1
      };

      if (itemTotalMarks === "") {
        newItem.totalMarks = -1;
      }

      if (itemGrade === "") {
        newItem.grade = -1;
      }

      try {

        if (editItemMenu) {
          newItem.itemName = oldItemName;
          newItem.name = itemName;
          await editItem(newItem);
        } else {
          await addItem(newItem);
        } 

        refetch();
        setAddItemMenu(false);
        setEditItemMenu(false);

      } catch (err) {
        console.log(err.message);
      }
    };

    const cancelButtonFunction = () => {

      setAddItemMenu(false);
      setEditItemMenu(false);

    };

    return (
        <View style={styles.mainView}>
          <View style={styles.formView}>
            <View style={styles.addItemContainer}>
              <Text style={styles.addItemText}>
                {editItemMenu ? `Edit ${editItemData.name}` : "Add a New Item"}
              </Text>
            </View>
            <View style={styles.addItemInputContainer}>
              <TextInput
                style={styles.addItemInput}
                placeholder="Item Name"
                value={itemName}
                onChangeText={name => setItemName(name)}
              />
            </View>
            <View style={styles.addItemInputContainer}>
              <TextInput
                style={styles.addItemInput}
                placeholder="Weight"
                value={itemWeight}
                onChangeText={weight => setItemWeight(weight)}
              />
            </View>
            <View style={styles.addItemInputContainer}>
              <TextInput
                style={styles.addItemInput}
                placeholder="Total Marks"
                value={itemTotalMarks}
                onChangeText={marks => setItemTotalMarks(marks)}
              />
            </View>
            <View style={styles.addItemInputContainer}>
              <TextInput
                style={styles.addItemInput}
                placeholder="Grade"
                value={itemGrade}
                onChangeText={grade => setItemGrade(grade)}
              />
            </View>
            <View style={styles.addItemButtonContainer}>
              <Button 
                title="Add Item" 
                onPress={saveData}
              />
            </View>
            <View style={styles.addItemButtonContainer}>
              <Button
                title="Cancel" 
                color="#c70000"
                onPress={cancelButtonFunction}
              />
            </View>
          </View>
        </View>
    )
}

export default AddItemMenu