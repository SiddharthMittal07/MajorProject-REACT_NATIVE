import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, LogBox } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect } from 'react';



export default function Footer() {
    const title = 'Motivation';
    const description = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus vero similique eos natus necessitatibus voluptas unde quo consequuntur laudantium illo.";
    const members = [{ name: 'Siddharth Mittal', id: '1' }, { name: 'Shreyansh Yadav', id: '2' }, { name: 'Shubham Rawat', id: '3' }, { name: 'Devashree Sharma', id: '4' }];

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);

    function modifyName(name) {
        return name.split(' ')[0] + '\n' + name.split(' ')[1];
    }

    return (
        <View style={styles.container}>
            <View style={styles.motivation}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <FlatList
                style={styles.links}
                data={members}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.linkTag}>
                        <FontAwesome name="linkedin-square" size={30} color="blue" />
                        <Text style={styles.linkText}>{modifyName(item.name)}</Text>
                    </TouchableOpacity>
                )}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                scrollEnabled={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.9,
        marginVertical: 10,
        alignSelf: 'center',
    },
    motivation: {
        marginBottom: 10,
    },
    title: {
        fontSize: 17,
        textDecorationLine: 'underline',
        color: '#191970',
        marginBottom: 5,
    },
    links: {
        alignSelf: 'center',
        width: '80%',
        padding: 20,
    },
    linkTag: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    linkText: {
        color: 'blue',
        fontSize: 14,
        marginLeft: 5,
    }
})