const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};const s=new class{constructor(t){this.intervalId=null,this.isActive=!1,this.backgroundColor=!0}startChangeColor(){this.isActive||(t.startBtn.disabled=!0,t.stoptBtn.disabled=!1,this.isActive=!0,this.intervalId=setInterval((()=>{return t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`,void(document.body.style.backgroundColor=t);var t}),1e3))}stopChangeColor(){t.startBtn.disabled=!1,t.stoptBtn.disabled=!0,clearInterval(this.intervalId),this.isActive=!1}};t.startBtn.addEventListener("click",(()=>s.startChangeColor())),t.stopBtn.addEventListener("click",(()=>s.stopChangeColor()));
//# sourceMappingURL=01-color-switcher.1e6e86ab.js.map
