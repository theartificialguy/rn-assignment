import React from 'react';
import { LogBox } from 'react-native';
import EntryPoint from './src';
import { Provider } from 'react-redux';
import { store } from './store';
import { enableLatestRenderer } from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
  ]);

enableLatestRenderer();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <EntryPoint />
            </NavigationContainer>
        </Provider>
    );
};

export default App;
