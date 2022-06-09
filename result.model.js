/**
 * @class Model
 *
 */

class Result {

    constructor({Name, Department, January, February, March, April, May, June, July}) {
        this.name = Name;
        this.department = Department;
        this.january = January;
        this.february = February;
        this.march = March;
        this.april = April;
        this.may = May;
        this.june = June;
        this.july = July;
        this.firstQuarter = this.firstQuarter();
        this.secondQuarter = this.secondQuarter();
        this.semester = this.firstQuarter + this.secondQuarter;
    }

    getMonthValue(value) {
        return isNaN(value) ? 0 : value;
    }

    firstQuarter() {
        return this.getMonthValue(this.january) +
            this.getMonthValue(this.february) +
            this.getMonthValue(this.march);
    }

    secondQuarter() {
        return this.getMonthValue(this.april) +
            this.getMonthValue(this.may) +
            this.getMonthValue(this.june);
    }

}