// ┬─┬ノ( º _ ºノ)
// (╯°□°)╯︵ ┻━┻
const cart = [];

document.querySelector("#logo").addEventListener("click", () => {
  document.querySelector("#reservation-bg").style.display = "none";
  document.querySelector("#cart").style.display = "none";
  document.querySelector("#bookings").style.display = "none";
});

document.querySelector("#cart-button").addEventListener("click", () => {
  document.querySelector("#bookings").style.display = "none";
  document.querySelector("#reservation-bg").style.display = "block";
  document.querySelector("#cart").style.display = "block";
});

document.querySelector("#bookings-button").addEventListener("click", () => {
  document.querySelector("#cart").style.display = "none";
  document.querySelector("#reservation-bg").style.display = "block";
  document.querySelector("#bookings").style.display = "block";
});

document.querySelector("#search_button").addEventListener("click", () => {
  const dataInput = {
    departure: document.querySelector("#departure_user").value,
    arrival: document.querySelector("#arrival_user").value,
    date: document.querySelector("#date_user").value,
  };

  fetch("http://localhost:3000/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataInput),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.response) {
        console.log(data.trips);
        document.querySelector("#train_container").innerHTML = data.trips
          .map(
            (trip) => `
            <div class="trim-data">
              <p>${trip.departure} > ${trip.arrival}</p>
              <p>${new Date(trip.date)
                .getUTCHours()
                .toString()
                .padStart(2, "0")}:${new Date(trip.date)
              .getUTCMinutes()
              .toString()
              .padStart(2, "0")}</p>
              <p>${trip.price}€</p>
              <button>Book</button>
            </div>
          `
          )
          .join("");
      } else {
        document.querySelector("#train_container").innerHTML = `
          <img src="images/notfound.png" alt="" />
          <p>no trip found.</p>
        `;
      }
    });
});
