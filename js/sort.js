/**
 * Add sort event to some column
 */
function addSortTable()
{
    addEventShort("Name");
    addEventShort("Department");
}

/**
 * Add event click with function and param
 * @param name
 */
function addEventShort(name)
{
    document.getElementById(name).style.cursor = "pointer"
    document.getElementById(name).addEventListener("click", sortByColumn);
    document.getElementById(name).parameter = name;
}

/**
 * Short by asc or des
 * @param $event
 */
function sortByColumn($event)
{
    let parameter = $event.currentTarget.parameter;

    if (parameter) {
        data = data.sort(function(a, b) {
            let keyA = a[parameter];
            let keyB = b[parameter];

            if (keyA < keyB) {
                if (sortRef[parameter]) {
                    return 1;
                } else {
                    return -1;
                }
            } else if (keyA > keyB) {
                if (sortRef[parameter]) {
                    return -1;
                } else {
                    return 1;
                }
            } else {
                return 0;
            }
        });

        dataSource = data;

        sortRef[parameter] = !sortRef[parameter];
        refreshTable();
    }
}
