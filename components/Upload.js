import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { scaleOrdinal, arc, pie } from 'd3';
import Svg, { G, Path } from 'react-native-svg';

export default function Upload() {
    const title = "Upload";
    const description = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus vero similique eos natus necessitatibus voluptas unde quo consequuntur laudantium illo.";
    const apiUrl = "https://mlalgorithmsapi.herokuapp.com/prediction";

    const [image, setImage] = useState(null);
    const [results, setResults] = useState([]);

    const width = Dimensions.get('window').width * 0.8;
    const height = Dimensions.get('window').height * 0.3;
    const margin = { top: 10, bottom: 10, left: 10, right: 10 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const innerRadius = width / 3;
    const outerRadius = width / 5;


    const colorScale = scaleOrdinal().domain(results.map(r => r.result)).range(['red', 'green', 'blue', 'yellow']);
    const ar = arc().innerRadius(innerRadius).outerRadius(outerRadius);
    let data = {};
    results.forEach(d => {
        if (!data.hasOwnProperty(d.result)) {
            data[d.result] = 0;
        }
        data[d.result] += 1;
    });
    data = Object.entries(data);
    const pi = pie().padAngle(0.04).value(d => d[1]);
    const arcs = pi(data);

    let predictions = {};
    results.forEach(res => {
        if (!predictions.hasOwnProperty(res.result)) {
            predictions[res.result] = 0;
        }
        predictions[res.result] += 1;
    });

    let pred = [];
    Object.keys(predictions).forEach(key => pred.push([key, predictions[key]]));
    pred.sort(function (a, b) {
        return b[1] - a[1];
    });

    const pickImage = async () => {
        setResults([]);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    const setImageAction = async () => {
        const formData = new FormData();
        formData.append("upImage", { uri: image, name: 'test.jpg', type: 'image/jpg' });
        console.log("Started...");
        const data = await fetch(apiUrl, {
            method: "post",
            header: {
                "Content-Type": "multipart/form-data"
            },
            body: formData,
        });
        console.log("Finished...");
        const response = await data.json();
        setResults(response);
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleDesc}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <View style={styles.form}>
                {
                    results.length ?
                        <View style={styles.legendsAndSvg}>
                            <View style={styles.legends}>
                                {
                                    data.map(d =>
                                        <View key={d[0]} style={styles.legend}>
                                            <View style={{ width: 20, height: 20, borderRadius: 5, backgroundColor: colorScale(d[0]) }}></View>
                                            <Text style={{ marginLeft: 5, fontSize: 12 }}>{d[0].split(' ')[0]}{'\n'}{d[0].split(' ')[1]}</Text>
                                        </View>
                                    )
                                }
                            </View>
                            <Svg width={width} height={height} style={{ alignSelf: 'center', marginTop: 10 }}>
                                <G transform={`translate(${margin.left}, ${margin.top})`}>
                                    <G transform={`translate(${innerWidth / 2}, ${innerHeight / 2})`}>
                                        {
                                            arcs.map((d, i) => <Path key={i} d={ar(d)} fill={colorScale(d.data[0])} />)
                                        }
                                    </G>
                                </G>
                            </Svg>
                            <Text style={{ alignSelf: 'center' }}>Prediction: {pred[0][0]}</Text>
                        </View> : null
                }
                {image ? <Image style={styles.imageMri} source={{ uri: image }} /> : null}
                <TouchableOpacity style={styles.chooseImage} onPress={pickImage}>
                    <Text>Choose Image</Text>
                </TouchableOpacity>
                {!image ? <Text style={styles.errorText}>No Image Chosen</Text> : null}
                <TouchableOpacity style={styles.submitButton} onPress={setImageAction}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: Dimensions.get('window').width * 0.9,
        paddingVertical: 15,
        paddingHorizontal: 10,
        margin: 20,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#eee',
        borderRadius: 15,
    },
    titleDesc: {
        marginBottom: 10,
    },
    title: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontSize: 19,
        color: 'black',
        textTransform: 'uppercase',
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        color: "#222",
        textAlign: 'center',
    },
    form: {
        marginVertical: 20,
    },
    chooseImage: {
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,0,0.4)',
    },
    errorText: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 13,
        marginTop: 2,
    },
    submitButton: {
        marginVertical: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255,0,0,0.3)',
        alignSelf: 'center',
    },
    imageMri: {
        alignSelf: 'center',
        width: 150,
        height: 150,
        marginBottom: 15,
        borderRadius: 10,
    },
    legend: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legends: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    legendsAndSvg: {
        marginBottom: 15,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.5)'
    }
})