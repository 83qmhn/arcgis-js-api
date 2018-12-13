// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","./RasterFunctionX","./pixelShaders","./vertexShaders","./webglHelper","./convolutionKernel"],function(e,t,r,i,n,s,a){return e(null,{gl:null,rgbaFloatData:null,originalTexture:null,lastTexture:null,renderTexture:!1,constructor:function(e){this._isProgramInitialized=!1,this.gl=e&&e.gl,e&&e.renderTexture&&(this.renderTexture=e.renderTexture),this._xformSetting=e&&e._xformSetting||{requireProjection:!1,meshSize:1}},bindFrameBuffer:function(){var e=this.gl;this._setupPingPongTextures(),this._setupBranchingTextures();var t,r=this._glSetting;return this.isBranch?(r.branchIndex=(r.branchIndex+1)%r.branchCount,t=r.branches[r.branchIndex]):(r.pingpongIndex=(r.pingpongIndex+1)%r.pingpong.length,t=r.pingpong[r.pingpongIndex]),e.bindFramebuffer(e.FRAMEBUFFER,t.frameBuffer),e.activeTexture(e.TEXTURE0),e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),t},_initializeProgram:function(e){if(!this.gl)return void console.error("WebGL is required.");try{var t=this.gl,r=t.drawingBufferWidth,a=t.drawingBufferHeight;if(t.viewport(0,0,r,a),!this.rasterProgram){this._useMesh=this._tileMode&&this._xformSetting.requireProjection;var o=this._useMesh?n.mesh:n.basic,h=n.getShader(t,e.vertex||o),u=i.getShader(t,e.fragment);this.rasterProgram=this._loadProgram(h,u),this._uniforms=this._uniforms||{},this._uniforms.rasterProgram=s.getUniforms(t,this.rasterProgram)}t.useProgram(this.rasterProgram);var g=t.getAttribLocation(this.rasterProgram,"a_texCoord"),f=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,f);var l=s.createMesh(this._xformSetting.meshSize||1);t.bufferData(t.ARRAY_BUFFER,l,t.STATIC_DRAW),t.enableVertexAttribArray(g),t.vertexAttribPointer(g,2,t.FLOAT,!1,0,0),t.disable(t.DEPTH_TEST),t.blendFunc(t.SRC_ALPHA,t.ZERO),t.disable(t.BLEND),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),this._shaderInfo={fragment:e.fragmentName}}catch(e){return void console.error("webgl exception: "+e.message)}},_setUniform:function(e,t,r){if(null!=t){r&&!this._uniforms[r]&&(this._uniforms[r]=s.getUniforms(this.gl,this[r]));var i=r?this._uniforms[r]:this._uniforms.rasterProgram,n=i[e]||i[e+"[0]"];n&&s.setUniform(this.gl,n,t)}},_setUniforms:function(e,t){var r,i=Object.keys(e),n=i.length;for(r=0;r<n;r++)this._setUniform(i[r],e[i[r]],t);this.rawInput?this._setUniform("u_flipY",!0,t):this._setUniform("u_flipY",!1,t);var s,a;this._tileMode?(this.rawInput?(s=this._xformSetting.offset,a=this._xformSetting.scale):(s=[0,0],a=[1,1]),this._setUniform("u_xformOffset",s,t),this._setUniform("u_xformScale",a,t),this._xformSetting.requireProjection&&(this.rawInput?(this._setUniform("u_projection",!0,t),this._setUniform("u_meshSize",[this._xformSetting.meshSize-1,this._xformSetting.meshSize-1],t),this._setUniform("u_xformGrid",this._xformSetting.xformGrid,t)):this._setUniform("u_projection",!1,t))):(s=[0,0],a=[1,1],this._setUniform("u_xformOffset",s,t),this._setUniform("u_xformScale",a,t))},_setupTextureData:function(e,t){if(e.texture)return e;e.raster&&e.raster.pixelBlock&&(e=e.raster),this.rawInput=!0;var r,i=t&&t.notOriginal,n=t&&t.bandIDs;if(t&&t.reCreate?r=!1:(r=this._tileMode?!this._xformSetting.hasNewTexture:!this._glSetting.hasNewTexture)&&this._originalBandIDs&&(r=!!n&&this._originalBandIDs.join("")===n.join("")),this._glSetting.branchCount>0&&(r=!1),r&&this.originalTexture)return{extent:e.extent,texture:this.originalTexture};var s=this._createTexture();i||(this.originalTexture=s,this._originalBandIDs=n);var a=this.gl,o=e.pixelBlock,h=0;n&&n.length>0&&o&&(h=Math.max.apply(null,n),o.pixels.length>h&&n&&(o.pixels=n.map(function(e){return o.pixels[e]}),o.statistics&&(o.statistics=n.map(function(e){return o.statistics[e]}))));var u=o.width,g=o.height;a.getExtension("OES_texture_float");var f=o.getAsRGBAFloat();return a.texImage2D(a.TEXTURE_2D,0,a.RGBA,u,g,0,a.RGBA,a.FLOAT,f),{extent:e.extent,texture:s}},_setupPingPongTextures:function(){var e=this._glSetting;if(!e||!e.pingpong){e.pingpong=[];var t=s.createBufferTexture(this.gl,!1);e.pingpong.push(t),t=s.createBufferTexture(this.gl,!1),e.pingpong.push(t),e.pingpongIndex=1}},_setupBranchingTextures:function(){var e=this._glSetting;if(!e||!e.branches){e.branches=[];var t,r=0,i=e.branchCount;if(i>0){for(r=0;r<i;r++)t=s.createBufferTexture(this.gl,!1),e.branches.push(t);e.branchIndex=i-1}}},_setupXformTexture:function(e){var t=this._createTexture(!0),r=this.gl;return e=e||new Float32Array(1600),r.getExtension("OES_texture_float"),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,20,20,0,r.RGBA,r.FLOAT,e),t},_createTexture:function(e){return s.createTexture(this.gl,e)},_drawGL:function(e){var t=this.gl;this.renderTexture?(t.enable(t.BLEND),t.bindFramebuffer(t.FRAMEBUFFER,null)):t.disable(t.BLEND),e||t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight);var r=this._xformSetting.meshSize||1;t.drawArrays(t.TRIANGLES,0,r*r*6),this._drawMesh()},_drawMesh:function(){if(this.renderTexture&&this._glSetting.drawMesh){this.meshProgram=this.meshProgram||this._setupMeshProgram();var e=this.gl;e.useProgram(this.meshProgram),e.bindFramebuffer(e.FRAMEBUFFER,null);var t=e.getAttribLocation(this.meshProgram,"a_texCoord"),r=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,r);var i=this._xformSetting.meshSize||1,n=s.createMesh(i,!0);e.bufferData(e.ARRAY_BUFFER,n,e.STATIC_DRAW),e.enableVertexAttribArray(t),e.vertexAttribPointer(t,2,e.FLOAT,!1,0,0),e.disable(e.DEPTH_TEST),e.blendFunc(e.ONE,e.ZERO),this._setUniforms({u_color:[0,0,1,1],u_drawMeshLines:!0},"meshProgram"),e.drawArrays(e.LINES,0,i*i*10)}},_setupMeshProgram:function(){var e=n.getShader(this.gl,n.mesh),t=i.getShader(this.gl,i.constant);return this._loadProgram(e,t)},_loadProgram:function(e,t){return s.loadProgram(this.gl,e,t)},_getShaderScript:function(e,t){var r=document.getElementById(t);if(!r)return null;for(var i="",n=r.firstChild;n;)3==n.nodeType&&(i+=n.textContent),n=n.nextSibling;return i}})});