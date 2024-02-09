import { View, Text, Button } from 'react-native';
import styles from './DeleteSubItemMenuStyles.js';
import { deleteSubItem } from '../../functions.js';

const DeleteSubItemMenu = ({ courseName, itemName, subItemName, refetch, setDeleteSubItemMenu }) => {
    
    const handleDelete = async () => {

        const subItemDeleteData = {
            courseName: courseName,
            itemName: itemName,
            subItemName: subItemName
        };

        try {
            await deleteSubItem(subItemDeleteData);
            refetch();
            setDeleteSubItemMenu(false);
        } catch(err) {
            console.log(err.message);
        }

    };
    
    return (
        <View style={styles.mainView}>
            <View style={styles.formView}>
                <View style={styles.deleteSubItemTextContainer}>
                    <Text style={styles.deleteSubItemText}>
                        Delete SubItem
                    </Text>
                </View>
                <View style={styles.deleteSubItemMenuSubtitleContainer}>
                    <Text>
                        Are you sure you want to delete {subItemName}?
                    </Text>
                </View>
                <View style={styles.deleteSubItemButtonContainer}>
                    <Button
                        color="#c70000"
                        title="Delete"
                        onPress={handleDelete}
                    />
                </View>
                <View style={styles.deleteSubItemButtonContainer}>
                    <Button
                        title="Cancel"
                        onPress={() => setDeleteSubItemMenu(false)}
                    />
                </View>
            </View>
        </View>
    )
}

export default DeleteSubItemMenu