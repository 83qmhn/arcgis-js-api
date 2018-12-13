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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/json","dojo/has","dojo/json","dojo/Deferred","dojo/promise/all","dojo/when","dojo/data/ItemFileWriteStore","dojo/string","dojo/Evented","dojo/_base/kernel","dojo/Stateful","../../kernel","../../lang","../../request","../../tasks/Geoprocessor","dojo/i18n!../../nls/jsapi","./utils","./storageUtils","./ItemTypes","../../IdentityManager"],function(e,t,s,i,r,a,o,n,h,l,m,c,u,d,p,f,b,P,g,j,v,S,_){var I=t([p,u],{declaredClass:"esri.dijit.analysis.AnalysisBase",isOutputLayerItemUpdated:!1,analysisGpServer:null,toolName:null,portalUrl:null,jobParams:null,itemParams:null,gp:null,resultParameter:null,signInPromise:null,getResultLyrInfos:!1,checkCreditLimits:!1,useGPCreditTask:!0,_isGPCreditSync:!0,_jobInfo:null,_popupInfo:null,_toolServiceUrl:null,_counter:null,_analysisType:"feature",doRefreshItem:!0,doSaveJobInfo:!1,doSaveInStorage:!1,_doDeleteViewResult:!1,outputName:"OutputName",constructor:function(e){this.isOutputLayerItemUpdated=!1,this._rids=[],this._counter=0,this._popupInfo=[],e.analysisGpServer?this._signIn(e.analysisGpServer):e.portalUrl&&(this.portalUrl=e.portalUrl,this._signIn(e.portalUrl,!0)),this.i18n={},s.mixin(this.i18n,j.common),s.mixin(this.i18n,j.analysisTools),s.mixin(this.i18n,j.analysisMsgCodes),s.mixin(this.i18n,j.analysisSettings),this.signInPromise.then(s.hitch(this,this._initErrorHelpMap))},execute:function(e){this.jobParams=e.jobParams,this.jobParams.actualOutputName=this.outputName,this.jobParams[this.outputName]?this.itemParams=e.itemParams:(this.itemParams=null,this.jobParams.resultName=this.get("resultName")),this._analysisType=e.analysisType||"feature",b.isDefined(e.isSpatioTemporalDataStore)&&(this._isSpatioTemporalDataStore=v.settingsVM&&v.settingsVM.datastore&&"CopyToDataStore"!==this.toolName?"BDS"===v.settingsVM.datastore:e.isSpatioTemporalDataStore),this.signInPromise.then(s.hitch(this,this._checkUser))},_checkUser:function(){var e,t,i;i=f.id.findCredential(this.portalUrl),(e=i.userId)&&(t=this.portalUrl+"/sharing/rest/community/users/"+e,P({url:t,content:{f:"json"}}).then(s.hitch(this,this._handleUserProfileResponse),s.hitch(this,function(e){this.emit("job-fail",{message:e.message+(e.details?e.details.toString():""),jobParams:this.jobParams})})))},getUserProfile:function(){var e=new n;return this.userProfile?e.resolve(this.userProfile):this.signInPromise.then(s.hitch(this,function(t){var i,r;(i=t.userId)&&(r=this.portalUrl+"/sharing/rest/community/users/"+i,P({url:r,content:{f:"json"}}).then(s.hitch(this,function(t){this.userProfile=t,e.resolve(t)}),s.hitch(this,function(t){e.reject(t)})))})),e.promise},_handleUserProfileResponse:function(e){var t=this.jobParams.outputType&&this.jobParams.outputType===_.FLAYERVIEW;if(b.isDefined(e)&&b.isDefined(e.orgId))if(-1===i.indexOf(["account_admin","account_publisher","org_admin","org_publisher"],e.role))this.emit("job-fail",{message:this.i18n.pubRoleMsg,messageCode:"AB_0001",jobParams:this.jobParams});else if(b.isDefined(e.availableCredits)&&this.get("checkCreditLimits")&&!t){var a,o,n={};for(a in this.jobParams)this.jobParams.hasOwnProperty(a)&&("object"==typeof this.jobParams[a]?n[a]=r.toJson(this.jobParams[a]):-1!==i.indexOf(["measurementtype"],a.toLowerCase())&&"StraightLine"!==this.jobParams[a]?(o=r.fromJson(this.jobParams[a]),n[a]=o?o.name.replace(/[\s~`!#$%\^&*+=\-\[\]\\';,\/{}|\\":<>\?]/g,""):"DrivingTime"):n[a]=this.jobParams[a]);this.getCreditsEstimate(this.toolName,n).then(s.hitch(this,function(t){var s,i=t&&b.isDefined(t.cost)?t.cost:t.maximumCost;b.isDefined(i)&&e.availableCredits>i?b.isDefined(this.itemParams)?this._checkServiceName(e.orgId):(this.emit("start",this.jobParams),this._submitGpJob()):t&&(t.messageCode||t.message)?(s=b.isDefined(this.i18n[t.messageCode])?this.i18n[t.messageCode]:t.message,s=b.isDefined(t.params)?c.substitute(s,t.params):s,this.emit("job-fail",{message:s,messageCode:"AB_0001",jobParams:this.jobParams})):this.emit("job-fail",{message:this.i18n.insufficientCreditsMsg,messageCode:"AB_0001",jobParams:this.jobParams})}))}else b.isDefined(this.itemParams)?this._checkServiceName(e.orgId):(this.emit("start",this.jobParams),this._submitGpJob());else this.emit("job-fail",{message:this.i18n.orgUsrMsg,jobParams:this.jobParams})},_checkServiceName:function(e){var t,i,a;f.id.findCredential(this.portalUrl),t=this.portalUrl+"/sharing/rest/portals/"+e+"/isServiceNameAvailable",i=r.fromJson(this.jobParams[this.outputName]),b.isDefined(i.serviceProperties)&&b.isDefined(i.serviceProperties.name)&&(i.serviceProperties.name=i.serviceProperties.name.replace(/[\s]|\-|\./g,"_"),this.jobParams[this.outputName]=r.toJson(i)),a={name:i.serviceProperties.name,type:"raster"===this._analysisType?"Image Service":"Feature Service",f:"json"},P({url:t,content:a}).then(s.hitch(this,function(e){e.available?("raster"===this._analysisType?this._createImageService():this._createService(),this.emit("start",this.jobParams)):this.emit("job-fail",{message:this.i18n.servNameExists,type:"warning",messageCode:"AB_0002",jobParams:this.jobParams})}),s.hitch(this,function(e){this.emit("job-fail",{message:e.message+(e.details?e.details.toString():""),jobParams:this.jobParams})}))},_createService:function(){var e,t,i,a,o,n,h,l=this._submitGpJob;n=f.id.findCredential(this.portalUrl),e=n.userId,t=r.fromJson(this.jobParams[this.outputName]),e&&(o=this.itemParams.folder,a=this.portalUrl+"/sharing/rest/content/users/"+e+(o&&"/"!==o?"/"+o:"")+"/createService",i={createParameters:r.toJson({currentVersion:10.2,serviceDescription:"",hasVersionedData:!1,supportsDisconnectedEditing:!1,hasStaticData:!0,maxRecordCount:2e3,supportedQueryFormats:"JSON",capabilities:"Query",description:"",copyrightText:"",allowGeometryUpdates:!1,syncEnabled:!1,editorTrackingInfo:{enableEditorTracking:!1,enableOwnershipAccessControl:!1,allowOthersToUpdate:!0,allowOthersToDelete:!0},xssPreventionInfo:{xssPreventionEnabled:!0,xssPreventionRule:"InputOnly",xssInputRule:"rejectInvalid"},tables:[],name:t.serviceProperties.name}),outputType:"featureService",f:"json"},this._isSpatioTemporalDataStore&&(h=r.fromJson(i.createParameters),h.options={dataSourceType:"spatiotemporal"},i.createParameters=r.toJson(h)),this.jobParams.outputType&&this.jobParams.outputType===_.FLAYERVIEW&&(h=r.fromJson(i.createParameters),s.mixin(i,this._getViewCreateParams()),i.createParameters=r.toJson(h),l=this._addViewDefinition),P({url:a,content:i},{usePost:!0}).then(s.hitch(this,l),s.hitch(this,this._handleCreateServiceError)))},_createImageService:function(){var e,t,i,a,o,n;n=f.id.findCredential(this.portalUrl),e=n.userId,t=r.fromJson(this.jobParams[this.outputName]),e&&(o=this.itemParams.folder,a=this.portalUrl+"/sharing/rest/content/users/"+e+(o&&"/"!==o?"/"+o:"")+"/createService",i={createParameters:r.toJson({name:t.serviceProperties.name,description:"",capabilities:"Image",properties:{path:"@",description:"",copyright:""}}),outputType:"imageService",f:"json"},P({url:a,content:i},{usePost:!0}).then(s.hitch(this,this._submitGpJob),s.hitch(this,this._handleCreateServiceError)))},_handleCreateServiceError:function(e){this.emit("job-fail",{message:e.message+(e.details?e.details.toString():""),jobParams:this.jobParams})},_getViewCreateParams:function(){return{isView:!0}},_addViewDefinition:function(e){var t,i;this.itemParams&&(this.currentGpItemId=e.itemId,t=r.fromJson(this.jobParams[this.outputName]),t.serviceProperties&&(t.serviceProperties.serviceUrl=e.serviceurl),t.itemProperties={itemId:e.itemId},this.itemParams.folder&&(t.itemProperties.folderId=this.itemParams.folder),this.jobParams[this.outputName]=r.toJson(t)),this.getViewParams({jobParams:this.jobParams,resultService:{url:e.serviceurl,itemId:e.itemId}}).then(s.hitch(this,function(t){i=t;var a={jobId:"ViewJob_"+(new Date).getTime(),jobStatus:"esriJobSubmitted",jobParams:this.jobParams};this._addToDefinition(e.serviceurl,i).then(s.hitch(this,function(e){var t={value:{}};this._doDeleteViewResult||(this._jobInfo.jobStatus="esriJobSucceeded",setTimeout(s.hitch(this,function(){this.itemParams.properties={jobUrl:e.serviceurl+"/jobs/"+this._jobInfo.jobId,jobType:"GPServer",jobId:this._jobInfo.jobId,jobStatus:"completed"},this._readItem()}),300),this.doSaveJobInfo&&this.saveJobInfo(this._jobInfo),t.outputLayerName=r.fromJson(this.jobParams[this.outputName]).serviceProperties.name,t.value.itemId=this.currentGpItemId,t.analysisInfo={toolName:this.toolName,secondaryOutputs:this.secondaryOutputs,jobParams:this.jobParams},this.emit("job-result",t))}),s.hitch(this,this._gpJobFailed)),this.emit("job-submit",this.jobParams),setTimeout(s.hitch(this,function(){this._jobInfo=a,this._jobInfo.jobStatus="esriJobExecuting",this._readItem(),this.emit("job-status",this._jobInfo)},0))}),s.hitch(this,this._gpJobFailed))},_addToDefinition:function(e,t){var s,i=e.replace("/rest/services","/rest/admin/services")+"/addToDefinition",a=f.id.findCredential(this.portalUrl);return s={f:"json",addToDefinition:r.toJson(t),token:a.token},P({url:i,content:s},{usePost:!0})},_getAdminLayerInfo:function(e){var t,s=e.replace("/rest/services","/rest/admin/services"),i=f.id.findCredential(this.portalUrl);return t={f:"json",token:i.token},P({url:s,content:t})},_getSelf:function(e){return P({url:e+"/sharing/rest/portals/self",content:{culture:d.locale,f:"json"},callbackParamName:"callback",timeout:0},{})},_submitGpJob:function(e){var t,i,a;this.itemParams&&(this.currentGpItemId=e.itemId,t=r.fromJson(this.jobParams[this.outputName]),t.serviceProperties&&(t.serviceProperties.serviceUrl=e.serviceurl),t.itemProperties={itemId:e.itemId},this.itemParams.folder&&(t.itemProperties.folderId=this.itemParams.folder),this.jobParams[this.outputName]=r.toJson(t)),this.rerun&&this.context&&this._useExtentCheck&&!this._useExtentCheck.get("checked")&&(this.context=null),this.context&&(i=r.fromJson(this.jobParams.context),i||(i={}),this.context.outSR&&!i.outSR&&(i.outSR=this.context.outSR),this.context.processSR&&!i.processSR&&(i.processSR=this.context.processSR),this.context.extent&&!i.extent&&(i.extent=this.context.extent),"raster"===this._analysisType&&(this.context.cellSize&&!i.cellSize&&(i.cellSize=this.context.cellSize),this.context.mask&&!i.mask&&(i.mask=this.context.mask),this.context.snapRaster&&!i.snapRaster&&(i.snapRaster=this.context.snapRaster)),this.jobParams.context=r.toJson(i)),this.analysisGpServer?(this._toolServiceUrl&&this.gp||this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName),this.gp.setUpdateDelay(3e3),this.itemParams||delete this.jobParams.resultName,a=s.mixin({},this.jobParams),a.actualOutputName&&delete a.actualOutputName,this.gp.submitJob(a,s.hitch(this,this._gpJobComplete),s.hitch(this,this._gpJobStatus),s.hitch(this,this._gpJobFailed)),this.itemParams||(this.jobParams.resultName=this.get("resultName")),this.emit("job-submit",this.jobParams)):this._getSelf(this.portalUrl).then(s.hitch(this,function(e){this.analysisGpServer=e.helperServices.analysis&&e.helperServices.analysis.url?e.helperServices.analysis.url:null,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName),this.gp.setUpdateDelay(3e3),this.itemParams||delete this.jobParams.resultName,this.gp.submitJob(this.jobParams,s.hitch(this,this._gpJobComplete),s.hitch(this,this._gpJobStatus),s.hitch(this,this._gpJobFailed)),this.itemParams||(this.jobParams.resultName=this.get("resultName")),this.emit("job-submit",this.jobParams)}))},_updateItem:function(e){var t,i,a,o,n,h,l;if(t=f.id.findCredential(this.portalUrl),i=t.userId)return a=this.itemParams.folder,o=this.portalUrl+"/sharing/rest/content/users/"+i+(a&&"/"!==a?"/"+a:"")+"/items/"+this.currentGpItemId+"/update",e&&(l=e.item.properties),b.isDefined(l)||(l={}),b.isDefined(l.jobUrl)||(l.jobUrl=this._toolServiceUrl+"/jobs/"+this._jobInfo.jobId,l.jobType="GPServer",l.jobId=this._jobInfo.jobId,l.jobStatus="processing",this.itemParams.properties=l),n=s.mixin({f:"json"},this.itemParams),e&&n.folder===e.item.folder&&delete n.folder,e&&e.item&&n.tags===e.item.tags.toString()&&delete n.tags,e&&e.item&&n.snippet===e.item.snippet&&delete n.snippet,e&&e.item&&n.description===e.item.description&&delete n.description,n.properties&&(n.properties=r.toJson(n.properties)),n.text&&(n.text=r.toJson(n.text)),{},{},h=P({url:o,content:n},{usePost:!0}),h.then(s.hitch(this,this._handleItemUpdate),s.hitch(this,this._handleUpdateItemError)),h},_handleItemUpdate:function(e){this.isOutputLayerItemUpdated=!0},_handleItemDataUpdate:function(e){},_handleUpdateItemError:function(e){this.isOutputLayerItemUpdated=!0,this.emit("job-fail",{message:e.message+(e.details?e.details.toString():""),jobParams:this.jobParams})},_handleErrorResponse:function(e){this.emit("job-fail",e)},_refreshItem:function(){var e,t,s,i,r;return i=f.id.findCredential(this.portalUrl),e=i.userId,e?(t=this.itemParams.folder,s=this.portalUrl+"/sharing/rest/content/users/"+e+(t&&"/"!==t?"/"+t:"")+"/items/"+this.currentGpItemId+"/refresh",r=P({url:s,content:{f:"json"}},{usePost:!0})):(r=new n,r.resolve()),r.promise},_handleItemRefresh:function(e){},_readItem:function(){var e,t,i,r,a;if(r=f.id.findCredential(this.portalUrl),e=r.userId)return t=this.itemParams.folder,i=this.portalUrl+"/sharing/rest/content/users/"+e+(t&&"/"!==t?"/"+t:"")+"/items/"+this.currentGpItemId,a=P({url:i,content:{f:"json"}}),a.then(s.hitch(this,this._updateItem))},getItemInfo:function(e){var t,s;if(s=f.id.findCredential(this.portalUrl),s.userId)return t=this.portalUrl+"/sharing/rest/content/items/"+e,P({url:t,content:{f:"json"}})},_gpJobStatus:function(e){e.jobParams=this.jobParams,e.resultParameter=this.resultParameter,e.returnProcessInfo=this.jobParams.returnProcessInfo,e.getResultLyrInfos=this.getResultLyrInfos,e.currentGpItemId=this.currentGpItemId,e.itemParams=this.itemParams,"esriJobFailed"===e.jobStatus||"esriJobSucceeded"===e.jobStatus?(e.messages&&(e.message=this._buildErrorMsg(e)),this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null,this._gpJobComplete(e)),"esriJobFailed"===e.jobStatus&&this._deleteItem(!1)):"esriJobCancelled"===e.jobStatus&&(this.itemParams?this._deleteItem(!0):this.emit("job-cancel",e)),this.doSaveJobInfo&&this.saveJobInfo(e),this.emit("job-status",e),this._jobInfo=e,this.itemParams&&!this.isOutputLayerItemUpdated&&this._readItem()},_updateRefreshItem:function(e){var t=[],i=e[0];t.push(this._readItem(this.doRefreshItem)),h(t).then(s.hitch(this,function(e){i.outputLayerName=r.fromJson(this.jobParams[this.outputName]).serviceProperties.name,i.value.itemId=this.currentGpItemId,i.analysisInfo={toolName:this.toolName,secondaryOutputs:this.secondaryOutputs,jobParams:this.jobParams},this.doRefreshItem?this._refreshItem().always(s.hitch(this,function(){this.emit("job-result",i)})):this.emit("job-result",i)}),s.hitch(this,this._handleDeleteItemError))},_gpJobComplete:function(e){var t;"esriJobSucceeded"===e.jobStatus&&(e.jobParams=this.jobParams,this.emit("job-success",e),h(this._getGpResultData(e)).then(s.hitch(this,function(a){if(a=i.filter(a,function(e){var t=!0;if(b.isDefined(e.value.empty)?t=e.value.empty:b.isDefined(e.value.url)||b.isDefined(e.value.itemId)?t=!1:b.isDefined(e.value.featureSet)&&(t=!1),!t)return e}),0===a.length)return this.currentGpItemId&&this._deleteItem(!1),void this.emit("job-fail",{message:this.i18n.emptyResultInfoMsg,type:"warning",jobParams:this.jobParams});b.isDefined(this.itemParams)&&this.itemParams.properties&&this.itemParams.properties.jobStatus&&"processing"===this.itemParams.properties.jobStatus&&(this.itemParams.properties.jobStatus="completed"),i.forEach(a,function(e){if(e.value.featureSet&&!e.value.url)e.value.featureSet.spatialReference=e.value.layerDefinition.spatialReference;else if(e.value.url&&-1!==e.value.url.indexOf("/FeatureServer/")&&e.value.layerInfo&&e.value.layerInfo.popupInfo){var t=e.value.url.match(/[0-9]+$/g)[0];this._popupInfo[t]=e.value.layerInfo.popupInfo}},this),t=a[0],t.results=a,this.jobParams.returnProcessInfo?this.gp.getResultData(e.jobId,"ProcessInfo").then(s.hitch(this,function(e){var s=[];i.forEach(e.value,function(e){s.push(r.fromJson(e))},this),this.currentGpItemId?(this.itemParams.description=v.buildReport(s),this._updateRefreshItem(a)):(t.analysisReport=v.buildReport(s),t.outputLayerName=this.jobParams.resultName,this.emit("job-result",t))})):this.currentGpItemId?this._updateRefreshItem(a):(t.outputLayerName=this.jobParams.resultName,this.emit("job-result",t))})))},_gpJobFailed:function(e){s.clone(e).jobParams=this.jobParams,this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),e.messages&&(e.message=this._buildErrorMsg(e)),this.emit("job-fail",e)},_getGpResultData:function(e){var t=[],s=[];return"string"==typeof this.resultParameter?s.push(this.resultParameter):this.resultParameter instanceof Array&&(s=this.resultParameter),i.forEach(s,function(s,i){t.push(this.gp.getResultData(e.jobId,s))},this),t},cancel:function(e){this.jobParams.outputType&&this.jobParams.outputType===_.FLAYERVIEW?(this._doDeleteViewResult=!0,this._deleteItem(!0)):this.gp.cancelJob(e.jobId).then(s.hitch(this,function(e){"esriJobCancelled"===e.jobStatus&&(this.itemParams?this._deleteItem(!0):this.emit("job-cancel",e))}),function(e){})},checkJobStatus:function(e){this.signInPromise.then(s.hitch(this,function(){this.gp.setUpdateDelay(3e3),this._checkTimer=setInterval(s.hitch(this,this._checkStatus,e,s.hitch(this,this._gpJobStatus),s.hitch(this,this._gpJobFailed)),3e3)}))},_checkStatus:function(e,t,s){this.gp.checkJobStatus(e,t,s)},_deleteItem:function(e){var t,i,r,a;a=f.id.findCredential(this.portalUrl),(t=a.userId)&&this.itemParams&&(i=b.isDefined(this.itemParams.folder)?this.itemParams.folder:"",r=this.portalUrl+"/sharing/rest/content/users/"+t+(i&&"/"!==i?"/"+i:"")+"/items/"+this.currentGpItemId+"/delete",P({url:r,content:{f:"json"}},{usePost:!0}).then(s.hitch(this,this._handleItemDelete,e),s.hitch(this,this._handleDeleteItemError)))},_handleItemDelete:function(e,t){e&&this.emit("job-cancel",t)},_handleDeleteItemError:function(e){this.emit("job-fail",{message:e.message+(e.details?e.details.toString():""),jobParams:this.jobParams})},_initFolderStore:function(e,t){this.portalSelf?this._fportal=new e.Portal({url:this.portalUrl,self:this.portalSelf}):this._fportal=new e.Portal(this.portalUrl),this._fportal.signIn().then(s.hitch(this,function(e){this.portalUser=e,this.portalUser.getFolders().then(s.hitch(this,function(e){var s=v.createFolderStore(e,this.portalUser.username);t.resolve(s)}))}))},getFolderStore:function(){var t,r,a,o,h=new n;return this.folderStore?h.resolve(this.folderStore):this.signInPromise.then(s.hitch(this,function(s){t=["../../arcgis/Portal"],r=this._counter++,a=this,this._rids&&this._rids.push(r),e(t,function(e){-1!==(o=a._rids?i.indexOf(a._rids,r):-1)&&(a._rids.splice(o,1),a._initFolderStore(e,h))})})),h},_checkToolUrl:function(){var e=new n;return this.analysisGpServer?(this._toolServiceUrl&&this.gp||this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName),e.resolve({success:!0})):this._getSelf(this.portalUrl).then(s.hitch(this,function(t){this.analysisGpServer=t.helperServices.analysis&&t.helperServices.analysis.url?t.helperServices.analysis.url:null,this.analysisGpServer&&this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName),e.resolve({success:!0})})),e},getCreditsEstimate:function(e,t){this.start=window.performance.now();var a,o,h,l,m,c;return o=new n,this._checkToolUrl().then(s.hitch(this,function(n){var u;this._toolServiceUrl?m=this._toolServiceUrl:(l=this.portalUrl&&-1!==this.portalUrl.indexOf("dev")?"dev":this.portalUrl&&-1!==this.portalUrl.indexOf("qa")?"qa":"",m="http://analysis"+l+".arcgis.com/arcgis/rest/services/tasks/GPServer/"+this.toolName),!this.showGeoAnalyticsParams&&-1!==i.indexOf(["AggregatePoints","SummarizeWithin"],e)&&t.binType?(a=m.replace(e,"TessellationCredit"),t.pointLayer?t.inputLayer=t.pointLayer:t.summaryLayer&&(t.inputLayer=t.summaryLayer),u={jobParams:t,resultParameter:"creditOutput",def:o},this._getGPCreditEstimate(a,u)):this.useGPCreditTask?(c=this.portalSelf||this._portal,a=c&&c.helperServices&&c.helperServices.creditEstimation&&c.helperServices.creditEstimation.url?c.helperServices.creditEstimation.url+"/EstimateCredits":m.replace("/tasks/GPServer/"+e,"/Estimate/GPServer/EstimateCredits"),u={jobParams:{taskName:e,taskParameters:r.toJson(t)},resultParameter:"creditEstimate",def:o,isGPCreditSync:this._isGPCreditSync},this._getGPCreditEstimate(a,u)):(a=m.replace("/"+e,"/exts/Estimate/"+e),h=s.mixin({f:"json"},t),P({url:a,content:h},{usePost:!0}).then(s.hitch(this,function(e){this.end=window.performance.now();var t=this.end-this.start;console.log("Analysis Credit Estimator SOE Sync Time : "+t+" milliseconds"),o.resolve(e)}),function(e){o.resolve(e)}))})),o},_getGPCreditEstimate:function(e,t){this.creditGP=new g(e),this.creditGP.setUpdateDelay(1e3),t.isGPCreditSync?this.creditGP.execute(t.jobParams,s.hitch(this,this._getGPCreditResult,t.def,t.resultParameter,t.isGPCreditSync),s.hitch(this,this._creditGPJobFailed,t.def,t.isGPCreditSync)):this.creditGP.submitJob(t.jobParams,s.hitch(this,this._getGPCreditResult,t.def,t.resultParameter,t.isGPCreditSync),s.hitch(this,this._creditGPJobFailed,t.def,t.isGPCreditSync),s.hitch(this,this._creditGPJobFailed,t.def,t.isGPCreditSync))},_getGPCreditResult:function(e,t,i,r){i?(this.end=window.performance.now(),console.log("Analysis Credit Estimator GP Sync Time : "+(this.end-this.start)+" milliseconds"),e.resolve(r[0].value)):this.creditGP.getResultData(r.jobId,t).then(s.hitch(this,function(e,t){t&&t.value&&t.value.credits&&(t.value.cost=t.value.credits),this.end=window.performance.now();var s=this.end-this.start;console.log("Analysis Credit Estimator GP Async Time : "+s+" milliseconds"),e.resolve(t.value)},e),s.hitch(this,function(e,t){e.resolve(t)},e))},_creditGPJobFailed:function(e,t,s){t?400!==s.code&&-1===s.code.indexOf("IdentityManagerBase.")||(s.messages=s.details,e.resolve(s)):"esriJobFailed"!==s.jobStatus&&"esriJobCancelled"!==s.jobStatus||e.resolve(this._buildErrorMsg(s))},_signIn:function(t,r){var a,o,h,l,m;return this.signInPromise=new n,r?(a=["../../arcgis/Portal"],o=this._counter++,h=this,this._rids&&this._rids.push(o),e(a,s.hitch(this,function(e){-1!==(l=h._rids?i.indexOf(h._rids,o):-1)&&(h._rids.splice(l,1),this.portalSelf?this._portal=new e.Portal({url:t,self:this.portalSelf}):this._portal=new e.Portal(t),this._portal.signIn().then(s.hitch(this,function(e){this.portalUser=e,this._portal.helperServices&&this._portal.helperServices.analysis&&this._portal.helperServices.analysis.url?(this.analysisGpServer=this._portal.helperServices.analysis.url,this.showGeoAnalyticsParams&&this._portal.helperServices.geoanalytics&&(this.analysisGpServer=this._portal.helperServices.geoanalytics.url),P({url:this.analysisGpServer,content:{f:"json"},callbackParamName:"callback"}).then(s.hitch(this,function(e){m=f.id.findCredential(this.analysisGpServer),this.signInPromise.resolve(m)}),s.hitch(this,function(e){this.signInPromise.reject(e)}))):this.signInPromise.resolve(e)}),s.hitch(this,this._handleSignInError)))}))):P({url:t,content:{f:"json"},callbackParamName:"callback"}).then(s.hitch(this,function(e){var i,r;i=f.id.findCredential(t),b.isDefined(i)?(r=f.id.findServerInfo(this._toolServiceUrl),b.isDefined(r)&&b.isDefined(r.owningSystemUrl)&&(this.portalUrl=r.owningSystemUrl),this.signInPromise.resolve(i)):f.id.getCredential(t).then(s.hitch(this,function(e){e=f.id.findCredential(t),r=f.id.findServerInfo(this._toolServiceUrl),b.isDefined(r)&&b.isDefined(r.owningSystemUrl)&&(this.portalUrl=r.owningSystemUrl),this.signInPromise.resolve(e)}),s.hitch(this,this._handleSignInError))}),s.hitch(this,this._handleSignInError)),this.signInPromise},_handleSignInError:function(e){this.emit("job-fail",{message:this.i18n.analysisSignInErrorMsg,messageCode:"AB_0003"}),this.signInPromise.reject(e)},_buildErrorMsg:function(e){var t,s,a="",o=[];return this.errorHelpMap||this._initErrorHelpMap(),o=i.filter(e.messages,function(e){if(("esriJobMessageTypeError"===e.type||"esriJobMessageTypeWarning"===e.type)&&-1!==e.description.indexOf("messageCode"))return e.description},this),o.length>0&&i.forEach(o,function(i){var o;try{t=r.fromJson(i.description)}catch(e){t=i.description}s="","esriJobMessageTypeWarning"===i.type&&(e.type="warning"),t.messageCode?(s=b.isDefined(this.i18n[t.messageCode])?this.i18n[t.messageCode]:t.message,s=b.isDefined(t.params)?c.substitute(s,t.params):s,a+=s+"&nbsp;",(o=this._addLearnMoreErrorLink(t.messageCode))&&(a+=o)):t.error&&t.error.messageCode?(s=b.isDefined(this.i18n[t.error.messageCode])?this.i18n[t.error.messageCode]:t.error.message,s=b.isDefined(t.error.params)?c.substitute(s,t.error.params):s,a+=s+"&nbsp;",(o=this._addLearnMoreErrorLink(t.error.messageCode))&&(a+=o)):a+=t+"&nbsp;"},this),a},_toolServiceUrlSetter:function(e){this._toolServiceUrl=e,this.gp=new g(e)},_setToolServiceUrlAttr:function(e){this._toolServiceUrl=e,this.gp=new g(e)},checkCreditLimitsAttr:function(e){this.checkCreditLimits=e},replaceTag:function(e){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[e]||e},safetagsReplace:function(e){return e.replace(/[<>]/g,this.replaceTag)},saveJobInfo:function(e){var t,a,o;if(this.doSaveJobInfo&&this.currentGpItemId&&-1!==i.indexOf(["esriJobSucceeded"],e.jobStatus)){s.mixin(e.jobParams,{extentCheck:this._useExtentCheck&&this._useExtentCheck.get("checked")}),i.forEach(e.messages,function(e){e.description=this.safetagsReplace(e.description)},this),t={toolName:this.toolName,jobParams:e.jobParams,timestamp:Date.now(),portalUrl:this.portalUrl,jobInfo:{jobId:e.jobId,jobStatus:e.jobStatus,messages:e.messages,analysisServer:"bigdata"===this.analysisMode?"geoanalytics":"default"===this.analysisMode?"standard":this.analysisMode}},"CopyToDataStore"===this.toolName&&(t.jobParams.isSpatioTemporalDataStore=this._isSpatioTemporalDataStore),"bigdata"===this.analysisMode&&t.jobParams.timeStepReference&&(t.jobParams.timeReferenceType=this.get("timeReferenceType"));for(var n in t.jobParams)if(t.jobParams.hasOwnProperty(n)&&b.isDefined(t.jobParams[n])){if("object"==typeof t.jobParams[n]&&t.jobParams[n].serviceToken||"string"==typeof t.jobParams[n]&&-1!==t.jobParams[n].indexOf("serviceToken")){var h="string"==typeof t.jobParams[n]?r.fromJson(t.jobParams[n]):t.jobParams[n];h&&h.serviceToken&&(delete h.serviceToken,t.jobParams[n]="string"==typeof t.jobParams[n]?r.toJson(h):h)}("object"==typeof t.jobParams[n]&&!s.isArray(t.jobParams[n])&&t.jobParams[n].filter||"string"==typeof t.jobParams[n]&&-1!==t.jobParams[n].search(/[<>]/g))&&("object"==typeof t.jobParams[n]&&t.jobParams[n].filter&&!s.isArray(t.jobParams[n])?t.jobParams[n].filter=this.safetagsReplace(t.jobParams[n].filter):"string"==typeof t.jobParams[n]&&-1!==t.jobParams[n].search(/[<>]/g)&&(t.jobParams[n]=this.safetagsReplace(t.jobParams[n])))}o=f.id.findCredential(this.portalUrl),this.currentGpItemId&&(a={id:this.currentGpItemId,folderId:this.itemParams.folder,owner:o.userId},S.addToItemResource(a,t)),this.doSaveInStorage&&S.addToStorage(t)}},_initErrorHelpMap:function(){if(this.isSingleTenant){var t=e.toUrl("./help/errorhelpmap_enterprise.json");P({url:t}).then(s.hitch(this,function(e){this.errorHelpMap=e.map}))}},_addLearnMoreErrorLink:function(e){if(this.isSingleTenant){var t,s=this.errorHelpMap[e],i=this&&this.portalSelf?this.portalSelf.helpBase:null,r=this.analysisGpServer&&-1!==this.analysisGpServer.indexOf("dev")?"dev":this.analysisGpServer&&-1!==this.analysisGpServer.indexOf("qa")?"uat":"";return b.isDefined(s)&&(t="http://doc"+r+".arcgis.com/en/arcgis-online/analyze/"+s,this.isSingleTenant&&i?t=i+"index.html#"+s:this.isSingleTenant&&!i&&(t="http://server"+r+".arcgis.com/en/portal/latest/use/"+s)),t&&(t="<br/><br/><div class='esriHelpPopup'><a class='action zoomTo' href='"+t+"' target='_help'>"+this.i18n.learnMore+"</a></div><br/><br/>"),t}}});return a("extend-esri")&&s.setObject("dijit.analysis.AnalysisBase",I,f),I});