/**
 * Add news head
 * @param data
 * @param header
 */
function addNewsHead(data, header)
{
    let newsColumn = [{after: "March", name: "Half"}, {after: "July", name: "Whole"}];

    // Create new column
    for (let newColumn of newsColumn) {
        let indexOfColumn = header.indexOf(newColumn.after);

        if (indexOfColumn >= 0) {
            header.splice(++indexOfColumn, 0, newColumn.name);

            let tr = document.getElementById("table").tHead.children[0];
            let th = document.createElement("th");
            let text = document.createTextNode(newColumn.name);

            th.appendChild(text);
            tr.insertCell(indexOfColumn).appendChild(th);
        }
    }

    // Init half/whole number in object
    for (let i = 0; i < data.length ;i++) {
        data[i]["Half"] = 0;
        data[i]["Whole"] = 0;

        for (let keys of Object.keys(data[i])) {
            if (keys == "January" || keys == "February" || keys == "March") {
                data[i]["Half"] += Number(data[i][keys]);
            }

            if (!isNaN(data[i][keys]) && keys != "Half" && keys != "Whole") {
                data[i]['Whole'] += Number(data[i][keys]);
            }
        }
    }
}

/**
 * Calculate semester and insert into the cell
 * @param data
 * @param header
 */
function calculateSemester(data, header)
{
    for (let i = 0; i < data.length; i++) {
        let tr = document.getElementById('tr' + i);

        let indexOfMarch = header.indexOf('March');

        // Insert into half cell
        if (indexOfMarch >= 0) {
            let text = document.createTextNode(data[i].Half);
            let cell = tr.insertCell(++indexOfMarch)

            cell.setAttribute("class", "Half");
            cell.appendChild(text);
        }

        let indexOfJuly = header.indexOf('July');

        // Insert into whole cell
        if (indexOfJuly >= 0) {
            let text = document.createTextNode(data[i].Whole);
            let cell = tr.insertCell(++indexOfMarch)

            cell.setAttribute("class", "Whole");
            cell.appendChild(text);
        }
    }
}
