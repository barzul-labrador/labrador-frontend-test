
var dataTable = require('data.json');


var table = document.createElement('table');
var thead = document.createElement('thead');
var tbody = document.createElement('tbody');

var dataKey = Object.keys(dataTable[0]);
const tr = thead.insertRow();
dataKey.forEach( function(columnHead) {
    var th = document.createElement('th');
    th.innerText = columnHead;
    tr.appendChild(th);
});

table.appendChild(thead);

dataTable.forEach(function(row) {
    const tr = thead.insertRow();
    for (const value of Object.entries(row)) {
        var td = document.createElement('td');
        td.innerText = value[1];
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
});

table.appendChild(tbody);

document.body.appendChild(table);
