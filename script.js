/* Règle du mastermind :

    - C'est un jeu qui ce joue à deux
    - Le jeu se joue en 12 étapes (on peut en rajouter ou en enlever pour moins ou plus de difficulté)
    - Un des joueurs doit créer une combinaison secrète de 4 pions de couleur mis dans 4 trous
    - Le joueur qui devine devra trouver la combinaison en maximum 12 étapes
    - Un indice de réussite sera indiquer au joueur à chaque proposition (par exemple pion de bonne couleur mais mal placé va être matérialisé par un indice de couleur gris, pion de mauvaise couleur et mal placé égal indice de couleur noir, pion bien placé et de bonne couleur égal indice de couleur blanc)
    - Le joueur est gagnant si il trouve la combinaison en 12 propositions ou moins
    - S'il échoue c'est celui qui a fait la combinaison qui gagne
    
*/


// Variable dont on va avoir besoin dans le jeu
var nombrePropositions = [];
var indice = ["noir", "gris", "blanc"];
var joueur = ["joueurDevine", " joueurCombinaison"];
var trou = ["1", "2", "3", "4"];
var trouIndice = ["1", "2", "3", "4"];
var pion = ["1", "2", "3", "4"];
var couleur = ["vert", "jaune", "bleu", "rouge", "orange", "violet"];
var combinaisonRechercher = [];


let gameContainer = document.getElementById("gameContainer");
let gameSection = document.querySelector(".gameSection");
let button = document.querySelectorAll(".button");

function createCombination() {

    
    
}

createCombination();

/*
function getRandomColor(min, max) {
    
    return Math.floor(Math.random() * (max - min) + min);
}

console.log(getRandomColor(0,4));
*/

// Cette fonction va parcourrir les 4 boutons, un nombre aléatoire est créer, pour chaque boutons parcouru on lui affecte un nombre aléatoires compris ebtre 0 et 5 correspondant au 6 couleurs
function createRandomNumber() {

    for(i = 0; i <= 3; i++) {

        var nombreAleatoire = Math.floor(Math.random() * (6 - 0) + 0);
        console.log(nombreAleatoire);
        
        if(nombreAleatoire == 0) {
 
         combinaisonRechercher[i] = couleur[0];
 
        } else if(nombreAleatoire == 1) {
 
         combinaisonRechercher[i] = couleur[1];
 
        } else if(nombreAleatoire == 2) {
 
         combinaisonRechercher[i] = couleur[2];
 
        } else if(nombreAleatoire == 3) {
 
         combinaisonRechercher[i] = couleur[3];
 
        } else if(nombreAleatoire == 4) {
 
         combinaisonRechercher[i] = couleur[4];
 
        } else if(nombreAleatoire == 5) {
 
         combinaisonRechercher[i] = couleur[5];
 
        }
 
    }

}

createRandomNumber();