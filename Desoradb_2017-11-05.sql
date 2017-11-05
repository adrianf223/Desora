# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.7.19)
# Database: Desoradb
# Generation Time: 2017-11-05 11:34:20 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Alarme
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Alarme`;

CREATE TABLE `Alarme` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nume` varchar(120) DEFAULT 'Alarma',
  `ore` int(11) DEFAULT '0',
  `minute` int(11) DEFAULT '0',
  `secunde` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Alarme` WRITE;
/*!40000 ALTER TABLE `Alarme` DISABLE KEYS */;

INSERT INTO `Alarme` (`id`, `nume`, `ore`, `minute`, `secunde`)
VALUES
	(1,'Amiaza',12,30,33),
	(2,'Noaptea',0,0,0),
	(3,'LaDoi',14,23,34),
	(7,'Acum',0,0,1),
	(13,'Nou',0,0,1),
	(14,'Nou',0,0,1);

/*!40000 ALTER TABLE `Alarme` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
