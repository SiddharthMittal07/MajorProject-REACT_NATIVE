import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { DataTable } from 'react-native-paper';

function modifyTitle(name) {
    const words = name.split(' ');
    if (words.length > 3) {
        return words.slice(0, 3).join('\n');
    }
    return words.join('\n');
}

export default function Algorithms({ navigation }) {
    const information = navigation.getParam('information');
    const matrix = navigation.getParam('confusion_matrix');

    return (
        <ScrollView>
            <View style={styles.header}>
                <View style={styles.bottomStyle}></View>
                <View style={styles.container}>
                    <Text style={styles.headerTitle}>{modifyTitle(navigation.getParam('algorithm'))}</Text>
                </View>
            </View>
            <View style={styles.description}>
                <Text style={styles.descriptionText}>{information.main}</Text>
            </View>
            <View style={styles.application}>
                <Text style={styles.applicationTitle}>Applications:</Text>
                {
                    information.applications.map(app => (
                        <View key={app} style={styles.applicationBullet}>
                            <Entypo name="dot-single" size={20} color="black" />
                            <Text style={styles.applicationText}>{app}</Text>
                        </View>
                    ))
                }
            </View>
            <View style={styles.table}>
                <DataTable style={{ borderWidth: 1, borderRadius: 10 }}>
                    <DataTable.Header style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title style={{ borderLeftColor: 'black', borderLeftWidth: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={styles.title}>Present</Text>
                        </DataTable.Title>
                        <DataTable.Title style={{ borderLeftColor: 'black', borderLeftWidth: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={styles.title}>Absent</Text>
                        </DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}>
                        <DataTable.Cell>
                            <Text style={styles.title}>Present</Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ borderLeftColor: 'black', borderLeftWidth: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ color: 'green', fontWeight: '500', fontSize: 17 }}>{matrix[0][0]}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ borderLeftColor: 'black', borderLeftWidth: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ color: 'red', fontWeight: '500', fontSize: 17 }}>{matrix[0][1]}</Text>
                        </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>
                            <Text style={styles.title}>Absent</Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ borderLeftColor: 'black', borderLeftWidth: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ color: 'red', fontWeight: '500', fontSize: 17 }}>{matrix[1][0]}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ borderLeftColor: 'black', borderLeftWidth: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ color: 'green', fontWeight: '500', fontSize: 17 }}>{matrix[1][1]}</Text>
                        </DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </View>
            <View style={styles.prosCons}>
                <View style={styles.col}>
                    <Text style={[styles.colTitle, styles.pros]}>Pros:</Text>
                    {
                        information.pros.map(app => (
                            <View key={app} style={styles.colRow}>
                                <Text style={styles.colText}>- {app}</Text>
                            </View>
                        ))
                    }
                </View>
                <View style={styles.col}>
                    <Text style={[styles.colTitle, styles.cons]} > Cons:</Text>
                    {
                        information.cons.map(app => (
                            <View key={app} style={styles.colRow}>
                                <Text style={styles.colText}>- {app}</Text>
                            </View>
                        ))
                    }
                </View>
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'relative',
        paddingBottom: 60,
    },
    container: {
        backgroundColor: '#191970',
        flexDirection: 'row',
        height: Dimensions.get('window').height * 0.3,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 34,
        alignSelf: 'flex-end',
        marginHorizontal: 20,
    },
    bottomStyle: {
        height: 200,
        backgroundColor: '#191970',
        borderRadius: 200,
        width: Dimensions.get('window').width * 0.5,
        transform: [{ scaleX: 3 }],
        position: 'absolute',
        top: 80,
        left: 45,
    },
    description: {
        alignSelf: 'center',
        width: Dimensions.get('window').width * 0.9,
        marginVertical: 10,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(150,150,150,0.1)',
        borderRadius: 10,
    },
    descriptionText: {
        fontSize: 14,
        color: '#4f4f4f'
    },
    application: {
        width: Dimensions.get('window').width * 0.9,
        alignSelf: 'center',
        marginVertical: 10,
    },
    applicationTitle: {
        fontSize: 17,
        color: '#191970',
        textTransform: 'uppercase',
    },
    applicationBullet: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    applicationText: {
        fontSize: 15,
    },
    prosCons: {
        width: Dimensions.get('window').width * 0.95,
        alignSelf: 'center',
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: '#191970',
        borderRadius: 15,
        padding: 10,
        justifyContent: 'space-around',
    },
    col: {
        width: '45%',
    },
    colRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 5,
        width: '100%',
    },
    colText: {
        fontSize: 13,
        color: 'white',
    },
    colTitle: {
        fontSize: 16,
        marginBottom: 5,
    },
    pros: {
        color: 'yellow',
    },
    cons: {
        color: 'red',
    },
    table: {
        width: Dimensions.get('window').width * 0.95,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 30,
    },
    title: {
        alignSelf: 'center',
        color: '#191970',
        fontSize: 15,
        fontWeight: 'bold',
    }
})