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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/json","dojo/i18n","dojo/has","dojo/Deferred","dojo/sniff","dojo/promise/all","dojox/html/entities","./lang","./kernel","./request","./promiseList","./ArcadeExpression","./tasks/query","./tasks/QueryTask","./tasks/RelationshipQuery","./tasks/StatisticDefinition","./arcadeProfiles/popupProfile","./layers/support/attributeUtils","dojo/i18n!dojo/cldr/nls/number"],function(e,t,i,r,s,a,n,o,l,f,d,u,h,c,p,m,_,y,F,g,I,v){var x=e(null,{declaredClass:"esri.PopupInfo",_reNewline:/(\n)/gi,_reExprField:/^\s*expression\//i,_reExprFieldPattern:/\{expression\/([^\}]+)\}/gi,_exprPrefix:"expression/",_relatedFieldPrefix:"relationships/",initialize:function(e,r){if(e){t.mixin(this,r),this.info=e,this.title=this.getTitle,this.content=this.getContent,this._exprCache=this._compileExpressions(this.info.expressionInfos);var s=this._fieldLabels={},a=this._fieldsMap={};this.info.fieldInfos&&i.forEach(this.info.fieldInfos,function(e){var t=e.fieldName.toLowerCase(),i=this._isExpressionField(t)?this.getExpressionInfo(t):null;s[t]=i?i.title:e.label,a[t]=e},this),this.titleHasRelatedFields=!(!this.info.title||-1===this.info.title.indexOf("{"+this._relatedFieldPrefix)),this.titleHasAsyncExpressions=this._titleHasAsyncExpressions()}},toJson:function(){return r.fromJson(r.toJson(this.info))},getTitle:function(){},getContent:function(){},getFieldInfo:function(e){var t,r=this.info&&this.info.fieldInfos;return i.some(r,function(i){return i.fieldName===e&&(t=i),!!t}),t},getExpressionInfo:function(e){if(this._isExpressionField(e)){e=e.replace(this._reExprField,""),e=e.toLowerCase();var t;return i.some(this.info.expressionInfos,function(i){return i.name.toLowerCase()===e&&(t=i),!!t}),t}},getExpressionFieldsInTitle:function(){var e=this.info.title?this.info.title.match(this._reExprFieldPattern):null;return i.map(e,function(e){return e.replace(this._reExprFieldPattern,"$1")},this)},hasGeometryOperations:function(){return i.some(this._getArcadeExpressions(),function(e){return e.hasGeometryOperations()})},hasAsyncExpressions:function(){return i.some(this._getArcadeExpressions(),function(e){return e.async})},initializeArcadeEngine:function(){return g.initialize(this._getArcadeExpressions())},getComponents:function(e){var r=this.info,s={};if(r.fieldInfos){var a=i.filter(r.fieldInfos,function(e){return-1!==e.fieldName.indexOf(this._relatedFieldPrefix)},this);a&&a.length>0&&(s.relatedInfo=this._getRelatedRecords({graphic:e,fieldsInfo:a}))}return this._needFullResolutionFeature(e)&&(s.fullResolutionFeature=this._getFullResolutionFeature(e)),c(s).then(t.hitch(this,function(i){var r=i.fullResolutionFeature,s=this.hasAsyncExpressions()?this._fetchAttributesAsync(e,r):this._fetchAttributes(e,r);return c([s]).then(t.hitch(this,function(t){return this._getPopupValues(e,t[0])}))}))},getAttachments:function(e){var t=e.getSourceLayer(),i=e.attributes;if(this.info.showAttachments&&t&&t.hasAttachments&&t.objectIdField){var r=i&&i[t.objectIdField];if(r)return t.queryAttachmentInfos(r)}},_needFullResolutionFeature:function(e){var t=e.getSourceLayer();return!!t&&("function"==typeof t.getMaxAllowableOffset&&t.getMaxAllowableOffset()>0&&this.hasGeometryOperations())},_getFullResolutionFeature:function(e){var t=e.getSourceLayer(),i=t.objectIdField,r=e.attributes,s=r&&i&&r[i];if(null==s)return null;var a=new m;return a.objectIds=[s],a.maxAllowableOffset=0,a.outFields=[i],t.queryFeatures(a).then(function(e){return e.features&&e.features[0]})},_isExpressionField:function(e){return this._reExprField.test(e)},_titleHasAsyncExpressions:function(){return i.some(this.getExpressionFieldsInTitle(),function(e){var t=this._exprCache[e];return!(!t||!t.async)},this)},_compileExpressions:function(e){var t={};return i.forEach(e,function(e){var i=e.returnType&&e.returnType.toLowerCase();t[e.name]=new p({expression:e.expression,returnType:"number"===i?"number":"string",profile:g})}),t},_getArcadeExpressions:function(){var e=[];for(var t in this._exprCache)e.push(this._exprCache[t]);return e},_fetchAttributesAsync:function(e,t){var i=this._fetchAttributes(e,t),r={};for(var s in i){var a=i[s];a&&a.then&&(r[s]=a)}return c(r).then(function(e){for(var t in e){var r=e[t];i[t]=r instanceof Error?null:r}return i})},_fetchAttributes:function(e,r,s){var a=t.clone(e.attributes)||{},n=r&&r.geometry,o=this._exprPrefix,l=this._exprCache;return s=s||i.map(this.info.expressionInfos,function(e){return e.name}),i.forEach(s,function(t){var i=o+t,r=l[t],s=r?e.evaluateExpression(r,this._getEvalOptions(r,e,n)):null;"string"==typeof s&&(s=f.encode(s)),a[i]=s},this),a},_getEvalOptions:function(e,t,i){var r=e.hasGeometryOperations(),s=t.getSourceLayer(),a=s&&(s.getMap()||s.parentLayer&&s.parentLayer.getMap()),n=g.getEvalOptions({expression:e,feature:t,layer:s,map:a,spatialReference:a&&a.spatialReference}),o=n.context.vars.$feature,l=!(!r||!i);return o&&l&&(o._geometry=i),n.skipCache=l,n},_getPopupValues:function(e,r,s){r=r||this._fetchAttributes(e);var a,n,o,l,f,u=this.info,h=e.getSourceLayer(),c=t.clone(r),p="",m="",_=h&&h._getDateOpts&&h._getDateOpts().properties;_=_&&_.slice(0);var y={dateFormat:{properties:_,formatter:"DateFormat"+this._insertOffset(this._dateFormats.shortDateShortTime)}};if(this._relatedInfo)for(l in this._relatedInfo)if(this._relatedInfo.hasOwnProperty(l)){var F=this._relatedInfo[l],g=this._relatedLayersInfo[l];F&&(i.forEach(F.relatedFeatures,function(e){for(f in e.attributes)if(e.attributes.hasOwnProperty(f)&&"esriRelCardinalityOneToOne"===g.relation.cardinality){var t=this._toRelatedFieldName([g.relation.id,f]);r[t]=c[t]=e.attributes[f]}},this),i.forEach(F.relatedStatsFeatures,function(e){for(f in e.attributes)if(e.attributes.hasOwnProperty(f)){var t=this._toRelatedFieldName([g.relation.id,f]);r[t]=c[t]=e.attributes[f]}},this))}for(n in c){var I=this._fieldsMap[n.toLowerCase()],v=this._getLayerFieldInfo(h,n);I&&v&&(I.fieldName=v.name);var x=c[n];if(c[n]=this._formatValue(x,n,y),_&&I&&I.format&&I.format.dateFormat){var L=i.indexOf(_,n);L>-1&&_.splice(L,1)}}if(h){var b=h.typeIdField;for(n in r)if(r.hasOwnProperty(n)&&-1===n.indexOf(this._relatedFieldPrefix)&&(o=r[n],d.isDefined(o))){var P=this._getDomainName(h,e,n,o);if(d.isDefined(P))c[n]=P;else if(n===b){var E=this._getTypeName(h,e,o);d.isDefined(E)&&(c[n]=E)}}}if(u.title&&(p=this._processFieldsInLinks(this._fixTokens(u.title,h),r),p=t.trim(this._removeEmptyHref(d.substitute(c,p,y)||""))),s)return{title:p};u.description&&(m=this._processFieldsInLinks(this._fixTokens(u.description,h),r),m=t.trim(this._removeEmptyHref(d.substitute(c,m,y)||""))),u.fieldInfos&&(a=[],i.forEach(u.fieldInfos,function(e){(n=e.fieldName)&&e.visible&&a.push([this._fieldLabels[n.toLowerCase()]||n,d.substitute(c,"${"+n+"}",y)||""])},this));var R,T;return u.mediaInfos&&(R=[],i.forEach(u.mediaInfos,function(e){switch(T=0,o=e.value,e.type){case"image":var s=o.sourceURL;s=s&&t.trim(this._removeEmptyHref(d.substitute(r,this._fixTokens(s,h)))),T=!!s;break;case"piechart":case"linechart":case"columnchart":case"barchart":var a,n=o.normalizeField;o.fields=i.map(o.fields,function(e){return a=this._getLayerFieldInfo(h,e),a?a.name:e},this),n&&(a=this._getLayerFieldInfo(h,n),o.normalizeField=a?a.name:n),T=i.some(o.fields,function(e){return d.isDefined(r[e])||-1!==e.indexOf(this._relatedFieldPrefix)&&this._relatedInfo},this);break;default:return}if(T){e=t.clone(e),o=e.value;var l=e.title?this._processFieldsInLinks(this._fixTokens(e.title,h),r):"",f=e.caption?this._processFieldsInLinks(this._fixTokens(e.caption,h),r):"";if(e.title=l?t.trim(this._removeEmptyHref(d.substitute(c,l,y)||"")):"",e.caption=f?t.trim(this._removeEmptyHref(d.substitute(c,f,y)||"")):"","image"===e.type)o.sourceURL=d.substitute(r,this._fixTokens(o.sourceURL,h)),o.linkURL&&(o.linkURL=t.trim(d.substitute(r,this._fixTokens(o.linkURL,h))||""));else{var u,p;i.forEach(o.fields,function(e,t){if(-1!==e.indexOf(this._relatedFieldPrefix))p=this._getRelatedChartInfos(e,o,r,y),p instanceof Array?o.fields=p:o.fields[t]=p;else{var i=r[e];i=void 0===i?null:i,u=r[o.normalizeField]||0,i&&u&&(i/=u),o.fields[t]={y:i,tooltip:(this._fieldLabels[e.toLowerCase()]||e)+":<br/>"+this._formatValue(i,e,y,!!u)}}},this)}R.push(e)}},this)),{title:p,description:m,hasDescription:!!u.description,fields:a&&a.length?a:null,mediaInfos:R&&R.length?R:null,formatted:c,editSummary:!1!==u.showLastEditInfo&&h&&h.getEditSummary?h.getEditSummary(e):""}},_getRelatedChartInfos:function(e,t,r,s){var a,n,o,l,f,u,h;return a=[],h=this._fromRelatedFieldName(e),f=h[0],n=this._relatedInfo[f],u=this._relatedLayersInfo[f],n&&i.forEach(n.relatedFeatures,function(i){var n,f,u=i.attributes;for(f in u)if(u.hasOwnProperty(f)&&f===h[1]){if(n={},l=u[f],t.normalizeField&&(o=-1!==t.normalizeField.indexOf(this._relatedFieldPrefix)?u[this._fromRelatedFieldName(t.normalizeField)[1]]:r[t.normalizeField]),l&&o&&(l/=o),t.tooltipField)if(-1!==t.tooltipField.indexOf(this._relatedFieldPrefix)){var c=this._fromRelatedFieldName(t.tooltipField)[1],p=d.isDefined(u[c])?this._formatValue(u[c],t.tooltipField,s,!!o):c;n.tooltip=p+":<br/>"+this._formatValue(l,c,s,!!o)}else n.tooltip=(this._fieldLabels[e.toLowerCase()]||e)+":<br/>"+this._formatValue(l,t.tooltipField,s,!!o);else n.tooltip=l;n.y=l,a.push(n)}},this),"esriRelCardinalityOneToMany"===u.relation.cardinality||"esriRelCardinalityManyToMany"===u.relation.cardinality?a:a[0]},_dateFormats:{shortDate:"(datePattern: 'M/d/y', selector: 'date')",shortDateLE:"(datePattern: 'd/M/y', selector: 'date')",longMonthDayYear:"(datePattern: 'MMMM d, y', selector: 'date')",dayShortMonthYear:"(datePattern: 'd MMM y', selector: 'date')",longDate:"(datePattern: 'EEEE, MMMM d, y', selector: 'date')",shortDateShortTime:"(datePattern: 'M/d/y', timePattern: 'h:mm a', selector: 'date and time')",shortDateLEShortTime:"(datePattern: 'd/M/y', timePattern: 'h:mm a', selector: 'date and time')",shortDateShortTime24:"(datePattern: 'M/d/y', timePattern: 'H:mm', selector: 'date and time')",shortDateLEShortTime24:"(datePattern: 'd/M/y', timePattern: 'H:mm', selector: 'date and time')",shortDateLongTime:"(datePattern: 'M/d/y', timePattern: 'h:mm:ss a', selector: 'date and time')",shortDateLELongTime:"(datePattern: 'd/M/y', timePattern: 'h:mm:ss a', selector: 'date and time')",shortDateLongTime24:"(datePattern: 'M/d/y', timePattern: 'H:mm:ss', selector: 'date and time')",shortDateLELongTime24:"(datePattern: 'd/M/y', timePattern: 'H:mm:ss', selector: 'date and time')",longMonthYear:"(datePattern: 'MMMM y', selector: 'date')",shortMonthYear:"(datePattern: 'MMM y', selector: 'date')",year:"(datePattern: 'y', selector: 'date')"},_reHref:/href\s*=\s*\"([^\"]+)\"/gi,_reHrefApos:/href\s*=\s*\'([^\']+)\'/gi,_fixTokens:function(e,t){var i=this;return e.replace(/(\{([^\{\r\n]+)\})/g,function(e,r,s){var a=i._getLayerFieldInfo(t,s);return"$"+(a?"{"+a.name+"}":r)})},_encodeAttributes:function(e){var i,r,s,a=t.clone(e)||{};for(i in a)(r=a[i])&&"string"==typeof r&&(s=encodeURIComponent(r).replace(/\'/g,"&apos;"),a[i]=s);return a},_processFieldsInLinks:function(e,i){var r=this._encodeAttributes(i),s=t.hitch(this,this._addValuesToHref,i,r);return e&&(e=e.replace(this._reHref,s).replace(this._reHrefApos,s)),e},_addValuesToHref:function(e,i,r,s){return s=s&&t.trim(s),r=d.substitute(s&&0===s.indexOf("${")?e:i,r)},_getLayerFieldInfo:function(e,t){return e&&e.getField?e.getField(t):null},_formatValue:function(e,r,s,a){var n=this._fieldsMap[r.toLowerCase()],o=n&&n.format,l=-1!==i.indexOf(s.dateFormat.properties,r),f=!("number"!=typeof e||l||o&&o.dateFormat);if(!d.isDefined(e)||!n||!d.isDefined(o))return this._applyFormatting(e,f);var u="",h=[],c=o.hasOwnProperty("places")||o.hasOwnProperty("digitSeparator"),p=!o.hasOwnProperty("digitSeparator")||o.digitSeparator;if(c&&!l)u="NumberFormat",h.push("places: "+(d.isDefined(o.places)&&(!a||o.places>0)?Number(o.places):"Infinity")),h.length&&(u+="("+h.join(",")+")");else{if(!o.dateFormat)return this._applyFormatting(e,f);u="DateFormat"+this._insertOffset(this._dateFormats[o.dateFormat]||this._dateFormats.shortDateShortTime)}var m=this._applyFormatFunctions(e,u,s);return c&&e.constructor.toString().indexOf("Array")>-1&&(m="",i.forEach(e,t.hitch(this,function(e,t){t&&(m+=" "),m+=this._applyFormatFunctions(e,u,s)}))),c&&!p&&v.group&&(m=m.replace(new RegExp("\\"+v.group,"g"),"")),l&&(m='<span class="esriDateValue">'+m+"</span>"),this._applyFormatting(m,f)},_applyFormatFunctions:function(e,t,i){return d.substitute({myKey:e},"${myKey:"+t+"}",i)||""},_applyFormatting:function(e,t){return t?this._forceLTR(e):this._applyPreWrap(e)},_forceLTR:function(e){var t=o("ie");return t&&t<=10?e:"<span class='esriNumericValue'>"+e+"</span>"},_applyPreWrap:function(e){return"string"==typeof e?e.replace(this._reNewline,"<span class='charNewLine'>$1</span>"):e},_insertOffset:function(e){return e&&(e=d.isDefined(this.utcOffset)?e.replace(/\)\s*$/,", utcOffset:"+this.utcOffset+")"):e),e},_getDomainName:function(e,t,i,r){var s=e.getDomain&&e.getDomain(i,{feature:t});return s&&s.codedValues?s.getName(r):null},_getTypeName:function(e,t,i){var r=e.getType&&e.getType(t);return r&&r.name},_getRelatedRecords:function(e){var i,r=e.graphic;return this._relatedLayersInfoPromise||(this._relatedLayersInfoPromise=this._getRelatedLayersInfo(e).then(t.hitch(this,function(e){for(i in e)e.hasOwnProperty(i)&&e[i]&&(this._relatedLayersInfo[i].relatedLayerInfo=e[i])}))),this._relatedLayersInfoPromise.then(t.hitch(this,function(){return this._queryRelatedLayers(r)})).then(t.hitch(this,function(e){return this._setRelatedRecords(r,e),e}))},_getRelatedLayersInfo:function(e){var t,r,s=e.graphic,a=e.fieldsInfo,n={};t=s.getSourceLayer(),this._relatedLayersInfo||(this._relatedLayersInfo={}),i.forEach(a,function(e){var r,s,a,n,o;r=this._fromRelatedFieldName(e.fieldName),s=r[0],a=r[1],s&&(!this._relatedLayersInfo[s]&&t&&t.relationships&&(i.some(t.relationships,function(e){if(e.id==s)return o=e,!0}),o&&(this._relatedLayersInfo[s]={relation:o,relatedFields:[],outStatistics:[]})),this._relatedLayersInfo[s]&&(this._relatedLayersInfo[s].relatedFields.push(a),e.statisticType&&(n=new F,n.statisticType=e.statisticType,n.onStatisticField=a,n.outStatisticFieldName=a,this._relatedLayersInfo[s].outStatistics.push(n))))},this);for(r in this._relatedLayersInfo)if(this._relatedLayersInfo.hasOwnProperty(r)){var o,f;this._relatedLayersInfo[r]&&(o=this._relatedLayersInfo[r].relation,f=t.url.replace(/[0-9]+$/,o.relatedTableId),this._relatedLayersInfo[r].relatedLayerUrl=f,n[r]=h({url:f,content:{f:"json"},callbackParamName:"callback"}))}return l(n)},_queryRelatedLayers:function(e){var t,i={};for(t in this._relatedLayersInfo)this._relatedLayersInfo.hasOwnProperty(t)&&(i[t]=this._queryRelatedLayer({graphic:e,relatedInfo:this._relatedLayersInfo[t]}));return l(i)},_queryRelatedLayer:function(e){var r,s,a,o,f,d,u,h,c,p,y,F,g,I,v;return r=e.graphic,s=r.getSourceLayer(),a=s.url.match(/[0-9]+$/g)[0],F=e.relatedInfo,p=F.relatedLayerInfo,g=F.relatedLayerUrl,I=F.relation,i.some(p.relationships,function(e){if(e.relatedTableId===parseInt(a,10))return o=e,!0},this),o&&(f=new m,i.some(p.fields,function(e){if(e.name===o.keyField)return h=-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],e.type)?"number":"string",!0}),o.relationshipTableId&&o.keyFieldInRelationshipTable?(v=new n,this._queryRelatedRecords(r,o).then(t.hitch(this,function(e){var a,n;if(!(a=e[r.attributes[s.objectIdField]]))return void v.resolve();n=i.map(a.features,function(e){return e.attributes[p.objectIdField]},this),F.outStatistics&&F.outStatistics.length>0&&p.supportsStatistics&&(c=new m,c.objectIds=n,c.outFields=f.outFields,c.outStatistics=F.outStatistics),c&&(d=new _(g),d.execute(c).then(t.hitch(this,function(e){var t=[];t.push(a),t.push(e),v.resolve(t)})))}))):(u="string"===h?o.keyField+"='"+r.attributes[I.keyField]+"'":o.keyField+"="+r.attributes[I.keyField],f.where=u,f.outFields=F.relatedFields,F.outStatistics&&F.outStatistics.length>0&&p.supportsStatistics&&(c=new m,c.where=f.where,c.outFields=f.outFields,c.outStatistics=F.outStatistics),d=new _(g),y=[],y.push(d.execute(f)),c&&y.push(d.execute(c)))),y?l(y):v?v.promise:void 0},_setRelatedRecords:function(e,t){this._relatedInfo=[];var i;for(i in t)if(t.hasOwnProperty(i)&&t[i]){var r=t[i];this._relatedInfo[i]={},this._relatedInfo[i].relatedFeatures=r[0].features,d.isDefined(r[1])&&(this._relatedInfo[i].relatedStatsFeatures=r[1].features)}},_handlerErrorResponse:function(e,t){e.reject(t)},_fromRelatedFieldName:function(e){var t,i=[];return-1!==e.indexOf(this._relatedFieldPrefix)&&(t=e.split("/"),i=t.slice(1)),i},_toRelatedFieldName:function(e){var t="";return e&&e.length>0&&(t=this._relatedFieldPrefix+e[0]+"/"+e[1]),t},_queryRelatedRecords:function(e,t){var i=e.getSourceLayer(),r=new y;return r.outFields=["*"],r.relationshipId=t.id,r.objectIds=[e.attributes[i.objectIdField]],i.queryRelatedFeatures(r)},_removeEmptyHref:function(e){var t=/href=(""|'')/gi;return e.replace(t,"")}});return a("extend-esri")&&(u.PopupInfo=u.PopupInfoTemplate=x),x});