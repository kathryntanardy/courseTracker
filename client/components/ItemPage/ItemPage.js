import { View, Text, TouchableOpacity, StatusBar, FlatList, Button } from 'react-native'
import { useState } from 'react'
import { getSubItems } from '../../functions.js';
import { useQuery } from 'react-query';
import AddCourseMenu from '../AddCourseMenu/AddCourseMenu.js';
import DeleteCourseMenu from '../DeleteCourseMenu/DeleteCourseMenu.js';
import AntIcon from 'react-native-vector-icons/AntDesign';

import styles from './ItemPageStyles.js';
import { StackActions } from '@react-navigation/native';
import AddSubItemMenu from '../AddSubItemMenu/AddSubItemMenu.js';
import DeleteSubItemMenu from '../DeleteSubItemMenu/DeleteSubItemMenu.js';

const Separator = () => <View style={styles.separator} />;
const ItemPage = ({ navigation, route }) => {
  
    const [subItemToDelete, setSubItemToDelete] = useState("");
    const [addSubItemMenu, setAddSubItemMenu] = useState(false);
    const [deleteSubItemMenu, setDeleteSubItemMenu] = useState(false);

    const { data, refetch } = useQuery({
        queryKey:["getSubItems"],
        queryFn: () => getSubItems({ 
                courseName: route.params.item.courseName,
                itemName: route.params.item.name  
            })
    });

    const deleteSubItem = (subItemName) => {
        setSubItemToDelete(subItemName);
        setDeleteSubItemMenu(true);
    };

    const goBack = () => {
        route.params.refetch();
        navigation.goBack();
    };
    
    const renderItem = ({ item }) => (
        <TouchableOpacity
            onLongPress={() => deleteSubItem(item.name)}
        >
            <View style={styles.innerContainer}>
                <View style={styles.courseInfo}>
                    <Text style={styles.courseName}>{item.name} ({item.weight}%)</Text>    
                    <Text style={styles.courseCredits}>{item.grade} / {item.totalMarks}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ marginTop: StatusBar.currentHeight, height: '100%' }}>
            {addSubItemMenu ? (
                <AddSubItemMenu
                    courseName={route.params.item.courseName}
                    itemName={route.params.item.name}
                    refetch={refetch}
                    setAddSubItemMenu={setAddSubItemMenu}
                />
            ) : (<></>)}
            {deleteSubItemMenu ? (
                <DeleteSubItemMenu 
                    courseName={route.params.item.courseName}
                    itemName={route.params.item.name}
                    subItemName={subItemToDelete}
                    refetch={refetch}
                    setDeleteSubItemMenu={setDeleteSubItemMenu}
                />
            ) : (<></>)}
            <View style={[styles.headerContainer, { backgroundColor: route.params.item.colour }]}>
                <View style={styles.backButtonWrapper}>
                    <TouchableOpacity onPress={goBack} >
                        <AntIcon name="back" color="white" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerTextWrapper}>
                    <Text style={styles.headerText}>
                        {route.params.item.name}
                    </Text>
                </View>
            </View>
            <View>
                <Button
                    title="Add SubItem"
                    onPress={() => setAddSubItemMenu(true)}
                />
            </View>
            <View style={styles.flatListContainer}>
                <FlatList
                    style={styles.flatListItem}
                    data={data}
                    keyExtractor={item => item._id}
                    renderItem={renderItem}
                    ItemSeparatorComponent={Separator}
                />
            </View>
        </View>
    )
}

export default ItemPage