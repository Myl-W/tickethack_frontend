// ┬─┬ノ( º _ ºノ)
// (╯°□°)╯︵ ┻━┻
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
