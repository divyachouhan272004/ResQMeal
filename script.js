document.addEventListener("DOMContentLoaded", () => {

  const menu = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menu && navLinks) {
    // On desktop, navigation is visible by default; on mobile it starts collapsed.
    navLinks.hidden = window.innerWidth <= 720;
    
    const closeMenu = () => {
      navLinks.classList.remove("show");

      // Hide navigation only on mobile screens.
      navLinks.hidden = window.innerWidth <= 720;

      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-label", "Open navigation menu");
    };


    menu.addEventListener("click", () => {
      const isOpen = menu.getAttribute("aria-expanded") !== "true";
      navLinks.hidden = !isOpen;
      navLinks.classList.toggle("show", isOpen);
      menu.setAttribute("aria-expanded", String(isOpen));
      menu.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
      if (isOpen) navLinks.querySelector("a")?.focus();
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menu.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 720) {
        navLinks.hidden = false;
        navLinks.classList.remove("show");
        menu.setAttribute("aria-expanded", "false");
      } else if (menu.getAttribute("aria-expanded") !== "true") {
        navLinks.hidden = true;
      }
    });
  }

  const foodGrid = document.querySelector("#food-grid");
  const searchInput = document.querySelector("#food-search");
  const filterSelect = document.querySelector("#food-filter");
  const listingCount = document.querySelector("#listing-count");
  const emptyState = document.querySelector("#empty-state");

  function updateListings() {

    if (!foodGrid) return;

    const searchText = searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";

    const selectedCategory = filterSelect
      ? filterSelect.value
      : "all";

    const cards = foodGrid.querySelectorAll(".food-card");

    let visibleCount = 0;

    cards.forEach((card) => {

      const searchData = (
        card.dataset.search || ""
      ).toLowerCase();

      const cardText = card.textContent.toLowerCase();

      const category = card.dataset.category || "";

      const matchesSearch =
        searchText === "" ||
        searchData.includes(searchText) ||
        cardText.includes(searchText);

      const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory;

      const shouldShow =
        matchesSearch && matchesCategory;

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount++;
      }
    });

    if (listingCount) {
      listingCount.textContent = `${visibleCount} listing${visibleCount === 1 ? "" : "s"} shown`;
    }
    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  }

  if (searchInput) {
    searchInput.addEventListener(
      "input",
      updateListings
    );
  }

  if (filterSelect) {
    filterSelect.addEventListener(
      "change",
      updateListings
    );
  }

  const claimModal =
    document.querySelector("#claim-modal");

  const claimMessage =
    document.querySelector("#claim-message");

  const confirmClaim =
    document.querySelector("#confirm-claim");

  let selectedCard = null;
  let claimModalOpener = null;
  let listModalOpener = null;


  function closeClaimModal() {

    if (!claimModal) return;

    claimModal.hidden = true;
    document.body.classList.remove("modal-open");
    selectedCard = null;
    if (claimModalOpener && document.contains(claimModalOpener)) claimModalOpener.focus();
  }

  document.querySelectorAll(".claim-btn").forEach((button) => {

    button.addEventListener("click", () => {

      claimModalOpener = button;
      selectedCard = button.closest(".food-card");

      const foodName =
        selectedCard?.querySelector("h3")?.textContent ||
        "this food listing";

      if (claimMessage) {

        claimMessage.textContent =
          `Confirm that you want to reserve ${foodName}.`;

      }

      if (claimModal) {
        claimModal.hidden = false;
        document.body.classList.add("modal-open");
        claimModal.querySelector(".modal-card")?.focus();
      }

      if (confirmClaim) confirmClaim.focus();

    });

  });

  document.querySelectorAll("[data-close-modal]")
    .forEach((element) => {

      element.addEventListener(
        "click",
        closeClaimModal
      );

    });

  if (confirmClaim) {

    confirmClaim.addEventListener("click", () => {

      if (!selectedCard) return;

      const claimButton =
        selectedCard.querySelector(".claim-btn");

      const availability =
        selectedCard.querySelector(".available");


      if (claimButton) {

        claimButton.textContent =
          "Claimed ✓";

        claimButton.disabled = true;

      }


      if (availability) {

        availability.textContent =
          "● Reserved";

        availability.classList.add(
          "reserved"
        );

      }


      closeClaimModal();

      showToast(
        "Food claimed successfully. Pickup details can be confirmed with the donor."
      );

    });

  }


  const listModal =
    document.querySelector("#list-modal");

  const openListForm =
    document.querySelector("#open-list-form");

  const listForm =
    document.querySelector("#list-form");

  const formError =
    document.querySelector("#form-error");


  function closeListModal() {

    if (listModal) {
      listModal.hidden = true;
      document.body.classList.remove("modal-open");
    }
    if (listModalOpener && document.contains(listModalOpener)) listModalOpener.focus();

  }


  // Open form
  if (openListForm) {

    openListForm.addEventListener(
      "click",
      () => {
        listModalOpener = openListForm;

        if (listModal) {
          listModal.hidden = false;
          document.body.classList.add("modal-open");
          listModal.querySelector(".modal-card")?.focus();
        }

        const firstInput =
          listForm?.querySelector("input");

        if (firstInput) {
          firstInput.focus();
        }

      }
    );

  }


  // Close form
  document.querySelectorAll("[data-close-list]")
    .forEach((element) => {

      element.addEventListener(
        "click",
        closeListModal
      );

    });

  if (listForm) {

    listForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const formData =
          new FormData(listForm);


        const foodName =
          String(
            formData.get("foodName") || ""
          ).trim();


        const category =
          String(
            formData.get("category") || ""
          ).trim();


        const quantity =
          Number(
            formData.get("quantity")
          );


        const location =
          String(
            formData.get("location") || ""
          ).trim();


        /* Validation */

        if (
          !foodName ||
          !category ||
          !Number.isInteger(quantity) ||
          quantity < 1 ||
          !location
        ) {

          if (formError) {

            formError.textContent =
              "Please complete all fields and enter a valid quantity.";

          }

          return;

        }


        if (formError) {
          formError.textContent = "";
        }


        /* Category information */

        const categoryLabels = {

          bakery: "BAKERY",

          meals: "PREPARED MEALS",

          produce: "FRESH PRODUCE"

        };


        const foodEmoji = {

          bakery: "🥐",

          meals: "🍱",

          produce: "🥬"

        };


        /* Create new food card */

        const newCard =
          document.createElement("article");


        newCard.className =
          "food-card new-listing";


        newCard.dataset.category =
          category;


        newCard.dataset.search =
          `${foodName}
           ${categoryLabels[category]}
           ${location}`.toLowerCase();


        newCard.innerHTML = `

          <div class="food-image ${category}">

            <span>
              ${foodEmoji[category]}
            </span>

            <small>
              ${categoryLabels[category]}
            </small>

          </div>


          <div class="food-body">

            <div class="tag-row">

              <span class="available">
                ● Available
              </span>

              <span>
                New listing
              </span>

            </div>


            <h3>
              ${escapeHtml(foodName)}
            </h3>


            <p>
              ${escapeHtml(quantity)}
              portions available near
              ${escapeHtml(location)}.
            </p>


            <div class="card-bottom">

              <strong>
                ${escapeHtml(quantity)}
                portions
              </strong>

              <span>
                Available today
              </span>

            </div>


            <button
              type="button"
              class="claim-btn"
            >
              View & Claim
            </button>

          </div>

        `;


        if (foodGrid) {

          foodGrid.appendChild(newCard);

        }


        /* Add claim functionality to new card */

        const newClaimButton =
          newCard.querySelector(".claim-btn");


        if (newClaimButton) {

          newClaimButton.addEventListener(
            "click",
            () => {

              selectedCard = newCard;


              if (claimMessage) {

                claimMessage.textContent =
                  `Confirm that you want to reserve ${foodName}.`;

              }


              if (claimModal) {
                claimModal.hidden = false;
              }


              if (confirmClaim) {
                confirmClaim.focus();
              }

            }
          );

        }


        /* Reset form */

        listForm.reset();


        closeListModal();


        updateListings();


        showToast(
          "Your surplus food listing was added successfully."
        );


        newCard.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }
    );

  }


  function escapeHtml(value) {

    const div =
      document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

  }


  const toast =
    document.querySelector("#toast");

  let toastTimer;


  function showToast(message) {

    if (!toast) return;


    toast.textContent =
      message;


    toast.classList.add(
      "show"
    );


    clearTimeout(
      toastTimer
    );


    toastTimer =
      setTimeout(() => {

        toast.classList.remove(
          "show"
        );

      }, 3500);

  }


  document.addEventListener("keydown", (event) => {
    const openModal = [claimModal, listModal].find((modal) => modal && !modal.hidden);
    if (!openModal) return;

    if (event.key === "Escape") {
      if (openModal === claimModal) closeClaimModal();
      else closeListModal();
      return;
    }

    if (event.key === "Tab") {
      const focusable = [...openModal.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      )].filter((element) => element.offsetParent !== null);

      if (!focusable.length) {
        event.preventDefault();
        openModal.querySelector(".modal-card")?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  updateListings();

});