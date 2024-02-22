import { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, FlatList, Button } from 'react-native'
import styles from './CoursePageStyles.js';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useQuery } from 'react-query';
import { getCourse } from '../../functions.js';
import AddItemMenu from '../AddItemMenu/AddItemMenu.js';
import DeleteItemMenu from '../DeleteItemMenu/DeleteItemMenu.js';
import * as Progress from 'react-native-progress';

const Separator = () => <View style={styles.separator} />;
const CoursePage = ({ navigation, route }) => {
  
    const [addItemMenu, setAddItemMenu] = useState(false);
    const [editItemMenu, setEditItemMenu] = useState(false);
    const [editItemData, setEditItemData] = useState({});
    const [deleteItemMenu, setDeleteItemMenu] = useState(false);
    const [displayItemOptions, setDisplayItemOptions] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [itemToDelete, setItemToDelete] = useState("");

    const { data, refetch } = useQuery({
        queryKey: "getCourse",
        queryFn: () => getCourse(route.params.subject.name)
    })

    const handlePress = (item) => {
        item.courseName = data.name;
        item.colour = data.colour;
        navigation.navigate('Item', {
            item: item,
            refetch: () => refetch()
        });
    };

    const openEditItemMenu = (item) => {

        setEditItemData(item);
        setEditItemMenu(true);
        setAddItemMenu(true);

    };

    const deleteItem = (itemName) => {
        setItemToDelete(itemName);
        setDeleteItemMenu(true);
    }

    const displayGrade = (itemPercentage, isNotCircle = true) => {

        if (isNotCircle) {
            if (itemPercentage === -1) {
                return "";
            }
        }

        itemPercentage *= 100;

        if (Number.isInteger(itemPercentage)) {
            return `${itemPercentage}%`;
        } else {
            return `${itemPercentage.toFixed(2)}%`;
        }
    };

    const setSelectedItemID = (itemID) => {
        setSelectedItem(itemID);
        setDisplayItemOptions(true);
    };

    const goBack = () => {
        route.params.refetch();
        navigation.navigate('Home');
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => handlePress(item)}
            onLongPress={() => setSelectedItemID(item._id)}
        >
            <View style={styles.innerContainer}>
                <View style={styles.courseInfo}>
                    <Text style={styles.courseName}>{item.name} ({item.weight}%)</Text>    
                    <Text style={styles.courseCredits}>
                        {displayGrade(item.grade)}
                    </Text>
                </View>
                {displayItemOptions && selectedItem === item._id ? (
                <View style={styles.displayItemOptionsContainer}>
                    <TouchableOpacity>
                        <AntIcon 
                            style={styles.editItemButton}
                            size={20}
                            name="edit" 
                            backgroundColor={data?.colour.hex}
                            onPress={() => openEditItemMenu(item)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntIcon 
                            style={styles.editItemButton}
                            size={20}
                            name="delete" 
                            backgroundColor={data?.colour.hex}
                            onPress={() => deleteItem(item.name)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntIcon 
                            style={styles.editItemButton}
                            size={20}
                            name="back" 
                            backgroundColor={data?.colour.hex}
                            onPress={() => {
                                setSelectedItem("");
                                setDisplayItemOptions(false);
                            }}
                        />
                    </TouchableOpacity>
                </View>
                ) : (<></>)}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ marginTop: StatusBar.currentHeight, height: '100%' }}>
            {addItemMenu ? (
                <AddItemMenu 
                    courseName={data?.name}
                    refetch={refetch}
                    setAddItemMenu={setAddItemMenu}
                    editItemMenu={editItemMenu}
                    setEditItemMenu={setEditItemMenu}
                    editItemData={editItemData}
                />
            ) : (<></>)}
            {deleteItemMenu ? (
                <DeleteItemMenu
                    courseName={data?.name}
                    itemName={itemToDelete}
                    refetch={refetch}
                    setDeleteItemMenu={setDeleteItemMenu}
                />
            ) : (<></>)}
            <View style={[styles.headerContainer, { backgroundColor: data?.colour.hex }]}>
                <View style={styles.backButtonWrapper}>
                    <TouchableOpacity onPress={goBack} >
                        <AntIcon name="back" color="white" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerTextWrapper}>
                    <Text style={styles.headerText}>
                        {data?.name}
                    </Text>
                </View>
                <View style={styles.addItemButtonContainer}>
                    <TouchableOpacity onPress={() => setAddItemMenu(true)}>
                        <AntIcon name="pluscircleo" color="white" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.courseProgressDisplayContainer}>
                <View style={styles.courseProgressGrade}>
                    <Progress.Circle 
                        color={data?.colour.hex}
                        unfilledColor='lightgrey'
                        borderWidth={0}
                        size={100} 
                        progress={data?.grade} 
                        showsText 
                        formatText={() => `Grade: ${displayGrade(data?.grade, false)}`} 
                        textStyle={styles.progressCircleText}
                    />
                </View>
                <View style={styles.courseProgressVerticalLine} />
                <View style={styles.courseProgressPercentage}>
                    <Progress.Circle 
                        color={data?.colour.hex}
                        unfilledColor='lightgrey'
                        borderWidth={0}
                        size={100} 
                        progress={data?.progress} 
                        showsText 
                        formatText={() => `Progress: ${displayGrade(data?.progress, false)}`} 
                        textStyle={styles.progressCircleText}
                    />
                </View>
            </View>
            <View style={styles.flatListContainer}>
                <FlatList
                    style={styles.flatListItem}
                    data={data?.items}
                    keyExtractor={item => item._id}
                    renderItem={renderItem}
                    ItemSeparatorComponent={Separator}
                />
            </View>
        </View>
    )
}

export default CoursePage