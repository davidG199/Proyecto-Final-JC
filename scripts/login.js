const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const message = document.getElementById("login-message");

const setError = (input, errorElement, errorMessage) => {
  input.setAttribute("aria-invalid", errorMessage ? "true" : "false");
  errorElement.textContent = errorMessage;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const emailValue = email.value.trim();
  const passwordValue = password.value;
  let valid = true;

  setError(email, emailError, "");
  setError(password, passwordError, "");
  message.textContent = "";

  if (!emailValue) {
    setError(email, emailError, "Ingresa tu correo electrónico.");
    valid = false;
  } else if (!email.checkValidity()) {
    setError(email, emailError, "Revisa el formato de tu correo.");
    valid = false;
  }

  if (!passwordValue) {
    setError(password, passwordError, "Ingresa tu contraseña.");
    valid = false;
  } else if (passwordValue.length < 6) {
    setError(password, passwordError, "Usa al menos 6 caracteres.");
    valid = false;
  }

  if (!valid) {
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  message.textContent = "Datos validados. Sesión lista para conectar.";
});
