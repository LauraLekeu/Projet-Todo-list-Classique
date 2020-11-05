"use strict";

window.onload = function() { // window.onload = Evènement particulier qui s'assure que le DOM est complétement chargé

  // CAPTURER LES ELEMENTS
  const newTacheInput = document.querySelector('.new-todo');
  const listeTaches = document.querySelector('.todo-list');


  // FONCTION AJOUT D'UNE TACHE :
  function addItem(element) {
    // Créer un nouveau li:
    const newLi = document.createElement('li');
    newLi.classList.add('listItem');
    newLi.classList.add('cache'); // Cacher la nouvelle tache (app.css)
    newLi.innerHTML = `
      <input class="toggle" type="checkbox" />
      <label> ${element.value} </label>
      <button class="destroy"></button>
    `;
    // Ajouter la new tâche au début de la liste avec un slideDown
    listeTaches.insertBefore(newLi, listeTaches.childNodes[0]); // insertBefore( ce que j'ajoute, à quel endroit) ici : avant le premier enfant de listeTaches
    setTimeout(function(){
      listeTaches.childNodes[0].classList.remove('cache'); // Virer la classe cache pour avoir l'animation
    });
    // Vider le champ de texte (newTacheInput)
    element.value = '';
  }


  // CAPTURE DES EVENEMENTS
  newTacheInput.addEventListener('keyup', function(e){
    if (e.keyCode === 13) {
      addItem(this); //
    }
  });
}
