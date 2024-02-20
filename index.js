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
		this.startFrameCount=100;
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
			setTimeout(this.init,10);
			this.startFrameCount--;
			this.backgroundContext.filter=`blur(${this.startFrameCount}px)`;
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
			this.backgroundContext.fillText(this.textBuffer,this.currentDialoguePosition[0]*this.background.width+this.mouse[0],this.currentDialoguePosition[1]*this.background.height+this.mouse[1]);
			window.requestAnimationFrame(this.sceneScheduler);
		}
	}
	dialogueFill(dialogue,seq){

					if(this.dialogueCounter[0]<dialogue.length && this.dialogueCounter[1]<dialogue[this.dialogueCounter[0]].length){						
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
			setTimeout(scene3.init,500);
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
		this.startFrameCount=100;
		this.scale=0;
	}
	init(){
		if(this.startFrameCount>0){
			this.wrapper.style.display='block';
			this.wrapper.style.top=this.scale*0.5+'%';
			this.wrapper.style.right=this.scale*32+'%';
			this.wrapper.style.width=35*this.scale+'%';
			this.wrapper.style.height=100*this.scale+'%';
			this.scale=(1-this.startFrameCount/100);
			this.startFrameCount--;
			setTimeout(this.init,10);
		}
	}
}
class Scene3{
	constructor(sceneWrapper){
		this.sceneWrapper=sceneWrapper;
		this.background=document.createElement('canvas');
		this.background.style.position='fixed';
		this.background.width=sceneWrapper.width;
		this.background.height=sceneWrapper.height;
		this.background.style.width='100%';
		this.background.style.height='100%';
		this.background.style.zIndex='5';
		this.backgroundContext=this.background.getContext('2d');
		this.sceneWrapper.append(this.background);
		this.map=new Image();
		this.mapMask=new Image();
		this.border=new Image();
		this.compass=new Image();
		this.map.src='./res/scene3/map.jpg';
		this.mapMask.src='./res/scene3/mapMask.png';
		this.border.src='./res/scene3/border.png';
		this.compass.src='./res/scene3/compass.png';
		this.charScreen=new Image();
		this.charScreen.src='./res/scene3/charScreen.jpeg';
		this.locations=[[0.275,0.47],[0.026,0.11]];
		for(let x=1;x<=20;x++){
			this.locations.push(new Image());
			this.locations[x+1].src='./res/scene3/locations/'+x+'.png';
		}
		this.sceneScheduler=this.sceneScheduler.bind(this);
		this.init=this.init.bind(this);
	}
	init(){
		this.backgroundContext.drawImage(this.map,0,0,this.background.width,this.background.height);	
		this.backgroundContext.drawImage(this.border,0,0,this.background.width,this.background.height);	
		this.backgroundContext.drawImage(this.compass,0,0,this.background.width,this.background.height);	
		this.backgroundContext.drawImage(this.locations[2],this.background.width*this.locations[1][0],this.background.height*this.locations[1][1],this.background.width*this.locations[0][0],this.background.height*this.locations[0][1]);	
			
	}
	sceneScheduler(){

	}
	
}
let scene1=new Scene1(sceneWrapper);
let scene2=new Scene2(sceneWrapper);
let scene3=new Scene3(sceneWrapper);
scene3.init();
