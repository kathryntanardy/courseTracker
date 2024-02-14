import { View, Text, TouchableOpacity, StatusBar, FlatList, Button } from 'react-native'
import { useState } from 'react'
import { getItem } from '../../functions.js';
import { useQuery } from 'react-query';
import AntIcon from 'react-native-vector-icons/AntDesign';

import styles from './ItemPageStyles.js';
import AddSubItemMenu from '../AddSubItemMenu/AddSubItemMenu.js';
import DeleteSubItemMenu from '../DeleteSubItemMenu/DeleteSubItemMenu.js';
import * as Progress from 'react-native-progress';

const Separator = () => <View style={styles.separator} />;
const ItemPage = ({ navigation, route }) => {
  
    const [subItemToDelete, setSubItemToDelete] = useState("");
    const [addSubItemMenu, setAddSubItemMenu] = useState(false);
    const [deleteSubItemMenu, setDeleteSubItemMenu] = useState(false);
    const [displaySubItemOptions, setDisplaySubItemOptions] = useState(false);
    const [editSubItemMenu, setEditSubItemMenu] = useState(false);
    const [editSubItemData, setEditSubItemData] = useState({});
    const [selectedSubItem, setSelectedSubItem] = useState("");

    const { data, refetch } = useQuery({
        queryKey: "getItem",
        queryFn: () => getItem({ 
            courseName: route.params.item.courseName,
            itemName: route.params.item.name 
        })
    });

    const openEditSubItemMenu = (item) => {
        setEditSubItemData(item);
        setEditSubItemMenu(true);
        setAddSubItemMenu(true);
    };

    const setSelectedSubItemID = (itemID) => {
        setSelectedSubItem(itemID);
        setDisplaySubItemOptions(true);
    };
    
    const deleteSubItem = (subItemName) => {
        setSubItemToDelete(subItemName);
        setDeleteSubItemMenu(true);
    };

    const displayGrade = (itemGrade) => {

        if (itemGrade === -1) {
            return "0%";
        }
        
        itemGrade *= 100;
        
        if (Number.isInteger(itemGrade)) {
            return `${itemGrade}%`;
        } else {
            return `${itemGrade.toFixed(2)}%`;
        }

    };

    const goBack = () => {
        route.params.refetch();
        navigation.goBack();
    };
    
    const renderItem = ({ item }) => (
        <TouchableOpacity
            onLongPress={() => setSelectedSubItemID(item._id)}
        >
            <View style={styles.innerContainer}>
                <View style={styles.courseInfo}>
                    <Text style={styles.courseName}>{item.name} ({item.weight}%)</Text>    
                    <Text style={styles.courseCredits}>{item.marksGiven} / {item.totalMarks}</Text>
                </View>
                {displaySubItemOptions && selectedSubItem === item._id ? (
                <View style={styles.displaySubItemOptionsContainer}>
                    <TouchableOpacity>
                        <AntIcon 
                            style={styles.editSubItemButton}
                            size={20}
                            name="edit" 
                            backgroundColor={route.params.item.colour}
                            onPress={() => openEditSubItemMenu(item)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntIcon 
                            style={styles.editSubItemButton}
                            size={20}
                            name="delete" 
                            backgroundColor={route.params.item.colour}
                            onPress={() => deleteSubItem(item.name)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntIcon 
                            style={styles.editSubItemButton}
                            size={20}
                            name="back" 
                            backgroundColor={route.params.item.colour}
                            onPress={() => {
                                setSelectedSubItem("");
                                setDisplaySubItemOptions(false);
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
            {addSubItemMenu ? (
                <AddSubItemMenu
                    courseName={route.params.item.courseName}
                    itemName={data?.name}
                    refetch={refetch}
                    setAddSubItemMenu={setAddSubItemMenu}
                    editSubItemMenu={editSubItemMenu}
                    setEditSubItemMenu={setEditSubItemMenu}
                    editSubItemData={editSubItemData}
                />
            ) : (<></>)}
            {deleteSubItemMenu ? (
                <DeleteSubItemMenu 
                    courseName={route.params.item.courseName}
                    itemName={data?.name}
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
                        {data?.name}
                    </Text>
                </View>
                <View style={styles.addItemButtonContainer}>
                    <TouchableOpacity onPress={() => setAddSubItemMenu(true)}>
                        <AntIcon name="pluscircleo" color="white" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.itemProgressDisplayContainer}>
                <View style={styles.itemProgressGrade}>
                    <Progress.Circle 
                        color={route.params.item.colour}
                        unfilledColor='lightgrey'
                        borderWidth={0}
                        size={100} 
                        progress={data?.grade}
                        showsText 
                        formatText={() => `Grade: ${displayGrade(data?.grade)}`} 
                        textStyle={styles.progressCircleText}
                    />
                </View>
                <View style={styles.itemProgressVerticalLine} />
                <View style={styles.itemProgressPercentage}>
                    <Progress.Circle
                        color={route.params.item.colour}
                        unfilledColor='lightgrey'
                        borderWidth={0}
                        size={100}
                        progress={data?.progress} 
                        showsText
                        formatText={() => `Progress: ${displayGrade(data?.progress)}`} 
                        textStyle={styles.progressCircleText}
                    />
                </View>
            </View>
            <View style={styles.flatListContainer}>
                <FlatList
                    style={styles.flatListItem}
                    data={data?.subItems}
                    keyExtractor={item => item._id}
                    renderItem={renderItem}
                    ItemSeparatorComponent={Separator}
                />
            </View>
        </View>
    )
}

export default ItemPage