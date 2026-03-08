document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const nameValue = document.getElementById("username").value.trim();
  const passValue = document.getElementById("password").value.trim();

  console.log("Username entered:", nameValue);
  console.log("Password entered:", passValue);

  if (nameValue == "admin" && passValue == "admin123") {
    alert("Login successful");
    window.location.assign("/home.html");
  } else {
    alert("Login Failed");
    return;
  }
});
