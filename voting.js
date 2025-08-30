document.getElementById("votin-form").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent form refresh

  const idNumber = document
    .querySelector("input[name='id_number']")
    .value.trim();

  if (!idNumber) {
    alert("Please enter your ID number.");
    return;
  }

  // Get existing votes from localStorage or empty object
  let votes = JSON.parse(localStorage.getItem("votes")) || {};

  // Check if this ID already voted
  if (votes[idNumber]) {
    alert("You can only vote once! ID " + idNumber + " has already voted.");
    return;
  }

  // Collect all chosen candidates
  const president = document.querySelector("input[name='president']:checked");
  const vicePresident = document.querySelector(
    "input[name='vicepresident']:checked"
  );
  const treasurer = document.querySelector("input[name='treasurer']:checked");
  const secretary = document.querySelector("input[name='secretary']:checked");
  const pio = document.querySelector("input[name='pio']:checked");

  if (!president || !vicePresident || !treasurer || !secretary || !pio) {
    alert("Please complete all positions before submitting.");
    return;
  }

  // Store this user's vote
  // Store this user's vote
  votes[idNumber] = {
    president: president.value,
    vicePresident: vicePresident.value,
    treasurer: treasurer.value,
    secretary: secretary.value,
    pio: pio.value,
  };

  // Save back to localStorage
  localStorage.setItem("votes", JSON.stringify(votes));

  alert("Vote submitted successfully! Thank you, ID " + idNumber);

  // Optional: reset form after vote
  document.getElementById("votin-form").reset();
});
