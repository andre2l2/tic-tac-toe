(() => {
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
                toChangeArray(allTableData, index);
            })
        })
    }

    // to change array itrms
    function toChangeArray(arr, valIndex) {
        if (flag && items[valIndex] === 0) {
            items[valIndex] = 1;

            // clorize blue item
            arr[valIndex].classList.add('x');
            flag = false;

        } else if (!flag && items[valIndex] === 0) {
            items[valIndex] = 2;

            // clorize red item
            arr[valIndex].classList.add('circule');
            flag = true;
        }
    }

    renderHashGame();
    addEvents();
})();

