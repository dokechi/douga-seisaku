import type {ReactNode} from 'react';

export const SectionTitle = ({children, size = 76}: {children: ReactNode; size?: number}) => <h1 style={{fontSize: size, lineHeight: 1.36, letterSpacing: -2, margin: 0, fontWeight: 800, whiteSpace: 'pre-line'}}>{children}</h1>;
