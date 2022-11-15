// chapter 1 
// affichage du panier 
// voir ce qu'il y a dans le localStorage
let checkLocalStorage = window.localStorage.panier
console.log(checkLocalStorage)

// recupérer le panier
const getCart = async () => {
    let panier = JSON.parse(localStorage.getItem('panier'))
    for (let item of panier) {
        let itemId = item.id
        console.log(itemId)
        try {
            const url = (`http://localhost:3000/api/products/${itemId}`)
            const response = await fetch(url)
            console.log(response)
            if (!response.ok) {
                throw new Error(`Error ${response.status}`)
            }
            const data = await response.json();
            console.log(data)
        } catch (error) {
            alert(error)
        }
    }
}
getCart()





// faire une boucle sur le panier pour récuperer l'identifiant et faire un fetch au back pour recuperer les données manquante (prix ...)
// ------boucle for pour recupérer id du produit dans le panier
// ------fetch au back pour récuperer le prix et l'image du produit dont on viens d'obtenir l'identifiant

// afficher image nom et le localstorage (la couleur du produit et la quantité)
// ------afficher le resultat du fetch fait precedemment et la couleur/qty enregistré dans le localStorage





// creer trois fonction
// -modifier la quantité du produit (mettre a j la qty et prix total)
const changeProdQty = () => {
    // ajouter le nombre de produit que l'utilisateur veut ajouter au localstorage

    updateCart()
}

// -supprimer un produit (mettre a j la qty et prix total)
const deleteProd = () => {
    // retirer un produit du panier basket.pop()
    updateCart()
}

// -fonction qui met a j la qty et prix total
const updateCart = () => {
    // qty selectionné + (ou -) la quantité du panier
    // prix des éléments à ajouter + (ou -) le prix des éléments du panier
    // afficher le prix et la qty final
}



// chapter 2
// controle et recuperation du formulaire
// verifier que tout les champs du formulaire sont remplis
// récupérer le formulaire et envoyer le client sur une autre page lorsqu'il a validé son panier






// if (id à ajouter = id dans le panier && couleur a ajouté = couleur dans le panier){
//     quantité panier = quantité a ajouter + quantité panier
// } else  if (id a ajouter != id dans le panier){
//     creer nouvel element avec son image, son prix et sa couleur
// }






















for (const of ) {
    // creation element DOM + attribution de la data spécifique a chaque element
    let article = document.createElement('article');
    article.setAttribute('class', "cart__item");
    article.setAttribute('id',)
        article.setAttribute('data-color',)


const div = document.createElement('div');
div.setAttribute('class', "cart__item__img")


let image = document.createElement('img');
image.setAttribute('src',);
image.setAttribute('alt', "Photographie d'un canapé");

// ferme div

const div2 = document.createElement('div');
div2.setAttribute('class', "cart__item__content")

const div3 = document.createElement('div');
div3.setAttribute('class', "cart__item__content__description")

//nom du produit
const title = document.createElement('h2');
title.textContent("")

// couleur du produit
const paragraph = document.createElement('p');
title.textContent()

// prix du produit 
const paragraph2 = document.createElement('p');
title.textContent(+ " €")
// ferme div 3


const div4 = document.createElement('div');
div4.setAttribute('class', "cart__item__content__settings")

const div5 = document.createElement('div');
div5.setAttribute('class', "cart__item__content__settings__quantity")

// quantité
const paragraph3 = document.createElement('p');
paragraph3.textContent('Qté: ')

const input = document.createElement('input')
input.setAttribute('type', 'number')
input.setAttribute('class', 'itemQuantity')
input.setAttribute('min', '1')
input.setAttribute('max', '100')
input.setAttribute('value',)

// ferme div 5

const div6 = document.createElement('div');
div6.setAttribute('class', "cart__item__content__settings__delete")

// supprimer
const paragraph4 = document.createElement('p');
paragraph4.setAttribute('class', "deleteItem")
paragraph4.textContent("Supprimer")
// ferme div 6
// ferme div 4
// ferme giv 2
// ferme article

insertTagElem()


/**
* Insère les elements dans le DOM
* @param {Object} 
* @param {Object} 
* @param {Object}  
* @param {Object} 
* @param {Object}
* @param {Object} 
*/
const insertTagElem = () => {
    const section = document.querySelector("#cart__items");
    if (section != null) {
        section.appendChild(article);
        article.appendChild(div);
        article.appendChild(div2);
        div.appendChild(image);
        div2.appendChild(div3);
        div2.appendChild(div4)
        div3.appendChild(title);
        div3.appendChild(paragraph);
        div3.appendChild(paragraph2);
        div4.appendChild(div5)
        div4.appendChild(div6)
        div5.appendChild(paragraph3)
        div5.appendChild(input)
        div6.appendChild(paragraph4)
    }
}