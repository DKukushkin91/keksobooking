(()=>{"use strict";(()=>{const e=(e,t)=>Math.round(Math.random()*(t-e)+e);window.util={getRandomNumbers:e,getRandomItem:e=>e[Math.round(Math.floor(Math.random()*e.length))],getRandom:t=>t.slice(0,e(1,t.length)),createElement:(e,t)=>e.appendChild(t),setDisabled:(e,t)=>{for(let o of e)o.disabled=t},Url:{POST:"https://21.javascript.pages.academy/keksobooking",GET:"https://21.javascript.pages.academy/keksobooking/data"}}})(),window.data={PinSize:{WIDTH:65,HEIGHT:65},Price:{MIN:1e4,MAX:5e4},Room:{MIN:1,MAX:3},MinPrice:{BUNGALOW:0,FLAT:1e3,HOUSE:5e3,PALACE:1e4},offerType:{flat:"Квартира",house:"Дом",palace:"Дворец",bungalow:"Бунгало"},MapX:{MIN:0,MAX:1200},MapY:{MIN:130,MAX:630},PinStart:{X:"570px",Y:"375px"},TailSize:{WIDTH:10,HEIGHT:22}},(()=>{const e={OK:200},t=e=>{const t=document.createElement("div");return t.style="\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      width: 800px;\n      height: 50%;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      border-radius: 15px;\n      background-color: rgba(0, 0, 0, 0.9);\n      color: #fff;\n      font-weight: 700;\n      line-height: 1.5;\n      z-index: 100",t.textContent=e,document.querySelector(".map").append(t),t};window.load={dataRetrivial:(o,n)=>{const r=new XMLHttpRequest;r.responseType="json",r.addEventListener("load",(()=>{r.status===e.OK?o(r.response):n(t(`Статус ответа: ${r.status} ${r.statusText}`))})),r.addEventListener("error",(()=>{n(t("Произошла ошибка соединения"))})),r.addEventListener("timeout",(()=>{n(t(`Запрос не успел выполниться за ${r.timeout} мс`))})),r.timeout=1e4,r.open("GET",window.util.Url.GET),r.send()},StatusCode:e,TIMEOUT_IN_MS:1e4}})(),(()=>{const e=document.querySelector("#address"),t=document.querySelector("#room_number"),o=document.querySelector("#capacity"),n=document.querySelector("#type"),r=document.querySelector("#price"),a=document.querySelector(".ad-form"),d=a.querySelector(".ad-form__reset"),i=a.querySelector(".ad-form__submit");window.util.setDisabled(a.querySelectorAll("fieldset"),!0);const c=()=>{const e=document.querySelector(".map__filters");a.reset(),e.reset(),a.classList.add("ad-form--disabled"),document.querySelector(".map").classList.add("map--faded"),window.main.pinsRemove(),window.util.setDisabled(a.querySelectorAll("fieldset"),!0),window.util.setDisabled(e,!0),window.main.cardRemove(),document.querySelector(".map__pin--main").addEventListener("mousedown",window.pins.pinActivePageHandler),window.pins.setPinStart(),window.pins.setPinCoordinate(),window.picture.removePreview(),l()};i.addEventListener("click",(()=>{let e="";(t.value<o.value||"100"!==t.value&&"0"===o.value||"100"===t.value&&o.value>"0")&&(e="Количество гостей, не должно привышать количество комнат, 100 комнат не для гостей"),t.setCustomValidity(e)}));const s=(e,t,o)=>{e.setAttribute(t,o)},l=()=>{let e=0;switch(n.value){case"bungalow":e=window.data.MinPrice.BUNGALOW;break;case"flat":e=window.data.MinPrice.FLAT;break;case"house":e=window.data.MinPrice.HOUSE;break;case"palace":e=window.data.MinPrice.PALACE}s(r,"placeholder",e),s(r,"min",e)};l(),n.addEventListener("change",l);const u=document.querySelector("#timein"),p=document.querySelector("#timeout"),m=e=>{u.value=e.target.value,p.value=e.target.value};u.addEventListener("change",m),p.addEventListener("change",m),a.addEventListener("submit",(e=>{window.upload.clientUpload(new FormData(a),(()=>{})),e.preventDefault()})),window.form={setActiveForm:()=>{a.classList.remove("ad-form--disabled")},priceValidationHandler:l,formRestartHandler:()=>{const e=t=>{t.preventDefault(),d.removeEventListener("click",e),c()};d.addEventListener("click",e)},writeAddress:(t,o)=>{e.value=`${t}, ${o}`},restartPage:c}})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin"),t=document.querySelector(".map__pin--main"),o=()=>{window.form.writeAddress(t.offsetLeft+window.data.TailSize.HEIGHT+window.data.TailSize.WIDTH,t.offsetTop)},n=()=>{t.style.top=window.data.PinStart.Y,t.style.left=window.data.PinStart.X};o();const r=e=>{0===e.button&&(window.main.setActivePage(),n(),t.removeEventListener("mousedown",r))};t.addEventListener("mousedown",(e=>{e.preventDefault();let n={x:e.clientX,y:e.clientY};const r=e=>{e.preventDefault(),o();const r=n.x-e.clientX,a=n.y-e.clientY;n={x:e.clientX,y:e.clientY};const d=t.offsetLeft-r,i=t.offsetTop-a;t.style.left=(e=>{const t=window.data.MapX.MAX-window.data.PinSize.WIDTH/2,o=window.data.MapX.MIN-window.data.PinSize.WIDTH/2;return e>t?t:e<o?o:e})(d)+"px",t.style.top=(e=>{const t=window.data.MapY.MIN;return e>window.data.MapY.MAX?window.data.MapY.MAX:e<t?t:e})(i)+"px"},a=e=>{e.preventDefault(),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",r),document.addEventListener("mouseup",a)})),t.addEventListener("mousedown",r);const a=e=>{"Enter"===e.key&&(window.main.setActivePage(),window.form.writeAddress(t.offsetLeft,t.offsetTop),t.removeEventListener("keydown",a))};t.addEventListener("keydown",a),window.pins={getRenderPin:t=>{const o=e.cloneNode(!0),n=o.querySelector("img");return n.src=t.author.avatar,n.alt=t.offer.title,o.style.left=t.location.x-window.data.PinSize.WIDTH+"px",o.style.top=t.location.y-window.data.PinSize.HEIGHT+"px",o},pinActivePageHandler:r,setPinCoordinate:o,removeActivePin:()=>{const e=document.querySelector(".map__pin--active");e&&e.classList.remove("map__pin--active")},setPinStart:n}})(),(()=>{const e=document.querySelector("main"),t=document.querySelector("#error").content,o=document.querySelector("#success").content,n=()=>{e.querySelector(".error")&&e.querySelector(".error").remove()},r=()=>{e.querySelector(".success")&&e.querySelector(".success").remove()},a=()=>{const o=t.cloneNode(!0);e.append(o),document.addEventListener("click",n),document.addEventListener("keydown",(e=>{"Escape"===e.key&&n()}))};window.upload={clientUpload:(t,n)=>{const d=new XMLHttpRequest;d.responseType="json",d.addEventListener("load",(()=>{d.status===window.load.StatusCode.OK?(n(d.response),window.form.restartPage(),(()=>{const t=o.cloneNode(!0);e.append(t),document.addEventListener("click",r),document.addEventListener("keydown",(e=>{"Escape"===e.key&&r()}))})()):a()})),d.addEventListener("error",(()=>{a()})),d.addEventListener("timeout",(()=>{a()})),d.timeout=window.load.TIMEOUT_IN_MS,d.open("POST",window.util.Url.POST),d.send(t)}}})(),window.debounce=e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),300)}},(()=>{const e="any",t=document.querySelector(".map__filters"),o=document.querySelector("#housing-type"),n=document.querySelector("#housing-price"),r=document.querySelector("#housing-rooms"),a=document.querySelector("#housing-guests");window.util.setDisabled(t,!0);let d=[];window.load.dataRetrivial((e=>{d=e,i()}));const i=()=>{const e=window.debounce((()=>{window.main.pinsRemove(),window.main.cardRemove(),window.main.createElements()}));t.addEventListener("change",(()=>{e()}))};window.filter={getFilterMapAd:()=>d.filter((d=>{return(d.offer.type===o.value||o.value===e)&&(l=d.offer.price,n.value===e||l<window.data.Price.MIN&&"low"===n.value||l>window.data.Price.MAX&&"high"===n.value||l>=window.data.Price.MIN&&l<=window.data.Price.MAX&&"middle"===n.value)&&(i=d,r.value===e||i.offer.rooms===Number(r.value))&&(s=d.offer.guests,a.value===e||s===Number(a.value))&&(c=d.offer.features,Array.from(t.querySelectorAll('input[type="checkbox"]:checked')).every((e=>c.includes(e.value))));var i,c,s,l})).slice(0,5)}})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector("#avatar"),o=document.querySelector(".ad-form-header__preview img"),n=document.querySelector("#images"),r=document.querySelector(".ad-form__photo"),a="img/muffin-grey.svg";r.style.display="flex",r.style.alignItems="center",r.style.padding="0 15px",r.insertAdjacentHTML("afterbegin",'<img src="img/muffin-grey.svg" alt="Фотография жилья" width="40" height="44">');const d=r.firstChild,i=(t,o)=>{t.addEventListener("change",(()=>{const n=t.files[0],r=n.name.toLowerCase();if(e.some((e=>r.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{o.src=e.result})),e.readAsDataURL(n)}}))};i(t,o),i(n,d),window.picture={removePreview:()=>{o.src=a,d.src=a}}})(),(()=>{const e=document.querySelector("#card").content.querySelector(".popup"),t=e=>{"Escape"===e.key&&o()},o=()=>{const e=document.querySelector(".map__card");e&&(window.pins.removeActivePin(),e.remove(),document.removeEventListener("keydown",t))};window.card={getRenderCard:t=>{const n=e.cloneNode(!0),r=n.querySelector(".popup__photos").querySelector(".popup__photo"),a=n.querySelector(".popup__close");return n.querySelector(".popup__photos").removeChild(r),n.querySelector(".popup__title").textContent=t.offer.title,n.querySelector(".popup__text--address").textContent=t.offer.address,n.querySelector(".popup__text--price").textContent=t.offer.price+"₽/ночь",n.querySelector(".popup__type").textContent=window.data.offerType[t.offer.type],n.querySelector(".popup__text--capacity").textContent=`${t.offer.rooms} ${(e=>{let t="комната";return 1!==e.offer.rooms&&(t="комнаты"),0!==e.offer.rooms&&35!==e.offer.rooms||(t="комнат"),t})(t)} для ${t.offer.guests} ${(e=>1!==e.offer.guests?"гостей":"гостя")(t)}`,n.querySelector(".popup__text--time").textContent=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`,n.querySelector(".popup__features").appendChild((e=>{const t=document.createDocumentFragment();return e.forEach((e=>{const o=document.createElement("li");o.classList.add("popup__feature"),o.classList.add("popup__feature--"+e),t.appendChild(o)})),t})(t.offer.features)),n.querySelector(".popup__description").textContent=t.offer.description,n.querySelector(".popup__photos").appendChild((e=>{const t=document.createDocumentFragment(),o=document.querySelector("#card").content.querySelector(".popup__photo");return e.forEach((e=>{const n=o.cloneNode(!0);n.src=e,t.appendChild(n)})),t})(t.offer.photos)),n.querySelector(".popup__avatar").src=t.author.avatar,a.addEventListener("click",(()=>{o()})),n},popupCloseHandler:o,escPressHandler:t}})(),(()=>{const e=document.querySelector(".map__filters-container"),t=document.querySelector(".map"),o=document.querySelector(".map__pins"),n=()=>{const e=document.createDocumentFragment();window.filter.getFilterMapAd();for(let t of window.filter.getFilterMapAd()){const o=window.pins.getRenderPin(t);r(o,t),e.appendChild(o)}window.util.createElement(o,e)},r=(o,n)=>{o.addEventListener("click",(()=>{const r=window.card.getRenderCard(n);document.querySelector(".map__card")&&window.card.popupCloseHandler(),document.addEventListener("keydown",window.card.escPressHandler),window.pins.removeActivePin(),o.classList.add("map__pin--active"),t.insertBefore(r,e)}))};window.main={setActivePage:()=>{n(),t.classList.remove("map--faded"),window.util.setDisabled(document.querySelector(".ad-form").querySelectorAll("fieldset"),!1),window.util.setDisabled(document.querySelector(".map__filters"),!1),window.form.setActiveForm(),window.form.formRestartHandler(),window.form.priceValidationHandler()},pinsRemove:()=>{document.querySelectorAll('.map__pins [type="button"]').forEach((e=>e.remove()))},cardRemove:()=>{const e=document.querySelector(".map__card");e&&e.remove()},createElements:n}})()})();