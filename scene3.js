export class Scene3{
	constructor(sceneWrapper){
		this.sceneWrapper=sceneWrapper;
		this.background=document.createElement('canvas');
		this.border=document.createElement('canvas');
		this.locations=document.createElement('canvas');
		this.compass=document.createElement('canvas');
		this.backgroundMask=document.createElement('canvas');
		this.haze=document.createElement('canvas');
		
		this.background.width=sceneWrapper.width;
		this.background.height=sceneWrapper.height;
		this.background.setAttribute('class','background');
		this.background.style.zIndex='6';
		this.backgroundContext=this.background.getContext('2d');
		
		this.backgroundMask.width=sceneWrapper.width;
		this.backgroundMask.height=sceneWrapper.height;
		this.backgroundMask.setAttribute('class','background');
		this.backgroundMask.style.zIndex='7';
		this.backgroundMaskContext=this.backgroundMask.getContext('2d');
		
		this.border.width=sceneWrapper.width;
		this.border.height=sceneWrapper.height;
		this.border.setAttribute('class','background');
		this.border.style.zIndex='10';
		this.borderContext=this.border.getContext('2d');
					
		this.haze.width=sceneWrapper.width;
		this.haze.height=sceneWrapper.height;
		this.haze.setAttribute('class','background');
		this.haze.style.zIndex='5';
		this.hazeContext=this.haze.getContext('2d');
		
		this.locationsD=[[0.275,0.48],[0.026,0.11],[],];   //[w,h]//[x,y]// 2=>map, 3=>mapLow
		this.locations.style.position='fixed';
		this.locations.width=sceneWrapper.width*this.locationsD[0][0];
		this.locations.height=sceneWrapper.height*this.locationsD[0][1];
		this.locations.style.width=100*this.locationsD[0][0]+'%';
		this.locations.style.height=100*this.locationsD[0][1]+'%';
		this.locations.style.top=100*this.locationsD[1][1]+'%';
		this.locations.style.left=100*this.locationsD[1][0]+'%';
		this.locations.style.zIndex='8';
		this.locationsContext=this.locations.getContext('2d');
		
		this.compass.setAttribute('class','background');
		this.compass.width=sceneWrapper.width;
		this.compass.height=sceneWrapper.height;
		this.compass.style.zIndex='9';
		this.compassContext=this.compass.getContext('2d');
			
		this.map=new Image();
		this.mapMask=new Image();
		this.borderI=new Image();
		this.compassI=new Image();
		this.bookOpen=new Image();
		this.charScreen=new Image();
		this.bookOpen.src='./res/scene2/bookOpen.png';
		this.map.src='./res/scene3/map.jpg';
		this.mapMask.src='./res/scene3/mapMask.png';
		this.borderI.src='./res/scene3/border.png';
		this.compassI.src='./res/scene3/compass.png';
		this.charScreen.src='./res/scene3/charScreen.jpeg';
		
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
		this.done=false;
	}
	init(){
		this.backgroundContext.drawImage(this.map,0,0,this.background.width,this.background.height);	
		this.locationsContext.drawImage(this.locationsD[this.locationsIndex],0,0,this.locations.width,this.locations.height);	
		this.borderContext.drawImage(this.borderI,0,0,this.border.width,this.border.height);	
		this.compassContext.drawImage(this.compassI,0,0,this.compass.width,this.compass.height);
		
		this.compass.style.filter='drop-shadow(5px 5px rgba(0,0,0,0.5))';
		
		this.background.style.transition='0.5s';
		this.backgroundMask.style.transition='0.5s';
		
		this.sceneWrapper.append(this.background);
		this.sceneWrapper.append(this.backgroundMask);
		this.sceneWrapper.append(this.border);
		this.sceneWrapper.append(this.compass);
		this.sceneWrapper.append(this.locations);
	
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
		
		this.initHaze();
		
		setTimeout(this.sceneScheduler,1000);
	}

	initHaze(){
		this.haze.style.filter='blur(10px)';
		for(let x=0;x<=this.haze.height;x+=this.haze.height*0.1){
			for(let y=this.haze.width/2;y>=0;y-=0.1*this.haze.width/2){
				this.hazePos.push([y,x,Math.min(Math.random(),0.5)]);
			}
		}
		this.hazeClearAnim();
	}
	hazeClearAnim(timestamp){
		this.sceneWrapper.append(this.haze);
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
			// center divide transition
			this.hazeContext.arc(
				loc[0]-this.hazeCount*this.haze.width*0.5/this.hazeFrameCount,
				loc[1],0.1*Math.min(this.haze.width,this.haze.height),
				0,
				2*Math.PI
			);
			this.hazeContext.arc(
				this.haze.width-loc[0]+this.hazeCount*this.haze.width*0.5/this.hazeFrameCount,
				loc[1],
				0.1*Math.min(this.haze.width,this.haze.height),
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
			this.backgroundContext.drawImage(this.map,0,0,this.background.width,this.background.height);	
			
			//locationsMask Anim
			let maskShift=5*this.mapMaskCount/this.mapMaskFrameCount;
			this.backgroundMask.style.filter=`drop-shadow(2px 2px rgba(0,0,0,${maskShift/5}))`;
			this.backgroundMaskContext.clearRect(0,0,this.backgroundMask.width,this.backgroundMask.height);
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
			
			//sticky map with mouse zoom
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
			//follow mouse in zoomed out map inside locationWrapper
			let mouseShift=[
				this.mousePos[0]/this.background.width,
				this.mousePos[1]/this.background.height
			];
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

			//location setter
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

			// follow mouse in zoomed in map
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

