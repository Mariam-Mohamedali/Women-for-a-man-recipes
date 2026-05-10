function getCookie(name) {
  let cookieValue = null;

  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  return cookieValue;
}

function showEmptyFavouritesMessage() {
  const container = document.getElementById("favourites-container");
  if (!container) return;

  const visibleCards = container.querySelectorAll(".recipe-card");
  if (visibleCards.length === 0 && !document.getElementById("favourites-empty")) {
    container.insertAdjacentHTML(
      "beforeend",
      `<div class="empty-state" id="favourites-empty">
        <h2>No favourite recipes yet.</h2>
        <p>Browse recipes and click “Add Favourite” to save them here.</p>
        <a href="/recipes/" class="view-btn">Browse Recipes</a>
      </div>`
    );
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".favourite-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      const url = button.dataset.url;
      const recipeId = button.dataset.recipeId;

      button.disabled = true;

      fetch(url, {
        method: "POST",
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
          "X-Requested-With": "XMLHttpRequest"
        }
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json();
        })
        .then(function (data) {
          if (!data.success) return;

          const countElement = document.getElementById(`fav-count-${recipeId}`);

          if (data.is_favourite) {
            button.classList.add("active");
            button.textContent = "Remove Favourite";
          } else {
            button.classList.remove("active");
            button.textContent = "Add Favourite";

            const card = document.getElementById(`recipe-card-${recipeId}`);
            if (window.location.pathname.includes("favourites") && card) {
              card.remove();
              showEmptyFavouritesMessage();
            }
          }

          if (countElement) {
            countElement.textContent = data.count;
          }
        })
        .catch(function (error) {
          console.error("Favourite error:", error);
          alert("Could not update favourites. Please try again.");
        })
        .finally(function () {
          button.disabled = false;
        });
    });
  });
});
