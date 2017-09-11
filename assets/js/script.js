function abrirChat() {
    window.open("/chat/chat", "chatwindow", "width=400, height=400");
}

function iniciarSuporte() {
    setTimeout(getChamado, 2000);
}

function getChamado() {
    $.ajax({
        type: 'POST',
        url: '/chat/ajax/getchamado',
        dataType: 'json',
        success: function (json) {

            resetChamados();

            if (json.chamados.length > 0) {
                for (var i in json.chamados) {
                    if (json.chamados[i].status == '1') {
                        $('#areadechamados tbody').append("<tr class='chamado' data-id='" + json.chamados[i].id + "'><td>" + json.chamados[i].data_inicio + "<td>" + json.chamados[i].nome + "<td>" + "<button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" disabled>Em atendimento</button>" + "</td></td></td></tr>");
                    } else {
                        $('#areadechamados tbody').append("<tr class='chamado' data-id='" + json.chamados[i].id + "'><td>" + json.chamados[i].data_inicio + "<td>" + json.chamados[i].nome + "<td>" + "<button type=\"button\" class=\"btn btn-sm btn-outline-primary\" onclick='abrirChamado(this)'>Atender</button>" + "</td></td></td></tr>");
                    }
                }
            }

            setTimeout(getChamado, 2000);
        },
        error: function () {
            setTimeout(getChamado, 2000);
        }
    });
}

function resetChamados() {
    $('.chamado').remove();
}

function abrirChamado(obj) {
    var id = $(obj).closest('.chamado').attr("data-id");
    window.open('/chat/chat?id=' + id, 'chatwindow', 'width=400, height=400');
}

/**
 *
 * @param obj
 * @param event Evento para puxar a tecla enter do teclado e fazer a ação de enviar.
 */
function keyUpChat(obj, event) {

    if (event.keyCode == 13) {
        var msg = obj.value;
        obj.value = '';

        var hr = horaAtual();
        var nome = $('.inputArea').attr('data-nome');

        $('.chatArea').append("<div class='card space-chat-item'><div class='card-body'><div class='msgitem'>" + hr + " - <strong>" + nome + ": </strong>" + msg + "</div></div></div>");
    }
}

function horaAtual() {
    var dt = new Date();
    return dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
}