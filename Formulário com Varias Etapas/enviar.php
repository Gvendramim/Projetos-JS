<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $confirmar = $_POST['confirmar_senha'];
    $instagram = $_POST['instagram'];
    $github = $_POST['github'];
    $twitter = $_POST['twitter'];
    $nome = $_POST['nome'];
    $sobrenome = $_POST['sobrenome'];
    $telefone = $_POST['telefone'];

    $mensagem = "Nova inscrição:\n
    E-mail: $email\n
    Nome: $nome $sobrenome\n
    Telefone: $telefone\n
    Instagram: $instagram\n
    Github: $github\n
    Twitter: $twitter\n";

    mail("gabvf11@outlook.com", "Nova inscrição do formulário", $mensagem);

    echo "Formulário enviado com sucesso!";
} else {
    echo "Método inválido.";
}
