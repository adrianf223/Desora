console.log('pornim tabel-alarme.js');
$("tabel-alarme").tabulator({
    height: 205, 
    // responsiveLayout: true,
    // layout: "fitDataFill",
    selectable: 1,
    selectablePersistence: false, // disable rolling selection
    columns: [ //Define Table Columns
        {
            title: "Name",
            field: "nume",
            editor: "input"
        },
        {
            title: "Ora",
            field: "ore",
            editor: "input",
            validator: ["min:0", "max:24"]
        },
        {
            title: "Minute",
            field: "minute",
            editor: "input",
            validator: ["min:0", "max:59"]
        },
        {
            title: "Secunde",
            field: "secunde",
            editor: "input",
            validator: ["min:0", "max:59"]
        },
    ],
    // rowClick:function(e, row){ //trigger an alert message when the row is clicked
    //     alert("Row " + row.getData().id + " Clicked!!!!");
    // },
    cellEdited: function (modificare) {
        // var id = cell.getRow().getCell(0).getValue();
        console.log(modificare);
        // console.log(modificare.cell.value);
        // console.log(modificare.cell.column.field);
        // console.log(modificare.cell.row.data.id);                
        $("#select-stats span").text(modificare.length);
        

        var id = modificare.cell.row.data.id;
        var coloana = modificare.cell.column.field;
        var valoare = modificare.cell.value;

        alert("Ai modificat id:" + id + " in coloana:" + coloana + " cu valoare:" + valoare);
    },
    rowSelectionChanged: function (data, rows) {
        $("#select-stats span").text(data.length);
        var selectedData = $("tabel-alarme").tabulator("getSelectedData"); //get array of currently selected data.
        console.log(selectedData);

        if (selectedData.length >0) {
            var ore = selectedData[0].ore;
            var minute = selectedData[0].minute;
            var secunde = selectedData[0].secunde;
            console.log(ore + ":" + minute + ":" + secunde);
        }
    }
});

var tabledata = 'http://www.desora.ro/alarme-data';

console.log(tabledata);
//load sample data into the table
$("tabel-alarme").tabulator("setData", tabledata);

