import { View, Text, Button } from 'react-native';
import styles from './DeleteItemMenuStyles.js';
import { deleteItem } from '../../functions.js';

const DeleteItemMenu = ({ courseName, itemName, refetch, setDeleteItemMenu }) => {

    const handleDelete = async () => {

        const itemDeletionInfo = {
            courseName: courseName,
            itemName: itemName
        }

        try {
            await deleteItem(itemDeletionInfo);
            refetch();
            setDeleteItemMenu(false);
        } catch (err) {
            console.log(err.message);
        }

    };

    return (
        <View style={styles.mainView}>
            <View style={styles.formView}>
                <View style={styles.deleteItemTextContainer}>
                    <Text style={styles.deleteItemText}>
                        Delete Item
                    </Text>
                </View>
                <View style={styles.deleteItemMenuSubtitleContainer}>
                    <Text>
                        Are you sure you want to delete {itemName}?
                    </Text>
                </View>
                <View style={styles.deleteItemButtonContainer}>
                    <Button
                        color="#c70000"
                        title="Delete"
                        onPress={handleDelete}
                    />
                </View>
                <View style={styles.deleteItemButtonContainer}>
                    <Button
                        title="Cancel"
                        onPress={() => setDeleteItemMenu(false)}
                    />
                </View>
            </View>
        </View>
    )
}

export default DeleteItemMenu