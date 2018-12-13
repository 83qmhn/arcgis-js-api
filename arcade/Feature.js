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

var __assign=this&&this.__assign||function(){return __assign=Object.assign||function(t){for(var e,r=1,i=arguments.length;r<i;r++){e=arguments[r];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t},__assign.apply(this,arguments)};define(["require","exports","../core/tsSupport/assignHelper","./Dictionary","./ImmutableArray","./languageUtils","../geometry/Geometry","../geometry/Point","../geometry/jsonUtils"],function(t,e,r,i,s,a,n,o,u){"use strict";return function(){function t(){this.declaredClass="esri.arcade.Feature",this._geometry=null,this.attributes=null,this._layer=null,this._datesfixed=!0,this.immutable=!0,this.immutable=!0}return t.createFromGraphic=function(e){var r=new t;return r._geometry=e.geometry?e.geometry:null,void 0===e.attributes?r.attributes={}:null===e.attributes?r.attributes={}:r.attributes=e.attributes,e._sourceLayer?(r._layer=e._sourceLayer,r._datesfixed=!1):e._layer?(r._layer=e._layer,r._datesfixed=!1):e.layer&&(r._layer=e.layer,r._datesfixed=!1),r},t.createFromArcadeFeature=function(e){var r=new t;return r._datesfixed=e._datesfixed,r.attributes=e.attributes,r._geometry=e._geometry,e._layer&&(r._layer=e._layer),r},t.createFromArcadeDictionary=function(e){var r=new t;return r.attributes=e.field("attributes"),null!==r.attributes&&r.attributes instanceof i?(r.attributes=r.attributes.attributes,null===r.attributes&&(r.attributes={})):r.attributes={},r._geometry=e.field("geometry"),null!==r._geometry&&(r._geometry instanceof i?r._geometry=t.parseGeometryFromDictionary(r._geometry):r._geometry instanceof n||(r._geometry=null)),r},t.createFromGraphicLikeObject=function(e,r,i){void 0===i&&(i=null);var s=new t;return null===r&&(r={}),s.attributes=r,s._geometry=e||null,s._layer=i,s._layer&&(s._datesfixed=!1),s},t.prototype.repurposeFromGraphicLikeObject=function(t,e,r){void 0===r&&(r=null),null===e&&(e={}),this.attributes=e,this._geometry=t||null,this._layer=r,this._layer?this._datesfixed=!1:this._datesfixed=!0},t.prototype.castToText=function(){var t="";for(var e in this.attributes){""!==t&&(t+=",");var r=this.attributes[e];null==r?t+=JSON.stringify(e)+":null":a.isBoolean(r)||a.isNumber(r)||a.isString(r)?t+=JSON.stringify(e)+":"+JSON.stringify(r):r instanceof n?t+=JSON.stringify(e)+":"+a.toStringExplicit(r):r instanceof s?t+=JSON.stringify(e)+":"+a.toStringExplicit(r):r instanceof Array?t+=JSON.stringify(e)+":"+a.toStringExplicit(r):r instanceof Date?t+=JSON.stringify(e)+":"+JSON.stringify(r):null!==r&&"object"==typeof r&&void 0!==r.castToText&&(t+=JSON.stringify(e)+":"+r.castToText())}return'{"geometry":'+(null===this.geometry()?"null":a.toStringExplicit(this.geometry()))+',"attributes":{'+t+"}}"},t.prototype._fixDates=function(){for(var t=[],e=0;e<this._layer.fields.length;e++){var r=this._layer.fields[e];"date"!==r.type&&"esriFieldTypeDate"!==r.type||t.push(r.name)}t.length>0&&this._fixDateFields(t),this._datesfixed=!0},t.prototype._fixDateFields=function(t){this.attributes=r({},this.attributes);for(var e=0;e<t.length;e++){var i=this.attributes[t[e]];if(null===i);else if(void 0===i){for(var s in this.attributes)if(s.toLowerCase()===t[e]){i=this.attributes[s],null!==i&&(i instanceof Date||(this.attributes[s]=new Date(i)));break}}else i instanceof Date||(this.attributes[t[e]]=new Date(i))}},t.prototype.geometry=function(){return null===this._geometry?this._geometry:this._geometry instanceof n?this._geometry:(this._geometry=u.fromJson(this._geometry),this._geometry)},t.prototype.field=function(t){!1===this._datesfixed&&this._fixDates();var e=t.toLowerCase(),r=this.attributes[t];if(void 0!==r)return r;for(var i in this.attributes)if(i.toLowerCase()===e)return this.attributes[i];if(this._hasFieldDefinition(e))return null;throw new Error("Field not Found")},t.prototype._hasFieldDefinition=function(t){if(null===this._layer)return!1;for(var e=0;e<this._layer.fields.length;e++){if(this._layer.fields[e].name.toLowerCase()===t)return!0}return!1},t.prototype._field=function(t){!1===this._datesfixed&&this._fixDates();var e=t.toLowerCase(),r=this.attributes[t];if(void 0!==r)return r;for(var i in this.attributes)if(i.toLowerCase()===e)return this.attributes[i];return null},t.prototype.setField=function(t,e){if(this.immutable)throw new Error("Feature is Immutable");if(!1===a.isSimpleType(e))throw new Error("Illegal Value Assignment to Feature");var r=t.toLowerCase();if(void 0!==this.attributes[t])return void(this.attributes[t]=e);for(var i in this.attributes)if(i.toLowerCase()===r)return void(this.attributes[i]=e);this.attributes[t]=e},t.prototype.hasField=function(t){var e=t.toLowerCase();if(void 0!==this.attributes[t])return!0;for(var r in this.attributes)if(r.toLowerCase()===e)return!0;return!!this._hasFieldDefinition(e)},t.prototype.keys=function(){var t=[],e={};for(var r in this.attributes)t.push(r),e[r.toLowerCase()]=1;if(null!==this._layer)for(var i=0;i<this._layer.fields.length;i++){var s=this._layer.fields[i];1!==e[s.name.toLowerCase()]&&t.push(s.name)}return t=t.sort()},t.parseGeometryFromDictionary=function(e){var r=t.convertDictionaryToJson(e,!0);return void 0!==r.spatialreference&&(r.spatialReference=r.spatialreference,delete r.spatialreference),void 0!==r.rings&&(r.rings=this.fixPathArrays(r.rings,!0===r.hasZ,!0===r.hasM)),void 0!==r.paths&&(r.paths=this.fixPathArrays(r.paths,!0===r.hasZ,!0===r.hasM)),void 0!==r.points&&(r.points=this.fixPointArrays(r.points,!0===r.hasZ,!0===r.hasM)),u.fromJson(r)},t.fixPathArrays=function(t,e,r){var i=[];if(t instanceof Array)for(var a=0;a<t.length;a++)i.push(this.fixPointArrays(t[a],e,r));else if(t instanceof s)for(var a=0;a<t.length();a++)i.push(this.fixPointArrays(t.get(a),e,r));return i},t.fixPointArrays=function(t,e,r){var i=[];if(t instanceof Array)for(var a=0;a<t.length;a++){var n=t[a];n instanceof o?e&&r?i.push([n.x,n.y,n.z,n.m]):e?i.push([n.x,n.y,n.z]):r?i.push([n.x,n.y,n.m]):i.push([n.x,n.y]):i.push(n)}else if(t instanceof s)for(var a=0;a<t.length();a++){var n=t.get(a);n instanceof o?e&&r?i.push([n.x,n.y,n.z,n.m]):e?i.push([n.x,n.y,n.z]):r?i.push([n.x,n.y,n.m]):i.push([n.x,n.y]):i.push(n)}return i},t.convertDictionaryToJson=function(e,r){void 0===r&&(r=!1);var s={};for(var a in e.attributes){var n=e.attributes[a];n instanceof i&&(n=t.convertDictionaryToJson(n)),r?s[a.toLowerCase()]=n:s[a]=n}return s},t.parseAttributesFromDictionary=function(t){var e={};for(var r in t.attributes){var i=t.attributes[r];if(!a.isSimpleType(i))throw new Error("Illegal Argument");e[r]=i}return e},t.fromJson=function(e){var r=null;null!==e.geometry&&void 0!==e.geometry&&(r=u.fromJson(e.geometry));var i={};if(null!==e.attributes&&void 0!==e.attributes)for(var s in e.attributes){var n=e.attributes[s];if(null===n)i[s]=n;else{if(!(a.isString(n)||a.isNumber(n)||a.isBoolean(n)||a.isDate(n)))throw new Error("Illegal Argument");i[s]=n}}return t.createFromGraphicLikeObject(r,i,null)},t.prototype.domainValueLookup=function(t,e,r){if(null===this._layer)return null;if(!this._layer.fields)return null;var i=a.getDomain(t,this._layer,this,r);if(void 0===e)try{e=this.field(t)}catch(t){return null}return a.getDomainValue(i,e)},t.prototype.domainCodeLookup=function(t,e,r){if(null===this._layer)return null;if(!this._layer.fields)return null;if(void 0===e){try{e=this.field(t)}catch(t){return null}return e}var i=a.getDomain(t,this._layer,this,r);return a.getDomainCode(i,e)},t}()});