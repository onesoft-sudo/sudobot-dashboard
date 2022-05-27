<?php   
    if (isset($_GET['text'])) {
        echo hash('sha512', $_GET['text']);
    }