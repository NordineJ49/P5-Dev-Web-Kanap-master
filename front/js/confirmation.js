const newId = new URLSearchParams(window.location.search).get('orderId');
document.getElementById('orderId').textContent = newId

// creer fonction