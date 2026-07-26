import {theme} from '../styles/theme';

export const PageIndicator = ({page}: {page: number}) => <div style={{position: 'absolute', right: 72, top: 58, color: theme.gray, fontSize: 38, fontWeight: 500, letterSpacing: 3}}>{page}/3</div>;
