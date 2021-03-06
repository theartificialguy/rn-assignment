import React, { useEffect } from 'react';
import Home from './Screens/Home';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { auth, db } from '../firebase/firebase-config';
import { logout, loading, login } from './reducers/AuthReducer';
import SignIn from './Screens/Signin';
import Loader from './Components/Loader';
import InputModalScreen from './Components/InputModal';
import Map from './Components/Map';
import MapScreen from './Screens/Map';
import { doc, getDoc } from 'firebase/firestore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const EntryPoint = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const authloading = useSelector(state => state.auth.loading);

    useEffect(() => {
        onAuthStateChanged(auth, result => {
            if (result) {
                const path = doc(db, 'users', result.uid);
                getDoc(path)
                    .then(result => {
                        if (result.exists()) {
                            const data = result.data();
                            dispatch(
                                login({
                                    displayName: data['displayName'],
                                    email: data['email'],
                                    photoURL: data['photoURL'],
                                    phone: data['phone'],
                                }),
                            );
                        }
                    })
                    .catch(error => console.log('sign in error: ', error));
            } else {
                dispatch(logout());
            }
            dispatch(loading(false));
        });
    }, []);

    if (authloading) {
        return <Loader />;
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <Stack.Screen name="Home" component={Home} />
            ) : (
                <Stack.Screen name="SignIn" component={SignIn} />
            )}
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name='MapScreen' component={MapScreen} />
            <Stack.Screen name="InputModalScreen" component={InputModalScreen} />
        </Stack.Navigator>
    );
};

export default EntryPoint;
