import React from 'react';
import EntryPoint from './src';
import { Provider } from 'react-redux';
import { store } from './store';

const App = () => {
    return (
        <Provider store={store}>
            <EntryPoint />
        </Provider>
    );
};

export default App;
