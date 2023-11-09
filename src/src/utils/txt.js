function readTxt(data) {
    var l = data.split('\n'); var txtValues = [];

    for (var i = 0; i < l.length; i++) {
        var linha = l[i].trim();
        if (linha.length > 0) {
            txtValues.push(linha);
        }
    }
    console.log(txtValues); return txtValues;
}