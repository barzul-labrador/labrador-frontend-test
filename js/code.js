var data;
var dataSource;
var page = 0;
var sizePage = 10;
var table;
var header = [];
var sortRef = {Name: false, Department: false};

// Alternative syntax with asyn function
/**
 * Read text file using await/async (promise)
 * @param file
 * @returns {Promise<void>}
 */
async function readTextFile(file) {
    // Get promise fetch file
    const data = await fetch(file);
    const dataJson = await data.text();

    generateTable(dataJson);
}

// Alternative syntax with XMLHttpRequest
// /**
//  * Read text file using XMLHttpRequest
//  * @param file
//  */
// function readTextFile(file) {
//     const rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, false);
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState == 4)
//         {
//             if(rawFile.status == 200 || rawFile.status == 0)
//             {
//                 let response = rawFile.responseText;
//                 generateTable(response);
//             }
//         }
//     }
//     rawFile.send(null);
// }

/**
 * Generate table
 * @param response
 */
function generateTable(response)
{
    data = JSON.parse(response);
    dataSource = data;
    table = document.createElement("table");
    table.setAttribute("id", "table");
    table.style.width = '100%';
    document.body.appendChild(table);

    // First exercise : create a table from the json
    generateKeysColumn(data, header);
    generateTableHead(table, header);
    generateTableRow(table, data, header);

    // Second exercise : Add totals
    addNewsHead(data, header);
    calculateSemester(data, header);

    // Third exercise : add pyjamas on table
    addColor(data, header);

    // Fourth exercise : Borders
    addStyleHeader();
    addStyleRow(data);

    // Fifth exercise : add sort
    addSortTable();

    // Sixth exercise : add pagination on this table.
    initPagination();
    addButtonPagination();
    addDataToSourcePagination();
}

/**
 * Refresh table with new data
 */
function refreshTable()
{
    // Feed row by value
    for (let i = 0; i < dataSource.length; i++) {
        for (let t = 0; t < header.length; t++) {
            // Check if className exist
            if (document.getElementById("tr" + i) && document.getElementById("tr" + i).getElementsByClassName(header[t]).length) {
                document.getElementById("tr" + i).getElementsByClassName(header[t])[0].textContent = dataSource[i][header[t]];
            }

            // Re display row if hidden
            if (document.getElementById("tr" + i).style.display == "none") {
                document.getElementById("tr" + i).style.display = "table-row";
            }
        }
    }

    // Clear row if not exist
    if (dataSource.length < sizePage) {
        for (let i = (dataSource.length); i < sizePage; i++) {
            let count = 0;

            for (let t = 0; t < header.length; t++) {
                // Check if className exist
                if (document.getElementById("tr" + i).getElementsByClassName(header[t]).length) {
                    document.getElementById("tr" + i).getElementsByClassName(header[t])[0].textContent = "";
                }

                count++;
            }

            // Hidden empty row
            if (count == header.length) {
                document.getElementById("tr" + i).style.display = "none";
            }
        }
    }
}

// Alternative syntax with asyn function
readTextFile("./data.json")
    .catch(function (err) {
        console.error(err);
    });

// Alternative syntax for XMLHttpRequest
// readTextFile("./data.json");
