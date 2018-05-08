import './css/style.css';
import app from './js/animation.js';

function component() {
  var element = document.createElement('div');
  element.setAttribute("id", "cnvcontainer");

  element.classList.add('backgr1');
  
  var leftchild = document.createElement('div');
  leftchild.classList.add('leftside');
  
  var rightchild = document.createElement('div');
  rightchild.classList.add('rightside');
  
  element.appendChild(leftchild);
  element.appendChild(rightchild);
  
  var canvaselem = document.createElement('canvas');
  canvaselem.setAttribute("id", "mgacontainer");
  canvaselem.setAttribute("width", "1600");
  canvaselem.setAttribute("height", "1600");
  
  element.appendChild(canvaselem);
  
  var animelem = app(2);

  return element;
}

document.body.appendChild(component());