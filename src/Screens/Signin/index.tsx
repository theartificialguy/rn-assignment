import {
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, { useState } from 'react';
import styles from './styles';

import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../../../firebase/firebase-config';
import Loader from '../../Components/Loader';
import CustomButton from '../../Components/CustomButton';
import { getImageFromCamera, getImageFromGallery } from '../../utils/functions';
import { loginUser, registerUser } from '../../utils/auth';
import Statusbar from '../../Components/Statusbar';

const SignIn = () => {
    const dispatch = useDispatch();
    const authloading = useSelector(state => state.auth.loading);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [registerOrLogin, setRegisterOrLogin] = useState(true); // true = register
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    const toggleRegisterOrLogin = () => {
        setRegisterOrLogin(previousValue => !previousValue);
    };

    if (authloading) {
        return <Loader />;
    }

    return (
        <View style={styles.container}>
            <Statusbar />
            {registerOrLogin ? (
                <>
                    <TouchableOpacity onPress={toggleRegisterOrLogin}>
                        <Text style={styles.authText}>Login?</Text>
                    </TouchableOpacity>

                    <Text style={styles.title}>Register Section</Text>

                    <View style={styles.buttonContainer}>
                        <CustomButton
                            title={'Select from Gallery'}
                            onPress={getImageFromGallery(
                                setImgUrl,
                                setProgresspercent,
                            )}
                        />
                        <CustomButton
                            title={'Select from Camera'}
                            onPress={getImageFromCamera(
                                setImgUrl,
                                setProgresspercent,
                            )}
                        />
                    </View>

                    {imgUrl && (
                        <View style={styles.profileImageContainer}>
                            <Image
                                source={{ uri: imgUrl }}
                                resizeMode="contain"
                                style={{
                                    height: 200,
                                    width: 200,
                                    borderRadius: 150,
                                }}
                            />
                        </View>
                    )}

                    {progresspercent > 0 && (
                        <View
                            style={[
                                styles.progressContainer,
                                { width: progresspercent * 2 },
                            ]}>
                            <Text>{progresspercent}%</Text>
                        </View>
                    )}

                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor='black'
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        style={{ textAlign: 'center' }}
                        placeholderTextColor='black'
                    />
                    <TextInput
                        placeholder="Phone Number"
                        value={phone}
                        onChangeText={setPhone}
                        placeholderTextColor='black'
                    />

                    <Button
                        title="Register"
                        onPress={registerUser(
                            dispatch,
                            auth,
                            db,
                            email,
                            password,
                            phone,
                            imgUrl,
                        )}
                    />
                </>
            ) : (
                <>
                    <TouchableOpacity onPress={toggleRegisterOrLogin}>
                        <Text style={styles.authText}>Register?</Text>
                    </TouchableOpacity>

                    <Text style={styles.title}>Login Section</Text>

                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={{ textAlign: 'center' }}
                        placeholderTextColor='black'
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        style={{ textAlign: 'center' }}
                        placeholderTextColor='black'
                    />

                    <Button
                        title="Login"
                        onPress={loginUser(dispatch, auth, db, email, password)}
                    />
                </>
            )}
        </View>
    );
};

export default SignIn;
