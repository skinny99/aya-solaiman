-- phpMyAdmin SQL Dump
-- version 4.6.5.1deb1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 27, 2016 at 07:45 AM
-- Server version: 5.6.30-1
-- PHP Version: 7.0.13-2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jsf`
--

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `ID` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `price` float NOT NULL,
  `expiration_date` date NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `Product`
--

INSERT INTO `Product` (`ID`, `name`, `price`, `expiration_date`, `quantity`) VALUES
(67890, 'pro9', 33.4, '2017-08-08', 84),
(67891, 'pro8', 49.5, '2017-08-01', 9),
(67893, 'pro11', 33.8, '2017-11-08', 70),
(77888, 'pro8', 20.2, '2017-04-07', 5),
(77988, 'newone', 33.4, '2017-08-09', 22),
(87990, 'pro4', 33.2, '2017-08-09', 4),
(678493, 'pro99', 22.3, '2017-09-09', 28),
(987658, 'proc12', 78.9, '2017-09-10', 12);

-- --------------------------------------------------------

--
-- Table structure for table `sell`
--

CREATE TABLE `sell` (
  `product_ID` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `sell`
--

INSERT INTO `sell` (`product_ID`, `name`, `quantity`) VALUES
(67890, 'pro9', 6),
(67893, 'pro11', 3),
(678493, 'pro99', 5),
(889900, 'pro77', 0),
(987658, 'proc12', 10);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `Username` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(250) COLLATE utf8_bin NOT NULL,
  `email` varchar(50) COLLATE utf8_bin NOT NULL,
  `mobile` varchar(15) COLLATE utf8_bin NOT NULL,
  `sex` int(1) NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  `admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`Username`, `password`, `email`, `mobile`, `sex`, `approved`, `admin`) VALUES
('admin', 'admin', 'admin@comp.com', '0100000', 1, 1, 1),
('ahmed', '2234567liii', 'aimmr@hotmail.com', '0123856782', 0, 1, 0),
('fdgyyyyy', '234567lkjh,', 'amr@hotmail.com', '0123456789', 1, 1, 0),
('newuser.two', '012345ijmkl', 'new@hotmail.com', '0444456789', 1, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`);

--
-- Indexes for table `sell`
--
ALTER TABLE `sell`
  ADD PRIMARY KEY (`product_ID`) USING BTREE,
  ADD UNIQUE KEY `product_ID` (`product_ID`),
  ADD KEY `name` (`name`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `mobile` (`mobile`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
