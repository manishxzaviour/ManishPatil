
import {Scene1} from "./scene1.js";
import {Scene2} from "./scene2.js";
import {Scene3} from "./scene3.js";

let sceneWrapper=document.querySelector('#sceneWrapper');
sceneWrapper.width=window.innerWidth*devicePixelRatio;
sceneWrapper.height=window.innerHeight*devicePixelRatio;
let scene1=new Scene1(sceneWrapper);
let scene2=new Scene2(sceneWrapper);
let scene3=new Scene3(sceneWrapper);
let flags=[true,true];
function sceneScheduler(){
	if(scene1.done && flags[0]){
		flags[0]=false;
		setTimeout(scene2.init,300);
	}
	if(scene2.done && flags[1]){
		flags[1]=false;
		setTimeout(scene3.init,500);
	}
	setTimeout(sceneScheduler,100)
}
sceneScheduler();
