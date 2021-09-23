const formDialog = document.createElement('dialog');
formDialog.onclick = (e) => {
    const rect = e.target.getBoundingClientRect();

    const clickedInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
    );

    if (clickedInDialog === false) {
        e.target.close();
    }
};
document.body.appendChild(formDialog);


const form = document.createElement('form');
formDialog.appendChild(form);


const formHeading = document.createElement('p');
formHeading.textContent = `Save your secret on ${location.hostname}.`;
form.appendChild(formHeading);


const usernameLabel = document.createElement('label');
usernameLabel.htmlFor = 'saoa-username';
usernameLabel.textContent = 'Username:';

const usernameInput = document.createElement('input');
usernameInput.type = 'text';
usernameInput.name = 'saoa-username';
usernameInput.id = 'saoa-username';
usernameInput.autocomplete = 'username';

const usernameDiv = document.createElement('div');
usernameDiv.appendChild(usernameLabel);
usernameDiv.appendChild(usernameInput);
form.appendChild(usernameDiv);


const passwordLabel = document.createElement('label');
passwordLabel.htmlFor = 'saoa-password';
passwordLabel.textContent = 'Password:';

const passwordInput = document.createElement('input');
passwordInput.type = 'password';
passwordInput.name = 'saoa-password';
usernameInput.id = 'saoa-password';
passwordInput.autocomplete = 'new-password';

const passwordVisibilityToggleDiv = document.createElement('div');

const passwordVisibilityToggle = document.createElement('input');
passwordVisibilityToggle.type = "checkbox";
passwordVisibilityToggle.name = 'password-visibility-toggle';
passwordVisibilityToggle.id = 'password-visibility-toggle';
passwordVisibilityToggle.onchange = () => {
    if (!passwordVisibilityToggle.checked) {
        passwordInput.type = 'password';
    } else {
        passwordInput.type = 'text';
    }
};
passwordVisibilityToggleDiv.appendChild(passwordVisibilityToggle);

const passwordVisibilityToggleLabel = document.createElement('label');
passwordVisibilityToggleLabel.htmlFor = 'password-visibility-toggle';
passwordVisibilityToggleLabel.textContent = 'Show password';
passwordVisibilityToggleDiv.appendChild(passwordVisibilityToggleLabel);

const passwordDiv = document.createElement('div');
passwordDiv.appendChild(passwordLabel);
passwordDiv.appendChild(passwordInput);
passwordDiv.appendChild(passwordVisibilityToggleDiv);
form.appendChild(passwordDiv);

const submitButton = document.createElement('button');
submitButton.type = "button";
submitButton.textContent = 'Submit';
submitButton.onclick = () => {
    formDialog.close();
    usernameInput.value = '';
    passwordInput.value = '';
};
form.appendChild(submitButton);

chrome.runtime.onMessage.addListener(() => {
    if (!formDialog.open) {
        formDialog.showModal();
    } else {
        formDialog.close();
    }
});
