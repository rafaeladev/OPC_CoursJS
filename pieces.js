// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

//Création des balises HTML
/*
const article = pieces[0];
const imageElement = document.createElement("img");
imageElement.src = article.image;
const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;
const prixElement = document.createElement("p");
prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
const categorieElement = document.createElement("p");
categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
*/

//Afficher les pieces sur la page web
//const sectionFiches = document.querySelector(".fiches");
//sectionFiches.appendChild(imageElement);
//sectionFiches.appendChild(nomElement);
//sectionFiches.appendChild(prixElement);
//sectionFiches.appendChild(categorieElement);

//Afficher toutes les pices sur la page
for (let i = 0; i < pieces.length; i++) {
    const article = pieces [i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    // On crée l’élément img.
    const imageElement = document.createElement("img");
    // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
    imageElement.src = article.image;
    // On crée l’élément titre.
    const nomElement = document.createElement("h2");
    // On accède à l’indice i de la liste pieces pour acceder au nom de la piece.
    nomElement.innerText = article.nom;
    // On crée l’élément texte p.
    const prixElement = document.createElement("p");
    // On accède à l’indice i de la liste pieces pour acceder au prix de la piece.
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    // On crée un autre élément texte p.
    const categorieElement = document.createElement("p");
    // On accède à l’indice i de la liste pieces pour acceder à la catégorie de la piece.
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
    // On crée un autre élément texte p.
    const descriptionElement = document.createElement("p");
    // On accède à l’indice i de la liste pieces pour acceder à la description de la piece.
    descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
    // On crée un autre élément texte p.
    const stockElement = document.createElement("p");
    // On accède à l’indice i de la liste pieces pour acceder au stock de la piece.
    stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
    
    // On rattache la balise article à la section Fiches
    sectionFiches.appendChild(pieceElement);
    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    // On rattache le nom à pieceElement (la balise article)
    pieceElement.appendChild(nomElement);
    // On rattache le prix à pieceElement (la balise article)
    pieceElement.appendChild(prixElement);
    // On rattache la catégorie à pieceElement (la balise article)
    pieceElement.appendChild(categorieElement);
    // On rattache la description à pieceElement (la balise article)
    pieceElement.appendChild(descriptionElement);
    // On rattache le stock à pieceElement (la balise article)
    pieceElement.appendChild(stockElement);
}

//-----------Trier les élements
const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
     });
     console.log(piecesOrdonnees);
 });


//-----------Filtrer les élements
const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.prix <= 35;
   });
   console.log(piecesFiltrees);
});

//Créer une liste avec le nom des pièces
const noms1 = pieces.map(piece => piece.nom);
console.log(noms1);

//Suprimmer le nom des pieces qui possedent un prix supérieur à 35€
const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
   if(pieces[i].prix > 35){
       noms.splice(i,1);
   }
}
console.log(noms)


//---------------Ex : Trier les élements par prix décroissant
const boutonTrierDecroissant = document.querySelector(".btn-trierdecroissant");

boutonTrierDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
     });
     console.log(piecesOrdonnees);
 });



//-----------Ex : Filtrer les élements : afficher que les pièces qui ont une description
const boutonFiltrerDescription = document.querySelector(".btn-filtrerdescription");

boutonFiltrerDescription.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.description
   });
   console.log(piecesFiltrees);
});



//---------------Afficher une liste avec les pièces dites "abordables"
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
   .appendChild(abordablesElements)

//--------------Afficher une liste avec les pièces disponibles

const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);
for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].disponibilite === false){
        nomsDisponibles.splice(i,1)
        prixDisponibles.splice(i,1)
    }
 }

//Création de la liste des disponibles
const disponiblesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < nomsDisponibles.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`
    disponiblesElements.appendChild(nomElement)
   
 }

 document.querySelector('.disponibles').appendChild(disponiblesElements)