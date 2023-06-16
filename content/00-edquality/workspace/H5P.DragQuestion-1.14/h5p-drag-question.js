(()=>{"use strict";const e=function(e){const t=e.length;return function n(){const o=Array.prototype.slice.call(arguments,0);return o.length>=t?e.apply(null,o):function(){const e=Array.prototype.slice.call(arguments,0);return n.apply(null,o.concat(e))}}},t=(...e)=>e.reduce(((e,t)=>(...n)=>e(t(...n)))),n=e((function(e,t){t.forEach(e)})),o=(e((function(e,t){return t.map(e)})),e((function(e,t){return t.filter(e)}))),i=e((function(e,t){return t.some(e)})),r=e((function(e,t){return-1!=t.indexOf(e)})),s=e((function(e,t){return o((t=>!r(t,e)),t)})),a=e(((e,t)=>t.getAttribute(e))),l=e(((e,t,n)=>n.setAttribute(e,t))),c=e(((e,t)=>t.removeAttribute(e))),h=e(((e,t)=>t.hasAttribute(e))),d=e(((e,t,n)=>n.getAttribute(e)===t)),p=(e(((e,t)=>{const n=a(e,t);l(e,("true"!==n).toString(),t)})),e(((e,t)=>e.appendChild(t))),e(((e,t)=>t.querySelector(e))),e(((e,t)=>{return n=t.querySelectorAll(e),Array.prototype.slice.call(n);var n})),e(((e,t)=>e.removeChild(t))),e(((e,t)=>t.classList.contains(e))),e(((e,t)=>t.classList.add(e)))),u=e(((e,t)=>t.classList.remove(e))),g=p("hidden"),f=u("hidden"),b=(e(((e,t)=>(e?f:g)(t))),e(((e,t,n)=>{n.classList[t?"add":"remove"](e)})),c("tabindex")),v=(n(b),l("tabindex","0")),m=l("tabindex","-1"),y=h("tabindex");class w{constructor(e){Object.assign(this,{listeners:{},on:function(e,t,n){const o={listener:t,scope:n};return this.listeners[e]=this.listeners[e]||[],this.listeners[e].push(o),this},fire:function(e,t){return(this.listeners[e]||[]).every((function(e){return!1!==e.listener.call(e.scope||this,t)}))},propagate:function(e,t){let n=this;e.forEach((e=>t.on(e,(t=>n.fire(e,t)))))}}),this.plugins=e||[],this.elements=[],this.negativeTabIndexAllowed=!1,this.on("nextElement",this.nextElement,this),this.on("previousElement",this.previousElement,this),this.on("firstElement",this.firstElement,this),this.on("lastElement",this.lastElement,this),this.initPlugins()}addElement(e){this.elements.push(e),this.firesEvent("addElement",e),1===this.elements.length&&this.setTabbable(e)}insertElementAt(e,t){this.elements.splice(t,0,e),this.firesEvent("addElement",e),1===this.elements.length&&this.setTabbable(e)}removeElement(e){this.elements=s([e],this.elements),y(e)&&(this.setUntabbable(e),this.elements[0]&&this.setTabbable(this.elements[0])),this.firesEvent("removeElement",e)}count(){return this.elements.length}firesEvent(e,t){const n=this.elements.indexOf(t);return this.fire(e,{element:t,index:n,elements:this.elements,oldElement:this.tabbableElement})}nextElement({index:e}){const t=e===this.elements.length-1,n=this.elements[t?0:e+1];this.setTabbable(n),n.focus()}firstElement(){const e=this.elements[0];this.setTabbable(e),e.focus()}lastElement(){const e=this.elements[this.elements.length-1];this.setTabbable(e),e.focus()}setTabbableByIndex(e){const t=this.elements[e];t&&this.setTabbable(t)}setTabbable(e){n(this.setUntabbable.bind(this),this.elements),v(e),this.tabbableElement=e}setUntabbable(e){e!==document.activeElement&&(this.negativeTabIndexAllowed?m(e):b(e))}previousElement({index:e}){const t=0===e,n=this.elements[t?this.elements.length-1:e-1];this.setTabbable(n),n.focus()}useNegativeTabIndex(){this.negativeTabIndexAllowed=!0,this.elements.forEach((e=>{e.hasAttribute("tabindex")||m(e)}))}initPlugins(){this.plugins.forEach((function(e){void 0!==e.init&&e.init(this)}),this)}}const E="aria-grabbed",k=l(E),x=d(E,"true"),P=o(h(E)),Z=t(n(l(E,"false")),P),$=t(i(x),P);class O{init(e){this.controls=e,this.controls.on("select",this.select,this)}addElement(e){k("false",e),this.controls.addElement(e)}setAllGrabbedToFalse(){Z(this.controls.elements)}hasAnyGrabbed(){return $(this.controls.elements)}select({element:e}){const t=x(e);this.setAllGrabbedToFalse(),t||k("true",e)}}const T="aria-dropeffect",A=l(T,"none"),D=l(T,"move"),S=o(h(T)),C=t(n(D),S),I=t(n(A),S);class B{init(e){this.controls=e}setAllToMove(){C(this.controls.elements)}setAllToNone(){I(this.controls.elements)}}B.DropEffect={COPY:"copy",MOVE:"move",EXECUTE:"execute",POPUP:"popup",NONE:"none"};class z{constructor(){this.selectability=!0}init(e){this.boundHandleKeyDown=this.handleKeyDown.bind(this),this.controls=e,this.controls.on("addElement",this.listenForKeyDown,this),this.controls.on("removeElement",this.removeKeyDownListener,this)}listenForKeyDown({element:e}){e.addEventListener("keydown",this.boundHandleKeyDown)}removeKeyDownListener({element:e}){e.removeEventListener("keydown",this.boundHandleKeyDown)}handleKeyDown(e){switch(e.which){case 27:this.close(e.target),e.preventDefault(),e.stopPropagation();break;case 35:this.lastElement(e.target),e.preventDefault(),e.stopPropagation();break;case 36:this.firstElement(e.target),e.preventDefault(),e.stopPropagation();break;case 13:case 32:this.select(e.target),e.preventDefault(),e.stopPropagation();break;case 37:case 38:this.hasChromevoxModifiers(e)||(this.previousElement(e.target),e.preventDefault(),e.stopPropagation());break;case 39:case 40:this.hasChromevoxModifiers(e)||(this.nextElement(e.target),e.preventDefault(),e.stopPropagation())}}hasChromevoxModifiers(e){return e.shiftKey||e.ctrlKey}previousElement(e){!1!==this.controls.firesEvent("beforePreviousElement",e)&&(this.controls.firesEvent("previousElement",e),this.controls.firesEvent("afterPreviousElement",e))}nextElement(e){!1!==this.controls.firesEvent("beforeNextElement",e)&&(this.controls.firesEvent("nextElement",e),this.controls.firesEvent("afterNextElement",e))}select(e){this.selectability&&!1!==this.controls.firesEvent("before-select",e)&&(this.controls.firesEvent("select",e),this.controls.firesEvent("after-select",e))}firstElement(e){!1!==this.controls.firesEvent("beforeFirstElement",e)&&(this.controls.firesEvent("firstElement",e),this.controls.firesEvent("afterFirstElement",e))}lastElement(e){!1!==this.controls.firesEvent("beforeLastElement",e)&&(this.controls.firesEvent("lastElement",e),this.controls.firesEvent("afterLastElement",e))}disableSelectability(){this.selectability=!1}enableSelectability(){this.selectability=!0}close(e){!1!==this.controls.firesEvent("before-close",e)&&(this.controls.firesEvent("close",e),this.controls.firesEvent("after-close",e))}}class q{constructor(){this.selectability=!0,this.handleClickBound=this.handleClick.bind(this),this.handleDragBound=this.handleDrag.bind(this)}init(e){this.controls=e,this.controls.on("addElement",this.listenForKeyDown,this),this.controls.on("removeElement",this.unlistenForKeyDown,this)}listenForKeyDown({element:e}){e.addEventListener("click",this.handleClickBound),e.addEventListener("drag",this.handleClickBound)}unlistenForKeyDown({element:e}){e.removeEventListener("click",this.handleClickBound),e.removeEventListener("drag",this.handleDragBound)}handleClick(e){this.controls.firesEvent("select",e.currentTarget)}handleDrag(e){this.controls.firesEvent("drag",e.currentTarget)}disableSelectability(){this.selectability=!1}enableSelectability(){this.selectability=!0}}function H(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var F=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n;return t=e,n=[{key:"setElementOpacity",value:function(t,n){e.setOpacity(t,"borderColor",n),e.setOpacity(t,"boxShadow",n),e.setOpacity(t,"background",n)}},{key:"setOpacity",value:function(t,n,o){if("background"===n)return e.setOpacity(t,"backgroundColor",o),void e.setOpacity(t,"backgroundImage",o);function i(e,t){if("borderColor"===e)return{borderTopColor:t,borderRightColor:t,borderBottomColor:t,borderLeftColor:t};var n={};return n[e]=t,n}o=void 0===o?1:o/100;var r=t.css(n),s=i(n,"");for(var a in t.css(s),s)break;var l=t.css(a);""!==l&&"none"!==l||(l=r),l=e.setAlphas(l,"rgba(",o),l=e.setAlphas(l,"rgb(",o),t.css(i(n,l))}},{key:"setAlphas",value:function(e,t,n){if(e){for(var o=e.indexOf(t);-1!==o;){var i=e.indexOf(")",o),r=e.substring(o+t.length,i).split(",");r[3]=void 0!==r[3]?parseFloat(r[3])*n:n,o=(e=e.substring(0,o)+"rgba("+r.join(",")+e.substring(i,e.length)).indexOf(t,i)}return e}}},{key:"elementToDraggable",value:function(e,t){for(var n=0;n<e.length;n++)if(e[n]){var o=e[n].findElement(t);if(o)return o.draggable=e[n],o}}},{key:"elementToDropZone",value:function(e,t){for(var n=0;n<e.length;n++)if(e[n].$dropZone.is(t))return e[n]}},{key:"positionToPercentage",value:function(e,t){return{top:100*parseInt(t.css("top"))/e.innerHeight()+"%",left:100*parseInt(t.css("left"))/e.innerWidth()+"%"}}},{key:"addHover",value:function(t,n){t.hover((function(){t.addClass("h5p-draggable-hover"),t.parent().hasClass("h5p-dragging")||e.setElementOpacity(t,n)}),(function(){t.parent().hasClass("h5p-dragging")||setTimeout((function(){t.removeClass("h5p-draggable-hover"),e.setElementOpacity(t,n)}),1)})),e.setElementOpacity(t,n)}},{key:"strip",value:function(e){var t=document.createElement("div");return t.innerHTML=e,t.textContent||t.innerText||""}}],null&&H(t.prototype,null),n&&H(t,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function R(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var L=H5P.jQuery,j=function(){function e(t,n,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var i=this;H5P.EventDispatcher.call(i),i.id=n,i.showLabel=t.showLabel,i.label=t.label,i.x=t.x,i.y=t.y,i.width=t.width,i.height=t.height,i.backgroundOpacity=t.backgroundOpacity,i.tip=t.tipsAndFeedback.tip||"",i.single=t.single,i.autoAlignable=t.autoAlign,i.alignables=[],i.l10n=o}var t,n;return t=e,(n=[{key:"appendTo",value:function(e,t){var n=this,o='<div class="h5p-inner"></div>',i="";n.showLabel&&(o='<div class="h5p-label">'+n.label+'<span class="h5p-hidden-read"></span></div>'+o,i=" h5p-has-label"),o='<span class="h5p-hidden-read">'+n.l10n.prefix.replace("{num}",n.id+1)+"</span>"+o,n.$dropZone=L("<div/>",{class:"h5p-dropzone"+i,tabindex:"-1",title:n.showLabel?L("<div/>",{html:n.label}).text():null,role:"button","aria-disabled":!0,css:{left:n.x+"%",top:n.y+"%",width:n.width+"em",height:n.height+"em"},html:o}).appendTo(e).children(".h5p-inner").droppable({activeClass:"h5p-active",tolerance:"intersect",accept:function(e){var o=F.elementToDraggable(t,e);return!!o&&n.accepts(o.draggable,t)},drop:function(e,t){var o=L(this);F.setOpacity(o.removeClass("h5p-over"),"background",n.backgroundOpacity),t.draggable.data("addToZone",n.id),-1===n.getIndexOf(t.draggable)&&n.alignables.push(t.draggable),n.autoAlignable.enabled&&n.autoAlign()},over:function(){F.setOpacity(L(this).addClass("h5p-over"),"background",n.backgroundOpacity)},out:function(){F.setOpacity(L(this).removeClass("h5p-over"),"background",n.backgroundOpacity)}}).end().focus((function(){r instanceof H5P.jQuery&&r.attr("tabindex","0")})).blur((function(){r instanceof H5P.jQuery&&r.attr("tabindex","-1")}));var r=H5P.JoubelUI.createTip(n.tip,{tipLabel:n.l10n.tipLabel,tabcontrol:!0});r instanceof H5P.jQuery&&L("<span/>",{class:"h5p-dq-tipwrap","aria-label":n.l10n.tipAvailable,append:r,appendTo:n.$dropZone}),t.forEach((function(e){var t=e.element.$;e.isInDropZone(n.id)&&-1===n.getIndexOf(t)&&n.alignables.push(t)})),n.autoAlignable.enabled&&n.autoAlign(),setTimeout((function(){n.updateBackgroundOpacity()}),0)}},{key:"updateBackgroundOpacity",value:function(){F.setOpacity(this.$dropZone.children(".h5p-label"),"background",this.backgroundOpacity),F.setOpacity(this.$dropZone.children(".h5p-inner"),"background",this.backgroundOpacity)}},{key:"accepts",value:function(e,t){var n=this;if(!e.hasDropZone(n.id))return!1;if(n.single)for(var o=0;o<t.length;o++)if(t[o]&&t[o].isInDropZone(n.id))return!1;return!0}},{key:"getIndexOf",value:function(e){for(var t=0;t<this.alignables.length;t++)if(this.alignables[t][0]===e[0])return t;return-1}},{key:"removeAlignable",value:function(e){var t=this,n=t.getIndexOf(e);-1!==n&&(t.alignables.splice(n,1),void 0===t.autoAlignTimer&&t.autoAlignable.enabled&&(t.autoAlignTimer=setTimeout((function(){delete t.autoAlignTimer,t.autoAlign()}),1)))}},{key:"autoAlign",value:function(){for(var e,t,n=this,o=n.$dropZone.parent()[0].getBoundingClientRect(),i=n.autoAlignable.spacing/n.autoAlignable.size.width*100,r=n.autoAlignable.spacing/n.autoAlignable.size.height*100,s={x:n.x+i,y:n.y+r},a=n.$dropZone[0].getBoundingClientRect(),l={x:a.width-2*i,y:a.height-2*r},c={x:l.x,y:l.y},h=0,d=function(){e.css({left:s.x+"%",top:s.y+"%"}),n.trigger("elementaligned",e);var i=t.width+n.autoAlignable.spacing;c.x-=i,s.x+=i/o.width*100;var r=t.height+n.autoAlignable.spacing;r>h&&(h=r)},p=0;p<n.alignables.length;p++)if(e=n.alignables[p],t=e[0].getBoundingClientRect(),c.x>=t.width)d();else{if(c.x=l.x,s.x=n.x+i,h&&(c.y-=h,s.y+=h/o.height*100,h=0),c.y<=0)return;d()}}},{key:"highlight",value:function(){this.$dropZone.attr("aria-disabled","false").children(".h5p-inner").addClass("h5p-active")}},{key:"dehighlight",value:function(){this.$dropZone.attr("aria-disabled","true").children(".h5p-inner").removeClass("h5p-active")}},{key:"reset",value:function(){this.alignables=[]}}])&&R(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function Q(e){return Q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Q(e)}function K(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function X(e,t){return X=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},X(e,t)}function M(e,t){if(t&&("object"===Q(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return U(e)}function U(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function N(e){return N=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},N(e)}var _=H5P.jQuery,G=function(e){return e.stopPropagation()},W=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&X(e,t)}(s,H5P.EventDispatcher);var t,n,o,i,r=(o=s,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=N(o);if(i){var n=N(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return M(this,e)});function s(e,t,n,o,i){var a;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s);var l=U(a=r.call(this));if(l.$=_(l),l.id=t,l.elements=[],l.x=e.x,l.y=e.y,l.width=e.width,l.height=e.height,l.backgroundOpacity=e.backgroundOpacity,l.dropZones=e.dropZones,l.type=e.type,l.multiple=e.multiple,l.l10n=o,l.allDropzones=i,n){l.multiple&&l.elements.push({});for(var c=0;c<n.length;c++)l.elements.push({dropZone:n[c].dz,position:{left:n[c].x+"%",top:n[c].y+"%"}})}return a}return t=s,(n=[{key:"appendTo",value:function(e,t){var n=this;if(n.elements.length)for(var o=0;o<n.elements.length;o++)n.attachElement(o,e,t);else n.attachElement(null,e,t)}},{key:"attachElement",value:function(e,t,n){var o,i=this;null===e?(o={},i.elements.push(o),e=i.elements.length-1):o=i.elements[e],_.extend(o,{clone:function(){i.attachElement(null,t,n)},reset:function(){void 0!==o.dropZone&&(i.trigger("leavingDropZone",o),delete o.dropZone),i.multiple&&(o.$.remove(),delete i.elements[e],i.trigger("elementremove",o.$[0])),delete o.position}}),o.$=_("<div/>",{class:"h5p-draggable",tabindex:"-1",role:"button",css:{left:i.x+"%",top:i.y+"%",width:i.width+"em",height:i.height+"em"},appendTo:t,title:i.type.params.title}).on("click",(function(){i.trigger("focus",this)})).on("touchmove",G).on("touchstart",G).on("touchend",G).draggable({revert:function(e){t.removeClass("h5p-dragging");var n=_(this);return n.data("uiDraggable").originalPosition={top:i.y+"%",left:i.x+"%"},i.updatePlacement(o),n[0].setAttribute("aria-grabbed","false"),i.trigger("dragend"),!e},start:function(){var e=_(this),n=i.mustCopyElement(o);n&&o.clone(),e.removeClass("h5p-wrong").detach().appendTo(t),t.addClass("h5p-dragging"),F.setElementOpacity(e,i.backgroundOpacity),this.setAttribute("aria-grabbed","true"),i.trigger("focus",this),i.trigger("dragstart",{element:this,effect:n?"copy":"move"})},stop:function(){var n=_(this);o.position=F.positionToPercentage(t,n),n.css(o.position);var r=n.data("addToZone");void 0!==r?(n.removeData("addToZone"),i.addToDropZone(e,o,r)):o.reset()}}).css("position",""),i.element=o,o.position&&(o.$.css(o.position),i.updatePlacement(o)),F.addHover(o.$,i.backgroundOpacity),H5P.newRunnable(i.type,n,o.$),_('<span class="h5p-hidden-read">'+i.l10n.prefix.replace("{num}",i.id+1)+"</span>").prependTo(o.$),_('<span class="h5p-hidden-read"></span>').appendTo(o.$),setTimeout((function(){F.setElementOpacity(o.$,i.backgroundOpacity)}),0),i.trigger("elementadd",o.$[0])}},{key:"setFeedback",value:function(e,t){this.elements.forEach((function(n){n.dropZone===t&&(void 0===n.$feedback&&(n.$feedback=_("<span>",{class:"h5p-hidden-read",appendTo:n.$})),n.$feedback.html(e))}))}},{key:"mustCopyElement",value:function(e){return this.multiple&&void 0===e.dropZone}},{key:"hasDropZone",value:function(e){for(var t=0;t<this.dropZones.length;t++)if(parseInt(this.dropZones[t])===e)return!0;return!1}},{key:"addToDropZone",value:function(e,t,n){var o=this;if(o.multiple)for(var i=0;i<o.elements.length;i++)if(i!==e&&void 0!==o.elements[i]&&o.elements[i].dropZone===n)return void 0!==o.elements[e].dropZone&&o.elements[e].dropZone!==n&&o.trigger("leavingDropZone",t),t.$.remove(),delete o.elements[e],void o.trigger("elementremove",this.element.$[0]);void 0!==t.dropZone&&t.dropZone!==n&&o.trigger("leavingDropZone",t),t.dropZone=n,o.updatePlacement(t),o.trigger("interacted")}},{key:"updatePlacement",value:function(e){if(e.$suffix&&e.$suffix.remove(),void 0!==e.dropZone){e.$.addClass("h5p-dropped"),F.setElementOpacity(e.$,self.backgroundOpacity);var t=this.allDropzones[e.dropZone].label;if(t){var n=document.createElement("div");n.innerHTML=t,t=n.innerText}else t=e.dropZone+1;e.$suffix=_('<span class="h5p-hidden-read">'+this.l10n.suffix.replace("{num}",t)+"</span>").appendTo(e.$)}else e.$.removeClass("h5p-dropped").removeClass("h5p-wrong").removeClass("h5p-correct").css({border:"",background:""}),F.setElementOpacity(e.$,this.backgroundOpacity)}},{key:"resetPosition",value:function(){var e=this;this.elements.forEach((function(t){if(t.$feedback&&(t.$feedback.remove(),delete t.$feedback),void 0!==t.dropZone){var n=t.$;n.animate({left:e.x+"%",top:e.y+"%"},(function(){e.multiple&&(void 0!==n.dropZone&&e.trigger("leavingDropZone",n),n.remove(),e.elements.indexOf(t)>=0&&delete e.elements[e.elements.indexOf(t)],e.trigger("elementremove",n[0]))})),e.updatePlacement(t)}})),void 0!==e.element.dropZone&&(e.trigger("leavingDropZone",e.element),delete e.element.dropZone),e.updatePlacement(e.element)}},{key:"findElement",value:function(e){for(var t=this,n=0;n<t.elements.length;n++)if(void 0!==t.elements[n]&&t.elements[n].$.is(e))return{element:t.elements[n],index:n}}},{key:"isInDropZone",value:function(e){for(var t=this,n=0;n<t.elements.length;n++)if(void 0!==t.elements[n]&&t.elements[n].dropZone===e)return!0;return!1}},{key:"disable",value:function(){for(var e=this,t=0;t<e.elements.length;t++){var n=e.elements[t];n&&(n.$.draggable("disable"),e.trigger("elementremove",n.$[0]))}}},{key:"enable",value:function(){for(var e=this,t=0;t<e.elements.length;t++){var n=e.elements[t];n&&(n.$.draggable("enable"),e.trigger("elementadd",n.$[0]))}}},{key:"results",value:function(e,t,n){var o,i,r,s,a=this,l=0;if(a.rawPoints=0,void 0===t){for(o=0;o<a.elements.length;o++)void 0!==(r=a.elements[o])&&void 0!==r.dropZone&&(!0!==e&&a.markElement(r,"wrong",n),l--);return l}for(o=0;o<a.elements.length;o++)if(void 0!==(r=a.elements[o])&&void 0!==r.dropZone){for(s=!1,i=0;i<t.length;i++)if(r.dropZone===t[i]){!0!==e&&a.markElement(r,"correct",n),s=!0,a.rawPoints++,l++;break}s||(!0!==e&&a.markElement(r,"wrong",n),l--)}return l}},{key:"markElement",value:function(e,t,n){var o=_("<span/>",{class:"h5p-hidden-read",html:this.l10n[t+"Answer"]+". "});n&&(o=o.add(n.getElement("correct"===t))),e.$suffix=e.$suffix.add(o),e.$.addClass("h5p-"+t).append(o),F.setElementOpacity(e.$,this.backgroundOpacity)}}])&&K(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),s}(),V=H5P.jQuery,Y=0;function J(e,t,n){var o,i,r=this;Y++,this.id=this.contentId=t,this.contentData=n,H5P.Question.call(r,"dragquestion"),this.options=V.extend(!0,{},{scoreShow:"Check",tryAgain:"Retry",grabbablePrefix:"Grabbable {num} of {total}.",grabbableSuffix:"Placed in dropzone {num}.",dropzonePrefix:"Dropzone {num} of {total}.",noDropzone:"No dropzone",tipLabel:"Show tip.",tipAvailable:"Tip available",correctAnswer:"Correct answer",wrongAnswer:"Wrong answer",feedbackHeader:"Feedback",scoreBarLabel:"You got :num out of :total points",scoreExplanationButtonLabel:"Show score explanation",question:{settings:{questionTitle:this.contentData&&this.contentData.metadata&&this.contentData.metadata.title?this.contentData.metadata.title:"Drag and drop",size:{width:620,height:310}},task:{elements:[],dropZones:[]}},overallFeedback:[],behaviour:{enableRetry:!0,enableCheckButton:!0,preventResize:!1,singlePoint:!1,applyPenalties:!0,enableScoreExplanation:!0,dropZoneHighlighting:"dragging",autoAlignSpacing:2,showScorePoints:!0,showTitle:!1},a11yCheck:"Check the answers. The responses will be marked as correct, incorrect, or unanswered.",a11yRetry:"Retry the task. Reset all responses and start the task over again.",submit:"Submit"},e),this.options.behaviour.singlePoint&&(this.options.behaviour.enableScoreExplanation=!1),this.draggables=[],this.dropZones=[],this.answered=n&&void 0!==n.previousState&&void 0!==n.previousState.answers&&n.previousState.answers.length,this.blankIsCorrect=!0,this.backgroundOpacity=void 0===this.options.behaviour.backgroundOpacity||""===this.options.behaviour.backgroundOpacity.trim()?void 0:this.options.behaviour.backgroundOpacity,r.$noDropZone=V('<div class="h5p-dq-no-dz" role="button" style="display:none;"><span class="h5p-hidden-read">'+r.options.noDropzone+"</span></div>");var s=ee(r.draggables,r.dropZones,r.$noDropZone[0]),a=function(e){for(var t=0;t<s.drop.elements.length;t++)s.drop.elements[t].setAttribute("aria-dropeffect",e)},l=[],c=this.options.question.task;for(this.correctDZs=[],o=0;o<c.dropZones.length;o++){l.push(!0);var h=c.dropZones[o].correctElements;for(i=0;i<h.length;i++){var d=h[i];void 0===this.correctDZs[d]&&(this.correctDZs[d]=[]),this.correctDZs[d].push(o)}}this.weight=1;var p={prefix:r.options.grabbablePrefix.replace("{total}",c.elements.length),suffix:r.options.grabbableSuffix,correctAnswer:r.options.correctAnswer,wrongAnswer:r.options.wrongAnswer};for(o=0;o<c.elements.length;o++){var u=c.elements[o];if(void 0!==u.dropZones&&u.dropZones.length){void 0!==this.backgroundOpacity&&(u.backgroundOpacity=this.backgroundOpacity);var g=null;n&&void 0!==n.previousState&&void 0!==n.previousState.answers&&void 0!==n.previousState.answers[o]&&(g=n.previousState.answers[o]);var f=new W(u,o,g,p,c.dropZones),b="dragging"===r.options.behaviour.dropZoneHighlighting;for(f.on("elementadd",(function(e){s.drag.addElement(e.data)})),f.on("elementremove",(function(e){s.drag.removeElement(e.data),"true"===e.data.getAttribute("aria-grabbed")&&(s.drag.firesEvent("select",e.data),e.data.removeAttribute("aria-grabbed"))})),f.on("focus",(function(e){s.drag.setTabbable(e.data),e.data.focus()})),f.on("dragstart",(function(e){b&&r.$container.addClass("h5p-dq-highlight-dz"),a(e.data)})),f.on("dragend",(function(){b&&r.$container.removeClass("h5p-dq-highlight-dz"),a("none")})),f.on("interacted",(function(){r.answered=!0,r.triggerXAPI("interacted")})),f.on("leavingDropZone",(function(e){r.dropZones[e.data.dropZone].removeAlignable(e.data.$)})),this.draggables[o]=f,i=0;i<u.dropZones.length;i++)l[u.dropZones[i]]=!1}}this.numDropZonesWithoutElements=0;var v={prefix:r.options.dropzonePrefix.replace("{total}",c.dropZones.length),tipLabel:r.options.tipLabel,tipAvailable:r.options.tipAvailable};for(o=0;o<c.dropZones.length;o++){var m=c.dropZones[o];!0===l[o]&&(this.numDropZonesWithoutElements+=1),this.blankIsCorrect&&m.correctElements.length&&(this.blankIsCorrect=!1),m.autoAlign={enabled:m.autoAlign,spacing:r.options.behaviour.autoAlignSpacing,size:r.options.question.settings.size},this.dropZones[o]=new j(m,o,v),this.dropZones[o].on("elementaligned",(function(e){for(var t=e.data,n=0;n<r.draggables.length;n++){var o=r.draggables[n];if(o&&o.elements&&o.elements.length)for(var i=0;i<o.elements.length;i++){var s=o.elements[i];if(s&&s.$[0]===t[0])return void(s.position=F.positionToPercentage(r.$container,s.$))}}}))}this.on("resize",r.resize,r),this.on("domChanged",(function(e){r.contentId===e.data.contentId&&r.trigger("resize")})),this.on("enterFullScreen",(function(){r.$container&&(r.$container.parents(".h5p-content").css("height","100%"),r.trigger("resize"))})),this.on("exitFullScreen",(function(){r.$container&&(r.$container.parents(".h5p-content").css("height","auto"),r.trigger("resize"))}))}J.prototype=Object.create(H5P.Question.prototype),J.prototype.constructor=J,J.prototype.registerDomElements=function(){var e=this;e.options.behaviour.showTitle&&(e.$introduction=V('<p class="h5p-dragquestion-introduction" id="dq-intro-'+Y+'">'+e.options.question.settings.questionTitle+"</p>"),e.setIntroduction(e.$introduction));var t="";if(void 0!==this.options.question.settings.background&&(t+="h5p-dragquestion-has-no-background"),"always"===e.options.behaviour.dropZoneHighlighting&&(t&&(t+=" "),t+="h5p-dq-highlight-dz-always"),e.setContent(e.createQuestionContent(),{class:t}),!1!==H5P.canHasFullScreen&&this.options.behaviour.enableFullScreen){var n=function(){H5P.isFullscreen?H5P.exitFullScreen(e.$container):H5P.fullScreen(e.$container.parent().parent(),e)},o=V("<div/>",{class:"h5p-my-fullscreen-button-enter",title:this.options.localize.fullscreen,role:"button",tabindex:0,on:{click:n,keypress:function(e){13!==e.which&&32!==e.which||(n(),e.preventDefault())}},prependTo:this.$container.parent()});this.on("enterFullScreen",(function(){o.attr("class","h5p-my-fullscreen-button-exit"),o.attr("title",this.options.localize.exitFullscreen)})),this.on("exitFullScreen",(function(){o.attr("class","h5p-my-fullscreen-button-enter"),o.attr("title",this.options.localize.fullscreen)}))}e.registerButtons(),setTimeout((function(){e.trigger("resize")}),200)},J.prototype.getXAPIData=function(){var e=this.createXAPIEventTemplate("answered");return this.addQuestionToXAPI(e),this.addResponseToXAPI(e),{statement:e.data.statement}},J.prototype.addQuestionToXAPI=function(e){var t=e.getVerifiedStatementValue(["object","definition"]);V.extend(t,this.getXAPIDefinition())},J.prototype.getXAPIDefinition=function(){var e={};e.description={"en-US":V("<div>"+this.options.question.settings.questionTitle+"</div>").text()},e.type="http://adlnet.gov/expapi/activities/cmi.interaction",e.interactionType="matching",e.source=[];for(var t=0;t<this.options.question.task.elements.length;t++){var n=this.options.question.task.elements[t];if(n.dropZones&&n.dropZones.length){var o=n.type.params.alt?n.type.params.alt:n.type.params.text;e.source.push({id:""+t,description:{"en-US":V("<div>"+o+"</div>").text()}})}}e.correctResponsesPattern=[""],e.target=[];var i=!0;for(t=0;t<this.options.question.task.dropZones.length;t++)if(e.target.push({id:""+t,description:{"en-US":V("<div>"+this.options.question.task.dropZones[t].label+"</div>").text()}}),this.options.question.task.dropZones[t].correctElements)for(var r=0;r<this.options.question.task.dropZones[t].correctElements.length;r++){var s=this.options.question.task,a=s.elements[s.dropZones[t].correctElements[r]];!a||a.dropZones.indexOf(t.toString())<0||(i||(e.correctResponsesPattern[0]+="[,]"),e.correctResponsesPattern[0]+=t+"[.]"+s.dropZones[t].correctElements[r],i=!1)}return e},J.prototype.addResponseToXAPI=function(e){var t=this.getMaxScore(),n=this.getScore(),o=n==t;e.setScoredResult(n,t,this,!0,o),e.data.statement.result.response=this.getUserXAPIResponse()},J.prototype.getUserXAPIResponse=function(){var e=this.getUserAnswers();return e?e.filter((function(e){return e.elements.length})).map((function(e){return e.elements.filter((function(e){return void 0!==e.dropZone})).map((function(t){return t.dropZone+"[.]"+e.index})).join("[,]")})).filter((function(e){return void 0!==e&&""!==e})).join("[,]"):""},J.prototype.getUserAnswers=function(){return this.draggables.map((function(e,t){return{index:t,draggable:e}})).filter((function(e){return void 0!==e.draggable&&e.draggable.elements})).map((function(e){return{index:e.index,elements:e.draggable.elements}}))},J.prototype.createQuestionContent=function(){var e;this.$container=V('<div class="h5p-inner" role="application" aria-labelledby="dq-intro-'+Y+'"></div>'),void 0!==this.options.question.settings.background&&this.$container.css("backgroundImage",'url("'+H5P.getPath(this.options.question.settings.background.path,this.id)+'")');var t=this.options.question.task;for(e=0;e<t.elements.length;e++){var n=t.elements[e];if(void 0!==n.dropZones&&0!==n.dropZones.length)this.draggables[e].appendTo(this.$container,this.id);else{var o=this.addElement(n,"static",e);H5P.newRunnable(n.type,this.id,o),function(e,t){setTimeout((function(){F.setOpacity(e,"background",t.backgroundOpacity)}),0)}(o,n)}}for(this.$noDropZone.appendTo(this.$container),e=0;e<this.dropZones.length;e++)this.dropZones[e].appendTo(this.$container,this.draggables);return this.$container},J.prototype.registerButtons=function(){this.options.behaviour.enableCheckButton&&this.addSolutionButton(),this.addRetryButton()},J.prototype.addSolutionButton=function(){var e=this;this.addButton("check-answer",this.options.scoreShow,(function(){e.answered=!0,e.showAllSolutions(),e.showScore(),e.addExplanation();var t=e.createXAPIEventTemplate("answered");e.addQuestionToXAPI(t),e.addResponseToXAPI(t),e.trigger(t),(e.$introduction?e.$introduction:e.$container.children().first()).focus()}),!0,{"aria-label":this.options.a11yCheck},{contentData:this.contentData,textIfSubmitting:this.options.submit})},J.prototype.addExplanation=function(){var e=this,t=this.options.question.task,n=[];t.dropZones.forEach((function(t,o){var i={correct:t.tipsAndFeedback.feedbackOnCorrect,incorrect:t.tipsAndFeedback.feedbackOnIncorrect};if(void 0!==i.correct||void 0!==i.incorrect){var r=t.correctElements,s={};e.draggables.forEach((function(e){e.elements.forEach((function(t){t.dropZone==o&&(s[e.id]={instance:e,correct:-1!==r.indexOf(""+e.id)})}))})),Object.keys(s).forEach((function(e){var r=s[e],a=F.strip(r.instance.type.params.alt||r.instance.type.params.text)||"?",l=F.strip(t.label);r.correct&&i.correct?(n.push({correct:l+" + "+a,text:i.correct}),r.instance.setFeedback(i.correct,o)):!r.correct&&i.incorrect&&(n.push({correct:l+" + ",wrong:a,text:i.incorrect}),r.instance.setFeedback(i.incorrect,o))}))}})),0!==n.length&&this.setExplanation(n,this.options.feedbackHeader)},J.prototype.addRetryButton=function(){var e=this;this.addButton("try-again",this.options.tryAgain,(function(){e.resetTask(),e.showButton("check-answer"),e.hideButton("try-again")}),!1,{"aria-label":this.options.a11yRetry})},J.prototype.addElement=function(e,t,n){return V('<div class="h5p-'+t+'" style="left:'+e.x+"%;top:"+e.y+"%;width:"+e.width+"em;height:"+e.height+'em"></div>').appendTo(this.$container).data("id",n)},J.prototype.resize=function(e){var t=this;if(void 0!==this.$container&&this.$container.is(":visible")){t.dropZones.forEach((function(e){e.updateBackgroundOpacity()}));var n=e&&e.data&&e.data.decreaseSize;n||(this.$container.css("height","99999px"),t.$container.parents(".h5p-standalone.h5p-dragquestion").css("width",""));var o=this.options.question.settings.size,i=o.width/o.height,r=this.$container.parent(),s=r.width()-parseFloat(r.css("margin-left"))-parseFloat(r.css("margin-right")),a=t.$container.parents(".h5p-standalone.h5p-dragquestion.h5p-semi-fullscreen");if(a.length){a.css("width",""),n||(t.$container.css("width","10px"),a.css("width",""),setTimeout((function(){t.trigger("resize",{decreaseSize:!0})}),200));var l=V(window.frameElement);l&&(s=l.parent().width(),a.css("width",s+"px"))}var c=s/i;s<=0&&(s=o.width,c=o.height),this.$container.css({width:s+"px",height:c+"px",fontSize:s/o.width*16+"px"})}},J.prototype.disableDraggables=function(){this.draggables.forEach((function(e){e.disable()}))},J.prototype.enableDraggables=function(){this.draggables.forEach((function(e){e.enable()}))},J.prototype.showAllSolutions=function(e){var t;this.points=0,this.rawPoints=0,this.blankIsCorrect&&(this.points=1,this.rawPoints=1),!e&&this.options.behaviour.showScorePoints&&!this.options.behaviour.singlePoint&&this.options.behaviour.applyPenalties&&(t=new H5P.Question.ScorePoints);for(var n=0;n<this.draggables.length;n++){var o=this.draggables[n];void 0!==o&&(e||o.disable(),this.points+=o.results(e,this.correctDZs[n],t),this.rawPoints+=o.rawPoints)}this.points<0&&(this.points=0),!this.answered&&this.blankIsCorrect&&(this.points=this.weight),this.options.behaviour.singlePoint&&(this.points=this.points===this.calculateMaxScore()?1:0),e||this.hideButton("check-answer"),this.options.behaviour.enableRetry&&!e&&this.showButton("try-again"),!this.hasButton("check-answer")||!1!==this.options.behaviour.enableRetry&&this.points!==this.getMaxScore()||this.hideButton("try-again")},J.prototype.showSolutions=function(){this.showAllSolutions(),this.showScore(),this.hideButton("check-answer"),this.hideButton("try-again"),this.disableDraggables()},J.prototype.resetTask=function(){this.points=0,this.rawPoints=0,this.answered=!1,this.dropZones.forEach((function(e){e.reset()})),this.enableDraggables(),this.draggables.forEach((function(e){e.resetPosition()})),this.showButton("check-answer"),this.hideButton("try-again"),this.removeFeedback(),this.setExplanation()},J.prototype.calculateMaxScore=function(){var e=0;if(this.blankIsCorrect)return 1;for(var t=this.options.question.task.elements,n=0;n<t.length;n++){var o=this.correctDZs[n];void 0!==o&&o.length&&(t[n].multiple?e+=o.length:e++)}return e},J.prototype.getMaxScore=function(){return this.options.behaviour.singlePoint?this.weight:this.calculateMaxScore()},J.prototype.getScore=function(){this.showAllSolutions(!0);var e=this.options.behaviour.applyPenalties||this.options.behaviour.singlePoint?this.points:this.rawPoints;return delete this.points,delete this.rawPoints,e},J.prototype.getAnswerGiven=function(){return this.answered||this.blankIsCorrect},J.prototype.showScore=function(){var e=this.calculateMaxScore();this.options.behaviour.singlePoint&&(e=1);var t=this.options.behaviour.applyPenalties||this.options.behaviour.singlePoint?this.points:this.rawPoints,n=H5P.Question.determineOverallFeedback(this.options.overallFeedback,t/e).replace("@score",t).replace("@total",e),o=!(!this.options.behaviour.enableScoreExplanation||!this.options.behaviour.applyPenalties)&&this.options.scoreExplanation;this.setFeedback(n,t,e,this.options.scoreBarLabel,o,void 0,this.options.scoreExplanationButtonLabel)},J.prototype.getCurrentState=function(){for(var e={answers:[]},t=0;t<this.draggables.length;t++){var n=this.draggables[t];if(void 0!==n){for(var o=[],i=0;i<n.elements.length;i++){var r=n.elements[i];void 0!==r&&void 0!==r.dropZone&&o.push({x:Number(r.position.left.replace("%","")),y:Number(r.position.top.replace("%","")),dz:r.dropZone})}o.length&&(e.answers[t]=o)}}return e},J.prototype.getTitle=function(){return H5P.createTitle(this.contentData&&this.contentData.metadata&&this.contentData.metadata.title?this.contentData.metadata.title:"Drag and drop")};var ee=function(e,t,n){var o,i={drag:new w([new z,new q,new O]),drop:new w([new z,new q,new B])};i.drag.useNegativeTabIndex(),i.drop.useNegativeTabIndex();var r=function(){o.draggable.trigger("dragend"),o.element.$.removeClass("h5p-draggable-hover"),F.setElementOpacity(o.element.$,o.draggable.backgroundOpacity),-1!==i.drop.elements.indexOf(n)&&(i.drop.removeElement(n),n.style.display="none");for(var e=0;e<t.length;e++){var r=t[e];r.dehighlight(),-1!==i.drop.elements.indexOf(r.$dropZone[0])&&i.drop.removeElement(r.$dropZone[0])}if(o.element.$.is(":visible"))o.element.$.focus();else{var s=o.draggable.elements[o.draggable.elements.length-1].$;i.drag.setTabbable(s[0]),s.focus()}o=void 0};return i.drag.on("select",(function(s){var a=F.elementToDraggable(e,s.element);if(o)r();else{var l;(o=a).element.$.addClass("h5p-draggable-hover"),F.setElementOpacity(o.element.$,o.draggable.backgroundOpacity),o.draggable.trigger("dragstart",o.draggable.mustCopyElement(o.element)?"copy":"move"),i.drop.addElement(n),n.style.display="block",n.style.left=o.draggable.x+"%",n.style.top=o.draggable.y+"%",n.style.width=o.draggable.width+"em",n.style.height=o.draggable.height+"em";for(var c=0;c<t.length;c++){var h=t[c];h.accepts(o.draggable,e)&&(h.highlight(),i.drop.addElement(h.$dropZone[0]),l&&o.element.dropZone!==h.id||(l=h.$dropZone))}l&&(i.drop.setTabbable(l[0]),l.focus())}})),i.drop.on("select",(function(e){if(o){if(e.element===n)return void 0!==o.element.dropZone&&o.element.reset(),void(void 0!==o&&(o.element.$.css({left:o.draggable.x+"%",top:o.draggable.y+"%",width:o.draggable.width+"em",height:o.draggable.height+"em"}),o.draggable.updatePlacement(o.element),o.element.$[0].setAttribute("aria-grabbed","false"),r()));var i=F.elementToDropZone(t,e.element);o.draggable.mustCopyElement(o.element)&&o.element.clone(),o.draggable.addToDropZone(o.index,o.element,i.id),o.element.$.css({left:i.x+"%",top:i.y+"%"}),-1===i.getIndexOf(o.element.$)&&i.alignables.push(o.element.$),i.autoAlign(),o.element.$[0].setAttribute("aria-grabbed","false"),r()}})),i};H5P.DragQuestion=J})();