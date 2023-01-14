function EngineSetup(ctx) {
  Math.Sine = function(d) {
      return Math.sin(d * Math.PI / 180).toFixed(2);
  },
  Math.Cosine = function(d) {
      return Math.cos(d * Math.PI / 180).toFixed(2);
  },
  Math.ACosine = function(d){
    return Math.acos(d / Math.PI / 180).toFixed(2);
  },
  Math.matmul = function(a, b) {
    let ca = a[0].length;
    let rb = b.length;
    let cb = b[0].length;
    if (ca != rb) {
      console.log("Collum don't match rows");
    } else {
      let answer = [];
      for (let i = 0; i < a.length; i++) {
        let colum = [];
  
        for (let j = 0; j < cb; j++) {
          let sum = 0;
  
          for (let k = 0; k < rb; k++) {
            sum += a[i][k] * b[k][j];
          }
          colum.push(sum);
        }

        answer.push(colum);
      }
      return answer;
    }
  }
  ctx.objupdate = function(obj) {
    let avss = (myGameArea.sw + myGameArea.sh) / 2; //Average screen size
    let xr = obj.xr;
    let yr = obj.yr;
    let zr = obj.zr;
    let rz = [
      [Math.Cosine(zr), -Math.Sine(zr), 0],
      [Math.Sine(zr), Math.Cosine(zr), 0],
      [0, 0, 1],
    ];
    let ry = [
      [Math.Cosine(yr), 0, Math.Sine(yr)],
      [0, 1, 0],
      [-Math.Sine(yr), 0, Math.Cosine(yr)],
    ];
    let rx = [
      [1, 0, 0],
      [0, Math.Cosine(xr), -Math.Sine(xr)],
      [0, Math.Sine(xr), Math.Cosine(xr)],
    ];
    for (let i = 0; i < obj.points.length; i++) {
      let pos = [
        [obj.points[i][0][0]],//* (obj.w / 2)
        [obj.points[i][1][0]],//* (obj.h / 2)
        [obj.points[i][2][0]],//* (obj.l / 2)
        //(myGameArea.sw + myGameArea.sh) / 2 / obj.z
      ];
      pos = Math.matmul(rz, pos);
      pos = Math.matmul(ry, pos);
      pos = Math.matmul(rx, pos);
      //alert(Math.cos(90)+""+obj.color)
      
      pos[0][0] *= (obj.w / 2)
      pos[1][0] *= (obj.h / 2)
      pos[0][0] += obj.x;
      pos[1][0] += obj.y;
      ctx.fillStyle = obj.color;
      ctx.beginPath();
      ctx.arc(pos[0][0], pos[1][0], 10, 0, 2 * Math.PI);
      ctx.moveTo(0, 0);
      //ctx.lineTo(pos[0][0], pos[1][0]);
      ctx.strokeStyle = obj.color;
      ctx.stroke();
      ctx.closePath();
      ctx.fill();
    }
  }
  ctx.constructor = {
    constructor(x, y, z, w, h, l, xr = 0, yr = 0, zr = 0, color = 'blue') {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
      this.h = h;
      this.l = l;
      this.xr = xr;
      this.yr = yr;
      this.zr = zr;
      this.color = color;
    }
  }
  ctx.render2d = {
    square : class {
      constructor(x, y, w, h, zr = 0, color='rgba(0, 0, 0, 0)',image='') {
        this.x = x;
        this.y = y;
        this.z = 0;
        this.w = w;
        this.h = h;
        this.l = 0;
        this.xr = 0;
        this.yr = 0;
        this.zr = zr;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
        this.image = image;
        this.points = [
          [[-1],[-1],[0]],
          [[1],[-1],[0]],
          [[1],[1],[0]],
          [[-1],[1],[0]],
        ]
      }
    },
    circle: class {
      constructor(x, y, width, height, rotation, color='rgba(0, 0, 0, 0)',image='') {
        this.x = x;
        this.y = y;
        this.r = rotation;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
        this.image = image;
      }
      update() {
        const ctx = myGameArea.ctx;
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.width/2, this.height/2, (this.r / 180) * Math.PI, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
      Move() {
        this.x += this.speedX;
        this.y += this.speedY;
      }
    },
    phisics : {
      collision : function(){
        for (const objectnames in Assets.GameObjects) {
        const cycledObjects = Assets.GameObjects[objectnames];
    
        for (const objectnames in Assets.GameObjects) {
          const collisionObjects = Assets.GameObjects[objectnames];
    
          cycledObjects.x+cycledObjects.width/2
        }
        }
      }

    }
  };
  
  
  ctx.render3d={
    cube : class {
      constructor(x, y, z, w, h, l, xr = 0, yr = 0, zr = 0, color = 'blue') {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.h = h;
        this.l = l;
        this.xr = xr;
        this.yr = yr;
        this.zr = zr;
        this.color = color;
        this.points = [
          [[-1], [-1], [1]],
          [[1], [-1], [1]],
          [[1], [1], [1]],
          [[-1], [1], [1]],
          [[-1], [-1], [-1]],
          [[1], [-1], [-1]],
          [[1], [1], [-1]],
          [[-1], [1], [-1]],
        ];
      }
    }
  };
  ctx.objectproperties = {
    phisics : {
      gravity: function (gravity = 1, speed = 1) {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
      },
      collision: function(ob1,ob2){
        let y1 = ob1.y;
        let x1 = ob1.x;
        let y2 = ob2.y;
        let x2 = ob2.x;
        a = Math.abs(y1-y2);
        b = Math.abs(x1-x2);
        c = Math.sqrt(Math.pow(a)+Math.pow(b));
        Math.ACosine(b/c);
      }
    },
  };
  
  for (const objectnames in Assets.GameObjects) {
    
    const cycledObjects = Assets.GameObjects[objectnames];
    cycledObjects.speedX = (Math.floor(Math.random() * 2) + Math.random()) - 1;
    cycledObjects.speedY = (Math.floor(Math.random() * 2) + Math.random()) - 1;
  }
  //alert(Math.ACosine(-1));
}