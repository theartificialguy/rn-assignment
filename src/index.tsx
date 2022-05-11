import React, { useEffect } from 'react';
import Home from './Screens/Home';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { auth, db } from '../firebase/firebase-config';
import { logout, loading, login } from './reducers/AuthReducer';
import SignIn from './Screens/Signin';
import Loader from './Components/Loader';
import { doc, getDoc } from 'firebase/firestore';

const EntryPoint = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const authloading = useSelector(state => state.auth.loading);

    useEffect(() => {
        onAuthStateChanged(auth, result => {
            dispatch(loading(true));
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

    return user ? <Home /> : <SignIn />;
};

export default EntryPoint;
