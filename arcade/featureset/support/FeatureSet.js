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

define(["require","exports","dojo/Deferred","dojo/promise/Promise","../support/FeatureSetIterator","../support/IdSet","../support/shared","../support/WhereClause","./ArcadeExporter","./BigDataFeatureSetIterator","./cache","./Guid","./stats","../../../geometry/geometryEngineAsync","../../../SpatialReference"],function(e,t,r,n,a,i,s,o,c,u,l,p,h,f,d){"use strict";var _=0;return function(){function e(e){this._bigdCacheId=p.raw(),this.recentlyUsedQueries=null,this._idstates=[],this._parent=null,this._wset=null,this._mainSetInUse=null,this._maxProcessing=200,this._maxQuery=500,this._totalCount=-1,this._databaseType=s.FeatureServiceDatabaseType.NotEvaluated,this._databaseTypeProbed=null,this.declaredRootClass="esri.arcade.featureset.support.FeatureSet",this._featureCache=[],this.types=null,this.fields=null,this.geometryType="",this.objectIdField="",this.spatialReference=null,this.hasM=!1,this.hasZ=!1,this._transparent=!1,this.loaded=!1,this._loadPromise=null,e&&e.lrucache&&(this.recentlyUsedQueries=e.lrucache)}return e.prototype.optimisePagingFeatureQueries=function(e){this._parent&&this._parent.optimisePagingFeatureQueries(e)},e.prototype._hasMemorySource=function(){return!0},e.prototype.prop=function(e,t){return void 0===t?this[e]:(void 0!==this[e]&&(this[e]=t),this)},e.prototype.end=function(){return null!==this._parent&&!0===this._parent._transparent?this._parent.end():this._parent},e.prototype._ensureLoaded=function(){return this.load()},e.prototype.load=function(){var e=this;return null===this._loadPromise&&(this._loadPromise=new r),null!==this._parent&&(!0===this._parent.loaded?!1===this._loadPromise.isFulfilled()&&(this._initialiseFeatureSet(),this._loadPromise.resolve(this)):this._parent.load().then(function(){try{e._initialiseFeatureSet(),e._loadPromise.resolve(e)}catch(t){e._loadPromise.reject(t)}})),this._loadPromise.promise},e.prototype._initialiseFeatureSet=function(){null!==this._parent?(this.fields=this._parent.fields.slice(0),this.geometryType=this._parent.geometryType,this.objectIdField=this._parent.objectIdField,this.spatialReference=this._parent.spatialReference,this.hasM=this._parent.hasM,this.hasZ=this._parent.hasZ,this.typeIdField=this._parent.typeIdField,this.types=this._parent.types):(this.fields=[],this.typeIdField="",this.objectIdField="",this.spatialReference=new d({wkid:4326}),this.geometryType=s.layerGeometryEsriConstants.point)},e.prototype.getField=function(e,t){var r;return t=t||this.fields,t&&(e=e.toLowerCase(),t.some(function(t){return t&&t.name.toLowerCase()===e&&(r=t),!!r})),r},e.prototype._maxProcessingRate=function(){return null!==this._parent?Math.min(this._maxProcessing,this._parent._maxProcessingRate()):Math.min(this._maxProcessing,this._maxQueryRate())},e.prototype._maxQueryRate=function(){return null!==this._parent?Math.max(this._maxQuery,this._parent._maxQueryRate()):this._maxQuery},e.prototype._checkCancelled=function(e){if(null!==e&&e.isCanceled())throw new Error("Operation has been cancelled.")},e.prototype._canDoAggregates=function(e,t,n,a,i){var s=new r;return null!==this._parent?this._parent._canDoAggregates(e,t,n,a,i):(s.resolve(!1),s.promise)},e.prototype._getAggregatePagesDataSourceDefinition=function(e,t,n,a,i,s,o){var c=new r;return null!==this._parent?this._parent._getAggregatePagesDataSourceDefinition(e,t,n,a,i,s,o):(c.reject(new Error("Should never be called")),c.promise)},e.prototype._getAgregagtePhysicalPage=function(e,t,n){var a=new r;return null!==this._parent?this._parent._getAgregagtePhysicalPage(e,t,n):(a.reject(new Error("Should never be called")),a.promise)},e.prototype.databaseType=function(){var e=this,t=new r;if(this._databaseType===s.FeatureServiceDatabaseType.NotEvaluated){if(null!==l.applicationCache){var n=l.applicationCache.getDatabaseType(this._cacheableFeatureSetSourceKey());if(null!==n)return n}if(null!==this._databaseTypeProbed)return this._databaseTypeProbed.then(s.callback(function(e){t.resolve(e)},t),s.errback(t)),t.promise;var a=[{thetype:s.FeatureServiceDatabaseType.SqlServer,testwhere:"(CAST( '2015-01-01' as DATETIME) = CAST( '2015-01-01' as DATETIME)) AND OBJECTID<0"},{thetype:s.FeatureServiceDatabaseType.Oracle,testwhere:"(TO_DATE('2003-11-18','YYYY-MM-DD') = TO_DATE('2003-11-18','YYYY-MM-DD')) AND OBJECTID<0"},{thetype:s.FeatureServiceDatabaseType.Standardised,testwhere:"(date '2015-01-01 10:10:10' = date '2015-01-01 10:10:10') AND OBJECTID<0"}];this._databaseTypeProbed=t,null!==l.applicationCache&&l.applicationCache.setDatabaseType(this._cacheableFeatureSetSourceKey(),t.promise),this._getDatabaseTypeImpl(a,0).then(s.callback(function(r){e._databaseType=r,t.resolve(e._databaseType)},t),function(r){null!==l.applicationCache&&l.applicationCache.clearDatabaseType(e._cacheableFeatureSetSourceKey()),t.reject(r)})}else t.resolve(this._databaseType);return t.promise},e.prototype._cacheableFeatureSetSourceKey=function(){return"MUSTBESET"},e.prototype._getDatabaseTypeImpl=function(e,t){var n=this,a=new r;return t>=e.length?a.resolve(s.FeatureServiceDatabaseType.Standardised):this._runDatabaseProbe(e[t].testwhere).then(s.callback(function(r){!0===r?a.resolve(e[t].thetype):n._getDatabaseTypeImpl(e,t+1).then(s.callback(function(e){a.resolve(e)},a),s.errback(a))},a),s.errback(a)),a.promise},e.prototype._runDatabaseProbe=function(e){var t=new r;return t.reject(new Error("Not Implemented")),t.promise},e.prototype._featureFromCache=function(e){if(void 0!==this._featureCache[e])return this._featureCache[e]},e.prototype._isInFeatureSet=function(e){return s.IdState.Unknown},e.prototype._getSet=function(e){return(new r).promise},e.prototype._getFeature=function(e,t,n){var a=this,i=new r;try{this._checkCancelled(n),void 0!==this._featureFromCache(t)?i.resolve(this._featureFromCache(t)):this._getFeatures(e,t,this._maxProcessingRate(),n).then(s.callback(function(){a._checkCancelled(n),void 0!==a._featureFromCache(t)?i.resolve(a._featureFromCache(t)):i.reject(new Error("Feature Not Found"))},i),s.errback(i))}catch(e){i.reject(e)}return i.promise},e.prototype._getFeatures=function(e,t,n,a){var i=new r;return i.resolve("success"),i.promise},e.prototype._getFilteredSet=function(e,t,n,a,i){return(new r).promise},e.prototype._refineSetBlock=function(e,t,n){var a=this,i=new r;try{if(!0===this._checkIfNeedToExpandCandidatePage(e,this._maxQueryRate(),n))return this._expandPagedSet(e,this._maxQueryRate(),0,0,n).then(s.callback(function(){a._refineSetBlock(e,t,n).then(s.callback(function(e){i.resolve(e)},i),s.errback(i))},i),s.errback(i)),i.promise;this._checkCancelled(n);var o=e._candidates.length;this._refineKnowns(e,t);var c=o-e._candidates.length;0===e._candidates.length?i.resolve(e):c>=t?i.resolve(e):this._refineIfParentKnown(e,t-c,n).then(s.callback(function(){if(a._checkCancelled(n),a._refineKnowns(e,t-c),(c=o-e._candidates.length)<t&&e._candidates.length>0){var r=t-c,u=a._prepareFetchAndRefineSet(e._candidates,a._maxQueryRate());a._fetchAndRefineFeatures(u,u.length>r?r:e._candidates.length,n).then(s.callback(function(){a._checkCancelled(n),a._refineKnowns(e,t-c),i.resolve(e)},i),s.errback(i))}else i.resolve(e)},i),s.errback(i))}catch(e){i.reject(e)}return i.promise},e.prototype._fetchAndRefineFeatures=function(e,t,r){return null},e.prototype._prepareFetchAndRefineSet=function(e,t){for(var r=[],n=0;n<e.length;n++)this._isPhysicalFeature(e[n])&&r.push(e[n]);return r},e.prototype._isPhysicalFeature=function(e){return null===this._parent||this._parent._isPhysicalFeature(e)},e.prototype._refineKnowns=function(e,t){var r=0,n=null,a=[];t=this._maxQueryRate();for(var i=0;i<e._candidates.length&&"GETPAGES"!==e._candidates[i];i++){var o=!1,c=this._candidateIdTransform(e._candidates[i]);c!==e._candidates[i]&&(o=!0);var u=this._isInFeatureSet(c);if(u===s.IdState.InFeatureSet)!0===o?e._known.indexOf(c)<0&&(e._known.push(c),r+=1):(e._known.push(e._candidates[i]),r+=1),null===n?n={start:i,end:i}:n.end===i-1?n.end=i:(a.push(n),n={start:i,end:i});else if(u===s.IdState.NotInFeatureSet)null===n?n={start:i,end:i}:n.end===i-1?n.end=i:(a.push(n),n={start:i,end:i}),r+=1;else if(u===s.IdState.Unknown&&(r+=1,!0===e._ordered))break;if(r>=t)break}null!==n&&a.push(n);for(var l=a.length-1;l>=0;l--)e._candidates.splice(a[l].start,a[l].end-a[l].start+1)},e.prototype._refineIfParentKnown=function(e,t,n){var a=this,o=new r,c=new i([],[],e._ordered,null);return c._candidates=e._candidates.slice(0),this._parent._refineSetBlock(c,t,n).then(s.callback(function(t){a._parent._transformSetWithIdChanges(e),o.resolve(t)},o),s.errback(o)),o.promise},e.prototype._candidateIdTransform=function(e){return this._parent._candidateIdTransform(e)},e.prototype._transformSetWithIdChanges=function(e){this._parent._transformSetWithIdChanges(e)},e.prototype._checkIfNeedToExpandKnownPage=function(e,t,r){if(null===e.pagesDefinition)return!1;for(var n=0,a=e._lastFetchedIndex;a<e._known.length;a++){if("GETPAGES"===e._known[a])return!0;if(void 0===this._featureCache[e._known[a]]&&(n+=1)>=t)break}return!1},e.prototype._checkIfNeedToExpandCandidatePage=function(e,t,r){if(null===e.pagesDefinition)return!1;for(var n=0,a=0;a<e._candidates.length;a++){if("GETPAGES"===e._candidates[a])return!0;if((n+=1)>=t)break}return!1},e.prototype._expandPagedSet=function(e,t,n,a,i){if(null===this._parent){var s=new r;return s.reject(new Error("Parent Paging not implemented")),s.promise}return this._parent._expandPagedSet(e,t,n,a,i)},e.prototype._expandPagedSetFeatureSet=function(e,t,n,a,i){var o=this,c=new r;return e._known.length>0&&"GETPAGES"===e._known[e._known.length-1]&&(a=1),0===a&&e._candidates.length>0&&"GETPAGES"===e._candidates[e._candidates.length-1]&&(a=2),0===a?c.resolve("finished"):this._getPage(e,a,i).then(s.callback(function(r){n+r<t?o._expandPagedSet(e,t,n+r,0,i).then(s.callback(function(e){c.resolve(e)},c),s.errback(c)):c.resolve("success")},c),s.errback(c)),c.promise},e.prototype._getPage=function(e,t,n){var a=this,i=new r,o=1===t?e._known:e._candidates;if(e.pagesDefinition.internal.set.length>e.pagesDefinition.resultOffset||!0===e.pagesDefinition.internal.fullyResolved){o.length=o.length-1;for(var c=0,u=0;u<e.pagesDefinition.resultRecordCount&&!(e.pagesDefinition.resultOffset+u>=e.pagesDefinition.internal.set.length);u++)o[o.length]=e.pagesDefinition.internal.set[e.pagesDefinition.resultOffset+u],c++;e.pagesDefinition.resultOffset+=e.pagesDefinition.resultRecordCount;var l=!1;!0===e.pagesDefinition.internal.fullyResolved&&e.pagesDefinition.internal.set.length<=e.pagesDefinition.resultOffset&&(l=!0),!1===l&&o.push("GETPAGES"),i.resolve(c)}else this._getPhysicalPage(e,t,n).then(s.callback(function(){a._getPage(e,t,n).then(s.callback(function(e){i.resolve(e)},i),s.errback(i))},i),s.errback(i));return i.promise},e.prototype._getPhysicalPage=function(e,t,r){return null},e.prototype._clonePageDefinition=function(e){return null===this._parent?null:this._parent._clonePageDefinition(e)},e.prototype._first=function(e){var t=this,n=new r;return this.shouldBeResolvedAsBigData()?this.expressAsArcadeScript().then(function(e){try{e.script+="\n return first("+e.featuresetIdentifier+")";var r=t.sourceGeoAnalyticsProvider();null===r?n.reject(new Error("No Big Data Provider")):r.executeScript(e.script,e.globals,e.spatialReference).then(function(e){n.resolve(e)},function(e){n.reject(e)})}catch(e){n.reject(e)}},function(e){n.reject(e)}):this.iterator(e).next().then(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},e.prototype.first=function(){var e=new r;return this._first(e.promise).then(function(t){e.resolve(t)},function(t){e.reject(t)}),e.promise},e.prototype._qStat=function(e,t,n,a){var i=this,o=new r;return this.shouldBeResolvedAsBigData()?this._qBigDataStat(e,t,n,a):(this._ensureLoaded().then(s.callback(function(){i._stat(e,t,"",null,null,n,a).then(s.callback(function(r){!1===r.calculated?i._manualStat(e,t,n,a).then(s.callback(function(e){o.resolve(e.result)},o),s.errback(o)):o.resolve(r.result)},o),s.errback(o))},o),s.errback(o)),o.promise)},e.prototype._manualStat=function(e,t,n,a){var i=new r;switch(e.toLowerCase()){case"count":h.count(this,a).then(s.callback(function(e){i.resolve({calculated:!0,result:e})},i),s.errback(i));break;case"distinct":h.distinct(this,t,n).then(s.callback(function(e){i.resolve({calculated:!0,result:e})},i),s.errback(i));break;case"avg":case"mean":h.mean(this,t,a).then(s.callback(function(e){i.resolve({calculated:!0,result:e})},i),s.errback(i));break;case"stdev":h.stdev(this,t,a).then(s.callback(function(e){i.resolve({calculated:!0,result:e})},i),s.errback(i));break;case"variance":h.variance(this,t,a).then(s.callback(function(e){i.resolve({calculated:!0,result:e})},i),s.errback(i));break;case"sum":h.sum(this,t,a).then(s.callback(function(e){i.resolve({calculated:!0,result:e})},i),s.errback(i));break;case"min":h.min(this,t,a).then(s.callback(function(e){i.resolve({calculated:!0,result:e})},i),s.errback(i));break;case"max":h.max(this,t,a).then(s.callback(function(e){i.resolve({calculated:!0,result:e})},i),s.errback(i));break;default:i.resolve({calculated:!0,result:0})}return i.promise},e.prototype._stat=function(e,t,n,a,i,o,c){var u=this,l=new r;return this._parent._stat(e,t,n,a,i,o,c).then(s.callback(function(r){!1===r.calculated?null===i&&""===n&&null===a?u._manualStat(e,t,o,c).then(s.callback(function(e){l.resolve(e)},l),s.errback(l)):l.resolve({calculated:!1}):l.resolve(r)},l),s.errback(l)),l.promise},e.prototype._unionAllGeomSelf=function(){var e=new r;if(this.shouldBeResolvedAsBigData())return this._qBigDataStat("geometryunion",null,-1,null);var t=this.iterator(e.promise),n=[];return this._unionShapeInBatches(n,t,s.callback(function(t){e.resolve(t)},e),s.errback(e)),e.promise},e.prototype._unionAllGeom=function(e){var t=new r,n=this.iterator(e),a=[];return this._unionShapeInBatches(a,n,s.callback(function(e){t.resolve(e)},t),s.errback(t)),t.promise},e.prototype._unionShapeInBatches=function(e,t,n,a){var i=this,s=new r;return t.next().then(function(r){try{null!==r&&null!==r.geometry&&e.push(r.geometry),e.length>30||null===r&&e.length>1?f.union(e).then(function(s){try{null===r?n(s):(e=[s],i._unionShapeInBatches(e,t,n,a))}catch(e){a(e)}},a):null===r?n(1===e.length?e[0]:null):i._unionShapeInBatches(e,t,n,a)}catch(e){a(e)}},a),s.promise},e.prototype.iterator=function(e){return this.shouldBeResolvedAsBigData()?new u(this,e):new a(this,e)},e.prototype.intersection=function(t,r){return void 0===r&&(r=!1),e._featuresetFunctions.intersection.bind(this)(t,r)},e.prototype.difference=function(t,r,n){return void 0===r&&(r=!1),void 0===n&&(n=!0),e._featuresetFunctions.difference.bind(this)(t,r,n)},e.prototype.symmetricDifference=function(t,r,n){return void 0===r&&(r=!1),void 0===n&&(n=!0),e._featuresetFunctions.symmetricDifference.bind(this)(t,r,n)},e.prototype.morphShape=function(t,r,n,a){return void 0===n&&(n="unknown"),void 0===a&&(a=null),e._featuresetFunctions.morphShape.bind(this)(t,r,n,a)},e.prototype.morphShapeAndAttributes=function(t,r,n){return void 0===n&&(n="unknown"),e._featuresetFunctions.morphShapeAndAttributes.bind(this)(t,r,n)},e.prototype.union=function(t,r){return void 0===r&&(r=!1),e._featuresetFunctions.union.bind(this)(t,r)},e.prototype.intersects=function(t){return e._featuresetFunctions.intersects.bind(this)(t)},e.prototype.envelopeIntersects=function(t){return e._featuresetFunctions.envelopeIntersects.bind(this)(t)},e.prototype.contains=function(t){return e._featuresetFunctions.contains.bind(this)(t)},e.prototype.overlaps=function(t){return e._featuresetFunctions.overlaps.bind(this)(t)},e.prototype.relate=function(t,r){return e._featuresetFunctions.relate.bind(this)(t,r)},e.prototype.within=function(t){return e._featuresetFunctions.within.bind(this)(t)},e.prototype.touches=function(t){return e._featuresetFunctions.touches.bind(this)(t)},e.prototype.top=function(t){return e._featuresetFunctions.top.bind(this)(t)},e.prototype.crosses=function(t){return e._featuresetFunctions.crosses.bind(this)(t)},e.prototype.buffer=function(t,r,n,a){return void 0===a&&(a=!0),e._featuresetFunctions.buffer.bind(this)(t,r,n,a)},e.prototype.filter=function(t,r){return void 0===r&&(r=null),e._featuresetFunctions.filter.bind(this)(t,r)},e.prototype.orderBy=function(t){return e._featuresetFunctions.orderBy.bind(this)(t)},e.prototype.dissolve=function(t,r){return e._featuresetFunctions.dissolve.bind(this)(t,r)},e.prototype.summarize=function(t,r){return e._featuresetFunctions.summarize.bind(this)(t,r)},e.prototype.summarizeBins=function(t,r,n,a){return e._featuresetFunctions.summarizeBins.bind(this)(t,r,n,a)},e.prototype.aggregate=function(t,r){return e._featuresetFunctions.aggregate.bind(this)(t,r)},e.prototype.reduce=function(e,t){void 0===t&&(t=null);var n=new r;return this._reduceImpl(this.iterator(n.promise),e,t,0,s.callback(function(e){n.resolve(e)},n),s.errback(n),0),n.promise},e.prototype._reduceImpl=function(e,t,r,a,i,s,o){var c=this;try{if(++o>1e3)return void setTimeout(function(){o=0,c._reduceImpl(e,t,r,a,i,s,o)});e.next().then(function(u){try{if(null===u)i(r);else{var l=t(r,u,a,c);l instanceof n?l.then(function(r){c._reduceImpl(e,t,r,a+1,i,s,o)},s):c._reduceImpl(e,t,l,a+1,i,s,o)}}catch(e){s(e)}},s)}catch(e){s(e)}},e.prototype.removeField=function(t){return e._featuresetFunctions.removeField.bind(this)(t)},e.prototype.addField=function(t,r,n){return void 0===n&&(n=null),e._featuresetFunctions.addField.bind(this)(t,r,n)},e.prototype.sumArea=function(e,t){void 0===t&&(t=!1);var n=s.convertSquareUnitsToCode(e);return this.shouldBeResolvedAsBigData()?this._qBigDataStat(t?"sumareageodesic":"sumarea",null,n,null):this.reduce(function(e,a){if(null===a.geometry)return 0;var i=new r;return t?f.geodesicArea(a.geometry,n).then(s.callback(function(t){i.resolve(e+t)},i),s.errback(i)):f.planarArea(a.geometry,n).then(s.callback(function(t){i.resolve(e+t)},i),s.errback(i)),i.promise},0)},e.prototype.sumLength=function(e,t){void 0===t&&(t=!1);var n=s.convertLinearUnitsToCode(e);return this.shouldBeResolvedAsBigData()?this._qBigDataStat(t?"sumlengthgeodesic":"sumlength",null,n,null):this.reduce(function(e,a){if(null===a.geometry)return 0;var i=new r;return t?f.geodesicLength(a.geometry,n).then(s.callback(function(t){i.resolve(e+t)},i),s.errback(i)):f.planarLength(a.geometry,n).then(s.callback(function(t){i.resolve(e+t)},i),s.errback(i)),i.promise},0)},e.prototype._substituteVars=function(e,t){if(null!==t){var r={};for(var n in t)r[n.toLowerCase()]=t[n];e.setVariablesDictionary(r)}},e.prototype.distinct=function(e,t,n){void 0===t&&(t=1e3),void 0===n&&(n=null);var a=o.create(e);this._substituteVars(a,n);var i=new r;return this._qStat("distinct",a,t,i.promise).then(s.callback(function(e){i.resolve(e)},i),s.errback(i)),i.promise},e.prototype.min=function(e,t){void 0===t&&(t=null);var n=o.create(e);this._substituteVars(n,t);var a=new r;return this._qStat("min",n,-1,a.promise).then(s.callback(function(e){a.resolve(e)},a),s.errback(a)),a.promise},e.prototype.max=function(e,t){void 0===t&&(t=null);var n=o.create(e);this._substituteVars(n,t);var a=new r;return this._qStat("max",n,-1,a.promise).then(s.callback(function(e){a.resolve(e)},a),s.errback(a)),a.promise},e.prototype.avg=function(e,t){void 0===t&&(t=null);var n=o.create(e);this._substituteVars(n,t);var a=new r;return this._qStat("avg",n,-1,a.promise).then(s.callback(function(e){a.resolve(e)},a),s.errback(a)),a.promise},e.prototype.sum=function(e,t){void 0===t&&(t=null);var n=o.create(e);this._substituteVars(n,t);var a=new r;return this._qStat("sum",n,-1,a.promise).then(s.callback(function(e){a.resolve(e)},a),s.errback(a)),a.promise},e.prototype.stdev=function(e,t){void 0===t&&(t=null);var n=o.create(e);this._substituteVars(n,t);var a=new r;return this._qStat("stdev",n,-1,a.promise).then(s.callback(function(e){a.resolve(e)},a),s.errback(a)),a.promise},e.prototype.variance=function(e,t){void 0===t&&(t=null);var n=o.create(e);this._substituteVars(n,t);var a=new r;return this._qStat("variance",n,-1,a.promise).then(s.callback(function(e){a.resolve(e)},a),s.errback(a)),a.promise},e.prototype.count=function(){var e=new r;return this._qStat("count",o.create("1"),-1,e.promise).then(s.callback(function(t){e.resolve(t)},e),s.errback(e)),e.promise},e.prototype.forEach=function(e){var t=new r;return this._forEachImpl(this.iterator(t.promise),e,this,s.callback(function(e){t.resolve(e)},t),s.errback(t),0),t.promise},e.prototype._forEachImpl=function(e,t,r,a,i,s){var o=this;try{if(++s>1e3)return void setTimeout(function(){s=0,o._forEachImpl(e,t,r,a,i,s)},0);e.next().then(function(c){try{if(null===c)a(r);else{var u=t(c);void 0===u||null===u?o._forEachImpl(e,t,r,a,i,s):u instanceof n?u.then(function(){try{o._forEachImpl(e,t,r,a,i,s)}catch(e){i(e)}},i):o._forEachImpl(e,t,r,a,i,s)}}catch(e){i(e)}},i)}catch(e){i(e)}},e.prototype.convertToJSON=function(){for(var e=new r,t={layerDefinition:{geometryType:this.geometryType,fields:[]},featureSet:{features:[],geometryType:this.geometryType}},n=0;n<this.fields.length;n++)t.layerDefinition.fields.push(s.esriFieldToJson(this.fields[n]));return this.reduce(function(e){var r={geometry:e.geometry&&e.geometry.toJson(),attributes:{}};for(var n in e.attributes)r.attributes[n]=e.attributes[n];return t.featureSet.features.push(r),1},0).then(function(){e.resolve(t)},function(t){e.reject(t)}),e.promise},e.prototype.canBeBigDataFeatureSet=function(){return this._parent.canBeBigDataFeatureSet()},e.prototype.shouldBeResolvedAsBigData=function(){return this._parent.shouldBeResolvedAsBigData()},e.prototype.expressAsArcadeScript=function(){var e=this,t=new r;return this._ensureLoaded().then(function(){try{var r={featuresetIdentifier:"",script:"",spatialReference:e.spatialReference,globals:{},functions:{stack:[],lkp:{}},symbols:{syms:{},featuresetsyms:[],symc:0}};r.script=e.expressAsArcadeScriptImpl(r.functions,r.globals,r.symbols);for(var n="",a=0,i=r.functions.stack;a<i.length;a++){n+="\n"+i[a].script}r.script=n+r.script,r.featuresetIdentifier=r.symbols.featuresetsyms[r.symbols.featuresetsyms.length-1],t.resolve(r)}catch(e){t.reject(e)}},function(e){t.reject(e)}),t.promise},e.prototype.expressAsArcadeScriptImpl=function(e,t,r){return this._parent.expressAsArcadeScriptImpl(e,t,r)+"\n"+this.arcadeScriptStep(e,t,r)},e.prototype.arcadeScriptStep=function(e,t,r){return""},e.prototype.arcadeAssignNextGlobalIdentifier=function(e){for(var t=!1,r="";!1===t;)_++,r="$g_"+_.toString(),void 0===e.syms[r]&&(t=!0);return r},e.prototype.arcadeAssignNextScriptStepIdentifiers=function(e){for(var t=0===e.featuresetsyms.length?"":e.featuresetsyms[e.featuresetsyms.length-1],r=!1,n="";!1===r;)e.symc++,n="$$c_"+e.symc.toString(),void 0===e.syms[n]&&(r=!0);return e.featuresetsyms.push(n),e.syms[n]=n,{currentFeatureSet:t,newFeatureSet:n}},e.prototype.exportArcadeFunctionAndDependencies=function(e,t,r,n){return c.exportFunctionAsArcade(e,t,r,n)},e.prototype.constructArcadeGeom=function(e,t,r){var n=this.arcadeAssignNextGlobalIdentifier(r);return t[n]={name:n,type:"geometry",params:{value:e}},n},e.prototype._qBigDataStat=function(e,t,n,a){var i=this;void 0===n&&(n=-1);var o=new r;return this.expressAsArcadeScript().then(function(r){try{switch(e.toLowerCase()){case"sumlength":r.script+="\n return length("+r.featuresetIdentifier+","+n.toString()+")";break;case"sumlengthgeodesic":r.script+="\n return lengthgeodetic("+r.featuresetIdentifier+","+n.toString()+")";break;case"sumarea":r.script+="\n return area("+r.featuresetIdentifier+","+n.toString()+")";break;case"sumareageodesic":r.script+="\n return areageodetic("+r.featuresetIdentifier+","+n.toString()+")";break;case"geometryunion":r.script+="\n return union("+r.featuresetIdentifier+")";break;case"count":r.script+="\n return Count("+r.featuresetIdentifier+")";break;case"distinct":r.script+="\n return Distinct("+r.featuresetIdentifier+',"'+t.toWhereClause(s.FeatureServiceDatabaseType.Standardised)+'");';break;case"avg":case"mean":r.script+="\n return Average("+r.featuresetIdentifier+',"'+t.toWhereClause(s.FeatureServiceDatabaseType.Standardised)+'");';break;case"stdev":r.script+="\n return Stdev("+r.featuresetIdentifier+',"'+t.toWhereClause(s.FeatureServiceDatabaseType.Standardised)+'");';break;case"variance":r.script+="\n return Variance("+r.featuresetIdentifier+',"'+t.toWhereClause(s.FeatureServiceDatabaseType.Standardised)+'");';break;case"sum":r.script+="\n return Sum("+r.featuresetIdentifier+',"'+t.toWhereClause(s.FeatureServiceDatabaseType.Standardised)+'");';break;case"min":r.script+="\n return Min("+r.featuresetIdentifier+',"'+t.toWhereClause(s.FeatureServiceDatabaseType.Standardised)+'");';break;case"max":r.script+="\n return Max("+r.featuresetIdentifier+',"'+t.toWhereClause(s.FeatureServiceDatabaseType.Standardised)+'");';break;default:r.script="BADSTAT"}var a=i.sourceGeoAnalyticsProvider();"BADSTAT"===r.script?o.reject(new Error("Stat not supported")):null===a?o.reject(new Error("No Big Data Provider")):a.executeScript(r.script,r.globals,r.spatialReference).then(function(e){o.resolve(e)},function(e){o.reject(e)})}catch(e){o.reject(e)}},function(e){o.reject(e)}),o.promise},e.prototype.sourceGeoAnalyticsProvider=function(){return this._parent.sourceGeoAnalyticsProvider()},e.prototype.bigDataCachePipeline=function(e){return"ga_pipeline("+e+",'"+this._bigdCacheId+"')"},e.prototype.castToText=function(){return"object, FeatureSet"},e.prototype.schema=function(){for(var e=[],t=0,r=this.fields;t<r.length;t++){var n=r[t];e.push(s.esriFieldToJson(n))}return{objectIdField:this.objectIdField,typeIdField:this.typeIdField,geometryType:void 0===s.layerGeometryEsriConstants[this.geometryType]?"":s.layerGeometryEsriConstants[this.geometryType],hasZ:this.hasZ,hasM:this.hasM,fields:e}},e.prototype.convertToText=function(e){var t=this,n=new r;return"schema"===e?this._ensureLoaded().then(function(){n.resolve(JSON.stringify(t.schema))},function(e){n.reject(e)}):"featureset"===e?this._ensureLoaded().then(function(){var e=[];t.reduce(function(t){var r=t.toJson();return null!==r.geometry&&r.geometry.spatialReference&&delete r.geometry.spatialReference,e.push(r),1},0).then(function(){var r=t.schema();r.features=e,r.spatialReference=t.spatialReference.toJson(),n.resolve(JSON.stringify(t.schema))},function(e){n.reject(e)})},function(e){n.reject(e)}):n.resolve(this.castToText()),n.promise},e._featuresetFunctions={},e._polyfill={table:null},e}()});