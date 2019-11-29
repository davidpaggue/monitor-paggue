const fetch = require("node-fetch");

module.exports= (status, url)=>{
    const WebHookURL = 'https://hooks.slack.com/services/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'; // WEBHOOK URL SLACK

    let msg = {
            'username': 'Notificaçåo de status do servidor',
            'text': 'Notificaçåo de erro do servidor! ' + 'status: ' + status + ' ' + 'url: ' + url
        };
        msg = JSON.stringify(msg);
        
    fetch(WebHookURL, {
        method: 'POST',
        body: msg
    })
    .then(res=>{
        if (res.status == 200) {
            console.log('Status enviado')
        }
        }
    )
  }