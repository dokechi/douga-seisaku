import type {ReactNode} from 'react';
import {theme} from '../styles/theme';

export const HighlightText = ({children, underline = false}: {children: ReactNode; underline?: boolean}) => <span style={{color: theme.red, fontWeight: 800, borderBottom: underline ? `2px solid ${theme.red}` : undefined}}>{children}</span>;
