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
		this.startFrameCount=90;
		this.downloadLink=document.createElement('a');
		this.downloadLink.href='./downloads/ManishPatil.pdf';
		
		//dialogues//copcacopcocapcocapco
		
		this.fontSize=48;//px

		this.cockatoo1=[
			[0.5,0.48],
			['white',`${this.fontSize}em sans-serif`],
			'Hey POKEY!                                                      ',
			'what are you reading?                            '
		]; 
		this.porcupine1=[
			[0.3,0.85],
			['aqua',`${this.fontSize}px serif`],
			'Sigh, I am reading a book                                   ',
			'...on gravitational curvature affecting...                          ',
			'...Sigh, book on space navigation...                            ',
			'...navigation around small asteroids                            ',
		];
		this.cat1=[
			[0.55,0.85], 
			['skyblue',`${this.fontSize}px cursive`],
			'yawn wow that sounds Fun                                  ',
			'well I am getting bored too...                            ',
			'...mind telling me             ',
			'WHY are you reading this BOOK of yours                    ',
		];
		this.cockatoo2=[
			[0.5,0.48],
			['orange',`${this.fontSize}px sans-serif`],
			'Well we did recieve this guest...             ',
			'...from outerspace...                         ',
			'and he is in a ...boxed condition                               ',
		];
		this.porcupine2=[
			[0.3,0.85],
			['aqua',`${this.fontSize}px serif`],
			'Well, yes it is for him.                ',
			'...for some odd reason,                 ',
			'his navigation did not account for it.               ',
			'I will patch him up when i am done reading                  ',
		];
		this.cockatoo3=[
			[0.5,0.48],
			['yellow',`${this.fontSize}px sans-serif`],
			'Wow! you will?                         ',
			'well I wish I was as resourcefull as you                     ',
			'how are you going to go about it?                     ',
		];
		this.cat2=[
			[0.55,0.85], 
			['white',`${this.fontSize}px cursive`],
			'how are you going to deal with...                ',
			'...such complex constitution?                    ',
			'he is not that simple to repair, is he?             '
		];
		this.porcupine3=[
			[0.3,0.85],
			['aqua',`${this.fontSize}px serif`],
			'no. not simple at all           ',
			'...electronic, mechanical, software systems...       ',
		];
		this.cockatoo4=[
			[0.5,0.48],
			['yellow',`${this.fontSize}px sans-serif`],
			'Yeah, well you are a Mechatronics Engineer                        ',
			'well I do have recollection of            ',
			'us talking about your projects...              ',
			'...just faint...                      '
		];
		this.cat3=[
			[0.55,0.85], 
			['white',`${this.fontSize}px cursive`],
			'Well he did tell us before...            ',
			'...I too don\'t remember the specifics              ',
			'how about telling us about it?                       '
		];
		this.porcupine4=[
			[0.3,0.85],
			['aqua',`${this.fontSize}px serif`],
			'Well I dont mind...                     ',
			'but fixing our Mr.robo comes first...                    ',
			'how about reading this booklet for now?                  ',
			'...well, I wrote it as a record for myself               ',
		];
		this.cockatoo5=[
			[0.5,0.48],
			['aqua',`${this.fontSize}px sans-serif`],
			'Sure I love reading!                                      '	
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
			this.backgroundContext.filter=`blur(${50*this.startFrameCount/90}px)`; 
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
				case 1:	//cockatoo1
					this.backgroundContext.drawImage(
						this.charMask1,
						0,
						0,
						this.background.width,
						this.background.height
					);
					this.dialogueFill(this.cockatoo1,2);
					break;

				case 2:	//porcupine1
					this.backgroundContext.drawImage(
						this.charMask2,
						0,
						0,
						this.background.width,
						this.background.height
					);
					this.dialogueFill(this.porcupine1,3);
					break;

				case 3:	//cat1
					this.backgroundContext.drawImage(
						this.charMask3,
						0,
						0,
						this.background.width,
						this.background.height
					);
					this.dialogueFill(this.cat1,4);
					break;
				case 4:	//cockatoo2
					this.backgroundContext.drawImage(
						this.charMask1,
						0,
						0,
						this.background.width,
						this.background.height
					);
					this.dialogueFill(this.cockatoo2,5);
					break;

				case 5:	//porcupine2
					this.backgroundContext.drawImage(
						this.charMask2,
						0,
						0,
						this.background.width,
						this.background.height
					);
					this.dialogueFill(this.porcupine2,6);
					break;
//copcacopcocapcocapco
				case 6:	//cockatoo3
					this.backgroundContext.drawImage(
						this.charMask1,
						0,
						0,
						this.background.width,
						this.background.height
					);
					this.dialogueFill(this.cockatoo3,7);
					break;


				case 7:	//cat2
					this.backgroundContext.drawImage(
						this.charMask3,
						0,
						0,
						this.background.width,
						this.background.height
					);
					this.dialogueFill(this.cat2,8);
					break;

				case 8:	//porcupine3
					this.backgroundContext.drawImage(
						this.charMask2,
						0,
						0,
						this.background.width,
						this.background.height
					);
					this.dialogueFill(this.porcupine3,9);
					break;

				case 9:	//cockatoo4
					this.backgroundContext.drawImage(
						this.charMask1,
						0,
						0,
						this.background.width,
						this.background.height
					);
					this.dialogueFill(this.cockatoo4,10);
					break;

				case 10://cat3
					this.backgroundContext.drawImage(
						this.charMask3,
						0,
						0,
						this.background.width,
						this.background.height
					);
					this.dialogueFill(this.cat3,11);
					break;
				case 11://porcupine4
					this.backgroundContext.drawImage(
						this.charMask2,
						0,
						0,
						this.background.width,
						this.background.height
					);
					this.dialogueFill(this.porcupine4,12);
					break;

				case 12://cockatoo5
					this.backgroundContext.drawImage(
						this.charMask1,
						0,
						0,
						this.background.width,
						this.background.height
					);
					this.dialogueFill(this.cockatoo5,0);
					break;

				case 0:// scene change Transition
					setTimeout(function(){
						this.background.style.filter='blur(10px)';
					}.bind(this),500);
					this.done=true;
					this.animPersist=false;
					break;
			}
			//dialogue fill
			this.backgroundContext.beginPath();
			this.backgroundContext.strokeText(
				this.textBuffer,
				this.currentDialoguePosition[0]*this.background.width+this.mouse[0],
				this.currentDialoguePosition[1]*this.background.height+this.mouse[1]);
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
						this.backgroundContext.strokeStyle='rgba(0,0,0,0.3)';
						this.backgroundContext.lineWidth=this.fontSize/5;
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
