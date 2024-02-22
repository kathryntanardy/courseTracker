import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import { useState } from 'react'
import { getCourses, getUpcomingSubItems } from '../../functions.js';
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
];

const Separator = () => <View style={styles.separator} />;
export default function CourseContent({ navigation }) {

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["getcourses"],
        queryFn: getCourses
    });

    const {
            data: subItemsData, 
            isLoading: subItemsIsLoading, 
            refetch: subItemsRefetch } = useQuery({
                queryKey: ["getSubItems"],
                queryFn: getUpcomingSubItems
            })

    const [addCourseMenu, setAddCourseMenu] = useState(false);
    const [deleteCourseMenu, setDeleteCourseMenu] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState('');
    const [displayCourseOptions, setDisplayCourseOptions] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [editCourseData, setEditCourseData] = useState({});
    const [editCourseMenu, setEditCourseMenu] = useState(false);

    const handlePress = (subject) => {
        navigation.navigate('Course', {
            subject: subject,
            refetch: () => subItemsRefetch()
        });
    }

    const addCourse = () => {
        setAddCourseMenu(true);
    };

    const deleteCourse = (courseToDeleteName) => {
        setCourseToDelete(courseToDeleteName);
        setDeleteCourseMenu(true);
    }

    const setSelectedCourseID = (itemID) => {
        setSelectedCourse(itemID);
        setDisplayCourseOptions(true);
    };

    const openEditCourseMenu = (courseToEdit) => {
        setEditCourseData(courseToEdit);
        setEditCourseMenu(true);
        setAddCourseMenu(true);
    };

    const displaySubItemDueDate = (subItemDueDate) => {

        const subItemDueDateObject = new Date(subItemDueDate);
        return `${MONTHS[subItemDueDateObject.getMonth()]} ${subItemDueDateObject.getDate()}, ${subItemDueDateObject.getFullYear()}`

    };

    const renderCourseItem = ({ item }) => (
        <TouchableOpacity 
            onPress={() => handlePress(item)}
            onLongPress={() => setSelectedCourseID(item._id)}
        >
            <View style={styles.outerContainer}>
                <View style={styles.innerContainer}>
                    <View style={[styles.courseColourCircle, { backgroundColor: item.colour.hex }]} />
                    <View style={styles.courseInfo}>
                        <Text style={styles.courseName}>{item.name}</Text>    
                        <Text style={styles.courseCredits}>{item.credits}</Text>
                    </View>
                </View>
                {displayCourseOptions && selectedCourse === item._id ? (
                <View style={styles.displayItemOptionsContainer}>
                    <TouchableOpacity>
                        <AntIcon 
                            style={styles.editItemButton}
                            size={20}
                            name="edit" 
                            backgroundColor={item.colour.hex}
                            onPress={() => openEditCourseMenu(item)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntIcon 
                            style={styles.editItemButton}
                            size={20}
                            name="delete" 
                            backgroundColor={item.colour.hex}
                            onPress={() => deleteCourse(item.name)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntIcon 
                            style={styles.editItemButton}
                            size={20}
                            name="back" 
                            backgroundColor={item.colour.hex}
                            onPress={() => {
                                setSelectedCourse("");
                                setDisplayCourseOptions(false);
                            }}
                        />
                    </TouchableOpacity>
                </View>
                ) : (<></>)}
            </View>
        </TouchableOpacity>
    );

    const renderSubItem = ({ item }) => (
        <View style={styles.outerContainer}>
            <View style={[styles.subItemColourCircle, { backgroundColor: item.courseColour.hex }]} />
            <Text>{item.courseName}</Text>
            <Text>{item.name}</Text>
            <Text>{displaySubItemDueDate(item.dueDate)}</Text>
        </View>
    );

    return (
        <View style={{ top: StatusBar.currentHeight, height: '100%' }}>
            {addCourseMenu ? 
                <AddCourseMenu 
                    setAddCourseMenu={setAddCourseMenu}
                    refetch={refetch}
                    editCourseData={editCourseData}
                    editCourseMenu={editCourseMenu}
                    setEditCourseMenu={setEditCourseMenu}
                /> : (<></>)
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
                        Home
                    </Text>
                </View>
                <View style={styles.addButtonWrapper}>
                    <TouchableOpacity onPress={addCourse} >
                        <AntIcon name="pluscircleo" color="white" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.subItemContainer}>
                <View style={styles.flatListHeaderTextWrapper}>
                    <Text style={styles.flatListHeaderText}>
                        Upcoming Deadlines
                    </Text>
                </View>
                <FlatList
                    style={styles.divBox}
                    data={subItemsData}
                    keyExtractor={item => item._id}
                    renderItem={renderSubItem}
                    ItemSeparatorComponent={Separator}
                    scrollEnabled={true}
                />
            </View>
            <View style={styles.courseContainer}>
                <View style={styles.flatListHeaderTextWrapper}>
                    <Text style={styles.flatListHeaderText}>
                        Courses
                    </Text>
                </View>
                <FlatList
                    style={styles.divBox}
                    data={data}
                    extraData={addCourseMenu}
                    keyExtractor={item => item._id }
                    renderItem={renderCourseItem}
                    ItemSeparatorComponent={Separator}
                    scrollEnabled={true}
                />
            </View>
        </View>
    )
}