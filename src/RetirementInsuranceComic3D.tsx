import {AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame} from 'remotion';
import type {ReactNode} from 'react';
import type {RetirementInsuranceData} from './data/retirement-insurance';
import {CalendarIcon, HospitalIcon, MiniIcon, MoneyIcon, ShieldIcon} from './components/comic3d/Icons';
import {Panel, Pop} from './components/comic3d/Panel';

const C = {blue: '#1769d2', navy: '#10254b', red: '#e83c43', paper: '#f4f7fb', green: '#14a176'};
const font = '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif';

const Stage = ({children, dark = false, duration}: {children: ReactNode; dark?: boolean; duration: number}) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 35) * 16;
  const opacity = interpolate(frame, [0, 8, duration - 8, duration], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const camera = interpolate(frame, [0, duration], [1.035, 1], {easing: Easing.out(Easing.cubic), extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{fontFamily: font, color: dark ? 'white' : C.navy, background: dark ? C.navy : C.paper, overflow: 'hidden', opacity}}>
    <div style={{position: 'absolute', width: 720, height: 720, borderRadius: '50%', background: dark ? '#17417c' : '#dbe9fa', top: -330, right: -250, transform: `translateX(${drift}px)`}} />
    <div style={{position: 'absolute', inset: 0, opacity: .18, backgroundImage: `linear-gradient(${dark ? '#fff' : C.blue} 2px, transparent 2px), linear-gradient(90deg, ${dark ? '#fff' : C.blue} 2px, transparent 2px)`, backgroundSize: '88px 88px', transform: `translateY(${drift * .45}px)`}} />
    <div style={{position: 'absolute', inset: 34, border: `5px solid ${dark ? '#fff' : C.navy}`, borderRadius: 42, opacity: .2}} />
    <div style={{position: 'absolute', inset: '105px 68px 90px', perspective: 1400, transform: `scale(${camera})`}}>{children}</div>
  </AbsoluteFill>;
};

const Kicker = ({children}: {children: ReactNode}) => <div style={{display: 'inline-block', background: C.red, color: 'white', fontSize: 34, fontWeight: 900, letterSpacing: 3, padding: '12px 24px', transform: 'rotate(-2deg)', boxShadow: '8px 9px 0 #10254b'}}>{children}</div>;

const Hook = ({data}: {data: RetirementInsuranceData}) => <Stage dark duration={120}><Pop delay={5}><Kicker>{data.hook.eyebrow}</Kicker></Pop><Pop delay={16} style={{fontSize: 150, whiteSpace: 'pre-line', fontWeight: 1000, lineHeight: .98, marginTop: 180, letterSpacing: -8}}>{data.hook.title}</Pop><Panel delay={32} side={1} style={{padding: '35px 38px', marginTop: 120, color: C.navy, fontSize: 41, fontWeight: 850, lineHeight: 1.55, borderColor: C.red}}>{data.hook.sub}</Panel><div style={{position: 'absolute', right: 30, top: 320, fontSize: 260, color: C.red, fontWeight: 1000, transform: 'rotate(12deg)', opacity: .22}}>!</div></Stage>;

const Hospital = ({data}: {data: RetirementInsuranceData}) => <Stage duration={150}><Kicker>{data.hospital.kicker}</Kicker><div style={{display: 'flex', gap: 28, alignItems: 'center', marginTop: 95}}><Pop delay={4}><HospitalIcon/></Pop><div style={{fontSize: 59, fontWeight: 950, lineHeight: 1.25}}>{data.hospital.title}</div></div><div style={{display: 'grid', gap: 38, marginTop: 120}}>{data.hospital.facts.map((fact, i) => <Panel key={fact} delay={20 + i * 16} side={i ? 1 : -1} style={{padding: '50px 42px', fontSize: 50, fontWeight: 900}}><span style={{color: C.blue, marginRight: 24}}>✓</span>{fact}</Panel>)}</div><Pop delay={66} style={{marginTop: 125, textAlign: 'center', fontSize: 40, fontWeight: 900, color: C.red}}>{data.hospital.note}</Pop></Stage>;

const Pivot = ({data}: {data: RetirementInsuranceData}) => {
  const frame = useCurrentFrame();
  const wipe = interpolate(frame, [36, 64], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <Stage dark duration={180}><div style={{fontSize: 43, fontWeight: 800, marginTop: 100}}>{data.pivot.lead}</div><div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: 220}}><div style={{opacity: interpolate(frame, [20, 55], [1, .16], {extrapolateRight: 'clamp'})}}><HospitalIcon/><div style={{fontSize: 57, fontWeight: 900, marginTop: 35}}>{data.pivot.from}</div></div><div style={{fontSize: 85, color: C.red, fontWeight: 1000}}>→</div><div style={{transform: `scale(${interpolate(wipe, [0,100], [.7,1.18])})`}}><CalendarIcon/><div style={{fontSize: 57, fontWeight: 950, marginTop: 35, color: '#fff'}}>{data.pivot.to}</div></div></div><div style={{position: 'absolute', left: -70, right: -70, top: 720, height: `${wipe}%`, maxHeight: 500, background: C.red, transform: 'skewY(-7deg)', zIndex: -1}}/><Pop delay={55} style={{fontSize: 92, fontWeight: 1000, lineHeight: 1.1, marginTop: 250, whiteSpace: 'pre-line', color: '#ffd65a'}}>{data.pivot.punchline}</Pop></Stage>;
};

const CompareCard = ({kind, data, side}: {kind: 'social' | 'national'; data: RetirementInsuranceData; side: number}) => {
  const item = data.comparison[kind];
  const good = kind === 'social';
  return <Panel delay={28} side={side} style={{padding: '32px 28px 40px', borderColor: good ? C.blue : C.red, minHeight: 490}}><div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span style={{background: good ? C.blue : C.red, color: 'white', fontSize: 42, padding: '12px 20px', fontWeight: 1000}}>{item.badge}</span>{good ? <ShieldIcon/> : <MoneyIcon/>}</div><div style={{fontSize: 27, marginTop: 27, fontWeight: 750}}>{item.name}</div><div style={{fontSize: 50, lineHeight: 1.32, fontWeight: 1000, marginTop: 42, whiteSpace: 'pre-line'}}>{item.lines.join('\n')}</div><div style={{fontSize: 68, color: good ? C.blue : C.red, fontWeight: 1000, marginTop: 25}}>{good ? '◯' : '—'}</div></Panel>;
};

const Comparison = ({data}: {data: RetirementInsuranceData}) => {
  const frame = useCurrentFrame();
  const visibleDays = Math.max(1, Math.min(data.comparison.days, Math.floor((frame - 3) / 2) + 1));
  return <Stage duration={300}><div style={{fontSize: 48, fontWeight: 950, lineHeight: 1.3}}>{data.comparison.title}</div><div style={{display: 'flex', gap: 10, margin: '38px 0 50px'}}>{Array.from({length: data.comparison.days}).map((_, i) => <div key={i} style={{height: 24, flex: 1, background: i < visibleDays ? (i > 23 ? C.red : C.blue) : '#d6deea', transform: `translateY(${i % 2 ? 3 : 0}px)`}} />)}</div><div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28}}><CompareCard kind="social" data={data} side={-1}/><CompareCard kind="national" data={data} side={1}/></div><Pop delay={74} style={{marginTop: 65, background: C.navy, color: 'white', padding: '34px', fontSize: 54, fontWeight: 1000, textAlign: 'center'}}>{data.comparison.takeaway}</Pop><div style={{fontSize: 23, marginTop: 34, lineHeight: 1.5}}>{data.comparison.disclaimer}</div></Stage>;
};

const Checklist = ({data}: {data: RetirementInsuranceData}) => <Stage duration={240}><Kicker>{data.checklistTitle}</Kicker><div style={{display: 'grid', gap: 38, marginTop: 120}}>{data.checklist.map((item, i) => <Panel key={item.number} delay={12 + i * 18} side={i % 2 ? 1 : -1} style={{display: 'grid', gridTemplateColumns: '115px 130px 1fr', alignItems: 'center', padding: '38px 34px'}}><div style={{fontSize: 32, fontWeight: 950, color: C.red}}>{item.number}</div><MiniIcon type={item.icon}/><div><div style={{fontSize: 62, fontWeight: 1000}}>{item.title}</div><div style={{fontSize: 29, fontWeight: 700, marginTop: 8}}>{item.detail}</div></div></Panel>)}</div><Pop delay={86} style={{marginTop: 100, display: 'flex', justifyContent: 'center', gap: 35, alignItems: 'center'}}><MoneyIcon/><span style={{fontSize: 46, fontWeight: 950}}>{data.checklistOutro.lead}<br/><span style={{color: C.red}}>{data.checklistOutro.accent}</span></span></Pop></Stage>;

const Conclusion = ({data}: {data: RetirementInsuranceData}) => <Stage dark duration={210}><Pop delay={5}><ShieldIcon/></Pop><div style={{fontSize: 65, lineHeight: 1.45, fontWeight: 850, whiteSpace: 'pre-line', marginTop: 130}}>{data.conclusion.lead}</div><Pop delay={34} style={{fontSize: 85, color: '#ffd65a', fontWeight: 1000, lineHeight: 1.25, marginTop: 55}}>{data.conclusion.accent}</Pop><Panel delay={66} style={{padding: '48px 30px', marginTop: 170, color: C.navy, textAlign: 'center', fontSize: 44, fontWeight: 1000, borderColor: C.red}}>{data.conclusion.final}</Panel><div style={{position: 'absolute', bottom: 10, right: 0, color: '#8eb9ee', fontSize: 25, fontWeight: 700}}>退職前 CHECK</div></Stage>;

export const RetirementInsuranceComic3D = ({data}: {data: RetirementInsuranceData}) => <AbsoluteFill>
  <Sequence durationInFrames={120}><Hook data={data}/></Sequence>
  <Sequence from={120} durationInFrames={150}><Hospital data={data}/></Sequence>
  <Sequence from={270} durationInFrames={180}><Pivot data={data}/></Sequence>
  <Sequence from={450} durationInFrames={300}><Comparison data={data}/></Sequence>
  <Sequence from={750} durationInFrames={240}><Checklist data={data}/></Sequence>
  <Sequence from={990} durationInFrames={210}><Conclusion data={data}/></Sequence>
</AbsoluteFill>;
