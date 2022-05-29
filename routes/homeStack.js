import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import Algorithms from '../screens/Algorithms';
import Results from '../screens/Results';

const screens = {
    Home: {
        screen: Home,
    },
    Algorithms: {
        screen: Algorithms,
    },
    Results: {
        screen: Results,
    }
};

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#191970' },
        title: 'Major Project',
        headerTitleAlign: 'center',
    }
});

export default createAppContainer(HomeStack);