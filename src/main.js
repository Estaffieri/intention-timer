var main = document.querySelector("main");
var pastActivities = [];
var currentActivity;

main.addEventListener("click", clickHandler);

function clickHandler(event) {
  if (event.target.closest(".activity-button")) {
    event.preventDefault();
    var button = event.target.closest(".activity-button");
    var category = button.id;
    disableCategoryButtons();
    activateButton(button, category);
  }
  if (event.target.classList.contains("start-activity-button")) {
    validateForm(event);
  }
  if (event.target.classList.contains("start-timer-button")) {
    currentActivity.noMultipleStarts();
  }
  if (event.target.classList.contains("log-activity-button")) {
    logActivity();
  } if (event.target.classList.contains("create-activity-button")) {
    createNewActivity();
  }
}

function activateButton(button, category) {
  button.classList.add("active");
  button.querySelector("img").src = `./assets/${category}-active.svg`;
  main.classList.add(`${category}`);
  document.querySelector(".start-timer-button").classList.add(`${category}`);
}

function disableCategoryButtons() {
  var allCategoryButtons = main.querySelectorAll(".activity-button");
  for (var i = 0; i < allCategoryButtons.length; i++) {
    allCategoryButtons[i].classList.remove("active");
    var buttonIcon = allCategoryButtons[i].querySelector("img");
    buttonIcon.src = `./assets/${buttonIcon.id}.svg`;
  }
  main.classList.remove(`${buttonIcon.id}`);
  document.querySelector(".start-timer-button").classList.remove(`${buttonIcon.id}`);
}

function validateForm(event) {
  event.preventDefault();
  var hasError;
  var category = checkCategories();
  var goal = checkGoal();
  var minutes = checkMinuteInput();
  var seconds = checkSecondsInput();
  submit(category, goal, minutes, seconds);
}

function checkCategories() {
  if (!main.querySelector(".active")) {
    hasError = true;
    var categoryError = document.querySelector(".category-error");
    renderError(categoryError, "category");
  } else {
    hasError = false;
    return main.classList.value;
  }
}

function checkGoal() {
  var goalInput = document.querySelector("#description-text");
  if (goalInput.value.length === 0) {
    hasError = true;
    goalInput.classList.add("error");
    renderError(document.querySelector(".goal-error"), "description", goalInput);
    return;
  }
  document.querySelector(".user-description").innerText = goalInput.value;
  return goalInput.value;
}

function checkTimeInputs(time) {
  if (typeof Number(time.value) != "number" || time.value === "" || time.value >= 60) {
    hasError = true;
    time.classList.add("error");
    return true;
  }
}

function checkMinuteInput() {
  var minuteInput = document.querySelector("#minute-value");
  if (checkTimeInputs(minuteInput)) {
    renderError(document.querySelector(".min-error"), "number", minuteInput);
    return;
  }
  return minuteInput.value;
}

function checkSecondsInput() {
  var secondsInput = document.querySelector("#seconds-value");
  if (checkTimeInputs(secondsInput)) {
    renderError(document.querySelector(".seconds-error"), "number between 0-59", secondsInput);
    return;
  }
  return secondsInput.value;
}

function renderError(errorLocation, errorDescription, inputField) {
  errorLocation.innerHTML = errorMessage(errorDescription);
  setTimeout(removeError, 2000, errorLocation, inputField);
}

function errorMessage(errorDescription) {
  return `<img src="./assets/warning.svg" class="warning-icon">
        A ${errorDescription} is required.`;
}

function removeError(error, input) {
  if (error) {
    error.innerHTML = "";
  }
  if (input) {
    input.classList.remove("error");
  }
  if (hasError) {
    hasError = false;
  }
}

function displayElement(className) {
  document.querySelector(`.${className}`).classList.remove('hidden');
}

function hideElement(className) {
  document.querySelector(`.${className}`).classList.add('hidden');
}

function submit(category, goal, minutes, seconds) {
  if (!hasError) {
    currentActivity = new Activity(category, goal, minutes, seconds);
    pastActivities.push(currentActivity);
    document.getElementById("timer").innerHTML = `${minutes}:${seconds}`;
    hideElement("new-activities-view");
    displayElement("timer-view");
  } else {
    hasError = false;
  }
}

function logActivity() {
  displayElement("completed-view");
  hideElement("timer-view");
  document.querySelector(".no-activities-message").outerText = "";
  createActivityCard(currentActivity);
}

function createNewActivity() {
  hideElement("completed-view");
  displayElement("new-activities-view");
  document.querySelector("form").reset();
  main.querySelector(".active").classList.remove("active");
  deactivateButton(document.querySelector(`.${currentActivity.catego
}

function createActivityCard(activity) {
  document.querySelector('.new-cards').innerHTML += `
  <article class="card ${activity.category}-card" id="${activity.id}">
    ${activity.description.toUpperCase()} <br>
    ${activity.timeCardMin} MIN
  </article>
  `;
}

