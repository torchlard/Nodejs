const action = document.getElementById("action");
const drawer = document.getElementById("drawer");
const drawer_toggle = document.getElementById("drawer_toggle");
const search = document.getElementById("search");
const search_txt = document.getElementsByName("search_txt")[0];
const current_tab = document.getElementById("current_tab");
const body = document.getElementsByTagName("BODY")[0];
const hero_containers = document.getElementsByClassName("hero_container");

window.addEventListener("touchstart", panstart, {passive:true});
window.addEventListener("touchmove", panmove, {passive:true});
window.addEventListener("touchend", panend, {passive:true});
drawer_toggle.addEventListener("click", toggleDrawer);
search.addEventListener("click", startSearch);
// search_txt.addEventListener("onkeydown", filterHeros());

let count, startX, startY, lastX, lastY, direction_list, transition=-300;
let move_indicator = 0, brightness = 95, drawer_width=300;
function panstart(event){

  drawer.style.transition = '';

  let touches = event.changedTouches;
  posX_list=[]; posY_list=[]; direction_list=[];

  // log('start');
  for (i of touches){
    // log('start pos: '+ i.pageX);
    startX = i.pageX; lastX = i.pageX;
    startY = i.pageY; lastY = i.pageY;
  }
  move_indicator = 0;
}

function panmove(event){

  move_indicator = 1;
  let touches = event.changedTouches;
  // console.log(startX);
  // log('move');

  for(i of touches){
    // decide which direction
    let direction = -1;
    diffX = i.pageX - lastX;
    diffY = i.pageY - lastY;
    if ( (Math.abs(diffX) > Math.abs(diffY)) && Math.abs(diffX)>5 ){
      lastX = i.pageX;  lastY = i.pageY;
      if (diffX > 0){ //right
        if (startX < 25 && transition <= 0){
          direction = 1;
          transition += diffX;
          brightness = 95 - (drawer_width + transition)/drawer_width*50;
          drawer.style.transform = 'translate('+transition+'px)';
          // body.style.backgroundColor = 'hsl(244, 48%, '+brightness+'%)';
        }
      } else if(diffX < 0) { //left
        direction = 3;
        transition += diffX;
        brightness = 95 - (drawer_width + transition)/drawer_width*50;
        drawer.style.transform = 'translate('+transition+'px)';
        // body.style.backgroundColor = 'hsl(244, 48%, '+brightness+'%)';
      }
      console.log(brightness +" "+ transition);
    }

    // show pan or append direction
    // len = direction_list.length;
    // if (len == 0) {
    //   direction_list.push(direction);
    // } else if (direction_list[len-1] != direction){
    //   direction_list = [];
    //   direction_list.push(direction);
    // } else {
    //   if (len >= 10){
    //     changeTxt(direction);
    //     direction_list = [];
    //     direction_list.push(direction);
    //   } else {
    //     direction_list.push(direction);
    //   }
    // }


    // log(direction_list);
  }

}

function panend(event){
  // log('end');
  if (move_indicator == 0){
    transition = -drawer_width; brightness=95;
    drawer.style.transform = 'translate('+transition+'px)';
    // body.style.backgroundColor = 'hsl(244, 48%, 95%)';
    drawer.style.transition = 'all 0.5s';
  } else if (transition < -drawer_width/2){
    transition = -drawer_width; brightness=95;
    drawer.style.transform = 'translate('+transition+'px)';
    // body.style.backgroundColor = 'hsl(244, 48%, 95%)';
    drawer.style.transition = 'all 0.2s';
  } else {
    transition = 0; brightness=45;
    drawer.style.transform = 'translate('+transition+'px)';
    // body.style.backgroundColor = 'hsl(244, 48%, 45%)';
    drawer.style.transition = 'all 0.2s';
  }
}

function changeTxt(direc){
  switch (direc) {
    case 1:
      // action.innerHTML = "right";
      drawer.style.visibility = 'visible';
      break;
    case 3:
      // action.innerHTML = "left";
      drawer.style.visibility = 'hidden';
      break;
    default:
      action.innerHTML = "No Action";
  }
}

function log(msg){
  let p = document.getElementById('log');
  p.innerHTML = msg + "\n" + p.innerHTML;
}

function toggleDrawer(event){
  if (drawer.style.transform == 'translate(-300px)'){
    transition = 0;
    drawer.style.transform = 'translate(0px)';
  }
}

function startSearch(event){
  drawer_toggle.setAttribute("src","./icon/arrow-left.svg");
  drawer_toggle.removeEventListener("click", toggleDrawer);
  drawer_toggle.addEventListener("click", endSearch);
  current_tab.style.display = 'none';
  search_txt.style.display = 'initial';
  search_txt.focus();
}

function endSearch(event){
  drawer_toggle.setAttribute("src","./icon/bars.svg");
  drawer_toggle.removeEventListener("click", endSearch);
  drawer_toggle.addEventListener("click", toggleDrawer);
  current_tab.style.display = 'initial';
  search_txt.style.display = 'none';
  search_txt.value = '';
  
  drawer.style.transition = 'all 0.5s';
  for (i of hero_containers){
    i.style.display = 'initial';
  }
}

// if('serviceWorker' in navigator){
//   navigator.serviceWorker
//     .register('./service-worker.js')
//     .then(() => console.log('service worker registered'));
// }

function getEqual(data, target){
  let len = data.length;
  if (len==0) return true;
  for(let j=0; j<=target.length-len; j++){
    if( target.substring(j, j+len).toLowerCase() === data.toLowerCase()){
      return true;
    }
  }
  return false;
}

function filterHeros(data){
  for(i of hero_containers){
    let name = i.children[1].innerHTML;
    if (getEqual(data, name)){
      i.style.display = 'initial';
    } else {
      i.style.display = 'none';
    }
  }
}



