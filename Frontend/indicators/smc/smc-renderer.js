/*
 * FlowSignal SMC renderer.
 * Structure/Fibonacci presentation adapted from "SMC Structures and FVG"
 * © LudoGH68, MPL-2.0. FVG intentionally excluded.
 */
(function(){
  "use strict";
  if(!window.FlowSignalSmcSettingsRuntime&&!document.querySelector('script[data-flow-smc-settings-runtime]')){
    const s=document.createElement("script");
    s.src="indicators/smc/smc-settings-runtime.js?v=2";
    s.async=false;
    s.dataset.flowSmcSettingsRuntime="true";
    document.head.appendChild(s);
  }
  function epoch(value){if(typeof value==="number"&&Number.isFinite(value))return value>1e10?Math.floor(value/1000):Math.floor(value);const p=Date.parse(String(value||""));return Number.isFinite(p)?Math.floor(p/1000):null;}
  function safeRemove(chart,series){try{if(chart&&series&&typeof chart.removeSeries==="function")chart.removeSeries(series);}catch(_){}}
  function midTime(a,b){return Math.max(a,Math.floor(a+(b-a)/2));}
  function lineStyle(style){return style==="dashed"?2:style==="dotted"?1:0;}
  function fallback(){return {bos:{show:true,color:"#c7cbd1",width:1,style:"solid"},choch:{show:true,color:"#f0c419",width:1,style:"solid"},structure:{show:true,color:"#2962ff",width:1,style:"solid"},fibs:{"0.786":{show:true,color:"#64b5f6",width:1,style:"solid"},"0.705":{show:true,color:"#f23645",width:1,style:"solid"},"0.618":{show:true,color:"#089981",width:1,style:"solid"},"0.5":{show:true,color:"#4caf50",width:1,style:"solid"},"0.382":{show:true,color:"#81c784",width:1,style:"solid"}}};}
  class SmcRenderer{
    constructor(){this.chart=null;this.candleSeries=null;this.series=[];this.enabled=false;this.lastStructure=null;window.addEventListener("flowsignal:smc-style-change",()=>{if(this.lastStructure)this.render(this.lastStructure);});}
    mount({chart,candleSeries}={}){if(chart)this.chart=chart;if(candleSeries)this.candleSeries=candleSeries;return Boolean(this.chart&&this.candleSeries);}
    setEnabled(enabled){this.enabled=Boolean(enabled);if(!this.enabled)this.clear();else if(this.lastStructure)this.render(this.lastStructure);}
    getState(){return {enabled:this.enabled,seriesCount:this.series.length,hasStructure:Boolean(this.lastStructure),mounted:Boolean(this.chart&&this.candleSeries)};}
    timeScale(){try{return this.chart?.timeScale?.()||null;}catch(_){return null;}}
    captureViewport(){const ts=this.timeScale();if(!ts)return null;try{const logical=ts.getVisibleLogicalRange?.();if(logical&&Number.isFinite(logical.from)&&Number.isFinite(logical.to))return {type:"logical",range:{from:logical.from,to:logical.to}};}catch(_){}try{const visible=ts.getVisibleRange?.();if(visible?.from!=null&&visible?.to!=null)return {type:"time",range:{from:visible.from,to:visible.to}};}catch(_){}return null;}
    restoreViewport(viewport){if(!viewport)return;const ts=this.timeScale();if(!ts)return;try{if(viewport.type==="logical"&&typeof ts.setVisibleLogicalRange==="function")ts.setVisibleLogicalRange(viewport.range);else if(viewport.type==="time"&&typeof ts.setVisibleRange==="function")ts.setVisibleRange(viewport.range);}catch(_){}}
    clear(){this.series.forEach(s=>safeRemove(this.chart,s));this.series=[];}
    cfg(){return window.FlowSignalSmcSettingsRuntime?.get?.()||window.FlowSignalSmcSettings?.get?.()||fallback();}
    addHorizontal({start,end,price,cfg,label=null,labelPosition="aboveBar"}){if(!cfg?.show||!this.chart||typeof this.chart.addLineSeries!=="function")return;if(![start,end,price].every(Number.isFinite))return;const finalEnd=end<=start?start+1:end;const middle=midTime(start,finalEnd);const line=this.chart.addLineSeries({color:cfg.color,lineWidth:Math.max(1,Math.min(5,Number(cfg.width)||1)),lineStyle:lineStyle(cfg.style),lastValueVisible:false,priceLineVisible:false,crosshairMarkerVisible:false,autoscaleInfoProvider:()=>null});line.setData([{time:start,value:price},{time:middle,value:price},{time:finalEnd,value:price}]);if(label&&typeof line.setMarkers==="function")line.setMarkers([{time:middle,position:labelPosition,shape:"circle",color:cfg.color,text:label,size:0.1}]);this.series.push(line);}
    addBreak(event,settings){const price=Number(event?.broken_level),start=epoch(event?.broken_swing_timestamp),end=epoch(event?.timestamp);if(![price,start,end].every(Number.isFinite))return;const isChoch=String(event?.event_type||"").toUpperCase()==="CHOCH";const isBullish=String(event?.direction||"").toUpperCase()==="BULLISH";this.addHorizontal({start,end,price,cfg:isChoch?settings.choch:settings.bos,label:isChoch?"CHoCH":"BOS",labelPosition:isBullish?"aboveBar":"belowBar"});}
    addCurrentStructure(structure,settings){const c=structure?.current_structure;if(!c||!settings.structure.show)return;const end=epoch(c.end_timestamp),hs=epoch(c.high_start_timestamp),ls=epoch(c.low_start_timestamp),high=Number(c.high),low=Number(c.low);if([hs,end,high].every(Number.isFinite))this.addHorizontal({start:hs,end,price:high,cfg:settings.structure,label:"Structure High",labelPosition:"aboveBar"});if([ls,end,low].every(Number.isFinite))this.addHorizontal({start:ls,end,price:low,cfg:settings.structure,label:"Structure Low",labelPosition:"belowBar"});}
    addFibs(structure,settings){const end=epoch(structure?.current_structure?.end_timestamp);if(!Number.isFinite(end))return;(Array.isArray(structure?.fib_levels)?structure.fib_levels:[]).forEach(level=>{const key=String(Number(level?.value)),price=Number(level?.price),start=epoch(level?.start_timestamp),cfg=settings.fibs?.[key];if(cfg&&[price,start].every(Number.isFinite))this.addHorizontal({start,end,price,cfg,label:key,labelPosition:"aboveBar"});});}
    render(structure){this.lastStructure=structure||null;const viewport=this.captureViewport();this.clear();if(!this.enabled||!this.chart||!this.candleSeries||!structure){this.restoreViewport(viewport);return;}const settings=this.cfg();(Array.isArray(structure.events)?structure.events:[]).slice(-10).forEach(e=>this.addBreak(e,settings));this.addCurrentStructure(structure,settings);this.addFibs(structure,settings);this.restoreViewport(viewport);window.requestAnimationFrame(()=>this.restoreViewport(viewport));}
  }
  window.FlowSignalSmcRenderer=new SmcRenderer();
})();
