function readFile(excel) {
    const wb = XLSX.read(excel, { type: "binary" });
    const excelValues = []; const column = wb.Sheets[wb.SheetNames[0]];

    for (let c in column) {
        if (c[0] === 'A' && c !== 'A1') {
            excelValues.push(column[c].v);
        }
    }

    console.log(excelValues); return excelValues;
}
