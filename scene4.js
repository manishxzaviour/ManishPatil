export class Scene4{
	constructor(sceneWrapper){
		this.sceneWrapper=sceneWrapper;
		
		this.bg=new Image();
		this.border=new Image();
		this.scrollBarImg=new Image();
		this.scrollButtonImg=new Image();
		this.textureD=new Image();
		this.textureL=new Image();
		this.textureLCrack=new Image();
		this.selectorImg=[];
		this.buttonsImg=[];
		this.selectors=[];
		this.buttons=[];
		this.headdingWrapper=new Image();
		
		for(let x=1;x<=9;x++){
			this.selectorImg.push(new Image());
			this.selectorImg[x-1].src='./res/scene4/ui/selectors/'+x+'.png';
		}
		for(let x=1;x<=8;x++){
			this.buttonsImg.push(new Image());
			this.buttonsImg[x-1].src='./res/scene4/ui/buttons/'+x+'.png';
		}

		this.bg.src='./res/scene4/bg.png';
		this.border.src='./res/scene4/border.png';
		this.scrollBarImg.src='./res/scene4/ui/scroll/scrollBar.png';
		this.scrollButtonImg.src='./res/scene4/ui/scroll/button.png';
		this.textureD.src='./res/scene4/textureD.png';
		this.textureL.src='./res/scene4/textureL.png';
		this.textureLCrack.src='./res/scene4/textureLCrack.png';
		this.headdingWrapper.src='./res/scene4/ui/headdingWrapper.png';
		
		this.scrollBar=[];
		this.scrollPos=[];

		this.init=this.init.bind(this);
	}
	initSelectors(){

		//left side ui selectors
		this.selectorWrapper=document.createElement('div');
		this.selectorWrapper.setAttribute('class','uiWrapper');
		this.selectorWrapper.style.width='10%';
		this.selectorWrapper.style.height='100%';
		this.selectorWrapper.style.display='flex';
		this.selectorWrapper.style.flexDirection='column';
		this.selectorWrapper.style.justifyContent='space-between';
		
		this.selectorImg.forEach(function(val){
			this.selectors.push(document.createElement('button'));
			this.selectors[this.selectors.length-1].style.backgroundImage='url(\''+val.src+'\')';
			this.selectors[this.selectors.length-1].setAttribute('class', 'uiButton selector');
			this.selectors[this.selectors.length-1].setAttribute('type', 'button');
			this.selectors[this.selectors.length-1].style.order=this.selectors.length;
		}.bind(this));
		
		this.selectors.forEach(function(val){
			this.selectorWrapper.append(val);
		}.bind(this));
	}
	initButtons(){

		//ceneter ui buttons
		this.buttonWrapper=document.createElement('div');
		this.buttonsImg.forEach(function(val){
			this.buttons.push(document.createElement('button'));
			this.buttons[this.buttons.length-1].style.backgroundImage='url(\''+val.src+'\')';
			this.buttons[this.buttons.length-1].setAttribute('class', 'uiButton button');
			this.buttons[this.buttons.length-1].setAttribute('type', 'button');
			this.buttons[this.buttons.length-1].style.order=this.buttons.length;
		}.bind(this));
		
		this.buttonsVertical=document.createElement('div');
		this.buttonsVertical.style.justifyContent='space-between';
		this.buttonsVertical.append(this.buttons[1]);
		this.buttonsVertical.append(this.buttons[2]);
		this.buttonsVertical.append(this.buttons[0]);
		this.buttonsVertical.setAttribute('class','buttonsContainer');
		this.buttonsVertical.style.order=2;
			
		this.buttonsLeft=document.createElement('div');
		this.buttonsLeft.append(this.buttons[5]);
		this.buttonsLeft.append(this.buttons[6]);
		this.buttonsLeft.style.justifyContent='flex-end';
		this.buttonsLeft.setAttribute('class','buttonsContainer');
		this.buttonsLeft.style.order=1;
		
		this.buttonsRight=document.createElement('div');
		this.buttonsRight.style.justifyContent='flex-end';
		this.buttonsRight.append(this.buttons[3]);
		this.buttonsRight.append(this.buttons[4]);
		this.buttonsRight.setAttribute('class','buttonsContainer');
		this.buttonsRight.style.order=3;
		
		this.buttonWrapper.style.height='30%';	
		this.buttonWrapper.style.width='50%';
		this.buttonWrapper.style.display='flex';
		this.buttonWrapper.style.flexDirection='row';
		this.buttonWrapper.style.justifyContent='space-between';
		this.buttonWrapper.setAttribute('class','uiWrapper');
		this.buttonWrapper.append(this.buttonsRight);
		this.buttonWrapper.append(this.buttonsLeft);
		this.buttonWrapper.append(this.buttonsVertical);
	}
	initScrollBar(){
			
			this.scrollBar.push(document.createElement('div'));
			let scrollButton=document.createElement('button');
			this.scrollBar[this.scrollBar.length-1].style.backgroundImage='url(\''+this.scrollBarImg.src+'\')';
			scrollButton.style.backgroundImage='url(\''+this.scrollButtonImg.src+'\')';
			scrollButton.style.aspectRatio=1;
			scrollButton.style.width='50%';
			this.scrollBar[this.scrollBar.length-1].style.width='10%';
			this.scrollBar[this.scrollBar.length-1].style.height='100%';
			this.scrollBar[this.scrollBar.length-1].style.position='absolute';
			scrollButton.style.position='absolute';
			scrollButton.style.left='25%';
			scrollButton.style.top='5%';
			scrollButton.style.zIndex=Number(this.scrollBar[this.scrollBar.length-1].style.zIndex)+1;
			this.scrollBar[this.scrollBar.length-1].style.backgroundRepeat='no-repeat';
			this.scrollBar[this.scrollBar.length-1].style.backgroundSize='100% 100%';
			this.scrollBar[this.scrollBar.length-1].style.backgroundColor='transparent';
			this.scrollBar[this.scrollBar.length-1].append(scrollButton);
			scrollButton.setAttribute('type','button');
			scrollButton.setAttribute('class','uiButton');
			let pos=[0,0,0];
			//drag scrollSlider
			scrollButton.onmousedown=function(e){
				pos[1]=e.clientY;
				document.onmousemove=function(p){
					pos[2]=
						100*(-this.scrollBar[this.scrollBar.length-1].clientTop+scrollButton.offsetTop)
						/this.scrollBar[this.scrollBar.length-1].clientHeight;
					// margin from top bottom 5%
					scrollButton.style.top=(pos[2]>=5&&pos[2]<=85)?pos[2]:((pos[2]>85)?85:5)+'%';
					//current-prev mousePos
					pos[0]=p.clientY-pos[1];
					pos[1]=p.clientY;
					//set path height with top offset
					let scroll=scrollButton.offsetTop-this.scrollBar[this.scrollBar.length-1].clientTop+pos[0];
					scrollButton.style.top=scroll+'px';
				}.bind(this);
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;
				}
			}.bind(this);
			this.scrollPos.push(pos);
	}
	init(){
	}
}
