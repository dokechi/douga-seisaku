import type {CSSProperties, ReactNode} from 'react';
import {AbsoluteFill, Easing, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {ShahoKokuhoGuideData} from './data/shaho-kokuho-guide';

const color = {navy: '#071b35', blue: '#1479c9', red: '#e3293d', white: '#ffffff', ink: '#0b213e', gray: '#aab3bf'};
const fontFamily = '"Noto Sans JP", "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif';

const Base = ({children, dark = false, style}: {children: ReactNode; dark?: boolean; style?: CSSProperties}) => (
  <AbsoluteFill style={{backgroundColor: dark ? color.navy : color.white, color: dark ? color.white : color.ink, fontFamily, overflow: 'hidden', ...style}}>{children}</AbsoluteFill>
);

const Scene1 = () => {
  const frame = useCurrentFrame();
  const wipe = interpolate(frame, [5, 23], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const line = interpolate(frame, [95, 104], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <Base dark>
    <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center'}}>
      <div style={{fontSize: 94, lineHeight: 1.34, fontWeight: 900, letterSpacing: -4, clipPath: `inset(0 ${100 - wipe}% 0 0)`}}>
        退職前、<br/><span style={{color: color.red}}>病院代</span>しか見てない？
      </div>
    </div>
    <div style={{position: 'absolute', left: `${(100-line)/2}%`, top: 960, width: `${line}%`, height: 3, background: color.white}}/>
  </Base>;
};

const Scene2 = () => {
  const frame = useCurrentFrame();
  const enter = spring({frame, fps: 30, config: {damping: 20, stiffness: 110}});
  const close = interpolate(frame, [105, 129], [0, 50], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const but = interpolate(frame, [122, 128, 134], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <Base>
    <div style={{position: 'absolute', inset: 0, display: 'flex', transform: `scaleX(${enter})`}}>
      <div style={{width: '50%', background: '#eef7ff', borderRight: '1px solid #b9cadb'}}/>
      <div style={{width: '50%', background: '#f5f8fb', borderLeft: '1px solid #b9cadb'}}/>
    </div>
    <div style={{position: 'absolute', top: 245, left: 0, right: 0, display: 'flex', justifyContent: 'space-around', fontSize: 62, fontWeight: 900}}><span>社保</span><span>国保</span></div>
    <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center'}}>
      <div style={{fontSize: 76, lineHeight: 1.4, fontWeight: 900}}>病院では<br/>どちらも原則<span style={{fontSize: 110}}>3割</span>負担</div>
    </div>
    <div style={{position: 'absolute', bottom: 260, left: 0, right: 0, textAlign: 'center', fontSize: 35, fontWeight: 700}}>高額療養費制度もある</div>
    <div style={{position: 'absolute', zIndex: 2, top: 0, bottom: 0, left: 0, width: `${close}%`, background: color.navy}}/>
    <div style={{position: 'absolute', zIndex: 2, top: 0, bottom: 0, right: 0, width: `${close}%`, background: color.navy}}/>
    <div style={{position: 'absolute', zIndex: 3, inset: 0, display: 'grid', placeItems: 'center', color: color.white, fontSize: 100, fontWeight: 900, opacity: but}}>でも</div>
  </Base>;
};

const Calendar = ({day}: {day: number}) => <div style={{width: 940, display: 'grid', gridTemplateColumns: 'repeat(15, 1fr)', gap: 7}}>
  {Array.from({length: 30}, (_, index) => {
    const current = index + 1;
    const active = current <= day;
    const waiting = current <= 3;
    return <div key={current} style={{height: 82, borderRadius: 5, border: `2px solid ${waiting ? '#87919d' : color.blue}`, background: active ? (waiting ? color.gray : color.blue) : color.white, color: active ? color.white : (waiting ? '#65717e' : color.blue), display: 'grid', placeItems: 'center', fontSize: 25, fontWeight: 900, transform: active && current === day ? 'scale(1.11)' : 'scale(1)'}}>{current}</div>;
  })}
</div>;

const Scene3 = ({data}: {data: ShahoKokuhoGuideData}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [48, 318], [0, 30], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.linear});
  const day = Math.min(30, Math.max(0, Math.floor(progress) + (progress > 0 ? 1 : 0)));
  const eligibleProgress = Math.max(0, progress - data.calculation.waitingDays);
  const amount = Math.min(data.calculation.totalAllowance, eligibleProgress * data.calculation.dailyAllowance);
  const displayAmount = amount < 500 ? '0円' : `約${(amount / 10000).toFixed(1)}万円`;
  const conclusion = interpolate(frame, [324, 337], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <Base style={{backgroundColor: conclusion > .5 ? color.white : '#f8fbfe'}}>
    <div style={{position: 'absolute', top: 78, left: 70, right: 70, textAlign: 'center', fontSize: 62, lineHeight: 1.3, fontWeight: 900}}>病気やケガで<br/><span style={{fontSize: 82}}>30日</span>働けなかったら？</div>
    <div style={{position: 'absolute', top: 415, left: 70}}>
      <Calendar day={day}/>
      <div style={{display: 'flex', marginTop: 19, fontSize: 24, fontWeight: 800}}><div style={{width: 190, color: '#68727e'}}>1〜3日目　待期</div><div style={{marginLeft: 10, color: color.blue}}>4〜30日目　支給対象となり得る期間</div></div>
    </div>
    <div style={{position: 'absolute', top: 750, left: 70, right: 70, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 34}}>
      <div style={{borderTop: `5px solid ${color.blue}`, paddingTop: 24}}>
        <div style={{fontSize: 35, fontWeight: 900, color: color.blue}}>社保｜傷病手当金</div>
        <div style={{height: 180, display: 'flex', alignItems: 'center', fontSize: 75, fontWeight: 900, letterSpacing: -3}}>{displayAmount}</div>
        <div style={{fontSize: 23, lineHeight: 1.7, color: '#52657a'}}>標準報酬月額 38万円<br/>1日当たり概算 8,447円</div>
      </div>
      <div style={{borderTop: `5px solid ${color.red}`, paddingTop: 24}}>
        <div style={{fontSize: 35, fontWeight: 900, color: color.red}}>一般の国保</div>
        <div style={{height: 180, display: 'flex', alignItems: 'center', fontSize: 76, fontWeight: 900}}>0円</div>
        <div style={{fontSize: 30, lineHeight: 1.55, fontWeight: 800}}>傷病手当金は<br/>原則なし</div>
      </div>
    </div>
    <div style={{position: 'absolute', bottom: 95, left: 70, right: 70, fontSize: 23, lineHeight: 1.55, color: '#647487'}}>※社保の支給には要件があります。<br/>国保も条例・規約による例外があります。</div>
    <div style={{position: 'absolute', zIndex: 4, inset: 0, background: color.white, opacity: conclusion, display: 'grid', placeItems: 'center'}}>
      <div style={{fontSize: 91, lineHeight: 1.38, fontWeight: 900, letterSpacing: -4}}>差が出るのは、<br/>病院代より<br/><span style={{color: color.red, fontSize: 116}}>休んだ月。</span></div>
    </div>
  </Base>;
};

const Scene4 = ({data}: {data: ShahoKokuhoGuideData}) => {
  const frame = useCurrentFrame();
  return <Base>
    <div style={{position: 'absolute', top: 220, left: 110, right: 110}}>
      <div style={{fontSize: 51, fontWeight: 800, marginBottom: 110}}>退職前に確認するのは</div>
      {data.checklist.map((item, index) => {
        const reveal = interpolate(frame, [25 + index * 27, 40 + index * 27], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return <div key={item} style={{position: 'relative', width: 'fit-content', margin: '0 0 68px 85px', fontSize: index === 2 ? 110 : 93, lineHeight: 1.1, fontWeight: 900, color: index === 2 ? color.red : color.navy, opacity: reveal, transform: `translateY(${(1-reveal)*18}px)`}}>
          {item}
          {index === 2 && <div style={{position: 'absolute', left: 0, bottom: -22, width: `${interpolate(frame, [105, 140], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}%`, height: 9, background: color.red}}/>}
        </div>;
      })}
    </div>
  </Base>;
};

const Scene5 = () => {
  const frame = useCurrentFrame();
  const main = spring({frame: frame - 45, fps: 30, config: {damping: 18, stiffness: 85, mass: 1}});
  return <Base dark>
    <div style={{position: 'absolute', top: 280, left: 85, right: 85, fontSize: 59, lineHeight: 1.5, fontWeight: 800}}>社保の強さは、<br/>病院に行けることより</div>
    <div style={{position: 'absolute', top: 720, left: 85, right: 70, fontSize: 91, lineHeight: 1.35, fontWeight: 900, opacity: main, transform: `translateY(${(1-main)*30}px)`}}>生活が<br/><span style={{color: color.red}}>崩れにくい</span>こと。</div>
    <div style={{position: 'absolute', left: 85, bottom: 255, fontSize: 36, lineHeight: 1.55, fontWeight: 700, color: '#c8d7e8'}}>自由になる前に、<br/>失う制度を知る。</div>
  </Base>;
};

export const ShahoKokuhoDifferenceGuide = ({data}: {data: ShahoKokuhoGuideData}) => <AbsoluteFill>
  <Sequence durationInFrames={105}><Scene1/></Sequence>
  <Sequence from={105} durationInFrames={135}><Scene2/></Sequence>
  <Sequence from={240} durationInFrames={450}><Scene3 data={data}/></Sequence>
  <Sequence from={690} durationInFrames={165}><Scene4 data={data}/></Sequence>
  <Sequence from={855} durationInFrames={165}><Scene5/></Sequence>
</AbsoluteFill>;
