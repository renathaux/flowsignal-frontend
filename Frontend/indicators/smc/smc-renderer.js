/*
 * FlowSignal SMC renderer.
 * Structure/Fibonacci presentation adapted from "SMC Structures and FVG"
 * © LudoGH68, MPL-2.0. FVG intentionally excluded.
 */
(function(){
  "use strict";

  function epoch(value){
    if(typeof value==="number"&&Number.isFinite(value))return value>1e10?Math.floor(value/1000):Math.floor(value);
    const p=Date.parse(String(value||""));
    return Number.isFinite(p)?Math.floor(p/1000):null;
  }

  function structureEvents(events){
    // Pine's structHistoryNbr keeps the latest ten accepted breaks exactly as generated.
    return (Array.isArray(events)?events:[]).slice(-10);
  }

  function fallback(){
    return {
      bos:{show:true,color:"#c7cbd1",width:1,style:"solid"},
      choch:{show:true,color:"#f0c419",width:1,style:"solid"},
      structureHigh:{show:true,color:"#2962ff",width:1,style:"solid"},
      structureLow:{show:true,color:"#2962ff",width:1,style:"solid"},
      fibs:{
        "0.786":{show:true,color:"#64b5f6",width:1,style:"solid"},
        "0.705":{show:true,color:"#f23645",width:1,style:"solid"},
        "0.618":{show:true,color:"#089981",width:1,style:"solid"},
        "0.5":{show:true,color:"#4caf50",width:1,style:"solid"},
        "0.382":{show:true,color:"#81c784",width:1,style:"solid"}
      }
    };
  }

  function lineDash(style){
    return style==="dashed"?[6,4]:style==="dotted"?[2,3]:[];
  }

  function finiteCoordinate(value){
    return typeof value==="number"&&Number.isFinite(value);
  }

  class SmcPrimitivePaneRenderer{
    constructor(source){this.source=source;}

    draw(target){
      const items=this.source.coordinates;
      if(!Array.isArray(items)||!items.length)return;
      target.useMediaCoordinateSpace(scope=>{
        const ctx=scope.context;
        const width=scope.mediaSize.width;
        const height=scope.mediaSize.height;
        ctx.save();
        try{
          ctx.beginPath();
          ctx.rect(0,0,width,height);
          ctx.clip();
          ctx.font='12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
          ctx.textAlign="center";
          ctx.textBaseline="middle";

          items.forEach(item=>{
            const {x1,x2,y,cfg,label,labelPosition}=item;
            if(![x1,x2,y].every(finiteCoordinate)||!cfg?.show)return;

            ctx.save();
            try{
              ctx.strokeStyle=cfg.color||"#c7cbd1";
              ctx.fillStyle=cfg.color||"#c7cbd1";
              ctx.lineWidth=Math.max(1,Math.min(5,Number(cfg.width)||1));
              ctx.setLineDash(lineDash(cfg.style));
              ctx.beginPath();
              ctx.moveTo(x1,y);
              ctx.lineTo(x2,y);
              ctx.stroke();

              if(label){
                const mid=x1+(x2-x1)/2;
                const offset=labelPosition==="belowBar"?11:-11;
                const textY=y+offset;
                // Text only: no marker series / boxes. This stays bound to the same
                // time/price coordinates as the line during every pan and zoom frame.
                ctx.lineWidth=3;
                ctx.strokeStyle="rgba(11,15,26,.92)";
                ctx.setLineDash([]);
                ctx.strokeText(String(label),mid,textY);
                ctx.fillText(String(label),mid,textY);
              }
            }finally{ctx.restore();}
          });
        }finally{ctx.restore();}
      });
    }
  }

  class SmcPrimitivePaneView{
    constructor(source){this.source=source;this.paneRenderer=new SmcPrimitivePaneRenderer(source);}
    renderer(){return this.paneRenderer;}
    zOrder(){return "top";}
  }

  class SmcPrimitive{
    constructor(){
      this.chart=null;
      this.series=null;
      this.requestUpdate=null;
      this.structure=null;
      this.settings=fallback();
      this.coordinates=[];
      this.view=new SmcPrimitivePaneView(this);
    }

    attached(param){
      this.chart=param?.chart||null;
      this.series=param?.series||null;
      this.requestUpdate=typeof param?.requestUpdate==="function"?param.requestUpdate:null;
      this.updateAllViews();
    }

    detached(){
      this.chart=null;
      this.series=null;
      this.requestUpdate=null;
      this.coordinates=[];
    }

    paneViews(){return [this.view];}

    setData(structure,settings){
      this.structure=structure||null;
      this.settings=settings||fallback();
      this.updateAllViews();
      try{this.requestUpdate?.();}catch(_){ }
    }

    clear(){this.setData(null,this.settings);}

    updateAllViews(){
      const chart=this.chart;
      const series=this.series;
      const structure=this.structure;
      if(!chart||!series||!structure){this.coordinates=[];return;}

      let timeScale=null;
      try{timeScale=chart.timeScale?.()||null;}catch(_){timeScale=null;}
      if(!timeScale||typeof timeScale.timeToCoordinate!=="function"||typeof series.priceToCoordinate!=="function"){
        this.coordinates=[];
        return;
      }

      const settings=this.settings||fallback();
      const drawings=[];
      const add=(start,end,price,cfg,label,labelPosition)=>{
        if(!cfg?.show)return;
        const s=epoch(start),e=epoch(end),p=Number(price);
        if(![s,e,p].every(Number.isFinite))return;
        let x1=null,x2=null,y=null;
        try{
          x1=timeScale.timeToCoordinate(s);
          x2=timeScale.timeToCoordinate(e);
          y=series.priceToCoordinate(p);
        }catch(_){return;}
        if(![x1,x2,y].every(finiteCoordinate))return;
        drawings.push({x1,x2,y,cfg,label,labelPosition});
      };

      structureEvents(structure.events).forEach(event=>{
        const isChoch=String(event?.event_type||"").toUpperCase()==="CHOCH";
        const isBullish=String(event?.direction||"").toUpperCase()==="BULLISH";
        add(
          event?.broken_swing_timestamp,
          event?.timestamp,
          event?.broken_level,
          isChoch?settings.choch:settings.bos,
          isChoch?"CHoCH":"BOS",
          isBullish?"aboveBar":"belowBar"
        );
      });

      const current=structure?.current_structure;
      if(current){
        add(current.high_start_timestamp,current.end_timestamp,current.high,settings.structureHigh||fallback().structureHigh,"Structure High","aboveBar");
        add(current.low_start_timestamp,current.end_timestamp,current.low,settings.structureLow||fallback().structureLow,"Structure Low","belowBar");
      }

      const end=current?.end_timestamp;
      (Array.isArray(structure?.fib_levels)?structure.fib_levels:[]).forEach(level=>{
        const key=String(Number(level?.value));
        add(level?.start_timestamp,end,level?.price,settings.fibs?.[key],key,"aboveBar");
      });

      this.coordinates=drawings;
    }
  }

  class SmcRenderer{
    constructor(){
      this.chart=null;
      this.candleSeries=null;
      this.enabled=false;
      this.lastStructure=null;
      this.primitive=null;
    }

    mount({chart,candleSeries}={}){
      const chartChanged=Boolean(chart&&chart!==this.chart);
      const seriesChanged=Boolean(candleSeries&&candleSeries!==this.candleSeries);

      if((chartChanged||seriesChanged)&&this.primitive&&this.candleSeries){
        try{this.candleSeries.detachPrimitive?.(this.primitive);}catch(_){ }
        this.primitive=null;
      }

      if(chart)this.chart=chart;
      if(candleSeries)this.candleSeries=candleSeries;

      if(this.chart&&this.candleSeries&&!this.primitive&&typeof this.candleSeries.attachPrimitive==="function"){
        try{
          this.primitive=new SmcPrimitive();
          this.candleSeries.attachPrimitive(this.primitive);
        }catch(error){
          console.warn("FLOW_SMC_PRIMITIVE_ATTACH_ERROR",error);
          this.primitive=null;
        }
      }

      if(this.primitive){
        this.primitive.setData(this.enabled?this.lastStructure:null,this.cfg());
      }
      return Boolean(this.chart&&this.candleSeries&&this.primitive);
    }

    setEnabled(enabled){
      this.enabled=Boolean(enabled);
      if(!this.enabled)this.clear();
      else if(this.lastStructure)this.render(this.lastStructure);
    }

    getState(){
      return {
        enabled:this.enabled,
        seriesCount:this.primitive?.coordinates?.length||0,
        hasStructure:Boolean(this.lastStructure),
        mounted:Boolean(this.chart&&this.candleSeries&&this.primitive),
        renderer:"series-primitive"
      };
    }

    cfg(){return window.FlowSignalSmcSettings?.get?.()||fallback();}

    clear(){
      try{this.primitive?.clear?.();}catch(_){ }
    }

    render(structure){
      this.lastStructure=structure||null;
      if(!this.enabled||!this.chart||!this.candleSeries||!this.primitive){
        this.clear();
        return;
      }
      this.primitive.setData(this.lastStructure,this.cfg());
    }
  }

  window.FlowSignalSmcRenderer=new SmcRenderer();
  window.FlowSignalStructureEvents=structureEvents;
})();
