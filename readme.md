# Hash Game

## Como rodar em sua maquina:

* Faça um clone deste repositorio para sua maquina;
* Execute os comndos abaixo;

```terminal
    % npm install 
    % npm run start    
```

Após isso você poderá abrir em: http://localhost:3333

<p align="center">
    <img src="./img/demo.gif">
</p>

---

## Como fazer:

Há algum tempo atraz eu havia feito um artigo sobre o [efeito gavetas](https://github.com/andre2l2/colors), e desta vez, resolvi criar mais um artigo. E irei explicar como fiz um jogo de cerquilha, ou jogo da velha para os mais intimos. Onde você poderá conectar dois jogadores e disputar uma partida do jogo da velha. Só para deixar claro, eu sou o __mestre__ desse jogo!

Neste projeto eu utilizei o express e socket.io no backend, para gerenciar o estado do jogo, para isso vamos começar a criar nosso frontend pois assim será mais intuitivo. Vamos codar!

Priemrio crie 3 arquivos, index.html, scirpt.js e style.css. Agora em nosso html iremos precisar apenas de uma div com o id hash. Pois dentro dela iremos injetar todo o html restante via javascript.

```html
    <body>
        <div id="hash"></div>

        <script src="./script.js"></script>
    </body>
```

Agora vamos centralizar essa div utilizando o meu amado CSS <3.

```CSS
    * { 
        /* Padoniza alguns comportamentos do navegador */
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        /* Define uma altura e largura em relação a tela do usuario */
        height: 100vh;
        width: 100vw;

        /* Centraliza os filhos do html ao centro */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
```

Com todo esse CSS pronto, vem a mais interessante em minha opinião, o funcionamento do jogo... Vamos lá!

<p align="center">
    <img src="https://i.pinimg.com/originals/c6/f1/3b/c6f13b01a53d7152d7f235838efe5a09.gif">
</p>

Temos que comecar injetando todo html dentro da div#hash. Mas não podemos injetar diretamente, precisamos fazer um for onde teremos um (3x3) trez linhas por trez colunas. Talvez seja um pouco abstrato pensar nisso, mas olhe para esse esboço:

<p align="center">
    <img src="./img/hashGame.jpg">
</p>

Perceba que as linhas são as tr (table row) e cada uma das celuas são o td (table data). 

Agora precisamos criar uma variavel chamada table, que será onde colocaremos tudo o html que vai ser passado a div#hash. E a cada loop injetamos dentro da variavel uma tr e tres td.

```javascript
// Renderiza dento da <div #hash />
function renderHashGame() {
    let table = `<table>`;

    for (let r = 0; r < 3; r++) {
        table += `<tr>`;

        for (let d = 0; d < 3; d++) {
            table += `<td>`;

            table += `</td>`;
        }

        table += `</tr>`;
    }
    table += `</table>`;
    document.querySelector('#hash').innerHTML = table;
}
```

Se você tentar executa-lo em seu navegador, não verá nada. Mas muita calma! Só porque não está aparecendo não quer dizer que não esteja funcionado.
De uma olhada no seu dev tools e vai ver que que apareceu uma table com vasrias tr e td, como mostrado abaixo.

<p align="center">
    <img src="./img/devtools.png">
</p>

[working in progress]...