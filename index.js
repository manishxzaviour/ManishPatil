let scene=document.getElementById("scene");
let body=document.getElementById("body");
let sky=document.getElementById("sky");
let skyContext=sky.getContext("2d");
let ground=document.getElementById("ground");
let groundContext=ground.getContext("2d");
let meteor=document.getElementById("meteor");
let meteorContext=meteor.getContext("2d");
let grd = skyContext.createRadialGradient(sky.width-sky.width*0.01, sky.height/2, 5,sky.width-sky.width*0.01, sky.height/2, sky.width*0.75);
grd.addColorStop(0, "teal");
grd.addColorStop(1, "midnightblue");

let robotHead=document.createElement("img");
let robotTorso=document.createElement("img");
let robotLeftA=document.createElement("img");
let robotRightA=document.createElement("img");
let robotLeftL=document.createElement("img");
let robotRightL=document.createElement("img");

function DrawGfeatures(){
  groundContext.beginPath();
  let planeH=ground.height;
  let planeW=ground.width;
  let w=planeW/4/30;
  let h=planeH/30;
  //ground texture
  for(let x= 0; x<planeW/4;x=x+w){
    for(let y=planeH/25;y<planeH;y=y+h){
      let colorF=Math.random().toFixed(1);
      groundContext.fillStyle=`rgb(${100*colorF},${200*colorF},${100*colorF})`
      groundContext.fillRect(x,y,w,h);
      groundContext.fillRect(planeW/4+x,y,w,h);
      groundContext.fillRect(planeW/2+x,y,w,h);
      groundContext.fillRect(planeW*0.75+x,y,w,h);
    }
  }
  // tower features
  for(let x=0;x<=planeW;x=x+0.01*planeW)
    {
      if(Math.random().toFixed(2)*100>40){
        groundContext.fillStyle=grd;
        groundContext.fillRect(x,planeH/25,w*3,h*3*Math.random().toFixed(1));
      }
      if(Math.random().toFixed(2)*100>30){
        groundContext.fillStyle=grd;
        groundContext.fillRect(x,planeH/25,w*1.5,h*2*Math.random().toFixed(1));
      }
    }
  groundContext.fillStyle=grd;
  groundContext.fillRect(0,0,planeW,planeH/25)
  groundContext.stroke();
}
function DrawSfeatures(){
  skyContext.beginPath();
  skyContext.shadowOffsetY=1;
  skyContext.shadowOffsetX=-1;
  skyContext.shadowColor="snow"
  skyContext.fillStyle=grd;
  skyContext.fillRect(0,0,sky.width,sky.height);
  for(let x=20;x<=sky.width-20;x=x+sky.width/10)
  {
      let a=Math.random().toFixed(2)*100+10;
      for(let y=a;y<=a+sky.height/40;y=y+sky.height/40){
        skyContext.fillStyle="ivory";
        skyContext.fillRect(x,y,sky.width/200,sky.height/400);
      }
      let b=Math.random().toFixed(2)*100+50;
      if(Math.random().toFixed(2)*100>60){
        skyContext.fillStyle="slategray";
        skyContext.fillRect(x+sky.width/20,Math.random().toFixed(2)*100+30,sky.width/20,sky.height/20);
      }
  }
  //moon
  skyContext.fillStyle="whitesmoke";
  skyContext.fillRect(sky.width-sky.width/10,0,sky.width,sky.height/4);
  skyContext.fillStyle="snow";
  skyContext.fillRect(sky.width-sky.width/10/1.3,5,sky.width,sky.height/4-10);
  skyContext.stroke();
}
function Drawmeteor(){
  meteor.style.transition="4s ease-in";
  meteor.style.height="6vmin";
  meteor.style.width="6vmin";
  meteor.style.top=`70vh`;
  meteor.style.left=`40vw`;
  const timeout=setTimeout(DrawmeteorBox,4000);
}
function DrawmeteorBox(){
  meteor.style.transition="0.2s ease-in";
  meteor.style.height="15vmin";
  meteor.style.width="15vmin";
  meteorContext.beginPath();
  for(let x= 0;x<meteor.width/2;x=x+0.1*meteor.width){
    for(let y=0;y<meteor.height/2;y=y+0.1*meteor.height){
      meteorContext.fillStyle=`rgb(${Math.random().toFixed(1)*255},0,0)`;
      meteorContext.fillRect(x,y,0.1*meteor.width,0.1*meteor.height);
      meteorContext.fillRect(meteor.width-x,y,-0.1*meteor.width,0.1*meteor.height);
      meteorContext.fillRect(x,meteor.height-y,0.1*meteor.width,-0.1*meteor.height);
      meteorContext.fillRect(meteor.width-x,meteor.height-y,-0.1*meteor.width,-0.1*meteor.height);
    }
  }
  meteorContext.stroke();
  meteor.style.top=`70vh`;
  meteor.style.left=`40vw`;
  meteor.style.animation="meteor 0.2s infinite";
  meteor.onclick= DrawRobot;
}
function DrawRobot(){
  robotHead.setAttribute("src","./robotHead.png");
  robotTorso.setAttribute("src","./robotTorso.png");
  robotLeftA.setAttribute("src","./robotLeftA.png");
  robotRightA.setAttribute("src","./robotRightA.png");
  robotLeftL.setAttribute("src","./robotLeftL.png");
  robotRightL.setAttribute("src","./robotRightL.png");
  
  
  robotHead.setAttribute("class","robot");
  robotTorso.setAttribute("class","robot");
  robotLeftA.setAttribute("class","robot");
  robotRightA.setAttribute("class","robot");
  robotLeftL.setAttribute("class","robot");
  robotRightL.setAttribute("class","robot");
  
  robotHead.style.zIndex="102";
  robotTorso.style.zIndex="103";
  robotLeftL.style.zIndex="105";
  robotRightL.style.zIndex="101";
  robotLeftA.style.zIndex="104";
  robotRightA.style.zIndex="100";
  
  robotHead.style.animation="robotAnim 1.5s ease-In";
  robotTorso.style.animation="robotAnim 1s ease-In";
  robotLeftL.style.animation="robotAnim 2.5s ease-In";
  robotRightL.style.animation="robotAnim 1.5s ease-In";
  robotLeftA.style.animation="robotAnim 2.5s ease-In";
  robotRightA.style.animation="robotAnim 1.5s ease-In";
  
  meteor.style.height="7vh";
  meteor.style.width="7vw";
  meteor.onclick=function(){};
    
  scene.append(robotHead);
  scene.append(robotTorso);
  scene.append(robotRightA);
  scene.append(robotLeftA);
  scene.append(robotRightL);
  scene.append(robotLeftL);
  
  setTimeout(function() {
    robotLeftA.style.transition="2s";
    robotLeftA.style.transform="rotate(-60deg)";
    robotLeftA.style.translate=" 25vmin 2vmin";
    robotLeftA.style.filter="drop-shadow(1px 1px 5px whitesmoke)";
    setTimeout(SelectionMenu, 2100);
  }, 3000);
  
}
function SelectionMenu(){
  
  let menuWrapper= document.createElement("ul");
  menuWrapper.setAttribute("id","menuWrapper");
  
  let opt1Alt="aaaaaaaa";
  let opt2Alt="aaaaaaaa";
  let opt3Alt="aaaaaaaa";
  let opt4Alt="aaaaaaaa";
  let opt5Alt="aaaaaaaa";
  let opt6Alt="aaaaaaaa";
  
  let opt1=document.createElement("li");
  let opt2=document.createElement("li");
  let opt3=document.createElement("li");
  let opt4=document.createElement("li");
  let opt5=document.createElement("li");
  let opt6=document.createElement("li");
  
  
  opt1.setAttribute("class","opt");
  opt2.setAttribute("class","opt");
  opt3.setAttribute("class","opt");
  opt4.setAttribute("class","opt");
  opt5.setAttribute("class","opt");
  opt6.setAttribute("class","opt");
  
  opt1.append(opt1Alt);
  opt2.append(opt2Alt);
  opt3.append(opt3Alt);
  opt4.append(opt4Alt);
  opt5.append(opt5Alt);
  opt6.append(opt6Alt);
  
  menuWrapper.append(opt1);
  menuWrapper.append(opt2);
  menuWrapper.append(opt3);
  menuWrapper.append(opt4);
  menuWrapper.append(opt5);
  menuWrapper.append(opt6);
  scene.append(menuWrapper);
}
DrawGfeatures();
DrawSfeatures();
const metoreDraw=setTimeout(Drawmeteor,500);
// DrawRobot();
// SelectionMenu();


