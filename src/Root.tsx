import {Composition} from 'remotion';
import {MainVideo} from './MainVideo';
import {insuranceSample} from './data/insurance-sample';
import {RetirementInsuranceComic3D} from './RetirementInsuranceComic3D';
import {retirementInsuranceData} from './data/retirement-insurance';
import {ShahoKokuhoDifferenceGuide} from './ShahoKokuhoDifferenceGuide';
import {shahoKokuhoGuideData} from './data/shaho-kokuho-guide';

export const RemotionRoot = () => <>
  <Composition id="InsuranceShort" component={MainVideo} durationInFrames={900} fps={30} width={1080} height={1920} defaultProps={{data: insuranceSample}} />
  <Composition id="TaishokuShakaihokenKokuhou3D" component={RetirementInsuranceComic3D} durationInFrames={1200} fps={30} width={1080} height={1920} defaultProps={{data: retirementInsuranceData}} />
  <Composition id="ShahoKokuhoDifferenceGuide" component={ShahoKokuhoDifferenceGuide} durationInFrames={1020} fps={30} width={1080} height={1920} defaultProps={{data: shahoKokuhoGuideData}} />
</>;
