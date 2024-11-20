const form = document.querySelector("form");
const button = document.querySelector("button");
const input = document.querySelectorAll("input");

const passwordInput = document.querySelector(".password-input");
const passwordConfirmInput = document.querySelector(".password-confirm-input");
const passwordMustMatch = document.querySelector(".password-must-match");

button.disabled = true;

// ****************** Functions ******************

const handleLabelClick = (label) => {
  const input = label.querySelector("input");
  if (input) {
    input.focus();
  }
};

const inputHasValue = () => {
  const allFilled = Array.from(input).every((input) => input.value !== "");
  const passwordsValid =
    passwordInput.value.length >= 8 &&
    passwordInput.value === passwordConfirmInput.value;
  button.disabled = !(allFilled && passwordsValid);
};

const passwordIsValid = () => {
  const password = passwordInput.value.trim();
  const confirmPassword = passwordConfirmInput.value.trim();

  if (password.length < 8) {
    passwordInput.classList.add("invalid");
    passwordInput.classList.remove("valid");
  } else {
    passwordInput.classList.add("valid");
    passwordInput.classList.remove("invalid");
  }

  if (password && confirmPassword) {
    if (password !== confirmPassword) {
      passwordConfirmInput.classList.add("invalid");
      passwordConfirmInput.classList.remove("valid");
      passwordMustMatch.style.display = "block";
    } else {
      passwordConfirmInput.classList.remove("invalid");
      passwordConfirmInput.classList.add("valid");
      passwordMustMatch.style.display = "none";
    }
  } else {
    passwordMustMatch.style.display = "none";
  }
};

// ****************** Event listener ******************

form.addEventListener("click", (e) => {
  const label = e.target.closest("label");

  if (label) {
    handleLabelClick(label);
  } else {
    console.log("Another element clicked");
  }
});

input.forEach((inputElement) => {
  inputElement.addEventListener("input", () => {
    inputHasValue();
    if (
      inputElement === passwordInput ||
      inputElement === passwordConfirmInput
    ) {
      passwordIsValid();
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.querySelector(".name-input");
  const usernameInput = document.querySelector(".username-input");
  const emailInput = document.querySelector(".email-input");

  const registrationData = {
    name: nameInput.value.trim(),
    username: usernameInput.value.trim(),
    email: emailInput.value.trim(),
    password: passwordInput.value,
  };

  console.log(registrationData);
  alert(JSON.stringify(registrationData, null, 2));
  form.reset();
  passwordInput.classList.remove("valid");
  passwordConfirmInput.classList.remove("valid");
});
