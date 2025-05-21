document.addEventListener("DOMContentLoaded", function () {
  const boutons = document.querySelectorAll(".filtre-btn");
  const groupes = document.querySelectorAll(".groupe");

  function initCarousel(owlElement) {
    $(owlElement).owlCarousel({
      items: 3,
      margin: 10,
      loop: true,
      autoplay: true,
      autoplayTimeout: 3000,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 }
      }
    });
  }

  boutons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const categorie = btn.dataset.categorie;

      // Active le bouton cliqué
      boutons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Affiche uniquement le groupe sélectionné
      groupes.forEach((groupe) => {
        if (categorie === "all" || groupe.dataset.categorie === categorie) {
          groupe.style.display = "block";
        } else {
          groupe.style.display = "none";
        }
      });

      // Détruit tous les carousels
      $(".galerie-defilante").trigger('destroy.owl.carousel');

      // Initialise le carousel du groupe visible seulement
      const galerieVisible = document.querySelector(`.groupe[data-categorie="${categorie}"] .galerie-defilante`);
      if (galerieVisible) {
        initCarousel(galerieVisible);
      }
    });
  });

  // Au chargement, afficher premier groupe et init son carousel
  if (groupes.length > 0) {
    groupes.forEach((groupe, index) => {
      groupe.style.display = index === 0 ? "block" : "none";
    });

    boutons.forEach(b => b.classList.remove("active"));
    boutons[0].classList.add("active");

    const premierOwl = groupes[0].querySelector(".galerie-defilante");
    if (premierOwl) {
      initCarousel(premierOwl);
    }
  }
});
