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
// See http://js.arcgis.com/3.28/esri/copyright.txt for details.

define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","esri/dijit/geoenrichment/lists/FlowCheckList","dojo/text!../../../templates/sectionDynamicSettings/LocatorSettings.html","dojo/i18n!esri/nls/jsapi"],function(t,i,s,e,n,a){return a=a.geoenrichment.dijit.ReportPlayer.SectionDynamicSettingsBuilder,t([i,s],{templateString:n,nls:a,summaryList:null,_provideSummaryList:function(){var t=this;this.summaryList||(this.summaryList=new e({class:"esriGEFlowListSpacedOut",onSelectionChanged:function(){t.onLocatorSummaryChanged({visibleFields:t.summaryList.getSelection()})}},this.summaryListDiv),this.own(this.summaryList))},setSummaryInfos:function(t){var i=[],s=[];t.forEach(function(t){s.push({value:t.fieldName,label:t.label}),t.visible&&i.push(t.fieldName)}),this._provideSummaryList(),this.summaryList.set("items",s),this.summaryList.setSelection(i)},onLocatorSummaryChanged:function(t){},setVisualState:function(t){var i=t&&t.stackElements[0]&&t.stackElements[0].cells&&t.stackElements[0].cells[0];i&&i.summaryInfos&&this.setSummaryInfos(i.summaryInfos)}})});