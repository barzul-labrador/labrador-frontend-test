/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const table = document.createElement('table');
const container = document.createElement('div');
container.id = 'container';
table.id = 'table';
let elementToDisplay = 10;
let datum = [];
const colors = ['red', '#e5e5e5', 'green'];

function compareByName(a, b) {
  if (a.Name < b.Name) {
    return -1;
  }
  if (a.Name > b.Name) {
    return 1;
  }
  return 0;
}
function compareByDepartment(a, b) {
  if (a.Department < b.Department) {
    return -1;
  }
  if (a.Department > b.Department) {
    return 1;
  }
  return 0;
}
const randomColor = (nodes, color) => {
  for (let i = 0; i < nodes.length - 1; i += 1) {
    nodes[i].style.backgroundColor = color ?? colors[Math.floor(Math.random() * colors.length)];
  }
};
const insertIntoTableRow = (tr, tag, dataToInsert) => {
  const th1 = document.createElement(tag);
  th1.textContent = dataToInsert;
  tr.appendChild(th1);
};

const insertAttributes = (table, dataToInsert) => {
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  let i = 0;
  for (const key in dataToInsert) {
    const th = document.createElement('th');
    th.textContent = key;
    tr.appendChild(th);
    if (i === 4) {
      insertIntoTableRow(tr, 'th', 'Trimester Total');
    }
    if (i === 7) {
      insertIntoTableRow(tr, 'th', 'Semester Total');
    }
    i += 1;
  }
  thead.appendChild(tr);
  table.appendChild(thead);
};

const insertDataForTrimester = (tr, sum) => {
  const td1 = document.createElement('td');
  td1.textContent = sum;
  tr.appendChild(td1);
};
const insertData = (table, dataToInsert) => {
  const tbody = document.createElement('tbody');
  const limit = 4;
  const limit2 = 7;
  let counter = 0;
  for (const element of dataToInsert) {
    const tr = document.createElement('tr');
    const first = dataToInsert[0];
    let sum = 0;
    let indice = 0;
    for (const key in first) {
      const td = document.createElement('td');
      td.textContent = element[key] ?? 0;
      tr.appendChild(td);
      if (typeof (element[key] ?? 0) === 'number') {
        sum += parseInt(element[key] ?? 0, 10);
        if (indice === limit) insertDataForTrimester(tr, sum);
        if (indice === limit2) insertDataForTrimester(tr, sum);
      }
      indice += 1;
    }
    const nodes = tr.childNodes;
    if (counter === 0) randomColor(nodes, 'red');
    else randomColor(nodes, null);
    tbody.appendChild(tr);
    counter += 1;
  }
  table.appendChild(tbody);
};
const fetchData = async () => {
  const data = await fetch('./data.json');
  const dataJson = await data.text();
  datum = JSON.parse(dataJson);
  const fistelement = datum[0];
  insertAttributes(table, fistelement);
  datum.sort(compareByName);
  datum.sort(compareByDepartment);
  // localStorage.setItem('data', JSON.stringify(datum));
  insertData(table, datum.slice(0, elementToDisplay));
  container.appendChild(table);
  document.body.appendChild(container);
};

const addButtonPagination = () => {
  const button = document.createElement('button');
  const btn = document.createElement('button');
  button.classList.add('btn');
  btn.classList.add('btn');
  button.title = 'Next';
  btn.title = 'Previous';
  button.id = 'button';
  button.textContent = '>>';
  btn.textContent = '<<';
  button.addEventListener('click', () => {
    const next = elementToDisplay + 10;
    if (next <= Math.round(datum.length / 10) * 10) {
      const nextElement = datum.slice(elementToDisplay, next);
      elementToDisplay += 10;
      table.innerHTML = '';
      insertAttributes(table, datum[0]);
      insertData(table, nextElement);
    }
  });
  btn.addEventListener('click', () => {
    const previous = elementToDisplay - 10;
    if (previous >= 0) {
      const previousElement = datum.slice(previous, elementToDisplay);
      elementToDisplay -= 10;
      table.innerHTML = '';
      insertAttributes(table, datum[0]);
      insertData(table, previousElement);
    }
  });
  container.appendChild(btn);
  container.appendChild(button);
};

fetchData();
addButtonPagination();