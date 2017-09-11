<?php
require 'environment.php';

define("BASE_URL", "http://localhost/chat");


global $config;
$config = array();
if (ENVIRONMENT == 'development') {
    $config['dbname'] = 'chat';
    $config['host'] = 'localhost:3306';
    $config['dbuser'] = 'root';
    $config['dbpass'] = '';
} else {
    $config['dbname'] = 'chat';
    $config['host'] = 'localhost:3306';
    $config['dbuser'] = 'root';
    $config['dbpass'] = '';
}
?>
