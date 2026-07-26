import {HighlightText} from './HighlightText';

export const StatList = ({stats}: {stats: Array<{label: string; value: string}>}) => <div style={{fontSize: 48, lineHeight: 1.75, fontWeight: 650}}>{stats.map((stat) => <div key={stat.label} style={{display: 'flex', gap: 26}}><span style={{width: 154}}>{stat.label}</span><span>:</span><HighlightText>{stat.value}</HighlightText></div>)}</div>;
