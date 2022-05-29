import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

export default function Header() {
    const title = "Predictive Analysis for Brain Cancer Detection using Machine Learning Techniques";

    return (
        <View style={styles.header}>
            <View style={styles.bottomStyle}></View>
            <View style={styles.outer}>
                <View style={styles.container}>
                    <Text style={styles.title}>{title}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => { }}>
                        <Text style={styles.buttonText}>Try It Yourself!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        postion: 'relative',
    },
    outer: {
        backgroundColor: "#191970",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 15,
        paddingBottom: 25,
        marginBottom: 50,
    },
    container: {
        width: Dimensions.get('window').width * 0.8,
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        color: '#fff',
        marginBottom: 10,
    },
    button: {
        alignSelf: 'center',
        backgroundColor: 'red',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 7,
        marginTop: 15,
    },
    buttonText: {
        fontSize: 17,
        color: "#fff",
    },
    bottomStyle: {
        width: Dimensions.get('window').width * 0.33,
        height: 250,
        transform: [{ scaleX: 4 }],
        backgroundColor: '#191970',
        borderRadius: 400,
        position: 'absolute',
        left: Dimensions.get('window').width * 0.3,
        top: -20,
    }
})