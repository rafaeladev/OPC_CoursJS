import { ajoutListenersAvis, ajoutListenerEnvoyerAvis, afficherAvis } from "./avis.js";
//Récupération des pièces eventuellement stockées dans le localStorage
let pieces = window.localStorage.getItem('pieces');

if (pieces === null){
    // Récupération des pièces depuis l'API
    const reponse = await fetch('http://localhost:8081/pieces/');
    pieces = await reponse.json();
    // Transformation des pièces en JSON
    const valeurPieces = JSON.stringify(pieces);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("pieces", valeurPieces);
}else{
    pieces = JSON.parse(pieces);
}
// on appel la fonction pour ajouter le listener au formulaire
ajoutListenerEnvoyerAvis()

// Récupération des pièces depuis le fichier JSON
//const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json());

function genererPieces(pieces){
    for (let i = 0; i < pieces.length; i++) {

        const article = pieces[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        pieceElement.dataset.id = pieces[i].id
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
        //Code ajouté
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";
        
        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
        //Code aJouté
        pieceElement.appendChild(avisBouton);
    
     }
     ajoutListenersAvis();
}

genererPieces(pieces);

for(let i = 0; i < pieces.length; i++){
    const id = pieces[i].id;
    const avisJSON = window.localStorage.getItem(`avis-piece-${id}`);
    const avis = JSON.parse(avisJSON);

    if(avis !== null){
        const pieceElement = document.querySelector(`article[data-id="${id}"]`);
        afficherAvis(pieceElement, avis)
    }
}
 
//-----------Gestion des boutons 
//--Trier les élements

const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
     });
     //console.log(piecesOrdonnees);
     // Effacement de l'écran et regénération de la page
     document.querySelector(".fiches").innerHTML = "";
     genererPieces(piecesOrdonnees);
 });


//--Filtrer les élements
const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.prix <= 35;
    });
     //console.log(piecesFiltrees);
     // Effacement de l'écran et regénération de la page
     document.querySelector(".fiches").innerHTML = "";
     genererPieces(piecesFiltrees);
});

//Créer une liste avec le nom des pièces
/*const noms1 = pieces.map(piece => piece.nom);
console.log(noms1);
 
//Suprimmer le nom des pieces qui possedent un prix supérieur à 35€
const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
   if(pieces[i].prix > 35){
       noms.splice(i,1);
   }
}
console.log(noms)*/


//--Ex : Trier les élements par prix décroissant
const boutonTrierDecroissant = document.querySelector(".btn-decroissant");

boutonTrierDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
     });
     //console.log(piecesOrdonnees);
     // Effacement de l'écran et regénération de la page
     document.querySelector(".fiches").innerHTML = "";
     genererPieces(piecesOrdonnees);
 });



//--Ex : Filtrer les élements : afficher que les pièces qui ont une description
const boutonFiltrerDescription = document.querySelector(".btn-nodesc");

boutonFiltrerDescription.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.description
     });
     console.log(piecesFiltrees);
     // Effacement de l'écran et regénération de la page
     document.querySelector(".fiches").innerHTML = "";
     genererPieces(piecesFiltrees);
});

const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i,1);
    }
}
console.log(noms)

//--Afficher une liste avec les pièces dites "abordables"
//Création de l'en-tête

const pElement = document.createElement('p')
pElement.innerText = "Pièces abordables";
//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText = noms[i];
   abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
   .appendChild(pElement)
   .appendChild(abordablesElements)

//--Afficher une liste avec les pièces disponibles
const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);
for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].disponibilite === false){
        nomsDisponibles.splice(i,1)
        prixDisponibles.splice(i,1)
    }
 }

 //Création de l'en-tête
const pElement2 = document.createElement('p')
pElement2.innerText = "Pièces disponibles";
//Création de la liste des disponibles
const disponiblesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < nomsDisponibles.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`
    disponiblesElements.appendChild(nomElement)
   
 }

 document.querySelector('.disponibles')
    .appendChild(pElement2)
    .appendChild(disponiblesElements)

 const inputPrixMax = document.querySelector('#prix-max')
 inputPrixMax.addEventListener('input', function (){
    const piecesFiltrees = pieces.filter(function (piece){
        return piece.prix <= inputPrixMax.value;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
 })


// Ajout du listener pour mettre à jour des données du localStorage
 const boutonMettreAJour = document.querySelector(".btn-maj");
 boutonMettreAJour.addEventListener("click", function () {
   window.localStorage.removeItem("pieces");
});
