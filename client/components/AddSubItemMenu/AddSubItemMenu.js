import { View, Text, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { addSubItem, editSubItem } from '../../functions.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './AddSubItemMenuStyles.js';

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

const AddSubItemMenu = ({ courseName, itemName, refetch, setAddSubItemMenu, editSubItemMenu, setEditSubItemMenu, editSubItemData }) => {

  const [subItemName, setSubItemName] = useState(editSubItemMenu ? editSubItemData.name : "");
  const [oldSubItemName, setOldSubItemName] = useState(editSubItemMenu ? editSubItemData.name : "");
  const [subItemWeight, setSubItemWeight] = useState(editSubItemMenu ? editSubItemData.weight.toString() : "");
  const [subItemTotalMarks, setSubItemTotalMarks] = useState(editSubItemMenu ? editSubItemData.totalMarks.toString() : "");
  const [subItemMarksGiven, setSubItemMarksGiven] = useState(editSubItemMenu && editSubItemData.marksGiven !== -1 ? editSubItemData.marksGiven.toString() : "");

  const [date, setDate] = useState(editSubItemMenu ? new Date(editSubItemData.dueDate) : new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const saveSubItemData = async () => {

    let tempMarksGiven = subItemMarksGiven;

    if (tempMarksGiven.length === 0) {
      tempMarksGiven = "-1";
    }

    const newSubItemData = {
      courseName: courseName,
      itemName: itemName,
      name: subItemName,
      weight: Number(subItemWeight),
      totalMarks: Number(subItemTotalMarks),
      marksGiven: Number(tempMarksGiven),
      dueDate: date
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

  const showMode = (newMode) => {
    setShow(true);
    setMode(newMode);
  };

  const handleDateChange = (e, newDate) => {

    setDate(new Date(newDate.getTime()));
    setShow(false);

  };

  const displayDueDate = () => {

    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  };

  const displayDueTime = () => {

    let minutes = date.getMinutes() < 10 ? `${date.getMinutes()}0` : date.getMinutes() ;

    return `${(date.getHours()) % 24}:${minutes}`;

  };

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
        <View style={styles.dueDateContainer}>
          <Text>{displayDueDate()}</Text>
          <Button title="Set Due Date" onPress={() => showMode("date")} />
        </View>
        <View style={styles.dueDateContainer}>
          <Text>{displayDueTime()}</Text>
          <Button title="Set Due Time" onPress={() => showMode("time")} />
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
        {show ? 
          (
            <DateTimePicker
              value={date}
              mode={mode}
              display='spinner'
              onChange={(e, newDate) => handleDateChange(e, newDate)}
            />
          ) : (<></>)}
      </View>
    </View>
  )
}

export default AddSubItemMenu