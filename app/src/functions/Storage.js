import { AsyncStorage } from "react-native";

/*
    if(s!==null){
        console.log('es null...');
    }
    else{
        console.log('no es nullxx');
        console.log(s);
    }
    Note: it's important to compare as !== because the real null value is {"_40": 0, "_55": null, "_65": 0, "_72": null}

*/

export async function getFromStorage(storageKey) {
    //return await AsyncStorage.getItem("@App:KEY");
    return await AsyncStorage.getItem(storageKey);    
}

export async function saveToStorage(storageKey,value){
    try {
        await AsyncStorage.setItem(storageKey, value);
        return 1;
    } catch (error) {
        return 0;
    }
}
