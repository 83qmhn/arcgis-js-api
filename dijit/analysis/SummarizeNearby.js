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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/_base/fx","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/number","dojo/fx/easing","dojo/on","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","../../kernel","../../lang","./AnalysisBase","./_AnalysisOptions","./CreditEstimator","./utils","./TrafficTime","./components/AddSummaryFields","dojo/i18n!../../nls/jsapi","dojo/text!./templates/SummarizeNearby.html"],function(e,t,s,i,a,r,n,h,o,l,u,y,m,c,d,p,_,g,f,L,b,S,v,T,N,M,O,k,C,U,j,w,A,D,B,F,I,P,x,G,H,W){var E=t([f,L,b,S,v,F,B],{declaredClass:"esri.dijit.analysis.SummarizeNearby",templateString:W,widgetsInTemplate:!0,sumNearbyLayer:null,summaryLayers:null,summaryFields:null,nearType:null,outputLayerName:null,summarizeMetric:!0,summaryLayer:null,groupByField:null,minorityMajority:!1,percentPoints:!1,distances:null,units:null,shapeUnits:null,sumShape:!0,enableTravelModes:!0,i18n:null,toolName:"SummarizeNearby",helpFileName:"SummarizeNearby",resultParameter:"resultLayer",constructor:function(e){this._pbConnects=[],e.containerNode&&(this.container=e.containerNode),D.isDefined(e.percentShape)&&(this.percentPoints=e.percentShape)},destroy:function(){this.inherited(arguments),i.forEach(this._pbConnects,a.disconnect),delete this._pbConnects,this._driveTimeClickHandles&&this._driveTimeClickHandles.length>0&&(i.forEach(this._driveTimeClickHandles,a.disconnect),this._driveTimeClickHandles=null)},postMixInProperties:function(){this.inherited(arguments),s.mixin(this.i18n,H.bufferTool),s.mixin(this.i18n,H.driveTimes),s.mixin(this.i18n,H.summarizeNearbyTool)},postCreate:function(){this.inherited(arguments),d.add(this._form.domNode,"esriSimpleForm"),this._breakValuesInput.set("validator",s.hitch(this,this.validateDistance)),P.getNetworkAnalysisLimits(this).then(s.hitch(this,function(e){this.limits=e})),this._outputLayerInput.set("validator",s.hitch(this,this.validateServiceName)),this._buildUI()},startup:function(){},_onClose:function(e){e&&(this._save(),this.emit("save",{save:!0})),this.emit("close",{save:e})},_handleShowCreditsClick:function(e){if(e.preventDefault(),this._form.validate()){var t,i,a={};t=this.summaryLayers[this._layersSelect.get("value")],a.summaryLayer=r.toJson(this.constructAnalysisInputLyrObj(t)),a.nearType=this.get("nearType"),a.sumNearbyLayer=r.toJson(this.constructAnalysisInputLyrObj(this.sumNearbyLayer)),i=this._nearTypeSelect.getOptions(this._nearTypeSelect.get("value")),a.nearType=i.travelMode?r.toJson(i.travelMode):this._nearTypeSelect.get("value"),a.summaryFields=r.toJson(this._summaryWidget.get("summaryFields")),a.distances=r.toJson(this.get("distances")),a.units=this._distanceUnitsSelect.get("value"),this._trafficTimeWidget.get("checked")&&(a.timeOfDay=this._trafficTimeWidget.get("timeOfDay"),"UTC"===this._trafficTimeWidget.get("timeZoneForTimeOfDay")&&(a.timeZoneForTimeOfDay=this._trafficTimeWidget.get("timeZoneForTimeOfDay"))),this.returnFeatureCollection||(a.OutputName=r.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),a.sumShape=this._sumMetricCheck.get("checked"),"esriGeometryPoint"===t.geometryType&&"esriGeometryMultipoint"===t.geometryType||(a.shapeUnits=this.get("shapeUnits")),"0"!==this._groupBySelect.get("value")&&(a.groupByField=this._groupBySelect.get("value")),a.returnBoundaries=this.get("returnBoundaries"),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(a.context=r.toJson({extent:this.map.extent._normalize(!0)})),this.getCreditsEstimate(this.toolName,a).then(s.hitch(this,function(e){this._usageForm.set("content",e),this._usageDialog.show()}))}},_handleSaveBtnClick:function(){if(this._form.validate()){if(!this._sumMetricCheck.get("checked")&&0===this.get("summaryFields").length)return void this._showMessages(this.i18n.statsRequiredMsg);this._saveBtn.set("disabled",!0);var e,t,s,i={},a={};e=this.summaryLayers[this._layersSelect.get("value")],i.summaryLayer=r.toJson(this.constructAnalysisInputLyrObj(e)),s=this._nearTypeSelect.getOptions(this._nearTypeSelect.get("value")),i.nearType=s.travelMode?r.toJson(s.travelMode):this._nearTypeSelect.get("value"),i.sumNearbyLayer=r.toJson(this.constructAnalysisInputLyrObj(this.sumNearbyLayer)),i.summaryFields=r.toJson(this._summaryWidget.get("summaryFields")),i.distances=this.get("distances"),i.units=this._distanceUnitsSelect.get("value"),this._trafficTimeWidget.get("checked")&&(i.timeOfDay=this._trafficTimeWidget.get("timeOfDay"),"UTC"===this._trafficTimeWidget.get("timeZoneForTimeOfDay")&&(i.timeZoneForTimeOfDay=this._trafficTimeWidget.get("timeZoneForTimeOfDay"),i.liveOffset=this._trafficTimeWidget.get("liveOffset"))),i.returnBoundaries=this.get("returnBoundaries"),this.returnFeatureCollection||(i.OutputName=r.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),i.sumShape=this._sumMetricCheck.get("checked"),"esriGeometryPoint"===e.geometryType&&"esriGeometryMultipoint"===e.geometryType||(i.shapeUnits=this.get("shapeUnits")),"0"!==this._groupBySelect.get("value")&&(i.groupByField=this._groupBySelect.get("value"),this.resultParameter=["resultLayer","groupBySummary"],i.minorityMajority=this.get("minorityMajority"),i.percentShape=this.get("percentPoints")),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(i.context=r.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(t={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.extent=this.map.extent._normalize(!0)),i.context=r.toJson(t)),a.jobParams=i,a.itemParams={description:l.substitute(this.i18n.itemDescription,{sumNearbyLayerName:this.sumNearbyLayer.name,summaryLayerName:e.name}),tags:l.substitute(this.i18n.itemTags,{sumNearbyLayerName:this.sumNearbyLayer.name,summaryLayerName:e.name}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(a.itemParams.folder=this.get("folderId")),this.execute(a)}},_initializeShapeUnits:function(e){this._prevGeometryType&&this._prevGeometryType===e||(this._shapeUnitsSelect.removeOption(this._shapeUnitsSelect.getOptions()),u.set(this._shapeUnitsSelect.domNode,"display","esriGeometryPoint"===e||"esriGeometryMultipoint"===e?"none":""),"esriGeometryPolygon"===e?(this._shapeUnitsSelect.addOption([{value:"SquareMiles",label:this.i18n.sqMiles},{value:"SquareKilometers",label:this.i18n.sqKm},{value:"SquareMeters",label:this.i18n.sqMeters},{value:"Hectares",label:this.i18n.hectares},{value:"Acres",label:this.i18n.acres}]),"Kilometers"!==this.units||this.shapeUnits?"Kilometers"===this.get("shapeUnits")&&this.set("shapeUnits","SquareKilometers"):this.shapeUnits="SquareKilometers"):"esriGeometryPolyline"===e&&(this._shapeUnitsSelect.addOption([{value:"Miles",label:this.i18n.miles},{value:"Feet",label:this.i18n.feet},{value:"Kilometers",label:this.i18n.kilometers},{value:"Meters",label:this.i18n.meters},{value:"Yards",label:this.i18n.yards}]),"Kilometers"!==this.units||this.shapeUnits?"SquareKilometers"===this.get("shapeUnits")&&this.set("shapeUnits","Kilometers"):this.shapeUnits="Kilometers"),this._shapeUnitsSelect.set("value",this.get("shapeUnits")),this._prevGeometryType=e)},_handleLayerChange:function(e,t){var s;this._isAnalysisSelect=!1,"browse"===e?this._createBrowseItems({},this._layersSelect):"browselayers"===e?(this.showGeoAnalyticsParams&&(c=this._browseLyrsdlg.browseItems.get("query"),c.types.push('type:"Big Data File Share"'),this._browseLyrsdlg.browseItems.set("query",c)),this._browseLyrsdlg.show()):(s=this.summaryLayers[e],this.set("summaryLayer",s),s&&this._curLayerInitIndex!==e&&(this.sumNearbyLayer&&!t&&(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{summaryLayerName:s.name,sumNearbyLayerName:this.sumNearbyLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)),this._initializeShapeUnits(s.geometryType),"esriGeometryPolygon"===s.geometryType&&(y.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricPoly),y.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsPolygon")),"esriGeometryPoint"!==s.geometryType&&"esriGeometryMultipoint"!==s.geometryType||(y.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricPoint),y.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsPoint")),"esriGeometryPolyline"===s.geometryType&&(y.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricLine),y.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsLine")),this.set("groupBySelect",this.groupByField),t&&this.summaryFields&&(this._summaryWidget.set("layer",this.get("summaryLayer")),this._summaryWidget.set("summaryFields",this.summaryFields)),(!t||t&&!this.summaryFields)&&this._summaryWidget.set("layer",this.get("summaryLayer")),this._curLayerInitIndex=e))},_handleDistValueChange:function(e){},_handleDistUnitsChange:function(e){this.set("units",e)},_handleShapeUnitsChange:function(e){this.set("shapeUnits",e)},_handleDistanceTypeChange:function(e,t){this.set("nearType",e);var i,a,r;r=this._nearTypeSelect.getOptions(this._nearTypeSelect.get("value")),D.isDefined(r)?(i="Time"===r.units,a="Time"===r.units&&("driving"===r.modei18nKey||"trucking"===r.modei18nKey)):e&&(i=-1!==e.indexOf("Time"),a="DrivingTime"===e),u.set(this._useTrafficRow,"display",a?"":"none"),this._trafficTimeWidget.set("disabled",!a),this._trafficTimeWidget.set("reset",!a),a&&P.getRoutingUtilities(this).then(s.hitch(this,function(e){this._trafficTimeWidget.set("trafficSupport",e.networkDataset&&e.networkDataset.trafficSupport)})),i?(this._distanceUnitsSelect.removeOption(this._distanceUnitsSelect.getOptions()),this._distanceUnitsSelect.addOption([{value:"Seconds",label:this.i18n.seconds},{value:"Minutes",label:this.i18n.minutes,selected:"selected"},{value:"Hours",label:this.i18n.hours}]),this.units&&t?this._distanceUnitsSelect.set("value",this.units):this.set("units",this._distanceUnitsSelect.get("value"))):(this.get("units")&&this.set("units",this.get("units")),this._distanceUnitsSelect.removeOption(this._distanceUnitsSelect.getOptions()),this._distanceUnitsSelect.addOption([{value:"Miles",label:this.i18n.miles},{value:"Yards",label:this.i18n.yards},{value:"Feet",label:this.i18n.feet},{type:"separator"},{value:"Kilometers",label:this.i18n.kilometers},{value:"Meters",label:this.i18n.meters}]),this._distanceUnitsSelect.set("value",this.units))},_handleGroupBySelectChange:function(e){var t="0"===e;d.toggle(this._minmajorityLabel,"esriAnalysisTextDisabled",t),d.toggle(this._percentPointsLabel,"esriAnalysisTextDisabled",t),this._percentPointsCheck.set("disabled",t),this._minmajorityCheck.set("disabled",t)},_save:function(){},_buildUI:function(){var e,t=!0;P.initHelpLinks(this.domNode,this.showHelp),D.isDefined(this.returnBoundaries)&&this._returnBdrycCheck.set("checked",this.returnBoundaries),u.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none"),this.get("showSelectAnalysisLayer")&&(this.sumNearbyLayers&&this.sumNearbyLayer&&!P.isLayerInLayers(this.sumNearbyLayer,this.sumNearbyLayers)&&this.sumNearbyLayers.push(this.sumNearbyLayer),this.get("sumNearbyLayer")||!this.get("sumNearbyLayers")||this.rerun||this.set("sumNearbyLayer",this.sumNearbyLayers[0]),P.populateAnalysisLayers(this,"sumNearbyLayer","sumNearbyLayers")),this.summaryLayers&&this.summaryLayer&&!P.isLayerInLayers(this.summaryLayer,this.summaryLayers)&&this.summaryLayers.push(this.summaryLayer),this.distances?(this.distances=i.map(this.distances,function(e){return p.format(e)}),this._breakValuesInput.set("value",this.distances.join(" "))):(this.distances=[],this.distances.push(this._breakValuesInput.get("value"))),this.sumNearbyLayer&&(y.set(this._aggregateToolDescription,"innerHTML",l.substitute(this.i18n.summarizeDefine,{sumNearbyLayerName:this.sumNearbyLayer.name})),this.set("enableTravelModes","esriGeometryPoint"===this.sumNearbyLayer.geometryType),this._updateTravelModes("esriGeometryPoint"===this.sumNearbyLayer.geometryType,!0)),this.summaryFields&&(t=!1),this.summaryLayers&&!this.sumNearbyLayer&&(i.forEach(this.summaryLayers,function(e,t){e!==this.sumNearbyLayer&&(this._layersSelect.addOption({value:t,label:e.name}),this.summaryLayer&&(this.summaryLayer.name===e.name||e.url&&this.summaryLayer.url&&e.url===this.summaryLayer.url)&&this._layersSelect.set("value",t))},this),(e=this.summaryLayers[this._layersSelect.get("value")])&&(!this.outputLayerName&&this.sumNearbyLayer&&(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{summaryLayerName:e.name,sumNearbyLayerName:this.sumNearbyLayer.name})),y.set(this._addStatsLabel,"innerHTML",l.substitute(this.i18n.addStats,{summaryLayerName:e.name})),this._initializeShapeUnits(e.geometryType),this.shapeUnits&&this._shapeUnitsSelect.set("value",this.shapeUnits),"esriGeometryPolygon"===e.geometryType&&(y.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricPoly),y.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsPolygon")),"esriGeometryPoint"!==e.geometryType&&"esriGeometryMultipoint"!==e.geometryType||(y.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricPoint),y.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsPoint")),"esriGeometryPolyline"===e.geometryType&&(y.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricLine),y.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsLine")))),P.addReadyToUseLayerOption(this,[this._analysisSelect,this._layersSelect]),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),t=!1),this.units&&this._distanceUnitsSelect.set("value",this.units),!this.sumShape&&this.summaryFields&&this._sumMetricCheck.set("checked",this.sumShape),u.set(this._chooseFolderRow,"display",!0===this.showSelectFolder?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(s.hitch(this,function(e){this.folderStore=e,P.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),u.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"inline-block":"none"),this.set("groupBySelect",this.groupByField),this.minorityMajority&&this._minmajorityCheck.set("checked",this.minorityMajority),this._percentPointsCheck.set("checked",this.percentPoints),this.timeOfDay&&(this._trafficTimeWidget.set("checked",!0),this._trafficTimeWidget.set("timeZoneForTimeOfDay",this.timeZoneForTimeOfDay),this._trafficTimeWidget.set("timeOfDay",this.timeOfDay),this.liveOffset&&this._trafficTimeWidget.set("liveOffset",this.liveOffset)),this._loadConnections(),P.populateTravelModes({selectWidget:this._nearTypeSelect,addStraightLine:!0,widget:this,value:this.nearType,enableTravelModes:!this.sumNearbyLayer||"esriGeometryPoint"===this.sumNearbyLayer.geometryType}),this._updateAnalysisLayerUI(t,!0)},validateDistance:function(){var e,t,a,r,n=this,h=[];if(this.set("distances"),e=s.trim(this._breakValuesInput.get("value")).split(" "),"StraightLine"!==this._nearTypeSelect.get("value")){if(!this.limits)return!0;r=P.getMaxInputByMode({type:this._nearTypeSelect.get("value").replace("-",""),units:this._distanceUnitsSelect.get("value"),limits:this.limits,travelMode:this._nearTypeSelect.getOptions(this._nearTypeSelect.get("value"))})}return 0!==e.length&&(i.forEach(e,function(e){return e=p.parse(e),isNaN(e)?(h.push(0),!1):r&&e>r?(h.push(0),!1):(t=p.format(e,{locale:"root"}),D.isDefined(t)?D.isDefined(t)||(t=p.format(e,{locale:"en-us"})):t=p.format(e,{locale:"en"}),D.isDefined(t)&&(a=s.trim(t).match(/\D/g)),void(a&&i.forEach(a,function(e){"."===e||","===e?h.push(1):"-"===e&&"polygon"===n.inputType?h.push(1):h.push(0)})))}),-1===i.indexOf(h,0)||(this._breakValuesInput.focus(),!1))},_loadConnections:function(){this.on("start",s.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",s.hitch(this,"_onClose",!1)),this.own(this.on("travelmodes-added",s.hitch(this,function(){this._driveTimeClickHandles=[],this._driveTimeClickHandles.push(a.connect(this._nearTypeSelect,"onChange",s.hitch(this,"_handleDistanceTypeChange"))),this._handleDistanceTypeChange(this.nearType,!0)}))),this.watch("enableTravelModes",s.hitch(this,function(e,t,s){this._updateTravelModes(s)}))},_handleAnalysisLayerChange:function(e){this._isAnalysisSelect=!0,"browse"===e?this._createBrowseItems({},this._analysisSelect):"browselayers"===e?(this.showGeoAnalyticsParams&&(c=this._browseLyrsdlg.browseItems.get("query"),c.types.push('type:"Big Data File Share"'),this._browseLyrsdlg.browseItems.set("query",c)),this._browseLyrsdlg.show()):(this.sumNearbyLayer=this.sumNearbyLayers[e],this._updateAnalysisLayerUI(!0))},_handleBrowseItemsSelect:function(e,t){e&&e.selection&&P.addAnalysisReadyLayer({item:e.selection,layers:this._isAnalysisSelect?this.sumNearbyLayers:this.summaryLayers,layersSelect:this._isAnalysisSelect?this._analysisSelect:this._layersSelect,browseDialog:e.dialog||this._browsedlg,widget:this},t).always(s.hitch(this,this._updateAnalysisLayerUI,!0))},_updateAnalysisLayerUI:function(e){var t,s,a=this.summaryLayers[this._layersSelect.get("value")],r=this._layersSelect.get("value");e&&this.get("sumNearbyLayer")&&a&&(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{summaryLayerName:a.name,sumNearbyLayerName:this.sumNearbyLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)),this.sumNearbyLayer&&(this.set("enableTravelModes","esriGeometryPoint"===this.sumNearbyLayer.geometryType),e&&this._updateTravelModes("esriGeometryPoint"===this.sumNearbyLayer.geometryType)),this.summaryLayers&&this.sumNearbyLayer&&(t=i.some(this._layersSelect.getOptions(),function(e){return"browse"===e.value},this),s=i.some(this._layersSelect.getOptions(),function(e){return"browselayers"===e.value},this),this._layersSelect.removeOption(this._layersSelect.getOptions()),this.rerun&&!this.summaryLayer&&P.addBlankOption(this._layersSelect),i.forEach(this.summaryLayers,function(t,s){var i=!0;t.url&&this.sumNearbyLayer.url&&t.url!==this.sumNearbyLayer.url?i=!1:this.sumNearbyLayer===t||t.analysisReady&&this.sumNearbyLayer.analysisReady||(i=!1),i||(this._layersSelect.addOption({value:s,label:t.name}),!e&&this.summaryLayer&&(this.summaryLayer.name===t.name||t.url&&this.summaryLayer.url&&t.url===this.summaryLayer.url)&&this._layersSelect.set("value",""+s),r===""+s&&this._layersSelect.set("value",r))},this),(this.get("showReadyToUseLayers")||this.get("showBrowseLayers")||t||s)&&this._layersSelect.addOption({type:"separator",value:""}),this.get("showReadyToUseLayers")&&t&&this._layersSelect.addOption({value:"browse",label:this.i18n.browseAnalysisTitle}),this.get("showBrowseLayers")&&s&&this._layersSelect.addOption({value:"browselayers",label:this.i18n.browseLayers})),this._handleLayerChange(this._layersSelect.get("value"),!e)},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setSumNearbyLayersAttr:function(e){this.sumNearbyLayers=e},_setSumNearbyLayerAttr:function(e){this.sumNearbyLayer=e},_setSummaryLayersAttr:function(e){this.summaryLayers=e},_setSummaryLayerAttr:function(e){this.summaryLayer=e},_getSummaryLayerAttr:function(){return this.summaryLayer},_setLayersAttr:function(e){this.summaryLayers=[]},_setAttributesAttr:function(e){if(e.summaryLayer){var t,s,a;t=e.summaryLayer,s=e.selectWidget,a=t.fields,s.addOption({value:"0",label:this.i18n.attribute}),i.forEach(a,function(e){-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],e.type)&&s.addOption({value:e.name,label:D.isDefined(e.alias)&&""!==e.alias?e.alias:e.name})},this)}},_setStatisticsAttr:function(e){var t=e.selectWidget;t.addOption({value:"0",label:this.i18n.statistic}),t.addOption({value:"SUM",label:this.i18n.sum}),t.addOption({value:"MIN",label:this.i18n.minimum}),t.addOption({value:"MAX",label:this.i18n.maximum}),t.addOption({value:"MEAN",label:this.i18n.average}),t.addOption({value:"STDDEV",label:this.i18n.standardDev})},_setGroupBySelectAttr:function(e){var t=this.summaryLayers[this._layersSelect.get("value")],s=D.isDefined(t)?t.fields:[];this._groupBySelect.getOptions().length>0&&this._groupBySelect.removeOption(this._groupBySelect.getOptions()),this._groupBySelect.addOption({value:"0",label:this.i18n.attribute}),i.forEach(s,function(e,s){-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeString","esriFieldTypeDate"],e.type)&&e.name!==t.objectIdField&&this._groupBySelect.addOption({value:e.name,label:D.isDefined(e.alias)&&""!==e.alias?e.alias:e.name})},this),e&&this._groupBySelect.set("value",e),this._handleGroupBySelectChange(this._groupBySelect.get("value"))},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},_setNearTypeAttr:function(e){this.nearType=e},_getNearTypeAttr:function(){return this.nearType},_setDistancesAttr:function(e){if(e)this.distances=e;else if(this._breakValuesInput&&this._breakValuesInput.get("value")){var t=s.trim(this._breakValuesInput.get("value")).split(" "),a=[];i.forEach(t,function(e){a.push(p.parse(e))}),this.distances=a}},_getDistancesAttr:function(){return this.distances},_setUnitsAttr:function(e){this.units=e},_getUnitsAttr:function(){return this.units},_setShapeUnitsAttr:function(e){this.shapeUnits=e},_getShapeUnitsAttr:function(){return this.shapeUnits},_getSumShapeAttr:function(){return this._sumMetricCheck.get("checked")},_setSumShapeAttr:function(e){this.sumShape=e},_setMinorityMajorityAttr:function(e){this.minorityMajority=e},_getMinorityMajorityAttr:function(e){return this._minmajorityCheck&&(this.minorityMajority=this._minmajorityCheck.get("checked")),this.minorityMajority},_setPercentPointsAttr:function(e){this.percentPoints=e},_getPercentPointsAttr:function(e){return this._percentPointsCheck&&(this.percentPoints=this._percentPointsCheck.get("checked")),this.percentPoints},_setEnableTravelModesAttr:function(e){this._set("enableTravelModes",e)},_getReturnBoundariesAttr:function(){return this._returnBdrycCheck&&(this.returnBoundaries=this._returnBdrycCheck.get("checked")),this.returnBoundaries},_setReturnBoundariesAttr:function(e){this.returnBoundaries=e},validateServiceName:function(e){return P.validateServiceName(e,{textInput:this._outputLayerInput})},_connect:function(e,t,s){this._pbConnects.push(a.connect(e,t,s))},_showMessages:function(e){y.set(this._bodyNode,"innerHTML",e),n.fadeIn({node:this._errorMessagePane,easing:_.quadIn,onEnd:s.hitch(this,function(){u.set(this._errorMessagePane,{display:""})})}).play()},_handleCloseMsg:function(e){e&&e.preventDefault(),n.fadeOut({node:this._errorMessagePane,easing:_.quadOut,onEnd:s.hitch(this,function(){u.set(this._errorMessagePane,{display:"none"})})}).play()},_updateTravelModes:function(e,t){var s=this._nearTypeSelect.getOptions();i.forEach(s,function(t){"StraightLine"!==t.value&&(t.disabled=!e)}),this._nearTypeSelect.updateOption(s),t||this._nearTypeSelect.reset()}});return h("extend-esri")&&s.setObject("dijit.analysis.SummarizeNearby",E,A),E});