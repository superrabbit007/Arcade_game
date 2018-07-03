// 这是我们的玩家要躲避的敌人
// var Enemy = function() {
//     // 要应用到每个敌人的实例的变量写在这里
//     // 我们已经提供了一个来帮助你实现更多
//     this.x = 0;
//     this.y = 65;
//
//     // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
//     this.sprite = 'images/enemy-bug.png';
// };
//
// // 此为游戏必须的函数，用来更新敌人的位置
// // 参数: dt ，表示时间间隙
// Enemy.prototype.update = function(dt) {
//     // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
//     // 都是以同样的速度运行的
//     this.x = this.x + 10 * dt;
//
// };
//
// Enemy.prototype.updateOne = function() {
//   //当虫子跑出画面后，重置它的位置为起始点
//     if (this.x>505) {
//       this.x=0;
//     }
// };
//
// // 此为游戏必须的函数，用来在屏幕上画出敌人，
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };


/**
*@description 创建玩家要躲避的敌人
*@class
**/
class Enemy {
  constructor() {
    this.x = 0;
    this.y = 65;
    this.speed = 100;
    this.sprite = 'images/enemy-bug.png';
  }

 // 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
  update(dt) {
    this.x = this.x + this.speed * dt;
  }




// 当虫子跑出画面后，重置它的位置（x,y坐标），生成随机的速度
  updateOne() {
      if (this.x>505) {
        this.x = 0;
        this.y = 65 + 84*Math.floor(3*Math.random());
        this.speed = Math.floor(100*Math.random())+100;
      }
  }


// 用来绘制游戏中的敌人（虫子）
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }


}




// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
/**
*初始化玩家的坐标和形象
*@class
*@classdesc 创建玩家
**/
class Player {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.x = 101;
    this.y = 378;
  }

/**
检测碰撞
**/
  checkCollisions(dt) {
    // console.log("update this.x:",this.x);
    let charLoc = this;
    // checkCollisions();
    allEnemies.forEach (function(enemy) {
      // console.log(charLoc.y, enemy['y']);
    // console.log(Math.abs(charLoc.y - enemy['y']) <= 23);
    let a1 = charLoc.x - enemy['x'];
    let a2 = (Math.abs(a1)<=65);
    let b1 = charLoc.y - enemy['y'];
    let b2 = (Math.abs(b1) <= 50.5);
    // let a = ((a2<=10) || (a1<=50));
    // console.log(a1,b1);

      // console.log(Math.abs(charLoc.x - enemy['x']) <= 10);
      if (a2 && b2) {
        console.log(charLoc['x'],charLoc['y']);

        console.log(enemy['x'],enemy['y']);
        charLoc.x = 0;
        charLoc.y = 378;
      }

    });
  }


  update(dt) {
    // console.log("test update");

  }


   render() {
    // console.log("test render");
    // ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  }

  // update1() {
  //   let popBox1 = document.getElementsByClassName('message2');
  //   popBox1[0].textContent = "Use ";
  // }





  handleInput(key) {
    console.log(this.x,this.y);
      switch(key) {
      case 'left': this.x -=101;
      console.log(this.x);
      break;
      case 'right': this.x +=101;
      console.log(this.x);
      break;
      case 'up': this.y -= 84;
      console.log(this.y);
      break;
      case 'down': this.y += 84;
      console.log(this.y);
      break;
      default: console.log("Please press the control key!");
      }
      console.log('test if ');
      console.log(this.x,this.y);
      var condition1 = (0 <= this.x && this.x <= 404);
      var condition2 = (-42 <= this.y && this.y <= 415);
        if(condition1 && condition2) {
          if (this.y === -42) {
            let box = document.getElementById('box');
            box.style.cssText = "visibility: visible";
            // update1();
            // console.log(box.nodeName);
          }

        }else {
          this.x = 101;
          this.y = 378;
          console.log(this.x,this.y);

        }
  }
}




// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

let player0 = new Player();
let allEnemies = [];
let players = [];
let enemy1 = new Enemy();
let enemy2 = new Enemy();
enemy2.x = 0;
enemy2.y = 149;
// enemy2.update = function(dt) {
//   this.x += 200*dt;
// }
let enemy3 = new Enemy();
enemy3.y = 233;

allEnemies = [enemy1,enemy2,enemy3];


let player1 = new Player();
// player1.sprite = 'images/char-cat-girl.png';
player1.x = 0;
player1.y = 378;

players = [player1,player0];
console.log(player1.sprite);
console.log(Player.render());


// function enemyMove () {
//   let allEnemies=allEnemies1.map(function (enemy) {
//     let a1 = Math.random()*3;
//     let a2 = Math.random()*300;
//     let b1 = Math.floor(a1);
//     let b2 = Math.floor(a2);
//     enemy.y = 65 + b1*84;
//     enemy.update = function(dt) {
//       enemy.x = (b2 + 5000)*dt;
//     }
//     console.log(b1,b2);
//     console.log(enemy.x,enemy.y);
//     return enemy;
//   });
//   // console.log(allEnemies);
//   return allEnemies;
//
// }

function reset() {
  // enemyMove();
  player.x = 0;
  player.y = 378;

  // console.log();
}


















// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    console.log(enemy1.x);
    console.log('test key');
    console.log(allowedKeys[e.keyCode]);
    console.log(e.target.nodeName);
    player.handleInput(allowedKeys[e.keyCode]);
});
