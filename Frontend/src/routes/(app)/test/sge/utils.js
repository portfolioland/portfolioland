import ImageUploadPlaceholder from "$lib/components/Profil_Work_SiteBuilder/2_image/pictures.svelte";
import Headline from "$lib/components/Profil_Work_SiteBuilder/3_text/headline.svelte";
import Paragraph from "$lib/components/Profil_Work_SiteBuilder/3_text/paragraph.svelte";

export function addNewPara(items) {
    let newItem = {
        id: crypto.randomUUID(),
        x: 1,
        y: 1,
        w: 4,
        h: 4,
        content: 'Write something...',
        type: "paragraph",
        component: Paragraph
    };

    items = [...items, ...[newItem]];
    return items;
}
export function addNewH2(items) {
    let newItem = {
        id: crypto.randomUUID(),
        x: 1,
        y: 1,
        w: 4,
        h: 4,
        content: 'Write something...',
        type: "headline",
        component: Headline
    };

    items = [...items, ...[newItem]];
    return items;
}
export function addNewPicture(items) {
    let newItem = {
        id: crypto.randomUUID(),
        x: 1,
        y: 1,
        w: 4,
        h: 4,
        content: '',
        type: "picture",
        component: ImageUploadPlaceholder
    };

    items = [...items, ...[newItem]];
    return items;
}
export function addNewItem2(items, gridController) {
    const w = Math.floor(Math.random() * 2) + 1;
    const h = Math.floor(Math.random() * 5) + 1;
    const newPosition = gridController.getFirstAvailablePosition(w, h);
    items = newPosition
        ? [
            ...items,
            {
                id: crypto.randomUUID(),
                x: newPosition.x,
                y: newPosition.y,
                w,
                h,
                content: 'NEW Content'
            }
        ]
        : items;
    return items
}

export const remover = (item, items) => {
    items = items.filter((value) => value.id !== item);
    return items;
};


