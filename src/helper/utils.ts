import { getSortOption } from "../services/storage";


export async function choiceSortOptionToQuery(value: string) {
    if(value == ""){
        value = await getSortOption();
    }
    switch (value) {
        case "asc":
            return "name ASC";
        case "desc":
            return "name DESC";
        case "created":
            return "id";
        default:
            return "id";
    }
}
