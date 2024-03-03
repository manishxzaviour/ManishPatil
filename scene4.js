export class Scene4{
	constructor(sceneWrapper){
		this.sceneWrapper=sceneWrapper;
		
		this.bg=new Image();
		this.border=new Image();
		this.textureD=new Image();
		this.textureM=new Image();
		this.textureL=new Image();
		this.headdingWrapper=new Image();
		this.buttonsImg=[];
		this.buttons=[];
		this.z=Number(this.sceneWrapper.style.zIndex+20);
		
		this.selectorImgUrl='./res/scene4/ui/selectors/';
		this.selectorCallback=[];
		this.selectorAlt=[];

		this.selector=new Selector(this.selectorImgUrl,9);
		for(let x=0;x<this.selector.count;x++){
			this.selectorCallback.push(null);
			this.selectorAlt.push(x+'');
		}

		this.characterImgUrl='./res/scene4/characters/';
		this.characterCallback=[];
		this.characterAlt=[];
		this.character=new Selector(this.characterImgUrl,7);
		for(let x=0;x<this.character.count;x++){
			this.characterCallback.push(null);
			this.characterAlt.push(x+'');
		}

		for(let x=1;x<=8;x++){
			this.buttonsImg.push(new Image());
			this.buttonsImg[x-1].src='./res/scene4/ui/buttons/'+x+'.png';
		}

		this.bg.src='./res/scene4/bg.png';
		this.border.src='./res/scene4/border.png';
		this.textureD.src='./res/scene4/textureD.png';
		this.textureM.src='./res/scene4/textureM.png';
		this.textureL.src='./res/scene4/textureL.png';
		this.headdingWrapper.src='./res/scene4/ui/headdingWrapper.png';
		
		this.init=this.init.bind(this);
		
		this.rightWrapperText='';

<<<<<<< HEAD

		this.sampletext='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Iaculis urna id volutpat lacus laoreet non. Amet facilisis magna etiam tempor orci eu. Dictum fusce ut placerat orci nulla pellentesque dignissim enim. Vitae congue mauris rhoncus aenean vel elit. Enim neque volutpat ac tincidunt. Turpis egestas integer eget aliquet nibh praesent tristique magna sit. Lectus urna duis convallis convallis tellus id interdum velit. Convallis convallis tellus id interdum velit. Condimentum id venenatis a condimentum. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Suspendisse in est ante in nibh mauris cursus.<br>Neque viverra justo nec ultrices dui sapien eget mi. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Morbi quis commodo odio aenean. Lectus urna duis convallis convallis tellus id. Nunc non blandit massa enim. Tempus quam pellentesque nec nam aliquam sem. Dictum sit amet justo donec enim diam. Etiam dignissim diam quis enim lobortis scelerisque fermentum. Imperdiet massa tincidunt nunc pulvinar. Arcu odio ut sem nulla. Aliquam etiam erat velit scelerisque in dictum non consectetur. Vulputate eu scelerisque felis imperdiet proin. Pharetra diam sit amet nisl suscipit. Massa vitae tortor condimentum lacinia quis vel eros. In pellentesque massa placerat duis ultricies. Orci ac auctor augue mauris augue neque.<br>A diam sollicitudin tempor id eu nisl nunc mi ipsum. Vestibulum lorem sed risus ultricies tristique nulla aliquet. Dignissim convallis aenean et tortor at risus. Laoreet id donec ultrices tincidunt. Tincidunt praesent semper feugiat nibh. Etiam non quam lacus suspendisse faucibus interdum posuere lorem. Nec dui nunc mattis enim ut tellus elementum sagittis. Felis bibendum ut tristique et egestas. Ultricies lacus sed turpis tincidunt id. Donec enim diam vulputate ut pharetra sit amet.<br>Nulla at volutpat diam ut venenatis tellus. Nulla aliquet enim tortor at auctor urna. Scelerisque varius morbi enim nunc. Turpis nunc eget lorem dolor sed viverra ipsum. Sit amet cursus sit amet dictum sit. Pretium nibh ipsum consequat nisl vel pretium lectus quam. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Aliquam id diam maecenas ultricies mi eget mauris pharetra et. Venenatis cras sed felis eget velit aliquet sagittis id. Sit amet commodo nulla facilisi nullam vehicula. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Molestie ac feugiat sed lectus vestibulum. Ipsum suspendisse ultrices gravida dictum fusce. Viverra adipiscing at in tellus integer. Id leo in vitae turpis massa sed elementum tempus. Eu sem integer vitae justo eget magna fermentum iaculis.<br>Aliquam sem et tortor consequat id porta nibh venenatis. Sagittis orci a scelerisque purus semper eget duis at. Blandit libero volutpat sed cras ornare arcu dui vivamus. Arcu bibendum at varius vel pharetra. Sit amet matt';
	}
	init(){
		let txt= new TextWrapper(this.sampletext,this.z,true);
		this.sceneWrapper.append(txt.wrapper);
=======
	}
	init(){
		this.initBg();
		this.sceneWrapper.append(this.background);
>>>>>>> tmp
	}
	initBg(){
		this.background=document.createElement('div');
		this.background.setAttribute('class','background');
		this.background.style.backgroundImage='url(\''+this.bg.src+'\')';
		this.background.style.zIndex=20;
		this.background.style.backgroundSize='100% 100%';
		this.background.style.backgroundRepeat='no-repeat';
		this.background.style.display='flex';
		this.background.style.flexDirection='column';
		this.background.style.justifyContent='space-arround';
		
		this.initButtons();
		
		this.vertWrapper=document.createElement('div');
		this.vertWrapper.style.position='relative';
		this.vertWrapper.style.left='1%';
		this.vertWrapper.style.top='14%';
		this.vertWrapper.style.height='70%';
		this.vertWrapper.style.width='98%';
		this.vertWrapper.style.display='flex';
		this.vertWrapper.style.flexDirection='row';
		this.vertWrapper.style.justifyContent='space-arround';
		this.vertWrapper.style.order=1;

		this.leftWrapper=document.createElement('div');
		this.leftWrapper.style.position='relative';
		this.leftWrapper.style.height='100%';
		this.leftWrapper.style.width='25%';
		this.leftWrapper.style.order=2;
		this.leftWrapper.style.display='flex';
		this.leftWrapper.style.flexDirection='column';
		this.leftWrapper.style.justifyContent='space-arround';

		this.leftTop=document.createElement('div');
		this.leftTop.setAttribute('class','textWrapper');
		this.leftTop.style.position='relative';
		this.leftTop.style.top='3%';
		this.leftTop.style.height='60%';
		this.leftTop.style.width='100%';
		this.leftTop.style.order=1;
		this.leftTop.style.borderRadius='3%';
	
		this.leftMiddle=document.createElement('div');
		this.leftMiddle.style.backgroundImage='url(\''+this.textureD.src+'\')';
		this.leftMiddle.style.position='relative';
		this.leftMiddle.style.top='5%';
		this.leftMiddle.style.height='18%';
		this.leftMiddle.style.width='100%';
		this.leftMiddle.style.order=2;	
		this.leftMiddle.style.borderRadius='3%';
		
		this.buttons[0].style.position='relative';
		this.buttons[0].style.top='7%';
		this.buttons[0].style.height='10%';
		this.buttons[0].style.order=3;

		this.leftWrapper.append(this.leftTop);
		this.leftWrapper.append(this.leftMiddle);
		this.leftWrapper.append(this.buttons[0]);
		
		this.rightWrapper=new TextWrapper(this.rightWrapperText,this.z);
		this.rightWrapper.wrapper.style.position='relative';
		this.rightWrapper.wrapper.style.left='1.5%';
		this.rightWrapper.wrapper.style.height='96%';
		this.rightWrapper.wrapper.style.width='73.5%';
		this.rightWrapper.wrapper.style.order=3;	

		this.vertWrapper.append(this.leftWrapper);
		this.vertWrapper.append(this.rightWrapper.wrapper);
		this.background.append(this.vertWrapper);

		
		this.buttonWrapper.style.height='13.5%';
		this.buttonWrapper.style.width='98%';
		this.buttonWrapper.style.position='relative';
		this.buttonWrapper.style.top='12%';
		this.buttonWrapper.style.left='1%';
		this.buttonWrapper.style.order=2;
		this.background.append(this.buttonWrapper);
<<<<<<< HEAD
=======
	
>>>>>>> tmp
	}

	initButtons(){
		 //center ui buttons
		this.buttonWrapper=document.createElement('div');
		this.buttonsImg.forEach(function(val){
			this.buttons.push(document.createElement('button'));
			this.buttons[this.buttons.length-1].style.backgroundImage='url(\''+val.src+'\')';
			this.buttons[this.buttons.length-1].setAttribute('class', 'uiButton button');
			this.buttons[this.buttons.length-1].setAttribute('type', 'button');
			this.buttons[this.buttons.length-1].style.order=this.buttons.length;
		}.bind(this));
		
		this.buttonsVertical=document.createElement('div');
		this.buttonsVertical.style.justifyContent='flex-end';
		this.buttonsVertical.append(this.buttons[1]);
		this.buttonsVertical.append(this.buttons[2]);
		this.buttonsVertical.setAttribute('class','buttonsContainer');
		this.buttonsVertical.style.order=2;
			
		this.buttonsLeft=document.createElement('div');
		this.buttonsLeft.append(this.buttons[5]);
		this.buttonsLeft.append(this.buttons[6]);
		this.buttonsLeft.style.justifyContent='flex-end';
		this.buttonsLeft.style.marginRight='10%';
		this.buttonsLeft.setAttribute('class','buttonsContainer');
		this.buttonsLeft.style.order=1;
		
		this.buttonsRight=document.createElement('div');
		this.buttonsRight.style.justifyContent='flex-end';
		this.buttonsRight.style.marginLeft='10%';
		this.buttonsRight.append(this.buttons[3]);
		this.buttonsRight.append(this.buttons[4]);
		this.buttonsRight.setAttribute('class','buttonsContainer');
		this.buttonsRight.style.order=3;
		
		this.buttonWrapper.style.height='10%';	
		this.buttonWrapper.style.width='100%';
		this.buttonWrapper.style.display='flex';
		this.buttonWrapper.style.flexDirection='row';
		this.buttonWrapper.style.justifyContent='space-arround';
		this.buttonWrapper.setAttribute('class','uiWrapper');
		this.buttonWrapper.append(this.buttonsRight);
		this.buttonWrapper.append(this.buttonsLeft);
		this.buttonWrapper.append(this.buttonsVertical);
	}
} 
class Selector{
	constructor(url,count){
		this.textureL=new Image();
		this.selectorImg=[];
		this.selectors=[];
		this.count=count;
		for(let x=0;x<this.count;x++){
			this.selectorImg.push(new Image());
			this.selectorImg[x].src=url+(x+1)+'.png';
		}
		this.textureL.src='./res/scene4/textureL.png';
	}
	init(callback,alt,z){
		//left side ui selectors
		this.wrapper=document.createElement('div');
		this.wrapper.setAttribute('class','uiWrapper');
		this.wrapper.style.width='100%';
		this.wrapper.style.height='100%';
		this.wrapper.style.display='flex';
		this.wrapper.style.flexDirection='column';
		this.wrapper.style.justifyContent='space-between';
		this.wrapper.style.backgroundImage='url(\''+this.textureL.src+'\')';
		this.wrapper.style.border='medium inset rgba(250,180,50,0.5)';
		this.callback=callback;
		this.selectorImg.forEach(function(val){
			this.selectors.push(document.createElement('div'));
			this.selectors[this.selectors.length-1].setAttribute('class', 'uiButton selector');
			this.selectors[this.selectors.length-1].append(document.createElement('button'));
			this.selectors[this.selectors.length-1].style.order=this.selectors.length;
			this.selectors[this.selectors.length-1].firstChild.style.backgroundImage='url(\''+val.src+'\')';
			this.selectors[this.selectors.length-1].firstChild.style.height='100%';
			this.selectors[this.selectors.length-1].firstChild.style.position='fixed';
			this.selectors[this.selectors.length-1].firstChild.setAttribute('class', 'uiButton');
			this.selectors[this.selectors.length-1].firstChild.setAttribute('type', 'button');	
			this.selectors[this.selectors.length-1].firstChild.onmouseover=this.mouseover;
			this.selectors[this.selectors.length-1].firstChild.onmouseout=this.mouseout;
			this.selectors[this.selectors.length-1].firstChild.onclick=callback[this.selectors.length-1];
			this.selectors[this.selectors.length-1].append(document.createElement('div'));
			this.selectors[this.selectors.length-1].lastChild.style.position='fixed';
			this.selectors[this.selectors.length-1].lastChild.style.zIndex=z+1;
			this.selectors[this.selectors.length-1].lastChild.style.display='none';
			this.selectors[this.selectors.length-1].lastChild.innerHTML=alt[this.selectors.length-1];	
		}.bind(this));
		
		this.selectors.forEach(function(val){
			this.wrapper.append(val);
		}.bind(this));
	}
	mouseover(e){
		this.currentMouseFocus=e;
		e.target.parentNode.lastChild.style.display='block';
		document.onmousemove=function(e){
			this.currentMouseFocus.target.parentNode.lastChild.style.top=
				e.clientY-this.currentMouseFocus.target.parentNode.firstChild.getBoundingClientRect().top+'px';
			this.currentMouseFocus.target.parentNode.lastChild.style.left=
				e.clientX-this.currentMouseFocus.target.parentNode.firstChild.getBoundingClientRect().left+'px';
		}.bind(this);
	}
	mouseout(e){
		this.currentMouseFocus=null;
		e.target.parentNode.lastChild.style.display='none';
		document.onmousemove=null;
	}
}
class ScrollBar{
	constructor(block,z){
		this.scrollBarImg=new Image();
		this.scrollButtonImg=new Image();
		this.scrollBarImg.src='./res/scene4/ui/scroll/scrollBar.png';
		this.scrollButtonImg.src='./res/scene4/ui/scroll/button.png';
		this.scrollPos=[0,0,0];
		this.scrollTo=0;
		this.z=z;
		this.block=block;
		this.scrollBar=document.createElement('div');
		this.scrollButton=document.createElement('button');
		this.scrollBar.style.backgroundImage='url(\''+this.scrollBarImg.src+'\')';
		this.scrollButton.style.backgroundImage='url(\''+this.scrollButtonImg.src+'\')';
		this.scrollButton.style.aspectRatio=1;
		this.scrollBar.style.width='100%';
		this.scrollBar.style.height='100%';
		this.scrollBar.style.zIndex=this.z;
		this.scrollBar.style.position='fixed';
		this.scrollButton.style.position='sticky';
		this.scrollButton.style.top='5%';
		this.scrollButton.setAttribute('type','button');
		this.scrollButton.setAttribute('class','uiButton');
		this.scrollButton.style.zIndex=this.z+1;
		this.scrollBar.style.backgroundRepeat='no-repeat';
		this.scrollBar.style.backgroundSize='100% 100%';
		this.scrollBar.style.backgroundColor='transparent';
<<<<<<< HEAD
		this.scrollBar.style.overflow='scroll';
		this.scrollBar.style.fontSize='1px';
		this.scrollBar.style.lineHeight=1;
		this.scrollBar.onscroll=this.scrollHandle;
		setTimeout(function(){
			this.scrollBar.append(this.scrollButton);
			for(let x=0;x<=this.block.scrollHeight*1.1;x+=10){
				this.scrollBar.innerHTML+='<br><br><br><br><br><br><br><br><br><br>';
			}
		}.bind(this),2000);
	}
	scrollHandle(e){
		e.target.parentNode.firstChild.scrollTo(0,e.target.scrollTop*0.9);
		e.target.parentNode.lastChild.firstChild.style.top=
			e.target.scrollTop*0.9*e.target.clientHeight*devicePixelRatio
			/e.target.parentNode.firstChild.scrollHeight
			+'px';
=======
		this.scrollBar.append(this.scrollButton);
		this.scrollButton.setAttribute('type','button');
		this.scrollButton.setAttribute('class','uiButton');
		//on scroll not by slider
		this.block.onscroll=function(){
			this.scrollto(this.block.scrollTop/this.block.scrollHeight);
		}.bind(this);
		//drag scrollSlider
		this.scrollButton.onmousedown=function(e){
			this.block.onscroll=null;
			this.scrollPos[1]=e.clientY;
			document.onmousemove=function(p){
				this.scrollPos[2]=
					100*(-this.scrollBar.clientTop+this.scrollButton.offsetTop)
					/this.scrollBar.clientHeight;
				// margin from top bottom 5%
				this.scrollButton.style.top=
					(this.scrollPos[2]>=5&&this.scrollPos[2]<=85)
					?this.scrollPos[2]:((this.scrollPos[2]>85)?85:5)+'%';
				//current-prev mousePos
				this.scrollPos[0]=p.clientY-this.scrollPos[1];
				this.scrollPos[1]=p.clientY;
				//set path height with top offset
				let scroll=this.scrollButton.offsetTop-this.scrollBar.clientTop+this.scrollPos[0];
				this.scrollButton.style.top=100*scroll/this.scrollBar.clientHeight+'%';
				let val=(this.scrollPos[2]-5)/80;
				val=((val>1||val<0)?((val>1)?1:0):val);
				//does not scroll mapped all the way due to scrollTop undercutting
				this.block.scrollTo(0,val*this.block.scrollHeight);
			}.bind(this);
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				this.block.onscroll=function(){
					this.scrollto(this.block.scrollTop/this.block.scrollHeight);
				}.bind(this);
			}.bind(this);
		}.bind(this);
	}
	scrollto(val){
		this.block.scrollTo(0,val*this.block.scrollHeight);
		this.scrollButton.style.top=100*(val+0.05)+'%';
>>>>>>> tmp
	}
}
class TextWrapper{
	constructor(text,z,scroll){
		this.wrapper=document.createElement('div');
		this.wrapper.setAttribute('class','textWrapper');
		this.wrapper.style.height='100%';
		this.wrapper.style.width='100%';
		this.wrapper.style.borderRadius='3%';
		this.wrapper.style.display='flex';
		this.wrapper.style.zIndex=z;
		this.z=z;
		this.text=document.createElement('div');
		this.text.setAttribute('class','textWrapper');
		this.text.style.position='releative';
		this.text.style.width=scroll?'93%':'96%';
		this.text.style.height='94%';
		this.text.style.margin='2%';
		this.text.style.overflow=scroll?'scroll':'hidden';
		this.text.style.border='medium rgba(200,120,100,0.5)';
		this.text.style.borderStyle='solid none solid none';
		this.text.style.order=1;
		this.text.innerHTML=text+text;
		
		this.scrollBar=new ScrollBar(this.text,this.z);
		this.scrollBar.scrollBar.style.width='3%';
		this.scrollBar.scrollBar.style.order=2;
		this.scrollBar.scrollBar.style.position='relative';

		this.wrapper.append(this.text);
		if(scroll)this.wrapper.append(this.scrollBar.scrollBar);
	}
}
