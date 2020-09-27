# Hash Game

## Como rodar em sua maquina:

- Faça um clone deste repositorio para sua maquina;
- Execute os comndos abaixo;

```terminal
    % npm install 
    % npm run start    
```

Após isso você poderá abrir em: http://localhost:3333

<p align="center">
    <img src="./img/demo.gif">
</p>

### Quais tecnologias usei
Todo este projeto foi feito com _HTML_, _CSS_, e _JavaScript_ no FrontEnd, no backend utilizei o _node.js_, _express_ e _socket.io_ para fazer a coneção com o backend. O tutorual abaixo explica como fiz tudo passo a passo. 

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

Com todo esse CSS pronto, vem a parte mais interessante em minha opinião, o funcionamento do jogo... Vamos lá!

<p align="center">
    <img src="https://i.pinimg.com/originals/c6/f1/3b/c6f13b01a53d7152d7f235838efe5a09.gif">
</p>

Temos que começar injetando todo html dentro da div#hash. Mas não podemos injetar diretamente, precisamos fazer um for onde teremos um (3x3) trez linhas por trez colunas. Talvez seja um pouco abstrato pensar nisso, mas olhe para esse esboço:

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

Se você tentar executa-lo no navegador, não verá nada. Mas muita calma! Só porque não está aparecendo não quer dizer que não esteja funcionado.
De uma olhada no seu dev tools e vai ver que que apareceu uma table com vasrias tr e td, como mostrado abaixo.

<p align="center">
    <img src="./img/devtools.png">
</p>

Legal né? Agora vamos estilizar cada umas dessas td, fazendo um quadrado de 50px por 50px, com a cor que preferir, eu irei fazer com um tipo de "verde". 

```css
#hash td {
    width: 50px;
    height: 50px;
    padding: 1px;

    background-color: cadetblue;
    cursor: pointer; /* Muda o cursor para um pontiro */
}
```

Agora se salva-lo e reacaregar a pagina verá algo parecido com a imagem abaixo. Mas ainda temos que cirar a mecanica do jogo como a vez de cada jogador e os clicks. 

<p align="center">
    <img src="./img/gameExample.png">
</p>

Vamos inplementar agora a função de click a todos os nove td, usando o _querySelectorAll_ ele nos retorna um array com todas as td. Mas se clicar neles não ira acontecer nada pois não programamos uma ação ainda, vamos apenas colocar um _console.log_ para vermos que deu certo.

```javascript
// adiciona o evento de click a todos os <td>
function addEvents() {
    // Retona um array com 9 items contendo as td
    const allTableData = document.querySelectorAll('#hash td');

    // Faz um loop dentro do nosso array, pegando cada
    // um dos valores(value) e adicona um click.
    allTableData.forEach((value, index) => {
        value.addEventListener('click', () => {
            console.log(index);
        })
    })
}
```

Agora se abrir o console do dev tools, irá ver que, ao clicar em um dos itens aparecerá o numero que ele representa. E é isto que queremos para colcoar o X e o circulo em seu respectivo lugar.

Então vem a parte mais legal, que será onde vamos criar a função responsavel pela parte de interagir com o jogo. Temos que criar duas variavies onde guardaremos o estado de cada item, e uma flag _(bandeira)_, que será usada para saber a vez do jogador.

```javascript
// Array de proriedades os valores podem ser 0, 1 e 2.
const items = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
]
// Variavel responsavel pela vez de cada jogador
let flag = true;
```

A função abaixo é responsavel por adiconar uma classe a cada uma das td.

```javascript
function toChangeArray(valIndex) {
    const allTableData = document.querySelectorAll('#hash td');

    // Verifica a flag se for true
    if (flag && items[valIndex] === 0) {
        items[valIndex] = 1;

        // adicona uma classe x
        allTableData[valIndex].classList.add('x');
        flag = false;

    } else if (!flag && items[valIndex] === 0) {
        items[valIndex] = 2;

        // adicona uma classe circule
        allTableData[valIndex].classList.add('circule');
        flag = true;
    }
}
```

Mas para que essas classes funcione teremos que adicionar um pouco mais de css no nosso arquivo de estilo.

```css
.circule {
    /* Adciona um circulo no jogo */
    background-repeat: no-repeat;
    background-image: url(./svg/circule.svg);
}

/* Adciona um x no jogo */
.x {
    /* Impede que o background se repita */
    background-repeat: no-repeat;
    background-image: url(./svg/x.svg);
}
```

Perceba que usamos um _background-image_ que esta disponivel detro da pasta svg que você também poderá usar. 
Pronto! Agora se salvar e testar no seu navegador já está funcionado.

<p align="center">
    <img src="./img/funcionalGame.gif">
</p>

Já temos 60% do projéto, todo o frontend já está pronto, agora vamos partir para o backend em _node_. 

[working in progress]...