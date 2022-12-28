


// fonction fetch pour récupérer la data json
const fetchData = async () => {
    try {
        const url = "http://localhost:3000/api/products";
        const response = await fetch(url);
        console.log(response)
        if (!response.ok) {
            throw new Error(`Error ${response.status}`)
        }
        const data = await response.json();
        console.log(data)
        displayData(data);
    } catch (error) {
        alert(error)
    }
}

/**
 * Créer les éléments du DOM et insère les données récupérées dans le fetch
 * @param {Array} products 
 */
const displayData = (products) => {
    // boucle FOR OF pour parcourir le tableau des produits qui pour chaque itération récupère un objet
    for (const product of products) {

        // creation element DOM + attribution de la data spécifique a chaque element
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

        insertTagElem(aHref, article, image, title, paragraph)
    }
}

/**
 * Insère les éléments du DOM que l'ont vient de créer en les emboitants dans l'ordre correct
 * @param {Object} aHref 
 * @param {Object} article 
 * @param {Object} image 
 * @param {Object} h3 
 * @param {Object} p 
 */
const insertTagElem = (aHref, article, image, h3, p) => {
    const items = document.querySelector("#items");
    if (items != null) {
        items.appendChild(aHref);
        aHref.appendChild(article);
        article.appendChild(image);
        article.appendChild(h3);
        article.appendChild(p);
    }
}

fetchData()