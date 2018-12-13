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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/has","dojo/string","dojo/i18n!../../nls/jsapi","dojo/dom-style","dojo/dom-class","dojo/dom-construct","dojo/store/Memory","dojo/data/ObjectStore","dojo/json","../../lang","../../kernel","../../layers/RasterFunction","dojo/text!../../layers/support/rasterFunctionSchema.json","dojo/text!../../layers/support/rasterFunctionResources.json","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/form/TextBox","dijit/form/CheckBox","dijit/form/NumberTextBox","dijit/form/Select","dijit/TitlePane","dijit/Tooltip","./RFxArgSlider","./RFxBandMatrix","./RFxRasterArrayEditor","./RFxStatisticsGrid","./RFxBandIndexPicker","./RFxRasterInput","./RFxFeatureSelect","./RFxFieldSelect","./utils","../ColorRampSelector","../../renderers/colorRampUtils"],function(t,e,r,i,a,n,s,o,u,l,c,d,g,h,f,p,m,_,v,y,A,R,x,b,F,T,w,S,E,j,I,k,O,N,C,L){var W,D,U,B,P={argsTable:"esriRFxArgsEditor__table",argTableRow:"esriRFxArgsEditor__tr",argNameTableRow:"esriRFxArgsEditor__tr--arg-name",argWidgetTableRow:"esriRFxArgsEditor__tr--arg-widget",fxDesc:"esriRFxArgsEditor__label--fx-desc",warningIcon:"esriRFxArgsEditor__icon--warning"},V="RasterFunctionTemplate",H="RasterFunctionVariable",M=t([_,v],{declaredClass:"esri.dijit.RasterFunctionEditor.RFxArgsEditor",widgetsInTemplate:!0,templateString:"<div class='esriRFxArgsEditor'><div data-dojo-attach-point='_argsContainterNode'></div></div>",_inputWidgets:[],_supportedDataTypes:["raster","long","double","string","longarray","stringarray","doublearray","rasterarray","colorramp","boolean","rasterstatisticsarray","arrayofrasterstatistics","cellsize","featureclass"],constructor:function(r){t.safeMixin(this,r),this._i18n=n.widgets.rasterFunctionEditor.rfxArgsEditor,this._rfxTemplate=e.clone(this.rfxTemplate),W=d.parse(a.substitute(p,n,e.hitch(this,this._substituteString))),D=d.parse(a.substitute(m,n,e.hitch(this,this._substituteString))),U=D&&D.enums,B=D&&D.dataTypes},startup:function(t){this.inherited(arguments)},postCreate:function(t){this.inherited(arguments),this.rfxTemplate&&(this._honorIsPublic=this._getHonorIsPublic(this.rfxTemplate),this._populateUI())},destroy:function(){this._destroyInputWidgets(),this.inherited(arguments)},reset:function(){},getName:function(){return this._rfxTemplate&&this._rfxTemplate.name},getRFT:function(){return this._getRFT(this._rfxTemplate)},getUpdatedRFTWithValues:function(){var t=this._getUpdatedRFTWithValues(this._rfxTemplate);return this._cloneRFT(t,["input","uxBlocks"])},_getUpdatedRFTWithValues:function(t){if(t){var e=t.arguments,r=this._getFunctionSchema(t);return e&&(this._isRFxArg(e)?t.arguments=this._getUpdatedRFxArg(e,"Raster",r):Object.keys(e).forEach(function(t){if("type"!==t){var i=e[t];i&&(e[t]=this._getUpdatedRFxArg(i,t,r))}},this)),t}},_getRFT:function(t){if(t){var e=t.arguments,r=this._getFunctionSchema(t);return e&&(this._isRFxArg(e)?t.arguments=this._getUpdatedRFxArg(e,"Raster",r):Object.keys(e).forEach(function(t){if("type"!==t){var i=e[t];i&&(e[t]=this._getUpdatedRFxArg(i,t,r))}},this)),this._cloneRFT(t,["input","uxBlocks"])}},_isRFxArg:function(t){var e=t.type;return[V,H].indexOf(e)>=0||this._isColorRamp(t)||this._isRecordSet(t)},_getUpdatedRFxArg:function(t,e,i){if(!t||!this._isRFxArg(t))return t;var a=this._getArgRFT(t),n=i&&i.rasterFunctionArguments,s=this._getCaseInsenstitiveArg(e,n);if(s&&(s.key=e),a)return t.type===H?(t.value=this._getRFT(a),t):this._getRFT(a);if(this._hasRFTElements(t)&&!this._isShown(t)){var o=t.value&&t.value.elements?t.value.elements:t.value;return r.forEach(o,function(t,e){a=this._getArgRFT(t),a?o[e]=this._getRFT(a):t.type===H?t.value=this._getArgumentValue(t,s):o[e]=this._getArgumentValue(t,s)},this),t}return t.type!==H&&!this._isRecordSet(t)||this._isColorRamp(t)?this._isColorRamp(t)?this._getArgumentValue(t,s):void 0:(t.value=this._getArgumentValue(t,s),t)},_substituteString:function(t,e){if(void 0===t)throw new Error(" RFxArgsEditor: "+e);return null===t?"":this._escapeValue(String(t))},_getHonorIsPublic:function(t){var i=t&&t.arguments;if(!t||!i)return!1;if(t.aliases)return!0;var a=e.hitch(this,function(t){if(!t)return!1;if(this._hasRasterElements(t)){var e=t.value&&t.value.elements?t.value.elements:t.value;return r.some(e,function(t){return this._getHonorIsPublic(this._getArgRFT(t))},this)}return this._getHonorIsPublic(this._getArgRFT(t))});return this._isRFxArg(i)?a(i):r.some(Object.keys(i),function(t){var e=i[t];if(this._isRFxArg(e))return a(e)},this)},_hasRFTElements:function(t){if(!t||!t.value)return!1;var e=t.value.elements?t.value.elements:t.value;return Array.isArray(e)?e.some(function(t){return t&&t.type===V}):void 0},_hasRasterElements:function(t){if(!t||!t.value)return!1;var e=t.value.elements?t.value.elements:t.value,r=e[0];return r&&(r.isDataset||r.type===V)},_isRecordSet:function(t){return t.type&&t.type.toLowerCase().indexOf("recordset")>=0},_isColorRamp:function(t){return!!t&&(!!(t.type&&t.type.toLowerCase().indexOf("colorramp")>=0)||(!!(t.value&&t.value.type&&t.value.type.toLowerCase().indexOf("colorramp")>=0)||void 0))},_getArgRFT:function(t){if(t)return t.type===V?t:t.value&&t.value.type===V?t.value:void 0},_cloneRFT:function(t,i){var a={};if("object"==typeof t&&null!==t&&!Array.isArray(t)){for(var n in t)t.hasOwnProperty(n)&&r.indexOf(i,n)<0&&(a[n]=this._cloneRFT(t[n],i));return a}return Array.isArray(t)?t.map(e.hitch(this,function(t){return this._cloneRFT(t,i)})):e.clone(t)},_populateUI:function(){this._destroyInputWidgets(),u.empty(this._argsContainterNode),this._buildRFxTemplateUI(this._rfxTemplate)},_buildRFxTemplateUI:function(t){var e=t.arguments;t.function&&t.name&&e&&this._buildRFxUI(t),e&&(this._isRFxArg(e)?this._buildArgRFTUI(e):Object.keys(e).forEach(function(t){if("type"!==t){var r=e[t];this._isRFxArg(r)&&this._buildArgRFTUI(r)}},this))},_buildArgRFTUI:function(t){if(t){var e=this._getArgRFT(t);if(e)this._buildRFxTemplateUI(e);else if(this._hasRasterElements(t)){var i=t&&t.value.elements?t.value.elements:t.value;r.forEach(i,function(t){(e=this._getArgRFT(t))&&this._buildRFxTemplateUI(e)},this)}}},_getFunctionSchema:function(t){if(t&&t.function&&t.function.type){var e,r,i=t.function.type;return"gpadapterfunction"===i.toLowerCase()?(e=t&&t.arguments&&t.arguments.ToolName,e=e.value&&e.value.replace("_sa",""),W[e]):"pythonadapterfunction"===i.toLowerCase()?(r=t&&t.arguments&&t.arguments.ClassName,"object"==typeof r?W[r.value]:W[r]):W[i]}},_getSchemaArgKey:function(t,e){if(t){var i,a=Object.keys(t);return void 0===e&&1===a.length?a[0]:(r.some(a,function(t){t.toLowerCase()===(e&&e.toLowerCase())&&(i=t)}),i)}},_buildRFxArgUI:function(t){t=t||{};var e,i,a=[],n=t.rfxArg,s=t.rfxArgName,o=t.functionSchemaArgs,u=t.schemaEditorOverrides,l=t.rfxArgs,c=t.container,d=t.overriddenArgNames,g=t.triggerArgs;if(n)return o&&(e=this._getSchemaArgKey(o,s),(i=o[e])&&(i.key=e)),u&&r.some(u,function(t){r.indexOf(t.argumentNames,e)>=0&&this._isOverrideWidgetShown(t.argumentNames,l)&&r.indexOf(d,e)<0&&(d=d.concat(t.argumentNames),this._buildOverrideWidgetLayout(t,l,c,o))},this),r.indexOf(d,e)<0&&n.type&&n.type!==V&&this._isShown(n,i)&&(i&&r.indexOf(this._supportedDataTypes,i.dataType)<0?a.push(n.name||i.displayName):this._buildRFxArgLayout(n,c,i,l)),i&&i.editorStateTrigger&&i.editorStateTrigger.active&&g.push({rfxArg:n,schemaArgDef:i}),{overriddenArgNames:d,unsupportedDataTypeArgs:a}},_buildRFxUI:function(t){function i(t){if(t){var e=t.overriddenArgNames,r=t.unsupportedDataTypeArgs;e&&(s=s.concat(e),m.overriddenArgNames=s),r&&(o=o.concat(r),m.unsupportedDataTypeArgs=o)}}var a,n=t.arguments,s=[],o=[],l=[],c=this._getFunctionSchema(t),d=c&&c.rasterFunctionArguments,g=c&&c.editorArgumentOverride&&c.editorArgumentOverride.active?c.editorArgumentOverride.overrides:null,h=u.create("table",{class:P.argsTable}),f=u.create("tbody",null,h),p=u.create("div",null,this._argsContainterNode,"first"),m={functionSchema:c,functionSchemaArgs:d,schemaEditorOverrides:g,rfxArgs:n,container:f,triggerArgs:l,overriddenArgNames:s};n&&(this._isRFxArg(n)?(a=this._buildRFxArgUI(e.mixin({rfxArg:n},m)),i(a)):Object.keys(n).forEach(function(t){var r=n[t];r&&this._isRFxArg(r)&&(a=this._buildRFxArgUI(e.mixin({rfxArg:r,rfxArgName:t},m)),i(a))},this),Object.keys(n).forEach(function(t){var e=n[t];e&&e.input&&e.input.declaredClass.indexOf("RFxFieldSelect")>0&&e.input.setFieldOptions()}),r.forEach(l,function(t){var e=t.rfxArg,r=e&&e.value;this._handleEditorStateTriggers(n,r,t.schemaArgDef)},this)),f.childNodes&&f.childNodes.length&&this._buildTitlePane(h,p,t.function,o)},_isOverrideWidgetShown:function(t,e){var i;return r.some(t,function(t){if(i=this._getCaseInsenstitiveArg(t,e),this._isShown(i))return!0},this)},_isShown:function(t,e){return!!t&&(!(this._honorIsPublic&&!t.isPublic)&&(!e||!e.hidden))},_buildTitlePane:function(t,r,i,a){var n=new b({title:i&&i.name,content:t},r);n.startup();var s=e.hitch(this,function(t,e){this.own(new F({connectId:[t],label:"<div class='"+P.fxDesc+"'>"+e+"</div>"})),t.onclick=function(t){t.stopPropagation()}});if(n.titleNode){if(s(u.create("a",{class:"esriFloatTrailing helpIcon",style:"float: right; margin-right: -6px;"},n.titleNode),i&&i.description),a&&a.length){s(u.create("a",{class:P.warningIcon},n.titleNode),this._i18n.unsupportedDataTypeWarning+"<br><br><strong>"+a.join(", ")+"</strong>")}}},_buildRFxArgLayout:function(t,e,r,i){var a,n,s;return n=(r&&r.dataType)===B.boolean,s=this._useRFxArgWidget(r),(s||n)&&(a=u.create("tr",{class:P.argTableRow},e),t.uxBlocks=[a]),s?this._buildRFxWidgetLayout(a,t,r,i):n?this._buildBooleanLayout(a,t,r,i):this._buildStdTwoRowLayout(e,t,r,i)},_useRFxArgWidget:function(t){return t&&t.domain&&"range"===t.domain.type},_createInputWidget:function(t,e,r,i){var a=this._getWidget(t,e,r,i);a.startup(),t.input=a,this._inputWidgets.push(a)},_createOverrideWidget:function(t,i,a){var n=new t(i,a),s=i&&i.inputArgs;n.startup(),this._inputWidgets.push(n),n.on("drawtool-activate",e.hitch(this,function(t){this.emit("drawtool-activate",t)})),n.on("drawtool-deactivate",e.hitch(this,function(t){this.emit("drawtool-deactivate",t)})),n.on("add-layer",e.hitch(this,function(t){this.emit("add-ready-to-use-layer",t)})),n.domNode&&s&&r.forEach(Object.keys(s),function(t){var e=s[t];e&&(e.uxBlocks=[n.domNode])})},_buildOverrideWidgetLayout:function(t,i,a,n){if(t){var s,o,l={},c={};r.forEach(t.argumentNames,function(t){s=this._getCaseInsenstitiveArg(t,i);var e=n[t];e&&(e.key=t),s&&(s.displayName=this._getArgDisplayName(s.name,e),c[t]=s)},this),r.forEach(Object.keys(n),function(t){o=n[t],o.dataType===B.raster&&(s=this._getCaseInsenstitiveArg(t,i))&&(l[t]=s)},this);try{require([t.widget.path],e.hitch(this,function(t){var r,i,n=u.create("tr",{class:P.argTableRow},a);r=u.create("td",null,n),i=u.create("div",null,r),this._createOverrideWidget(t,{rasterFunctionEnums:U,rasterFunctions:W,rasterArgs:l,inputArgs:c,inputLayers:this.inputLayers,browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf},allowScalar:!1,isShownFx:e.hitch(this,this._isShown)},i)}))}catch(t){console.error(t),r.forEach(Object.keys(c),function(t){s=c[t],o=this._getCaseInsenstitiveArg(t,n),this._buildRFxArgLayout(s,a,o,i)},this)}}},_buildBooleanLayout:function(t,e,r,i){var a,n;a=u.create("td",{innerHTML:this._getArgDisplayName(e.name,r)},t),n=u.create("div",null,a,"first"),this._createInputWidget(e,n,r,i)},_buildStdTwoRowLayout:function(t,e,r,i){var a,n,s,o;a=u.create("tr",{class:P.argNameTableRow},t),u.create("td",{innerHTML:this._getArgDisplayName(e.name,r)},a),n=u.create("tr",{class:P.argWidgetTableRow},t),o=u.create("td",null,n),s=u.create("div",null,o),e.uxBlocks=[a,n],this._createInputWidget(e,s,r,i)},_getArgDisplayName:function(t,e){var r=e&&e.key;return!e||t!==r&&void 0!==t&&""!==t?t:e.displayName},_buildRFxWidgetLayout:function(t,e,r,i){var a,n;a=u.create("td",null,t),n=u.create("div",null,a),this._createInputWidget(e,n,r,i)},_getDatasetOptions:function(){if(this.inputLayers)return this._inputLayerStore=new c(new l({data:this.inputLayers})),this._inputLayerStore},_destroyInputWidgets:function(){var t=this._inputWidgets;r.forEach(t,function(t){if(t&&t.destroy)try{t.destroy()}catch(t){console.log(t)}}),this._inputWidgets=[]},_getWidget:function(t,r,i,a){if(t){var n,s=i&&i.dataType,o=t.value,u=i&&i.domain,l=i&&i.dataTypeAttributes,c=this._getArgRFT(t);if(c){var d=c.function&&c.function.name;n=new y({value:"<"+d+"."+this._i18n.outputRaster+">",disabled:!0},r)}return t.isDataset&&!n&&(n=new I({inputLayers:this.inputLayers,value:o,allowScalar:!i||i.allowScalar,browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf}},r)),n||(n=u?this._getDomainBasedWidget(u,t,a,r):this._getDataTypeBasedWidget(s,l,t,a,r,i)),n&&(n.on("change",e.partial(e.hitch(this,this._onArgumentValueChange),t,i,a)),n.on("add-layer",e.hitch(this,function(t){this.emit("add-ready-to-use-layer",t)}))),n}},_getDataTypeBasedWidget:function(t,r,i,a,n,s){var o,u=i.value;if(r&&"bandmatrix"===r.type)return this._getDataTypeAttributeBasedWidget(t,r,i,a,n);switch(t){case B.raster:i.isDataset||(o=new R({value:u&&u.length?u[0]:void 0},n));break;case B.rasterArray:o=new S({inputLayers:this.inputLayers,value:u,getRFT:e.hitch(this,this._getRFT),allowScalar:s.allowScalar,browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf}},n);break;case B.string:o=new y({value:u},n);break;case B.double:o=new R({value:u},n);break;case B.long:o=new R({constraints:{places:0},value:u},n);break;case B.colorRamp:var l=N.getColorRampFromArg(i);o=new C({style:"text-indent: 0; height: 2.2em;",maxHeight:200,includeDefault:!1,colorRamp:l},n);break;case B.boolean:o=new A({checked:u},n);break;case B.stringArray:case B.doubleArray:case B.longArray:u&&u.length&&(u=u.join(",")),o=new y({value:u},n);break;case B.rasterStatisticsArray:case B.arrayOfRasterStatistics:o=new E({value:u},n);break;case B.cellSize:case void 0:o=new y({},n);try{"string"==typeof u?o.set("value",u):o.set("value",d.stringify(u))}catch(t){o.set("value",u)}break;case B.featureClass:o=new k({inputLayers:this.featureLayers,geometryType:r?r.type:null,browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf}},n);break;default:o=new y({value:String(u)},n)}return o},_getDomainBasedWidget:function(t,e,r,i){if(t&&e){var a,n=t&&t.type,s=e.value;if("numlist"===n){var o=new c(new l({idProperty:"key",data:this._getNumListData(t)}));a=new x({store:o,labelAttr:"key"},i),g.isDefined(s)&&a.set("value",s.toString())}else if("list"===n){var u=this._getEnumData(U[t.enum]),d=new c(new l({idProperty:"key",data:u}));a=new x({store:d,labelAttr:"label",maxHeight:200},i),g.isDefined(s)&&a.set("value",s.toString())}else if("range"===n)a=new T({min:t.min,max:t.max,label:e.name,value:s},i);else if("bandIndex"===n){var h=this._getCaseInsenstitiveArg(t.argumentName,r);a=new j({nBandsArg:h,value:s},i)}else if("fields"===n){var f=this._getCaseInsenstitiveArg(t.argumentName,r);a=new O({layerArg:f},i)}return a}},_getDataTypeAttributeBasedWidget:function(t,e,r,i,a){var n=this._getCaseInsenstitiveArg(e.nBands,i);return new w({nBandsArg:n,nCols:e.cols,displayNames:e.displayNames,value:r.value},a)},_getNumListData:function(t){if(t){for(var e=[],r=t.start,i=0;i<t.count;r+=t.inc,i++)e.push({key:r.toString()});return e}},_getEnumData:function(t){return r.forEach(t,function(t){t.key=t.key.toString()}),t},_onArgumentValueChange:function(t,e,r,i){(t&&t.input)instanceof x&&e&&e.dataType===B.long&&(i=parseInt(i,10)),Object.keys(r).forEach(function(e){var i=r[e]&&r[e].input;i&&i.declaredClass.indexOf("RFxFieldSelect")>0&&i.layerArg&&i.layerArg.name===t.name&&i.setFieldOptions()}),this._handleEditorStateTriggers(r,i,e)},_handleEditorStateTriggers:function(t,e,i){i&&i.editorStateTrigger&&i.editorStateTrigger.active&&t&&r.forEach(i.editorStateTrigger.triggers,function(i){var a,n,o,u,l,c,d=i.autoRevert;for(var g in t)t.hasOwnProperty(g)&&(a=t[g],(l=a.uxBlocks)&&(n=r.indexOf(i.values,e)>=0,o=this._containsArgName(i.active,g),u=this._containsArgName(i.inactive,g),(o&&n||u&&!n&&d)&&(c=l&&l[0]&&"TR"===l[0].tagName?"table-row":"block"),(u&&n||o&&!n&&d)&&(c="none"),r.forEach(l,function(t){t&&c&&s.set(t,"display",c)}),c=null))},this)},_containsArgName:function(t,e){if(!t||!e)return!1;var i=e.toLowerCase();return r.some(t,function(t){return t.toLowerCase()===i})},_getArgumentValue:function(t,e){function i(t){return r.some(t,function(t){if(u instanceof t)return!0})}if(t){var a,n,s,o,u=t.input,l=e&&e.dataType;if(!u)return t.value;var c=[R,x,y],g=[A],h=[T,w,S,E,I,k];if(i([C]))return N.getRFxArgColorRampValue(u.colorRamp);if(i(h))return u.get("value");if(i(c))switch(n=u.value,l&&l.indexOf("array")>=0&&n&&"string"==typeof n&&(a=n.indexOf(",")>=0?n.split(","):n.split(" ")),l){case B.raster:if(!t.isDataset)return{value:n,type:"Scalar"};break;case B.longArray:return r.forEach(a,function(t,e){a[e]=parseInt(t,10)}),a;case B.doubleArray:return r.forEach(a,function(t,e){a[e]=parseFloat(t)}),a;case B.stringArray:case B.rasterArray:return r.forEach(a,function(t,e){a[e]=t.trim()}),a;case B.long:return parseInt(n,10);case B.cellSize:try{return d.parse(n)}catch(t){return n}return n;case void 0:return n=n&&n.trim(),s=/^[+-]?(\d+)?(\.\d+)?$/.test(n),o=r.indexOf(["true","false"],n)>=0,s?parseFloat(n):o?"true"===n:n;default:return n}else if(i(g))return u.checked}},_getCaseInsenstitiveArg:function(t,e){if(t&&e)return r.some(Object.keys(e),function(e){if(e.toLowerCase()===t.toLowerCase())return t=e,!0}),e[t]},_selectInputDataset:function(t,e){if(t&&t.options.length&&e){var i=e,a=null;"object"==typeof e&&(i=e.url,a=e.name);var n=g.isDefined(a);r.forEach(t.options,function(t){t.selected=t.item.url===i&&(!n||n&&a===t.item.name)},this)}}});return i("extend-esri")&&e.setObject("dijit.RasterFunctionEditor.RFxArgsEditor",M,h),M});