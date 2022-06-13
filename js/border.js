/**
 * Add style to header
 */
function addStyleHeader()
{
    let tr = document.getElementById("table");

    // Add style to main table
    if (tr) {
        tr.style.borderCollapse = "collapse";
    }

    tr = document.getElementById("table").tHead.children[0];

    // Add style to header
    if (tr) {
        tr.style.borderCollapse = "collapse";
        tr.style.borderTop = "2px dashed blue";
        tr.style.borderBottom = "2px dashed blue";
    }
}

/**
 * Add style to each row
 * @param data
 */
function addStyleRow(data)
{
    // Alternative syntax with first-child
    document.styleSheets[0].insertRule('table tbody tr:first-child { font-weight: bold; border-top: none }');
    document.styleSheets[0].insertRule('table tbody tr td:first-child { border: 2px solid green; }');
    document.styleSheets[0].insertRule('table tbody tr:first-child td:first-child { border-top: none; }');

    // Alternative syntax without inject in styleSheet.css
    // for (let i = 0; i < data.length; i++) {
    //     let tr = document.getElementById("tr" + i);
    //
    //     // Add style to row
    //     if (tr && tr.children[0]) {
    //         tr.children[0].style.border = "2px solid green";
    //
    //         // First row don't need border top
    //         if (i != 0) {
    //             tr.style.borderTop = "2px solid black";
    //         }
    //
    //         // First row in bold
    //         if (i == 0) {
    //             tr.style.fontWeight = "bold";
    //             tr.children[0].style.borderTop = "none";
    //         }
    //     }
    // }
}
