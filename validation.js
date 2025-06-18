document.getElementById("auth-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const regNo = document.getElementById("regno").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");
  if (regNo === "vasavi123" && password === "Password@123") {
    errorMsg.textContent = "";
    window.location.href = "event.html";
  } else {
    errorMsg.textContent = "Invalid registration number or password.";
  }
});
