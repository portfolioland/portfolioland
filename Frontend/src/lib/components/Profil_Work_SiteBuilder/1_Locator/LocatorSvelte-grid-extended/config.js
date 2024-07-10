export let itemSize = { width: 2, height: 2 };
export let rows = 0;

/**
 * Calculate the number of columns based on the inner width.
 *
 * @param {number} innerWidth - The inner width to calculate columns from.
 * @return {number} The number of columns calculated.

This needs to be integrated in the component for reactivity. like this -> //$: cols = col(innerWidth)
Important: This needs to be done in  the component. For example:
<script>

import col from './config.js';
let innerWidth = 0;
$: cols = col(innerWidth)

</script>

    <svelte:window bind:innerWidth />
 */
export let col = (innerWidth) => {
    return innerWidth / 3;
}

