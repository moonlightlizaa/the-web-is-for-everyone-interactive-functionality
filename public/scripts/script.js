// NAVBAR

document.addEventListener("DOMContentLoaded", function () {
  const toggler = document.querySelector(".toggler");
  const nav = document.querySelector("nav");

  toggler.addEventListener("click", function () {
    nav.style.display = nav.style.display === "none" ? "block" : "none";
  });
});

// LOAD MORE BUTTON

const methodsContainer = document.querySelector(".methods");
const loadMoreButton = document.querySelector(".load-more-button");

let methods = [];
let methodsToShow = 12;
let isShowingAllMethods = false;

function showMethods() {
  methodsContainer.innerHTML = "";

  methods.slice(0, methodsToShow).forEach((method) => {
    const methodHTML = `
      <div class="method">
        ${
          method.template && method.template.url
            ? `<img src="${method.template.url}" alt="Voorbeeld van ${method.title}">`
            : `<img src="/assets/placeholder.jpg" alt="Placeholder Image">`
        }
        <h2>${method.title}</h2>
      </div>
    `;
    methodsContainer.insertAdjacentHTML("beforeend", methodHTML);
  });

  if (methodsToShow >= methods.length) {
    loadMoreButton.textContent = "Laad Minder";
    isShowingAllMethods = true;
  } else {
    loadMoreButton.textContent = "Laad Meer";
    isShowingAllMethods = false;
  }
}

function getMethods() {
  fetch("https://api.visualthinking.fdnd.nl/api/v1/methods?first=100")
    .then((response) => response.json())
    .then((data) => {
      methods = data.methods;
      showMethods();
    })
    .catch((error) => {
      console.error("Error fetching methods:", error);
    });
}

getMethods();

loadMoreButton.addEventListener("click", function () {
  if (isShowingAllMethods) {
    methodsToShow = 12;
    loadMoreButton.textContent = "Laad Meer";
    isShowingAllMethods = false;
  } else {
    methodsToShow = methods.length;
    loadMoreButton.textContent = "Laad Minder";
    isShowingAllMethods = true;
  }
  showMethods();
});

// DROPDOWN MENU icon
