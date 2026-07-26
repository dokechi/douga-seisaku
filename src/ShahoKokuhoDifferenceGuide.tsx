import type {CSSProperties, ReactNode} from 'react';
import {AbsoluteFill, Easing, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {ShahoKokuhoGuideData} from './data/shaho-kokuho-guide';

const C = {navy: '#073d78', blue: '#0876c9', red: '#d41422', ink: '#101828', pale: '#eaf5ff', cream: '#fffaf0', yellow: '#ffd84d'};
const font = '"Noto Sans JP", "Yu Gothic", sans-serif';

const pop = (frame: number, delay: number, fps: number) => spring({frame: frame - delay, fps, config: {damping: 14, stiffness: 145, mass: .7}});
const Enter = ({children, delay = 0, x = 0, y = 36, style}: {children: ReactNode; delay?: number; x?: number; y?: number; style?: CSSProperties}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig(); const p = pop(frame, delay, fps);
  return <div style={{...style, opacity: p, transform: `translate3d(${(1-p)*x}px,${(1-p)*y}px,0) scale(${.92+p*.08})`}}>{children}</div>;
};

const World = ({children, dark = false}: {children: ReactNode; dark?: boolean}) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{fontFamily: font, color: dark ? '#fff' : C.ink, background: dark ? C.navy : '#f8fbff', overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: -100, opacity: dark ? .12 : .55, transform: `translate(${Math.sin(frame/35)*12}px,${Math.cos(frame/42)*10}px)`, backgroundImage: `radial-gradient(${dark ? '#fff' : '#b9dbf4'} 2px, transparent 2px)`, backgroundSize: '42px 42px'}}/>
    <div style={{position: 'absolute', width: 650, height: 650, borderRadius: '50%', background: dark ? '#1687d8' : '#dff1ff', right: -280, top: -250, filter: 'blur(2px)'}}/>
    {children}
  </AbsoluteFill>;
};
const Stage = ({children, kicker, dark = false}: {children: ReactNode; kicker?: string; dark?: boolean}) => <World dark={dark}>
  <div style={{position: 'absolute', inset: '92px 70px 78px'}}>
    {kicker && <Enter style={{fontSize: 27, fontWeight: 900, letterSpacing: 3, color: dark ? '#a9dcff' : C.blue}}><span style={{border: `2px solid ${dark ? '#4da9e9' : '#b8daf1'}`, borderRadius: 99, padding: '10px 20px', background: dark ? '#073567' : '#fff'}}>CHECK BEFORE QUITTING</span>　{kicker}</Enter>}
    {children}
  </div>
  <div style={{position: 'absolute', left: 0, bottom: 0, height: 18, width: '100%', background: `linear-gradient(90deg,${C.blue} 0 68%,${C.red} 68%)`}}/>
</World>;

const Person = ({worried = false}: {worried?: boolean}) => <div style={{position: 'relative', width: 250, height: 300}}>
  <div style={{position: 'absolute', left: 65, top: 10, width: 120, height: 120, borderRadius: '50%', background: '#ffd8b8', border: `8px solid ${C.ink}`}}/>
  <div style={{position: 'absolute', left: 52, top: 0, width: 145, height: 62, borderRadius: '80px 80px 20px 20px', background: C.ink, transform: 'rotate(-6deg)'}}/>
  <div style={{position: 'absolute', left: 91, top: 69, fontSize: 38, fontWeight: 900}}>{worried ? '︿' : '•‿•'}</div>
  <div style={{position: 'absolute', left: 27, bottom: 0, width: 200, height: 160, borderRadius: '90px 90px 18px 18px', background: C.navy, border: '8px solid #102a4b'}}/>
  {worried && <div style={{position: 'absolute', right: 2, top: 5, fontSize: 55, color: C.blue}}>💧</div>}
</div>;
const Owl = () => <div style={{fontSize: 150, filter: 'drop-shadow(0 16px 14px rgba(0,0,0,.15))'}}>🦉</div>;
const Marker = ({children, red = false}: {children: ReactNode; red?: boolean}) => <span style={{position: 'relative', display: 'inline-block', color: red ? C.red : 'inherit', zIndex: 0}}><span style={{position: 'absolute', zIndex: -1, left: -5, right: -5, bottom: 5, height: 24, background: C.yellow, transform: 'rotate(-1deg)'}}/>{children}</span>;

const Hook = ({d}: {d: ShahoKokuhoGuideData}) => <Stage kicker="退職前の盲点">
  <Enter delay={3} style={{marginTop: 110, fontSize: 51, fontWeight: 900}}>{d.hook.eyebrow}</Enter>
  <Enter delay={14} x={-80} style={{marginTop: 80, fontSize: 100, fontWeight: 1000, lineHeight: 1.18, letterSpacing: -6, whiteSpace: 'pre-line'}}>{d.hook.title}</Enter>
  <Enter delay={31} x={100} style={{fontSize: 133, fontWeight: 1000, color: C.red, lineHeight: 1.15}}><Marker red>{d.hook.focus}</Marker></Enter>
  <Enter delay={47} style={{position: 'absolute', bottom: 100, left: 10}}><Person/></Enter>
  <Enter delay={55} x={100} style={{position: 'absolute', right: 20, bottom: 130}}><div style={{padding: '35px 45px', border: `5px solid ${C.ink}`, borderRadius: 35, background: '#fff', fontSize: 42, fontWeight: 900}}>病院代だけ<br/>見てない？</div></Enter>
</Stage>;

const Hospital = ({d}: {d: ShahoKokuhoGuideData}) => <Stage kicker="病院代は似て見える">
  <Enter delay={4} style={{marginTop: 75, fontSize: 69, fontWeight: 1000}}>🏥　{d.hospital.title}</Enter>
  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 85}}>{['社 保','国 保'].map((name,j)=><Enter key={name} delay={16+j*7} x={j ? 70 : -70} style={{background: '#fff', borderRadius: 32, boxShadow: '0 20px 50px #0c4f7b22', overflow: 'hidden', border: `4px solid ${j ? C.red : C.blue}`}}><div style={{background: j ? C.red : C.blue, color: '#fff', padding: 18, textAlign: 'center', fontSize: 43, fontWeight: 1000}}>{name}</div>{d.hospital.facts.map((f,i)=><div key={f} style={{padding: '29px 26px', fontSize: 32, fontWeight: 900, borderBottom: i<2 ? '2px dashed #c6d8e7' : undefined}}>✓ {f}</div>)}</Enter>)}</div>
  <Enter delay={62} style={{marginTop: 92, padding: 34, borderRadius: 24, textAlign: 'center', background: C.cream, border: `4px solid ${C.yellow}`, fontSize: 44, fontWeight: 1000}}>💡 {d.hospital.insight}</Enter>
</Stage>;

const Pivot = ({d}: {d: ShahoKokuhoGuideData}) => {const frame=useCurrentFrame(); const zoom=interpolate(frame,[0,290],[1,1.08]); return <Stage dark kicker="視点を変える">
  <div style={{position: 'absolute', inset: '170px 0 0', transform: `scale(${zoom})`}}>
    <Enter delay={5} style={{fontSize: 57, fontWeight: 900, textAlign: 'center'}}>{d.pivot.question}</Enter>
    <Enter delay={22} style={{fontSize: 230, lineHeight: 1.1, fontWeight: 1000, textAlign: 'center', color: C.yellow, textShadow: '8px 12px 0 #032a52'}}>{d.pivot.days}</Enter>
    <Enter delay={43} style={{fontSize: 91, fontWeight: 1000, textAlign: 'center'}}>{d.pivot.answer}</Enter>
    <Enter delay={70} style={{margin: '100px auto 0', width: 770, borderRadius: 30, padding: '42px 30px', background: '#fff', color: C.ink, textAlign: 'center', fontSize: 49, fontWeight: 1000, boxShadow: `14px 18px 0 ${C.red}`}}>差が出るのは<br/><span style={{color: C.red, fontSize: 63}}>「病院代」より「休んだ月」</span></Enter>
    <Enter delay={105} style={{display: 'flex', justifyContent: 'center', marginTop: 80}}><Person worried/></Enter>
  </div>
</Stage>};

const Allowance = ({d}: {d: ShahoKokuhoGuideData}) => <Stage kicker="30日休んだ場合">
  <Enter delay={3} style={{marginTop: 70, textAlign: 'center', fontSize: 39, fontWeight: 800, color: '#52667a'}}>{d.allowance.caption}</Enter>
  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 55}}>
    <Enter delay={12} x={-80} style={{height: 940, borderRadius: 34, background: C.navy, color: '#fff', padding: '38px 28px', boxShadow: '0 24px 60px #073d7840'}}><div style={{fontSize: 39, fontWeight: 1000}}>会社員の社保</div><div style={{fontSize: 78, marginTop: 55}}>🛡️</div><div style={{fontSize: 49, fontWeight: 1000, marginTop: 40}}>傷病手当金</div><div style={{height: 3, background: '#5aaae4', margin: '35px 0'}}/><div style={{fontSize: 39, fontWeight: 900}}>{d.allowance.daily}</div><div style={{marginTop: 70, fontSize: 54, lineHeight: 1.35, fontWeight: 1000, color: C.yellow}}>{d.allowance.monthly}</div></Enter>
    <Enter delay={24} x={80} style={{height: 940, borderRadius: 34, background: '#fff', border: `6px solid ${C.red}`, padding: '38px 28px', boxShadow: '0 24px 60px #8d121c24'}}><div style={{fontSize: 39, fontWeight: 1000, color: C.red}}>国 保</div><div style={{fontSize: 78, marginTop: 55}}>🛑</div><div style={{marginTop: 45, fontSize: 47, lineHeight: 1.4, fontWeight: 1000, color: C.red}}>{d.allowance.national}</div><div style={{height: 3, background: '#f3c0c4', margin: '42px 0'}}/><div style={{fontSize: 42, lineHeight: 1.55, fontWeight: 900}}>休むと<br/><Marker red>収入が止まりやすい</Marker></div></Enter>
  </div>
  <Enter delay={70} style={{marginTop: 65, textAlign: 'center', fontSize: 47, fontWeight: 1000}}>見るべきは、<Marker>生活費を守れるか。</Marker></Enter>
</Stage>;

const Company = ({d}: {d: ShahoKokuhoGuideData}) => <Stage kicker="もうひとつの見えない差">
  <Enter delay={4} style={{marginTop: 85, fontSize: 78, fontWeight: 1000}}>{d.companyShare.title}</Enter>
  <Enter delay={16} style={{marginTop: 55, borderRadius: 34, padding: '55px 45px', background: '#fff', border: `5px solid ${C.blue}`, boxShadow: '12px 16px 0 #b8dcf5'}}><div style={{fontSize: 37, fontWeight: 900, color: C.blue}}>会社員の社保</div><div style={{fontSize: 42, fontWeight: 900, marginTop: 22}}>{d.companyShare.social}</div><div style={{fontSize: 84, fontWeight: 1000, color: C.red, marginTop: 45}}>会社側だけで<br/>{d.companyShare.amount}</div></Enter>
  <Enter delay={39} style={{marginTop: 45, display: 'flex', alignItems: 'center', gap: 30, borderRadius: 28, padding: '35px', background: '#fff0f1', border: `4px solid ${C.red}`}}><div style={{fontSize: 72}}>👤</div><div><b style={{fontSize: 36, color: C.red}}>国保</b><div style={{fontSize: 44, fontWeight: 1000}}>{d.companyShare.national}</div></div></Enter>
  <Enter delay={65} style={{marginTop: 100, textAlign: 'center', fontSize: 45, fontWeight: 1000}}>🧾 {d.companyShare.note}</Enter>
</Stage>;

const Checklist = ({d}: {d: ShahoKokuhoGuideData}) => <Stage kicker="退職届の前に">
  <Enter delay={3} style={{marginTop: 65, fontSize: 77, fontWeight: 1000}}>見るのは、この<span style={{fontSize: 120, color: C.red}}>3</span>つ。</Enter>
  <div style={{display: 'grid', gap: 26, marginTop: 55}}>{d.checklist.map((x,i)=><Enter key={x.label} delay={13+i*12} x={i%2 ? 65 : -65} style={{display: 'grid', gridTemplateColumns: '135px 1fr', minHeight: 300, background: '#fff', borderRadius: 30, overflow: 'hidden', boxShadow: '0 16px 42px #073d7820', border: '3px solid #d7e7f3'}}><div style={{background: i===2 ? C.red : C.navy, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 52, fontWeight: 1000}}>{i+1}</div><div style={{padding: '28px 34px'}}><div style={{fontSize: 52, color: i===2 ? C.red : C.ink, fontWeight: 1000}}>{x.label}</div><div style={{marginTop: 18, fontSize: 29, fontWeight: 900}}><b style={{color:C.blue}}>社保</b>　{x.social}</div><div style={{marginTop: 15, borderTop: '2px dashed #c4d5e2', paddingTop: 15, fontSize: 29, fontWeight: 900}}><b style={{color:C.red}}>国保</b>　{x.national}</div></div></Enter>)}</div>
</Stage>;

const Conclusion = ({d}: {d: ShahoKokuhoGuideData}) => <Stage dark>
  <Enter delay={2} style={{marginTop: 120, fontSize: 54, fontWeight: 900}}>{d.conclusion.lead}</Enter>
  <Enter delay={12} style={{marginTop: 55, fontSize: 70, lineHeight: 1.5, fontWeight: 1000, whiteSpace: 'pre-line'}}>{d.conclusion.main}</Enter>
  <Enter delay={28} style={{marginTop: 110, borderRadius: 30, padding: '48px 30px', background: C.red, textAlign: 'center', fontSize: 48, lineHeight: 1.5, fontWeight: 1000}}>🛡️　{d.conclusion.action}</Enter>
  <Enter delay={48} style={{marginTop: 95, fontSize: 24, color: '#bfdbef', textAlign: 'center'}}>{d.conclusion.note}</Enter>
</Stage>;

export const ShahoKokuhoDifferenceGuide = ({data}: {data: ShahoKokuhoGuideData}) => <AbsoluteFill>
  <Sequence durationInFrames={120}><Hook d={data}/></Sequence>
  <Sequence from={120} durationInFrames={180}><Hospital d={data}/></Sequence>
  <Sequence from={300} durationInFrames={300}><Pivot d={data}/></Sequence>
  <Sequence from={600} durationInFrames={240}><Allowance d={data}/></Sequence>
  <Sequence from={840} durationInFrames={180}><Company d={data}/></Sequence>
  <Sequence from={1020} durationInFrames={210}><Checklist d={data}/></Sequence>
  <Sequence from={1230} durationInFrames={120}><Conclusion d={data}/></Sequence>
</AbsoluteFill>;
