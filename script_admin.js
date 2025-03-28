console.log(products);

const body = document.querySelector("body");

function create(tag, container, text=null, classe=null, ide=null) {
    /* 
    Crée un élément avec la structure suivante :
    type d'élément (div, p, img ...)
    element parent
    texte intégré
    classe
    id 
    */
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
    /* Permet d'afficher la liste des produits présents dans la base de données */
    const boite_a_produits = create("div", body, "", "", "boite_a_produits");
    var i = 0;

    products.forEach(product => {
        console.log(product);
        affichage_1_produit(boite_a_produits, product, i);
        i++;
    })
}

affichage_liste_produits();

function affichage_1_produit(elem_parent, product, i) {
    /* Affiche un produit de la liste */
    product_box = create("div", elem_parent, "", "", "boite_1_produit");

    product_name = create("h1", product_box, product.name, "", "");

    const image_produit = create("img", product_box, "", "", "");
    image_produit.src = product.picture;

    product_brand = create("h2", product_box, "Marque : " + product.brand, "", "");
    product_scale = create("h2", product_box, "Echelle : " + product.scale, "", "");

    product_price = create("p", product_box, "Prix : " + product.price + " $", "", "");

    product_stock = create("p", product_box, "Stock actuel : " + product.stock, "", "");
    if (product.stock == 0) {
        product_stock.classList = "outofstock";
        product_stock.innerText = "Out of stock";
    }

    creation_interface_stock(product_box, product, i);
}

function creation_interface_stock(papa, product, i) {
    /* Crée l'interface qui permet de modifier les stocks d'un produit (qui s'affiche quand on clique sur le bouton "modifier les stocks") */
    product_management_interface = create("div", body, product.name, "hidden", "interface_modif_stock");

    old_quantity = create("p", product_management_interface, "Stock actuel : " + product.stock, "", "");

    div_new_quantity = create("div", product_management_interface, "", "", "");

    label_new_quantity = create("label", div_new_quantity, "Nouveau stock: ", "", "");

    input_new_quantity = create("input", div_new_quantity, "", "new_stock", "");

    restock_link = create("a", div_new_quantity, "", "", "");

    send_button = create("button", restock_link, "Mettre à jour les stocks", "", "");

    send_button.addEventListener("click", _ => {
        new_quantity_tab = document.querySelectorAll(".new_stock");

        for (let j=0; j<new_quantity_tab.length; j++) {
            if (j == i) {
                new_quantity = new_quantity_tab[i].value;
            }
        }
        
        window.location.replace("admin.php?action=restock&product=" + product.id + "&new_stock=" + new_quantity);
    })

    product_stock_management_button = create("button", papa, "Modifier les stocks", "", "");

    close_product_management_interface = create("img", product_management_interface, "", "croix", "");
    close_product_management_interface.src = "Images/croix.png";

    affichage_interface(product_stock_management_button, product_management_interface);
    cacher_interface(close_product_management_interface, product_management_interface);
}

function affichage_interface(button, interface) {
    /* Ajoute les fonctionnalités pour qu'un bouton affiche une interface */
    button.addEventListener("click", _ => {
        interface.classList.remove("hidden");
    })
}

function cacher_interface(button, interface) {
    /* Ajoute les fonctionnalités pour qu'un bouton cache une interface */
    button.addEventListener("click", _ => {
        interface.classList.add("hidden");
    })
}