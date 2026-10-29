// Illustrations for the project cards. Add a new one here and reference it by name in data.jsx.

function Dashboard() {
  return (
    <svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0f2a1c" /><stop offset="1" stopColor="#062026" />
        </linearGradient>
      </defs>
      <rect width="600" height="340" fill="url(#g1)" />
      <rect x="40" y="40" width="520" height="260" rx="12" fill="#0b1411" stroke="#1f3a2c" />
      <rect x="40" y="40" width="110" height="260" rx="12" fill="#0e1a15" />
      <g fill="#4ade80" opacity=".8">
        <rect x="58" y="70" width="70" height="8" rx="4" />
        <rect x="58" y="94" width="50" height="8" rx="4" opacity=".4" />
        <rect x="58" y="118" width="60" height="8" rx="4" opacity=".4" />
        <rect x="58" y="142" width="44" height="8" rx="4" opacity=".4" />
      </g>
      {[170, 292, 414].map((x, i) => (
        <g key={x}>
          <rect x={x} y="62" width={i === 2 ? 126 : 110} height="60" rx="8" fill="#12201a" />
          <rect x={x + 14} y="80" width="40" height="6" rx="3" fill="#5b7c6c" />
          <rect x={x + 14} y="96" width={[70, 60, 80][i]} height="12" rx="4" fill="#e6ece9" />
        </g>
      ))}
      <rect x="170" y="136" width="370" height="146" rx="8" fill="#12201a" />
      <polyline points="186,256 230,236 270,244 310,206 350,214 390,178 430,190 470,160 520,170" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinejoin="round" />
      <polyline points="186,266 230,258 270,262 310,240 350,246 390,228 430,236 470,214 520,220" fill="none" stroke="#22d3ee" strokeWidth="2" opacity=".7" />
    </svg>
  );
}

function Movies() {
  const posters = ['#a78bfa', '#f472b6', '#22d3ee', '#fbbf24'];
  return (
    <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="225" fill="#1b1430" />
      {posters.map((c, i) => <rect key={c} x={40 + i * 78} y="38" width="66" height="98" rx="6" fill={c} />)}
      <g fill="#e6ece9" opacity=".8">
        {[54, 44, 58, 40].map((w, i) => <rect key={i} x={40 + i * 78} y="150" width={w} height="8" rx="4" />)}
      </g>
      <g fill="#fbbf24" fontFamily="monospace" fontSize="13">
        <text x="40" y="184">★★★★☆</text>
        <text x="196" y="184">✓ watched</text>
      </g>
    </svg>
  );
}

function Receipt() {
  const bars = [[0, 3], [6, 1.5], [10, 4], [17, 2], [22, 3], [28, 1.5], [32, 4], [39, 2], [44, 3], [50, 1.5]];
  return (
    <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="225" fill="#0d1210" />
      <rect x="60" y="30" width="150" height="170" rx="6" fill="#e6ece9" />
      <g fill="#14201b" fontFamily="monospace" fontSize="11">
        <text x="76" y="56">RECEIPT #0042</text>
        <text x="76" y="82">Item A ..... 4.00</text>
        <text x="76" y="100">Item B ..... 2.50</text>
        <text x="76" y="118">Item C ..... 7.25</text>
        <text x="76" y="146" fontWeight="700">TOTAL ..... 13.75</text>
      </g>
      <g fill="#14201b">{bars.map(([x, w]) => <rect key={x} x={76 + x} y="162" width={w} height="24" />)}</g>
      <rect x="236" y="70" width="110" height="80" rx="10" fill="#12201a" stroke="#4ade80" strokeOpacity=".5" />
      <line x1="250" y1="110" x2="332" y2="110" stroke="#f87171" strokeWidth="2" />
    </svg>
  );
}

export const thumbs = { dashboard: Dashboard, movies: Movies, receipt: Receipt };
