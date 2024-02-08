const scene=document.getElementById("scene");
const backdrop=document.getElementById("backdrop");
const stage=document.getElementById("stage");



const Scene1=new scene1(backdrop,stage);


class scene1{
	constructor(backdrop,stage){
		if(!backdrop || !stage) return;
		this.backdrop=backdrop;
		this.stage=stage;
		this.backdrop.style.height='100vh';
		this.backdrop.style.width='100vw';
		this.backdrop.style.zIndex='2';
		this.backdrop.style.position='fixed';
		this.backdrop.style.top='0px';
		this.backdrop.style.left='0px';
		this.backdrop.style.margin='0px';
		this.backdrop.style.padding='0px';
		this.stage.style.position='fixed';
		this.stage.style.zIndex='4';
		this.stage.style.height='0vh';
		this.stage.style.width='0vw';
	}

}


