import { View, Text, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import styles from './CoursePageStyles.js';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useQuery } from 'react-query';
import { getItems } from '../../functions.js';

const Separator = () => <View style={styles.separator} />;
const CoursePage = ({ navigation, route }) => {
  
    const { data } = useQuery({
        queryKey: ["getItems"],
        queryFn: () => getItems(route.params.name),
    });

    const goBack = () => {
        navigation.navigate('Home');
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity>
            <View style={styles.innerContainer}>
                <View style={styles.courseInfo}>
                    <Text style={styles.courseName}>{item.name}</Text>    
                    <Text style={styles.courseCredits}>{item.grade} / {item.weight}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ marginTop: StatusBar.currentHeight }}>
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