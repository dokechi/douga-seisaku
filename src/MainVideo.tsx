import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import type {ReactNode} from 'react';
import type {VideoData} from './types';
import {theme} from './styles/theme';
import {PageIndicator} from './components/PageIndicator';
import {Divider} from './components/Divider';
import {HighlightText} from './components/HighlightText';
import {SectionTitle} from './components/SectionTitle';
import {StatList} from './components/StatList';
import {ConclusionBlock} from './components/ConclusionBlock';
import {Reveal} from './components/Reveal';

const Page = ({page, children}: {page: number; children: ReactNode}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15, 270, 300], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{backgroundColor: theme.background, color: theme.ink, fontFamily: theme.fontFamily, padding: `150px ${theme.sidePadding}px 95px`, opacity}}><PageIndicator page={page}/>{children}</AbsoluteFill>;
};

const ProblemPage = ({data}: {data: VideoData}) => <Page page={1}>
  <div style={{marginTop: 90}}>
    <Reveal delay={12}><SectionTitle size={105}>{data.title}</SectionTitle></Reveal>
    <Reveal delay={42}><div style={{fontSize: 105, lineHeight: 1.2}}><HighlightText>{data.titleAccent}</HighlightText>？</div></Reveal>
    <Reveal delay={72}><div style={{display: 'flex', alignItems: 'baseline', gap: 30, fontSize: 72, fontWeight: 800, margin: '90px 0 56px'}}>{data.subtitleLeft}<HighlightText>vs</HighlightText>{data.subtitleRight}</div></Reveal>
    <Divider />
    <Reveal delay={110} style={{fontSize: 53, lineHeight: 1.75, marginTop: 66, fontWeight: 650, whiteSpace: 'pre-line'}}>{data.premiseLead}<br/><HighlightText>{data.premiseAccent}</HighlightText>{data.premiseEnd}</Reveal>
  </div>
</Page>;

const EvidencePage = ({data}: {data: VideoData}) => <Page page={2}>
  <Reveal delay={8}><SectionTitle size={72}>{data.evidence.title}</SectionTitle></Reveal>
  <Reveal delay={42} style={{fontSize: 45, lineHeight: 1.6, fontWeight: 700, margin: '48px 0 38px', whiteSpace: 'pre-line'}}>{data.evidence.comparisonBefore} <HighlightText>vs</HighlightText> {data.evidence.comparisonAfter}<br/><HighlightText>{data.evidence.comparisonAccent}</HighlightText>入院で同額。</Reveal>
  <Divider />
  <Reveal delay={82} style={{fontSize: 42, lineHeight: 1.65, fontWeight: 700, margin: '36px 0 15px'}}>{data.evidence.shortStayLead}<br/><HighlightText>{data.evidence.shortStayAccent}</HighlightText>。</Reveal>
  <Reveal delay={112}><StatList stats={data.evidence.stats}/></Reveal>
  <Reveal delay={142} style={{fontSize: 27, lineHeight: 1.7, whiteSpace: 'pre-line', margin: '20px 0 30px'}}>{data.evidence.note}</Reveal>
  <Divider />
  <Reveal delay={170} style={{fontSize: 39, lineHeight: 1.65, fontWeight: 750, marginTop: 28}}>{data.evidence.takeawayLead}<br/><HighlightText underline>{data.evidence.takeawayAccent}</HighlightText></Reveal>
</Page>;

const ConclusionPage = ({data}: {data: VideoData}) => <Page page={3}>
  <Reveal delay={8}><SectionTitle size={54}>{data.conclusion.titleLead}<br/><HighlightText>{data.conclusion.titleAccent}</HighlightText></SectionTitle></Reveal>
  <div style={{margin: '34px 0'}}><Divider /></div>
  {data.conclusion.paragraphs.map((paragraph, index) => <Reveal key={paragraph} delay={42 + index * 40} style={{fontSize: 32, lineHeight: 1.65, whiteSpace: 'pre-line', marginBottom: 28, fontWeight: 520}}>{paragraph}</Reveal>)}
  <Reveal delay={174}><ConclusionBlock lead={data.conclusion.finalLead}>{data.conclusion.finalAccent}</ConclusionBlock></Reveal>
</Page>;

export const MainVideo = ({data}: {data: VideoData}) => <AbsoluteFill style={{background: theme.background}}>
  <Sequence durationInFrames={300}><ProblemPage data={data}/></Sequence>
  <Sequence from={300} durationInFrames={300}><EvidencePage data={data}/></Sequence>
  <Sequence from={600} durationInFrames={300}><ConclusionPage data={data}/></Sequence>
</AbsoluteFill>;
