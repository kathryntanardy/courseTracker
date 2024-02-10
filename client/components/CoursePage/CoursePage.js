import { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, FlatList, Button } from 'react-native'
import styles from './CoursePageStyles.js';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useQuery } from 'react-query';
import { getItems } from '../../functions.js';
import AddItemMenu from '../AddItemMenu/AddItemMenu.js';
import DeleteItemMenu from '../DeleteItemMenu/DeleteItemMenu.js';

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
        queryKey: ["getItems"],
        queryFn: () => getItems(route.params.name),
    });

    const handlePress = (item) => {
        item.courseName = route.params.name;
        item.colour = route.params.colour;
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

    const displayGrade = (itemPercentage) => {

        if (itemPercentage === -1) {
            return "";
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
                        {displayGrade(item.percentage)}
                    </Text>
                </View>
                {displayItemOptions && selectedItem === item._id ? (
                <View style={styles.displayItemOptionsContainer}>
                    <TouchableOpacity>
                        <AntIcon 
                            style={styles.editItemButton}
                            size={20}
                            name="edit" 
                            backgroundColor={route.params.colour}
                            onPress={() => openEditItemMenu(item)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntIcon 
                            style={styles.editItemButton}
                            size={20}
                            name="delete" 
                            backgroundColor={route.params.colour}
                            onPress={() => deleteItem(item.name)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntIcon 
                            style={styles.editItemButton}
                            size={20}
                            name="back" 
                            backgroundColor={route.params.colour}
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
                    courseName={route.params.name}
                    refetch={refetch}
                    setAddItemMenu={setAddItemMenu}
                    editItemMenu={editItemMenu}
                    setEditItemMenu={setEditItemMenu}
                    editItemData={editItemData}
                />
            ) : (<></>)}
            {deleteItemMenu ? (
                <DeleteItemMenu
                    courseName={route.params.name}
                    itemName={itemToDelete}
                    refetch={refetch}
                    setDeleteItemMenu={setDeleteItemMenu}
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
                    title="Add Item"
                    onPress={() => setAddItemMenu(true)}
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

export default CoursePage