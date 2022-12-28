

// récuperer l'ID dans l'url de la page, puis on le concatene avec l'url du back (renvoi un seul produit) 
const fetchData = async () => {
    const newId = new URLSearchParams(window.location.search).get("id");
    console.log(newId)
    try {
        const url = (`http://localhost:3000/api/products/${newId}`)
        // promesse
        const response = await fetch(url)
        console.log(response)
        if (!response.ok) {
            throw new Error(`Error ${response.status}`)
        }
        // promesse résolu et on parse le resultat en json
        const data = await response.json();
        console.log(data)
        displayProduct(data);
    } catch (error) {
        alert(error)
    }
};





/**
 * Créer les éléments du DOM du produit
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
    // itération sur le tableau colors, pour chaque itération je créer une option avec la valeur et la couleur
    for (let index in colors) {
        let opt = document.createElement('option')
        opt.textContent = colors[index]
        opt.value = colors[index]
        // j'apporte l'option au sélécteur
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

/**
 * Fonction qui attache un écouteur d'évènement (evenement "click") sur le bouton "ajouter au panier"
 * @param {String} prodID 
 */
const attachEvent = (prodID) => {
    document.getElementById('addToCart').addEventListener("click", () => { addCart(prodID) })
}


/**
 * Fonction qui enregistre les produits dans le panier (panier stocker dans le localStorage)
 * @param {string} prodID 
 * @returns false
 */
const addCart = (prodID) => {
    // on vérifie la quantité et la couleur
    const selectColor = checkColor()
    const selectQuantity = checkQuantity()
    // si couleur et quantité OK
    if (selectColor && selectQuantity) {
        const prod = {
            id: prodID,
            col: selectColor,
            qty: selectQuantity,
        }
        let basket;
        // si pas d'item panier dans le localStorage
        if (!localStorage.getItem('panier')) {
            // ajouter prod a panier
            basket = []
            // on pousse l'objet 'prod' dans le tableau 'basket'
            basket.push(prod)
        } else {
            // recuperer le localstorage (JSON.parse)
            basket = JSON.parse(localStorage.getItem('panier'))
            // Cherche le groupe (id + color) dans 'basket'
            const result = basket.find((elt) => elt.id === prodID && elt.col === selectColor)
            console.log(result)
            // si result, je modifie la quantité
            if (result) {
                // parseInt pour caster les variables pour etre sur que c'est un integer (nombre entier) (parseFloat = nombre a virgule)
                const newQuantity = parseInt(result.qty) + parseInt(prod.qty)
                result.qty = newQuantity
            } else {
                // si !result on pousse l'objet 'prod' dans le tableau 'basket'
                basket.push(prod)
            }
        }
        // on remet le panier dans le localstorage (JSON.stringify)
        localStorage.setItem('panier', JSON.stringify(basket))
        alert("Le produit à été ajouté au panier.")
    }
    return false
}


/**
 * vérifie que la valeur de la couleur à été séléctionnée sinon retourne une alerte
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
 * vérifie que la quantité à été séléctionnée sinon retourne une alerte 
 * @returns 
 */
const checkQuantity = () => {
    // si valeur null alert ("vous devez selectionner une quantité entre 1 et 100") + return false
    const valeurQuantité = document.getElementById('quantity')
    const valeur = valeurQuantité.value
    if (!valeur || valeur <= 0 || valeur >= 101) {
        alert("Vous devez séléctionner une quantité comprise entre 1 et 100 inclus")
        return false
    }
    // sinon retourner valeur
    return valeur
}

fetchData()