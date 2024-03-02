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

			for(let x=0;x<this.pageCount;x++){
				this.pages.push(document.createElement('div'));
				this.pages[x].setAttribute('class','bookPage');
				this.pages[x].style.zIndex=this.z+1+this.pageCount-x;
				this.pages[x].setAttribute('id',`page${x}`);
				this.pages[x].append(document.createElement('div'));
				this.pages[x].firstChild.setAttribute('class',(x%2==0)?'pageBack':'pageFront');
				if(x%2==0){
					this.pages[x].firstChild.style.webkitTransform='rotateY(180deg)';
					this.pages[x].firstChild.style.transform='rotateY(180deg)';
					this.pages[x].firstChild.style.left='-100%';
				}
				else{
					this.page[x].style.transition='transform 0.8s ease-in-out';

					this.pages[x].firstChild.style.webkitTransform='rotateY(-180deg)';
					this.pages[x].firstChild.style.transform='rotateY(-180deg)';
				}
				this.pages[x].firstChild.append(document.createElement('div'));
				this.pages[x].firstChild.firstChild.setAttribute('class','pageContainer');
				this.pages[x].firstChild.firstChild.style.overflow='hidden';
				this.pages[x].firstChild.firstChild.append(document.createElement('div'));
				this.pages[x].firstChild.firstChild.firstChild.setAttribute('class','pageContent');
				this.pages[x].firstChild.firstChild.firstChild.style.width='200%';
				this.pages[x].firstChild.firstChild.firstChild.style.width='-100%';
				//this.pages[x].firstChild.firstChild.firstChild.append(document.createElement('img'));
				//this.pages[x].firstChild.firstChild.firstChild.firstChild.src=this.pageContent[x];
				this.pages[x].firstChild.firstChild.firstChild.setAttribute('class','textWrapper');
			}
			this.pages.forEach(function(val){
				this.bookWrapper.append(val);
			}.bind(this));


			//leftPage
			this.bookWrapper.append(document.createElement('div'));
			this.bookWrapper.lastChild.style.position='absolute';
			this.bookWrapper.lastChild.style.top='0px';
			this.bookWrapper.lastChild.style.left='0px';
			this.bookWrapper.lastChild.style.width='50%';
			this.bookWrapper.lastChild.style.height='100%';
			this.bookWrapper.lastChild.onmouseover=(e)=>{e.target.style.background='rgba(0,0,0,0.1)'};
			this.bookWrapper.lastChild.onclick=function(e) {
			    second.style.msTransform = "rotateY(0deg)";
			    second.style.webkitTransform = "rotateY(0deg)";
			    second.style.transform = "rotateY(0deg)";
			};
			

			//rightPage
			this.bookWrapper.append(document.createElement('div'));
			this.bookWrapper.lastChild.style.position='absolute';
			this.bookWrapper.lastChild.style.top='0px';
			this.bookWrapper.lastChild.style.left='50%';
			this.bookWrapper.lastChild.style.width='50%';
			this.bookWrapper.lastChild.style.height='100%';
			this.bookWrapper.lastChild.onmouseover=(e)=>{e.target.style.background='rgba(0,0,0,0.1)'};
			this.bookWrapper.lastChild.onclick=function(e) {		
			    second.style.msTransform = "rotateY(-180deg)";
			    second.style.webkitTransform = "rotateY(-180deg)";
			    second.style.transform = "rotateY(-180deg)";
			}

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
