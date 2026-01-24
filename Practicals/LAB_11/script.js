function validateForm() {
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let phoneNo = document.getElementById("phone-no").value;
    let email = document.getElementById("email").value;

    if (!firstName || !lastName || !phoneNo || !email) {
        return alert("All fields are required!");
    }

    if (!/^\d{10}$/.test(phoneNo)) {
        return alert("Phone number must be 10 digits long and contain only numbers!");
    }

    if (email.includes(" ") || !email.includes("@") || !email.includes(".")) {
        return alert("Please enter a valid email address!");
    }

    return alert(
        `${firstName} ${lastName}, your form has been submitted successfully!\nWe will contact you at ${phoneNo} or via email at ${email}.`
    );
    return false;
}
