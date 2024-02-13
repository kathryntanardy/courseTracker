import { View, Text, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { addItem, editItem } from '../../functions.js';
import styles from './AddItemMenuStyles.js';

const AddItemMenu = ({ courseName, refetch, setAddItemMenu, editItemMenu, setEditItemMenu, editItemData }) => {

    const [itemName, setItemName] = useState(editItemMenu ? editItemData.name : "");
    const [oldItemName, setOldItemName] = useState(editItemMenu ? editItemData.name : "");
    const [itemWeight, setItemWeight] = useState(editItemMenu ? editItemData.weight.toString() : "");

    const saveData = async () => {

      const newItem = {
        courseName: courseName,
        itemName: itemName.trim(),
        weight: Number(itemWeight),
      };

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
            <View style={styles.addItemButtonContainer}>
              <Button 
                title={editItemMenu ? "Edit Item" : "Add Item"}
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