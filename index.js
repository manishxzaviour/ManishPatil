let sceneWrapper=document.querySelector('#sceneWrapper');
sceneWrapper.width=window.innerWidth*devicePixelRatio;
sceneWrapper.height=window.innerHeight*devicePixelRatio;

class scene1{
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
		this.sceneWrapper.append(this.background);
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
			[0.6,0.9], 
			['white','48px cursive'],
			'            ',
			'hmph.     Pokey? more like Prickly                                        ',
			'..................................',
			'Hey Kiwi, well I am getting bored too.                                    ',
			'Want to see a Map in a Book I found yesterday?                                   ',                                    
		];
		this.dialogueCounter=[2,0];
		this.currentDialoguePosition=[0,0];
		this.textBuffer='';
		this.mouse=[0,0];
		document.addEventListener('mousemove',function(e){this.mouse=[e.movementX,e.movementY]}.bind(this));
	}
	init(){
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
					this.background.remove();
					new scene2(sceneWrapper);
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

class scene2{


}

new scene1(sceneWrapper);
