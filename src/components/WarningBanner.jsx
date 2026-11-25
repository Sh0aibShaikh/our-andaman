export default function WarningBanner({ banners }) {
  if (!banners?.length) return null
  return (
    <div className="stack" role="region" aria-label="Reminders">
      {banners.map((b) => (
        <div key={b.id} className={`banner ${b.level === 'warning' ? 'warning' : 'info'}`}>
          <span className="b-icon" aria-hidden="true">{b.level === 'warning' ? '⚠️' : '🌴'}</span>
          <div className="b-body">
            <h3>{b.title}</h3>
            <p>{b.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
