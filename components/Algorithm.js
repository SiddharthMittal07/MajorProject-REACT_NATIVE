import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import useData from './useData';

export default function Algorithm({ navigation }) {
    const title = "Algorithms";
    const description = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus vero similique eos natus necessitatibus voluptas unde quo consequuntur laudantium illo.";
    const algorithms = ['Logistic Regression', 'Support Vector Machine', 'Naive Bayes', 'K-Nearest Neighbors', 'Decision Trees', 'Random Forest'];
    const data = useData();

    return (
        <View style={styles.outer}>
            <View style={styles.container}>
                <View style={styles.titleHeader}>
                    <Text style={styles.titleText}>{title}</Text>

                </View>
                <Text style={styles.description}>{description}</Text>
            </View>
            {
                !data ? <Text style={{ alignSelf: 'center' }}>Loading...</Text> :
                    <ScrollView
                        style={styles.carousel}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            data.map(d => (
                                <TouchableOpacity
                                    style={styles.summaryContainer}
                                    key={d.algorithm}
                                    onPress={() => navigation.navigate('Algorithms', d)}
                                >
                                    <Text style={styles.summaryText}>{d.algorithm}</Text>
                                    <Text style={styles.summaryDescription}>{d.information.main}</Text>
                                    <Text style={styles.showMore}>show more...</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    outer: {
        display: 'flex',
        paddingVertical: 20,
    },
    container: {
        width: Dimensions.get('window').width * 0.9,
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: '#191970',
        borderRadius: 15,
        alignSelf: 'center',
        marginBottom: 10,
    },
    titleHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    titleText: {
        color: '#fff',
        fontSize: 16,
    },
    icon: {
        color: '#fff',
        fontSize: 20,
        marginRight: 20,
    },
    description: {
        fontSize: 14,
        color: '#aaa',
    },
    carousel: {
        height: 130,
    },
    summaryContainer: {
        height: 120,
        width: Dimensions.get('window').width * 0.7,
        borderColor: '#111',
        borderWidth: 1,
        marginHorizontal: 10,
        borderRadius: 10,
        alignSelf: 'center',
        padding: 5,
        backgroundColor: '#fff',
    },
    summaryText: {
        fontSize: 15,
        textAlign: 'center',
    },
    summaryDescription: {
        fontSize: 13,
        height: 65,
        overflow: 'hidden',
        color: '#222',
        paddingHorizontal: 5,
    },
    showMore: {
        color: 'blue',
        fontSize: 12,
        textAlign: 'right',
        marginRight: 5,
    }
})