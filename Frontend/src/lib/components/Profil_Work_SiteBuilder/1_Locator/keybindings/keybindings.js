let x = 0;
let y = 0;
let w = 0;
let h = 0;

let isDoubling = false;

export function onKeyDown(e, x, y, w, h) {
    console.log(e);

    if (!e.shiftKey) {
        switch (e.keyCode) {
            // Arrow Up or W
            case 38:
            case 87:
                y = e.repeat ? startDecreasing(y) : increase(y);
                console.log(y);
                break;
            // Arrow Down or S
            case 40:
            case 83:
                y = e.repeat ? startDoubling(y) : decrease(y);
                break;
            // Arrow Right or D
            case 39:
            case 68:
                x = e.repeat ? startDecreasing(x) : increase(x)

                break;
            // Arrow Left or A
            case 37:
            case 65:
                x = e.repeat ? startDoubling(x) : decrease(x);
                break;
        }
    } else {
        switch (e.keyCode) {
            // Arrow Up or W
            case 40:
            case 83:
                h = e.repeat ? startDecreasing(h) : increase(h);
                break;
            // Arrow Down or S
            case 38:
            case 87:
                h = e.repeat ? startDoubling(h) : decrease(h);
                break;
            // Arrow Right or D
            case 39:
            case 68:
                w = e.repeat ? startDecreasing(w) : increase(w);
                break;
            // Arrow Left or A
            case 37:
            case 65:
                w = e.repeat ? startDoubling(w) : decrease(w);
                break;
        }
    }
    console.log("Updated:", x, y, w, h);



    function startDoubling(store) {
        isDoubling = true;

        if (isDoubling && e.repeat) {
            return decrease(store, 100);
        }
        return store;
    }

    function startDecreasing(store) {
        isDoubling = true;

        if (isDoubling && e.repeat) {
            return increase(store, 100);
        }
        return store;
    }

    function increase(value, digit = 1) {
        return Math.max(value + digit, 0);
    }

    function decrease(value, digit = 1) {
        return Math.max(value - digit, 0);
    }


}

export { x, y, w, h }

export function onKeyUp() {
    isDoubling = false;
}
