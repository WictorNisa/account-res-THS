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
  input.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      const allFilled = Array.from(input).every((input) => input.value !== "");
      button.disabled = !allFilled;
    });
  });
};

const passwordIsValid = (password, confirmpassword) => {
  if (password.length < 8) {
    console.log("Password needs to be at least 8 characters long");
    passwordInput.classList.add("invalid");
    passwordInput.classList.remove("valid");
  } else {
    console.log("Password is long enough");
    passwordInput.classList.remove("invalid");
    passwordInput.classList.add("valid");
  }

  if (confirmpassword !== password) {
    console.log("Passwords must match!");
    passwordConfirmInput.classList.add("invalid");
    passwordConfirmInput.classList.remove("valid");
    passwordMustMatch.style.display = "block"; // Show mismatch warning
  } else {
    console.log("Passwords match, nice!");
    passwordConfirmInput.classList.remove("invalid");
    passwordConfirmInput.classList.add("valid");
    passwordMustMatch.style.display = "none"; // Hide mismatch warning
  }
};
inputHasValue();

// ****************** Event listener ******************

form.addEventListener("click", (e) => {
  const label = e.target.closest("label");

  if (label) {
    handleLabelClick(label);
  } else {
    console.log("Another element clicked");
  }
});

passwordInput.addEventListener("input", () => {
  passwordIsValid(passwordInput.value, passwordConfirmInput.value);
});

passwordConfirmInput.addEventListener("input", () => {
  passwordIsValid(passwordInput.value, passwordConfirmInput.value);
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
    password: passwordInput.value
  };

  console.log(registrationData);
  alert(JSON.stringify(registrationData, null, 2));
  form.reset();
  passwordConfirmInput.classList.remove("valid");
  passwordInput.classList.remove("valid");
});



//fixa så knappen är disabled hela vägen, och fixa med styles när saker är fel och rätt