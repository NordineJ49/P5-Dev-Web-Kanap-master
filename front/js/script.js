// Récupérer les données 
// Verifier les données 
// Boucle sur les données 
// A chaque tour de boucle on appel display data
// Création des éléments HTML et injection dans le DOM




// fonction pour récupérer la data json
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
};

/**
 * itere le tableau et créer les elements (html)
 * @param {Array} products 
 */
const displayData = (products) => {
    // boucle FOR OF pour 
    for (const product of products) {


        // creation element DOM + attribution de la data spécifique a chaque element
        let id = product._id
        const aHref = document.createElement('a');
        aHref.href = "./product.html?id=" + id


        const article = document.createElement('article');


        const image = document.createElement('img');
        image.setAttribute('src', product.imageUrl);
        image.setAttribute('alt', product.altTxt);


        const title = document.createElement('h3');
        title.setAttribute('class', "productName");
        title.innerText = product.name
        console.log(typeof (title))


        const paragraph = document.createElement('p');
        paragraph.setAttribute('class', "productDescription");
        paragraph.innerText = product.description

        insertTagElem(aHref, article, image, title, paragraph)
    }
}

/**
 * Insère les elements dans le DOM
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