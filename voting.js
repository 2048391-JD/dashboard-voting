document.getElementById("submitVoteBtn").addEventListener("click", function () {
  const idNumber = document
    .querySelector("input[name='id_number']")
    .value.trim();

  const idError = document.getElementById("id-error");
  const voteError = document.getElementById("vote-error");
  idError.textContent = "";
  voteError.textContent = "";


  if (!idNumber) {
    idError.textContent = "⚠ Please enter your ID number.";
    return;
  }

  // ✅ Check if ID number contains only digits
  if (!/^\d+$/.test(idNumber)) {
    idError.textContent = "⚠ ID number must contain numbers only.";
    return;
  }

  let votes = JSON.parse(localStorage.getItem("votes")) || {};

  // ✅ Check if this ID already voted
  if (votes[idNumber]) {
    voteError.textContent = "⚠ You can only vote once! This ID has already voted.";
    return;
  }


  const president = document.querySelector("input[name='president']:checked");
  const vicePresident = document.querySelector("input[name='vicepresident']:checked");
  const treasurer = document.querySelector("input[name='treasurer']:checked");
  const secretary = document.querySelector("input[name='secretary']:checked");
  const pio = document.querySelector("input[name='pio']:checked");


  if (!president || !vicePresident || !treasurer || !secretary || !pio) {
    voteError.textContent = "⚠ Please complete all positions before submitting.";
    return;
  }


  votes[idNumber] = {
    president: president.value,
    vicePresident: vicePresident.value,
    treasurer: treasurer.value,
    secretary: secretary.value,
    pio: pio.value,
  };

  localStorage.setItem("votes", JSON.stringify(votes));

  const modal = document.getElementById("successModal");
  modal.style.display = "flex";


  document.getElementById("votin-form").reset();
});


document.getElementById("closeModalBtn").addEventListener("click", () => {
  document.getElementById("successModal").style.display = "none";
});
