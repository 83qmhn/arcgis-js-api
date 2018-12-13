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

define(["dojo/_base/lang","esri/dijit/geoenrichment/utils/ColorUtil","esri/dijit/geoenrichment/utils/ImageUtil","esri/dijit/geoenrichment/utils/JsonXmlConverter","../../../charts/utils/ChartJsonUtil","../../ConversionUtil","esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/ChartTypes","esri/dijit/geoenrichment/ReportPlayer/core/charts/legends/ChartLegendTypes","./_FieldInfoBuilder","dojo/i18n!esri/nls/jsapi"],function(e,t,r,i,a,s,n,l,o,g){function u(e,t){return void 0===e?t:Number(e)||t}function c(e,t){var r=Number(e);return isNaN(r)?t:r}function p(e,t,r){return i.queryJson(e,"series").filter(function(e){return e.tags&&e.tags[0]&&"point"===e.tags[0].name}).map(function(r){return r.tags?(r.attributes=r.attributes||{},{label:r.attributes.Text||"",color:y(r.attributes.color),thickness:r.attributes.thickness,points:r.tags.map(function(r,s){r.attributes=r.attributes||{};var l=e.attributes.type===n.GAUGE&&1===s,u=r.tags&&r.tags[0],c=u&&u.attributes&&u.attributes.f,p=c&&o.getCalculatorOrScriptFieldInfo(c,t);if(p||l){if(p&&p.isMissing){var b=r.attributes.Text;if(!b&&t.variableProvider.isPlayerOnly){var d=t.variableProvider.toCalculator(p.templateName);b=d&&d.variable.alias}p.alias=b?b+" ("+g.missingVariable+")":g.missingVariable}var h=r.attributes.CaptionField,S=h&&o.getCalculatorOrScriptFieldInfo(h,t),m=i.queryJson(r,"pointIcon")[0],P=m&&t.parsers.getParser("field").parseField(m.tags[0],m,null,t);return a.createChartPoint(p,r.attributes.Text||"",y(r.attributes.color),P,S)}}).filter(function(e){return!!e})}):null}).filter(function(e){return e&&e.points&&!!e.points.length})}function b(t,r){var i={gridLines:t.gridlines,gridLinesCentered:t.gridlinesCentered,gridLinesOpacity:u(t.gridlinesOpacity,1),gridLinesColor:t.gridlinesColor,gridLinesThickness:c(t.gridlinesThickness),gridLinesStyle:t.gridlinesStyle,gridStripes:t.gridStripes,gridStripesColor:t.gridStripesColor,gridStripesColorAlt:t.gridStripesColorAlt};return r&&e.mixin(i,{baseLine:t.baseLine,baseLineColor:t.baseLineColor,baseLineOpacity:u(t.baseLineOpacity,1),baseLineThickness:c(t.baseLineThickness),baseLineStyle:t.baseLineStyle,baseLineValue:t.baseLineValue}),i}function d(e){var t=i.queryJson(e,"BackImage")[0];return t&&t.tags&&t.tags[0].text?r.base64DataToDataURL(t.tags[0].text):null}function h(e){return"string"!=typeof e?0:(e=e.replace("%",""),"0"===e?0:e.replace("0.","").length)}function y(e){return e&&"string"==typeof e&&(e=6===e.length&&-1===e.indexOf("#")?"#"+e:t.toCSSColor(e)),e}g=g.geoenrichment.dijit.ReportPlayer.ReportPlayer;var S={};return S.portalToEditor=function(t,r,o){var g,u=i.queryJson(t,"comparisonInfo")[0];if(u){var S=u.attributes.name,m=o.templateJson.metadata.comparisonCalculatorsHash[S];m&&(g={calculatorName:S,chartType:u.attributes.chartType,color:u.attributes.color,lineThickness:c(u.attributes.lineThickness),lineStyle:u.attributes.lineStyle,lineMarker:u.attributes.lineMarker,levels:m.levels})}var P=p(t,o,g);if(!P.length)return null;var v=t.attributes,C=i.queryJson(t,"chartTitle")[0],f=i.queryJson(t,"legend")[0],L=i.queryJson(t,"xAxis")[0],x=i.queryJson(t,"yAxis")[0],T=i.queryJson(t,"chartIcon"),T=i.queryJson(t,"chartIcon"),k=i.queryJson(t,"floatingIcon"),I=i.queryJson(t,"floatingText"),O=i.queryJson(t,"trigger");C.attributes=C.attributes||{},f.attributes=f.attributes||{};var A=L&&L.attributes||{},w=x&&x.attributes||{},B=A,j=w;o.isGraphicReport&&o.revisionVersion<1.3&&(B=w,j=A),P.forEach(function(e){e.thickness=c(e.thickness)});var F;n.isColumnBarLike(v.type)&&(F=P[0].thickness>1?"Large":P[0].thickness<1?"Small":"Medium");var J=L&&L.tags&&L.tags[0].attributes&&L.tags[0].attributes,M=x&&x.tags&&x.tags[0].attributes&&x.tags[0].attributes,G=d(t),V={isChart:!0,type:v._type||v.type,isMultiFeatureChart:!!v.isMultiFeatureChart,seriesItems:P,visualProperties:{width:s.ptToPx(v.width),height:s.ptToPx(v.height),backgroundColor:y(v.backColor),panelBackgroundColor:v.panelBackgroundColor,barBorders:v.barBorders,dataLabels:v.dataLabels,view3D:!!v.view3D,origin:c(v.origin),lineThickness:n.isLineLike(v.type)&&P[0].thickness||void 0,columnThickness:F,backgroundImageData:G,dataLabelsDecimals:h(v.CustomPercentFormat||v.CustomValueFormat),title:{text:C.attributes.text,align:C.attributes.align&&C.attributes.align.toLowerCase(),style:s.ptToPxObj(s.parseStyleString(C.attributes.style)),verticalShift:s.ptToPx(C.attributes.verticalShift||0)},xAxis:e.mixin({show:"None"!==A.placement,showTicks:A.ticks,style:s.ptToPxObj(s.parseStyleString(A.style)),title:J&&J.text,titleStyle:J&&s.ptToPxObj(s.parseStyleString(J.style)),placement:"OtherSide"===A.placement?"OtherSide":void 0,labelsAngle:c(A.labelsAngle),showLine:A.line,lineColor:A.lineColor,ticksInside:A.ticksInside},b(B,!1)),yAxis:e.mixin({show:"None"!==w.placement,showTicks:w.ticks,style:s.ptToPxObj(s.parseStyleString(w.style)),title:M&&M.text,titleStyle:M&&s.ptToPxObj(s.parseStyleString(M.style)),placement:"OtherSide"===w.placement?"OtherSide":void 0,labelsAngle:c(w.labelsAngle),showLine:w.line,lineColor:w.lineColor,ticksInside:w.ticksInside,showPercentIndicator:w.showPercentIndicator,showValuesAsWeightsInSeries:w.showValuesAsWeightsInSeries},b(j,!0)),legend:{type:f.attributes.type||l.SERIES},dataLabelsStyle:s.ptToPxObj(s.parseStyleString(v.dataLabelsStyle)),isStacked:v.isStacked,showColumnBarBackground:v.showColumnBarBackground,columnBarBackgroundColor:v.columnBarBackgroundColor,renderColumnBarsInOppositeDirections:v.renderColumnBarsInOppositeDirections,columnBarGap:v.columnBarGap?s.ptToPx(v.columnBarGap):void 0,fillLineArea:v.fillLineArea,lineAreaOpacity:v.lineAreaOpacity,donutHolePercent:c(v.donutHolePercent),donutGap:c(v.donutGap),donutArcPercent:c(v.donutArcPercent),gaugeHolePercent:c(v.gaugeHolePercent),gaugeRangeMin:c(v.gaugeRangeMin),gaugeRangeMax:c(v.gaugeRangeMax),gaugeGap:c(v.gaugeGap),gaugeStartAngle:c(v.gaugeStartAngle),gaugeArcPercent:c(v.gaugeArcPercent),gaugeLabelStyle:s.ptToPxObj(s.parseStyleString(v.gaugeLabelStyle))||void 0,gaugeLabelPlacement:v.gaugeLabelPlacement||void 0,gaugeShowArrow:v.gaugeShowArrow||void 0,gaugeArrowLineColor:v.gaugeArrowLineColor||void 0,gaugeArrowFillColor:v.gaugeArrowFillColor||void 0,gaugeConditionalStylingIgnoreOthers:v.gaugeConditionalStylingIgnoreOthers||void 0,gaugeConditionalStylingLabel:v.gaugeConditionalStylingLabel||void 0,gaugeShowFromToLabels:v.gaugeShowFromToLabels||void 0,gaugeFromLabelStyle:s.ptToPxObj(s.parseStyleString(v.gaugeFromLabelStyle))||void 0,gaugeToLabelStyle:s.ptToPxObj(s.parseStyleString(v.gaugeToLabelStyle))||void 0,ringBackgroundColor:v.ringBackgroundColor,showWholePictures:v.showWholePictures,dataLabelsInside:v.dataLabelsInside,dataLabelsStackedInColumns:v.dataLabelsStackedInColumns,dataLabelsHorizontalAlign:v.dataLabelsHorizontalAlign,showAxisIcons:v.showAxisIcons,showChartIcons:v.showChartIcons,sorting:v.sorting}};V.visualProperties.legend.type===l.MIN_MAX?e.mixin(V.visualProperties.legend,{minMax:{placement:f.attributes.placement,placementOffset:c(f.attributes.placementOffset),titleStyle:s.ptToPxObj(s.parseStyleString(f.attributes.titleStyle)),minVariableLabelStyle:s.ptToPxObj(s.parseStyleString(f.attributes.minVariableLabelStyle)),maxVariableLabelStyle:s.ptToPxObj(s.parseStyleString(f.attributes.maxVariableLabelStyle))}}):e.mixin(V.visualProperties.legend,{series:{placement:f.attributes.placement,placementOffset:c(f.attributes.placementOffset),hasBorder:f.attributes.hasBorder,labelParts:f.attributes.labelParts,style:s.ptToPxObj(s.parseStyleString(f.attributes.style))}}),o.revisionVersion<1.2&&(void 0!==V.visualProperties.donutGap&&(V.visualProperties.donutGap/=2*Math.PI),void 0!==V.visualProperties.gaugeGap&&(V.visualProperties.gaugeGap/=2*Math.PI)),T&&T.length&&(V.visualProperties.chartIcons=T.map(function(e){return e.tags&&e.tags[0]?o.parsers.getParser("field").parseField(e.tags[0],e,null,o):null})),k&&k.length&&(V.visualProperties.floatingIcons=k.map(function(e){return o.parsers.getParser("section").parseTable(e.tags[0],o)})),I&&I.length&&(V.visualProperties.floatingTexts=I.map(function(e){return o.parsers.getParser("section").parseTable(e.tags[0],o)})),O&&O.length&&(V.visualProperties.conditionalStyling=o.parsers.getParser("field").parseFieldTrigger(O[0])),V.comparisonInfo=g;var q={};return r.attributes&&r.attributes.style&&e.mixin(q,s.parseStyleString(r.attributes.style)),s.ptToPxObj(q),a.provideDefaultValueForMissing(V,{font:q}),a.cleanUpJson(V),o.postProcessChartJson(t,V),V},S});