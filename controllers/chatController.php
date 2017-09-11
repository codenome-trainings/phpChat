<?php

class chatController extends controller
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $dados = array('nome' => '');
        $c = new Chamados();

        if (isset($_GET['id']) && !empty($_GET['id'])) {
            $id = addslashes($_GET['id']);
            $c->updateStatus($id, '1');
        } elseif (isset($_POST['nome']) && !empty($_POST['nome'])) {
            $nome = addslashes($_POST['nome']);
            $ip = $_SERVER['REMOTE_ADDR'];
            $data_inicio = date('H:i:s');
            $_SESSION['chatwindow'] = $c->addChamado($ip, $nome, $data_inicio);
        }

        if (!isset($_SESSION['chatwindow']) || !empty($_SESSION['chatwindow'])) {
            $this->loadTemplate('newchamado', $dados);
            exit;
        }

        if (isset($_SESSION['area']) && $_SESSION['area'] == 'suporte') {
            $dados['nome'] = 'Suporte';
        } elseif (isset($_SESSION['area']) && $_SESSION['area'] == 'cliente') {
            $idchamado = $_SESSION['chatwindow'];
            $chamado = $c->getChamado($idchamado);
            $dados['nome'] = $chamado['nome'];
        }

        $this->loadTemplate("chat", $dados);
    }

}