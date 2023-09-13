API_URL = "http://localhost:3000/api/open";
const result = document.getElementById("result");
const button = document.getElementById("button");

submit();

function promptData(id) {
  const textarea = document.getElementById(id).value;
  return textarea;
}

function preparePrompt(array) {
  let result = "";
  array.forEach((element) => {
    result += element + "\n";
  });
  return result;
}

function displayData(value) {
  result.innerHTML = "";
  const p = document.createElement("p");
  p.textContent = value;
  result.appendChild(p);
}

async function compteur(element, response) {
  let compteur = 0;
  function incrementerCompteur() {
    compteur++;
    element.innerHTML = compteur;
  }
  const dureeEnSecondes = 5;
  const intervalId = setInterval(incrementerCompteur, 1000);
  setTimeout(() => {
    clearInterval(intervalId);
    displayData(response.response);
    button.disabled = false;
  }, dureeEnSecondes * 1000);
  return;
}

function submit() {
  const textareas = document.querySelectorAll("textarea");
  const array = [
    "action",
    "identite",
    "context",
    "tonalite",
    "format",
    "etapes",
  ];
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    button.disabled = true;
    const data = [];
    const boolean = Array.from(textareas).some((textarea) => {
      return textarea.value.trim() !== "";
    });
    if (!boolean) {
      alert("Remplissez Toutes Les Cases S'il Vous Plait !!!");
      window.location.reload();
      return;
    }
    array.forEach((element) => {
      promptData(element);
      data.push(promptData(element));
    });
    const finalData = preparePrompt(data);
    const obj = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: finalData,
        },
      ],
      temperature: 0.5,
      max_tokens: 1024,
    };
    try {
      const fetchData = await fetch(API_URL, {
        //mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      // Créez une promesse pour attendre la réponse
      const response = await fetchData.json();
      await response;
      compteur(result, response);
    } catch (error) {
      console.log(error);
    }
  });
}
