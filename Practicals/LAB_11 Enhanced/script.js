//  Utility Functions
function getTrimmedValue(id) {
    return document.getElementById(id).value.trim();
}

function isEmpty(value) {
    return value === "";
}

function isValidName(name) {
    return /^[A-Za-z]+$/.test(name);
}

function isValidPhone(phone) {
    return /^\d{10}$/.test(phone);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(message) {
    alert(message);
}

//  Main Validation
function validateForm(event) {
    event.preventDefault();

    const firstName = getTrimmedValue("first-name");
    const lastName = getTrimmedValue("last-name");
    const phone = getTrimmedValue("phone-no");
    const email = getTrimmedValue("email");

    if (
        isEmpty(firstName) ||
        isEmpty(lastName) ||
        isEmpty(phone) ||
        isEmpty(email)
    ) {
        return showError("All fields are required!");
    }

    if (!isValidName(firstName) || !isValidName(lastName)) {
        return showError("Names must contain only letters!");
    }

    if (!isValidPhone(phone)) {
        return showError("Phone number must be exactly 10 digits!");
    }

    if (!isValidEmail(email)) {
        return showError("Please enter a valid email address!");
    }

    alert(
        `${firstName} ${lastName}, your form has been submitted successfully!\n` +
        `Phone: ${phone}\nEmail: ${email}`,
    );
}

//  Event Binding
document.getElementById("userForm").addEventListener("submit", validateForm);
