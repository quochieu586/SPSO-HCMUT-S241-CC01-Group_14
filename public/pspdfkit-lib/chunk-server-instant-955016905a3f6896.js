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
"use strict";(globalThis.webpackChunkPSPDFKit=globalThis.webpackChunkPSPDFKit||[]).push([[5534],{15124:(e,t,s)=>{s.d(t,{InstantProvider:()=>W});var i=s(67136),n=s(49568),o=s(85409),a=s(97881),r=s(82987),c=s(78236);class l extends(n.mS({clientId:"",userId:null,presenceContent:{}})){}class d extends(n.mS({status:"offline",currentClient:null,clients:(0,n.T5)()})){}var h=s(85410),u=s(38119);class m{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=null,this.tries=0}reset(){this.tries=0,this.timer&&clearTimeout(this.timer)}scheduleTimeout(){this.timer&&clearTimeout(this.timer),this.timer=setTimeout((()=>{this.tries=this.tries+1,this.callback()}),this.timerCalc(this.tries+1))}}var p=s(75675);const _="0.0.1",f=0,C=1,k=2,g={name:"PSPDFKit-Web"},b=e=>[1e3,2e3][e-1]||5e3;class y{constructor(e,t){let{reconnectTimerCalc:s=b,enableReconnect:i=!0,events:o=[]}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.eventEmitter=new u.A(["connect","disconnect","error"].concat(o)),this.serverURL=e,this.authPayload=t,this.socket=null,this.lastRequestId=0,this.requestsWaitingForAnswers=(0,n.T5)(),i&&(this.reconnectTimer=new m((()=>{this.socket&&(this.socket.close(),this.socket=null),this.connect()}),s)),this.clearAuthenticationInformation()}registerEvents(e){this.eventEmitter.events.push(...e)}connect(){if(this.socket)return;const e=new WebSocket(this.serverURL);e.onopen=this.onOpen.bind(this),e.onmessage=this.onMessage.bind(this),e.onerror=()=>{this.socket=null,this.eventEmitter.emit("error",`Failed to create the WebSocket connection to ${this.serverURL}. Please check your firewall or proxy settings.`)},this.socket=e}disconnect(){this.socket&&(this.socket.onclose=()=>{},this.socket.close(),this.clearAuthenticationInformation(),this.abortOpenRequests(),this.eventEmitter.emit("disconnect"))}get connectionState(){switch(this.socket&&this.socket.readyState){case f:return"connecting";case C:return"open";case k:return"closing";default:return"closed"}}get isAuthenticated(){return""!==this.clientId}sendRequest(e,t){return new Promise(((s,i)=>{if(!this.isAuthenticated||!this.socket)return void i(new o.uE("Cannot send request when the connection is not authenticated"));const n=this.nextRequestId(),a=JSON.stringify(t);this.requestsWaitingForAnswers=this.requestsWaitingForAnswers.set(n,{resolve:s,reject:i});this.socket.send(`${n}:${e}:${a}`)}))}on(e,t){this.eventEmitter.on(e,t)}off(e,t){this.eventEmitter.off(e,t)}onOpen(){const e=this.socket;e&&(e.onerror=this.onError.bind(this),e.onclose=this.onClose.bind(this))}onMessage(e){const t=e.data;if(this.isAuthenticated){const e=this.parseFrame(t);if(e.requestId){const t=e.requestId;(0,p.V)(this.requestsWaitingForAnswers.has(t),"Received a reply with an unknown request ID.");const s=this.requestsWaitingForAnswers.get(t);switch((0,p.V)(s),e.action){case"ok":s.resolve(e.payload);break;case"error":s.reject(new o.uE(e.payload.reason||"Unknown error"));break;default:(0,p.V)(!1,`${e.action} is not a valid request reply`)}this.requestsWaitingForAnswers=this.requestsWaitingForAnswers.delete(t)}else this.eventEmitter.events.includes(e.action)&&this.eventEmitter.emit(e.action,e.payload),this.log("incoming info message",e)}else{const e=this.parseUnauthenticatedFrame(t);switch(e.action){case"hello":this.onHello(e.payload);break;case"authenticated":this.onAuthenticated(e.payload);break;case"error":this.eventEmitter.emit("error",e.payload.reason||"Unknown error")}}}onClose(e){this.clearAuthenticationInformation(),this.abortOpenRequests(),this.reconnectTimer&&this.reconnectTimer.scheduleTimeout(),this.eventEmitter.emit("disconnect"),this.log("close",e)}onError(e){this.reconnectTimer&&this.reconnectTimer.scheduleTimeout(),this.log("error",e)}nextRequestId(){const e=this.lastRequestId+1;return this.lastRequestId=e,e}onHello(e){const t=this.socket;if(2===e.protocol_version){const e={protocol_version:2,client_version:_,client_info:g,auth_payload:this.authPayload};t.send(`hello_web:${JSON.stringify(e)}`)}else t.send(`handshake_failed:${JSON.stringify({reason:"protocol_mismatch",protocol_version:2,client_version:_,client_info:g})}`),this.eventEmitter.emit("error","protocol_mismatch")}onAuthenticated(e){(0,p.V)(e.client_id,"`authenticated` message has no `client_id`"),this.clientId=e.client_id,this.userId=e.user_id||null,this.eventEmitter.emit("connect",{clientId:this.clientId,userId:this.userId})}log(){if("development"===(0,h.uc)()){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];console.log("SYNCConnection",...t)}}parseFrame(e){const[,t,s,i]=/^(\d+|info):([a-zA-Z-_]+):(.+)$/.exec(e.toString());let n=null;"info"!==t&&(n=parseInt(t));return{requestId:n,action:s,payload:JSON.parse(i)}}parseUnauthenticatedFrame(e){const[,t,s]=/^(hello|authenticated|error):(.+)$/.exec(e.toString());return{action:t,payload:JSON.parse(s)}}abortOpenRequests(){this.requestsWaitingForAnswers.forEach((e=>{e.reject(new o.uE("request aborted"))})),this.requestsWaitingForAnswers=(0,n.T5)()}clearAuthenticationInformation(){this.clientId="",this.userId=null}}function F(e){return(0,o.V1)("string"==typeof e.client_id,"The client payload must have a `client_id`"),(0,o.V1)("object"==typeof e.presence,"The client payload must have a `presence`"),new l({clientId:e.client_id,userId:e.user_id,presenceContent:e.presence})}class w{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new d,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:y;this.state=e,this.connectionClass=t}load(e,t,s){return new Promise(((i,n)=>{this.setState=e=>{this.state=e},this.connection=new this.connectionClass(e,t,{events:["client_presence"]}),this.connection.on("connect",(e=>{const t=new l({clientId:e.clientId,userId:e.userId,presenceContent:s});this.setState(this.state.set("status","online").set("currentClient",t)),this.populateClients(s).then((()=>{i(this)})).catch(n)})),this.connection.on("error",(e=>{n(new o.uE(e.toString()))})),this.connection.on("client_presence",(e=>this.onInfoClientPresence(e))),this.connection.connect()}))}populateClients(e){return new Promise(((t,s)=>{this.connection.sendRequest("enter_layer",{presence:e}).then((e=>{this.setState(function(e,t){return(0,p.V)(t.clients,"The payload must have a `clients` list"),e.withMutations((s=>{const i=(0,n.T5)(t.clients.map((e=>F(e))).map((e=>[e.clientId,e]))).set(e.currentClient?.clientId,e.currentClient);s.set("clients",i)}))}(this.state,e)),t()})).catch(s)}))}onInfoClientPresence(e){if(this.setState(function(e,t){(0,p.V)("object"==typeof t.clients,"The payload must have `clients`");const s=e.clients.withMutations((s=>{if(t.clients.entered)for(const i of t.clients.entered){if(e.clients.has(i.client_id))throw new o.uE("The client marked as entered is already known");const t=F(i);s.set(t.clientId,t)}if(t.clients.updated)for(const i of t.clients.updated){(0,p.V)("string"==typeof i.client_id,"The client payload must have a `client_id`"),(0,p.V)("object"==typeof i.presence,"The client payload must have a `presence`");const t=e.clients.get(i.client_id);if(!t)throw new o.uE("The client marked as updated is not known");s.set(t.clientId,t.set("presenceContent",i.presence))}if(t.clients.left)for(const i of t.clients.left){if(!e.clients.has(i))throw new o.uE("The client marked as left is not known");s.delete(i)}}));return e.set("clients",s)}(this.state,e)),this.shouldFireClientUpdatesCallback){let t=(0,n.T5)();if(e.clients.entered){const s=e.clients.entered.map((e=>e.client_id));t=this.state.clients.filter((e=>-1!==s.indexOf(e.clientId))).toMap()}let s=(0,n.T5)();if(e.clients.updated){const t=e.clients.updated.map((e=>e.client_id));s=this.state.clients.filter((e=>-1!==t.indexOf(e.clientId))).toMap()}let i=(0,n.B8)();e.clients.updated&&(i=(0,n.B8)(e.clients.left)),this.clientUpdatesCallback(t,s,i)}}disconnect(){"offline"!==this.getStatus()&&(this.setState(this.state.set("status","offline")),this.connection.disconnect())}getStatus(){return this.state.status}getCurrentClient(){return this.state.currentClient}getClients(){return this.shouldFireClientUpdatesCallback=!0,this.state.clients}updatePresence(e){return new Promise(((t,s)=>{if("online"!==this.getStatus())return s(new o.uE("ClientsPresence is not connected"));this.connection.sendRequest("update_client_presence",{presence:e}).then((()=>{this.setState(function(e,t){return e.setIn(["currentClient","presenceContent"],t).setIn(["clients",e.currentClient?.clientId,"presenceContent"],t)}(this.state,e)),t(!0)}),(()=>{s(new o.uE("Unable to update presence"))}))}))}onClientUpdates(e){if("function"!=typeof e)throw new TypeError("callback must be a function");this.clientUpdatesCallback=e}}var I=s(6807);class v extends(n.mS({content:null,attachments:null,id:null,type:null,isAnonymous:void 0,group:void 0,resolve:()=>{},reject:()=>{}})){}var R=s(33728);class A extends(n.mS({requestInfo:null,status:"offline",currentClient:null,localRecordsContents:(0,n.uY)(),localRecordsChanges:(0,n.B8)(),stagedRecordsChanges:(0,n.B8)(),localRecordsRev:0,requiredAttachmentIds:(0,n.NZ)(),clients:(0,n.T5)()})){}var V=s(84192);class x{getRecords(){return this._shouldFireRecordsUpdateCallback=!0,this._state.localRecordsContents.map(((e,t)=>{const{content:s,permissions:i,group:n,isAnonymous:o}=e;return{content:s,permissions:i,group:n,id:t,isAnonymous:o}})).toList()}createRecord(e,t,s,i,n){return new Promise(((o,a)=>{const r=new v({id:e,content:t,attachments:s,group:i,type:"created",isAnonymous:n,resolve:o,reject:a});this.enqueueChangeRequest(r)}))}updateRecord(e,t,s,i){return new Promise(((n,a)=>{if(!this.isKnownRecordId(e))return a(new o.uE(`Record with ID: ${e} not found.`));const r=new v({id:e,content:t,group:s,type:"updated",isAnonymous:i,resolve:n,reject:a});this.enqueueChangeRequest(r)}))}deleteRecord(e){return new Promise(((t,s)=>{if(!this.isKnownRecordId(e))return s(new o.uE(`Record with ID: ${e} not found.`));const i=new v({id:e,type:"deleted",resolve:t,reject:s});this.enqueueChangeRequest(i)}))}onRecordsUpdates(e,t){if("function"!=typeof e)throw new TypeError("recordsUpdateCallback must be a function");if("function"!=typeof t)throw new TypeError("acceptedRecordsCallback must be a function");this._recordsUpdatesCallback=e,this._acceptedRecordsResponseCallback=t}destroy(){this._cycle&&this._cycle.destroy()}constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new A,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:R.Ay;(0,i.A)(this,"_recordsUpdatesCallback",(()=>{})),(0,i.A)(this,"_acceptedRecordsResponseCallback",(()=>{})),(0,i.A)(this,"_shouldFireRecordsUpdateCallback",!1),(0,i.A)(this,"onChanges",(e=>{if(this._shouldFireRecordsUpdateCallback){const{created:t,updated:s,deleted:i}=e;this._recordsUpdatesCallback((0,n.B8)(t),(0,n.B8)(s),(0,n.B8)(i))}})),(0,i.A)(this,"onAcceptedRecords",(e=>{if(this._shouldFireRecordsUpdateCallback){const{created:t,updated:s,deleted:i}=e;this._acceptedRecordsResponseCallback((0,n.B8)(t),(0,n.B8)(s),(0,n.B8)(i))}})),(0,i.A)(this,"setOnDocumentHandleConflictCallback",(e=>{if("function"!=typeof e)throw new TypeError("callback must be a function");this._cycle.setOnDocumentHandleConflictCallback(e)})),(0,i.A)(this,"syncChanges",(0,V.A)((()=>this._cycle.nextCycle()))),this._state=e,this._CycleClass=t}load(e,t){let s=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return new Promise(((i,n)=>{const o=this.setState.bind(this);this.setState(this._state.set("requestInfo",{serverURL:e,authPayload:t})),this._cycle=new this._CycleClass({getState:()=>this._state,setState:o,onChanges:this.onChanges,onAcceptedRecords:this.onAcceptedRecords,longPollingTimeout:s?R.jL:0}),this._cycle.nextCycle(0).then((()=>{i(this)})).catch(n)}))}setState(e){this._state=e}enqueueChangeRequest(e){const t=(0,I.e)({oldChanges:this._state.localRecordsChanges,newChanges:(0,n.B8)([e])});this.setState(this._state.set("localRecordsChanges",t))}isKnownRecordId(e){function t(t){return"created"===t.type&&t.id===e}const s=this._state.localRecordsContents.has(e),i=!!this._state.localRecordsChanges.find(t),n=!!this._state.stagedRecordsChanges.find(t);return s||i||n}}var S=s(4824),E=s(60156);function T(e,t){const s=e.get("annotations"),i=e.get("formFields"),n=e.get("comments"),o=e.get("formattedFormFieldValues");let a;return t.id.startsWith("form-field-value/")&&(a=t.id.split("/")[1]),s.get(t.id)||i.find((e=>e.id===t.id))||n.get(t.id)||(a?o.get(a):void 0)}function B(e,t){return Boolean(T(e,t))}var q=s(22372),P=s(90310),U=s(84445),O=s(78531),z=s(89055),N=s(36899),$=s(76117),D=s(45374);class W{constructor(e,t,s){let o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:S.S;(0,i.A)(this,"_existingBookmarksIds",(0,n.NZ)()),(0,i.A)(this,"_existingFormFieldsIds",(0,n.NZ)()),(0,i.A)(this,"_existingFormFieldValuesIds",(0,n.NZ)()),(0,i.A)(this,"_existingCommentIds",(0,n.NZ)()),(0,i.A)(this,"_documentHandleConflictCallback",(()=>{})),(0,i.A)(this,"canCreateBackendOrphanWidgets",!0),(0,i.A)(this,"setDocumentHandleConflictCallback",(e=>{this._documentHandleConflictCallback=e})),(0,i.A)(this,"setDocumentHandleOutdated",(e=>{this._setDocumentHandleOutdatedCallback=e})),(0,i.A)(this,"onDocumentHandleConflict",(()=>{this._documentHandleConflictCallback&&this._documentHandleConflictCallback(),this._setDocumentHandleOutdatedCallback&&this._setDocumentHandleOutdatedCallback(!0)})),this._serverURL=e,this._documentURL=t,this._authPayload=s,this._settings=o,this._hasLoadedInitialRecords=!1,this._setReadStateCallbacksPromise=new Promise((e=>{this._setReadStateCallbacksPromiseResolve=e}))}load(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:w;const s=[];return this._sync=new e,s.push(this._sync.load(`${this._documentURL}/sync`,this._authPayload,this._settings.listenToServerChangesEnabled).catch(o.z3)),this._sync.setOnDocumentHandleConflictCallback(this.onDocumentHandleConflict),this._settings.clientsPresenceEnabled&&(this._clients=new t,s.push(this._clients.load(`${this._serverURL.replace(/^http/i,"ws")}/websocket`,this._authPayload,{}).then((()=>{const e=this._clients;null!=e&&(e.onClientUpdates((()=>this._onClientsChange(e.getClients()))),this._onClientsChange(e.getClients()))})).catch((e=>{(0,o.R8)("PSPDFKit: An error occurred while initializing the connected clients module. This might be due to a lack of support for WebSockets or a related failure.\n\nFailure details:\n\n"+e.message)})))),Promise.all(s).then((()=>this)).catch((e=>{throw new o.uE(`Initialization of PSPDFKit Instant failed:\n${e.message}`)}))}destroy(){this._sync&&this._sync.destroy()}setFormsEnabledInConfig(e){this._formsEnabledInConfig=e}setReadStateCallbacks(e){this._readStateCallbacks=e,this._setReadStateCallbacksPromiseResolve?.()}setAnnotationCallbacks(e){this._annotationCallbacks=e}setBookmarkCallbacks(e){this._bookmarkCallbacks=e}setFormFieldCallbacks(e){this._formFieldCallbacks=e}setFormFieldValueCallbacks(e){this._formFieldValueCallbacks=e}setCommentCallbacks(e){this._commentCallbacks=e}createAnnotation(e,t){const{id:s,...i}=(0,a.eq)(e),{group:n,permissions:r,...c}=i;return(0,o.V1)(s,"Annotation id must be defined."),this._sync.createRecord(s,c,(0,a.L)(t),n)}createComment(e){const{id:t,...s}=(0,D.z)(e,e.rootId),{group:i,permissions:n,isAnonymous:a,...r}=s;return(0,o.V1)(t,"Comment id must be defined."),this._existingCommentIds=this._existingCommentIds.add(t),this._sync.createRecord(t,r,{},i,!!a)}async updateComment(e){try{await this.updateRecord((0,D.z)(e,e.rootId))}catch(e){if(!(e instanceof o.uE))throw e}}deleteComment(e){return this._existingCommentIds=this._existingCommentIds.delete(e),this._sync.deleteRecord(e).then((()=>{}))}setStateGetter(e){this._getState=e}async updateRecord(e){const{id:t,permissions:s,isAnonymous:i,group:n,...a}="pspdfkit/comment"===e.type||"pspdfkit/comment-marker"===e.type?e:{...e,isAnonymous:void 0};return(0,o.V1)(t,"Record id must be defined."),this._getState?.()?.backend?.isCollaborationPermissionsEnabled()?((0,o.V1)(s,"Permissions must be defined."),this._sync.updateRecord(t,s.edit?a:void 0,s.setGroup?n??void 0:void 0,i??void 0)):this._sync.updateRecord(t,a,n??void 0,i??void 0)}async updateAnnotation(e){try{await this.updateRecord((0,a.eq)(e))}catch(e){if(!(e instanceof o.uE))throw e}}deleteAnnotation(e){return this._sync.deleteRecord(e.id).then((()=>{}))}createBookmark(e){const{id:t,...s}=(0,r.U)(e);return this._existingBookmarksIds=this._existingBookmarksIds.add(t),this._sync.createRecord(t,s,{})}async updateBookmark(e){const{id:t,...s}=(0,r.U)(e);try{await this._sync.updateRecord(t,s)}catch(e){if(!(e instanceof o.uE))throw e}}deleteBookmark(e){return this._sync.deleteRecord(e).then((()=>{this._existingBookmarksIds=this._existingBookmarksIds.delete(e)}))}createFormField(e){const{group:t,permissions:s,id:i,...n}=(0,a.T7)(e);return this._existingFormFieldsIds=this._existingFormFieldsIds.add(i),this._sync.createRecord(i,n,{},t)}async updateFormField(e){try{await this.updateRecord((0,a.T7)(e))}catch(e){if(!(e instanceof o.uE))throw e}}deleteFormField(e){return this._sync.deleteRecord(e.id).then((()=>{this._existingFormFieldsIds=this._existingFormFieldsIds.delete(e.id)}))}loadFormFields(){return this.loadAnnotationsForPageIndex()}createFormFieldValue(e){const t=(0,a.cA)(e),s=(0,E.B)(e);return this._existingFormFieldValuesIds=this._existingFormFieldValuesIds.add(s),this._sync.createRecord(s,t,{})}async setFormFieldValue(e){const t=(0,a.cA)(e);try{await this._sync.updateRecord((0,E.B)(e),t)}catch(e){if(!(e instanceof o.uE))throw e}}deleteFormFieldValue(e){return this._sync.deleteRecord(e).then((()=>{this._existingFormFieldValuesIds=this._existingFormFieldValuesIds.delete(e)}))}loadAnnotationsForPageIndex(){return this._loadPromise||(this._loadPromise=new Promise((e=>setTimeout(e,0))).then((()=>{this._hasLoadedInitialRecords||(this._sync.onRecordsUpdates(((e,t,s)=>this._onRecordsUpdates(e,t,s,c.N)),((e,t,s)=>this._onAcceptedRecords(e,t,s))),this._onRecordsUpdates(this._sync.getRecords(),(0,n.B8)(),(0,n.B8)(),c.n),this._hasLoadedInitialRecords=!0)}))),this._loadPromise}async loadBookmarks(){}syncChanges(){return this._sync.syncChanges()}_filterRecords(e){return e.filter((e=>{let{content:t}=e;return this._formsEnabledInConfig||!(0,a.cy)(t)}))}_onRecordsUpdates(e,t,s,i){let c=(0,n.B8)();const l=[];let d=(0,n.B8)(),h=(0,n.B8)(),u=(0,n.NZ)(),m=(0,n.NZ)(),p=(0,n.NZ)(),_=(0,n.NZ)(),f=(0,n.NZ)();const C=this._getState?this._getState():void 0;let k=e,g=t,b=s;if(C&&C.backend&&C.backend.isCollaborationPermissionsEnabled()){k=k.filter((e=>{let{content:t}=e;return!!t}));const e=[];t.forEach(((t,s)=>{t.content?B(C,t)||(k=k.push(t),e.push(s)):B(C,t)?(b=b.push(t.id),e.push(s)):e.push(s)})),g=g.filter(((t,s)=>!e.includes(s))),b=b.filter((e=>C.annotations.has(e)||this._existingFormFieldValuesIds.has(e)||this._existingFormFieldsIds.has(e)||this._existingCommentIds.has(e)||this._existingBookmarksIds.has(e)))}let y=(0,n.B8)().withMutations((e=>{this._filterRecords(k).forEach((t=>{let{id:s,content:i,permissions:n,group:u,isAnonymous:m}=t;const p={permissions:n,group:u,isAnonymous:m};try{(0,a.cy)(i)?(l.push((0,a.mh)(s,i,p)),this._existingFormFieldsIds=this._existingFormFieldsIds.add(s)):(0,a.UR)(i)?(d=d.push((0,a.R5)(i)),this._existingFormFieldValuesIds=this._existingFormFieldValuesIds.add(s)):(0,a.fW)(i)?(c=c.push((0,r.r)(s,i)),this._existingBookmarksIds=this._existingBookmarksIds.add(s)):(0,a.Eh)(i)?(this._existingCommentIds=this._existingCommentIds.add(s),h=h.push((0,D._)(s,i,p))):(0,a.Tg)(i)||(0,a.LK)(i)||e.push((0,a.h8)(s,i,p))}catch(e){(0,o.pq)(`Skipped creating record #${s} from payload because an error occurred while deserializing.`,i),(0,o.pq)(e)}}))}));const F=!C||(0,z.cY)(C.features,C.signatureFeatureAvailability);l.length>0&&((0,o.V1)(this._formFieldCallbacks),C&&!F?this._formFieldCallbacks.createFormFields((0,n.B8)(l.filter((e=>!(e instanceof N.Vw)))),i):this._formFieldCallbacks.createFormFields((0,n.B8)(l),i)),y.size>0&&((0,o.V1)(this._annotationCallbacks),C&&!F&&(y=y.filter((e=>{if(!(e instanceof $.sb))return e;const t=l.find((t=>t.name===e.formFieldName))||C.formFields.get(e.formFieldName);return!(t&&t instanceof N.Vw)}))),this._annotationCallbacks.createAnnotations(y,(0,n.T5)(),i)),d.size>0&&((0,o.V1)(this._formFieldValueCallbacks),C&&!F&&(d=d.filter((e=>{const t=l.find((t=>t.name===e.name))||C.formFields.get(e.formFieldName);return!(t&&t instanceof N.Vw)}))),this._formFieldValueCallbacks.createFormFieldValues((0,n.B8)(d),i)),h.size>0&&((0,o.V1)(this._commentCallbacks),this._commentCallbacks.createComments(h,i)),c.size>0&&((0,o.V1)(this._bookmarkCallbacks),this._bookmarkCallbacks.createBookmarks(c,i));const w=(0,n.B8)().asMutable(),I=[],v=[],R=[],A=(0,n.B8)().withMutations((e=>{this._filterRecords(g).forEach((t=>{let{id:s,content:i,group:n,permissions:c,isAnonymous:l}=t;const d={permissions:c,group:n,isAnonymous:l};try{if((0,a.cy)(i))try{I.push((0,a.mh)(s,i,d))}catch(e){p=p.add(s),(0,o.pq)(`Skipped updating form field #${s} from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state.`,i),(0,o.pq)(e)}else if((0,a.UR)(i))try{v.push((0,a.R5)(i))}catch(e){_=_.add(s),(0,o.pq)(`Skipped updating form field value #${s} from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state.`,i),(0,o.pq)(e)}else if((0,a.fW)(i))try{w.push((0,r.r)(s,i))}catch(e){m=m.add(s),(0,o.pq)(`Skipped updating bookmark #${s} from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state.`,i),(0,o.pq)(e)}else if((0,a.Eh)(i))try{R.push((0,D._)(s,i,d))}catch(e){f=f.add(s),(0,o.pq)(`Skipped updating comment #${s} from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state.`,i,e)}else e.push((0,a.h8)(s,i,d))}catch(e){u=u.add(s),(0,o.pq)(`Skipped updating annotation #${s} from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state.`,i),(0,o.pq)(e)}}))}));A.size>0&&((0,o.V1)(this._annotationCallbacks),this._annotationCallbacks.updateAnnotations(A)),w.size>0&&((0,o.V1)(this._bookmarkCallbacks),this._bookmarkCallbacks.updateBookmarks(w)),I.length>0&&((0,o.V1)(this._formFieldCallbacks),this._formFieldCallbacks.updateFormFields((0,n.B8)(I))),v.length>0&&((0,o.V1)(this._formFieldValueCallbacks),this._formFieldValueCallbacks.setFormFieldValues((0,n.B8)(v))),R.length>0&&((0,o.V1)(this._commentCallbacks),this._commentCallbacks.updateComments((0,n.B8)(R))),u=u.concat(b.filter((e=>!(this._existingBookmarksIds.has(e)||this._existingFormFieldsIds.has(e)||this._existingFormFieldValuesIds.has(e)||this._existingCommentIds.has(e)))).toSet()),u.size>0&&((0,o.V1)(this._annotationCallbacks),this._annotationCallbacks.deleteAnnotations(u)),m=m.concat(b.filter((e=>{const t=this._existingBookmarksIds.has(e);return t&&(this._existingBookmarksIds=this._existingBookmarksIds.delete(e)),t})).toSet()),m.size>0&&((0,o.V1)(this._bookmarkCallbacks),this._bookmarkCallbacks.deleteBookmarks(m)),p=p.concat(b.filter((e=>{const t=this._existingFormFieldsIds.has(e);return t&&(this._existingFormFieldsIds=this._existingFormFieldsIds.delete(e)),t})).toSet()),p.size>0&&((0,o.V1)(this._formFieldCallbacks),this._formFieldCallbacks.deleteFormFields(p)),_=_.concat(b.filter((e=>{const t=this._existingFormFieldValuesIds.has(e);return t&&(this._existingFormFieldValuesIds=this._existingFormFieldValuesIds.delete(e)),t})).toSet()),_.size>0&&((0,o.V1)(this._formFieldValueCallbacks),this._formFieldValueCallbacks.deleteFormFieldValues(_)),f=f.concat(b.filter((e=>{const t=this._existingCommentIds.has(e);return t&&(this._existingCommentIds=this._existingCommentIds.delete(e)),t})).toSet()),f.size>0&&((0,o.V1)(this._commentCallbacks),this._commentCallbacks.deleteComments(f))}_onAcceptedRecords(e,t){const s=this._getState?this._getState():void 0;if(!s||!s.backend||!s.backend.isCollaborationPermissionsEnabled())return;const i=[],a=[],r=[],c=[],l=[],d=[];function h(e){const t={permissions:e.permissions,group:e.group};let n=T(s,e);if(n&&"string"!=typeof n){(0,O.Tr)(t);const e=(0,O.ah)(t);n=n.merge(e),n instanceof q.A?t.permissions&&t.permissions.view?i.push(n):c.push(n.id):n instanceof P.Ay?t.permissions&&t.permissions.view?a.push(n):((0,o.V1)(n.id),l.push(n.id)):n instanceof U.Ay&&(t.permissions&&t.permissions.view?r.push(n):d.push(n.id))}}e.isEmpty()||e.forEach(h),t.isEmpty()||t.forEach(h),i.length>0&&((0,o.V1)(this._annotationCallbacks),this._annotationCallbacks.updateAnnotations((0,n.B8)(i),!0)),a.length>0&&((0,o.V1)(this._commentCallbacks),this._commentCallbacks.updateComments((0,n.B8)(a))),r.length>0&&((0,o.V1)(this._formFieldCallbacks),this._formFieldCallbacks.updateFormFields((0,n.B8)(r))),c.length>0&&((0,o.V1)(this._annotationCallbacks),this._annotationCallbacks.deleteAnnotations((0,n.NZ)(c),!0)),l.length>0&&((0,o.V1)(this._commentCallbacks),this._commentCallbacks.deleteComments((0,n.NZ)(l))),d.length>0&&((0,o.V1)(this._formFieldCallbacks),this._formFieldCallbacks.deleteFormFields((0,n.NZ)(d)))}onClientsChange(e){if("function"!=typeof e)throw new TypeError("Callback must be a function");this.onClientsChangeCallback=e}_onClientsChange(e){this.onClientsChangeCallback.call(null,e)}async updateTabOrder(){throw new o.uE("setTabOrder is not supported on this backend.")}async setTabOrder(){throw new o.uE("setTabOrder is not supported on this backend.")}}}}]);