export function init(el) {
    // Store a reference to the previously focused element
    let previousFocusElement = document.activeElement;

    // Set focus on the specified element
    el.focus();

    // Add an event listener for the blur event to handle when editing is finished
    el.addEventListener('blur', function () {
        // Return focus to the previously focused element
        previousFocusElement.focus();
    });
    el.addEventListener('keydown', function (event) {
        // Check if the pressed key is the Tab key
        if (event.key === 'Tab') {
            // Prevent the default tab behavior
            event.preventDefault();

            // Return focus to the previously focused element
            previousFocusElement.focus();
        }
    });
}

export function handleInput(event,updateContent) {
    const newText = event.target.innerText;

    // Handle Enter key press
    if (event.key === 'Enter') {
        event.preventDefault();
        // Add your custom handling for Enter key, if needed
        // For now, we'll simply update the content with a line break
        updateContent(`${newText}\n`);
    } else {
        updateContent(newText);
    }
}