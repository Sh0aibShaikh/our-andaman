const TABS = [
  { id: 'today', label: 'Today', icon: '🌅' },
  { id: 'checklist', label: 'Checklist', icon: '🎒' },
  { id: 'itinerary', label: 'Itinerary', icon: '🗺️' },
  { id: 'verify', label: 'Verify', icon: '📋' },
  { id: 'more', label: 'More', icon: '✨' },
]

export default function TabBar({ active, onChange }) {
  return (
    <nav className="tab-bar" aria-label="Main">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={active === tab.id ? 'active' : ''}
          onClick={() => onChange(tab.id)}
          aria-current={active === tab.id ? 'page' : undefined}
        >
          <span className="icon" aria-hidden="true">
            {tab.icon}
          </span>
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
