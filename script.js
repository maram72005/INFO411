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

const products = [
    {
        "name": "P47D Thunderbolt",
        "brand": "Tamiya",
        "scale": "1/48",
        "price": 45,
        "descr": "Le Republic P-47 Thunderbolt fut l'un des principaux chasseurs américains de la Seconde Guerre mondiale. Il est même l'avion de chasse américain le plus produit lors du conflit avec 15 660 exemplaires construits.",
        "picture": "Images/republic_p_47_thunderbolt_tamiya.jpg",
        "stock": 10,
    },
    {
        "name": "Me-262 Night-Fighter",
        "brand": "Revell",
        "scale": "1/32",
        "price": 45,
        "descr": "Le Messerschmitt Me 262, surnommé Schwalbe (Hirondelle en français) pour les versions de combat ou Sturmvogel (Oiseau de tempête) pour les versions chasseur-bombardier, fut le premier avion de chasse opérationnel à moteur à réaction de l'Histoire, construit par la société allemande Messerschmitt pendant la Seconde Guerre mondiale.",
        "picture": "Images/me-262.jpg",
        "stock": 3,
    },
    {
        "name": "Mirage 3",
        "brand": "Revell",
        "scale": "1/72",
        "price": 30,
        "descr": "Le Mirage III est un avion multirôle conçu par le constructeur aéronautique français Dassault Aviation à la fin des années 1950. C'est le premier avion de combat de conception européenne capable de dépasser une vitesse de Mach 2 en vol horizontal.",
        "picture": "Images/mirage3.jpg",
        "stock": 5,
    },
    {
        "name": "Sea Harrier FRS.1",
        "brand": "Italeri",
        "scale": "1/72",
        "price": 20,
        "descr": "Le Harrier est le premier avion à décollage et atterrissage vertical mis en service au monde. En pratique cependant, il est trop lourd pour décoller verticalement avec son équipement de combat, sans parler du fait que cette manœuvre consommerait beaucoup de carburant. Il est donc généralement plutôt utilisé comme STOVL (appareil à décollage court et atterrissage vertical), capable de se contenter de pistes de 180 mètres de long.",
        "picture": "Images/harrier.jpg",
        "stock": 0,
    },
    {
        "name": "F4U Corsair",
        "brand": "Tamiya",
        "scale": "1/48",
        "price": 50,
        "descr": "Le Corsair fut construit à 12571 exemplaires, y compris après la seconde guerre mondiale. S'il eut des débuts difficiles, au point d'être dans un premier temps refusé par l'US Navy pour ses opérations embarquées, il finit par faire la preuve de ses performances, de sa robustesse, et d'être amélioré pour devenir un vrai avion embarqué. Peu de chasseurs de cette époque peuvent se vanter d'avoir eu une si belle carrière.",
        "picture": "Images/f4u-1a-corsair.jpg",
        "stock": 7,
    },
    {
        "name": "FW 190",
        "brand": "Italeri",
        "scale": "1/72",
        "price": 35,
        "descr": "Le Focke-Wulf Fw 190 Würger (Pie-grièche) est un chasseur-bombardier monoplace et monomoteur utilisé par l'Allemagne pendant la Seconde Guerre mondiale, entre 1941 et 1945. Il ne supplanta pas complètement le Messerschmitt Bf 109 comme principal chasseur de la Luftwaffe, bien qu'il lui fût supérieur. Il fut produit à plus de 20 000 exemplaires.",
        "picture": "Images/fw190.jpg",
        "stock": 12,
    },
    {
        "name": "A6M2",
        "brand": "Tamiya",
        "scale": "1/32",
        "price": 35,
        "descr": "Le Mitsubishi A6M, mieux connu sous le nom de « zero », était un chasseur-bombardier de la seconde guerre mondiale utilisé par la marine impériale japonaise. Sa maniabilité, ainsi que sa légèreté, ont fait de cet avion un chasseur remarquable et redouté par ses adversaires.",
        "picture": "Images/a6m2.avif",
        "stock": 12,
    }
]

var panier = [];

/* console.log(products); */

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

    panier.forEach(product_order => {
        nom_product = product_order.name;
        quant_order = product_order.quantite;
        products.forEach(product_in_stock => {
            if (product_in_stock.name == nom_product) {
                product_in_stock.stock = product_in_stock.stock - quant_order;
            }
        })
    })

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

        const bouton_commande = create("button", panier_container, "Commander", "bouton_commande", "");

        bouton_commande.addEventListener("click", _ => {
            console.log("commande");
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