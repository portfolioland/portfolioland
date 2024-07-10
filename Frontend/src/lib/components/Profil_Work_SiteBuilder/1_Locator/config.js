// Diese Datei ist für die Configuration des Svelte-Grid-Locators hier. Es werden hier variabeln exportiert, die von beiden Teilen (viewer und uploader) geteilt werden.
import gridHelp from 'svelte-grid/build/helper';

export const sharedColums = 200
export const sharedRowHeight = 20
export const cols = [
    [1800, sharedColums],
    [700, 1]
];

