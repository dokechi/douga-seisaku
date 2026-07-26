import type {CSSProperties, ReactNode} from 'react';
import {AbsoluteFill, Easing, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {ShahoKokuhoGuideData} from './data/shaho-kokuho-guide';

const color = {blue: '#07559b', pale: '#edf6fd', red: '#c90916', ink: '#111827', yellow: '#ffe35b', line: '#b9d0e1'};
const font = '"Noto Sans JP", "Yu Gothic", sans-serif';

const Scene = ({children, duration, chapter}: {children: ReactNode; duration: number; chapter?: string}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, duration - 10, duration], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{fontFamily: font, color: color.ink, background: '#fff', opacity, overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${color.pale} 0 18%, transparent 18% 82%, #e3f0fb 82%)`}} />
    <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 22, background: color.blue}} />
    <div style={{position: 'absolute', left: 50, right: 40, top: 44, bottom: 46, border: `3px solid ${color.line}`, borderRadius: 34, background: 'rgba(255,255,255,.94)', boxShadow: '0 18px 60px rgba(4,52,92,.13)'}} />
    {chapter && <div style={{position: 'absolute', right: 0, top: 140, padding: '18px 22px 18px 30px', borderRadius: '28px 0 0 28px', background: color.blue, color: '#fff', fontSize: 28, fontWeight: 900, writingMode: 'vertical-rl', letterSpacing: 5}}>{chapter}</div>}
    <div style={{position: 'absolute', inset: '95px 92px 80px 95px'}}>{children}</div>
  </AbsoluteFill>;
};

const In = ({children, delay = 0, style}: {children: ReactNode; delay?: number; style?: CSSProperties}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: {damping: 15, stiffness: 120}});
  return <div style={{...style, opacity: p, transform: `translateY(${(1 - p) * 45}px) scale(${.96 + p * .04})`}}>{children}</div>;
};

const Label = ({children, red = false}: {children: ReactNode; red?: boolean}) => <span style={{display: 'inline-block', background: red ? color.red : color.blue, color: '#fff', borderRadius: 12, padding: '10px 22px', fontSize: 34, fontWeight: 900}}>{children}</span>;
const Underline = ({children}: {children: ReactNode}) => <span style={{position: 'relative', zIndex: 0}}><span style={{position: 'absolute', height: 20, left: -4, right: -4, bottom: 4, background: color.yellow, zIndex: -1}} />{children}</span>;
const Icon = ({children, red = false}: {children: ReactNode; red?: boolean}) => <div style={{width: 126, height: 126, flex: '0 0 auto', display: 'grid', placeItems: 'center', borderRadius: 30, background: red ? '#fff0f1' : color.pale, border: `4px solid ${red ? color.red : color.blue}`, fontSize: 67}}>{children}</div>;

const Opening = ({data}: {data: ShahoKokuhoGuideData}) => <Scene duration={180} chapter="退職前"><In delay={4}><Label>{data.opening.label}</Label></In><In delay={15} style={{fontSize: 110, fontWeight: 1000, lineHeight: 1.15, whiteSpace: 'pre-line', letterSpacing: -7, marginTop: 150}}>{data.opening.title.split('国保').map((part, i) => <span key={part}>{i > 0 && <span style={{color: color.red}}>国保</span>}{part}</span>)}</In><In delay={38} style={{marginTop: 145, padding: '45px 40px', borderLeft: `14px solid ${color.red}`, background: color.pale, fontSize: 43, lineHeight: 1.65, fontWeight: 800, whiteSpace: 'pre-line'}}>{data.opening.subtitle}</In><div style={{position: 'absolute', bottom: 80, right: 10, fontSize: 160}}>🔍</div></Scene>;

const Medical = ({data}: {data: ShahoKokuhoGuideData}) => <Scene duration={210} chapter="共通点"><In><Label>{data.medical.title}</Label></In><In delay={12} style={{display: 'flex', alignItems: 'center', gap: 32, marginTop: 90}}><Icon>🏥</Icon><div style={{fontSize: 59, fontWeight: 1000}}>国保でも病院には行ける</div></In><div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 25, marginTop: 100}}>{['社 保', '国 保'].map((name, i) => <In key={name} delay={25 + i * 8} style={{border: `4px solid ${i ? color.red : color.blue}`, borderRadius: 25, overflow: 'hidden'}}><div style={{textAlign: 'center', padding: 17, background: i ? color.red : color.blue, color: '#fff', fontSize: 42, fontWeight: 1000}}>{name}</div>{data.medical.shared.map(x => <div key={x} style={{padding: '29px 18px', fontSize: 33, fontWeight: 850}}>✓ {x}</div>)}</In>)}</div><In delay={65} style={{marginTop: 105, textAlign: 'center', fontSize: 43, fontWeight: 1000}}><Underline>{data.medical.message}</Underline></In></Scene>;

const CompareBox = ({title, lines, red, delay}: {title: string; lines: string[]; red?: boolean; delay: number}) => <In delay={delay} style={{border: `4px solid ${red ? color.red : color.blue}`, borderRadius: 26, background: red ? '#fff6f6' : '#f5faff', overflow: 'hidden'}}><div style={{padding: 16, background: red ? color.red : color.blue, color: '#fff', textAlign: 'center', fontSize: 38, fontWeight: 1000}}>{title}</div>{lines.map((line, i) => <div key={line} style={{padding: '24px 24px 18px', fontSize: 31, lineHeight: 1.35, fontWeight: i ? 1000 : 750}}>• {line}</div>)}</In>;

const Leave = ({data}: {data: ShahoKokuhoGuideData}) => <Scene duration={300} chapter="差が出る所"><In><Label>{data.leave.title}</Label></In><In delay={10} style={{display: 'flex', alignItems: 'center', gap: 30, marginTop: 65}}><Icon>🤕</Icon><div><div style={{fontSize: 58, fontWeight: 1000}}>働けない月のお金</div><div style={{fontSize: 29, marginTop: 10}}>{data.leave.salaryExample}</div></div></In><div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 65}}><CompareBox title="会社員の社保" lines={data.leave.social} delay={24}/><CompareBox title="国 保" lines={data.leave.national} red delay={34}/></div><In delay={70} style={{marginTop: 75, border: `7px solid ${color.red}`, borderRadius: 25, padding: '40px 24px', textAlign: 'center', color: color.red, fontSize: 43, fontWeight: 1000, lineHeight: 1.45}}>{data.leave.message}</In></Scene>;

const Premium = ({data}: {data: ShahoKokuhoGuideData}) => <Scene duration={210} chapter="会社負担"><In><Label>{data.premium.title}</Label></In><In delay={12} style={{textAlign: 'center', fontSize: 120, marginTop: 75}}>⚖️</In><div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 25, marginTop: 45}}><CompareBox title="社 保" lines={data.premium.social} delay={24}/><CompareBox title="国 保" lines={data.premium.national} red delay={34}/></div><In delay={64} style={{marginTop: 80, padding: 36, textAlign: 'center', background: color.pale, fontSize: 40, fontWeight: 1000, lineHeight: 1.55}}>給与明細だけでは、<br/><Underline>会社が払っていた分は見えにくい。</Underline></In></Scene>;

const Checklist = ({data}: {data: ShahoKokuhoGuideData}) => <Scene duration={270} chapter="結論"><In><Label>辞める前に見る、この3つ</Label></In><div style={{display: 'grid', gap: 30, marginTop: 75}}>{data.checklist.map((item, i) => <In key={item.number} delay={15 + i * 15} style={{display: 'grid', gridTemplateColumns: '100px 190px 1fr', border: `3px solid ${color.line}`, borderRadius: 24, overflow: 'hidden', minHeight: 230}}><div style={{display: 'grid', placeItems: 'center', background: color.blue, color: '#fff', fontSize: 44, fontWeight: 1000}}>{item.number}</div><div style={{display: 'grid', placeItems: 'center', color: color.red, fontSize: 51, fontWeight: 1000}}>{item.title}</div><div style={{padding: 29, fontSize: 28, lineHeight: 1.45, fontWeight: 800}}><span style={{color: color.blue}}>社保</span>：{item.social}<hr style={{border: 0, borderTop: `2px dashed ${color.line}`, margin: '18px 0'}}/><span style={{color: color.red}}>国保</span>：{item.national}</div></In>)}</div></Scene>;

const Ending = ({data}: {data: ShahoKokuhoGuideData}) => <Scene duration={180}><In delay={4} style={{fontSize: 62, fontWeight: 1000, marginTop: 100}}>{data.ending.lead}</In><In delay={18} style={{fontSize: 82, lineHeight: 1.25, color: color.red, fontWeight: 1000, marginTop: 55}}>{data.ending.emphasis}</In><In delay={38} style={{marginTop: 150, padding: '55px 38px', border: `7px solid ${color.red}`, borderRadius: 28, fontSize: 51, lineHeight: 1.5, fontWeight: 1000, textAlign: 'center'}}>🛡️<br/>{data.ending.action}</In><In delay={65} style={{marginTop: 150, borderRadius: 18, background: color.blue, color: '#fff', padding: 25, fontSize: 24, lineHeight: 1.55}}>{data.ending.note}</In></Scene>;

export const ShahoKokuhoDifferenceGuide = ({data}: {data: ShahoKokuhoGuideData}) => <AbsoluteFill>
  <Sequence durationInFrames={180}><Opening data={data}/></Sequence>
  <Sequence from={180} durationInFrames={210}><Medical data={data}/></Sequence>
  <Sequence from={390} durationInFrames={300}><Leave data={data}/></Sequence>
  <Sequence from={690} durationInFrames={210}><Premium data={data}/></Sequence>
  <Sequence from={900} durationInFrames={270}><Checklist data={data}/></Sequence>
  <Sequence from={1170} durationInFrames={180}><Ending data={data}/></Sequence>
</AbsoluteFill>;
