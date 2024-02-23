export class Scene1{
	constructor(sceneWrapper){
		this.sceneWrapper=sceneWrapper;
		this.background=document.createElement('canvas');
		this.background.width=sceneWrapper.width;
		this.background.height=sceneWrapper.height;
		this.background.style.zIndex='3';
		this.background.setAttribute('class','background');
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
		
		//dialogues
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
		this.done=false;

	}
	init(){

		this.sceneWrapper.append(this.background);
		//record mouseMovement for dialogue interaction
		document.addEventListener('mousemove',function(e){this.mouse=[e.movementX,e.movementY]}.bind(this));
		
		//startup blur
		if(this.startFrameCount>=0){
			window.requestAnimationFrame(this.init);
			this.startFrameCount--;
			//assuming 60Hz
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
				case 1:	//cockatoo
					this.backgroundContext.drawImage(
						this.charMask1,
						0,
						0,
						this.background.width,
						this.background.height
					);
					this.dialogueFill(this.cockatoo,2);
					break;

				case 2:	//porcupine
					this.backgroundContext.drawImage(
						this.charMask2,
						0,
						0,
						this.background.width,
						this.background.height
					);
					this.dialogueFill(this.porcupine,3);
					break;

				case 3:	//cat
					this.backgroundContext.drawImage(
						this.charMask3,
						0,
						0,
						this.background.width,
						this.background.height
					);
					this.dialogueFill(this.cat,4);
					break;

				case 4: //cockatoo
					this.dialogueFill([
						this.cockatoo[0],
						this.cockatoo[1],
						'ok then!                                 ',
						'show me what you found                           '
					],5);
					break;
				case 5:// scene change Transition
					setTimeout(function(){
						this.background.style.filter='blur(10px)';
					}.bind(this),500);
					this.done=true;
					this.animPersist=false;
					break;
			}
			//dialogue fill
			this.backgroundContext.fillText(
				this.textBuffer,
				this.currentDialoguePosition[0]*this.background.width+this.mouse[0],
				this.currentDialoguePosition[1]*this.background.height+this.mouse[1]);
			window.requestAnimationFrame(this.sceneScheduler);
		}
	}

	dialogueFill(dialogue,seq){

					if(this.dialogueCounter[0]<dialogue.length
						&& 
						this.dialogueCounter[1]<dialogue[this.dialogueCounter[0]].length
					){						
						this.currentDialoguePosition=dialogue[0];
						//push each letter every call
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
					//when all dialogue for char completed seq next
					if(this.dialogueCounter[0]>dialogue.length){this.dialogueCounter=[2,0]; this.seq=seq;}
					
	}

}
