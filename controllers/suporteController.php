<?php
/**
 * Created by PhpStorm.
 * User: thiago
 * Date: 10/09/2017
 * Time: 19:26
 */

class suporteController extends controller
{
    public function __construct()
    {
        parent::__construct();
        $_SESSION['area'] = 'suporte';
    }

    public function index()
    {
        $dados = array();
        $this->loadTemplate("suporte", $dados);
    }

}