(() => {
    // socket io connection
    const socket = io.connect('http://localhost:3333/');

    // props of the all <td />
    const items = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ]
    let flag = true;

    // Render in the tag <div #hash />
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

    // add events all tag <td />
    function addEvents() {
        const allTableData = document.querySelectorAll('#hash td');

        allTableData.forEach((value, index) => {
            value.addEventListener('click', () => {
                socket.emit('test', { position: index, itemArray: items });
            })
        })
    }

    // to change array itrms
    function toChangeArray(valIndex) {
        const allTableData = document.querySelectorAll('#hash td');

        if (flag && items[valIndex] === 0) {
            items[valIndex] = 1;

            // clorize blue item
            allTableData[valIndex].classList.add('x');
            flag = false;

        } else if (!flag && items[valIndex] === 0) {
            items[valIndex] = 2;

            // clorize red item
            allTableData[valIndex].classList.add('circule');
            flag = true;
        }
    }

    socket.on('test', (data) => {
       toChangeArray(data.position);
    })

    renderHashGame();
    addEvents();
})();
