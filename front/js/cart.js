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
    attachEvent()
}
// 
window.onload = () => {
    getCart()
}


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





// faire une boucle sur le panier pour récuperer l'identifiant et faire un fetch au back pour recuperer les données manquante (prix ...)
// ------boucle for pour recupérer id du produit dans le panier
// ------fetch au back pour récuperer le prix et l'image du produit dont on viens d'obtenir l'identifiant

// afficher image nom et le localstorage (la couleur du produit et la quantité)
// ------afficher le resultat du fetch fait precedemment et la couleur/qty enregistré dans le localStorage





// creer trois fonction
// -modifier la quantité du produit (mettre a j la qty et prix total)
const changeProdQty = (cart, e) => {
    console.log(e)
    // recuperer local storage
    const elt = e.target;
    const ancestor = elt.closest("article");
    const ancestorId = ancestor.id
    const ancestorCol = ancestor.getAttribute('data-color')
    let cartItems = JSON.parse(localStorage.getItem('panier'))
    cartItems.forEach((elem, index) => {
        if (elem.id === ancestorId && elem.col === ancestorCol) {
            cartItems[index].qty = e.target.value
            cart[index].qty = e.target.value
        }
    })
    localStorage.setItem('panier', JSON.stringify(cartItems))
    updateCart(cart)
}



/**
 * Supprime un produit dans le localStorage, dans le DOM et dans le tableau global
 * @param {Array} cart 
 * @param {event} e 
 */
const deleteProd = (cart, e) => {
    const elt = e.target;
    const ancestor = elt.closest("article");
    const ancestorId = ancestor.id
    const ancestorCol = ancestor.getAttribute('data-color')
    // recuperer array 'panier' dans le localstorage avec tout les objets a l'interieur
    let cartItems = JSON.parse(localStorage.getItem('panier'))

    // for (let index in cartItems) {
    //     let idProduct = cartItems[index].id
    //     let colProduct = cartItems[index].col
    //     if (ancestorId === idProduct && ancestorCol === colProduct) {
    //         cartItems.splice(index, 1)
    //         cart.splice(index, 1)
    //     }
    // } 

    cartItems.forEach((elem, index) => {
        if (elem.id === ancestorId && elem.col === ancestorCol) {
            cartItems.splice(index, 1)
            cart.splice(index, 1)
        }
    });

    // const index = cartItems.findIndex(elem => elem.id === ancestorId && elem.col === ancestorCol)
    // if (index != -1) {
    //     cartItems.splice(index, 1)
    //     cart.splice(index, 1) 
    // }

    localStorage.setItem('panier', JSON.stringify(cartItems))
    updateCart(cart)
    console.log(ancestor)
    ancestor.remove()
}

// -fonction qui met a j la qty et prix total
const updateCart = (cart) => {
    console.log(cart)
    let totPrice = 0
    let totQty = 0
    cart.forEach(elem => {
        totPrice += parseInt(elem.price) * parseInt(elem.qty)
        totQty += parseInt(elem.qty)
    })
    document.getElementById('totalQuantity').textContent = totQty
    document.getElementById('totalPrice').textContent = totPrice
}



// chapter 2
// controle et recuperation du formulaire
// verifier que tout les champs du formulaire sont remplis
// récupérer le formulaire et envoyer le client sur une autre page lorsqu'il a validé son panier

const attachEvent = () => {
    document.getElementById('order').addEventListener("click", () => { order() })
    document.getElementById('firstName').addEventListener("change", (e) => { checkReg1(e.target.value, 'firstName') })
    document.getElementById('lastName').addEventListener("change", (e) => { checkReg1(e.target.value, 'lastName') })
    document.getElementById('city').addEventListener("change", (e) => { checkReg1(e.target.value, 'city') })
    document.getElementById('adress').addEventListener("change", (e) => { checkReg2(e.target.value, 'adress') })
    document.getElementById('email').addEventListener("change", (e) => { checkReg3(e.target.value, 'email') })
}

const checkReg1 = (val, name) => {
    const reg1 = new RegExp(/^[^1-9²&~#"{}'()|\`^+=*,.?;:!§ù%¨$£¤µ<>°@_-]+$/gi)
    const result = reg1.test(val)
    if (!result) {
        const text = document.getElementById(`${name}ErrorMsg`)
        text.textContent = "Veuillez entrer un champ valide"
        return false
    }
    document.getElementById(`${name}ErrorMsg`).textContent = ""
    return true
}

const checkReg2 = (val, name) => {
    const reg2 = new RegExp(/^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/)
    const result = reg2.test(val)
    if (!result) {
        const text = document.getElementById(`${name}ErrorMsg`)
        text.textContent = "Veuillez entrer un champ valide"
        return false
    }
    document.getElementById(`${name}ErrorMsg`).textContent = ""
    return true
}


const checkReg3 = (val, name) => {
    const reg3 = new RegExp(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/)
    const result = reg3.test(val)
    if (!result) {
        const text = document.getElementById(`${name}ErrorMsg`)
        text.textContent = "Veuillez entrer un champ valide"
        return false
    }
    document.getElementById(`${name}ErrorMsg`).textContent = ""
    return true
}






const order = () => {
    e.preventDefault()
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const city = document.getElementById('city').value
    const adress = document.getElementById('adress').value
    const email = document.getElementById('email').value
    if (!checkReg1(firstName, "firstName") || !checkReg1(lastName, "lastName") || !checkReg1(city, "city") || !checkReg2(adress, "adress") || !checkReg3(email, "email")) {
        alert("il y a une erreur dans le formulaire")
        return false
    } else {
        let contact = { firstName, lastName, city, adress, email }
        console.log(contact)

    }
}





const postFetch = fetch("http://localhost:3000/api/products/", {
    method: "POST",
    body: JSON.stringify(),
    headers: {},
});

// order()