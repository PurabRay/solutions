document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-btn');
    const fieldCountInput = document.getElementById('field-count');
    const fieldTypeDropdown = document.getElementById('field-type');
    const dynamicForm = document.getElementById('dynamic-form');
    generateButton.addEventListener('click', () => {
        const fieldCount = parseInt(fieldCountInput.value);
        const fieldType = fieldTypeDropdown.value;
        dynamicForm.innerHTML = '';
        for (let i = 0; i < fieldCount; i++) {
            const fieldContainer = document.createElement('div');
            let field;
            if (fieldType === 'text') {
                field = document.createElement('input');
                field.type = 'text';
                field.placeholder = 'Enter text';
            } else if (fieldType === 'checkbox') {
                field = document.createElement('input');
                field.type = 'checkbox';
            } else if (fieldType === 'radio') {
                field = document.createElement('input');
                field.type = 'radio';
                field.name = 'radio-group';
            } else if (fieldType === 'textarea') {
                field = document.createElement('textarea');
                field.placeholder = 'Enter text';
            }
            fieldContainer.appendChild(field);
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => fieldContainer.remove());
            fieldContainer.appendChild(removeButton);
            dynamicForm.appendChild(fieldContainer);
        }
    });
});
