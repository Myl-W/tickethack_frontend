// ┬─┬ノ( º _ ºノ)
// (╯°□°)╯︵ ┻━┻
const cart = [];
const bookings = [];

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

  fetch("https://tickethack-backend-lyart.vercel.app/trips", {
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
              <button
                class="button-book"
                data-departure="${trip.departure}"
                data-arrival="${trip.arrival}"
                data-date="${trip.date}"
                data-price="${trip.price}"
                >Book
              </button>
            </div>
          `
          )
          .join("");
        updateCartPage();
      } else {
        document.querySelector("#train_container").innerHTML = `
          <img src="images/notfound.png" alt="" />
          <div id="train-separator"></div>
          <p>no trip found.</p>
        `;
      }
    });
});

function updateCartPage() {
  const bookButtons = document.querySelectorAll(".button-book");

  bookButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const trip = {
        departure: button.dataset.departure,
        arrival: button.dataset.arrival,
        date: button.dataset.date,
        price: button.dataset.price,
      };

      cart.push(trip);
      renderCart();
      document.querySelector("#reservation-bg").style.display = "block";
      document.querySelector("#cart").style.display = "block";
    });
  });
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const emptyCartText = document.querySelector("#cart > p:first-child");
  const suggestionText = document.querySelector("#cart > p:nth-child(2)");

  if (cart.length === 0) {
    emptyCartText.style.display = "block";
    suggestionText.style.display = "block";
    cartItemsContainer.innerHTML = "";
  } else {
    emptyCartText.style.display = "none";
    suggestionText.style.display = "none";
    const total = cart.reduce((acc, trip) => acc + Number(trip.price), 0);

    cartItemsContainer.innerHTML =
      `<p>My Cart</p>` +
      cart
        .map(
          (trip, index) => `
        <div class="trim-data">
          <p><strong>${trip.departure}</strong> > <strong>${
            trip.arrival
          }</strong></p>
          <p>${new Date(trip.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}</p>
          <p>${trip.price}€</p>
          <button class="button-delete" data-index="${index}">X</button>
        </div>
      `
        )
        .join("") +
      `
      <div id="cart-total">
        <p>Total : ${total}€<p>
        <button id="button-purchase">Purchase</button>
      </div>`;
    deleteTrip();
    updateBookingsPage();
  }
}

function deleteTrip() {
  const deleteButtons = document.querySelectorAll(".button-delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      cart.splice(this.getAttribute("data-index"), 1);
      renderCart();
    });
  });
}

function updateBookingsPage() {
  document.querySelector("#button-purchase").addEventListener("click", () => {
    bookings.push(...cart);
    bookings.sort((a, b) => new Date(a.date) - new Date(b.date));
    cart.length = 0;
    console.log(bookings);
    renderCart();

    document.querySelector("#bookings > p:first-child").style.display = "none";
    document.querySelector("#bookings > p:nth-child(2)").style.display = "none";
    document.querySelector("#cart").style.display = "none";
    document.querySelector("#bookings").style.display = "block";

    document.getElementById("bookings-items").innerHTML =
      `<p>My bookings</p>` +
      bookings
        .map((trip) => {
          const formatDate = new Date(trip.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const diffMs = new Date(trip.date).getTime() - Date.now();
          const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
          return `
        <div class="trim-data">
          <p>${trip.departure} > ${trip.arrival}</p>
          <p>${formatDate}</p>
          <p>${trip.price}€</p>
          <p>${
            diffHours > 0
              ? `Departure in ${diffHours} hours`
              : `Already left the station`
          }</p>
          
        </div>
      `;
        })
        .join("") +
      `
      <div id="bookings-separator"></div>
      <p class='green'>Enjoy your travels with Tickethack!</p>
      `;
  });
}
