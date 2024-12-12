/*!
 * PSPDFKit for Web 2024.8.0 (https://pspdfkit.com/web)
 *
 * Copyright (c) 2016-2024 PSPDFKit GmbH. All rights reserved.
 *
 * THIS SOURCE CODE AND ANY ACCOMPANYING DOCUMENTATION ARE PROTECTED BY INTERNATIONAL COPYRIGHT LAW
 * AND MAY NOT BE RESOLD OR REDISTRIBUTED. USAGE IS BOUND TO THE PSPDFKIT LICENSE AGREEMENT.
 * UNAUTHORIZED REPRODUCTION OR DISTRIBUTION IS SUBJECT TO CIVIL AND CRIMINAL PENALTIES.
 * This notice may not be removed from this file.
 *
 * PSPDFKit uses several open source third-party components: https://pspdfkit.com/acknowledgements/web/
 */
"use strict";(globalThis.webpackChunkPSPDFKit=globalThis.webpackChunkPSPDFKit||[]).push([[5362],{63993:(e,t,a)=>{a.r(t),a.d(t,{corePool:()=>l.mG,customFontsPromiseRef:()=>b,default:()=>w,loadModule:()=>_,normalizeCoreOptions:()=>l.DO,validateStandaloneConfiguration:()=>l.mn});var s=a(49568),i=a(85409),n=a(55994),r=a(41204),o=a(85410),l=a(92026),c=a(37506),u=a(85553),d=a(89055),h=a(68322),m=a(94010),f=a(84318);async function p(e,t){const a=await fetch(e,{credentials:"same-origin"}).finally((()=>{t?.()}));return{isFullyAvailable:!0,fullDocument:await a.arrayBuffer()}}var g=a(33075);let y;class w extends l.Ay{constructor(e){const t=e.baseUrl||(0,o.$_)(window.document),a=e.baseCoreUrl||t,s=e.baseProcessorEngineUrl||t,n={...e,baseUrl:t,baseCoreUrl:a,baseProcessorEngineUrl:s};if("string"!=typeof n.baseUrl)throw new i.uE("`baseUrl` is mandatory and must be a valid URL, e.g. `https://example.com/`");if("string"!=typeof n.document&&!(n.document instanceof ArrayBuffer))throw new i.uE("document must be either an URL to a supported document type (PDF and images), e.g. `https://example.com/document.pdf`, or an `ArrayBuffer`");if(y&&y!==n.licenseKey)throw new i.uE("Trying to re-use instance with a different licenseKey.\nUnfortunately we only allow one licenseKey per instance.\nPlease contact support for further assistance.");if("string"==typeof n.licenseKey&&n.licenseKey.startsWith("TRIAL-"))throw new i.uE("You're using the npm key instead of the license key. This key is used to download the PSPDFKit for Web package via the node package manager.\n\nLeave out the license key to activate as a trial.");super(n),this.destroyed=!1}async load(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=.2;e.progressCallback&&e.progressCallback("loading",t),this._isPDFJavaScriptEnabled=e.isPDFJavaScriptEnabled,"string"==typeof this._state.document&&(0,g.XC)(this._state.baseUrl,this._state.document,this._state.productId);const a=await _(this.client,this._state).finally((()=>{t+=.3,e.progressCallback&&e.progressCallback("loading",t)})),n=async function(e,t,a,s){if(e instanceof ArrayBuffer)return{isFullyAvailable:!0,fullDocument:e};(0,i.V1)("string"==typeof e,"Document is not a string");let n=!1;const{linearizedInstance:r,serverSupportsRangeRequests:o}=await(async()=>{if(a){const a=t.initializeLinearizedInstance();return{linearizedInstance:a,serverSupportsRangeRequests:await a.initialize(e)}}return{linearizedInstance:null,serverSupportsRangeRequests:!1}})();try{if(!o)return n=!0,p(e,s);if((0,i.V1)(r,"Loader is not available"),r.kickStartDownload(),!await r.waitUntilIsLinearizedIsKnown())return r.destroy(),n=!0,p(e,s);s?.();const t=await r.waitUntilDocumentInfoAvailable();return t?(s?.(),{isFullyAvailable:!1,documentResponse:t}):(r.destroy(),n=!0,p(e,s))}catch(t){if(r?.destroy(),n)throw t;return p(e,s)}}(this._state.document,this.corePDFBridge,this._state.allowLinearizedLoading,(()=>{t+=.3,e.progressCallback&&e.progressCallback("loading",t)}));(0,i.V1)(a);const{features:o,signatureFeatureAvailability:l,capabilities:c}=a;if(this._state.productId===h.v.SharePoint&&"string"==typeof this._state.document&&Array.isArray(a.afu)){const e=new URL(this._state.document,this._state.baseUrl);if(!a.afu.some((t=>e.hostname.match(t))))throw new i.uE(`The document origin ${e.hostname} is not authorized.`)}const f=l===u.g.ELECTRONIC_SIGNATURES&&(0,d.UX)(o)&&this._state.forceLegacySignaturesFeature?u.g.LEGACY_SIGNATURES:l;this._state=this._state.set("features",(0,s.B8)(o)).set("signatureFeatureAvailability",f),y=this._state.licenseKey;const w=await n;let b=null;if(w.isFullyAvailable){let t=w.fullDocument.slice(0);try{this.destroyed?(t=null,b=await new Promise((()=>{}))):(b=await this.client.openDocument(w.fullDocument,{password:e.password,initialPageIndex:"number"==typeof e.initialPageIndex?e.initialPageIndex:0,formsConfiguration:this._formsConfiguration}),t=null)}catch(a){if("INVALID_PASSWORD"===a.message&&this._state.document instanceof ArrayBuffer&&(this._state=this._state.set("document",a.callArgs[0])),"IMAGE_DOCUMENTS_NOT_LICENSED"===a.message&&(a.message="The image documents feature is not enabled for your license key. Please contact support or sales to purchase the UI module for your product."),!(c?.includes("GdPictureWASM")&&a instanceof i.uE&&a.message.includes("File not in PDF format or corrupted.")&&this._state.productId!==h.v.Salesforce))throw a;{(0,i.V1)(t);let s,n=(0,m.jU)();try{n||(n=(0,m.NY)({baseUrl:this._state.baseProcessorEngineUrl,mainThreadOrigin:this._state.appName||(0,r.D5)()||window.location.origin,licenseKey:this._state.licenseKey||void 0,customFonts:this._state.customFonts||void 0,dynamicFonts:this._state.dynamicFonts||void 0,fontSubstitutions:this._state.fontSubstitutions,processorEngine:this._state.processorEngine}),(0,m.Pm)(n)),s=await n,(0,i.V1)(s);const a=await s.toPdf(t);b=await this.client.openDocument(a,{password:e.password,initialPageIndex:"number"==typeof e.initialPageIndex?e.initialPageIndex:0,formsConfiguration:this._formsConfiguration})}catch(e){throw"INVALID_PASSWORD"===e.message&&this._state.document instanceof ArrayBuffer&&(this._state=this._state.set("document",a.callArgs[0])),"IMAGE_DOCUMENTS_NOT_LICENSED"===e.message&&(e.message="The image documents feature is not enabled for your license key. Please contact support or sales to purchase the UI module for your product."),e}finally{t=null,s?.destroy(),(0,m.Pm)(null)}}}(0,i.V1)(b),await this.afterDocumentLoaded(b)}else b=w.documentResponse;return this._state=this._state.set("documentResponse",b),{features:this._state.features,signatureFeatureAvailability:this._state.signatureFeatureAvailability,hasPassword:!!e.password,password:e.password,allowedTileScales:"all",evaluation:a.evaluation,linearizedLoading:!w.isFullyAvailable,documentResponse:b}}destroy(){this.destroyed=!0,super.destroy()}getCustomFontsPromise(){return b}async afterDocumentLoaded(e){if(this._isPDFJavaScriptEnabled&&(this._initialChanges=await this.client.enablePDFJavaScriptSupport()),this._XFDF&&await this.client.importXFDF(this._XFDF.source,this._XFDF.keepCurrentAnnotations,this._XFDF.ignorePageRotation),this._instantJSON&&this._instantJSON.pdfId&&e.ID.permanent){const t=this._instantJSON.pdfId,a=e.ID;if(t.permanent!==a.permanent)throw new i.uE("Could not instantiate from Instant JSON: Permanent PDF ID mismatch.\nPlease use the same PDF document that was used to create this Instant JSON.\nFor more information, please visit: https://pspdfkit.com/guides/web/current/importing-exporting/instant-json/");if(t.changing!==a.changing)throw new i.uE("Could not instantiate from Instant JSON: Changing PDF ID mismatch.\nPlease use the same revision of this PDF document that was used to create this Instant JSON.\nFor more information, please visit: https://pspdfkit.com/guides/web/current/importing-exporting/instant-json/")}if(this._trustedCAsCallback)try{const e=await this._trustedCAsCallback();if(!Array.isArray(e))throw new i.uE("Certificates response must be an array");if(e.some((e=>!(e instanceof ArrayBuffer)&&"string"!=typeof e)))throw new i.uE("All certificates must be passed as ArrayBuffer (DER) or string (PEM)");await this.client.loadCertificates(e.map(c.PI))}catch(e){throw new i.uE(`Could not retrieve certificates for digital signatures validation: ${e.message}.`)}}async waitUntilFullyLoaded(e){(0,i.V1)(this.corePDFBridge.linearizedInstance,"Linearized loader is not available");return this.corePDFBridge.linearizedInstance.waitUntilDownloaded().then((async()=>{await this.corePDFBridge.normallyOpenLinearizedDocument(this,{password:e,initialPageIndex:0,formsConfiguration:this._formsConfiguration}),await this.afterDocumentLoaded(this._state.documentResponse)}))}}const b={current:void 0};async function _(e,t){b.current=b.current||(t.customFonts?(0,f.eY)(t.customFonts):void 0);const a=(0,o.f)(t.appName);return e.loadNativeModule(t.baseCoreUrl,{mainThreadOrigin:a,disableWebAssemblyStreaming:t.disableWebAssemblyStreaming,enableAutomaticLinkExtraction:t.enableAutomaticLinkExtraction,overrideMemoryLimit:t.overrideMemoryLimit,workerSpawnerFn:()=>(0,n.pj)(t.inlineWorkers)}).then((async()=>e.load(t.baseCoreUrl,t.licenseKey,{mainThreadOrigin:a,...b.current?{customFonts:await b.current}:null,dynamicFonts:t.dynamicFonts,productId:t.productId})))}}}]);