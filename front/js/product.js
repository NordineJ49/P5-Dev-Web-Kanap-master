// creer une fonction getId (methode newUrlSearchParam)
// creer une fonction fetch + id
// fonction affichage de l'élément (prix couleur etc)
// fonction addEventListener "click" qui va appeler une fonction addCart

// creer fonction addCart
// cette fonction doit :
// -verifier que le localstorage est vide
// -ajouter l'objet avec comme propriétés (id couleur quantité) et l'ajouter au localstorage
// -si le localstorage n'est pas vide (vérifié si le produit n'est pas deja dans le localstorage: soit je modifie la quantité, soit je rajoute le nouveau produit)

//ressource : find (js) runbookdev


// fonction fetch + récupération de l'ID
const fetchData = async () => {
    const newId = new URLSearchParams(window.location.search).get("id");
    console.log(newId)
    try {
        const url = (`http://localhost:3000/api/products/${newId}`)
        const response = await fetch(url)
        console.log(response)
        if (!response.ok) {
            throw new Error(`Error ${response.status}`)
        }
        const data = await response.json();
        console.log(data)
        displayProduct(data);
    } catch (error) {
        alert(error)
    }
};



/**
 * Itère le tableau et créer les éléments
 * @param {Object} product
 */
const displayProduct = (product) => {

    console.log(typeof (product))
    //création éléments DOM et attribution de la data spécifique à chaque élément
    document.getElementById('title').textContent = product.name


    const image = document.createElement('img')
    image.setAttribute('src', product.imageUrl)
    image.setAttribute('alt', product.altTxt)

    document.getElementById('price').textContent = product.price

    document.getElementById('description').textContent = product.description

    let colors = product.colors
    let colorSelect = document.getElementById('colors')
    for (let index in colors) {
        let opt = document.createElement('option')
        opt.textContent = colors[index]
        opt.value = colors[index]
        colorSelect.append(opt)
    }
    insertTagElem(image)
    attachEvent(product._id)
}

/**
 * Insère les éléments dans le DOM
 * @param {Object} image 
 */
const insertTagElem = (image) => {
    const item = document.querySelector('.item__img')
    if (item != null) {
        item.appendChild(image)
    }
}


const attachEvent = (prodID) => {
    document.getElementById('addToCart').addEventListener("click", () => { addCart(prodID) })
}


/**
 * 
 * @param {string} prodID 
 * @returns false
 */
// fonction qui permet de vérifier et modifier le panier 
const addCart = (prodID) => {
    // verifier qu'un couleur est selectionné
    const selectColor = checkColor()
    // verifier que la quantité est comprise entre 1 et 100 
    const selectQuantity = checkQuantity()
    if (selectColor && selectQuantity) {
        const prod = {
            id: prodID,
            col: selectColor,
            qty: selectQuantity,
        }
        let basket;
        // -verifier que le localstorage est vide
        if (!localStorage.getItem('panier')) {
            // ajouter prod a panier
            basket = []
            basket.push(prod)
        } else {
            // recuperer le localstorage (JSON.parse)
            basket = JSON.parse(localStorage.getItem('panier'))
            // Verifier le couple (id + color) si c'est le meme, je modifie la quantité
            const result = basket.find((elt) => elt.id === prodID && elt.col === selectColor)
            console.log(result)
            if (result) {
                const newQuantity = parseInt(result.qty) + parseInt(prod.qty)
                result.qty = newQuantity
            } else {
                basket.push(prod)
            }
            // sinon je rajoute le produit au local storage
        }
        localStorage.setItem('panier', JSON.stringify(basket))
    }
    return false
}


/**
 * vérifie que la valeur n'est pas vide 
 * @returns 
 */
const checkColor = () => {
    // si valeur null alert("vous devez selectionner une couleur") + return false
    const valeurCouleur = document.querySelector('#colors')
    const valeur = valeurCouleur.value
    if (!valeur) {
        alert("Vous devez séléctionner une couleur")
        return false
    }
    // sinon retourner valeur
    return valeur
}

/**
 * vérifie la validité de la quantité 
 * @returns 
 */
const checkQuantity = () => {
    // si valeur null alert ("vous devez selectionner une quantité entre 1 et 100") + return false
    const valeurQuantité = document.getElementById('quantity')
    const valeur = valeurQuantité.value
    if (!valeur || valeur <= 0 || valeur >= 101) {
        alert("Vous devez séléctionner un quantité comprise entre 1 et 100 inclus")
        return false
    }
    // sinon retourner valeur
    return valeur
}


fetchData()
