//$( document ).ready(function() {
////    canvas = document.createElement('canvas');
////    context = canvas.getContext('2d');
////    init();
//});
//
//function init() {
//    stage = new createjs.Stage("mgacontainer");
//    stage.enableDOMEvents(true);
//    createjs.Touch.enable(stage);
////    stage.style.backgroundColor = "transparent";
//    
////    ResizeFullScreen(stage.canvas);
//    
////    LoadAssets();
//}

require('latest-createjs');
import bolt from '../img/bolt@2x.png';
import boltoff from '../img/bolt-off@2x.png';
import imgd from '../img/d@2x.png';
import imgh from '../img/h@2x.png';
import imgn from '../img/n@2x.png';
import imgo1 from '../img/o-1@2x.png';
import imgo2 from '../img/o-2@2x.png';
import imgs from '../img/s@2x.png';
import imgw1 from '../img/w-1@2x.png';
import imgw2 from '../img/w-2@2x.png';
import mustdrop from '../img/must_drop.png';
import showdownoff from '../img/showdown-off.png';
import slots from '../img/slots@2x.png';
import vegas from '../img/vegas@2x.png';

export default function app(appscale) {
  var stage;
  var queue;
  var gamecontainer;
  var boltimg;
  
  document.addEventListener("DOMContentLoaded", function(event) { 
    init();
  });
  
  var init = function () {
    stage = new createjs.Stage("mgacontainer");
    stage.enableDOMEvents(true);
    createjs.Touch.enable(stage);
    
    window.addEventListener("resize", function(event){ 
      ResizeFullScreen();
    });

    window.addEventListener("onorientationchange", function(event){ 
        ResizeFullScreen();
    });

    LoadAssets();
  }
  
  var ResizeFullScreen = function() {
    var canvas=stage.canvas;
    
    var MaxX,MaxY,scaleX,scaleY,scale,center;
    
    var elementscale = document.getElementById('cnvcontainer');
    
    var MaxX, MaxY;
    
    var positionInfo = elementscale.getBoundingClientRect();
    MaxY = positionInfo.height;
    MaxX = positionInfo.width;
    
    canvas.width = MaxX;
    canvas.height = MaxY;
    canvas.style.backgroundColor = "transparent";
    
    scaleX = MaxX / (800*appscale);
    scaleY = MaxY / (800*appscale);

    scale = Math.min(scaleX, scaleY);
    
    gamecontainer.scaleX = scale;
    gamecontainer.scaleY = scale;
    
    var margin;

    if (canvas.width > canvas.height) {
      margin = (MaxX - (800*appscale) * scale) / 2;
      gamecontainer.y=0;
      gamecontainer.x=margin;
    } else {
      margin = (MaxY - (800*appscale) * scale) / 2;
      gamecontainer.y=margin;
      gamecontainer.x=0;
    }
  }
  
  var LoadAssets = function () {
    queue = new createjs.LoadQueue();

    queue.on('complete',     onComplete);
        
    queue.loadManifest([
        {id:   'bolt', src:  bolt},
        {id:   'boltoff', src:  boltoff},
        {id:   'mustdrop', src:  mustdrop},
        {id:   'showdownoff', src:  showdownoff},
        {id:   'ltr0', src:  imgs},
        {id:   'ltr1', src:  imgh},
        {id:   'ltr2', src:  imgo1},
        {id:   'ltr3', src:  imgw1},
        {id:   'ltr4', src:  imgd},
        {id:   'ltr5', src:  imgo2},
        {id:   'ltr6', src:  imgw2},
        {id:   'ltr7', src:  imgn},
        {id:   'ltr8', src:  imgh},
        {id:   'slots', src:  slots},
        {id:   'vegas', src:  vegas}
    ]);
  }

  var onComplete = function (event) {
    StartAnim();
  }
  
  var StartAnim = function () {
    
	gamecontainer = new createjs.Container();
	stage.addChild(gamecontainer);
    
    var underlay = new createjs.Bitmap(queue.getResult("showdownoff"));
    underlay.regX=underlay.image.width/2;
    underlay.regY=underlay.image.height/2;
    underlay.scaleX =1*appscale;
    underlay.scaleY =1*appscale;
    underlay.x=400*appscale;
    underlay.y=200*appscale;
    gamecontainer.addChild(underlay);
    
    var leftx = 0*appscale;
    var lefty = 36*appscale;
    
    var vegasimg = new createjs.Bitmap(queue.getResult("vegas"));
    vegasimg.regX=vegasimg.image.width/2;
    vegasimg.regY=vegasimg.image.height/2;
    vegasimg.scaleX =0.5*appscale;
    vegasimg.scaleY =0.5*appscale;
    vegasimg.x=leftx+236*appscale;
    vegasimg.y=lefty+55*appscale;
    vegasimg.alpha=0;
    gamecontainer.addChild(vegasimg);
    
    var slotsimg = new createjs.Bitmap(queue.getResult("slots"));
    slotsimg.regX=slotsimg.image.width/2;
    slotsimg.regY=slotsimg.image.height/2;
    slotsimg.scaleX =0.5*appscale;
    slotsimg.scaleY =0.5*appscale;
    slotsimg.x=leftx+590*appscale;
    slotsimg.y=lefty+55*appscale;
    slotsimg.alpha=0;
    gamecontainer.addChild(slotsimg);
    
    boltimg = new createjs.Bitmap(queue.getResult("bolt"));
    boltimg.regX=boltimg.image.width/2;
    boltimg.regY=boltimg.image.height/2;
    boltimg.scaleX =0.5*appscale;
    boltimg.scaleY =0.5*appscale;
    boltimg.x=leftx+419*appscale;
    boltimg.y=lefty+38*appscale;
    boltimg.alpha=0;
    gamecontainer.addChild(boltimg);
    
    var letters = [];
    var letterpos = [64,164,238,342,456,540,623,735]
    var pos = 64;
    
    for (var i =0;i<8;i++) {
      letters[i] = new createjs.Bitmap(queue.getResult("ltr"+i));
      letters[i].regX=letters[i].image.width/2;
      letters[i].regY=0;
      letters[i].scaleX =0.5*appscale;
      letters[i].scaleY =0.5*appscale;
      letters[i].x=leftx+letterpos[i]*appscale;
      letters[i].y=lefty+0*appscale;
      letters[i].alpha=0;
      gamecontainer.addChild(letters[i]);
    }
    
    var mustdropimg = new createjs.Bitmap(queue.getResult("mustdrop"));
    mustdropimg.regX=mustdropimg.image.width/2;
    mustdropimg.regY=mustdropimg.image.height/2;
    mustdropimg.scaleX =0.5*appscale;
    mustdropimg.scaleY =0.5*appscale;
    mustdropimg.x=leftx+401*appscale;
    mustdropimg.y=lefty+285*appscale;
    mustdropimg.alpha=0;
    gamecontainer.addChild(mustdropimg);
    
    ResizeFullScreen();
    
    createjs.Ticker.addEventListener("tick", ticksimple);
    
    createjs.Tween.get(vegasimg)
      .wait(500)
      .to({alpha: 1}, 50, createjs.Ease.sineInOut)
      .wait(300)
      .to({alpha: 0}, 50, createjs.Ease.sineInOut)
      .wait(100)
      .to({alpha: 1}, 50, createjs.Ease.sineInOut)
      .wait(100)
      .to({alpha: 0}, 50, createjs.Ease.sineInOut)
      .wait(100)
      .to({alpha: 1}, 50, createjs.Ease.sineInOut);
    
    createjs.Tween.get(slotsimg)
      .wait(500)
      .to({alpha: 1}, 50, createjs.Ease.sineInOut)
      .wait(300)
      .to({alpha: 0}, 50, createjs.Ease.sineInOut)
      .wait(100)
      .to({alpha: 1}, 50, createjs.Ease.sineInOut)
      .wait(100)
      .to({alpha: 0}, 50, createjs.Ease.sineInOut)
      .wait(100)
      .to({alpha: 1}, 50, createjs.Ease.sineInOut);
    
    for (var ii =0;ii<8;ii++) {
      createjs.Tween.get(letters[ii])
        .wait(1150+ii*100)
        .to({alpha: 1}, 100, createjs.Ease.sineInOut);
    }
    
    createjs.Tween.get(mustdropimg)
      .wait(2300)
      .to({alpha: 1}, 40, createjs.Ease.sineInOut)
      .wait(80)
      .set({alpha: 0})
      .wait(80)
      .to({alpha: 1}, 40, createjs.Ease.sineInOut)
      .wait(80)
      .set({alpha: 0})
      .wait(80)
      .to({alpha: 1}, 50, createjs.Ease.sineInOut);
    
    createjs.Tween.get(boltimg)
      .wait(1300)
      .to({alpha: 1}, 20, createjs.Ease.sineInOut)
      .call(flicklightning, [70,Math.floor(Math.random() * 50) + 1]);
  }
  
  var flicklightning = function (toalpha, timeflick) {
    var rndalpha = (toalpha<50) ? 91:1;
    createjs.Tween.get(boltimg)
      .to({alpha: toalpha/100}, timeflick, createjs.Ease.sineInOut)
      .call(flicklightning, [Math.floor(Math.random() * 10) + rndalpha,Math.floor(Math.random() * 80) + 1]);
  }
  
  
  var ticksimple =  function () { 
      stage.update();
  }

}