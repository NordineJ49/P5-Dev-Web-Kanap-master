/**
 * Récuperation du panier dans le localStorage
 * 
 */
const getCart = async () => {
    // creation d'un tableau cart
    let cart = []
    // si pas  d'item panier dans le localStorage
    if (!localStorage.getItem('panier')) {
        alert("votre panier est vide")
        return false
    }
    // si panier, le panier est récupérer du localStorage avec un json.parse
    let panier = JSON.parse(localStorage.getItem('panier'))
    // tour de boucle sur chaque item du panier
    for (let item of panier) {
        // on récupere l'id de l'item
        let itemId = item.id
        try {
            // concaténation de l'item id dans l'url 
            const url = (`http://localhost:3000/api/products/${itemId}`)
            // attente que la promesse soit résolu
            const response = await fetch(url)
            // si reponse non ok, envoi erreur + le status de l'erreur 
            if (!response.ok) {
                throw new Error(`Error ${response.status}`)
            }
            // une fois la promesse résolue, methode json pour convertir la réponse en objet json
            const data = await response.json();
            console.log(data)
            // la couleur et la quantité de l'objet data sont défini par la couleur et la quantité de l'item
            data.qty = item.qty
            data.col = item.col
            // data est push dans le tableau cart
            cart.push(data)
            // appel de la fonction displayProduct avec comme pour argument (data et cart)
            displayProduct(data, cart)
        } catch (error) {
            alert(error)
        }
    }
    updateCart(cart)
    attachEvent()
}


/**
 * Création des éléments du DOM et attribution de la data
 * @param {*} data 
 * @param {*} cart 
 */
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
    paragraph2.textContent = `${data.price} €`
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
    inputQty.addEventListener("change", (e) => {
        changeProdQty(cart, e)
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
        deleteProd(cart, e);
    })

    div6.appendChild(paragraph4)
    // ferme div 6
    // ferme div 4
    // ferme giv 2
    // ferme article

}



/**
 * Fonction qui met a jour la quantité d'un produit si deja dans le panier
 * @param {*} cart 
 * @param {*} e 
 */
const changeProdQty = (cart, e) => {
    console.log(e.target.defaultValue)
    // "defaultValue" est une propriété de l'objet JavaScript qui représente la valeur par défaut
    const defValue = e.target.defaultValue
    // valeur modifiée
    const newValue = e.target.value;
    // Si la valeur à été modifiée et est inferieur a 1 et sup a 100
    if (newValue < 1 || newValue > 100) {
        // on retourne la valeur par défaut (valeur précédente) + alert
        e.target.value = defValue
        alert("La quantité saisie n'a pas été prise en compte")
        return
    }
    // sinon, defValue prend la valeur de newValue 
    else {
        defValue = newValue
    }
    // const elt qui contient l'element cible de l'evenement
    const elt = e.target;
    // const ancestor qui est l'element parent 'article' le plus proche de elt
    const ancestor = elt.closest("article");
    // on recupére l'id de ancestor
    const ancestorId = ancestor.id
    // on recupere l'attribut data-color de ancestor
    const ancestorCol = ancestor.getAttribute('data-color')
    // l'item panier va etre parser sous forme d'objet javascript et etre contenu dans cartItems
    let cartItems = JSON.parse(localStorage.getItem('panier'))
    // boucle forEach sur cartItems qui pour chaque tour de boucle va parcourir les elements tableau
    cartItems.forEach((elem, index) => {
        // si elem id ET couleur identique l'id et la couleur de ancestor
        if (elem.id === ancestorId && elem.col === ancestorCol) {
            // la valeur de l'élément cible de l'événement est affecté a l'attribut qty du tableau à l'index en cours,
            cartItems[index].qty = e.target.value
            cart[index].qty = e.target.value
        }
    })
    // sinon l'item panier et converti en chaine de caractere avec json.stringify et remis dans le localStorage
    localStorage.setItem('panier', JSON.stringify(cartItems))
    updateCart(cart)
}



/**
 * Supprime un produit dans le localStorage, dans le DOM et dans le tableau global
 * @param {Array} cart 
 * @param {event} e 
 */
const deleteProd = (cart, e) => {
    // const elt qui contient l'élément cible de l'événement
    const elt = e.target;
    // const ancestor qui est l'element parent 'article' le plus proche de elt
    const ancestor = elt.closest("article");
    // on recupére l'id de ancestor
    const ancestorId = ancestor.id
    // on recupere l'attribut data-color de ancestor
    const ancestorCol = ancestor.getAttribute('data-color')
    // l'item panier va etre parser sous forme d'objet javascript et etre contenu dans let cartItems
    let cartItems = JSON.parse(localStorage.getItem('panier'))
    // boucle forEach sur cartItems qui pour chaque tour de boucle va parcourir les elements tableau
    cartItems.forEach((elem, index) => {
        // si id ET la couleur de l'element est identique a l'id et la couleur de ancestor
        if (elem.id === ancestorId && elem.col === ancestorCol) {
            // on supprime l'element du tableau cartItems et cart a l'index en cours
            cartItems.splice(index, 1)
            cart.splice(index, 1)
        }
    });
    // si le tableau cartItems est vide (apres avoir supprimé le seul elem du tableau)
    if (cartItems.length === 0) {
        // on supprime directement l'item panier du localStorage
        localStorage.removeItem('panier')
        alert("Votre panier est vide !")
    }
    // sinon l'item panier et converti en chaine de caractere avec json.stringify et remis dans le localStorage
    else {
        localStorage.setItem('panier', JSON.stringify(cartItems))
    }
    updateCart(cart)
    // ancestor est supprimé 
    ancestor.remove()
}

/**
 * Fonction qui met à jour la quantité et le prix total dans le panier 
 * @param {*} cart 
 */
const updateCart = (cart) => {
    console.log(cart)
    // on initialise deux variable à 0
    let totPrice = 0
    let totQty = 0
    // methode forEach pour parcourir tout les elements de l'objet cart.
    cart.forEach(elem => {
        // pour chaque element :
        // le prix total est calculé en multipliant le prix de l'element multiplié par sa quantité. Ensuite on l'ajoute a totPrice
        totPrice += parseInt(elem.price) * parseInt(elem.qty)
        // la quantité total est calculé en ajoutant la quantité de l'élément a totQty
        totQty += parseInt(elem.qty)
    })
    // Récuperation de l'élément du DOM via son Id et prend comme contenu totQty et totPrice
    document.getElementById('totalQuantity').textContent = totQty
    document.getElementById('totalPrice').textContent = totPrice
}



// controle et recuperation du formulaire
// verifier que tout les champs du formulaire sont remplis
// récupérer le formulaire et envoyer le client sur une autre page lorsqu'il a validé son panier


/**
 * Ecouteur d'évenement au bouton "commander" et à tout les inputs du formulaire
 */
const attachEvent = () => {
    // ecouteur d'évenement "click" sur l'élément ayant l'id 'order' (bouton "commander"). Lorsque l'utilisateur clique sur le bouton la fonction "order" est éxécutée
    document.getElementById('order').addEventListener("click", (e) => { order(e) })
    // ecouteur d'évenement "change" sur l'élément ayant l'id 'firstName' (input prenom). Lorsque la valeur de cet élément est modifiée, la fonction "checkReg1" est éxécutée
    document.getElementById('firstName').addEventListener("change", (e) => { checkReg1(e.target.value, 'firstName') })
    document.getElementById('lastName').addEventListener("change", (e) => { checkReg1(e.target.value, 'lastName') })
    document.getElementById('city').addEventListener("change", (e) => { checkReg1(e.target.value, 'city') })
    document.getElementById('address').addEventListener("change", (e) => { checkReg2(e.target.value, 'address') })
    document.getElementById('email').addEventListener("change", (e) => { checkReg3(e.target.value, 'email') })
}


/**
 * RegEx pour nom prenom et ville
 * @param {*} val 
 * @param {*} name 
 * @returns 
 */
const checkReg1 = (val, name) => {
    // regex qui verifie que la chaine de caractere ne contient aucun des caracteres spécifiés entre crochet
    const reg1 = new RegExp(/^[^1-9²&~#"{}'()|\`^+=*,.?;:!§ù%¨$£¤µ<>°@_-]+$/)
    const result = reg1.test(val)
    if (!result) {
        const text = document.getElementById(`${name}ErrorMsg`)
        text.textContent = "Veuillez entrer un champ valide"
        return false
    }
    document.getElementById(`${name}ErrorMsg`).textContent = ""
    return true
}


/**
 * RegEx pour adresse
 * @param {*} val 
 * @param {*} name 
 * @returns 
 */
const checkReg2 = (val, name) => {
    // ensemble des caractères acceptés dans le champ adresse 
    const reg2 = new RegExp(/^[0-9]+\s[a-zA-Z\s]+[0-9\s]*$/)
    // const result qui verifie si la val entrée dans l'input adresse est compatible avec reg2
    const result = reg2.test(val)
    // si champ incorrect, on recupere la balise correspondante et un message d'erreur est envoyé + return false
    if (!result) {
        const text = document.getElementById(`${name}ErrorMsg`)
        text.textContent = "Veuillez entrer un champ valide"
        return false
    }
    // sinon, on s'assure que la balise qui renvoi l'erreur est vide + return false
    document.getElementById(`${name}ErrorMsg`).textContent = ""
    return true
}


/**
 * RegEx pour email
 * @param {*} val 
 * @param {*} name 
 * @returns 
 */
const checkReg3 = (val, name) => {
    const reg3 = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    // verifie si la val entrée dans l'input email est compatible avec reg3
    const result = reg3.test(val)
    if (!result) {
        const text = document.getElementById(`${name}ErrorMsg`)
        text.textContent = "Veuillez entrer un champ valide"
        return false
    }
    document.getElementById(`${name}ErrorMsg`).textContent = ""
    return true
}





/**
 * Fonction order qui vérifie que tout les inputs du formulaire sont correct et appel la fonction sendOrder()
 * 
 */
const order = (e) => {
    // l'action (envoi du formulaire) associée a l'evenement e est annulée pour éviter que la page soit rechargée lors de la soumission du formulaire
    e.preventDefault()
    // Récuperation de la valeur ayant l'id 'firstName'
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const city = document.getElementById('city').value
    const address = document.getElementById('address').value
    const email = document.getElementById('email').value
    // vérifie si les valeurs du formulaire sont valides grâce aux fonctions "checkReg1", "checkReg2" et "checkReg3". 
    if (!checkReg1(firstName, "firstName") || !checkReg1(lastName, "lastName") || !checkReg1(city, "city") || !checkReg2(address, "address") || !checkReg3(email, "email")) {
        // Si une des valeurs n'est pas valide, une alerte est affichée et la fonction retourne false.
        alert("il y a une erreur dans le formulaire")
        return false
    }
    // si tout est valide, on créer l'objet contact avec les valeurs récupérées dans le formulaire
    let contact = { firstName, lastName, city, address, email }
    console.log(contact)
    // la constante products appel la fonction getProd() et récupère tout les produits qui ont été ajoutés au panier
    const products = getProd()
    if (products.length === 0) {
        alert("Votre panier est vide !")
        return false
    }
    console.log(products)
    // creation de l'objet data qui contient les objets contact et products
    const data = { contact, products }
    // appel la fonction sendOrder avec comme argument data
    sendOrder(data)
}

/**
 * Fonction qui recupère l'id des produits du localStorage
 * @returns 
*/
const getProd = () => {
    // creation du tableau products
    let products = []
    if (localStorage.getItem('panier')) {
        // Récupération de l'item panier dans le localStorage
        const prods = JSON.parse(localStorage.getItem('panier'))
        // tour de boucle pour récupérer chaques elements de prods
        for (let elem of prods) {
            // Récupération de l'id des elem de prods, puis envoyés dans le tableau products
            products.push(elem.id)
        }
    }
    return products
}


/**
 * Fonction qui envoi la commande (order) au back avec la data (contact client + les produits grâce à leur id)
 * @param {*} data 
 */
const sendOrder = async (data) => {
    const options = {
        // la méthode pour envoyer la demande (post)
        method: "POST",
        // le corps de la demande : data sous forme de chaine de caractere
        body: JSON.stringify(data),
        // objet headers avec les en-têtes à inclure dans la demande
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };
    try {
        // methode fetch pour envoyer une demande post a l'url avec les options définis ci-dessus
        const postFetch = await fetch("http://localhost:3000/api/products/order", options)
        if (!postFetch.ok) {
            throw new Error(`Une erreur s'est produite: ${postFetch.status}`)
        }
        // attente de la reponse convertie en objet JSON
        const order = await postFetch.json()
        console.log(order.orderId)
        //localStorage.removeItem(key) qui permet d'enlever la clé souhaitée dans le localStorage
        localStorage.removeItem('panier')
        // redirige l'utilisateur vers la page de confirmation + ajout de l'id de commande dans l'url
        document.location.href = `confirmation.html?orderId=${order.orderId}`
    } catch (error) {
        alert(error)
    }
}


getCart()