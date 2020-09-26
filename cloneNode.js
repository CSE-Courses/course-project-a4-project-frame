function duplicate() {
    var original = document.getElementById('duplicater' + i);
    var clone = original.cloneNode(true); 
    clone.id = "duplicetor" + ++i; 
    clone.onclick = duplicate; 
    original.parentNode.appendChild(clone);
}