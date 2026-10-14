export default function Sprites() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <symbol id="atom-icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="7" style={{ fill: "var(--atom-b, #7F00FF)", fillOpacity: ".3" }} />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4.2"
          transform="rotate(-28 12 12)"
          fill="none"
          strokeWidth="1.25"
          style={{ stroke: "var(--atom-a, #00F2FE)", strokeOpacity: ".85" }}
        />
        <circle cx="12" cy="12" r="3.2" style={{ fill: "var(--atom-a, #00F2FE)" }} />
        <circle cx="12" cy="12" r="1.3" fill="#fff" fillOpacity=".85" />
        <circle cx="21" cy="8.9" r="1.7" style={{ fill: "var(--atom-a, #00F2FE)" }} />
      </symbol>
      <symbol id="flag-gb" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
        <clipPath id="gbA">
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id="gbB">
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
        <g clipPath="url(#gbA)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#gbB)" stroke="#C8102E" strokeWidth="4" />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </symbol>
      <symbol id="flag-es" viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice">
        <rect width="3" height="2" fill="#AA151B" />
        <rect y="0.5" width="3" height="1" fill="#F1BF00" />
      </symbol>
      <symbol id="be-x-icon" viewBox="0 0 24 24">
        <g
          style={{ fill: "var(--atom-a, #00F2FE)", fillOpacity: ".13", stroke: "var(--atom-a, #00F2FE)" }}
          strokeWidth="1.7"
          strokeLinejoin="round"
        >
          <ellipse cx="12" cy="12" rx="10.2" ry="3" transform="rotate(45 12 12)" />
          <ellipse cx="12" cy="12" rx="10.2" ry="3" transform="rotate(-45 12 12)" />
        </g>
        <circle cx="12" cy="12" r="3" style={{ fill: "var(--atom-b, #7F00FF)", fillOpacity: ".4" }} />
        <circle cx="12" cy="12" r="1.7" style={{ fill: "var(--atom-a, #00F2FE)" }} />
        <circle cx="12" cy="12" r=".7" fill="#fff" fillOpacity=".9" />
        <g style={{ fill: "var(--atom-a, #00F2FE)" }}>
          <circle cx="19.2" cy="19.2" r="1.9" />
          <circle cx="4.8" cy="4.8" r="1.9" />
          <circle cx="19.2" cy="4.8" r="1.9" />
          <circle cx="4.8" cy="19.2" r="1.9" />
        </g>
      </symbol>
      <symbol id="gumroad-logo" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="6.5" fill="#FF90E8" />
        <circle cx="10.9" cy="10.6" r="3.9" fill="none" stroke="#1A1325" strokeWidth="2.3" />
        <path
          d="M14.8 7.2V16.4A4 4 0 0 1 10.8 20.4H8.8"
          fill="none"
          stroke="#1A1325"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </symbol>
      <symbol id="flag-jp" viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice">
        <rect width="3" height="2" fill="#FFFFFF" />
        <circle cx="1.5" cy="1" r=".6" fill="#BC002D" />
      </symbol>
    </svg>
  );
}
