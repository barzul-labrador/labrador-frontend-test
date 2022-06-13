/**
 * Init pagination with sizePage
 * Remove unused row
 */
function initPagination()
{
    let elementTBody = document.getElementById("table").getElementsByTagName("tbody")[0].children;

    // Remove unused row for the exercise
    if (elementTBody && elementTBody.length > sizePage) {
        for (let i = (elementTBody.length - 1); i >= sizePage ; i--) {
            elementTBody[i].remove();
        }
    }
}

/**
 * Add button pagination and actual page
 */
function addButtonPagination()
{
    let divPaginator = document.createElement("div");
    divPaginator.setAttribute("id", "paginator");
    divPaginator.style.textAlign = "center";
    divPaginator.style.paddingTop = "5px"
    document.body.appendChild(divPaginator);

    let element = document.createElement("button");
    element.innerHTML = "Previous";
    element.addEventListener("click", eventPageChange);
    element.parameter = "previous";
    divPaginator.appendChild(element);

    // Page number previous
    element = document.createElement("span");
    element.setAttribute("id", "pagePrevious");

    // Set number of previous page
    if (page > 0) {
        element.innerHTML = (page - 1).toString();
    } else {
        element.innerHTML = '';
    }

    element.style.padding = "0 10px"
    element.style.color = "grey";
    divPaginator.appendChild(element);

    // Page number next
    element = document.createElement("span");
    element.setAttribute("id", "page");
    element.innerHTML = (page + 1).toString();
    element.style.padding = "0 10px"
    divPaginator.appendChild(element);

    // Page number next
    element = document.createElement("span");
    element.setAttribute("id", "pageNext");

    // Set number of next page
    if ((page * sizePage) < data.length) {
        element.innerHTML = (page + 2).toString();
    } else {
        element.innerHTML = '';
    }

    element.style.padding = "0 10px"
    element.style.color = "grey";
    divPaginator.appendChild(element);

    // Button next
    element = document.createElement("button");
    element.innerHTML = "Next";
    element.addEventListener("click", eventPageChange);
    element.parameter = "next";
    divPaginator.appendChild(element);
}

/**
 * Add data to source
 * Calculate with page and sizePage
 */
function addDataToSourcePagination()
{
    // Slice with the good range
    dataSource = data.slice((page * sizePage), ((page * sizePage) + sizePage));

    // Refresh display after new dataSource
    refreshTable();
}

/**
 * Event when user click on button Previous/Next
 * Update pages
 * @param $event
 */
function eventPageChange($event)
{
    let parameter = $event.currentTarget.parameter;

    // When user click on previous button
    if (parameter == "previous") {
        if (page > 0) {
            page--;
        }
    }
    // When user click on next button
    else if (parameter == "next") {
        if (((page + 1) * sizePage) < data.length) {
            page++;
        }
    }

    document.getElementById("page").textContent = (page + 1).toString();

    // Update page previous
    if ((page * sizePage) < data.length) {
        document.getElementById("pagePrevious").textContent = (page).toString();
    } else {
        // When don't need previous page clear number
        document.getElementById("pagePrevious").textContent = '';
    }

    // Update page next
    if (((page + 1) * sizePage) < data.length) {
        document.getElementById("pageNext").textContent = (page + 2).toString();
    } else {
        // When don't need next page clear number
        document.getElementById("pageNext").textContent = '';
    }

    addDataToSourcePagination();
}
