import React from 'react';
import EntryPoint from './src';
import { Provider } from 'react-redux';
import { store } from './store';
import { enableLatestRenderer } from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';

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
