// NAVIGATION - INDEX.HTML
// -----------------------------------------------------------------------------
var contactPage = document.getElementById("contactPage");
var listsPage = document.getElementById("listsPage");
var homePage = document.getElementById("homePage");
var quizPage = document.getElementById("quizPage");

var currentPage = homePage;

function displayPage(wishPage) {
    if (wishPage.classList.contains("left")) {
        wishPage.classList.remove("left");
        currentPage.classList.add("right");
        currentPage = wishPage;
    } else if (wishPage.classList.contains("right")) {
        wishPage.classList.remove("right");
        currentPage.classList.add("left");
        currentPage = wishPage;
    }
}
// -----------------------------------------------------------------------------

// LOCAL STORAGE - CONTACTPAGE
// -----------------------------------------------------------------------------
var inputFirstname = document.getElementById("inputFirstName");
var inputLastname = document.getElementById("inputLastName");
var inputAddress = document.getElementById("inputAddress");
var inputEmail = document.getElementById("inputEmail");
var inputCity = document.getElementById("inputCity");
var inputAge = document.getElementById("inputAge");

// Dont allow commas
function replaceCharacter() {
    inputFirstname.value = inputFirstname.value.replace(",", "");
    inputLastname.value = inputLastname.value.replace(",", "");
    inputAddress.value = inputAddress.value.replace(",", "");
    inputEmail.value = inputEmail.value.replace(",", "");
    inputCity.value = inputCity.value.replace(",", "");
    inputAge.value = inputAge.value.replace(",", "");
}

// Make sure inputs are not empty
function checkInputBox(inputBox) {
    if (inputBox.value != null && inputBox.value != "" && inputBox.value.length > 1)
        return true;
    else return false;
}

function AddToList() {
    // Make sure inputs are not empty
    if (checkInputBox(inputFirstname) &&
        checkInputBox(inputLastname) &&
        checkInputBox(inputAddress) &&
        checkInputBox(inputEmail) &&
        checkInputBox(inputCity) &&
        checkInputBox(inputAge)) {

        // Replace commas with empty space
        replaceCharacter();

        // Add value to local storage
        AddToStorage();

        // Clear inputboxes
        inputFirstname.value = null;
        inputLastname.value = null;
        inputAddress.value = null;
        inputEmail.value = null;
        inputCity.value = null;
        inputAge.value = null;
    }
}

function AddToStorage() {
    var success = true;

    // Combine input into one string
    var inputValue = inputFirstname.value + "," +
        inputLastname.value + "," +
        inputAddress.value + "," +
        inputEmail.value + "," +
        inputCity.value + "," +
        inputAge.value;

    // Check that item is not already in local storage
    for (i = 0; i < parseInt(localStorage.getItem("StorageLength")) + 1; i++) {
        if (localStorage.getItem(i) == inputValue) {
            console.error("Item already exists in grocery-list!");
            success = false;
        }
    }

    if (success) {
        // If we do not have a storage already, create an index
        if (localStorage.getItem("StorageLength") == null)
            localStorage.setItem("StorageLength", 0);
        else // Else add one to the storage index
            localStorage.setItem("StorageLength", parseInt(localStorage.getItem("StorageLength")) + 1);



        console.log("Added " + inputValue + " to the grocery list.");

        // And set the value for the new storage-index as our inputbox-value.
        localStorage.setItem(localStorage.getItem("StorageLength"), inputValue);
    }
}

// Run this function in console after adding contact-details to see if localstorage works👍
function CheckList() {
    for (i = 0; i < parseInt(localStorage.getItem("StorageLength")) + 1; i++) {
        console.log(i + ": " + localStorage.getItem(i));
    }
}
// -----------------------------------------------------------------------------

// JSON PARSE - CONTACTPAGE
// -----------------------------------------------------------------------------
var table = document.getElementById('table');
fetch('people.json')
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => handleData(data));

// This function was modified from earlier lectures
function handleData(data) {
    data.forEach(function (object) {
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + object.Name + '</td>' +
            '<td>' + object.Age + '</td>' +
            '<td>' + object.City + '</td>' +
            '<td>' + object.Relation + '</td>';
        table.appendChild(tr);
    });
}
// -----------------------------------------------------------------------------

// QUIZ
// -----------------------------------------------------------------------------
var totalScore = 0;
var TS = document.getElementById("totalScore");

function givePoints(radio) {
    if (radio.checked)
        totalScore += 5;
}

function checkAnswers() {
    totalScore = 0;
    var q1 = document.getElementById("q1a1");
    var q2 = document.getElementById("q2a2");
    var q3 = document.getElementById("q3a3");
    var q4 = document.getElementById("q4a1");
    var q5 = document.getElementById("q5a2");

    givePoints(q1);
    givePoints(q2);
    givePoints(q3);
    givePoints(q4);
    givePoints(q5);

    TS.innerHTML = "Total Score: " + totalScore;

}
// -----------------------------------------------------------------------------