


let latest_follow;
let latest_cheer;
let latest_sub;
let latest_gif;
let latest_tip;
let latest_topgif;
let latest_topbits;
let prueba1;

let elements = $(".elements")
let elementCount = elements.length;
let elementIndex = 0;






$(elements).hide();
window.addEventListener('onWidgetLoad', function (obj) {
   
    let data=obj["detail"]["session"]["data"];
    let recents=obj["detail"]["recents"];
    let currency=obj["detail"]["currency"];
    let channelName=obj["detail"]["channel"]["username"];
    let apiToken=obj["detail"]["channel"]["apiToken"];
    let fieldData=obj["detail"]["fieldData"];
  
///añadir data de  let ////
    latest_follow = data["follower-latest"];
    latest_cheer = data["cheer-latest"];
    latest_sub = data["subscriber-latest"];
    latest_gif = data["subscriber-gifted-latest"];
    latest_tip = data["tip-latest"]; 
    latest_topgif = data["subscriber-alltime-gifter"];
    latest_topbits = data["cheer-alltime-top-donation"];
    prueba1 = data["subscriber-resub-latest"];
    updateDisplay();
    showElement(elementIndex);
});

window.addEventListener('onEventReceived', function (obj) {
    let eventType = obj.detail.listener;
    let data = obj.detail.event;

    switch(eventType){
        case "follower-latest":
            latest_follow = data;
            break;
        case "cheer-latest":
            latest_cheer = data;
            break;
        case "subscriber-latest":
            latest_sub = data;
            break;
        case "subscriber-gifted-latest":
            latest_gif = data;
            break;
         case "tip-latest":
            latest_tip = data;
            break;
      case "subscriber-alltime-gifter":
        latest_topgif = data;
        break;
      case "cheer-alltime-top-donation":
        latest_topbits = data;
        break;
      case "subscriber-new-latest":
        prueba1 = data;
        break;
    }
    updateDisplay();
});
/// div html///
function updateDisplay() {
     /// EDITAR TEXTOS - SIGUE TU INTUICION ///
    $('#latestFollow').text(latest_follow["name"] + " siguió el canal");
    $('#latestCheer').text(latest_cheer["name"] + " envió " + latest_cheer["amount"] + " bits");
    $('#latestSub').text(latest_sub["name"] + " se suscribió " + latest_sub["amount"] + " mes(es)");
    $('#latestGif').text(latest_gif["sender"] + " regaló suscripción a " + latest_sub["name"]); 
    $('#latestTip').text(latest_tip["name"] + " donó $" + latest_tip["amount"]);
    $('#latestTopGif').text("TOP Sub de regalo: " + latest_topgif["name"]);
    $('#latestTopBits').text("TOP Bits: " + latest_topbits["name"]);
    $('#prueba1').text("Re-Suscripción: " + prueba1["name"] + " " + prueba1["amount"]);
}
function showElement(i) {
    $(elements[i])
          .fadeIn(500)
        .delay(5000)
        .fadeOut(500)
        .queue(function () {
            elementIndex = (elementIndex + 1) % elementCount; 
            showElement(elementIndex);
            $(this).dequeue();
        });
}
