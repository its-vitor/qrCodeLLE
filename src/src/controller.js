function controller(evt) {
    return new Promise((resolve, reject) => {
        var file = evt.target.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            var data = new Uint8Array(e.target.result);
            var arr = new Array();
            for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var ids;
            if (file.name.endsWith('.xlsx')) {
                ids = readFile(bstr);
            } else if (file.name.endsWith('.txt')) {
                ids = readTxt(bstr);
            }
            resolve(ids);
        };
        reader.readAsArrayBuffer(file);
    });
}

function genUrl(id) {
    return `https://lleferragens.com.br/produto/${id}/CodeByJoaoVitorDesdobra`
}

async function getProductName(id) {
    const response = await fetch(
        `https://api.grupolle.com.br/v1/produtos/${id}/precos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filtros: {}
        }),
    });

    if (!response.ok) {
        console.error('Error', response.statusText);
        return;
    }

    return (await response.json()).descComp;
}

async function genCode(id) {
    const url = genUrl(id);
    const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`);
    const qrCodeUrl = response.url;

    const img = document.createElement('img');
    img.src = qrCodeUrl;
    img.alt = `QR Code for ${id}`;

    return img.outerHTML;
}
