// NAVBAR

document.addEventListener("DOMContentLoaded", function () {
  const toggler = document.querySelector(".toggler");
  const nav = document.querySelector("nav");

  toggler.addEventListener("click", function () {
    nav.style.display = nav.style.display === "none" ? "block" : "none";
  });
});

// // LOAD MORE BUTTON

const loadMoreButton = document.querySelector(".load-more-button");
const methodContainers = document.querySelectorAll(".method-container");
const loadMoreText = {
  more: "Laad meer",
  less: "Laad minder",
};
let showingAll = false;

loadMoreButton.addEventListener("click", () => {
  showingAll = !showingAll;
  const displayCount = showingAll ? methodContainers.length : 12;
  methodContainers.forEach((container, index) => {
    container.style.display = index < displayCount ? "block" : "none";
  });
  loadMoreButton.textContent = showingAll
    ? loadMoreText.less
    : loadMoreText.more;
});

methodContainers.forEach((container, index) => {
  container.style.display = index < 12 ? "block" : "none";
});
loadMoreButton.textContent = loadMoreText.more;
