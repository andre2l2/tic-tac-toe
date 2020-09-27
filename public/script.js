// faz a conexão com o socket io no backend
const socket = io.connect('http://localhost:3333/');

// Quando houver alteração no backend
socket.on('test', (data) => {
    toChangeArray(data.position);
})

// array de proriedades
const items = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
]
let flag = true;

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

// adiciona o evento de click a todos os <td>
function addEvents() {
    const allTableData = document.querySelectorAll('#hash td');

    allTableData.forEach((value, index) => {
        value.addEventListener('click', () => {
            // Emite a posição para o servidor
            socket.emit('test', { position: index });
        })
    })
}

// Muda o estado do array items
// Altera também a flag
function toChangeArray(valIndex) {
    const allTableData = document.querySelectorAll('#hash td');

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

// Chama as funçoes
renderHashGame();
addEvents();