import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase/firebase-config';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { deleteRecordItem, getDBConnection, saveRecords } from '../../db-service';

export const getImageFromGallery = (setImgUrl, setProgresspercent) => {
    return () => {
        launchImageLibrary(
            {
                quality: 0.5,
                mediaType: 'photo',
            },
            async fileObject => {
                if (fileObject.didCancel) return;

                const fileUrl = fileObject.assets[0].uri;

                if (!fileUrl) return;

                const storageRef = ref(
                    storage,
                    `user_profiles/${uuidv4()}.jpg`,
                );
                const img = await fetch(fileUrl);
                const bytes = await img.blob();
                const uploadTask = uploadBytesResumable(storageRef, bytes);

                uploadTask.on(
                    'state_changed',
                    snapshot => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                                100,
                        );
                        setProgresspercent(progress);
                    },
                    error => {
                        console.log(error.message);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            downloadURL => {
                                setImgUrl(downloadURL);
                            },
                        );
                    },
                );
            },
        );
    };
};

export const getImageFromCamera = (setImgUrl, setProgresspercent) => {
    return () => {
        launchCamera(
            {
                mediaType: 'photo',
                quality: 0.5,
            },
            async fileObject => {
                if (fileObject.didCancel) return;

                const fileUrl = fileObject.assets[0].uri;

                if (!fileUrl) return;

                const storageRef = ref(
                    storage,
                    `user_profiles/${uuidv4()}.jpg`,
                );
                const img = await fetch(fileUrl);
                const bytes = await img.blob();
                const uploadTask = uploadBytesResumable(storageRef, bytes);

                uploadTask.on(
                    'state_changed',
                    snapshot => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                                100,
                        );
                        setProgresspercent(progress);
                    },
                    error => {
                        console.log(error.message);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            downloadURL => {
                                setImgUrl(downloadURL);
                            },
                        );
                    },
                );
            },
        );
    };
};

export const addRecord = async (record, records, setRecords) => {
    if (record === {}) return;
    try {
        const newRecords = [
            ...records, {
                id: records.length ? records.reduce((acc, curr) => {
                    if (curr.id > acc.id) return curr;
                    return acc;
                }).id + 1 : 0,
                name: record.name,
                phone: record.phone,
            }
        ];
        setRecords(newRecords);
        const db = await getDBConnection();
        await saveRecords(db, newRecords);
    } catch (error) {
        console.log('error when trying to add record: ', error)
    }
}

export const deleteRecord = async (id: number, records, setRecords) => {
    try {
        const db = await getDBConnection();
        await deleteRecordItem(db, id);
        records.splice(id, 1);
        setRecords(records.slice(0));
    } catch (error) {
        console.log('error when trying to delete record: ', error)
    }
}