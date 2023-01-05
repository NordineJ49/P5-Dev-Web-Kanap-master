/**
 * Fonction qui permet d'insérer l'id de la commande dans le DOM
 */
const id = () => {
    // récupération du paramètre 'orderId' dans l'url 
    const newId = new URLSearchParams(window.location.search).get('orderId');
    //récupération de la balise qui a pour id 'orderId' puis on y insère en textContent newId
    document.getElementById('orderId').textContent = newId
}
id()