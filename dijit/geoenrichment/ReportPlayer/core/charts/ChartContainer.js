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
// See http://js.arcgis.com/3.25/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/Deferred","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/on","dojo/when","dijit/_WidgetBase","dijit/_TemplatedMixin","dojox/charting/Chart","dojox/charting/action2d/Magnify","./utils/action2d/Highlight","./_ChartLegendSupport","./_ChartEventSupport","./_ChartComparisonSupport","./_ChartUnderlineSupport","./utils/builder/ChartBuilder","./utils/ChartTypes","./utils/ChartSorting","./utils/ChartCalculator","./utils/ChartStyleUtil","./utils/ChartJsonUtil","./utils/builder/ChartPlots","./tooltips/ChartTooltip","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/utils/InvokeUtil","./iconRendering/IconRenderer","./textRendering/TextRenderer","./tableViewRendering/TableViewRenderer","dojo/text!../templates/ChartContainer.html","dojo/i18n!esri/nls/jsapi","../../_devConfig"],function(e,t,i,r,s,h,n,a,o,d,l,c,u,_,p,g,C,m,w,f,v,T,y,V,S,I,b,R,M,P,x,D,L,z){L=L.geoenrichment.dijit.ReportPlayer.ChartContainer;var N=e(c,{_renderPlotBackground:function(e,t,i,r){this.theme.plotarea.backgroundImageData?this.surface.createImage({src:this.theme.plotarea.backgroundImageData,x:t.l-1,y:t.t-1,width:i+2,height:r+2}):this.inherited(arguments)}});return e([d,l,p,g,C,m],{templateString:D,nls:L,viewModel:null,theme:null,parentWidget:null,previewFeatureIndex:null,immediateRender:!1,chartTheme:null,chart:null,_currentSeries:null,_iconRenderer:null,_textRenderer:null,_tableViewRenderer:null,postCreate:function(){this.inherited(arguments),this._showError(!1),this.viewModel.isGraphicStyle&&r.add(this.domNode,"graphicReportChart"),r.add(this.domNode,this.viewModel.isLightDocumentTheme(this.theme)?"light":"dark")},_currentSeriesItems:null,_currentVisualProperties:null,_currentChartType:null,_currentComparisonInfo:null,_isMultiFeatureChart:null,updateChart:function(e){this._destroyChart(),e&&(V.cleanUpJson(e),this._currentSeriesItems=e.seriesItems,this._currentVisualProperties=e.visualProperties,this._currentChartType=e.type,this._currentComparisonInfo=e.comparisonInfo,this._isMultiFeatureChart=e.isMultiFeatureChart,n.set(this.domNode,{width:this._currentVisualProperties.width+"px",height:this._currentVisualProperties.height+"px"}),this._currentVisualProperties.panelBackgroundColor&&(this.domNode.style.backgroundColor=this._currentVisualProperties.panelBackgroundColor),this._initChartComparisonSelect(),this._updateLabels(),this._createChart(),this._addPlotEventListeners(),this._createLegend(),this._updateSeries())},getLegendNode:function(){return this.legendContainerDiv},_updateLabels:function(){this.chartLabel.innerHTML=this._currentVisualProperties.title.text,b[this.chartLabel.innerHTML?"show":"hide"](this.chartLabel),n.set(this.chartLabel,"textAlign",this._currentVisualProperties.title.align);var e=t.mixin({},this.viewModel.getChartDefaultStyles(this.theme).titleStyle,this._currentVisualProperties.title.style);n.set(this.chartLabel,y.getStyleObjWithUnits(e))},_createChart:function(){var e=s.create("div",{class:"chartContainerDiv_innerChartNode"},this.chartContainerDiv),t=new N(e);this.chart=t,t.setTheme(this.chartTheme),w.getChartBuilder(this._currentChartType).configureChart({chart:t,seriesItems:this._currentSeriesItems,visualProperties:this._currentVisualProperties,chartType:this._currentChartType,comparisonInfo:this._currentComparisonInfo,themeSettings:this.viewModel.getChartDefaultStyles(this.theme),viewModel:this.viewModel,previewFeatureIndex:this.previewFeatureIndex}),this.viewModel.dynamicReportInfo&&(f.isPieLike(this._currentChartType)&&new u(t,S.PRIMARY,{scale:1.03}),S.getWorkingPlots(t).forEach(function(e,i){var r=0===i?this._currentChartType:this._getComparisonChartType();new _(t,e,{stroke:r===f.RING})},this)),S.getWorkingPlots(t).forEach(function(e,i){var r=0===i?this._currentChartType:this._getComparisonChartType(),s=new I(t,e,{duration:50});s.showStatistics=!!this.viewModel.dynamicReportInfo||z.charts.showStatisticsInTooltips,s.setChartType(r)},this)},_destroyChart:function(){this._levelLineBuilder&&this._levelLineBuilder.hideLevelLine(),this.chartContainerDiv&&s.empty(this.chartContainerDiv),this.chart&&this.chart.destroy(),this.chart=null,this._destroyLegend()},_updateSeries:function(){var e=this;if(this._removeSeries(),!this._currentSeriesItems||!this._currentSeriesItems.length)return void this.resize();this._currentSeries=w.getChartBuilder(this._currentChartType).calcSeries({chart:this.chart,seriesItems:this._currentSeriesItems,visualProperties:this._currentVisualProperties,chartType:this._currentChartType,comparisonInfo:this._currentComparisonInfo,selectedComparisonAreaName:this._getSelectedComparisonAreaName(),selectedComparisonIndex:this._getSelectedComparisonIndex(),ge:this._getGeoenrichment(),themeSettings:this.viewModel.getChartDefaultStyles(this.theme),viewModel:this.viewModel,previewFeatureIndex:this.previewFeatureIndex,isMultiFeatureChart:this._isMultiFeatureChart,excludedSeriesHash:this._excludedSeriesHash,sorting:this._sorting||this._currentVisualProperties.sorting});var t=w.checkSeriesAreValid(this._currentSeries);return this._showError(!t),t?(this._currentSeries.forEach(function(t){e._excludedSeriesHash[t.name]||e.chart.addSeries(t.name,t.data,t.params)}),this.resize()):void 0},_removeSeries:function(){var e=this;this._currentSeries=this._currentSeries||[],this._currentSeries.forEach(function(t){e.chart.removeSeries(t.name)}),this._currentSeries.length=0},_chartWidth:0,_chartHeight:0,_resizedFlag:!1,_resizeDfd:null,resize:function(e,t,r){if(this._currentVisualProperties)return void 0!==e&&T.resizeVisualProperties(this._currentVisualProperties,e,t),this._resizedFlag||(this.domNode.style.opacity="0"),this._resizeDfd=this._resizeDfd||new i,r||this.immediateRender?this._doResizeChart():R.invoke(this,"_doResizeChart",50)},_doResizeChart:function(){var e=this;if(this.chart){this._resizedFlag||(this.domNode.style.opacity="1"),this._resizedFlag=!0,this._updateLegend(),n.set(this.domNode,{width:this._currentVisualProperties.width+"px",height:this._currentVisualProperties.height+"px"});var t=T.calcChartDimentions(this,{visualProps:this._currentVisualProperties,comparisonInfo:this._currentComparisonInfo,chartType:this._currentChartType,maxIconSize:M.AXIS_ICON_MAX_SIZE}),i=t.w,r=t.h;if(this._chartWidth=i,this._chartHeight=r,this._adjustErrorMessage(),this._isTableView)return this._refreshTableView(),void(this._renderChartPendingFlag=!0);try{this.chart&&(this.chart.isPreRenderMode=f.isColumnBarLike(this._currentChartType),this.chart.resize(this._chartWidth,this._chartHeight),this.chart.dirty&&this.chart.render(),f.isColumnBarLike(this._currentChartType)&&w.getChartBuilder(this._currentChartType).updateBarSize({chart:this.chart,chartSize:this.chart.plotArea[f.isColumnLike(this._currentChartType)?"width":"height"],seriesItems:this._currentSeriesItems,visualProperties:this._currentVisualProperties,comparisonInfo:this._currentComparisonInfo,chartType:this._currentChartType,viewModel:this.viewModel,previewFeatureIndex:this.previewFeatureIndex}),this.chart.isPreRenderMode=!1,this.chart.dirty&&this.chart.render())}catch(e){console.log(e)}!function(){setTimeout(function(){e._updateLegend(),e._updateIcons(),e._updateTexts()}),e.onRendered(),e._resizeDfd&&e._resizeDfd.resolve(),e._resizeDfd=null}()}},notifyShown:function(){this.viewModel.animationAllowed&&S.getWorkingPlots(this.chart).forEach(function(e,t){this.chart.getPlot(e).renderAnimation&&this.chart.getPlot(e).renderAnimation()},this)},onRendered:function(){},_getIconRendererClass:function(){return M},_updateIcons:function(){this._iconRenderer||(this._iconRenderer=(new this._getIconRendererClass)(),this.own(this._iconRenderer),this._iconRenderer.setViewMode(this._viewMode)),this._iconRenderer.renderIcons({viewModel:this.viewModel,theme:this.theme,parentWidget:this,chartType:this._currentChartType,iconNode:this.chartContainerWithAxis,chartW:this._chartWidth,chartH:this._chartHeight,visualProperties:this._currentVisualProperties,comparisonInfo:this._currentComparisonInfo,chart:this.chart})},_getTextRendererClass:function(){return P},_updateTexts:function(){this._textRenderer||(this._textRenderer=(new this._getTextRendererClass)(),this.own(this._textRenderer),this._textRenderer.setViewMode(this._viewMode)),this._textRenderer.renderTexts({viewModel:this.viewModel,theme:this.theme,parentWidget:this,textNode:this.chartContainerWithAxis,chartW:this._chartWidth,chartH:this._chartHeight,visualProperties:this._currentVisualProperties,chart:this.chart})},_viewMode:null,setViewMode:function(e){this._viewMode!==e&&(this._viewMode=e,this._iconRenderer&&this._iconRenderer.setViewMode(e),this._textRenderer&&this._textRenderer.setViewMode(e),this._tableViewRenderer&&this._tableViewRenderer.setViewMode(e))},_showError:function(e){z.emulateErrors.contentErrors&&(e=!0),b[e?"show":"hide"](this.errorDiv),b[e?"hide":"show"](this.chartNormalViewDiv)},_adjustErrorMessage:function(){this.errorDiv.style.paddingTop=n.get(this.domNode,"height")/2-20+"px"},_sorting:null,getSorting:function(){return this._sorting},sortChart:function(e){this._sorting=e&&e!==v.NONE?e:null,this._updateSeries()},_isTableView:!1,_renderChartPendingFlag:!1,chartToTable:function(){if(!this._isTableView){this._setIsTableView(!0),b.hide([this.chartContainerDiv,this.legendContainerDiv]);for(var e=0;e<this.chartContainerWithAxis.children.length;e++){var t=this.chartContainerWithAxis.children[e];t!==this.tableContainerDiv&&b.hide(t)}this._tableViewRenderer||(this._tableViewRenderer=new x,this.own(this._tableViewRenderer),this._tableViewRenderer.setViewMode(this._viewMode)),this._refreshTableView(!0)}},_setIsTableView:function(e){this._isTableView=e,r[this._isTableView?"add":"remove"](this.domNode,"isChartDataInTableView")},_refreshTableView:function(e){var t=n.get(this.domNode,"height")-n.get(this.chartLabel,"height");this._currentComparisonInfo&&(t-=40),this._tableViewRenderer.renderTableForChart({viewModel:this.viewModel,theme:this.theme,parentWidget:this,tableNode:this.tableContainerDiv,width:n.get(this.domNode,"width"),height:t,chartSeries:this._currentSeries,chartType:this._currentChartType,visualProperties:this._currentVisualProperties,hasComparison:!!this._currentComparisonInfo,chart:this.chart,showAnimation:e})},tableToChart:function(){if(this._isTableView){this._setIsTableView(!1),b.show([this.chartContainerDiv,this.legendContainerDiv]);for(var e=0;e<this.chartContainerWithAxis.children.length;e++)b.show(this.chartContainerWithAxis.children[e]);this._tableViewRenderer&&this._tableViewRenderer.destroyTable(),this._renderChartPendingFlag?(this._renderChartPendingFlag=!1,o(this.resize(),this.notifyShown.bind(this))):this.notifyShown()}},getVisualState:function(){return{sorting:this.getSorting(),isTableView:this._isTableView}},setVisualState:function(e){e&&o(this._resizeDfd&&this._resizeDfd.promise,function(){e.sorting&&this.sortChart(e.sorting),e.isTableView&&this.chartToTable()}.bind(this))},getWidth:function(){return this._currentVisualProperties.width},getHeight:function(){return this._currentVisualProperties.height},destroy:function(){this._destroyChart(),this.inherited(arguments)}})});