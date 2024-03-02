export class Scene2{
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
		this.book.setAttribute('class','uiButton');
		this.book.setAttribute('type','button');
		
		this.downloadButton=document.createElement('button');
		this.downloadButton.setAttribute('class','uiButton');
		this.downloadButton.style.height='25%';
		this.downloadButton.style.backgroundImage='url(\'./res/scene2/resume.png\')';
		this.downloadButton.setAttribute('type','button');
		
		this.contextDiv=document.createElement('div');
		this.contextDiv.style.position='fixed';
		this.contextDiv.style.font='serif';
		this.contextDiv.style.border='1px dotted purple';
		this.contextDiv.style.color='rgb(150,150,150)';
		this.contextDiv.style.filter='drop-shadow(2px 2px rgba(0,0,0,0.5))';
		this.contextDiv.style.zIndex=5;

		this.pages=[];
		
		this.book.addEventListener('mouseover',function(e){
			this.book.addEventListener('mousemove',function(e){
				this.contextDiv.style.top=e.clientY-this.contextDiv.clientHeight-5+'px';
				this.contextDiv.style.left=e.clientX-this.contextDiv.clientWidth-5+'px';
				this.contextDiv.innerHTML='Interactive map';
			}.bind(this))
		}.bind(this));
		
		this.book.onclick=function(e){
			//this.wrapper.style.filter='blur(10px)';
			this.downloadButton.remove();
			this.book.remove();
			this.wrapper.setAttribute('class','textWrapper');
			this.wrapper.style.position='fixed';
			this.wrapper.style.width='auto';
			this.wrapper.style.aspectRatio='2';
			this.wrapper.style.height='80%';
			this.wrapper.style.top='10%';
			this.wrapper.style.left=window.innerWidth/2-this.wrapper.clientWidth/2+'px';
			
			//tympanus.net> bookflip
			this.bookWrapper=document.createElement('div');

			for(let x=0;x<this.pageCount;x++){
				this.pages.push(document.createElement('div'));
				let pageContainer=this.pages[x];
				pageContainer.append(document.createElement('div'));
				pageContainer.setAttribute('class','pageContainer');
				let back=pageContainer.firstChild;
				back.setAttribute('class','pageBack');
				back.append(document.createElement('div'));
				let outer=back.firstChild;
				outer.append(document.createElement('div'));
				let content=outer.firstChild;
				content.append(document.createElement('img'));
				content.firstChild.src=this.pageContent[x];
				if(x%2!=0){
					pageContainer.append(document.createElement('div'));
					let front=pageContainer.lastChild;
					front.setAttribute('class','pageFront');
					front.append(document.createElement('div'));
					outer=front.firstChild;
					outer.append(document.createElement('div'));
					let content=outer.firstChild;
					content.append(document.createElement('img'));
					content.firstChild.src=this.pageContent[x+1];
				}
			}
			this.pages.forEach(function(val){
				this.bookWrapper.append(val);
			}.bind(this));


			this.wrapper.append(this.bookWrapper);
		}.bind(this);

		this.downloadButton.addEventListener('mouseover',function(e){
			this.downloadButton.addEventListener('mousemove',function(e){
				this.contextDiv.style.top=e.clientY-this.contextDiv.clientHeight-5+'px';
				this.contextDiv.style.left=e.clientX-this.contextDiv.clientWidth-5+'px';
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
		this.done=false;
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
