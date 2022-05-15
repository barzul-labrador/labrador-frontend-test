const table = document.createElement('table');
table.id = 'table';
console.log('ma table:', table);
let datum = [];
const colors = ['red', '#e5e5e5']

const randomColor = (nodes,color) => {
    for(let i=0; i<nodes.length-1; i++){
        nodes[i].style.backgroundColor = color??colors[Math.floor(Math.random() * colors.length)];
    }
}
const insertIntoTableRow = (tr,tag,dataToInsert) => {
    const th1 = document.createElement(tag);
    th1.textContent= dataToInsert; 
    tr.appendChild(th1);
}

const insertAttributes = (table,dataToInsert) => {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    let i = 0;
    for(const key in dataToInsert) {
        const th = document.createElement('th');
        th.textContent = key;
        tr.appendChild(th);
        if(i === 4){
            insertIntoTableRow(tr,'th','Trimester Total');
        } 
        if(i === 7){
            insertIntoTableRow(tr,'th','Semester Total');
        } 
        i++;
    }
    thead.appendChild(tr);
    table.appendChild(thead);
}

const insertDataForTrimester = (tr,sum) => {
    const td1 = document.createElement('td');
    td1.textContent = sum;
    tr.appendChild(td1);
}
const insertData = (table,dataToInsert) => {
    const tbody = document.createElement('tbody');
    const limit = 4;
    const limit2 = 7;
    let counter = 0;
    for(const element of dataToInsert) {
        const tr = document.createElement('tr');
        const first = dataToInsert[0];
        let sum = 0;
        let indice = 0;
        for(const key in first) {
            const td = document.createElement('td');
            td.textContent = element[key]??0;
            tr.appendChild(td);
            if(typeof (element[key]??0)==='number') {
                sum += parseInt(element[key]??0);
                if(indice === limit) insertDataForTrimester(tr,sum);
                if(indice === limit2) insertDataForTrimester(tr,sum);
            }
            indice++;
        }
        const nodes = tr.childNodes;
        if(counter === 0) randomColor(nodes,'red');
        else randomColor(nodes,null);
        tbody.appendChild(tr);
        counter++;
    }
    table.appendChild(tbody);
}
const fetchData =  async () => {
    const data = await fetch ('./data.json');
    const dataJson = await data.text();
    datum = JSON.parse(dataJson);
    const fistelement = datum[0];
    insertAttributes(table,fistelement);
    insertData(table,datum);
    document.body.appendChild(table);
};

fetchData();
