/* Règle du mastermind :

    - C'est un jeu qui ce joue à deux
    - Le jeu se joue en 12 étapes (on peut en rajouter ou en enlever pour moins ou plus de difficulté)
    - Un des joueurs doit créer une combinaison secrète de 4 pions de couleur mis dans 4 trous
    - Le joueur qui devine devra trouver la combinaison en maximum 12 étapes, les étapes corresponderont à des lignes
    - Un indice de réussite sera indiquer au joueur à chaque proposition (par exemple un pion de mauvaise couleur et mal placé égal indice de couleur noir, pion bien placé et de bonne couleur égal indice de couleur blanc)
    - Le joueur est gagnant si il trouve la combinaison en 12 propositions ou moins
    - S'il échoue c'est celui qui a fait la combinaison qui gagne
    
*/

var Mastermind = {

    // Variable dont on va avoir besoin dans le jeu

    //couleur que le joueur pourra utiliser
    couleur: {

        vert: '#008000',//vert
        jaune: '#FFFF00',//jaune
        bleu: '#0000FF',//bleu
        rouge: '#FF0000',//rouge
        orange: '#FFA500',//orange
        violet: '#9370DB',//violet
    },

    //réglage de la partie
    paramètre: {

        lignes: 12,//ligne disponible pour arriver à la solution du résultat
        colonnes: 4,//colonnes qui sera remplis des couleurs par le joueur
        couleurs: 6,//couleur disponible
    },

    //valeur courante de la progression de la partie
    jeu: {

        turn: 1,//tour en cours
        colonne: 1,//colonne en cours
        selectionDeCouleur: new Array(),//sélection de la couleur dans un tableau dédié aux choix des couleurs
        solution: new Array(),//solution de la partie
    },

    //indice qui indiquera au joueur le statut des couleurs qu'il aura placé
    indice: {

        noir: '#000000',//noir pour un pion mal placé 
        blanc: '#FFFFFF',//blanc pour un pion bien placé
    },

    //fonction qui va venir initialiser la partie (créer le tableau/la grille du jeu, remettre les données à zéro ainsi que de définir la solution du jeu)
    initialisationDuJeu: function() {

        this.dessinerPlateau();
        this.remettreDonneesAZero();
        this.solutionDuJeu();

    },

    //fonction qui va dessiner le plateau du jeu
    dessinerPlateau: function() {

        let plateau = document.getElementById('plateau');
        plateau.innerHTML = '';

    }
}
