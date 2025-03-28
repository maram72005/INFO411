-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 28 mars 2025 à 14:38
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `info411`
--

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `scale` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `descr` text NOT NULL,
  `picture` text NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `article`
--

INSERT INTO `article` (`id`, `name`, `brand`, `scale`, `price`, `descr`, `picture`, `stock`) VALUES
(1, 'P47D Thunderbolt', 'Tamiya', '1/48', 45, 'Le Republic P-47 Thunderbolt fut l\'un des principaux chasseurs américains de la Seconde Guerre mondiale. Il est même l\'avion de chasse américain le plus produit lors du conflit avec 15 660 exemplaires construits.', 'Images/republic_p_47_thunderbolt_tamiya.jpg', 20),
(2, 'Me-262 Night-Fighter', 'Revell', '1/32', 45, 'Le Messerschmitt Me 262, surnommé Schwalbe (Hirondelle en français) pour les versions de combat ou Sturmvogel (Oiseau de tempête) pour les versions chasseur-bombardier, fut le premier avion de chasse opérationnel à moteur à réaction de l\'Histoire, construit par la société allemande Messerschmitt pendant la Seconde Guerre mondiale.', 'Images/me-262.jpg', 14),
(3, 'Mirage 3', 'Revell', '1/72', 30, 'Le Mirage III est un avion multirôle conçu par le constructeur aéronautique français Dassault Aviation à la fin des années 1950. C\'est le premier avion de combat de conception européenne capable de dépasser une vitesse de Mach 2 en vol horizontal.', 'Images/mirage3.jpg', 13),
(4, 'Sea Harrier FRS.1', 'Italeri', '1/72', 20, 'Le Harrier est le premier avion à décollage et atterrissage vertical mis en service au monde. En pratique cependant, il est trop lourd pour décoller verticalement avec son équipement de combat, sans parler du fait que cette manœuvre consommerait beaucoup de carburant. Il est donc généralement plutôt utilisé comme STOVL (appareil à décollage court et atterrissage vertical), capable de se contenter de pistes de 180 mètres de long.', 'Images/harrier.jpg', 0),
(5, 'F4U Corsair', 'Tamiya', '1/48', 50, 'Le Corsair fut construit à 12571 exemplaires, y compris après la seconde guerre mondiale. S\'il eut des débuts difficiles, au point d\'être dans un premier temps refusé par l\'US Navy pour ses opérations embarquées, il finit par faire la preuve de ses performances, de sa robustesse, et d\'être amélioré pour devenir un vrai avion embarqué. Peu de chasseurs de cette époque peuvent se vanter d\'avoir eu une si belle carrière.', 'Images/f4u-1a-corsair.jpg', 14),
(6, 'FW 190', 'Italeri', '1/72', 35, 'Le Focke-Wulf Fw 190 Würger (Pie-grièche) est un chasseur-bombardier monoplace et monomoteur utilisé par l\'Allemagne pendant la Seconde Guerre mondiale, entre 1941 et 1945. Il ne supplanta pas complètement le Messerschmitt Bf 109 comme principal chasseur de la Luftwaffe, bien qu\'il lui fût supérieur. Il fut produit à plus de 20 000 exemplaires.', 'Images/fw190.jpg', 20),
(7, 'A6M2', 'Tamiya', '1/32', 35, 'Le Mitsubishi A6M, mieux connu sous le nom de « zero », était un chasseur-bombardier de la seconde guerre mondiale utilisé par la marine impériale japonaise. Sa maniabilité, ainsi que sa légèreté, ont fait de cet avion un chasseur remarquable et redouté par ses adversaires.', 'Images/a6m2.avif', 10);

-- --------------------------------------------------------

--
-- Structure de la table `comptes`
--

CREATE TABLE `comptes` (
  `id` int(11) NOT NULL,
  `login` varchar(25) NOT NULL,
  `password` text NOT NULL,
  `role` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `comptes`
--

INSERT INTO `comptes` (`id`, `login`, `password`, `role`) VALUES
(3, 'B1jam1', '$2y$10$/b4NZIdQeyWxugsbsbjy7OQ3OUD435n3e8H.D3A08i.IGIM7FrQzC', 'client'),
(4, 'B1jam2', '$2y$10$6L9WL8fpaWV5Rz8BGAMPkuz7xtjh2qMyUPdplJ20.f64DEqk3mOTm', 'client'),
(6, 'adm1n', '$2y$10$rw9HIbvpqMe7.INADm7BVeiJa089OXNJVORxd5Hj.Diy7A51WHlWe', 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

CREATE TABLE `panier` (
  `id` int(11) NOT NULL,
  `id_compte` int(11) NOT NULL,
  `id_article` int(11) NOT NULL,
  `quantite` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `panier`
--

INSERT INTO `panier` (`id`, `id_compte`, `id_article`, `quantite`) VALUES
(3, 3, 1, 2),
(6, 4, 2, 1),
(11, 4, 2, 1),
(12, 4, 2, 1),
(13, 3, 3, 2),
(14, 3, 1, 1),
(15, 3, 2, 1),
(16, 3, 2, 1),
(17, 3, 2, 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `comptes`
--
ALTER TABLE `comptes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `panier`
--
ALTER TABLE `panier`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_compte` (`id_compte`),
  ADD KEY `id_article` (`id_article`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `article`
--
ALTER TABLE `article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `comptes`
--
ALTER TABLE `comptes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `panier`
--
ALTER TABLE `panier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `panier`
--
ALTER TABLE `panier`
  ADD CONSTRAINT `panier_ibfk_1` FOREIGN KEY (`id_article`) REFERENCES `article` (`id`),
  ADD CONSTRAINT `panier_ibfk_2` FOREIGN KEY (`id_compte`) REFERENCES `comptes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
