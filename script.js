(() => {
     // Objeto global para a aplicação
    let app = {
        // Propriedades do objeto no formato par 'chave: valor'
        iniciarBtn: document.getElementById('iniciar'),
        restartarBtn: document.getElementById('restartar'),
        placarBtn: document.getElementById('placar'),
        tabuleiro: document.querySelector('#tabuleiro'),
        cartas: [
            {'img' : 'images/abacaxi.png'},
            {'img' : 'images/cereja.png'},
            {'img' : 'images/laranja.png'},
            {'img' : 'images/limao.png'},
            {'img' : 'images/maça.png'},
            {'img' : 'images/melancia.png'},
            {'img' : 'images/morango.png'},
            {'img' : 'images/pera.png'},
            {'img' : 'images/abacaxi.png'},
            {'img' : 'images/cereja.png'},
            {'img' : 'images/laranja.png'},
            {'img' : 'images/limao.png'},
            {'img' : 'images/maça.png'},
            {'img' : 'images/melancia.png'},
            {'img' : 'images/morango.png'},
            {'img' : 'images/pera.png'},
        ],
        cartasEscolhidas: [],
        cartasEscolhidasId: [],
        acertos: 0,
        erros: 0,
        localPlacar: JSON.parse(localStorage.getItem('score')) || [],
        tempoInicio: 0,
        userTempo: 0,

        // Classes do objeto
        iniciar() {
            app.iniciarBtn.addEventListener('click', function darCartas(){
                alert('Tenha um bom jogo!');
                var deck = app.cartas.sort(() => 0.5 - Math.random());
                app.tempoInicio = new Date().getTime();
                app.tabuleiro.innerHTML = '';

                for(var i=0; i < deck.length; i++) {
                    var carta = document.createElement('img');
                    carta.setAttribute('src', deck[i].img);
                    carta.setAttribute('id', i);
                    app.tabuleiro.appendChild(carta);
                };
                
                setTimeout(function(){
                    var cartas = document.querySelectorAll('img');
                    for(var i=0; i < deck.length; i++){
                        cartas[i].setAttribute('src', 'images/branca.png');
                        cartas[i].addEventListener('click', virarCarta);
                    }
                }, 3000);


                function virarCarta() {
                    var cartaThis = this;
                    var cartas = document.querySelectorAll('img');
                    var cartasId = cartaThis.getAttribute('id');
                    app.cartasEscolhidas.push(app.cartas[cartasId].img);
                    app.cartasEscolhidasId.push(cartasId);
                    cartaThis.setAttribute('src', app.cartas[cartasId].img);
                    cartas[cartasId].removeEventListener('click', virarCarta);
    
                    if (app.cartasEscolhidas.length > 2) {
                        for (var i = 2; i < app.cartasEscolhidas.length; i++) {
                            cartas[app.cartasEscolhidasId[i]].setAttribute('src','images/branca.png');
                            cartas[app.cartasEscolhidasId[i]].addEventListener('click', virarCarta);
                        };
                    }
                    else if(app.cartasEscolhidas.length === 2 && app.cartasEscolhidas.length <= 2) {
                        setTimeout(comparar, 1000);  
                    };
                };

                function comparar() {
                    var cartas = document.querySelectorAll('img');
                    if (app.cartasEscolhidas[0] === app.cartasEscolhidas[1]) {
                        cartas[app.cartasEscolhidasId[0]].removeEventListener('click', virarCarta);
                        cartas[app.cartasEscolhidasId[1]].removeEventListener('click', virarCarta);
                        cartas[app.cartasEscolhidasId[0]].setAttribute('src','images/vazio.png');
                        cartas[app.cartasEscolhidasId[1]].setAttribute('src','images/vazio.png');
                        app.acertos++;

                        if (app.acertos === 8) {
                            alert('Jogo terminado. Gerando novo jogo...');
                            app.userTempo = (((new Date().getTime()) - app.tempoInicio) / 1000.0).toFixed(2);
                            app.localPlacar.push([app.userTempo, app.erros]);
                            localStorage.setItem('score', JSON.stringify(app.localPlacar));
                            app.acertos = 0;
                            app.erros = 0;
                            darCartas();
                        }
                    }else{
                        cartas[app.cartasEscolhidasId[0]].setAttribute('src','images/branca.png');
                        cartas[app.cartasEscolhidasId[1]].setAttribute('src','images/branca.png');
                        cartas[app.cartasEscolhidasId[0]].addEventListener('click', virarCarta);
                        cartas[app.cartasEscolhidasId[1]].addEventListener('click', virarCarta);
                        app.erros++;
                    };
                    app.cartasEscolhidas = [];
                    app.cartasEscolhidasId = [];
                }
            })

            app.placarBtn.addEventListener('click', function(){
                app.tabuleiro.innerHTML = '';
                var placarOrdenado = app.localPlacar.sort((a,b) => a - b);
                for (var i = 0; i < placarOrdenado.length; i++) {
                    var placarText = document.createElement('p');
                    placarText.innerHTML = `${i + 1}º - TEMPO: ${placarOrdenado[i][0]} | ERROS: ${placarOrdenado[i][1]}`;
                    app.tabuleiro.appendChild(placarText);
                };
            });
        },
    };

    // Chamar o método do objeto global
    app.iniciar();
})();
 