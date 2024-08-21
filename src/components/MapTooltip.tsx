import './MapTooltip.css';

export default function MapTooltip({ condition, conditionIcon, top, left, show }: {
    condition: string,
    conditionIcon: string,
    top: number,
    left: number,
    show: boolean
}) {
    return <div className={`map-tooltip ${show?'':'hidden'}`} style={{ left, top }}>
        <div style={{
            position: 'relative',
            left: -25,
            top: -50 * 20 / 14,
        }}>
            <img src={conditionIcon} alt={condition} />
        </div>
    </div>
}
