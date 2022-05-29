import { ScrollView } from 'react-native';
import Header from '../components/Header';
import Algorithm from '../components/Algorithm';
import Result from '../components/Result';
import Upload from '../components/Upload';
import Footer from '../components/Footer';

export default function Home({ navigation }) {
    return (
        <ScrollView>
            <Header />
            <Algorithm navigation={navigation} />
            <Result navigation={navigation} />
            <Upload />
            <Footer />
        </ScrollView>
    );
}