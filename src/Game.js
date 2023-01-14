var myGameArea = {
  canvas: document.createElement('canvas'),
  start: function () {
    this.canvas.setAttribute('id', 'GameArea') ,
    this.ctx = this.canvas.getContext('2d');

    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    EngineSetup(this.ctx);
    Assets = new Assets(this.ctx);
    this.interval = setInterval(updateGameArea, 0);
  },
  clear: function () {
    this.sh = screen.height;
    this.sw = screen.width;
    this.ctx.canvas.width = this.sw + 0;
    this.ctx.canvas.height = this.sh + 0;
    this.ctx.clearRect(0, 0, this.sw, this.sh);
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.sw, this.sh);
  },
};

function updateGameArea() {
  myGameArea.clear();
  Assets.GameObjects["cube"].xr+=0.1
  Assets.GameObjects["cube"].zr+=0.1

  for (const objs in Assets.GameObjects) {
    const obj = Assets.GameObjects[objs];
    myGameArea.ctx.objupdate(obj)
    const props= Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
    //console.log(Object.getPrototypeOf(obj)) //Add functions to prototypes in the javascript assets

    for (i=1;i<props.length;i++) {
      obj[props[i]]();
    }
  }

}