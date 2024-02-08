import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import { useState } from 'react'
import Header from '../Header/Header.js'
import { getCourses } from '../../functions.js';
import { useQuery } from 'react-query';
import styles from './HomeStyles.js';
import AddCourseMenu from '../AddCourseMenu/AddCourseMenu.js';
import DeleteCourseMenu from '../DeleteCourseMenu/DeleteCourseMenu.js';
import AntIcon from 'react-native-vector-icons/AntDesign';

const courses = [
    { name: 'English', _id: '1A', credits: 3 },
    { name: 'Chinese', _id: '2B', credits: 3 },
    { name: 'CMPT', _id: '3C', credits: 4 }
];


const Separator = () => <View style={styles.separator} />;
export default function CourseContent({ navigation }) {

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["getcourses"],
        queryFn: getCourses
    });

    const [addCourseMenu, setAddCourseMenu] = useState(false);
    const [deleteCourseMenu, setDeleteCourseMenu] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState('');

    const handlePress = (subject) => {
        navigation.navigate('Course', subject);
    }

    const addCourse = () => {
        setAddCourseMenu(true);
    };

    const deleteCourse = (courseToDeleteName) => {
        setCourseToDelete(courseToDeleteName);
        setDeleteCourseMenu(true);
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            onPress={() => handlePress(item)}
            onLongPress={() => deleteCourse(item.name)}
        >
            <View style={styles.innerContainer}>
                <View style={[styles.courseColourCircle, { backgroundColor: item.colour }]}  />
                <View style={styles.courseInfo}>
                    <Text style={styles.courseName}>{item.name}</Text>    
                    <Text style={styles.courseCredits}>{item.credits}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ marginTop: StatusBar.currentHeight }}>
            {addCourseMenu ? 
                <AddCourseMenu 
                    setAddCourseMenu={setAddCourseMenu}
                    refetch={refetch}
                /> : 
                (<></>)
            }
            {deleteCourseMenu ?
                <DeleteCourseMenu 
                    courseToDelete={courseToDelete}
                    setDeleteCourseMenu={setDeleteCourseMenu}
                    refetch={refetch}
                />
                : 
                (<></>)
            }
            <View style={styles.headerOuter}>
                <View style={styles.headerTextWrapper}>
                    <Text style={styles.headerText}>
                        Courses
                    </Text>
                </View>
                <View style={styles.addButtonWrapper}>
                    <TouchableOpacity onPress={addCourse} >
                        <AntIcon name="pluscircleo" color="white" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <FlatList
                    style={styles.divBox}
                    data={data}
                    extraData={addCourseMenu}
                    keyExtractor={item => item._id }
                    renderItem={renderItem}
                    ItemSeparatorComponent={Separator}></FlatList>
            </View>
        </View>
    )
}