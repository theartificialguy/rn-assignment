import { Alert } from 'react-native';
import realm from '../../realm-config';

export const addRecord = (name: string, phone: string, coords: string) => {
    realm
        .then(realmObj => {
            realmObj.write(() => {
                try {
                    const record = realmObj.create('Record', {
                        _id: Date.now(),
                        name,
                        phone,
                        address: coords,
                        // createdAt: Date.now(),
                    });

                    if (record !== null || record !== undefined) {
                        Alert.alert('Success', 'Record added successfully');
                    }
                } catch (error) {
                    console.log('error while adding to realm: ', error);
                }
            });
        })
        .catch(err => console.log('error in realm add function: ', err));
};

export const deleteRecord = record => {
    realm
        .then(realmObj => {
            realmObj.write(() => {
                try {
                    const _record = realmObj.objectForPrimaryKey(
                        'Record',
                        record._id,
                    );
                    realmObj.delete(_record);
                    Alert.alert('Success', 'Record deleted successfully');
                    // _record = null;
                } catch (error) {
                    console.log('error while deleting from realm: ', error);
                }
            });
        })
        .catch(err => console.log('error in realm delete function: ', err));
};
