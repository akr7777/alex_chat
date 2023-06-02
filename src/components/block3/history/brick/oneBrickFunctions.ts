export const FAVORITE_HISTORY_ITEMS_LC = 'FAVORITE_HISTORY_ITEMS_LC';
export const FAVORITE_HISTORY_ITEMS_SEPARATOR = '/';

export const addToFavoriteThisHistoryItem = (id: string) => {
    const existed: string = localStorage.getItem(FAVORITE_HISTORY_ITEMS_LC) || "";
    localStorage.setItem(FAVORITE_HISTORY_ITEMS_LC, existed + id + FAVORITE_HISTORY_ITEMS_SEPARATOR);
}

export const removeThisItemFromFavorite = (id: string) => {
    const existed: string | null = localStorage.getItem(FAVORITE_HISTORY_ITEMS_LC);
    if (existed) {
        const existedArr: Array<string> = existed.split(FAVORITE_HISTORY_ITEMS_SEPARATOR).filter(item => item.length > 0 && item !== id);
        localStorage.setItem(FAVORITE_HISTORY_ITEMS_LC, existedArr.join(FAVORITE_HISTORY_ITEMS_SEPARATOR));
    }
}