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

define(["dojo/_base/declare","dojo/on","dojo/dom-construct","dijit/_WidgetBase","dijit/_TemplatedMixin","esri/dijit/geoenrichment/FlowList","esri/dijit/geoenrichment/DataBrowser/VariableToggle","../RefineFilters","esri/dijit/geoenrichment/utils/DomUtil","dojo/text!../../../templates/sectionDynamicSettings/ChartSettings.html","dojo/i18n!esri/nls/jsapi"],function(t,e,i,s,n,o,a,r,l,h,g){g=g.geoenrichment.dijit.ReportPlayer.SectionDynamicSettingsBuilder;var c=t(o.itemRenderers.DefaultItemRenderer,{createLabelNode:!0,createImageAfterLabel:!1,_createImageNode:function(t,e){return i.create("div",{class:"dijitInline"},e)}});return t([s,n],{templateString:h,calcStateToggle:null,sortingList:null,_isChartShownFlag:!0,setViewOptions:function(t){var i=this;l[t?"show":"hide"](this.viewOptionsDiv),e(this.toggleViewButton,"click",function(){i._isChartShownFlag=!i._isChartShownFlag,i._updateControlsForView(),i[i._isChartShownFlag?"onTableToChart":"onChartToTable"]()}),this._updateControlsForView()},_updateControlsForView:function(){this.toggleViewButton.innerHTML=this._isChartShownFlag?g.viewTable:g.viewChart,l.enableContentAbsolute(this.sortingListDiv,this._isChartShownFlag)},onChartToTable:function(){},onTableToChart:function(){},setToggleCalcStateOptions:function(t){var i=this;l[t?"show":"hide"](this.toggleStateOptionsDiv),t&&(this.calcStateToggle=new a(t,this.toggleStateOptionsToggleDiv),this.own(this.calcStateToggle),this.calcStateToggle.stopMouseEventPropagation=!1,this.calcStateToggle.set("value",t.value),e(this.calcStateToggle,"change",function(){i.onCalcStateChanged(i.calcStateToggle.getStateName())}))},onCalcStateChanged:function(t){},setSortingOptions:function(t,e){var i=this;this.sortingList||(this.sortingList=new o({class:"sectionDynamicChartSettings_sortingList",itemRenderer:new c,onChange:function(){i.onSortChart(i.sortingList.get("value"))}}).placeAt(this.sortingListDiv),this.own(this.sortingList)),this.sortingList.setItems(t),this.sortingList.set("value",e)},onSortChart:function(t){},setFilterRanges:function(t){var e=this;l[t?"show":"hide"](this.filtersBlock),t&&(this.refineFilters||(this.refineFilters=new r({hasTitle:!0,hasRangeFilters:!0,onFilterChanged:function(t){e.onFilterRangesChanged(t)}}).placeAt(this.filtersBlock),this.own(this.refineFilters)),this.refineFilters.setFilterRanges(t))},setNumAreas:function(t,e){this.refineFilters&&this.refineFilters.setTitle(g.refineYourAreas,t,e)},onFilterRangesChanged:function(t){},setVisualState:function(t){var e=t&&t.stackElements[0]&&t.stackElements[0].cells&&t.stackElements[0].cells[0];e&&(this._isChartShownFlag=!e.isTableView,e.sorting&&this.sortingList.set("value",e.sorting),this._updateControlsForView(),e.filterRanges&&this.refineFilters.setVisualState(e))}})});