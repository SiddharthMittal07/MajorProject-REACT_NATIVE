import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';

import Graph from '../components/Graph';
import useResults from '../components/useResults';

export default function Results() {
    const data = useResults();
    const title = "Results";
    const description = "We have used 6 Supervised Machine Learning Algorithms, namely: Support Vector Machine, Decision Tree Classification, Logistic Regression, Naive Bayes Classification, Random Forest Algorithm, and K-Nearest Neighbors. The results are observed on the basis of 4 metrics of Precision, Recall, Accuracy and Processing Time.";
    const valueToLabel = [
        { value: 'testing_accuracy', label: 'ACCURACY' },
        { value: 'time', label: 'TIME' },
        { value: 'precision_score', label: 'PRECISION' },
        { value: 'recall_score', label: 'RECALL' }
    ];
    const factorDef = {
        'testing_accuracy': 'Accuracy is defined as the percentage of correct predictions for the test data. It can be calculated easily by dividing the number of correct predictions by the number of total predictions.',
        'time': 'Time complexity can be seen as the measure of how fast or slow an algorithm will perform for the input size. Time complexity is always given with respect to some input size (say n).',
        'precision_score': 'Precision is one indicator of a machine learning model\'s performance – the quality of a positive prediction made by the model. Precision refers to the number of true positives divided by the total number of positive predictions.',
        'recall_score': 'Recall literally is how many of the true positives were recalled (found), i.e. how many of the correct hits were also found.'
    };
    const [yAttribute, setYAttribute] = useState('testing_accuracy');

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.titleText}>{title.toUpperCase()}</Text>
                <Text style={styles.descriptionText}>{description}</Text>
            </View>
            <View style={styles.factors}>
                {
                    valueToLabel.map(d =>
                        <TouchableOpacity
                            key={d.value}
                            onPress={() => setYAttribute(d.value)}
                            style={yAttribute === d.value ? styles.factorSelected : styles.factor}
                        >
                            <Text style={yAttribute === d.value ? styles.textSelected : styles.factorText}>{d.label}</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <View style={styles.factorDefinition}>
                <Text>{factorDef[yAttribute]}</Text>
            </View>
            {
                data &&
                <Graph yAttribute={yAttribute} data={data} />
            }
            {
                data &&
                <View>
                    <Text style={{ alignSelf: 'center', marginTop: 25, marginBottom: 5, color: '#191970', fontWeight: '500', fontSize: 18, }}>RESULTS TABLE</Text>
                    <DataTable style={styles.table}>
                        <DataTable.Header style={{ flexDirection: 'row' }}>
                            <DataTable.Title style={{ flex: 1.5, borderWidth: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={styles.title}>Algorithm</Text>
                            </DataTable.Title>
                            <DataTable.Title style={{ borderWidth: 1, borderLeftWidth: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={styles.title}>Accuracy</Text>
                            </DataTable.Title>
                            <DataTable.Title style={{ borderWidth: 1, borderLeftWidth: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={styles.title}>Precision</Text>
                            </DataTable.Title>
                            <DataTable.Title style={{ borderWidth: 1, borderLeftWidth: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={styles.title}>Time</Text>
                            </DataTable.Title>
                        </DataTable.Header>
                        {
                            data.map(d =>
                                <DataTable.Row key={d.algorithm} style={{ flexDirection: 'row' }}>
                                    <DataTable.Cell style={{ flex: 1.5, borderWidth: 1, borderTopWidth: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                        <Text style={styles.colTitle}>{d.algorithm}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{ backgroundColor: d.testing_accuracy > 0.8 && 'green', borderWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                        <Text style={{ color: d.testing_accuracy > 0.8 ? 'white' : 'black', fontWeight: d.testing_accuracy > 0.8 ? 'bold' : '400', fontSize: 15 }}>{d.testing_accuracy.toFixed(2)}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{ backgroundColor: d.testing_accuracy > 0.8 && 'green', borderWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                        <Text style={{ color: d.testing_accuracy > 0.8 ? 'white' : 'black', fontWeight: d.testing_accuracy > 0.8 ? 'bold' : '400', fontSize: 15 }}>{d.precision_score.toFixed(2)}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{ backgroundColor: d.time > 100 && 'red', borderWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                        <Text style={{ color: d.time > 100 ? 'white' : 'black', fontWeight: d.testing_accuracy > 0.8 ? 'bold' : '400', fontSize: 15 }}>{d.time.toFixed(2)}ms</Text>
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
                        }
                    </DataTable>
                </View>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.9,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 25,
    },
    titleText: {
        fontSize: 20,
        color: '#191970',
        fontWeight: '500',
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 14,
        color: 'rgba(0,0,0,0.5)'
    },
    factors: {
        width: Dimensions.get('window').width * 0.95,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    factor: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
    },
    factorSelected: {
        backgroundColor: '#191970',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    textSelected: {
        color: 'white',
    },
    factorText: {
        color: 'black',
    },
    factorDefinition: {
        marginBottom: 20,
        width: Dimensions.get('window').width * 0.95,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,100,0.2)',
        padding: 10,
        borderRadius: 15,
    },
    table: {
        width: Dimensions.get('window').width,
        alignSelf: 'center',
        marginBottom: 25,
    },
    title: {
        fontSize: 13,
        color: '#191970',
        textTransform: 'uppercase'
    },
    colTitle: {
        fontSize: 13,
    }
})