/**
 * Generate column
 * Check every key
 * @param data
 * @param header
 */
function generateKeysColumn(data, header)
{
    for (let dataResult of data) {
        for (let keyResult in dataResult) {
            if (!header.includes(keyResult)) {
                header.push(keyResult);
            }
        }
    }
}

/**
 * Generate table header
 * @param table
 * @param data
 */
function generateTableHead(table, data)
{
    let thead = table.createTHead();
    let row = thead.insertRow();

    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);

        th.setAttribute("id", key)
        th.appendChild(text);
        row.appendChild(th);
    }
}

/**
 * Generate table row
 * @param table
 * @param data
 * @param header
 */
function generateTableRow(table, data, header)
{
    let tbody = table.createTBody();

    for (let i = 0; i < data.length; i++) {
        let row = tbody.insertRow();
        row.setAttribute("id", "tr" + i);
        row.style.height = "22.5px";

        for (let keyHeader of header) {
            let cell = row.insertCell();
            let text;

            cell.setAttribute("class", keyHeader);
            cell.style.textAlign = 'center';

            if (data[i][keyHeader]) {
                text = document.createTextNode(data[i][keyHeader]);
            } else {
                text = document.createTextNode('0');
            }

            cell.appendChild(text);
        }
    }
}
