import {desk,duration} from "@shared/desk";
import {wrap} from "@shared/surface";
let gates=[{km:5,min:50},{km:12,min:115},{km:21,min:200}];type S={at:number;start:number;marks:number[];reset:boolean};
desk<S>({name:"Trail Cutoff",accent:"#A9DA64",motion:{"motif":"stations","color":"#A9DA64","shine":"#EFFDB9"},initial:()=>({at:0,start:0,marks:[],reset:false}),ticking:s=>s.start>0&&s.marks.length<gates.length,
 configure:(s,v)=>{const p=String(v.gates||"").split(",").map(i=>i.split("|").map(Number)).map(([km,min])=>({km,min}));if(p.length&&p.every((g,i)=>g.km>0&&g.min>0&&(!i||g.km>p[i-1].km&&g.min>p[i-1].min)))gates=p;s.at=wrap(s.at,gates.length);s.marks=s.marks.slice(0,gates.length);},
 render:(s,now)=>{const g=gates[s.at],done=s.marks[s.at]!==undefined,elapsed=s.start?Math.max(0,now-s.start):0,remaining=g.min*60000-(done?s.marks[s.at]:elapsed);
 const last=s.marks.length?gates[s.marks.length-1].km:0,dist=g.km-last;const pace=!done&&dist>0&&remaining>0?duration(remaining/dist)+"/km":"--";
 return {title:"CP"+(s.at+1)+(done?" margin":" limit"),value:s.reset?"Reset?":done?(remaining<0?"-":"+")+Math.floor(Math.abs(remaining)/60000)+"m":!s.start?"Ready":remaining<0?"Overdue":pace,lines:[s.reset?"Click: confirm race reset":"CP"+(s.at+1)+" / "+g.km+" km","Cutoff after "+g.min+" min",done?"Crossed at "+duration(s.marks[s.at]):"Time left "+(remaining<0?"-":"")+duration(Math.abs(remaining)),done?"Margin "+Math.floor(remaining/60000)+" min":"Need "+pace+" from last CP","Click: mark next / Wheel: view","Start: begin / Hold OK: undo"]};},
 action:(s,k,now)=>{if(s.reset){s.reset=false;if(k==="ok"){s.start=0;s.marks=[];s.at=0;}return;}
 if(k==="up"||k==="down")s.at=wrap(s.at+(k==="up"?1:-1),gates.length);if(k==="start"&&!s.start)s.start=now;
 if(k==="ok"&&s.start&&s.marks.length<gates.length){s.marks.push(Math.max(0,now-s.start));s.at=Math.min(s.marks.length,gates.length-1);}
 if(k==="hold-ok"&&s.marks.length){s.marks.pop();s.at=s.marks.length;}if(k==="hold-start")s.reset=true;}});
