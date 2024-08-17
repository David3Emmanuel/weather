export default function ReportData({reportKey, value}: {
    reportKey: string,
    value: any
}) {
    return <div style={{display: 'flex', width: '100%', gap: 10, alignContent: 'space-between'}}>
        <p style={{flex: 1, fontWeight: 500, margin: 0}}>{reportKey}</p>
        <p style={{width: 100, margin: 0}}>{value}</p>
    </div>
}