const MyCar = {
    fullName: "Porsche 911 GT3 RS",
    model: "911",
    variant: "GT3 RS",
    manufacturer: "Porsche",
    year: 2022,
    color: "Guards Red",
};

function displayCarInfo(car = MyCar) {
    let displayBoard = document.getElementById("displayBoard");
    displayBoard.innerHTML = "";

    for (let info in car) {
        let list = document.createElement("li");
        list.appendChild(document.createTextNode(car[info]))

        // edit button
        let edit = document.createElement("button");
        edit.textContent = "Edit"
        edit.className = "btn"
        edit.addEventListener("click", () => modifyProperty(list.firstChild))

        // delete button
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete"
        deleteButton.className = "btn"

        deleteButton.addEventListener("click", () => deleteElement(info));

        // just adding those button into each line
        list.appendChild(edit);
        list.appendChild(deleteButton);

        // just return final thing
        displayBoard.appendChild(list);
    }

    // user can also add their new property
    let addNew = document.createElement("button");
    addNew.textContent = "Add New Property"
    displayBoard.appendChild(addNew);
    addNew.addEventListener("click", () => addNewElement())
    return;
}

function modifyProperty(el) {
    let newData = prompt("Edit information: ", el.textContent);
    if (newData == "" || newData == null) return;
    el.textContent = newData;
    return
}

function addNewElement() {
    let newPropertyName = prompt("Enter new property name: ");
    if (newPropertyName == "" || newPropertyName == null) return;
    if (MyCar.hasOwnProperty(newPropertyName)) {
        alert("Property Name already exists! Try Again")
        return addNewElement()
    }

    let newData = prompt("Enter new information: ");
    if (newData == "" || newData == null) return;

    MyCar[newPropertyName] = newData;
    displayCarInfo()
}

function deleteElement(property) {
    delete MyCar[property]
    displayCarInfo()
}