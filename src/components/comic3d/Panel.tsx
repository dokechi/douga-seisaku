import type {CSSProperties, ReactNode} from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const Panel = ({children, delay = 0, side = 0, style}: {children: ReactNode; delay?: number; side?: number; style?: CSSProperties}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - delay, fps, config: {damping: 15, stiffness: 110, mass: 0.8}});
  const z = interpolate(enter, [0, 1], [-650, 0]);
  const x = interpolate(enter, [0, 1], [side * 480, 0]);
  return <div style={{background: '#fff', border: '6px solid #10254b', borderRadius: 32, boxShadow: '18px 24px 0 rgba(16,37,75,.14)', transform: `perspective(1200px) translate3d(${x}px,0,${z}px) rotateY(${side * -12 * (1 - enter)}deg) rotateX(${8 * (1 - enter)}deg)`, opacity: enter, ...style}}>{children}</div>;
};

export const Pop = ({children, delay = 0, style}: {children: ReactNode; delay?: number; style?: CSSProperties}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 11, stiffness: 170}});
  return <div style={{transform: `scale(${s})`, opacity: s, ...style}}>{children}</div>;
};
