const http = require('https');
const avisar = require('./Report')

module.exports= (url)=>{
    var url = url;

    http.get(url, (res)=>{
    var status = res.statusCode
    if (status == 200) {
        console.log("Tudo certo, aguardar a nova checagem...");
        
    }
    if (status!== 200) {
        console.log("Foi detectado um erro no servidor...");
        console.log("Reportando erro no Slack");
        avisar(status, url)
    }
})
}

