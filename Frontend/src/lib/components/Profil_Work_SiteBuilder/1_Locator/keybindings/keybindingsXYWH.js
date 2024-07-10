import { writable } from "svelte/store";

export const x = writable(0);
export const y = writable(0);
export const w = writable(0);
export const h = writable(0);



let isDoubling = false;

export function onKeyDown(e) {
    console.log(e);

    if (!e.shiftKey) {
        switch (e.keyCode) {
            // Arrow Up or W
            case 38:
            case 87:
                startDoubling(y);
                y.update(value => Math.max(value - 1, 0));
                break;
            // Arrow Down or S
            case 40:
            case 83:
                startDecreasing(y);
                y.update(value => Math.max(value + 1, 0));
                break;
            // Arrow Right or D
            case 39:
            case 68:
                startDecreasing(x);
                x.update(value => Math.max(value + 1, 0));
                break;
            // Arrow Left or A
            case 37:
            case 65:
                startDoubling(x)
                x.update(value => Math.max(value - 1, 0));
                break;
        }
    } else {
        switch (e.keyCode) {
            // Arrow Up or W
            case 40:
            case 83:
                startDecreasing(h);
                h.update(value => Math.max(value + 1, 0));
                break;
            // Arrow Down or S
            case 38:
            case 87:

                startDoubling(h)
                h.update(value => Math.max(value - 1, 0));
                break;
            // Arrow Right or D
            case 39:
            case 68:
                startDecreasing(w);
                w.update(value => Math.max(value + 1, 0));
                break;
            // Arrow Left or A
            case 37:
            case 65:
                startDoubling(w)
                w.update(value => Math.max(value - 1, 0));
                break;
        }
    }

    // Log the updated values
    console.log("Updated:", x, y, w, h);


    function startDoubling(store) {
        isDoubling = true;

        if (isDoubling && e.repeat) {
            store.update(value => Math.max(value - 10, 0));

            console.log(isDoubling, "isDOUBLING🙉🙉🙉🙉");

        }

    }
    function startDecreasing(store) {
        isDoubling = true;

        if (isDoubling && e.repeat) {
            store.update(value => Math.max(value + 10, 0));

            console.log(isDoubling, "isDOUBLING🙉🙉🙉🙉");

        }

    }
}
export function onKeyUp() {
    isDoubling = false;
}
