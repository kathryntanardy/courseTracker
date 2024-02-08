import { View, Text, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { addItem } from '../../functions.js';
import styles from './AddItemMenuStyles.js';

const AddItemMenu = ({ courseName, refetch, setAddItemMenu }) => {

    const [itemName, setItemName] = useState("");
    const [itemWeight, setItemWeight] = useState("");
    const [itemGrade, setItemGrade] = useState("");

    const addNewItem = async () => {

        const newItem = {
            courseName: courseName,
            itemName: itemName,
            weight: itemWeight,
            grade: itemGrade
        };

        try {

             await addItem(newItem);
             refetch();
             setAddItemMenu(false);

        } catch (err) {
            console.log(err.message);
        }

    };

    return (
        <View style={styles.mainView}>
          <View style={styles.formView}>
            <View style={styles.addItemContainer}>
              <Text style={styles.addItemText}>
                Add a New Item
              </Text>
            </View>
            <View style={styles.addItemInputContainer}>
              <TextInput
                style={styles.addItemInput}
                placeholder="Item Name"
                onChangeText={name => setItemName(name)}
              />
            </View>
            <View style={styles.addItemInputContainer}>
              <TextInput
                style={styles.addItemInput}
                placeholder="Weight"
                onChangeText={weight => setItemWeight(weight)}
              />
            </View>
            <View style={styles.addItemInputContainer}>
              <TextInput
                style={styles.addItemInput}
                placeholder="Grade"
                onChangeText={grade => setItemGrade(grade)}
              />
            </View>
            <View style={styles.addItemButtonContainer}>
              <Button 
                title="Add Item" 
                onPress={addNewItem}
              />
            </View>
            <View style={styles.addItemButtonContainer}>
              <Button
                title="Cancel" 
                color="#c70000"
                onPress={() => setAddItemMenu(false)}
              />
            </View>
          </View>
        </View>
    )
}

export default AddItemMenu