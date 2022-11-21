// chapter 1 
// affichage du panier 
// voir ce qu'il y a dans le localStorage


// recupérer le panier
const getCart = async () => {
    let cart = []
    let panier = JSON.parse(localStorage.getItem('panier'))
    for (let item of panier) {
        let itemId = item.id
        // console.log(itemId)
        try {
            const url = (`http://localhost:3000/api/products/${itemId}`)
            const response = await fetch(url)
            // console.log(response)
            if (!response.ok) {
                throw new Error(`Error ${response.status}`)
            }
            const data = await response.json();
            data.qty = item.qty
            data.col = item.col
            console.log(data)
            cart.push(data)
            displayProduct(data, cart)
        } catch (error) {
            alert(error)
        }
    }
    updateCart(cart)
}
getCart()


const displayProduct = (data, cart) => {
    const section = document.querySelector("#cart__items");

    const article = document.createElement("article");
    article.setAttribute("class", "cart__item");
    article.setAttribute("id", data._id);
    article.setAttribute("data-color", data.col);
    section.appendChild(article)

    const div1 = document.createElement('div')
    div1.setAttribute('class', "cart__item__img")
    article.appendChild(div1)


    const image = document.createElement('img')
    image.setAttribute('src', data.imageUrl)
    image.setAttribute('alt', "Photographie d'un canapé")
    div1.appendChild(image)
    // ferme div

    const div2 = document.createElement('div')
    div2.setAttribute('class', "cart__item__content")
    article.appendChild(div2)

    const div3 = document.createElement('div')
    div3.setAttribute('class', "cart__item__content__description")
    div2.appendChild(div3)

    //nom du produit
    const title = document.createElement('h2')
    title.textContent = data.name
    div3.appendChild(title)

    // couleur du produit
    const paragraph = document.createElement('p')
    paragraph.textContent = data.col
    div3.appendChild(paragraph)

    // prix du produit 
    const paragraph2 = document.createElement('p')
    paragraph2.textContent = data.price + " €"
    div3.appendChild(paragraph2)
    // ferme div 3


    const div4 = document.createElement('div')
    div4.setAttribute('class', "cart__item__content__settings")
    div2.appendChild(div4)

    const div5 = document.createElement('div')
    div5.setAttribute('class', "cart__item__content__settings__quantity")
    div4.appendChild(div5)

    // quantité
    const paragraph3 = document.createElement('p')
    paragraph3.textContent = 'Qté: '
    div5.appendChild(paragraph3)

    const inputQty = document.createElement('input')
    inputQty.setAttribute('type', 'number')
    inputQty.setAttribute('class', 'itemQuantity')
    inputQty.setAttribute('min', '1')
    inputQty.setAttribute('max', '100')
    inputQty.setAttribute('value', data.qty)
    inputQty.addEventListener("change", (event) => {
        changeProdQty(data, cart, event)
    })
    div5.appendChild(inputQty)

    // ferme div 5

    const div6 = document.createElement('div')
    div6.setAttribute('class', "cart__item__content__settings__delete")
    div4.appendChild(div6)

    // supprimer
    const paragraph4 = document.createElement('p')
    paragraph4.setAttribute('class', "deleteItem")
    paragraph4.textContent = "Supprimer"
    paragraph4.addEventListener("click", (e) => {
        const elt = e.target;
        const ancestor = elt.closest("article");
        deleteProd(data, cart, ancestor);
    })

    div6.appendChild(paragraph4)
    // ferme div 6
    // ferme div 4
    // ferme giv 2
    // ferme article

}





// faire une boucle sur le panier pour récuperer l'identifiant et faire un fetch au back pour recuperer les données manquante (prix ...)
// ------boucle for pour recupérer id du produit dans le panier
// ------fetch au back pour récuperer le prix et l'image du produit dont on viens d'obtenir l'identifiant

// afficher image nom et le localstorage (la couleur du produit et la quantité)
// ------afficher le resultat du fetch fait precedemment et la couleur/qty enregistré dans le localStorage





// creer trois fonction
// -modifier la quantité du produit (mettre a j la qty et prix total)
const changeProdQty = (data, cart, event) => {
    console.log(event)
    event.target.value
    console.log(event.currentTarget.value)
    // recuperer local storage

    updateCart(cart)
}

// -supprimer un produit (mettre a j la qty et prix total)
const deleteProd = (data, cart, ancestor) => {

    console.log(ancestor)
    ancestor.remove()
    ancestorId = ancestor.id
    // recuperer array 'panier' dans le localstorage avec tout les objets a l'interieur
    let cartItems = JSON.parse(localStorage.getItem('panier'))
    // recupérer l'id tu produit a supprimer
    for (let infoProduct of cartItems) {
        let idProduct = infoProduct.id
        if (ancestorId === idProduct) {
            console.log(cartItems.indexOf(idProduct))
        }
        // retirer un produit du panier .pop() .slice()

        // pour cart, find data.id et le supprimer
        updateCart(cart)
    }
}

// -fonction qui met a j la qty et prix total
const updateCart = (cart) => {
    console.log(cart)


    // qty selectionné + (ou -) la quantité du panier
    // prix des éléments à ajouter + (ou -) le prix des éléments du panier
    // afficher le prix et la qty final
}



// chapter 2
// controle et recuperation du formulaire
// verifier que tout les champs du formulaire sont remplis
// récupérer le formulaire et envoyer le client sur une autre page lorsqu'il a validé son panier

const attachEvent = () => {
    document.getElementById('order').addEventListener("click", () => { order() })
}

const order = () => {
    // verifie que tout les input du formulaire sont remplis 
    // si un element manquant ou incorrecte, creer une alert
    // sinon renvoi une confirmation de commande
}



// if (id à ajouter = id dans le panier && couleur a ajouté = couleur dans le panier){
//     quantité panier = quantité a ajouter + quantité panier
// } else (id a ajouter != id dans le panier){
//     creer nouvel element avec son image, son prix et sa couleur
// }