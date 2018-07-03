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
    this.y = 149;
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
        this.y = 149 + 84*Math.floor(3*Math.random());
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
    this.y = 462;
  }

/**
检测碰撞
**/
  checkCollisions(dt) {
    let charBoy = this;
    allEnemies.forEach (function(enemy) {
    //计算玩家和敌人之间的距离(xDiff,yDiff)，设置碰撞条件(xCond,yCond)
    let xDiff = charBoy.x - enemy['x'];
    let xCond = (Math.abs(xDiff)<=65);
    let yDiff = charBoy.y - enemy['y'];
    let yCond = (Math.abs(yDiff) <= 50.5);
//当同时满足xCond,yCond,则玩家和敌人碰撞，重置玩家位置
      if (xCond && yCond) {
       charBoy.x = 0;
       charBoy.y = 462;
      }

    });
  }


  update(dt) {

  }


   render() {
    // console.log("test render");
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }




/**
*@description 控制玩家行动，当玩家坐标为（x,42）时，即到达河流，此时出现游戏完成的弹框
*@constructor
**/

  handleInput(key) {
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
      //确保玩家不会走出游戏界面外（如果移动之后超出游戏界面，则立即重置玩家状态）
      var condition1 = (0 <= this.x && this.x <= 404);
      var condition2 = (42 <= this.y && this.y <= 462);
        if(condition1 && condition2) {
          if (this.y === 42) {
            popBox.style.cssText = "visibility: visible";
            //控制当页面弹框时，游戏界面不能点击(隐藏游戏界面)
            gameShow[0].style.cssText = "visibility: hidden";
          }

        }else {
          this.x = 101;
          this.y = 462;
          console.log(this.x,this.y);

        }
  }
}




// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

let popBox = document.getElementById('pop-box');
let gameShow = document.getElementsByTagName('body');
let player = new Player();
let allEnemies = [];
let enemy1 = new Enemy();
let enemy2 = new Enemy();
enemy2.x = 0;
enemy2.y = 233;
enemy2.update = function(dt) {
  this.x += 200*dt;
}
let enemy3 = new Enemy();
enemy3.y = 317;
let enemy4 = new Enemy();
enemy4.x = 50;

//将enemy添加到数组中
allEnemies = [enemy1,enemy2,enemy3,enemy4];


/**
*@description 重置玩家的位置以及敌人的位置，隐藏弹框，恢复游戏界面
*@constructor
**/

function reset() {
  player.x = 202;
  player.y = 462;
  allEnemies.forEach(function(enemy) {
    enemy.x = 0;
  });
  popBox.style.cssText = "visibility: hidden";
  gameShow[0].style.cssText = "visibility: visible";

}




// 监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
