import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "../constants/storageKeys";

export async function saveSortOption(value: string){
    await AsyncStorage.setItem(
        STORAGE_KEY.SHOPPING_SORT,
        value
    );
}

export async function getSortOption(){
    let local = await AsyncStorage.getItem(
        STORAGE_KEY.SHOPPING_SORT
    );
    return local != null ? local : "";
}
