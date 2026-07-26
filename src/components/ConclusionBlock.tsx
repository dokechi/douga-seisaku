import type {ReactNode} from 'react';
import {theme} from '../styles/theme';

export const ConclusionBlock = ({lead, children}: {lead: string; children: ReactNode}) => <div style={{borderTop: `2px solid ${theme.gray}`, paddingTop: 34}}><div style={{fontSize: 48, fontWeight: 800, marginBottom: 18}}>{lead}</div><div style={{fontSize: 55, lineHeight: 1.55, whiteSpace: 'pre-line', color: theme.red, fontWeight: 850}}>{children}</div></div>;
