function getVotes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const votes = JSON.parse(localStorage.getItem("votes")) || {};
      resolve(votes);
    }, 200);
  });
}

function countVotes(votes) {
  const results = {
    president: { Jun: 0, John: 0 },
    vicePresident: { Jun: 0, John: 0 },
    treasurer: { Jun: 0, John: 0 },
    secretary: { Jun: 0, John: 0 },
    pio: { Jun: 0, John: 0 },
  };

  Object.values(votes).forEach((vote) => {
    if (vote.president) results.president[vote.president]++;
    if (vote.vicePresident) results.vicePresident[vote.vicePresident]++;
    if (vote.treasurer) results.treasurer[vote.treasurer]++;
    if (vote.secretary) results.secretary[vote.secretary]++;
    if (vote.pio) results.pio[vote.pio]++;
  });

  return results;
}

async function updateDashboard() {
  const votes = await getVotes();
  const results = countVotes(votes);

  document.querySelectorAll("#president-name .candid").forEach((el) => {
    const name = el.dataset.name;
    el.querySelector("span").textContent = results.president[name] || 0;
  });

  document.querySelectorAll("#vice-president-name .candid").forEach((el) => {
    const name = el.dataset.name;
    el.querySelector("span").textContent = results.vicePresident[name] || 0;
  });

  document.querySelectorAll("#treasurer-name .candid").forEach((el) => {
    const name = el.dataset.name;
    el.querySelector("span").textContent = results.treasurer[name] || 0;
  });

  document.querySelectorAll("#secretaries-name .candid").forEach((el) => {
    const name = el.dataset.name;
    el.querySelector("span").textContent = results.secretary[name] || 0;
  });

  document.querySelectorAll("#pios-name .candid").forEach((el) => {
    const name = el.dataset.name;
    el.querySelector("span").textContent = results.pio[name] || 0;
  });
}


document.getElementById("refresh-btn").addEventListener("click", updateDashboard);


window.addEventListener("storage", (event) => {
  if (event.key === "votes") {
    updateDashboard();
  }
});


updateDashboard();
