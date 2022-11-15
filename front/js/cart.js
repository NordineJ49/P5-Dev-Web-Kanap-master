// chapter 1 
// affichage du panier 
// voir ce qu'il y a dans le localStorage
const checkLS = window.localStorage.panier
console.log(checkLS)

// recupérer le panier
const getCart = () => {
    let panier = JSON.parse(localStorage.getItem('panier'))
    for (let item of panier) {
        let itemId = item.id
        console.log(itemId)
    }
}
getCart()


const fetchData = async () => {
    try {
        const url = (`http://localhost:3000/api/products/${fsdfs}`)
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
};

// faire une boucle sur le panier pour récuperer l'identifiant et faire un fetch au back pour recuperer les données manquante (prix ...)
// boucle for pour recupérer id du produit dans le panier
// fetch au back pour récuperer le prix et l'image du produit dont on viens d'obtenir l'identifiant

// afficher image nom et le localstorage (la couleur du produit et la quantité)
// afficher le resultat du fetch fait precedemment et la couleur/qty enregistré dans le localStorage





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

