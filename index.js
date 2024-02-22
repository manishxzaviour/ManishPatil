let sceneWrapper=document.querySelector('#sceneWrapper');
sceneWrapper.width=window.innerWidth*devicePixelRatio;
sceneWrapper.height=window.innerHeight*devicePixelRatio;

class Scene1{
	constructor(sceneWrapper){
		this.sceneWrapper=sceneWrapper;
		this.background=document.createElement('canvas');
		this.background.style.position='fixed';
		this.background.width=sceneWrapper.width;
		this.background.height=sceneWrapper.height;
		this.background.style.width='100%';
		this.background.style.height='100%';
		this.background.style.zIndex='3';
		this.backgroundContext=this.background.getContext('2d');
		this.libraryBg=new Image();
		this.charMask1=new Image();
		this.charMask2=new Image();
		this.charMask3=new Image();
		this.libraryBg.src='./res/scene1/bg.jpg';
		this.charMask1.src='./res/scene1/mask1.png';
		this.charMask2.src='./res/scene1/mask2.png';
		this.charMask3.src='./res/scene1/mask3.png';
		this.sceneScheduler=this.sceneScheduler.bind(this);
		this.init=this.init.bind(this);
		this.libraryBg.onload=this.init;
		this.animPersist=true;
		this.startFrameCount=60;
		this.downloadLink=document.createElement('a');
		this.downloadLink.href='./downloads/ManishPatil.pdf';
		this.cockatoo=[
			[0.5,0.48],
			['white','48px sans-serif'],
			'hey POKEY!                                                      ',
			'what are you reading?                            '
		];
		this.porcupine=[
			[0.3,0.85],
			['aqua','48px serif'],
			'Please don\'t bother me, will you?                                        ',
			'Disturb the napkin holmes lyning there.                                   ',
			'He has nothing interesting to do, unlike me.                              '
		];
		this.cat=[
			[0.55,0.85], 
			['white','48px cursive'],
			'            ',
			'hmph. Pokey? more like Prickly                                        ',
			'..................................',
			'Hey Kiwi, well I am getting bored too.                                    ',
			'Want to see a Map in a Book I found yesterday?                                   ',                                    
		];
		this.dialogueCounter=[2,0];
		this.currentDialoguePosition=[0,0];
		this.textBuffer='';
		this.mouse=[0,0];
	}
	init(){
		this.sceneWrapper.append(this.background);
		document.addEventListener('mousemove',function(e){this.mouse=[e.movementX,e.movementY]}.bind(this));
		if(this.startFrameCount>=0){
			window.requestAnimationFrame(this.init);
			this.startFrameCount--;
			this.backgroundContext.filter=`blur(${50*this.startFrameCount/60}px)`;
			this.backgroundContext.drawImage(this.libraryBg,0,0,this.background.width,this.background.height);
		}
		else{
			this.seq=1;
			setTimeout(this.sceneScheduler,1500);
		}
	}
	sceneScheduler(timestamp){
		if(this.start==undefined)this.start=timestamp;
		this.elapsed=timestamp-this.start;
		if(this.animPersist){
			this.backgroundContext.drawImage(this.libraryBg,0,0,this.background.width,this.background.height);
			switch(this.seq){
				case 1:
					this.backgroundContext.drawImage(this.charMask1,0,0,this.background.width,this.background.height);
					this.dialogueFill(this.cockatoo,2);
					break;
				case 2:	
					this.backgroundContext.drawImage(this.charMask2,0,0,this.background.width,this.background.height);
					this.dialogueFill(this.porcupine,3);
					break;
				case 3:	
					this.backgroundContext.drawImage(this.charMask3,0,0,this.background.width,this.background.height);
					this.dialogueFill(this.cat,4);
					break;
				case 4: 
					this.dialogueFill([
						this.cockatoo[0],
						this.cockatoo[1],
						'ok then!                                 ',
						'show me what you found                           '
					],5);
					break;
				case 5:
					setTimeout(function(){
						this.background.style.filter='blur(10px)';
					}.bind(this),500);
					scene2.init();
					this.animPersist=false;
					break;
			}
			this.backgroundContext.fillText(
				this.textBuffer,
				this.currentDialoguePosition[0]*this.background.width+this.mouse[0],
				this.currentDialoguePosition[1]*this.background.height+this.mouse[1]);
			window.requestAnimationFrame(this.sceneScheduler);
		}
	}
	dialogueFill(dialogue,seq){

					if(this.dialogueCounter[0]<dialogue.length && 
						this.dialogueCounter[1]<dialogue[this.dialogueCounter[0]].length){						
						this.currentDialoguePosition=dialogue[0];
						this.textBuffer+=dialogue[this.dialogueCounter[0]][this.dialogueCounter[1]];
						this.dialogueCounter[1]++;
						this.backgroundContext.fillStyle=dialogue[1][0];		
						this.backgroundContext.font=dialogue[1][1];
					}
					else{
						this.dialogueCounter[0]++;
						this.dialogueCounter[1]=0;
						this.textBuffer='';
					}
					if(this.dialogueCounter[0]>dialogue.length){this.dialogueCounter=[2,0]; this.seq=seq;}
					
	}

}

class Scene2{
	constructor(sceneWrapper){
		this.sceneWrapper=sceneWrapper;
		this.wrapper=document.createElement('div');
		this.wrapper.style.position='fixed';
		this.wrapper.style.zIndex=4;
		this.wrapper.style.display='none';
		this.wrapper.style.top='20%';
		this.book=document.createElement('button');
		this.book.style.height='75%';
		this.book.style.backgroundImage='url(\'./res/scene2/book.png\')';
		this.book.setAttribute('class','scene2Button');
		this.book.setAttribute('type','button');
		this.downloadButton=document.createElement('button');
		this.downloadButton.setAttribute('class','scene2Button');
		this.downloadButton.style.height='25%';
		this.downloadButton.style.backgroundImage='url(\'./res/scene2/resume.png\')';
		this.downloadButton.setAttribute('type','button');
		this.contextDiv=document.createElement('div');
		this.contextDiv.style.position='fixed';
		this.contextDiv.style.font='serif';
		this.contextDiv.style.border='1px dotted purple';
		this.contextDiv.style.color='rgb(150,150,150)';
		this.contextDiv.style.zIndex=5;
		this.book.addEventListener('mouseover',function(e){
			this.book.addEventListener('mousemove',function(e){
				this.contextDiv.style.top=e.clientY-this.contextDiv.clientHeight+'px';
				this.contextDiv.style.left=e.clientX-this.contextDiv.clientWidth+'px';
				this.contextDiv.innerHTML='Interactive map';
			}.bind(this))
		}.bind(this));
		this.book.onclick=function(e){
			this.wrapper.style.filter='blur(10px)';
			this.downloadButton.remove();
			this.book.style.transition='1s';
			this.book.style.backgroundImage='url(\'./res/scene2/bookOpen.png\')';
			setTimeout(scene3.init,600);
		}.bind(this);

		this.downloadButton.addEventListener('mouseover',function(e){
			this.downloadButton.addEventListener('mousemove',function(e){
				this.contextDiv.style.top=e.clientY-this.contextDiv.clientHeight+'px';
				this.contextDiv.style.left=e.clientX-this.contextDiv.clientWidth+'px';
				this.contextDiv.innerHTML='Direct Download';
			}.bind(this))
		}.bind(this));
		this.downloadButton.onclick=function(e){
			window.location.assign(window.location+'res/downloads/ManishPatil.pdf');
		}.bind(this);
		this.wrapper.append(this.book);
		this.wrapper.append(this.downloadButton);
		this.wrapper.append(this.contextDiv);
		this.sceneWrapper.append(this.wrapper);
		this.init=this.init.bind(this);
		this.startFrameCount=60;
		this.scale=0;
	}
	init(){
		if(this.startFrameCount>0){
			this.wrapper.style.display='block';
			this.wrapper.style.top=this.scale*0.5+'%';
			this.wrapper.style.right=this.scale*32+'%';
			this.wrapper.style.width=35*this.scale+'%';
			this.wrapper.style.height=100*this.scale+'%';
			this.scale=(1-this.startFrameCount/60);
			this.startFrameCount--;
			window.requestAnimationFrame(this.init);
		}
	}
}
class Scene3{
	constructor(sceneWrapper){
		this.sceneWrapper=sceneWrapper;
		this.background=document.createElement('canvas');
		this.border=document.createElement('canvas');
		this.locations=document.createElement('canvas');
		this.compass=document.createElement('canvas');
		this.background.style.position='fixed';
		this.background.width=sceneWrapper.width;
		this.background.height=sceneWrapper.height;
		this.background.style.width='100%';
		this.background.style.height='100%';
		this.background.style.zIndex='6';
		this.backgroundContext=this.background.getContext('2d');
		this.backgroundMask=document.createElement('canvas');
		this.backgroundMask.style.position='fixed';
		this.backgroundMask.width=sceneWrapper.width;
		this.backgroundMask.height=sceneWrapper.height;
		this.backgroundMask.style.width='100%';
		this.backgroundMask.style.height='100%';
		this.backgroundMask.style.zIndex='7';
		this.backgroundMaskContext=this.backgroundMask.getContext('2d');
		this.border.style.position='fixed';
		this.border.width=sceneWrapper.width;
		this.border.height=sceneWrapper.height;
		this.border.style.width='100%';
		this.border.style.height='100%';
		this.border.style.zIndex='10';
		this.borderContext=this.border.getContext('2d');
		this.haze=document.createElement('canvas');
		this.haze.style.position='fixed';
		this.haze.width=sceneWrapper.width;
		this.haze.height=sceneWrapper.height;
		this.haze.style.width='100%';
		this.haze.style.height='100%';
		this.haze.style.zIndex='5';
		this.hazeContext=this.haze.getContext('2d');
		this.map=new Image();
		this.mapMask=new Image();
		this.borderI=new Image();
		this.compassI=new Image();
		this.bookOpen=new Image();
		this.bookOpen.src='./res/scene2/bookOpen.png';
		this.map.src='./res/scene3/map.jpg';
		this.mapMask.src='./res/scene3/mapMask.png';
		this.borderI.src='./res/scene3/border.png';
		this.compassI.src='./res/scene3/compass.png';
		this.charScreen=new Image();
		this.charScreen.src='./res/scene3/charScreen.jpeg';
		this.locationsD=[[0.275,0.48],[0.026,0.11],[],];
		this.locationsPos= [
			[0.41449765747006767, 0.33585858585858586]
			,[0.6203800104112441, 0.3888888888888889]
			,[0.7533836543466944, 0.23863636363636365]
			,[0.9036959916710047, 0.39595959595959596]
			,[0.9383133784487246, 0.5161616161616162]
			, [0.9301145236855805, 0.7123737373737373]
			, [0.7925559604372723, 0.6045454545454545]
			,[0.7497397188964081, 0.8608585858585859]
			, [0.08472149921915668, 0.6628787878787878]
		];
		for(let x=0;x<=20;x++){
			this.locationsD.push(new Image());
			this.locationsD[x+3].src='./res/scene3/locations/'+x+'.png';
		}
		this.locations.style.position='fixed';
		this.locations.width=sceneWrapper.width*this.locationsD[0][0];
		this.locations.height=sceneWrapper.height*this.locationsD[0][1];
		this.locations.style.width=100*this.locationsD[0][0]+'%';
		this.locations.style.height=100*this.locationsD[0][1]+'%';
		this.locations.style.top=100*this.locationsD[1][1]+'%';
		this.locations.style.left=100*this.locationsD[1][0]+'%';
		this.locations.style.zIndex='8';
		this.locationsContext=this.locations.getContext('2d');
		this.compass.style.position='fixed';
		this.compass.width=sceneWrapper.width;
		this.compass.height=sceneWrapper.height;
		this.compass.style.width=100+'%';
		this.compass.style.height=100+'%';
		this.compass.style.zIndex='9';
		this.compassContext=this.compass.getContext('2d');
		this.sceneScheduler=this.sceneScheduler.bind(this);
		this.init=this.init.bind(this);
		this.hazeClearAnim=this.hazeClearAnim.bind(this);
		this.animPersist=true;
		this.locationsIndex=3;
		this.hazeFrameCount=40;
		this.hazeCount=0;
		this.hazePos=[];
		this.locationsZoom=1.5;
		this.mapMaskFrameCount=30;
		this.mapMaskCount=0;
		this.mapZoomPos=[0,0];
		this.mapZoomScale=1;
		this.mapMaskADir=1;
		this.maskBound=0.1;
		this.mousePos=[0,0];
		this.mouseScroll=0;
		this.mouseClick=false;
		this.mouseScoll=0;
	}
	init(){
		this.sceneWrapper.append(this.background);
		this.sceneWrapper.append(this.backgroundMask);
		this.sceneWrapper.append(this.border);
		this.sceneWrapper.append(this.compass);
		this.sceneWrapper.append(this.locations);
		this.backgroundContext.drawImage(this.map,0,0,this.background.width,this.background.height);	
		this.locationsContext.drawImage(this.locationsD[this.locationsIndex],0,0,this.locations.width,this.locations.height);	
		this.borderContext.drawImage(this.borderI,0,0,this.border.width,this.border.height);	
		this.compassContext.drawImage(this.compassI,0,0,this.compass.width,this.compass.height);
		this.compass.style.filter='drop-shadow(5px 5px rgba(0,0,0,0.5))';
		this.initHaze();
		this.background.style.transition='0.5s';
		this.backgroundMask.style.transition='0.5s';
		document.addEventListener('mouseup',function(e){
			this.mousePos=[e.clientX*window.devicePixelRatio,e.clientY*window.devicePixelRatio];
			this.mouseClick=true;
		}.bind(this));
		document.addEventListener('mouseover',function(e){
			document.addEventListener('mousemove',function(e){
				this.mousePos=[e.clientX*window.devicePixelRatio,e.clientY*window.devicePixelRatio];
			}.bind(this));
		}.bind(this));
		document.addEventListener('wheel',function(e){
			this.mouseScroll=e.deltaY<0?-0.25:0.25;
		}.bind(this));
		setTimeout(this.sceneScheduler,1000);
	}
	initHaze(){
		this.haze.style.filter='blur(10px)';
		this.sceneWrapper.append(this.haze);
		for(let x=0;x<=this.background.height;x+=this.background.height*0.1){
			for(let y=this.background.width/2;y>=0;y-=0.1*this.background.width/2){
				this.hazePos.push([y,x,Math.min(Math.random(),0.5)]);
			}
		}
		this.hazeClearAnim();
	}
	hazeClearAnim(timestamp){
		if(this.hazeStart=undefined) this.hazeStart=timestamp;
		this.elapsed=timestamp-this.hazeStart;
		this.background.style.opacity=`${Math.max(this.hazeCount/this.hazeFrameCount,0.2)}`;
		this.backgroundMask.style.opacity=`${Math.max(this.hazeCount/this.hazeFrameCount,0.2)}`;
		this.border.style.opacity=`${Math.max(this.hazeCount/this.hazeFrameCount,0.2)}`;
		this.locations.style.opacity=`${Math.max(this.hazeCount/this.hazeFrameCount,0.2)}`;
		this.compass.style.opacity=`${Math.max(this.hazeCount/this.hazeFrameCount,0.2)}`;
		this.hazeContext.clearRect(0,0,this.haze.width,this.haze.height);
		this.hazePos.forEach(function(loc){
			this.hazeContext.fillStyle=`rgba(230,230,255,${loc[2]})`;
			this.hazeContext.beginPath();
			this.hazeContext.arc(
				loc[0]-this.hazeCount*this.haze.width*0.5/this.hazeFrameCount,
				loc[1],0.1*Math.min(this.haze.width,this.haze.height),
				0,
				2*Math.PI
			);
			this.hazeContext.arc(
				this.background.width-loc[0]+this.hazeCount*this.haze.width*0.5/this.hazeFrameCount,
				loc[1],
				0.1*Math.min(this.background.width,this.background.height),
				0,
				2*Math.PI
			);
			this.hazeContext.fill();
		}.bind(this));
		this.hazeCount++;
		if(this.hazeCount<this.hazeFrameCount) window.requestAnimationFrame(this.hazeClearAnim);
		else this.hazeContext.drawImage(this.bookOpen,0,0,this.haze.width,this.haze.height);
	}
	sceneScheduler(timestamp){
		if(this.start=undefined) this.start=timestamp;
		this.elapsed=timestamp-this.start;
		if(this.animPersist){
			let maskShift=5*this.mapMaskCount/this.mapMaskFrameCount;
			let mouseShift=[
				this.mousePos[0]/this.background.width,
				this.mousePos[1]/this.background.height
			];
			if(this.mouseScroll!=0){
				if(this.mapZoomScale>=1&&this.mapZoomScale<=5){
					this.mapZoomScale+=this.mouseScroll;
					this.mouseScroll=0;
				}
				else{
					this.mapZoomScale=1;
				}
			}
			this.background.style.transform=`scale(${this.mapZoomScale})`;
			this.backgroundMask.style.transform=`scale(${this.mapZoomScale})`;
			this.backgroundMask.style.filter=`drop-shadow(2px 2px rgba(0,0,0,${maskShift/5}))`;
			this.backgroundMaskContext.clearRect(0,0,this.backgroundMask.width,this.backgroundMask.height);
			this.backgroundContext.drawImage(this.map,0,0,this.background.width,this.background.height);	
			this.backgroundMaskContext.drawImage(
				this.mapMask,
				-maskShift,
				-maskShift,
				this.backgroundMask.width+maskShift,
				this.backgroundMask.height+maskShift
			);
			this.locationsContext.clearRect(0,0,this.locations.width,this.locations.height);
			if(this.locationsIndex!=2){
				this.locationsContext.drawImage(
					this.locationsD[this.locationsIndex],
					0,
					0,
					this.locations.width,
					this.locations.height
				);
			}
			if(this.locationsIndex==2&&this.mapZoomScale==1){
				this.locationsContext.drawImage(
					this.map,
					mouseShift[0]*this.map.naturalWidth-this.locations.width/2+this.background.width*0.08,
					mouseShift[1]*this.map.naturalHeight-this.locations.height/2+this.background.height*0.08,
					this.locations.width/this.locationsZoom,
					this.locations.height/this.locationsZoom,
					0,
					0,
					this.locations.width,
					this.locations.height
				);
			}
			if(this.mouseClick&&this.mapZoomScale==1){
				let count=0;
				this.locationsIndex=2;
				this.locationsPos.forEach(function(val){
					 if(
						(
							this.mousePos[0]<(val[0]+this.maskBound)*this.background.width
							&&
							this.mousePos[0]>(val[0]-this.maskBound)*this.background.width
						)
						&&
						(
							this.mousePos[1]<(val[1]+this.maskBound)*this.background.height
							&&
							this.mousePos[1]>(val[1]-this.maskBound)*this.background.height
						)
					)
					{
						this.locationsIndex=count+4;
						this.mapZoomPos=val;
					}					
					count+=1;
				}.bind(this));
				this.mouseClick=false;
			}
			if(this.mapZoomScale>1){
				this.border.style.cursor='url(\'./res/cursor/move.cur\'), move';
				this.background.style.left=
					-this.mousePos[0]/window.devicePixelRatio
					+this.background.clientWidth/2
					+'px';
				this.background.style.top=
					-this.mousePos[1]/window.devicePixelRatio
					+this.background.clientHeight/2
					+'px';
				this.backgroundMask.style.left=
					-this.mousePos[0]/window.devicePixelRatio
					+this.backgroundMask.clientWidth/2
					+'px';
				this.backgroundMask.style.top=
					-this.mousePos[1]/window.devicePixelRatio
					+this.backgroundMask.clientHeight/2
					+'px';
			}
			else{
				this.border.style.cursor='url(\'./res/cursor/normal.cur\'), auto';
				this.background.style.top=this.border.height/2-this.background.height/2+'px';
				this.background.style.left=this.border.width/2-this.background.width/2+'px';
				this.backgroundMask.style.top=this.border.height/2-this.backgroundMask.height/2+'px';
				this.backgroundMask.style.left=this.border.width/2-this.backgroundMask.width/2+'px';
			}
			this.mapMaskCount+=this.mapMaskADir;
			if(this.mapMaskCount==this.mapMaskFrameCount||this.mapMaskCount==0) this.mapMaskADir*=-1; 
			window.requestAnimationFrame(this.sceneScheduler);
		}
	}
	
}
//let scene1=new Scene1(sceneWrapper);
//let scene2=new Scene2(sceneWrapper);
let scene3=new Scene3(sceneWrapper);
scene3.init();
