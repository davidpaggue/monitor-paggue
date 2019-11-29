const https = require('https');

const msg = 'Esta menssagen vai aparecer se caso o servidor da paggue estiver com problemas'

const yourWebHookURL = 'https://hooks.slack.com/services/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'; // PUT YOUR WEBHOOK URL HERE
const userAccountNotification = {
  'username': 'Notificaçåo de erro no servidor Paggue', // This will appear as user name who posts the message
  'text': msg, // text
};

/**
 * Handles the actual sending request. 
 * We're turning the https.request into a promise here for convenience
 * @param webhookURL
 * @param messageBody
 * @return {Promise}
 */
function sendSlackMessage (webhookURL, messageBody) {
  // transformando a mensagem em JSON
  try {
    messageBody = JSON.stringify(messageBody);
  } catch (e) {
    throw new Error('Failed to stringify messageBody', e);
  }
  return new Promise((resolve, reject) => {
    //Definindo metodo
    const requestOptions = {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      }
    };

    // actual request
    const req = https.request(webhookURL, requestOptions, (res) => {
      let response = '';
      res.on('data', (d) => {
        response += d;
      });

      // response finished, resolve the promise with data
      res.on('end', () => {
        resolve(response);
      })
    });

    // there was an error, reject the promise
    req.on('error', (e) => {
      reject(e);
    });

    // send our message body (was parsed to JSON beforehand)
    req.write(messageBody);
    req.end();
  });
}

// main
(async function () {
  if (!yourWebHookURL) {
    console.error('Please fill in your Webhook URL');
  }
  console.log('Sending slack message');
  try {
    const slackResponse = await sendSlackMessage(yourWebHookURL, userAccountNotification);
    console.log('Message response', slackResponse);
  } catch (e) {
    console.error('There was a error with the request', e);
  }
})();