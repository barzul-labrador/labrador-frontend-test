/**
 * @class Service
 *
 */
class ResultService {

    constructor() {
        const datas = JSON.parse(json) || [];
        this.results = datas.map(result => new Result(result));
        this.sortColumn = null;
        this.order = null;

        this.nbItemByPage = 10;
        this.nbTotalPage = Math.ceil(this.results.length / this.nbItemByPage)
    }

    sortResults(column, order) {
        this.sortColumn = column;
        this.order = order;
        this.results = this.results.sort(this.compareResult.bind(this));
    }

    compareResult(a, b) {
        const sortOrder = (this.order === 'asc') ? 1 : -1;
        return (a[this.sortColumn] > b[this.sortColumn] && 1 || -1) * sortOrder;
    }

    resultsByPage(page) {
        if (page < 1 || page > this.nbTotalPage) return [];
        return this.results.slice((page - 1) * this.nbItemByPage, page * this.nbItemByPage);
    }

}