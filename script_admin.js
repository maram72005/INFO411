console.log(products);

const body = document.querySelector("body");

function create(tag, container, text=null, classe=null, ide=null) {
	const element = document.createElement(tag)
	if (text) {
		element.innerText = text;
    }
    if (classe) {
		element.className = classe;
    }
    if (ide) {
		element.id = ide;
    }
	container.appendChild(element)
	return element
}

function affichage_liste_produits() {
    boite_a_produits = create("div", body, "", "", "boite_a_produits");

    products.forEach(product => {
        console.log(product);
        affichage_1_produit(boite_a_produits, product)
    })
}

affichage_liste_produits();

function affichage_1_produit(elem_parent, product) {
    product_box = create("div", elem_parent, "", "", "boite_1_produit");

    product_name = create("h1", product_box, product.name, "", "");

    product_brand = create("h2", product_box, product.brand, "", "");
    product_scale = create("h2", product_box, product.scale, "", "");

    product_price = create("p", product_box, product.price + " $", "", "");
    product_stock = create("p", product_box, product.stock, "", "");

    product_stock_management_button = create("button", product_box, "Modifier les stocks", "", "");

    product_management_interface = create("div", body, product.name, "hidden", "");
    interraction_des_stocks();
}

function interraction_des_stocks() {
    product_stock_management_button.addEventListener("click", _ => {
        product_management_interface.classList.remove("hidden");
    })
}