import {Composition} from 'remotion';
import {MainVideo} from './MainVideo';
import {insuranceSample} from './data/insurance-sample';

export const RemotionRoot = () => <Composition id="InsuranceShort" component={MainVideo} durationInFrames={900} fps={30} width={1080} height={1920} defaultProps={{data: insuranceSample}} />;
