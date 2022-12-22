/**
 * Fonction qui permet d'insérer l'id de la commande dans le DOM
 */
const id = () => {
    const newId = new URLSearchParams(window.location.search).get('orderId');
    document.getElementById('orderId').textContent = newId
}
id()