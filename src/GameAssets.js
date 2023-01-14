function Assets(ctx) {
  this.GameObjects = {
    object : new ctx.render2d.square(100, 100, 100, 100, 0,'rgba(255, 255, 255, 0.8)'),
    objectTwo : new ctx.render2d.square(100, 400, 30, 30, 0, 'red'),
    objectThree : new ctx.render2d.square(40, 600, 30, 30, 0, 'red'),
    objectFour : new ctx.render2d.square(70, 100, 30, 30, 0, 'red'),
    objectFive : new ctx.render2d.square(0, 300, 30, 30, 0, 'orange'),
    cube : new ctx.render3d.cube(300,300,300,100,100,100,0,0,0),
  };
}