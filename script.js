document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector("input");
  const button = document.querySelector("button");
  const place = document.querySelector("#place");
  const degrees = document.querySelector("#degrees");
  const img = document.querySelector("img");
  const wind = document.querySelector("#wind");
  const content = document.querySelector(".content");

  button.addEventListener("click", () => {
    const city = input.value.trim();
    if (!city) {
      alert("Por favor, insira o nome de uma cidade.");
      return;
    }

    getDataApi(city);
  });

  async function getDataApi(city) {
    const apiKey = 'e4c6cbc94aaddb2c287e0da5cb144b38'; // Substitua pela sua chave API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === "404") {
        alert("Cidade não encontrada! Verifique o nome e tente novamente.");
        content.classList.add("d-none");
        return;
      }

      loadData(data);
    } catch (error) {
      alert("Ocorreu um erro ao buscar os dados. Tente novamente.");
      console.error("Erro ao buscar dados:", error);
    }
  }

  function loadData(data) {
    place.textContent = `${data.name}, ${data.sys.country}`;
    degrees.textContent = `Temperatura: ${Math.floor(data.main.temp)}° C`;
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    wind.textContent = `Vento: ${data.wind.speed} km/h`;

    // Exibe o conteúdo
    content.classList.remove("d-none");
  }
});
