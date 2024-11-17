-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 17 nov. 2024 à 19:21
-- Version du serveur : 8.0.31
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `skoto`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `id_categorie` int NOT NULL AUTO_INCREMENT,
  `nom_categorie` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `tarif` int NOT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id_categorie`, `nom_categorie`, `tarif`) VALUES
(5, 'Beazina', 20000),
(6, 'Mpiandraikitra', 30000),
(7, 'Tonia', 35000),
(9, 'Filoha', 40000);

-- --------------------------------------------------------

--
-- Structure de la table `cotisation`
--

DROP TABLE IF EXISTS `cotisation`;
CREATE TABLE IF NOT EXISTS `cotisation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_mpikatroka` int NOT NULL,
  `id_fivondronana` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `annee` year NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `diosezy`
--

DROP TABLE IF EXISTS `diosezy`;
CREATE TABLE IF NOT EXISTS `diosezy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_diosezy` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `filoha` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `diosezy`
--

INSERT INTO `diosezy` (`id`, `nom_diosezy`, `filoha`) VALUES
(9, 'Toliara', 'Jo'),
(10, 'Tananarivo', 'Pierre'),
(11, 'Fianarantsoa', 'Test');

-- --------------------------------------------------------

--
-- Structure de la table `faritra`
--

DROP TABLE IF EXISTS `faritra`;
CREATE TABLE IF NOT EXISTS `faritra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_faritra` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `filoha` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `id_diosezy` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `faritra`
--

INSERT INTO `faritra` (`id`, `nom_faritra`, `filoha`, `id_diosezy`) VALUES
(2, 'Isotry', 'Jo', 9),
(3, 'Talata', 'Tal', 10),
(4, 'Ankofafa', 'Test', 11);

-- --------------------------------------------------------

--
-- Structure de la table `fivondronana`
--

DROP TABLE IF EXISTS `fivondronana`;
CREATE TABLE IF NOT EXISTS `fivondronana` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `filoha` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `id_faritra` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `fivondronana`
--

INSERT INTO `fivondronana` (`id`, `nom`, `filoha`, `id_faritra`) VALUES
(2, 'Saint Joseph', 'Jim', 2),
(3, 'Saint Michel', 'Jim', 2);

-- --------------------------------------------------------

--
-- Structure de la table `mpikatroka`
--

DROP TABLE IF EXISTS `mpikatroka`;
CREATE TABLE IF NOT EXISTS `mpikatroka` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_mpikatroka` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `id_fivondronana` int NOT NULL,
  `id_categorie` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `mpikatroka`
--

INSERT INTO `mpikatroka` (`id`, `nom_mpikatroka`, `id_fivondronana`, `id_categorie`) VALUES
(1, 'Jim', 2, 5),
(2, 'Koto', 3, 7);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
