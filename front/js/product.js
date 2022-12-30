



// récuperer l'ID dans l'url de la page et le concatene avec l'url du back (pour renvoyer un seul produit) 
const fetchData = async () => {
    // methode URLSearchParams.get() retourne la premiere valeur associée au parametre "id"
    const newId = new URLSearchParams(window.location.search).get("id");
    console.log(newId)
    // bloc try
    try {
        // la nouvelle url spécifique a chaque produit pour récupérer seulement ses infos
        const url = (`http://localhost:3000/api/products/${newId}`)
        // opérateur await qui met en pause la fonction async jusqu'à que la promesse soit obtenu 
        const response = await fetch(url)
        console.log(response)
        // si pas de reponse du serveur, une erreur est envoyée
        if (!response.ok) {
            throw new Error(`Error ${response.status}`)
        }
        // une fois la promesse résolue le resultat est parser en json
        const data = await response.json();
        console.log(data)
        // appel de la fonction displayData()
        displayProduct(data);
        // bloc catch : si une erreur est détécté on sort du bloc try et une alerte est envoyée
    } catch (error) {
        alert(error)
    }
};







/**
 * Créer ou modifier les éléments du DOM sur la page d'un produit
 * @param {Object} product
 */
const displayProduct = (product) => {

    console.log(typeof (product))
    //création éléments DOM et attribution de la data spécifique à chaque élément
    document.getElementById('title').textContent = product.name

    const image = document.createElement('img')
    image.setAttribute('src', product.imageUrl)
    image.setAttribute('alt', product.altTxt)

    // attribution du prix dans la balise ayant pour id="price"
    document.getElementById('price').textContent = product.price

    document.getElementById('description').textContent = product.description

    let colors = product.colors
    let colorSelect = document.getElementById('colors')

    // boucle for in sur le tableau colors qui pour chaque tour de boucle créer un attribut value et insère la couleur dans la balise
    for (let index in colors) {
        // creation de la balise <option>
        let opt = document.createElement('option')
        // contenu de la balise
        opt.textContent = colors[index]
        // attribut value= ""
        opt.value = colors[index]
        // la balise option est ajoutée à la balise récupérer dans la variable colorSelect (sélécteur de couleur) 
        colorSelect.append(opt)
    }
    // appel de la fonction insertTagElem()
    insertTagElem(image)
    // appel de la fonction attachEvent()
    attachEvent(product._id)
}

/**
 * Insère les éléments dans le DOM
 * @param {Object} image 
 */
const insertTagElem = (image) => {
    // récuperation de la balise ayant comme nom de class="item__img"
    const item = document.querySelector('.item__img')
    // si contenu de la balise vide
    if (item != null) {
        // insertion de l'image dans la balise
        item.appendChild(image)
    }
}

/**
 * Fonction qui attache un écouteur d'évènement sur le bouton "ajouter au panier"
 * @param {String} prodID 
 */
const attachEvent = (prodID) => {
    // récupération de balise ayant pour id="addToCart" (button) qui lors d'un évenement "click" va appeler la fonction addCart()
    document.getElementById('addToCart').addEventListener("click", () => { addCart(prodID) })
}


/**
 * Fonction qui enregistre les produits dans l'item "panier" (stocké dans le localStorage)
 * @param {string} prodID 
 * @returns false
 */
const addCart = (prodID) => {
    // la quantité et la couleur sont vérifié grâce aux fonction checkColor() et checkQuantity()
    const selectColor = checkColor()
    const selectQuantity = checkQuantity()
    // si couleur et quantité OK
    // ---------------------------------------------- revoir if else ---------------------------------------------------------
    if (selectColor && selectQuantity) {
        // création d'un objet avec les propriétés id, col(couleur) et qty(quantité)
        const prod = {
            // -------------------------------------- comment sait on que prodID est l'id du produit ? quel variable ? -------------------------------------------------
            id: prodID,
            col: selectColor,
            qty: selectQuantity,
        }
        // création d'une variable basket pour le moment vide
        let basket;
        // si pas d'item panier dans le localStorage
        if (!localStorage.getItem('panier')) {
            // creation d'un tableau "basket"
            basket = []
            // on pousse l'objet 'prod' dans le tableau 'basket'
            basket.push(prod)
        }
        // si "panier" existe
        else {
            // recuperer le localstorage (JSON.parse) dans le tableau basket
            basket = JSON.parse(localStorage.getItem('panier'))
            // l'id et la couleur des element présent dans le panier est similaire au produit que l'on veut ajouter
            // ------------------------------------- elt s'appel elt de base ? ------------------------------------------------
            const result = basket.find((elt) => elt.id === prodID && elt.col === selectColor)
            console.log(result)
            // si result true, seul la quantité est modifiée
            if (result) {
                // parseInt caste les variables pour etre sur que ce sont des integer(nombre entier) puis les deux quantités sont additionnées
                // result.qty (deja present dans le panier) prod.qty(ce que l'on veut y ajouter)
                const newQuantity = parseInt(result.qty) + parseInt(prod.qty)
                // mise a jour de la quantité
                result.qty = newQuantity
            }
            // si pas de result dans le tableau basket on pousse l'objet 'prod' dans le tableau 'basket'
            else {
                basket.push(prod)
            }
        }
        // on remet basket dans l'item "panier" du localstorage (JSON.stringify)
        localStorage.setItem("panier", JSON.stringify(basket))
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
    const valeurCouleur = document.getElementById('colors')
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

// la fonction fetchData() est appelée
fetchData()