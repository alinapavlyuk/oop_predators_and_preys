class MapDrawer {

    drawMapFromArray(mapArray) {
        this.#createHTMLTableFromData(mapArray);
    }

    redrawMapFromNewArray(newMapArray) {
        this.#changeHTMLTableContent(newMapArray);
    }

    #createHTMLTableFromData(tableData) {
        let main = document.querySelector('main');
        let table = document.createElement('table');
        let tableBody = document.createElement('tbody');

        tableData.forEach((rowData) => {
            let row = document.createElement('tr');

            rowData.forEach((cellData) => {
                let cell = document.createElement('td');
                cell.className = `cell type-${cellData.name}`;
                row.appendChild(cell);
            });

            tableBody.appendChild(row);
        });

        table.appendChild(tableBody);
        main.appendChild(table);
    }

    #changeHTMLTableContent(newTableData) {
        let table = document.querySelector('table');
        let rowAmount = table.rows.length;
        let colAmount = table.rows[0].cells.length;

        for (let i = 0; i < rowAmount; i++) {
            for (let j = 0; j < colAmount; j++) {
                let cell = table.rows[i].cells[j];
                const animal = newTableData[i][j];
                cell.className = `cell type-${animal.name}`;
            }
        }
    }
}

export const mapDrawer = new MapDrawer();
