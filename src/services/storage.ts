import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "../constants/storageKeys";

export async function saveSortOption(value: string){
    await AsyncStorage.setItem(
        STORAGE_KEY.SHOPPING_SORT,
        value
    );
}

export async function getSortOption(){
    return AsyncStorage.getItem(
        STORAGE_KEY.SHOPPING_SORT
    );
}