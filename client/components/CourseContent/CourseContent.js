import { Image, View, Text, ScrollView, FlatList, TouchableOpacity, Pressable, Button } from 'react-native'
import { useState } from 'react'
import Header from '../Header/Header.js'
import { getCourses } from '../../functions.js';
import { useQuery } from 'react-query';
import styles from './CourseContentStyles.js';
import AddCourseMenu from '../AddCourseMenu/AddCourseMenu.js';
import DeleteCourseMenu from '../DeleteCourseMenu/DeleteCourseMenu.js';

const courses = [
    { name: 'English', _id: '1A', credits: 3 },
    { name: 'Chinese', _id: '2B', credits: 3 },
    { name: 'CMPT', _id: '3C', credits: 4 }
];


const Separator = () => <View style={styles.separator} />;
export default function CourseContent() {

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["getcourses"],
        queryFn: getCourses
    });

    const [subjectName, setSubjectName] = useState('COURSES');
    const [addCourseMenu, setAddCourseMenu] = useState(false);
    const [deleteCourseMenu, setDeleteCourseMenu] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState('');

    const handlePress = (subject) => {
        setSubjectName(subject.name);
    }

    const backHome = () => {
        setSubjectName('COURSES');
    }

    const addCourse = () => {
        setAddCourseMenu(true);
    };

    const deleteCourse = (courseToDeleteName) => {
        setCourseToDelete(courseToDeleteName);
        setDeleteCourseMenu(true);
    }

    if (subjectName == 'COURSES') {

        const renderItem = ({ item }) => (
            <TouchableOpacity 
                onPress={() => handlePress(item)}
                onLongPress={() => deleteCourse(item.name)}
            >
                <View style={styles.innerContainer}>
                    <Text style={styles.text}>{item.credits}</Text>
                    <Text style={styles.right}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );

        return (
            <>
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
                    <Header name={subjectName}/>
                    <Text style={styles.subHeadingText}>
                        credits
                    </Text>
                </View>
                <View style={styles.addButtonView}>
                    <Button style={styles.addCourseButton} title="Add Course" onPress={addCourse} />
                </View>
                    <View style={styles.outer}> 
                        <View style={styles.container}>
                            <FlatList
                                style={styles.divBox}
                                data={data}
                                extraData={addCourseMenu}
                                keyExtractor={(item, index) => `${index}` }
                                renderItem={renderItem}
                                ItemSeparatorComponent={Separator}></FlatList>
                        </View>
                    </View>
            </>
        )
    }
    else {
        
        return (
            <>
                <View style={styles.pressableOuter}>
                    <Pressable onPress={backHome}>
                        <Image
                            resizeMode='contain'
                            style={styles.backButton}
                            source={require('../../img/arrow.png')}
                        />
                    </Pressable>
                </View>
                <View style={styles.outer}>
                    <Header name={subjectName}/>
                </View>


            </>

        )
    }

}