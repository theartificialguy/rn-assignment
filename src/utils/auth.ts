import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, Firestore, getDoc, setDoc } from 'firebase/firestore';
import { Alert } from 'react-native';
import { loading, login, logout, register } from '../reducers/AuthReducer';

export const registerUser = (
    dispatch: (arg0: { payload: any; type: string }) => void,
    auth: Auth,
    db: Firestore,
    email: string,
    password: string,
    phone: any,
    imgUrl: any,
) => {
    return () => {
        dispatch(loading(true));

        if (!email || !password || !phone || !imgUrl) {
            dispatch(loading(false));
            return Alert.alert('Please enter All Credentials');
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const data = {
                    displayName: result.user.displayName ?? '',
                    email: result.user.email,
                    photoURL: imgUrl,
                    phone,
                };
                dispatch(register(data));
                const path = doc(db, 'users', result.user.uid);
                setDoc(path, data, { merge: true })
                    .then(() => console.log('User added to firestore db'))
                    .catch(error => console.log(error));
            })
            .catch(error => console.log('register error: ', error))
            .finally(() => dispatch(loading(false)));
    };
};

export const loginUser = (
    dispatch: (arg0: { payload: any; type: string }) => void,
    auth: Auth,
    db: Firestore,
    email: string,
    password: string,
) => {
    return () => {
        dispatch(loading(true));

        if (!email || !password) {
            dispatch(loading(false));
            return Alert.alert('Please enter All Credentials');
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const path = doc(db, 'users', result.user.uid);
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
            })
            .catch(error => console.log(error.message))
            .finally(() => dispatch(loading(false)));
    };
};

export const signOut = (
    dispatch: (arg0: { payload: undefined; type: string }) => void,
    auth: Auth,
) => {
    return () => {
        dispatch(logout());
        auth.signOut();
    }
};
