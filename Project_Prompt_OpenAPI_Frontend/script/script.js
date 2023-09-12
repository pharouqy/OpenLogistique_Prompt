API_URL = "https://openlogistique.com/prompt/api/open";

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
  const result = document.getElementById("result");
  const p = document.createElement("p");
  p.textContent = value;
  result.appendChild(p);
}

function submit() {
  const button = document.getElementById("button");
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
    const data = [];
    const bolean = Array.from(textareas).some((textarea) => {
      return textarea.value.trim() !== "";
    });
    if (!bolean) {
      alert("Remplissez Toutes Les Cases S'il Vous Plait !!!");
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

      // Attendez que la réponse soit prête
      await response;

      if (response) {
        displayData(response.response);
      }
    } catch (error) {
      console.log(error);
    }
  });
}
