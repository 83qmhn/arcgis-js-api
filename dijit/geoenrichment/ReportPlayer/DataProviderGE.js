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

define(["dojo/_base/declare","dojo/_base/lang","dojo/promise/all","dojo/when","./dataProvider/_CommandSupport","./dataProvider/_SerializationSupport","./dataProvider/_ServerSerializationSupport","./dataProvider/supportClasses/AnalysisAreaUtil","./dataProvider/supportClasses/AnalysisAreaJsonUtil","./dataProvider/supportClasses/CustomReportsManager","./dataProvider/supportClasses/TemplateJsonLoader","./dataProvider/supportClasses/ReportDataProcessor","./dataProvider/supportClasses/InfographicOptionsProvider","./dataProvider/supportClasses/AreasPreprocessor","./dataProvider/supportClasses/GEUtil","./dataProvider/supportClasses/attachments/DefaultAttachmentsStore","./dataProvider/supportClasses/attachments/CustomAttachmentsStore","./dataProvider/supportClasses/PortalManager","./dataProvider/commands/mapToImage/MapToURLUtil","./core/themes/ThemeLibrary","./core/themes/ReportThemes","esri/dijit/geoenrichment/ReportPlayer/countryConfig","esri/dijit/geoenrichment/utils/ProjectionUtil"],function(e,r,t,a,o,n,s,i,p,l,c,u,m,d,h,f,g,A,y,v,C,I,P){return e([o,n,s],{analysisAreasLimit:-1,cacheTemplates:!0,printMapTaskUrl:null,resetReportItemsCache:!0,_infographicOptionsProvider:null,constructor:function(e){r.mixin(this,e),this._infographicOptionsProvider=new m},_getAttachmentsStore:function(e){return new f(e).initialize()},getCustomReports:function(e){return l.getCustomReports(e)},_currentContext:null,getReportData:function(e,o){var n=this;o=o||function(){};var s=r.mixin({},e);return s.variables&&(s.hierarchy=s.hierarchy||"census"),n.resetReportItemsCache&&l.resetCache(),n._currentContext=s,s.analysisAreas=p.areasFromJson(s.analysisAreas),s.combinedAreasInfo=s.combinedAreasInfo&&p.combinedAreasInfoFromJson(s.combinedAreasInfo)||{},i.pppulateCombinedAreasInfo(s.combinedAreasInfo,s.analysisAreas),s.fieldData={runReportTaskID:null,metadata:{},areaData:[],errors:[]},t([a(l.tryFindReportIdByAlias(s),function(e){s.reportID=e||s.reportID}),this._discoverPortal(s)]).then(function(){return a(d.preprocessAreas(s,{analysisAreasLimit:n.analysisAreasLimit}),function(){o(.25),setTimeout(function(){n._onCreateReportStarted()});var e={initGE:h.initialize(),countryInfo:h.getCountryInfo(s.countryID),infographicOptions:n._infographicOptionsProvider.getInfographicOptions(s),attachmentsStore:s.attachmentsProvider?g(s.attachmentsProvider):n._getAttachmentsStore(s.analysisAreas)};return s.reportID?(e.reportObject=l.getCustomReportByID(s),e.templateJsonInfo=c.getTemplateJsonByID(s,n.cacheTemplates),e.runReportResult=u.runReportAndGetData(s)):s.variables&&(s.variables=s.variables.map(function(e){return e.toLowerCase()}),e.reportObject=l.getFakeCustomReportByContext(s),e.templateJsonInfo=c.createTemplateJsonFromVariables(s),e.runReportResult=u.runReportFromVariables(s)),t(e).then(function(e){var r=e.reportObject,t=e.infographicOptions,n=e.attachmentsStore,i=e.templateJsonInfo.templateJson,p=e.templateJsonInfo.templateVariableProvider,l=e.runReportResult;return o(.75),i&&r&&s.fieldData?(u.applyRunReportAndGetDataResults(l,s),I.setCountry(e.countryInfo.country),I.setHierarchyID(r.hierarchy),I.setGeographiesModel(e.countryInfo.geographiesModels[I.getHierarchyID()]),a(n&&u.populateReportDataFromAttachmentsStore(s,n),function(){return o(1),i.theme||(i.theme=v.getReportThemeById(r.isGraphicReport?C.GRAPHIC:C.CLASSIC)),{isClassic:!r.isGraphicReport,isMultiFeature:r.isMultiFeature&&s.analysisAreas.length>1,reportType:r.type,reportTitle:r.title,templateJson:i,reportObject:r,fieldData:s.fieldData,analysisAreas:s.analysisAreas,combinedAreasInfo:s.combinedAreasInfo,reverseAnalysisAreasOnMap:s.reverseAnalysisAreasOnMap,infographicOptions:t,attachmentsStore:n,geClient:h.getClient(),templateVariableProvider:p,config:{portalUrl:s.portalUrl,geoenrichmentUrl:s.geoenrichmentUrl,geometryServiceUrl:s.geometryServiceUrl,printMapTaskUrl:s.printMapTaskUrl,countryID:s.countryID,hierarchy:r.hierarchy,reportID:s.reportID,variables:s.variables}}})):null})})})},_discoverPortal:function(e){var r=this;return A.getPortalInfo(e.portalUrl).then(function(t){e.geoenrichmentUrl=e.geoenrichmentUrl||t.portal.helperServices.geoenrichment.url,h.setGeoenrichmentUrl(e.geoenrichmentUrl),r._infographicOptionsProvider.setServerUrl(e),e.geometryServiceUrl=e.geometryServiceUrl||t.portal.helperServices.geometry.url,P.setGeometryServiceUrl(e.geometryServiceUrl),e.printMapTaskUrl=e.printMapTaskUrl||t.portal.helperServices.printTask.url,y.setPrintMapTaskUrl(e.printMapTaskUrl)})},reportDataToSingleAreaReportData:function(e,t){var a=t.currentFeatureIndex||0,o=r.mixin({},e.fieldData);o.areaData=[o.areaData[a]];var n=[e.analysisAreas[a]],s=e.infographicOptions&&this._infographicOptionsProvider.getInfographicOptionsFromJson(e.infographicOptions.toJsonAt(a)),i=e.attachmentsStore,p=i&&{getAttachments:function(){return i.setCurrentAnalysisAreaIndex&&i.setCurrentAnalysisAreaIndex(a),i.getAttachments()},getAttributes:function(){return i.setCurrentAnalysisAreaIndex&&i.setCurrentAnalysisAreaIndex(a),i.getAttributes()},getNotes:function(){return i.setCurrentAnalysisAreaIndex&&i.setCurrentAnalysisAreaIndex(a),i.getNotes()}};return{isClassic:e.isClassic,isMultiFeature:!1,reportType:e.reportType,reportTitle:t.reportTitle,templateJson:t.templateJson,reportObject:e.reportObject,fieldData:o,analysisAreas:n,combinedAreasInfo:null,reverseAnalysisAreasOnMap:!1,infographicOptions:s,attachmentsStore:p,geClient:e.geClient,templateVariableProvider:e.templateVariableProvider,config:e.config}},_getCurrentContext:function(){return this._currentContext},_onCreateReportStarted:function(){},enrichFieldData:function(e,r){return u.enrichFieldData(e,r)}})});