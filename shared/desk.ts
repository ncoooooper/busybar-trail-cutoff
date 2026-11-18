import {surface,read,persist,label,panel,rect,type Frame,type Key,type MotionOptions} from "./surface";
import {loadValues} from "./settings";
export type View={title:string;value:string;lines:string[];progress?:number;art?:Frame};
type Def<T>={name:string;accent:string;motion:MotionOptions;initial:()=>T;render:(state:T,now:number)=>View;
 action:(state:T,key:Key,now:number)=>void; ticking?:(state:T)=>boolean;
 configure?:(state:T,values:Record<string,unknown>)=>void};
export function desk<T>(def:Def<T>){
 let state=read<T>("desk-state-v1",def.initial()),dirty=false,closed=false;
 let saveTimer:ReturnType<typeof setTimeout>|undefined,clock:ReturnType<typeof setTimeout>|undefined;
 function save(){if(saveTimer!==undefined)clearTimeout(saveTimer);saveTimer=undefined;if(dirty){persist("desk-state-v1",state);dirty=false;}}
 function scheduleClock(){
  if(clock!==undefined)clearTimeout(clock);clock=undefined;
  if(!closed&&def.ticking?.(state))clock=setTimeout(()=>{clock=undefined;if(!closed){refresh();scheduleClock();}},1000-Date.now()%1000);
 }
 function draw():Frame{
  const v=def.render(state,Date.now());
  const out:Frame=v.art?v.art.slice():[label("caption",v.title.toUpperCase(),1,0,def.accent+"FF","front","tiny"),
    label("number",v.value,1,6,"#FFF2D7FF","front","small")];
  if(v.progress!==undefined&&!v.art&&v.value.length<=8){
   const n=Math.round(Math.max(0,Math.min(1,v.progress))*6);
   for(let i=0;i<6;i++)out.push(rect("meter"+i,51+i*3,14-i,2,i+1,i<n?def.accent+"FF":"#29353CFF"));
  }
  return out.concat(panel(def.name.toUpperCase(),v.lines));
 }
 const refresh=surface(draw,k=>{
   def.action(state,k,Date.now());dirty=true;
   if(saveTimer!==undefined)clearTimeout(saveTimer);saveTimer=setTimeout(()=>{saveTimer=undefined;save();},650);scheduleClock();
 },()=>{closed=true;save();if(clock!==undefined)clearTimeout(clock);},def.motion);
 if(def.configure)void loadValues().then(v=>{if(!closed&&v){def.configure!(state,v);refresh();scheduleClock();}}).catch(e=>console.error("Settings",String(e)));
 scheduleClock();
}
export function duration(ms:number){
 const s=Math.max(0,Math.floor(ms/1000));return Math.floor(s/60)+":"+String(s%60).padStart(2,"0");
}
