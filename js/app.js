"use strict";

window.onload = function() { // window.onload = Evènement particulier qui s'assure que le DOM est complétement chargé
/* -----------------------------------------------------------------------------
      CAPTURER LES ELEMENTS
-------------------------------------------------------------------------------- */
  const newTacheInput = document.querySelector('.new-todo');
  const listeTaches = document.querySelector('.todo-list');

  const compteurTaches = document.getElementById('todo-count');


/* -----------------------------------------------------------------------------
      FONCTIONS
-------------------------------------------------------------------------------- */

/**
* [AJOUT D'UNE TÂCHE]
* @param {[type]} nouvelleTache [description]
*/
  function addItem(nouvelleTache) {
    // Créer un nouveau li:
    const newLi = document.createElement('li');
    newLi.classList.add('listItem');
    newLi.classList.add('cache'); // Cacher la nouvelle tache (app.css)
    newLi.innerHTML = `
      <input class="toggle" type="checkbox" />
      <label> ${nouvelleTache.value} </label>
      <button class="destroy"></button>
    `;
    // Ajouter la new tâche au début de la liste avec un slideDown
    listeTaches.insertBefore(newLi, listeTaches.childNodes[0]); // insertBefore( ce que j'ajoute, à quel endroit) ici : avant le premier enfant de listeTaches
    setTimeout(function(){
      listeTaches.childNodes[0].classList.remove('cache'); // Virer la classe cache pour avoir l'animation
    });
    // Vider le champ de texte (newTacheInput)
    nouvelleTache.value = '';
    // Lancement des fonctions après avoir ajouté une nouvelle tâche
    displayNotCompleted();  // Compter les tâches
    activerCheckboxes();    // Pouvoir activer les nouvelles checkboxes
    activerModification();  // Pouvoir modifier les nouvelles tâches
  }


/**
* [COMPTEUR DES TÂCHES RESTANTES]
* @return {[type]} [description]
*/
  function displayNotCompleted() {
    compteurTaches.innerText = listeTaches.querySelectorAll('li:not(.completed)').length; // selectionner tous les li qui n'ont pas de classe completed
  }


/**
* [BASCULER ENTRE L'AJOUT ET LA SUPRESSION D'UN NOM DE CLASSE]
* @param  {[type]} tache [description]
* @return {[type]}       [description]
*/
  function toggleItem(tache) {
    tache.classList.toggle('completed')  // Correspond au li
    displayNotCompleted(); // Compter le nombre de tâche restantes
  }


/**
* [MODIFIER LE TEXTE D'UNE TÂCHE]
* @param  {[type]} tache [description]
* @return {[type]}       [description]
*/
  function editItem(tache) {
    const newValue = tache.querySelector('label').innerText;
    tache.querySelector('label').innerHTML = ` <input type="texte" value="${newValue}" class="new-todo" /> ` ;
  }



/* -----------------------------------------------------------------------------
      CAPTURE DES EVENEMENTS
-------------------------------------------------------------------------------- */

  // Appuyer sur la touche "Enter" pour ajouter la new tâche
  newTacheInput.addEventListener('keyup', function(e){
    if (e.keyCode === 13) {
      addItem(this); //
    }
  });


  // Cliquer sur une checkbox quand la tâche est terminée (.toggle)
  function activerCheckboxes() {
    const toggleInputs = document.querySelectorAll('.toggle'); // Selectionner les classes toggle
    for ( let toggleInput of toggleInputs) {
      toggleInput.onclick = function() {
        toggleItem(this.closest('li'));
      }
    }
  }


  // Double cliquer sur une tâche non terminée pour la modifier (.listItem:not(.completed))
  function activerModification() {
    const tachesNonCompete = listeTaches.querySelectorAll('.listItem:not(.completed)');
    for (let tacheNonCompete of tachesNonCompete) {
      tacheNonCompete.ondblclick = function() {
        editItem(this);
      }
    }
  }


/* -----------------------------------------------------------------------------
      LANCEMENT DE FONCTIONS AU CHARGEMENT DE LA PAGE
-------------------------------------------------------------------------------- */
  displayNotCompleted(); // Compter les tâches
  activerCheckboxes();   // Pouvoir activer les checkboxes
  activerModification(); // Pouvoir modifier une tâche



}
