document.addEventListener("DOMContentLoaded", function () {
  const boutons = document.querySelectorAll(".filtre-btn");
  const groupes = document.querySelectorAll(".groupe");
  const blocsTexte = document.querySelectorAll(".bloc-image-texte");
  const formulaire = document.querySelector(".formulaire-contact");
  const categorieInput = document.getElementById("categorieProjet");

  function initCarousel(galerie) {
    $(galerie)
      .addClass("owl-carousel")
      .owlCarousel({
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

  function destroyCarousel(galerie) {
    if ($(galerie).hasClass("owl-loaded")) {
      $(galerie).trigger("destroy.owl.carousel");
      $(galerie).removeClass("owl-carousel owl-loaded");

      // Restaurer le HTML d'origine
      const originalHtml = galerie.dataset.originalHtml;
      if (originalHtml) {
        galerie.innerHTML = originalHtml;
      }
    }
  }

  // Sauvegarde du contenu initial des galeries
  document.querySelectorAll(".galerie-defilante").forEach(galerie => {
    galerie.dataset.originalHtml = galerie.innerHTML;
  });

  boutons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const categorie = btn.dataset.categorie;

      // Activer le bouton
      boutons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Cacher/montrer les blocs texte
      blocsTexte.forEach((bloc) => {
        if (bloc.classList.contains("toujours-visible") || bloc.dataset.categorie === categorie) {
          bloc.style.display = "flex";
        } else {
          bloc.style.display = "none";
        }
      });

      // Détruire tous les anciens carousels
      groupes.forEach((groupe) => {
        const galerie = groupe.querySelector(".galerie-defilante");
        if (galerie) destroyCarousel(galerie);
      });

      // Afficher le bon groupe
      groupes.forEach((groupe) => {
        groupe.style.display = groupe.dataset.categorie === categorie ? "block" : "none";
      });

      // Réinitialiser le carousel actif
      const activeGalerie = document.querySelector(`.groupe[data-categorie="${categorie}"] .galerie-defilante`);
      if (activeGalerie) {
        initCarousel(activeGalerie);
      }

      // MAJ champ formulaire
      if (categorieInput) {
        categorieInput.value = categorie;
        if (formulaire) formulaire.style.display = "block";
      }
    });
  });

  // === INIT au chargement ===
  const premiereCategorie = groupes[0]?.dataset.categorie;
  groupes.forEach((groupe, index) => {
    groupe.style.display = index === 0 ? "block" : "none";
  });

  blocsTexte.forEach((bloc, index) => {
    bloc.style.display = index === 0 || bloc.classList.contains("toujours-visible") ? "flex" : "none";
  });

  boutons.forEach(b => b.classList.remove("active"));
  boutons[0].classList.add("active");

  const galerieInit = groupes[0].querySelector(".galerie-defilante");
  if (galerieInit) initCarousel(galerieInit);
  if (categorieInput && premiereCategorie) categorieInput.value = premiereCategorie;
  if (formulaire) formulaire.style.display = "block";
});
