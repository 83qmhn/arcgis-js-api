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

var __extends=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function a(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(a.prototype=r.prototype,new a)}}();define(["require","exports","dojo/Deferred","../../../graphic","../../../IdentityManager","../support/FeatureSet","../support/IdSet","../support/shared","../support/stats","../support/sha","../../../layers/FeatureLayer","../../../tasks/query","../../../tasks/QueryTask","../../../tasks/StatisticDefinition"],function(e,t,r,a,i,n,s,l,o,u,d,c,p,y){"use strict";return function(e){function t(t){var r=e.call(this,t)||this;if(r.declaredClass="esri.layers.featureset.sources.FeatureLayerDynamic",r._removeGeometry=!1,r._overrideFields=null,r.formulaCredential=null,r._pageJustIds=!1,r._requestStandardised=!1,t.spatialReference&&(r.spatialReference=t.spatialReference),r._transparent=!0,r._maxProcessing=1e3,r._layer=t.layer,r._wset=null,!1===r._layer.loaded)throw new Error("Can only create FeatureSets from Loaded FeatureLayers. Use FeatureLayer or FeatureCollection classes");return void 0!==t.outFields&&(r._overrideFields=t.outFields),void 0!==t.includeGeometry&&(r._removeGeometry=!1===t.includeGeometry),r}return __extends(t,e),t.prototype._maxQueryRate=function(){return l.defaultMaxRecords},t.prototype.convertQueryToLruCacheKey=function(e){var t=l.stableStringify(e.toJson());return new u(t,"TEXT").getHash("SHA-1","B64")},t.prototype.end=function(){return this._layer},t.prototype.load=function(){if(null===this._loadPromise){var e=new r;this._loadPromise=e,this._initialiseFeatureSet(),e.resolve(this)}return this._loadPromise.promise},t.prototype.optimisePagingFeatureQueries=function(e){this._pageJustIds=e},t.prototype._initialiseFeatureSet=function(){if(!this._layer.getMap())throw new Error("Can only use featuresets with layers attached to map");null==this.spatialReference&&(this.spatialReference=this._layer.getMap().spatialReference),this.geometryType=this._layer.geometryType,this.fields=this._layer.fields.slice(0);var e=this._layer.getOutFields();if(1===e.length&&"*"===e[0]);else{for(var t=[],r=0,a=this.fields;r<a.length;r++){var i=a[r];if("esriFieldTypeOID"===i.type)t.push(i);else for(var n=0,s=e;n<s.length;n++){var o=s[n];if(o.toLowerCase()===i.name.toLowerCase()){t.push(i);break}}}this.fields=t}if(null!==this._overrideFields)if(1===this._overrideFields.length&&"*"===this._overrideFields[0])this._overrideFields=null;else{for(var t=[],u=[],d=0,c=this.fields;d<c.length;d++){var i=c[d];if("esriFieldTypeOID"===i.type)t.push(i),u.push(i.name);else for(var p=0,y=this._overrideFields;p<y.length;p++){var o=y[p];if(o.toLowerCase()===i.name.toLowerCase()){t.push(i),u.push(i.name);break}}}this.fields=t,this._overrideFields=u}if(this._layer)if(!0===this._layer.useStandardizedQueries)this._databaseType=l.FeatureServiceDatabaseType.Standardised;else{var f=this._layer.version;void 0!==f&&null!==f&&f>=10.5&&(this._databaseType=l.FeatureServiceDatabaseType.Standardised,this._requestStandardised=!0)}this.objectIdField=this._layer.objectIdField,this.typeIdField=this._layer.typeIdField,this.types=this._layer.types},t.prototype._isInFeatureSet=function(e){return l.IdState.InFeatureSet},t.prototype._refineSetBlock=function(e,t){var a=new r;return a.resolve(e),a.promise},t.prototype._candidateIdTransform=function(e){return e},t.prototype._transformSetWithIdChanges=function(e){},t.prototype._getSet=function(e){var t=this,a=new r;return null===this._wset?this._ensureLoaded().then(l.callback(function(){t._getFilteredSet("",null,null,null,e).then(l.callback(function(e){t._wset=e,a.resolve(e)},a),l.errback(a))},a),l.errback(a)):a.resolve(this._wset),a.promise},t.prototype._runDatabaseProbe=function(e){var t=this,a=new r;return this._ensureLoaded().then(l.callback(function(){var r=new c;r.where=e.replace("OBJECTID",t._layer.objectIdField),t.executeQuery(r,"executeForIds").then(l.callback(function(e){a.resolve(!0)},a),function(e){try{a.resolve(!1)}catch(e){a.reject(e)}})},a),l.errback(a)),a.promise},t.prototype.pbfSupportedForQuery=function(e){return this._layer._canFetchPBFForQuery(e)},t.prototype.executeQuery=function(e,t){var r=new p(this._layerUrl()),a="execute"===t&&this.pbfSupportedForQuery(e);a&&(e.quantizationParameters={mode:"edit"});var i=null;if(this.recentlyUsedQueries){var n=this.convertQueryToLruCacheKey(e);i=this.recentlyUsedQueries.getFromCache(n),i&&i.isRejected()&&(i=null,this.recentlyUsedQueries.removeFromCache(n)),null===i&&(i=!0!==a?r[t](e):r[t](e,null,null,{format:"pbf"}),this.recentlyUsedQueries.addToCache(n,i))}return null===i&&(i=!0!==a?r[t](e):r[t](e,null,null,{format:"pbf"})),i},t.prototype._canUsePagination=function(){return void 0!==this._layer.advancedQueryCapabilities&&null!==this._layer.advancedQueryCapabilities&&!0===this._layer.advancedQueryCapabilities.supportsPagination},t.prototype._cacheableFeatureSetSourceKey=function(){return this._layer.url},t.prototype._getFilteredSet=function(e,t,a,i,n){var o=this,u=new r;return this.databaseType().then(l.callback(function(r){if(o.isTable()&&t&&null!==e&&""!==e){var d=new s([],[],!0,null);return void u.resolve(d)}if(o._canUsePagination())return o._getFilteredSetUsingPaging(e,t,a,i,n).then(l.callback(function(e){u.resolve(e)},u),l.errback(u)),u.promise;var p="",y=!1;null!==i&&void 0!==o._layer.advancedQueryCapabilities&&null!==o._layer.advancedQueryCapabilities&&!0===o._layer.advancedQueryCapabilities.supportsOrderBy&&(p=i.constructClause(),y=!0);var f=new c;o._requestStandardised&&(f.sqlFormat="standard"),f.where=null===a?null===t?"1=1":"":a.toWhereClause(r),f.spatialRelationship=o._makeRelationshipEnum(e),f.outSpatialReference=o.spatialReference,f.orderByFields=""!==p?p.split(","):null,f.geometry=null===t?"":t,f.relationParam=o._makeRelationshipParam(e),o.executeQuery(f,"executeForIds").then(l.callback(function(e){null===e&&(e=[]),o._checkCancelled(n);var t=new s([],e,y,null);u.resolve(t)},u),l.errback(u))},u),l.errback(u)),u.promise},t.prototype._expandPagedSet=function(e,t,r,a,i){return this._expandPagedSetFeatureSet(e,t,r,a,i)},t.prototype._getFilteredSetUsingPaging=function(e,t,a,i,n){var o=this,u=new r;try{var d="",c=!1;null!==i&&void 0!==this._layer.advancedQueryCapabilities&&null!==this._layer.advancedQueryCapabilities&&!0===this._layer.advancedQueryCapabilities.supportsOrderBy&&(d=i.constructClause(),c=!0),this.databaseType().then(l.callback(function(r){var i=null===a?null===t?"1=1":"":a.toWhereClause(r);o._layer.getDefinitionExpression()&&(i=""!==i?"(("+o._layer.getDefinitionExpression()+") AND ("+i+"))":o._layer.getDefinitionExpression());var p=o._maxQueryRate();void 0!==o._layer.maxRecordCount&&o._layer.maxRecordCount<p&&(p=o._layer.maxRecordCount);var y=null;if(!0===o._pageJustIds)y=new s([],["GETPAGES"],c,{spatialRel:o._makeRelationshipEnum(e),relationParam:o._makeRelationshipParam(e),outFields:o._layer.objectIdField,resultRecordCount:p,resultOffset:0,geometry:null===t?"":t,where:i,orderByFields:d,returnGeometry:"false",returnIdsOnly:"false",internal:{set:[],lastRetrieved:0,fullyResolved:!1}});else{var f=!0;!0===o._removeGeometry&&(f=!1);var h=null!==o._overrideFields?o._overrideFields:o._fieldsIncludingObjectId(o._layer.getOutFields());y=new s([],["GETPAGES"],c,{spatialRel:o._makeRelationshipEnum(e),relationParam:o._makeRelationshipParam(e),outFields:h.join(","),resultRecordCount:p,resultOffset:0,geometry:null===t?"":t,where:i,orderByFields:d,returnGeometry:f,returnIdsOnly:"false",internal:{set:[],lastRetrieved:0,fullyResolved:!1}})}o._expandPagedSet(y,p,0,1,n).then(l.callback(function(e){u.resolve(y)},u),l.errback(u))},u),l.errback(u))}catch(e){u.reject(e)}return u.promise},t.prototype._clonePageDefinition=function(e){return null===e?null:!0!==e.groupbypage?{groupbypage:!1,spatialRel:e.spatialRel,relationParam:e.relationParam,outFields:e.outFields,resultRecordCount:e.resultRecordCount,resultOffset:e.resultOffset,geometry:e.geometry,where:e.where,orderByFields:e.orderByFields,returnGeometry:e.returnGeometry,returnIdsOnly:e.returnIdsOnly,internal:e.internal}:{groupbypage:!0,spatialRel:e.spatialRel,relationParam:e.relationParam,outFields:e.outFields,resultRecordCount:e.resultRecordCount,useOIDpagination:e.useOIDpagination,generatedOid:e.generatedOid,groupByFieldsForStatistics:e.groupByFieldsForStatistics,resultOffset:e.resultOffset,outStatistics:e.outStatistics,geometry:e.geometry,where:e.where,orderByFields:e.orderByFields,returnGeometry:e.returnGeometry,returnIdsOnly:e.returnIdsOnly,internal:e.internal}},t.prototype._getPhysicalPage=function(e,t,a){var i=this,n=new r;try{var s=e.pagesDefinition.internal.lastRetrieved,o=s,u=new c;this._requestStandardised&&(u.sqlFormat="standard"),u.spatialRelationship=e.pagesDefinition.spatialRel,u.relationParam=e.pagesDefinition.relationParam,u.outFields=e.pagesDefinition.outFields.split(","),u.num=e.pagesDefinition.resultRecordCount,u.start=e.pagesDefinition.internal.lastRetrieved,u.geometry=e.pagesDefinition.geometry,u.where=e.pagesDefinition.where,u.orderByFields=""!==e.pagesDefinition.orderByFields?e.pagesDefinition.orderByFields.split(","):null,u.returnGeometry=e.pagesDefinition.returnGeometry,u.outSpatialReference=this.spatialReference,this.executeQuery(u,"execute").then(l.callback(function(t){i._checkCancelled(a),e.pagesDefinition.internal.lastRetrieved!==s&&n.resolve("done");for(var r=0;r<t.features.length;r++)void 0===t.features[r].geometry&&(t.features[r].geometry=null),e.pagesDefinition.internal.set[o+r]=t.features[r].attributes[i._layer.objectIdField];if(!1===i._pageJustIds)for(var r=0;r<t.features.length;r++)i._featureCache[t.features[r].attributes[i._layer.objectIdField]]=t.features[r];t.features.length!==e.pagesDefinition.resultRecordCount&&(e.pagesDefinition.internal.fullyResolved=!0),e.pagesDefinition.internal.lastRetrieved=s+e.pagesDefinition.resultRecordCount,n.resolve("done")},n),l.errback(n))}catch(e){n.reject(e)}return n.promise},t.prototype._fieldsIncludingObjectId=function(e){if(null===e)return[this.objectIdField];var t=e.slice(0);if(t.indexOf("*")>-1)return t;for(var r=!1,a=0,i=t;a<i.length;a++){if(i[a].toUpperCase()===this.objectIdField.toUpperCase()){r=!0;break}}return!1===r&&t.push(this.objectIdField),t},t.prototype._getFeatures=function(e,t,a,i){var n=this,s=new r,o=[];try{if(-1!==t&&void 0===this._featureCache[t]&&o.push(t),!0===this._checkIfNeedToExpandKnownPage(e,this._maxProcessingRate(),i))return this._expandPagedSet(e,this._maxProcessingRate(),0,0,i).then(l.callback(function(r){n._getFeatures(e,t,a,i).then(l.callback(function(e){s.resolve(e)},s),l.errback(s))},s),l.errback(s)),s.promise;for(var u=0,d=e._lastFetchedIndex;d<e._known.length;d++){if(e._lastFetchedIndex+=1,u++,void 0===this._featureCache[e._known[d]]){var p=!1;if(null!==this._layer._mode&&void 0!==this._layer._mode){var y=this._layer._mode;if(void 0!==y._featureMap[e._known[d]]){var f=y._featureMap[e._known[d]];null!==f&&(p=!0,this._featureCache[e._known[d]]=f)}}if(!1===p&&(e._known[d]!==t&&o.push(e._known[d]),o.length>=this._maxProcessingRate()-1))break}if(u>=a&&0===o.length)break}if(0===o.length)s.resolve("success");else try{var h=new c;this._requestStandardised&&(h.sqlFormat="standard"),h.objectIds=o,h.outFields=null!==this._overrideFields?this._overrideFields:this._fieldsIncludingObjectId(this._layer.getOutFields()),h.returnGeometry=!0,!0===this._removeGeometry&&(h.returnGeometry=!1),h.outSpatialReference=this.spatialReference,this.executeQuery(h,"execute").then(l.callback(function(e){if(n._checkCancelled(i),void 0!==e.error)return void s.reject(new Error(e.error));for(var t=0;t<e.features.length;t++)void 0===e.features[t].geometry&&(e.features[t].geometry=null),n._featureCache[e.features[t].attributes[n._layer.objectIdField]]=e.features[t];s.resolve("success")},s),l.errback(s))}catch(e){s.reject(e)}}catch(e){s.reject(e)}return s.promise},t.prototype._layerUrl=function(){return this._layer.url},t.prototype._getDistinctPages=function(e,t,a,i,n,s,o,u,d){var p=this,y=new r;return this._ensureLoaded().then(l.callback(function(){for(var r=a.parseTree.column,f=0;f<p._layer.fields.length;f++)if(p._layer.fields[f].name.toLowerCase()===r.toLowerCase()){r=p._layer.fields[f].name;break}p.databaseType().then(l.callback(function(f){var h=new c;p._requestStandardised&&(h.sqlFormat="standard");var _=null===s?null===n?"1=1":"":s.toWhereClause(f);p._layer.getDefinitionExpression()&&(_=""!==_?"(("+p._layer.getDefinitionExpression()+") AND ("+_+"))":p._layer.getDefinitionExpression()),h.where=_,h.spatialRelationship=p._makeRelationshipEnum(i),h.relationParam=p._makeRelationshipParam(i),h.geometry=null===n?null:n,h.returnDistinctValues=!0,h.returnGeometry=!1,h.outFields=[r],p.executeQuery(h,"execute").then(l.callback(function(c){if(p._checkCancelled(d),!c.hasOwnProperty("features"))return void y.reject(new Error("Unnexected Result querying statistics from layer"));for(var f=!1,h=0;h<p._layer.fields.length;h++)if(p._layer.fields[h].name===r){"esriFieldTypeDate"===p._layer.fields[h].type&&(f=!0);break}for(var h=0;h<c.features.length;h++){if(f){var _=c.features[h].attributes[r];null!==_?u.push(new Date(_)):u.push(_)}else u.push(c.features[h].attributes[r]);if(u.length>=o)break}0===c.features.length?y.resolve(u):c.features.length===p._layer.maxRecordCount&&u.length<o?p._getDistinctPages(e+c.features.length,t,a,i,n,s,o,u,d).then(l.callback(function(e){y.resolve({calculated:!0,result:e})},y),l.errback(y)):y.resolve(u)},y),l.errback(y))},y),l.errback(y))},y),l.errback(y)),y.promise},t.prototype._distinctStat=function(e,t,r,a,i,n,s,o){this._getDistinctPages(0,t,r,a,i,n,s,[],o).then(l.callback(function(t){e.resolve({calculated:!0,result:t})},e),l.errback(e))},t.prototype.isTable=function(){return!1},t.prototype._countstat=function(e,t,r,a,i,n){var s=this;this.databaseType().then(l.callback(function(t){var n=new c;if(s._requestStandardised&&(n.sqlFormat="standard"),s.isTable()&&a&&null!==r&&""!==r)return void e.resolve(0);var o=null===i?null===a?"1=1":"":i.toWhereClause(t);s._layer.getDefinitionExpression()&&(o=""!==o?"(("+s._layer.getDefinitionExpression()+") AND ("+o+"))":s._layer.getDefinitionExpression()),n.where=o,n.where=o,n.spatialRelationship=s._makeRelationshipEnum(r),n.relationParam=s._makeRelationshipParam(r),n.geometry=null===a?null:a,n.returnGeometry=!1;new p(s._layerUrl());s.executeQuery(n,"executeForCount").then(l.callback(function(t){e.resolve({calculated:!0,result:t})},e),l.errback(e))},e),l.errback(e))},t.prototype._stats=function(e,t,r,a,i,n,s,u){var d=this;this._ensureLoaded().then(l.callback(function(){var p=d._layer.advancedQueryCapabilities&&!0===d._layer.advancedQueryCapabilities.supportsSqlExpression,f=d._layer.advancedQueryCapabilities&&!0===d._layer.advancedQueryCapabilities.supportsStatistics,h=d._layer.advancedQueryCapabilities&&!0===d._layer.advancedQueryCapabilities.supportsDistinct;"count"===t?h?d._countstat(e,t,a,i,n,u):e.resolve({calculated:!1}):!1===f||!1===r.isSingleField()&&!1===p||!1===r.isStandardized()?""!==a||null!==n?e.resolve({calculated:!1}):d._manualStat(t,r,s,u).then(l.callback(function(t){e.resolve(t)},e),l.errback(e)):"distinct"===t?!1===h?""!==a||null!==n?e.resolve({calculated:!1}):d._manualStat(t,r,s,u).then(l.callback(function(t){e.resolve(t)},e),l.errback(e)):d._distinctStat(e,t,r,a,i,n,s,u):d.databaseType().then(l.callback(function(s){if(d.isTable()&&i&&null!==a&&""!==a)return void e.resolve({calculated:!0,result:null});var u=new c;d._requestStandardised&&(u.sqlFormat="standard");var p=null===n?null===i?"1=1":"":n.toWhereClause(s);d._layer.getDefinitionExpression()&&(p=""!==p?"(("+d._layer.getDefinitionExpression()+") AND ("+p+"))":d._layer.getDefinitionExpression()),u.where=p,u.spatialRelationship=d._makeRelationshipEnum(a),u.relationParam=d._makeRelationshipParam(a),u.geometry=null===i?null:i;var f=new y;f.statisticType=o.decodeStatType(t),f.onStatisticField=r.toWhereClause(s),f.outStatisticFieldName="FORMULA_STAT_RESULT",u.returnGeometry=!1,u.outStatistics=[f],d.executeQuery(u,"execute").then(l.callback(function(t){if(!t.hasOwnProperty("features")||0===t.features.length)return void e.reject(new Error("Unnexected Result querying statistics from layer"));for(var r=!1,a=0;a<t.fields.length;a++)if("FORMULA_STAT_RESULT"===t.fields[a].name.toUpperCase()){"esriFieldTypeDate"===t.fields[a].type&&(r=!0);break}if(r){var i=t.features[0].attributes.FORMULA_STAT_RESULT;null!==i&&(i=new Date(t.features[0].attributes.FORMULA_STAT_RESULT)),e.resolve({calculated:!0,result:i})}else e.resolve({calculated:!0,result:t.features[0].attributes.FORMULA_STAT_RESULT})},e),l.errback(e))},e),l.errback(e))},e),l.errback(e))},t.prototype._stat=function(e,t,a,i,n,s,l){var o=new r;try{this._stats(o,e,t,a,i,n,s,l)}catch(e){o.reject(e)}return o.promise},t.prototype._canDoAggregates=function(e,t,a,i,n){var s=this,o=new r;return this._ensureLoaded().then(l.callback(function(e){var r=!1,a=s._layer.advancedQueryCapabilities&&!0===s._layer.advancedQueryCapabilities.supportsSqlExpression;if(void 0!==s._layer.advancedQueryCapabilities&&null!==s._layer.advancedQueryCapabilities&&!0===s._layer.advancedQueryCapabilities.supportsStatistics&&!0===s._layer.advancedQueryCapabilities.supportsOrderBy&&(r=!0),r)for(var i=0;i<t.length-1;i++)null!==t[i].workingexpr&&(!1===t[i].workingexpr.isStandardized()?r=!1:!1===t[i].workingexpr.isSingleField()&&!1===a&&(r=!1));!1===r?o.resolve(!1):o.resolve(!0)},o),l.errback(o)),o.promise},t.prototype._makeRelationshipEnum=function(e){return e.indexOf("esriSpatialRelRelation")>=0?"esriSpatialRelRelation":e},t.prototype._makeRelationshipParam=function(e){return e.indexOf("esriSpatialRelRelation")>=0?e.split(":")[1]:""},t.prototype._getAggregatePagesDataSourceDefinition=function(e,t,a,i,n,o,u){var d=this,c=new r;return this._ensureLoaded().then(l.callback(function(r){d.databaseType().then(l.callback(function(r){var l="",p=!1,f=!1;null!==o&&void 0!==d._layer.advancedQueryCapabilities&&null!==d._layer.advancedQueryCapabilities&&!0===d._layer.advancedQueryCapabilities.supportsOrderBy&&(l=o.constructClause(),f=!0),void 0!==d._layer.advancedQueryCapabilities&&null!==d._layer.advancedQueryCapabilities&&!1===d._layer.advancedQueryCapabilities.supportsPagination&&(f=!1,p=!0,l=d._layer.objectIdField);for(var h=[],_=0;_<t.length;_++){var g=new y;g.onStatisticField=null!==t[_].workingexpr?t[_].workingexpr.toWhereClause(r):"",g.outStatisticFieldName=t[_].field,g.statisticType=t[_].toStatisticsName(),h.push(g)}""===l&&(l=e.join(","));var v=d._maxQueryRate();void 0!==d._layer.maxRecordCount&&d._layer.maxRecordCount<v&&(v=d._layer.maxRecordCount);var m=null===n?null===i?"1=1":"":n.toWhereClause(r);d._layer.getDefinitionExpression()&&(m=""!==m?"(("+d._layer.getDefinitionExpression()+") AND ("+m+"))":d._layer.getDefinitionExpression());var b=new s([],["GETPAGES"],f,{groupbypage:!0,spatialRel:d._makeRelationshipEnum(a),relationParam:d._makeRelationshipParam(a),outFields:["*"],useOIDpagination:p,generatedOid:u,resultRecordCount:v,resultOffset:0,groupByFieldsForStatistics:e,outStatistics:h,geometry:null===i?null:i,where:m,orderByFields:l,returnGeometry:!1,returnIdsOnly:!1,internal:{lastMaxId:-1,set:[],lastRetrieved:0,fullyResolved:!1}});c.resolve(b)},c),l.errback(c))},c),l.errback(c)),c.promise},t.prototype._getAgregagtePhysicalPage=function(e,t,i){var n=this,s=new r;try{var o=e.pagesDefinition.where;!0===e.pagesDefinition.useOIDpagination&&(o=""!==o?"("+o+") AND ("+e.pagesDefinition.generatedOid+">"+e.pagesDefinition.internal.lastMaxId.toString()+")":e.pagesDefinition.generatedOid+">"+e.pagesDefinition.internal.lastMaxId.toString());var u=e.pagesDefinition.internal.lastRetrieved,d=u,p=new c;if(this._requestStandardised&&(p.sqlFormat="standard"),p.where=o,p.spatialRelationship=e.pagesDefinition.spatialRel,p.relationParam=e.pagesDefinition.relationParam,p.outFields=e.pagesDefinition.outFields,p.outStatistics=e.pagesDefinition.outStatistics,p.geometry=e.pagesDefinition.geometry,p.groupByFieldsForStatistics=e.pagesDefinition.groupByFieldsForStatistics,p.num=e.pagesDefinition.resultRecordCount,p.start=e.pagesDefinition.internal.lastRetrieved,p.returnGeometry=e.pagesDefinition.returnGeometry,p.orderByFields=""!==e.pagesDefinition.orderByFields?e.pagesDefinition.orderByFields.split(","):null,this.isTable()&&p.geometry&&p.spatialRelationship)return s.resolve([]),s.promise;this.executeQuery(p,"execute").then(l.callback(function(t){if(n._checkCancelled(i),!t.hasOwnProperty("features"))return void s.reject(new Error("Unnexected Result querying aggregates from layer"));var r=[];if(e.pagesDefinition.internal.lastRetrieved!==u)return void s.resolve([]);for(var l=0;l<t.features.length;l++)void 0===t.features[l].geometry&&(t.features[l].geometry=null),e.pagesDefinition.internal.set[d+l]=t.features[l].attributes[e.pagesDefinition.generatedOid];for(var l=0;l<t.features.length;l++)r.push(new a({attributes:t.features[l].attributes,geometry:null}));!0===e.pagesDefinition.useOIDpagination?0===t.features.length?e.pagesDefinition.internal.fullyResolved=!0:e.pagesDefinition.internal.lastMaxId=t.features[t.features.length-1].attributes[e.pagesDefinition.generatedOid]:t.features.length!==e.pagesDefinition.resultRecordCount&&(e.pagesDefinition.internal.fullyResolved=!0),e.pagesDefinition.internal.lastRetrieved=u+e.pagesDefinition.resultRecordCount,s.resolve(r)},s),l.errback(s))}catch(e){s.reject(e)}return s.promise},t.create=function(e,r,a,i){var n={url:e,outFields:null===r?["*"]:r};return null!==a&&""!==a&&(n.token=a),new t({layer:new d(n),spatialReference:i})},t.prototype.canBeBigDataFeatureSet=function(){return!0},t.prototype.shouldBeResolvedAsBigData=function(){return!1},t.prototype.expressAsArcadeScriptImpl=function(e,t,r){var a=(this.arcadeAssignNextScriptStepIdentifiers(r),this.arcadeAssignNextGlobalIdentifier(r)),n=null,s=i.findCredential(this._layer.url);return s&&(n=s.oken),t[a]={name:a,type:"FeatureLayer",params:{url:this._layer.url,token:n,definitionExpression:this._layer.getDefinitionExpression(),fields:this._layer.getOutFields()}},r.featuresetsyms.push(a),""},t}(n)});