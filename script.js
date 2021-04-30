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
    parametre: {

        lignes: 12,//ligne disponible pour arriver à la solution du résultat
        colonnes: 4,//colonnes qui sera remplis par le joueur
        couleurs: 6,//couleur disponible
    },

    //valeur courante de la progression de la partie
    jeu: {

        tour: 1,//tour en cours
        colonne: 1,//colonne en cours
        selectionDeCouleur: new Array(),//sélection de la couleur dans un tableau dédié aux choix des couleurs
        solution: new Array(),//solution de la partie
    },

    //indice qui indiquera au joueur le statut des couleurs qu'il aura placé
    indice: {

        noir: '#000000',//noir pour un pion mal placé 
        blanc: '#FFFFFF',//blanc pour un pion bien placé
    },

    //fonction qui va dessiner le plateau du jeu
    dessinerPlateau: function() {

        let plateau = document.getElementById('plateau');
        plateau.innerHTML = '';

        //création du plateau de jeu avec les colonnes et les lignes que l'on à renseigné en variable, le joueur joue de bas en haut mais le tableau sera dessiner de haut en bas il faut inverser les lignes
        for(i = this.parametre['lignes']; i > 0; i--) {

            //création d'une ligne
            line = document.createElement('tr');
            //a chaque ligne on décompte un tour au joueur et on passe à la ligne suivante
            line.id = 'tour-' + i;

            //on crée des cellules pour chaque ligne ajouté
            cell = document.createElement('td');
            //on indique la ligne suivante se situe à cette cellule
            cell.innerHTML = i;
            //la taille d'une cellule est de 32px
            cell.style.width = '32px';
            //on indique que la cellule est l'enfant de la ligne, qu'elle apparaitera dans la ligne
            line.appendChild(cell);

            //on boucle sur chaque colonne présent dans une ligne
            for(j = 1; j <= this.parametre['colonnes']; j++) {

                //on créer des cellules (colonne) pour chaque ligne
                cell = document.createElement('td');
                //on vide la cellule
                cell.innerHTML = '';
                //on fait correspondre l'id de la cellule avec la ligne et la colonne du tours courant du joueur
                cell.id = 'tour-' + i + '-' + j;
                cell.style.width = '32px';
                //on ajoute un nouvelle élément en cliquant sur la colonne qui contiendra l'indice de la ligne et l'indice de la colonne
                cell.setAttribute('onclick', '.setColonnes('+i+', '+j+');');
                //on indique que la cellule sera remplacé et sera dans la même ligne ou elle était au départ
                line.appendChild(cell);

            }

            for(j = 1; j <= this.parametre['colonnes']; j++) {

                //on créer une cellule spécifique pour le résutat
                cell = document.createElement('td');
                //on vide la cellule
                cell.innerHTML = '';
                //on fait correspondre l'id de la cellule avec les lignes et colonnes du résultat
                cell.id = 'resultat-'+i+'-'+j;
                cell.style.width = '16px';
                //on indique que la cellule sera remplacé et sera dans la même ligne ou elle était au départ
                line.appendChild(cell);
            }

            //on créer une cellule une cellule spécifique pour la validation
            cell = document.createElement('td');
            //on met le texte OK
            cell.innerHTML = 'OK';
            //on fait correspondre l'id de la cellule avec les lignes et colonnes de la véririfation du résultat
            cell.id = 'valider-' +i;
            cell.className = 'valid';
            cell.style.width = '16px';
            //on check la ligne en ajoutant un nouvel élément, au clique on viendraa vérifier l'indice de la ligne
            line.setAttribute('onclick', '.checkLine('+i+');');
            //on indique que la cellule sera remplacé et sera dans la même ligne ou elle était au départ
            line.appendChild(cell)

            //toute les lignes seront à l'intérieur du plateau de jeu
            plateau.appendChild(line);

        }

        selectionDeCouleur = document.getElementById('selectionDeCouleur');
        selectionDeCouleur.innerHTML = '';

        //on créer une ligne pour la sélection des couleurs
        line = document.createElement('tr');

        //boucle qui va parcourrir toute les couleurs 
        for(i = 1; i <= this.parametre['couleurs']; i++) {

            //on créer des cellules pour chaque couleur
            cell = document.createElement('td');
            //on vide les cellules
            cell.innerHTML = '';
            cell.style.width = '32px';
            //on place les cellules dans chaque ligne
            line.appendChild(cell);

            //on créer une div dans la ligne spécialment concu pour le choix des couleurs
            pion = document.createElement('div');
            //on lui donne la classe pion
            pion.className = 'pion';
            //on modifie son backgroundColor en fonction de la couleur que l'on sélectionne
            pion.style.background = this.couleurs[i];
            //on lui attribue une couleur
            pion.setAttribute('onclick', '.selectColor('+i+');');
            //on place le pion dans la cellule
            cell.appendChild(pion);

        }

        //la ligne sera l'enfant de la div sectionDeCouleur
        selectionDeCouleur.appendChild(line);


    },

    //fonction qui va remettre le joueur sur la première ligne et la première colonne
    remettreDonneesAZero: function() {

        this.jeu['tour'] = 1;
        this.jeu['colonne'] = 1;

        document.getElementById('tour-1').className = 'selected';
        document.getElementById('tour-1-1').className = 'selected';
    },

    //fonction qui va venir initialiser la partie (créer le tableau/la grille du jeu, remettre les données à zéro ainsi que de définir la solution du jeu)
    initialisationDuJeu: function() {
        
        this.dessinerPlateau();
        this.remettreDonneesAZero();
        this.solutionDuJeu();

    },

    
}

window.onload = function() {

    Mastermind.initialisationDuJeu();

};
