import type {ReactNode} from 'react';

const IconShell = ({children, color = '#e83c43'}: {children: ReactNode; color?: string}) => <div style={{width: 110, height: 110, borderRadius: 28, background: color, display: 'grid', placeItems: 'center', color: 'white', fontSize: 62, fontWeight: 900, boxShadow: '0 14px 24px rgba(16,37,75,.18)'}}>{children}</div>;

export const HospitalIcon = () => <IconShell><span style={{transform: 'translateY(-4px)'}}>✚</span></IconShell>;
export const CalendarIcon = ({day = '30'}: {day?: string}) => <IconShell color="#1769d2"><div style={{fontSize: 39, border: '5px solid white', borderRadius: 9, padding: '4px 9px', lineHeight: 1}}>{day}</div></IconShell>;
export const ShieldIcon = () => <IconShell color="#1769d2"><span>◆</span></IconShell>;
export const MoneyIcon = () => <IconShell color="#14a176"><span>¥</span></IconShell>;

export const MiniIcon = ({type}: {type: 'family' | 'bill' | 'calendar'}) => <span style={{fontSize: 54}}>{type === 'family' ? '♟♟' : type === 'bill' ? '¥' : '▦'}</span>;
