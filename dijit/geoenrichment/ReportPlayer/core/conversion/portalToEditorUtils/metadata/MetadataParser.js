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

define(["dojo/promise/all","esri/dijit/geoenrichment/utils/JsonXmlConverter","./DataCollectionsCalculatorsParser","./LocatorCalculatorsParser","./map/MapCalculatorsParser","./TradeAreaCalculatorsParser"],function(a,r,e,t,l,o){var s={};return s.parseMetadataXML=function(s,n,c){c.log&&c.log(s.data);var u=r.parseXml(s.data);if(u&&u.tags)return a([o.parseTradeAreaCalculators(u,c),e.parseDataCollectionsCalculators(u,n,c),t.parseLocatorCalculators(u,n,c)]).then(function(){return l.parseMapCalculators(u,n,c)})},s});