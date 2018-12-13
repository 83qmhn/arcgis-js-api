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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/Handles","../../../core/accessorSupport/decorators","../../../geometry/support/webMercatorUtils","../engine/BitmapContainer","./LayerView2D","./support/BitmapTile","../tiling/TileInfoView","../tiling/TileQueue","../tiling/TileStrategy","../../layers/RefreshableLayerView"],function(e,t,i,r,n,a,s,l,o,u,c,h,p,f){var d=[102113,102100,3857,3785,900913];return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._handles=new n,t._tileStrategy=null,t._tileInfoView=null,t._fetchQueue=null,t._tileRequests=new Map,t.container=new l.BitmapContainer,t.layer=null,t}return i(t,e),Object.defineProperty(t.prototype,"tileMatrixSet",{get:function(){if(this.layer.activeLayer.tileMatrixSetId)return this.layer.activeLayer.tileMatrixSet;var e=this._getTileMatrixSetBySpatialReference(this.layer.activeLayer);return e?(this.layer.activeLayer.tileMatrixSetId=e.id,e):null},enumerable:!0,configurable:!0}),t.prototype.hitTest=function(e,t){return null},t.prototype.update=function(e){this._fetchQueue.pause(),this._fetchQueue.state=e.state,this._tileStrategy.update(e),this._fetchQueue.resume(),this.notifyChange("updating")},t.prototype.attach=function(){var e=this,t=this.layer.activeLayer,i=this.tileMatrixSet;if(i){var r=i.tileInfo.spatialReference,n=t.fullExtent&&t.fullExtent.clone();r.isWebMercator?n=s.geographicToWebMercator(n):r.isWGS84||(n=i.fullExtent),this._tileInfoView=new c(i.tileInfo,n),this._fetchQueue=new h({tileInfoView:this._tileInfoView,process:function(t){return e.fetchTile(t)}}),this._tileStrategy=new p({cachePolicy:"keep",acquireTile:function(t){return e.acquireTile(t)},releaseTile:function(t){return e.releaseTile(t)},tileInfoView:this._tileInfoView}),this._handles.add(this.watch("layer.activeLayer.styleId, tileMatrixSet",function(){return e._refresh()}))}},t.prototype.detach=function(){this._handles.removeAll(),this._tileStrategy.destroy(),this._fetchQueue.clear(),this.container.removeAllChildren(),this._fetchQueue=this._tileStrategy=this._tileInfoView=this.container=null},t.prototype.moveStart=function(){this.requestUpdate()},t.prototype.viewChange=function(){this.requestUpdate()},t.prototype.moveEnd=function(){this.requestUpdate()},t.prototype.doRefresh=function(){this.updateRequested||this.suspended||this._refresh()},t.prototype.isUpdating=function(){var e=!0;return this._tileRequests.forEach(function(t){e=e&&t.isFulfilled()}),!e},t.prototype.acquireTile=function(e){var t=this,i=u.default.pool.acquire();i.key.set(e),i.resolution=this._tileInfoView.getTileResolution(i.key),this._tileInfoView.getTileCoords(i,i.key);var r=this._fetchQueue.push(i.key).then(function(e){i.source=e,i.once("attach",function(){return t.requestUpdate()}),t.container.addChild(i)});return this._tileRequests.set(i,r),this.requestUpdate(),i},t.prototype.releaseTile=function(e){var t=this._tileRequests.get(e);t.isFulfilled()||t.cancel(),this._tileRequests.delete(e),this.container.removeChild(e),this.requestUpdate()},t.prototype.fetchTile=function(e){return this.layer.fetchTile(e.level,e.row,e.col)},t.prototype.canResume=function(){var e=this.inherited(arguments);return e?null!==this.tileMatrixSet:e},t.prototype._refresh=function(){var e=this;this._fetchQueue.reset(),this._tileStrategy.tiles.forEach(function(t){if(t.source){t.source=null;var i=e._fetchQueue.push(t.key).then(function(i){t.source=i,t.requestRender(),e.notifyChange("updating")});e._tileRequests.set(t,i)}}),this.notifyChange("updating")},t.prototype._getTileMatrixSetBySpatialReference=function(e){var t=this.view.spatialReference,i=e.tileMatrixSets.find(function(e){return e.tileInfo.spatialReference.wkid===t.wkid});return!i&&t.isWebMercator&&(i=e.tileMatrixSets.find(function(e){return d.indexOf(e.tileInfo.spatialReference.wkid)>-1})),i},r([a.property({dependsOn:["tileMatrixSet"]})],t.prototype,"suspended",void 0),r([a.property({readOnly:!0,dependsOn:["view.spatialReference","layer.activeLayer"]})],t.prototype,"tileMatrixSet",null),r([a.property({dependsOn:["updateRequested","attached"]})],t.prototype,"updating",void 0),t=r([a.subclass("esri.views.2d.layers.WMTSLayerView2D")],t)}(a.declared(o,f))});