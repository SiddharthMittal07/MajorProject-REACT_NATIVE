import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function Result({ navigation }) {
    const title = "Results";
    const description = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus vero similique eos natus necessitatibus voluptas unde quo consequuntur laudantium illo.";

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.push('Results')}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <Entypo name="chevron-right" size={24} color="white" />
            </View>
            <Text style={styles.description}>{description}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.9,
        alignSelf: 'center',
        backgroundColor: '#191970',
        padding: 15,
        borderRadius: 15,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        color: '#fff',
    },
    description: {
        fontSize: 14,
        color: '#aaa',
    }
})