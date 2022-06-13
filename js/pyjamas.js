/**
 * Add color to the tag tr
 * Even => #e5e5e5; Odd => red
 * @param data
 * @param header
 */
function addColor(data, header)
{
    // Alternative syntax with nth-of-type
    document.styleSheets[0].insertRule('table tbody tr:nth-of-type(odd) { background-color: red; }');
    document.styleSheets[0].insertRule('table tbody tr:nth-of-type(even) { background-color: #e5e5e5; }');

    // Alternative syntax without inject in styleSheet.css
    // for (let i = 0; i < data.length; i++) {
    //     let tr = document.getElementById("tr" + i);
    //     if (i % 2 == 0) {
    //         for (let t = 0; t < header.length; t++) {
    //             if (t !== (header.length - 1)) {
    //                 tr.children[t].style.backgroundColor = "red";
    //             }
    //         }
    //     } else {
    //         for (let t = 0; t < header.length; t++) {
    //             if (t !== (header.length - 1)) {
    //                 tr.children[t].style.backgroundColor = '#e5e5e5';
    //             }
    //         }
    //     }
    // }
}
