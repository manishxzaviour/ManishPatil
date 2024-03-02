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

		this.book.addEventListener('mouseover',function(e){
			this.book.addEventListener('mousemove',function(e){
				this.contextDiv.style.top=e.clientY-this.contextDiv.clientHeight-5+'px';
				this.contextDiv.style.left=e.clientX-this.contextDiv.clientWidth-5+'px';
				this.contextDiv.innerHTML='Explore [interactive]';
			}.bind(this))
		}.bind(this));
		
		this.book.onclick=function(e){
			//this.wrapper.style.filter='blur(10px)';
			this.downloadButton.remove();
			this.book.remove();
			this.wrapper.style.position='relative';
			this.wrapper.style.width='auto';
			this.wrapper.style.aspectRatio='2';
			this.wrapper.style.height='80%';
			this.wrapper.style.top='10%';
			this.wrapper.style.left=window.innerWidth/2-this.wrapper.clientWidth/2+'px';
			
			this.bookOpen1=new Image();
			this.bookOpen2=new Image();
			this.bookOpen1.src='./res/scene2/1.png';
			this.bookOpen2.src='./res/scene2/2.png';

			//tympanus.net> bookflip
			this.bookWrapper=document.createElement('div');
			this.bookWrapper.innerHTML=`
				<div class="pageContainer">
				    <div class="page" id="first">
					<div class="back">
					    <div class="outer">
						<div class="content">
							<img src="./res/scene2/1.png">
						</div>
					    </div>
					</div>
				    </div>
				    <div class="page" id="second">
					<div class="front">
					    <div class="outer">
						<div class="content">
						    <img src="./res/scene2/1.png">
						</div>
					    </div>
					</div>
					<div class="back" id="third">
					    <div class="outer">
						<div class="content">
							    <img src="./res/scene2/2.png">
						</div>
					    </div>
					</div>
				    </div>
				    <div class="page" id="fourth">
					<div class="front">
					    <div class="outer">
						<div class="content">
						   <img src="./res/scene2/2.png">
						    
						</div>
					    </div>
					</div>
				    </div>

				    <div id="prev"></div>
				    <div id="select"></div>
				    <div id="next"></div>
				</div>
			`;
			this.wrapper.append(this.bookWrapper);
			let prev = document.getElementById("prev");
			let next = document.getElementById("next");
			let select = document.getElementById("select");

			prev.addEventListener("click", prevImg.bind(this));
			next.addEventListener("click", nextImg.bind(this));
			select.addEventListener("click", sel.bind(this));



			let second = document.getElementById('second');
			let fourth= document.getElementById('fourth');

			function prevImg() {
				    second.style.msTransform = "rotateY(0deg)";
				    second.style.webkitTransform = "rotateY(0deg)";
				    second.style.transform = "rotateY(0deg)";
			}
			function nextImg() {
				    second.style.msTransform = "rotateY(-180deg)";
				    second.style.webkitTransform = "rotateY(-180deg)";
				    second.style.transform = "rotateY(-180deg)";
			}
			function sel(){
			}
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
