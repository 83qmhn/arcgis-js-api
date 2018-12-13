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

define(["dojo/_base/array","dojo/_base/lang","dojo/Deferred","dojo/number","dojo/string","dojo/date/locale","dojo/promise/all","../../config","../../graphic","../../numberUtils","../../request","../../ArcadeExpression","../../arcadeProfiles/popupProfile","../../layers/FeatureLayer","../../geometry/Extent","../../tasks/query","../../tasks/StatisticDefinition","../../tasks/QueryTask","../../tasks/RelationshipQuery","dojo/i18n","dojo/i18n!../../nls/jsapi"],function(e,t,r,n,i,a,u,o,s,l,d,y,c,f,p,m,h,g,F,w,b){return{i18nStrings:b.widgets.FeatureTable,numericFieldTypes:["esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble","esriFieldTypeSmallInteger"],statisticDefinitions:[{type:"count",name:"countField"},{type:"sum",name:"sumField"},{type:"min",name:"minField"},{type:"max",name:"maxField"},{type:"avg",name:"avgField"},{type:"stddev",name:"stddevField"}],_reExprField:/^\s*expression\//i,getOrderByString:function(e,t){return e+(t?" DESC":" ASC")},getWhereString:function(e,t){return e+"='"+t+"'"},getRelationshipWhereClause:function(r){var n=r.layer,i=r.originRelationship,a=r.destinationRelationship,u=r.keyValue,o=i.relationshipTableId||i.relatedTableId,s=i.keyFieldInRelationshipTable||i.keyField,l=a.keyFieldInRelationshipTable||a.keyField,y=n.layerId==o?l:s,c=this.getWhereString(y,u),f=n._url.path,p=f.substring(0,f.lastIndexOf("/")+1);return d({url:p+o+"/query",content:{f:"json",outFields:["*"],returnGeometry:!1,where:c},handleAs:"json",callbackParamName:"callback"}).then(t.hitch(this,function(t){if(t&&t.features&&t.features.length){var r,i=t.features,u=[],o="";return e.forEach(i,function(t,s){if(t.attributes&&t.attributes[l])r=t.attributes[l];else{var d=n.getField(y)?n.getField(y).name:null;if(this.isValueEmpty(d)){var c=l.toUpperCase(),f=l.toLowerCase();r=t.attributes[c]||t.attributes[f]||null}else r=t.attributes[d]}-1===e.indexOf(u,r)&&(u.length>0&&s<i.length&&(o=o.concat(" OR ")),u.push(r),o=o.concat(this.getWhereString(a.keyField,r)))},this),o}return null}))},isValueEmpty:function(e){return null===e||" "===e||""===e||void 0===e},findFirst:function(t,r,n){return e.filter(t,function(e){return e.hasOwnProperty(r)&&e[r]===n})[0]||null},compareIntArrays:function(t,r){t.sort(),r.sort();var n=e.every(r,function(r){return-1!==e.indexOf(t,r)},this),i=e.every(t,function(t){return-1!==e.indexOf(r,t)},this);return n&&i},findFirstNumberColumn:function(t,r){var n;return e.some(t,function(t,i){if(-1!==e.indexOf(this.numericFieldTypes,t.type)&&t.field!==r&&!t.hidden)return n=t,!0},this),n},getRoundingPrecision:function(e){return e>=1e3?0:e>=10?2:e>=0?4:6},generateLinkFromString:function(e){var t=/^\s*(https?:\/\/([^\s]+))\s*$/i;if("string"==typeof e&&t.test(e)){var r=e.indexOf("https:");if(r>-1&&-1===e.indexOf("href=")){var n=e.indexOf(" ",r);-1===n&&(n=e.length);var i=e.substring(r,n);e=e.substring(0,r)+"<a href='"+i+"' target='_blank'>"+i+"</a>"+e.substring(n,e.length)}}return this.isValueEmpty(e)?"":e},isNumericFieldType:function(t){return-1!==e.indexOf(this.numericFieldTypes,t)},isIntegerFieldType:function(e){return"esriFieldTypeInteger"===e||"esriFieldTypeSmallInteger"===e},isFloatFieldType:function(e){return"esriFieldTypeDouble"===e||"esriFieldTypeSingle"===e},getDomainValueFromRow:function(t){var r,n=t.fieldInfo.name,i=t.fieldInfo.domain,a=t.row;return"range"===i.type?a[n]:(r=e.filter(i.codedValues,function(e){return e.hasOwnProperty("code")&&e.code==a[n]}),r[0]&&!this.isValueEmpty(r[0].name)?r[0].name:a[n])},getTypeValueFromRow:function(e){var t,r,n,i,a,u=e.layerInfo,o=u.types,s=e.fieldInfo,l=e.row,d=o&&o[0];return d&&(r=l[s.name],n=this.isNumericFieldType(s.type),i="string"==typeof d.id,a=i&&n?r.toString():r,t=this.findFirst(o,"id",a),t=t?t.name:null),t},getSubtypeDomainValue:function(t){var r,n,i,a=t.layerInfo,u=t.fieldInfo.name,o=a.types,s=t.row;return i=this.findFirst(o,"id",s[a.typeIdField]),r=i?i.domains:null,i&&r?(r[u]&&r[u].codedValues&&(n=e.filter(r[u].codedValues,function(e){return e.hasOwnProperty("code")&&e.code==s[u]})),n&&n[0]&&!this.isValueEmpty(n[0].name)?n[0].name:s[u]):s[u]},mergeDictionaries:function(e,t){if(null===e||null===t)return e;for(var r in t){e[r]||(e[r]={});for(var n in t[r])e[r][n]=t[r][n]}return e},isCyclicalRelationship:function(e){return"esriRelCardinalityOneToOne"===e.cardinality||"esriRelCardinalityOneToMany"===e.cardinality&&"esriRelRoleDestination"===e.role},getColumnFromFieldName:function(e){var t=e.grid,r=e.fieldName,n=t.columns;return this.findFirst(n,"field",r)},formatNumberForLocale:function(e,t){if(t){var r=w.getLocalization("dojo.cldr","number");return t.digitSeparator||!r||this.isValueEmpty(e)?isNaN(e)||null===e?null:n.format(e,t):(e=isNaN(e)||null===e?null:n.format(e,t),e.replace(new RegExp("\\"+r.group,"g"),""))}return isNaN(e)||null===e?null:l.format(e,t)},getCombinedDateTime:function(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),t.getHours(),t.getMinutes(),t.getSeconds())},formatDateForLocale:function(e){var t,r,n,i=e.dateOptions||{},u=e.timestamp,o=e.fieldInfo,s=!1,l=!1,d={};return t=!(!o||!o.dateOptions)&&o.dateOptions,r=t||i,s=!(!t||!this.isValueEmpty(r.dateEnabled))||!!r.dateEnabled,l=!!r.timeEnabled,this.isValueEmpty(r.datePattern)||(d.datePattern=r.datePattern),this.isValueEmpty(r.timeEnabled)||this.isValueEmpty(r.timePattern)||(d.timePattern=r.timePattern),n=s&&l?"date and time":s&&!l?"date":!s&&l?"time":"date",d.selector=n,a.format(new Date(u),d)},calculateExtentFromFeatures:function(e){var t,r,n,i,a,u=e[0].geometry;if(null===u&&1===e.length)return null;for(i=e.length-1;i>=0;i--)null===e[i].geometry&&e.splice(i,1);for(u=e[0].geometry,t=u.getExtent(),n=e.length,null===t&&(t=new p(u.x,u.y,u.x,u.y,u.spatialReference)),a=1;a<n;a++)u=e[a].geometry,r=u.getExtent(),null===r&&(r=new p(u.x,u.y,u.x,u.y,u.spatialReference)),t=t.union(r);return t},initFeatureLayer:function(e,t){var r=e._url.path;return r=r.substring(0,r.lastIndexOf("/")+1),r+=t,new f(r,{mode:f.MODE_ONDEMAND,outFields:["*"],visible:!0})},applyEdits:function(t){var n=[],i=new r;return!t||t.length<=0?(i.reject(),i):(e.forEach(t,function(e){e.layer&&n.push(e.layer.applyEdits(e.adds,e.updates,e.deletes,function(e,t,r){i.resolve({adds:e,updates:t,deletes:r})},function(e){i.reject(e)}))}),n.length>0?u(n):i.reject(),i)},applyEditsFromRow:function(e){var r=e.layer,n=e.idProperty,i=e.row;return this.queryLayerForFeature({layer:r,id:i[n]}).then(t.hitch(this,function(e){var t=e.features[0];return(r.hasZ&&!r.enableZDefaults||r.hasM&&!r.allowUpdateWithoutMValues)&&(t=new s),t.setAttributes(i),this.applyEdits([{layer:r,updates:[t]}],null)}))},queryLayer:function(e){var t=e.layer,r=e.ids||null,n=new m;return n.where="1=1",n.returnGeometry=!1,n.objectIds=r,t.queryFeatures(n)},queryLayerForFeature:function(e){return this.queryLayerForFeatures({layer:e.layer,ids:[e.id]})},queryLayerForFeatures:function(e){var t=e.layer,r=e.ids,n=new m;return n.objectIds=r,n.outFields=["*"],t.queryFeatures(n,function(e){return e.features})},queryLayerForCount:function(e){var t=e.layer,r=e.layerInfo,n=new m,i=e.where||"1=1";return n.returnGeometry=!1,n.returnCountOnly=!0,n.where=i,t.queryCount?t.queryCount(n).then(function(e){return e}).otherwise(function(){return r.isFeatureCollection?t.graphics.length:2e3}).always(function(e){return e}):this.queryLayerCustom({layer:t,returnCountOnly:!0}).then(function(e){return e&&e.features?e.features.length:0}).otherwise(function(){return t.maxRecordCount||2e3}).always(function(e){return e})},queryLayerCustom:function(e){var t,r=new m,n=e.layer,i=e.returnCountOnly||!1,a=e.where||"1=1",u=e.returnGeometry||!1,o=e.outFields||["*"];return t=new g(n.url),r.returnGeometry=u,r.outFields=o,r.where=a,r.returnCountOnly=i,t.execute(r)},queryLayerForIds:function(e){var t=e.layer,r=e.idProperty,n=e.where||"1=1",i=new m;return i.returnGeometry=!1,i.outFields=[r],i.where=n,i.returnIdsOnly=!0,t.queryIds(i)},queryLayerForAttachments:function(e){var t=e.layer,r=e.ids,n=t._url.path+"/queryAttachments";return d({url:n,content:{f:"json",objectIds:r},handleAs:"json",callbackParamName:"callback"})},queryLayerForAttachmentById:function(e){var t=e.layer,r=e.id||0;return t.queryAttachmentInfos(r)},addAttachmentToLayer:function(e){var t=e.layer,r=e.featureId,n=e.formData;return t.addAttachment(r,n)},deleteAttachmentFromLayer:function(e){var t=e.layer,r=e.attachmentId,n=e.featureId;return t.deleteAttachments(n,[r])},queryLayerForRelatedRecords:function(e){var t=e.layer,r=e.ids,n=e.outFields||["*"],i=e.relationship,a=e.returnCountOnly||!1,u=new F;return u.outFields=n,u.returnGeometry=!1,u.relationshipId=i.id,u.returnCountOnly=a,u.objectIds=r,t.queryRelatedFeatures(u)},queryLayerForRelatedRecordCount:function(e){var t=e.layer,r=e.objectIds,n=e.relationship,i=e.outFields,a=t._url.path+"/queryRelatedRecords";return d({url:a,content:{f:"json",objectIds:r.toString(),outFields:i,returnGeometry:!1,relationshipId:n.id,returnCountOnly:!0},handleAs:"json",callbackParamName:"callback"})},getFieldStatistics:function(t){var n,i,a,u=new r,o=t.grid,s=t.layer,l=t.idProperty,d=t.where||"1=1",y=t.filterIds,c=t.columnId,f=o.columns[c].field,p=s.url,F=[];return a=e.map(this.statisticDefinitions,function(e){var t=new h;return t.onStatisticField=f,t.displayFieldName=f,t.outStatisticFieldName=e.name,t.statisticType=e.type,t}),n=new m,n.outFields=[f],n.outStatistics=[],n.where=d,n.outStatistics=a,y&&y.length>0&&(F=y),n.where&&F.length>0&&(n.where="("+n.where+") AND ("+l+" IN ("+F.toString()+"))"),s.source&&!this.isValueEmpty(s.source.mapLayerId)&&p.endsWith("/dynamicLayer")&&(p=p.slice(0,-13),p=p+"/"+s.source.mapLayerId),i=new g(p),i.execute(n).then(function(e){u.resolve(e)}).otherwise(function(){u.reject()}),u},selectFeaturesById:function(e){var t=e.grid,r=t.layer,n=t.layerInfo,i=e.map,a=e.ids,u=e.id,o=new m;return o.returnGeometry=!!i,o.objectIds=a||[u],n.isFeatureCollection||(o.where="1=1"),r.selectFeatures(o,f.SELECTION_NEW)},isFeatureEditable:function(e){var t=e.layer,r=e.layerInfo,n=e.attributes,i=r.layerId,a=r.userIds[i]||null;return!!t.getEditCapabilities({userId:a,feature:{attributes:n}}).canUpdate},isExpressionField:function(e){return this._reExprField.test(e)},getExpressionInfo:function(t,r){if(this.isExpressionField(r)){var n;return r=r.replace(this._reExprField,""),r=r.toLowerCase(),e.some(t,function(e){return e.name.toLowerCase()===r&&(n=e),!!n}),n}},compileExpressions:function(t){var r={};return e.forEach(t,function(e){var t=e.returnType&&e.returnType.toLowerCase();r[e.name]=new y({expression:e.expression,returnType:"number"===t?"number":"string",profile:c})}),r},getExpressionValue:function(e,t){var r=e.getLayer(),n=r&&r.getMap();return t?e.evaluateExpression(t,c.getEvalOptions({expression:t,feature:e,layer:r,map:n,spatialReference:n&&n.spatialReference})):null}}});