import { View, Text, Button } from 'react-native';
import styles from './DeleteCourseMenuStyles.js';
import { deleteCourse } from '../../functions.js';

const DeleteCourseMenu = ({ courseToDelete, setDeleteCourseMenu, refetch, subItemsRefetch }) => {

    const handleDelete = async () => {

        const deleteData = {
            courseName: courseToDelete,
        }

        try {
            await deleteCourse(deleteData);
            refetch();
            subItemsRefetch();
            setDeleteCourseMenu(false);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.formView}>
                <View style={styles.deleteCourseTextContainer}>
                    <Text style={styles.deleteCourseText}>
                        Delete Course
                    </Text>
                </View>
                <View style={styles.deleteCourseMenuSubtitleContainer}>
                    <Text>
                        Are you sure you want to delete {courseToDelete}?
                    </Text>
                </View>
                <View style={styles.deleteCourseButtonContainer}>
                    <Button
                        color="#c70000"
                        title="Delete"
                        onPress={handleDelete}
                    />
                </View>
                <View style={styles.deleteCourseButtonContainer}>
                    <Button
                        title="Cancel"
                        onPress={() => setDeleteCourseMenu(false)}
                    />
                </View>
            </View>
        </View>
    )
}

export default DeleteCourseMenu;