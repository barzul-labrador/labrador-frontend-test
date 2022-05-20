# labrador-frontend-test

You have json file "data.json" in parameter. The goal of this exercises is to create a table from it, add stylization and add some functionalities on it.
First, create for this project.
Add the end, create a pull request.


First exercise : create a table from the json (in vanillaJs, not manually).

The table as to be well formatted (table, tbody, ...).
Each line of the table is a object from the json.
We need to have a first line in the table, as the head of the table, corresponding to the name of the attribute in the json (name, january, ...)

Second exercise : Add totals

We need 2 new columns : 1 after "march" being the result of the whole quarters (Juanuary-February-March) 
and 1 after "June" being the result of the whole semester


Third exercise : add pyjamas on table

1. The background of the lines of the table has to alternate : red, e5e5e5, red, e5e5e5, ...  
2. The header of the table must not have such a background
3. The last column of the table must not contain a background
4. The first coloured row of the table has always to be red


Fourth exercise : Borders

1. We need a border on top of every line  2px solid black
2. The header must have a border top and bottom 2px dashed blue
3. The cells of the first column has to be surrounded by a border 1px solid green
4. The first line that is not header must be bolded
5. The 2. rule is more prioritary than the 3.



Fifth exercise : add sort

We need this table to be sortable : the first 2 columns (name and department) has to be sortable. The other columns must not be sortable.


Sixth exercise : add pagination on this table.

The table has to render a maximum of 10 elements. A pagination is needed here.