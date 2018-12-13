// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.10/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/extendsHelper","../../core/compilerUtils","../../geometry/ScreenPoint","../3d/support/mathUtils","./InputHandler"],function(t,e,n,r,a,o,i){function p(t){return!!c[t]}function s(t){for(var e=0,n=t;e<n.length;e++){if(!p(n[e]))return!1}return!0}Object.defineProperty(e,"__esModule",{value:!0});var u,c={click:!0,"double-click":!0,"immediate-click":!0,hold:!0,drag:!0,"key-down":!0,"key-up":!0,"pointer-down":!0,"pointer-move":!0,"pointer-up":!0,"pointer-drag":!0,"mouse-wheel":!0,"pointer-enter":!0,"pointer-leave":!0,gamepad:!0,focus:!0,blur:!0};!function(t){t[t.Left=0]="Left",t[t.Middle=1]="Middle",t[t.Right=2]="Right"}(u||(u={}));var d=function(){function t(t){this.handlers=new Map,this.counter=0,this.handlerCounts=new Map,this.view=t,this.inputManager=null}return t.prototype.connect=function(t){var e=this;t&&this.disconnect(),this.inputManager=t,this.handlers.forEach(function(t,n){return e.inputManager.installHandlers(n,[t])})},t.prototype.disconnect=function(){var t=this;this.inputManager&&this.handlers.forEach(function(e,n){return t.inputManager.uninstallHandlers(n)}),this.inputManager=null},t.prototype.destroy=function(){this.disconnect(),this.handlers.clear(),this.view=null},t.prototype.register=function(t,e,n){var r=this,a=Array.isArray(t)?t:t.split(",");if(!s(a))return a.some(p)&&console.error("Error: registering input events and other events on the view at the same time is not supported."),null;var o=Array.isArray(e)?e:[];n=Array.isArray(e)?n:e;var i=this.createUniqueGroupName(),u=new l(this.view,a,o,n);this.handlers.set(i,u);for(var c=0,d=a;c<d.length;c++){var g=d[c],m=this.handlerCounts.get(g)||0;this.handlerCounts.set(g,m+1)}return this.inputManager&&this.inputManager.installHandlers(i,[u]),{remove:function(){return r.removeHandler(i,a)}}},t.prototype.hasHandler=function(t){return!!this.handlerCounts.get(t)},t.prototype.removeHandler=function(t,e){if(this.handlers.has(t)){this.handlers.delete(t);for(var n=0,r=e;n<r.length;n++){var a=r[n],o=this.handlerCounts.get(a);void 0===o?console.error("Trying to remove handler for event that has no handlers registered: ",a):1===o?this.handlerCounts.delete(a):this.handlerCounts.set(a,o-1)}}this.inputManager&&this.inputManager.uninstallHandlers(t)},t.prototype.createUniqueGroupName=function(){return this.counter+=1,"viewEvents_"+this.counter},t}();e.ViewEvents=d;var l=function(t){function e(e,n,a,o){var i=t.call(this,!0)||this;i.view=e;for(var p=0,s=n;p<s.length;p++){var u=s[p];switch(u){case"click":i.registerIncoming("click",a,function(t){return o(i.wrapClick(t))});break;case"double-click":i.registerIncoming("double-click",a,function(t){return o(i.wrapDoubleClick(t))});break;case"immediate-click":i.registerIncoming("immediate-click",a,function(t){return o(i.wrapImmediateClick(t))});break;case"hold":i.registerIncoming("hold",a,function(t){return o(i.wrapHold(t))});break;case"drag":i.registerIncoming("drag",a,function(t){var e=i.wrapDrag(t);e&&o(e)});break;case"key-down":i.registerIncoming("key-down",a,function(t){return o(i.wrapKeyDown(t))});break;case"key-up":i.registerIncoming("key-up",a,function(t){return o(i.wrapKeyUp(t))});break;case"pointer-down":i.registerIncoming("pointer-down",a,function(t){return o(i.wrapPointer(t,"pointer-down"))});break;case"pointer-move":i.registerIncoming("pointer-move",a,function(t){return o(i.wrapPointer(t,"pointer-move"))});break;case"pointer-up":i.registerIncoming("pointer-up",a,function(t){return o(i.wrapPointer(t,"pointer-up"))});break;case"pointer-drag":i.registerIncoming("pointer-drag",a,function(t){return o(i.wrapPointerDrag(t))});break;case"mouse-wheel":i.registerIncoming("mouse-wheel",a,function(t){return o(i.wrapMouseWheel(t))});break;case"pointer-enter":i.registerIncoming("pointer-enter",a,function(t){return o(i.wrapPointer(t,"pointer-enter"))});break;case"pointer-leave":i.registerIncoming("pointer-leave",a,function(t){return o(i.wrapPointer(t,"pointer-leave"))});break;case"gamepad":i.registerIncoming("gamepad",a,function(t){o(i.wrapGamepad(t))});break;case"focus":i.registerIncoming("focus",a,function(t){o(i.wrapFocus(t))});break;case"blur":i.registerIncoming("blur",a,function(t){o(i.wrapBlur(t))});break;default:r.neverReached(u)}}return i}return n(e,t),e.prototype.wrapFocus=function(t){return{type:"focus",timestamp:t.timestamp,native:t.data.native,stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapBlur=function(t){return{type:"blur",timestamp:t.timestamp,native:t.data.native,stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapClick=function(t){var e=t.data,n=e.pointerType,r=e.button,o=e.buttons,i=e.x,p=e.y,s=e.native,u=e.eventId;return{type:"click",pointerType:n,button:r,buttons:o,x:i,y:p,native:s,timestamp:t.timestamp,screenPoint:new a(i,p),mapPoint:this.view.toMap(i,p),eventId:u,stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapDoubleClick=function(t){var e=t.data,n=e.pointerType,r=e.button,a=e.buttons,o=e.x,i=e.y,p=e.native,s=e.eventId;return{type:"double-click",pointerType:n,button:r,buttons:a,x:o,y:i,native:p,timestamp:t.timestamp,mapPoint:this.view.toMap(o,i),eventId:s,stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapImmediateClick=function(t){var e=t.data,n=e.pointerType,r=e.button,a=e.buttons,o=e.x,i=e.y,p=e.native,s=e.eventId;return{type:"immediate-click",pointerType:n,button:r,buttons:a,x:o,y:i,native:p,timestamp:t.timestamp,mapPoint:this.view.toMap(o,i),eventId:s,stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapHold=function(t){var e=t.data,n=e.pointerType,r=e.button,a=e.buttons,o=e.x,i=e.y;return{type:"hold",pointerType:n,button:r,buttons:a,x:o,y:i,native:e.native,timestamp:t.timestamp,mapPoint:this.view.toMap(o,i),stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapDrag=function(t){var e=t.data,n=e.center,r=n.x,a=n.y,i=e.action,p=e.pointerType,s=e.button;if("start"===i&&(this.latestDragStart=e),this.latestDragStart){var u=e.pointer.native,c=e.buttons,d=t.timestamp,l={x:this.latestDragStart.center.x,y:this.latestDragStart.center.y};return"end"===i&&(this.latestDragStart=void 0),{type:"drag",action:i,x:r,y:a,origin:l,pointerType:p,button:s,buttons:c,radius:e.radius,angle:o.rad2deg(e.angle),native:u,timestamp:d,stopPropagation:function(){return t.stopPropagation()}}}},e.prototype.wrapKeyDown=function(t){var e=t.data;return{type:"key-down",key:e.key,repeat:e.repeat,native:e.native,timestamp:t.timestamp,stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapKeyUp=function(t){var e=t.data;return{type:"key-up",key:e.key,native:e.native,timestamp:t.timestamp,stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapPointer=function(t,e){var n=t.data,r=n.x,a=n.y,o=n.button,i=n.buttons,p=n.native,s=n.eventId;return{type:e,x:r,y:a,pointerId:p.pointerId,pointerType:p.pointerType,button:o,buttons:i,native:p,timestamp:t.timestamp,eventId:s,stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapPointerDrag=function(t){var e=t.data.currentEvent,n=e.x,r=e.y,a=e.buttons,o=e.native,i=e.eventId,p=t.data.startEvent.button;return{type:"pointer-drag",x:n,y:r,pointerId:t.data.startEvent.native.pointerId,pointerType:t.data.startEvent.native.pointerType,button:p,buttons:a,action:t.data.action,origin:{x:t.data.startEvent.x,y:t.data.startEvent.y},native:o,timestamp:t.timestamp,eventId:i,stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapMouseWheel=function(t){var e=t.data;return{type:"mouse-wheel",x:e.x,y:e.y,deltaY:e.deltaY,native:e.native,timestamp:t.timestamp,stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapGamepad=function(t){var e=t.data,n=e.action,r=e.state;return{type:"gamepad",device:e.device,timestamp:t.timestamp,action:n,buttons:r.buttons,axes:r.axes,stopPropagation:function(){return t.stopPropagation()}}},e}(i.InputHandler)});