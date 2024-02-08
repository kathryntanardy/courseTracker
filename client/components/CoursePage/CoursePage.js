import { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, FlatList, Button } from 'react-native'
import styles from './CoursePageStyles.js';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useQuery } from 'react-query';
import { getItems } from '../../functions.js';
import AddItemMenu from '../AddItemMenu/AddItemMenu.js';

const Separator = () => <View style={styles.separator} />;
const CoursePage = ({ navigation, route }) => {
  
    const [addItemMenu, setAddItemMenu] = useState(false);

    const { data, refetch } = useQuery({
        queryKey: ["getItems"],
        queryFn: () => getItems(route.params.name),
    });

    const handlePress = (item) => {
        item.colour = route.params.colour;
        navigation.navigate('Item', item);
    };

    const goBack = () => {
        navigation.navigate('Home');
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => handlePress(item)}
        >
            <View style={styles.innerContainer}>
                <View style={styles.courseInfo}>
                    <Text style={styles.courseName}>{item.name}</Text>    
                    <Text style={styles.courseCredits}>{item.grade} / {item.weight}</Text>
                </View>
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