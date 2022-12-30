


// fonction asynchrone pour récupérer la data json grâce à l'API fetch
const fetchData = async () => {
    // bloc try
    try {
        // url du serveur à contacter
        const url = "http://localhost:3000/api/products";
        // opérateur await qui met en pause la fonction async jusqu'à que la promesse soit obtenu 
        const response = await fetch(url);
        console.log(response)
        // si pas de reponse du serveur, une erreur est envoyée
        if (!response.ok) {
            throw new Error(`Error ${response.status}`)
        }
        // une fois la promesse résolue le resultat est parser en json
        const data = await response.json();
        console.log(data)
        // appel de la fonction displayData()
        displayData(data);
    }
    // bloc catch : si une erreur est détécté on sort du bloc try et une alerte est envoyée
    catch (error) {
        alert(error)
    }
}

/**
 * Créer les éléments du DOM et y insère les données récupérées dans le fetch
 * @param {Array} products 
 */
// -------------------------------------- comment sait on que products represente touts les produits ? quel variable ? -------------------------------------------------
const displayData = (products) => {
    // boucle FOR OF qui parcours le tableau des produits et qui pour chaque tour de boucle (itération) récupère un objet
    for (const product of products) {

        // creation élément DOM et de leurs attributs avec les données récupérée 
        const aHref = document.createElement('a');
        aHref.setAttribute("href", `./product.html?id=${product._id}`)


        const article = document.createElement('article');


        const image = document.createElement('img');
        image.setAttribute('src', product.imageUrl);
        image.setAttribute('alt', product.altTxt);


        const title = document.createElement('h3');
        title.setAttribute('class', "productName");
        title.textContent = product.name


        const paragraph = document.createElement('p');
        paragraph.setAttribute('class', "productDescription");
        paragraph.textContent = product.description

        // La fonction insertTagElem() est appelé avec comme argument les éléments crées
        insertTagElem(aHref, article, image, title, paragraph)
    }
}

/**
 * Insère les éléments du DOM créer en les emboitants dans l'ordre correct
 * @param {Object} aHref 
 * @param {Object} article 
 * @param {Object} image 
 * @param {Object} h3 
 * @param {Object} p 
 */
const insertTagElem = (aHref, article, image, h3, p) => {
    // récupération de la balise qui a pour id "items"
    const items = document.getElementById("items");
    // si la balise de la const items, est vide les balises créées plus tôt y sont insérées
    if (items != null) {
        items.appendChild(aHref);
        aHref.appendChild(article);
        article.appendChild(image);
        article.appendChild(h3);
        article.appendChild(p);
    }
}

// appel de la fonction fetchData()
fetchData()