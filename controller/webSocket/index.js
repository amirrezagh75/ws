let webSocket = ()=>{

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

//* binance data
const BinanceWS = new WebSocket('wss://stream.binance.com:9443/ws/BTCUSDT@aggTrade');

BinanceWS.on('open', function open() {
  console.log('binance connected');
  BinanceWS.send(
    `{
    "method": "SUBSCRIBE",
    "params": [
      "btcusdt@aggTrade"
    ],
    "id": 1
  }`
);
})

BinanceWS.on('close', function close() {
  console.log('binance disconnected');
});

BinanceWS.on('error', (err)=>{
  console.error(`connecting to binance error: ${err}`)
})

// * webSocket server listner
wss.on('connection', connection=(client)=> {
  let ProductPrice = 26618
    BinanceWS.on('message', incoming =(BinanceMessage)=> {
    client.send(BinanceMessage ? calcPrice(BinanceMessage , ProductPrice ) : '');
  });

  let timer = setInterval(()=>{
      ProductPrice  += 100
      console.log(ProductPrice)

    }, 10000);


    client.on('close' , ()=>{
        console.log('bye bye client!')
        clearInterval(timer)
        BinanceWS.close()
    })


});

wss.on('error',err=>{
  console.error(`client connection error: ${err}`)
})

let calcPrice = (crypto,pPrice)=>{
  return parseInt(JSON.parse(crypto).p).toFixed(3)*pPrice
}


}

module.exports = {
    webSocket
}
