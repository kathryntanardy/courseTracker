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

const Separator = () => <View style={styles.separator} />;
const ItemPage = ({ navigation, route }) => {
  
    const [addSubItemMenu, setAddSubItemMenu] = useState(false);

    const { data, refetch } = useQuery({
        queryKey:["getSubItems"],
        queryFn: () => getSubItems({ 
                courseName: route.params.courseName,
                itemName: route.params.name  
            })
    });

    const goBack = () => {
        navigation.dispatch(StackActions.pop());
    };
    
    const renderItem = ({ item }) => (
        <TouchableOpacity>
            <View style={styles.innerContainer}>
                <View style={styles.courseInfo}>
                    <Text style={styles.courseName}>{item.subName}</Text>    
                    <Text style={styles.courseCredits}>{item.subGrade} / {item.subWeight}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ marginTop: StatusBar.currentHeight, height: '100%' }}>
            {addSubItemMenu ? (
                <AddSubItemMenu
                    courseName={route.params.courseName}
                    itemName={route.params.name}
                    refetch={refetch}
                    setAddSubItemMenu={setAddSubItemMenu}
                />
            ) : (<></>)}
            <View style={[styles.headerContainer, { backgroundColor: route.params.colour }]}>
                <View style={styles.backButtonWrapper}>
                    <TouchableOpacity onPress={goBack} >
                        <AntIcon name="back" color="white" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerTextWrapper}>
                    <Text style={styles.headerText}>
                        {route.params.name}
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