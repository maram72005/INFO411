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

var panier = [];

// console.log(products); 

const products_container = document.querySelector(".products_container");

const products_details_container = document.querySelector(".products_details_container");

const panier_container = document.querySelector(".panier");

const acces_panier = document.querySelector(".voir_panier");

const bouton_filtre = document.querySelector("#bouton_filtre");

const radios_scale = document.querySelectorAll('input[name="scale"]');
// console.log(radios_scale);

var selectedscale = "all";
// console.log(selectedscale);

function filtre() {
    radios_scale.forEach(radio_scale => {
        if (radio_scale.checked) {
            selectedscale = radio_scale.value;
        }
    })
    // console.log(selectedscale);
    return selectedscale;
}

bouton_filtre.addEventListener("click", _ => {
    filtre();
    // console.log(selectedscale);
    products_container.innerHTML = "";
    products_details_container.innerHTML = "";
    creation_liste_products();
})

function reinitialisation_apres_commande() {

    console.log(products);

    products_container.innerHTML = "";
    products_details_container.innerHTML = "";
    creation_liste_products();

    panier = [];
    panier_container.innerHTML = "";
    const croix_sortie = create("img", panier_container, "", "croix_panier", "");
    croix_sortie.src = "Images/croix.png";

    croix_sortie.addEventListener("click", _ => {
        panier_container.classList.remove("visible");
    })

    montant_total = 0;

    products = [];
}


function already_in_panier(panier, product_name) {
    var i = -1;
    panier.forEach((product_from_panier, index) => {
        if (product_name == product_from_panier.name) {
            // console.log(i);
            i = index;
        }
    })
    return i;
}


function interraction_avec_panier(div_produit, product) {
    /* Permet de gérer toutes les interractions avec le panier (ajout de produits, ...) */

    if (product.stock <= 0) {
        const prix_produit = create("p", div_produit, "En rupture de stock", "", "");
    } else {
        const prix_produit = create("p", div_produit, "Il reste " + product.stock + " éléments en stock", "", "");
    }

    const interface_ajout_panier = create("div", div_produit, "", "interface_ajout_panier", "");

    const prix_produit = create("p", interface_ajout_panier, product.price + " €", "", "");

    if (product.stock > 0){

    const quant_container = create("div", interface_ajout_panier, "", "quant_container", "");

    const boutons_container = create("div", quant_container, "", "bouton_container", "");

    const bouton_moins = create("button", boutons_container, "-", "", "");

    const bouton_plus = create("button", boutons_container, "+", "", "");

    var x = 1;

    const quant_command = create("div", quant_container, x, "", "");

    const bouton_ajout_panier = create("button", interface_ajout_panier, "", "bouton_ajout_panier", "");

    const image_ajout_panier = create("img", bouton_ajout_panier, "", "ajout_panier", "");
    image_ajout_panier.src = "Images/ajout_panier.png";

    // console.log(product.stock);

    bouton_plus.addEventListener("click", _ => {
        if (x++ < product.stock) {
            quant_command.textContent = x;
        } else {
            x--;
            quant_command.textContent = x;
        }
        
    })

    bouton_moins.addEventListener("click", _ => {
        if (x == 1) {
            x = 1;
        } else {
            x--;
        }
        quant_command.textContent = x;
    })

    

    bouton_ajout_panier.addEventListener("click", _ => {

        panier_container.innerHTML = "";

        if (already_in_panier(panier, product.name) != -1) {

            console.log("deja dans panier")

            var product_already_in_panier = panier[already_in_panier(panier, product.name)];

            product_already_in_panier.quantite += x;

        } else {

            panier.push(product);
        
            var dernier_element = panier.length - 1;

            panier[dernier_element].quantite = x;
        }

        // console.log(panier);

        const croix_sortie = create("img", panier_container, "", "croix_panier", "");
        croix_sortie.src = "Images/croix.png";

        croix_sortie.addEventListener("click", _ => {
            panier_container.classList.remove("visible");
        })

        var montant_total = 0;
    
        panier.forEach(article => {

            const produit_container = create("div", panier_container, "", "produit_panier", "");

            const image_produit = create("img", produit_container, "", "image_panier", "");
            image_produit.src = article.picture;

            if (article.quantite > article.stock) {
                var quant_ordered = article.stock;
            } else {
                var quant_ordered = article.quantite;
            }

            const nom_article = create("h2", produit_container, article.name, "", "");

            const info_prix_groupe = create("p", produit_container, quant_ordered + " X " + article.price + "€", "", "");

            const prix_groupe = create("p", produit_container, quant_ordered * article.price + "€", "", "");

            const boutons_container_panier = create("div", produit_container, "", "bouton_container", "");

            const bouton_moins_panier = create("button", boutons_container_panier, "-", "", "");

            const bouton_plus_panier = create("button", boutons_container_panier, "+", "", "");

            var montant_article = quant_ordered * article.price;

            bouton_plus_panier.addEventListener("click", _ => {
                // console.log("plus")
                if (quant_ordered++ < product.stock) {

                } else {
                    quant_ordered--;
                }
                info_prix_groupe.textContent =  quant_ordered + " X " + article.price + "€";

                montant_total -= montant_article;
                montant_article = quant_ordered * article.price;
                montant_total += montant_article;
                // console.log(montant_total);

                article.quantite++;

                const ancien_montant_total = document.querySelector(".montant_total");
                ancien_montant_total.remove();
                const prix_total = create("p", panier_container, "Montant total : " + montant_total + "€", "montant_total", "");
            })
        
            bouton_moins_panier.addEventListener("click", _ => {
                // console.log("moins")
                if (quant_ordered == 1) {
                    quant_ordered = 1;
                } else {
                    quant_ordered--;
                }
                info_prix_groupe.textContent = quant_ordered + " X " + article.price + "€";

                montant_total -= montant_article;
                montant_article = quant_ordered * article.price;
                montant_total += montant_article;
                // console.log(montant_total);

                article.quantite--;

                const ancien_montant_total = document.querySelector(".montant_total");
                ancien_montant_total.remove();
                const prix_total = create("p", panier_container, "Montant total : " + montant_total + "€", "montant_total", "");
            })

            montant_total += montant_article;

        })

        const prix_total = create("p", panier_container, "Montant total : " + montant_total + "€", "montant_total", "");

        const lien_commande = create("a", panier_container, "", "", "");
        lien_commande.href = "site.php?action=commande";
        const bouton_commande = create("button", lien_commande, "Commander", "bouton_commande", "");

        bouton_commande.addEventListener("click", _ => {
            console.log("commande");
            console.log(panier);
            let long = panier.length;

            lien_commande.href += "&long=" + long;

            let ind = 0;

            panier.forEach(article => {
                lien_commande.href += "&id_art" + ind + "=" + article.id + "&quant" + ind + "=" + article.quantite;
                ind++;
            })

            reinitialisation_apres_commande();
        })
    })

    } else {
        create("p", interface_ajout_panier, "Ce produit n'est plus disponible pour le moment", "indisponible", "");
    }
    
}


function affichage_product(product) {
    /* Crée l'affichage d'un produit */

    if ((product.scale == selectedscale) || (selectedscale == "all")) {

        const div_produit = create("div", products_container, "", "product", "");

        const nom_produit = create("h2", div_produit, product.name, "product_name", "");

        const image_produit = create("img", div_produit, "", "", "");
        image_produit.src = product.picture;

        const marque_echelle_produit = create("div", div_produit, "", "marque_echelle_product", "");

        const marque_produit = create("p", marque_echelle_produit, "Marque : " + product.brand, "", "");

        const echelle_produit = create("p", marque_echelle_produit, product.scale, "", "");

        interraction_avec_panier(div_produit, product);

    }

}


function affichage_detaille_product(product) {
    /* Crée l'affichage détaillé d'un produit */

    if ((product.scale == selectedscale) || (selectedscale == "all")) {

        const detail_produit = create("section", products_details_container, "", "detail_product", "");

        const croix_sortie = create("img", detail_produit, "", "croix", "");
        croix_sortie.src = "Images/croix.png";

        croix_sortie.addEventListener("click", _ => {
            detail_produit.classList.remove("unhidden");
        })

        const nom_produit = create("h2", detail_produit, product.name, "", "");

        const image_produit = create("img", detail_produit, "", "", "");
        image_produit.src = product.picture;

        const descr_produit = create("h2", detail_produit, product.descr, "", "");

        const marque_produit = create("p", detail_produit, "Marque : " + product.brand, "", "");

        const echelle_produit = create("p", detail_produit, product.scale, "", "");

        // console.log(product.stock==0);

        interraction_avec_panier(detail_produit, product);
    }

}


function creation_liste_products() {
    /* Arpente la liste des produits un par un afin de créer leur affichage */
    products.forEach(product => {
        affichage_product(product);
        // console.log(product)
        affichage_detaille_product(product);
    })
    affichage_description();
    affichage_panier();
}

creation_liste_products();




function affichage_description() {
    const noms_produit = document.querySelectorAll(".product_name");
    const details_produit = document.querySelectorAll(".detail_product");
    noms_produit.forEach((nom_produit, index) => {
        var detail_produit = details_produit[index];

        nom_produit.addEventListener("click", _ => {
            detail_produit.classList.add("unhidden");
    
        })
    })
}


function affichage_panier() {

    acces_panier.addEventListener("click", _ => {
        panier_container.classList.add("visible");
    })

    const croix_sortie = document.querySelector(".croix_panier")
    croix_sortie.addEventListener("click", _ => {
        panier_container.classList.remove("visible");
    })
    
}