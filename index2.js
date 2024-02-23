let sceneWrapper=document.querySelector('#sceneWrapper');
sceneWrapper.width=window.innerWidth*devicePixelRatio;
sceneWrapper.height=window.innerHeight*devicePixelRatio;

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
					this.backgroundMask.style.zIndex='8';
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
					this.map.src='./res/scene3/map.jpg';
					this.mapMask.src='./res/scene3/mapMask.png';
					this.borderI.src='./res/scene3/border.png';
					this.compassI.src='./res/scene3/compass.png';
					this.charScreen=new Image();
					this.charScreen.src='./res/scene3/charScreen.jpeg';
					this.locationsD=[[0.275,0.48],[0.026,0.11],];
					this.locationsPos=[[0.22,0.18],[0.32,0.20],[0.4,0.12],[0.47,0.21],[0.49,0.27],[0.48,0.37],[0.41,0.32],[0.39,0.45],[0.04,0.36]];
					for(let x=0;x<=20;x++){
									this.locationsD.push(new Image());
									this.locationsD[x+2].src='./res/scene3/locations/'+x+'.png';
								}
					this.locations.style.position='fixed';
					this.locations.width=sceneWrapper.width*this.locationsD[0][0];
					this.locations.height=sceneWrapper.height*this.locationsD[0][1];
					this.locations.style.width=100*this.locationsD[0][0]+'%';
					this.locations.style.height=100*this.locationsD[0][1]+'%';
					this.locations.style.top=100*this.locationsD[1][1]+'%';
					this.locations.style.left=100*this.locationsD[1][0]+'%';
					this.locations.style.zIndex='7';
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
					this.locationIndex=2;
					this.hazeFrameCount=40;
					this.hazeCount=0;
					this.hazePos=[];
					this.mapMaskFrameCount=30;
					this.mapMaskCount=0;
					this.mapMaskADir=1;
				}
		init(){
					this.sceneWrapper.append(this.background);
					this.sceneWrapper.append(this.backgroundMask);
					this.sceneWrapper.append(this.border);
					this.sceneWrapper.append(this.compass);
					this.sceneWrapper.append(this.locations);
					this.backgroundContext.drawImage(this.map,0,0,this.background.width,this.background.height);	
					this.locationsContext.drawImage(this.locationsD[this.locationIndex],0,0,this.locations.width,this.locations.height);	
					this.borderContext.drawImage(this.borderI,0,0,this.border.width,this.border.height);	
					this.compassContext.drawImage(this.compassI,0,0,this.compass.width,this.compass.height);
					this.initHaze();
					this.mousePos=[0,0];
					this.mouseScroll=0;
					this.mouseClick=false;
					document.addEventListener('mouseup',function(e){
									this.mousePos=[e.clientX,e.clientY];
									this.mouseClick=true;
								}.bind(this));
					document.addEventListener('mouseover',function(e){
									document.addEventListener('mousemove',function(e){
														this.mousePos=[e.clientX,e.clientY];
													}.bind(this));
								}.bind(this));
					document.addEventListener('wheel',function(e){
									this.mouseScroll=e.deltaY;
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
									this.hazeContext.arc(loc[0]-this.hazeCount*this.haze.width*0.5/this.hazeFrameCount,loc[1],0.1*Math.min(this.haze.width,this.haze.height),0,2*Math.PI);
									this.hazeContext.arc(this.background.width-loc[0]+this.hazeCount*this.haze.width*0.5/this.hazeFrameCount,loc[1],0.1*Math.min(this.background.width,this.background.height),0,2*Math.PI);
									this.hazeContext.fill();
								}.bind(this));
					this.hazeCount++;
					if(this.hazeCount<this.hazeFrameCount) window.requestAnimationFrame(this.hazeClearAnim);
				}
		sceneScheduler(timestamp){
					if(this.start=undefined) this.start=timestamp;
					this.elapsed=timestamp-this.start;
					if(this.animPersist){
									let maskShift=5*this.mapMaskCount/this.mapMaskFrameCount;
									this.backgroundMask.style.filter=`drop-shadow(2px 2px rgba(0,0,0,${maskShift/5}))`;
									this.backgroundMaskContext.clearRect(0,0,this.backgroundMask.width,this.backgroundMask.height);
									this.backgroundMaskContext.drawImage(this.mapMask,-maskShift,-maskShift,this.backgroundMask.width+maskShift,this.backgroundMask.height+maskShift);	
									this.mapMaskCount+=this.mapMaskADir;
									if(this.mapMaskCount==this.mapMaskFrameCount||this.mapMaskCount==0) this.mapMaskADir*=-1; 
									window.requestAnimationFrame(this.sceneScheduler);
								}
				}
		
}
let scene3=new Scene3(sceneWrapper);
scene3.init();
