class MyTableController {

    constructor(resultService) {
        this.resultService = resultService;

        //i don't use Object.keys() function => some row don't have all columns and exercice 2 column's are not in JSON
        this.headerLabel = ['Name', 'Department', 'January', 'February', 'March', 'Quarter', 'April', 'May', 'June', 'Semester', 'July'];
        this.rowKeys = ['name', 'department', 'january', 'february', 'march', 'firstQuarter', 'april', 'may', 'june', 'semester', 'july'];

        //init view

        this.app = document.getElementById('app');

        this.table = document.createElement('table');
        this.app.appendChild(this.table);

        this.thead = null;
        this.tbody = null;

        this.currentPage = 1;
        this.pagination = document.createElement('div');
        this.pagination.setAttribute('class', 'pagination');
        this.app.appendChild(this.pagination);

        this.drawHeader();
        this.drawTableContent();

    }

    removeTableContent() {
        this.table.removeChild(this.tbody);
    }

    drawTableContent() {
        this.tbody = this.table.createTBody();
        this.resultService.resultsByPage(this.currentPage).forEach((row) => {
            let tr = this.tbody.insertRow();

            this.rowKeys.forEach((key) => {
                let td = tr.insertCell();
                td.innerText = (row[key] !== undefined) ? row[key] : '';
            });
        });
        this.refreshPagination();
    }

    refreshTable() {
        this.removeTableContent();
        this.drawTableContent();
    }

    // for a continus dashed border
    insertDashedRow() {
        const headerLine = this.thead.insertRow();
        const headerCell = document.createElement('th');
        headerCell.setAttribute('colspan', this.headerLabel.length);
        headerLine.appendChild(headerCell)
    }

    drawHeader() {
        this.thead = this.table.createTHead();

        let headerLine = this.thead.insertRow();
        this.headerLabel.forEach((label, index) => {
            const headerCell = document.createElement('th');
            headerCell.innerText = label;
            //bind sort function for the column 1 & 2
            if (index < 2) {
                headerCell.addEventListener('click', this.sortMyTable.bind(event, index));
            }
            headerLine.appendChild(headerCell)
        });

        this.insertDashedRow();
    }

    sortMyTable = (index) => {
        if (this.rowKeys[index] === this.resultService.sortColumn) {
            this.resultService.sortResults(this.rowKeys[index], (this.resultService.order === 'asc' ? 'desc' : 'asc'));
        } else {
            this.resultService.sortResults(this.rowKeys[index], 'asc');
        }
        //back to page 1
        this.currentPage = 1;
        //draw table content
        this.refreshTable();

        //display order
        const thElements = this.thead.getElementsByTagName("th");
        for (let i = 0; i < 2; i++) {
            thElements[i].innerHTML = (i === index) ? `${this.headerLabel[i]} (${this.resultService.order})` : this.headerLabel[i];
        }
    }

    refreshPagination() {
        //clear content
        this.pagination.innerHTML = '';

        //previous page link
        if (this.currentPage > 1) {
            const previous = document.createElement('a');
            previous.innerHTML = 'Previous';
            previous.setAttribute('title', 'Previous');
            previous.setAttribute('href', '#');
            previous.addEventListener('click', this.changePage.bind(event, this.currentPage - 1));
            this.pagination.appendChild(previous);
        }

        //pagination infos
        const page = document.createElement('span');
        page.innerHTML = `Current page : ${this.currentPage}/${this.resultService.nbTotalPage}`;
        this.pagination.appendChild(page);

        //next page link
        if (this.currentPage < this.resultService.nbTotalPage) {
            const next = document.createElement('a');
            next.innerHTML = 'Next';
            next.setAttribute('title', 'Next');
            next.setAttribute('href', '#');

            next.addEventListener('click', this.changePage.bind(event, this.currentPage + 1));
            this.pagination.appendChild(next);
        }

    }

    changePage = (page) => {
        this.currentPage = page;
        this.refreshTable();
        return false;
    }

}

const myApp = new MyTableController(new ResultService());