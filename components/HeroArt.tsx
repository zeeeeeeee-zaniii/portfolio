export default function HeroArt() {
  return (
    <svg
      viewBox="0 0 520 400"
      role="img"
      aria-label="Illustration of a cozy desk with a laptop showing a website, a plant and a cup of coffee"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {/* wall */}
      <rect x="6" y="6" width="508" height="388" rx="20" fill="var(--surface-2)" />
      <rect x="6" y="6" width="508" height="388" rx="20" fill="none" stroke="var(--border)" />

      {/* dotted texture on wall */}
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 9 }).map((_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={44 + c * 54}
            cy={36 + r * 30}
            r="2"
            fill="var(--dot)"
          />
        ))
      )}

      {/* fairy lights */}
      <path
        d="M30 58 Q 150 108 260 62 T 492 58"
        fill="none"
        stroke="var(--caramel)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      {[
        [70, 76], [130, 88], [195, 80], [258, 70], [322, 78], [388, 86], [452, 74],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="10" fill="var(--accent)" opacity="0.22" />
          <circle cx={cx} cy={cy} r="4.5" fill="var(--caramel)" />
        </g>
      ))}

      {/* framed picture */}
      <rect x="392" y="118" width="86" height="66" rx="8" fill="var(--surface)" stroke="var(--border)" />
      <path d="M404 168 L430 142 L446 158 L458 148 L470 168 Z" fill="var(--accent)" opacity="0.75" />
      <circle cx="462" cy="132" r="6" fill="var(--caramel)" />

      {/* plant */}
      <g>
        <path d="M84 268 q-4 -34 14 -52 q6 26 -6 44" fill="var(--accent)" opacity="0.85" />
        <path d="M96 268 q2 -40 24 -54 q4 28 -12 48" fill="var(--caramel)" opacity="0.9" />
        <path d="M78 268 q-16 -22 -34 -26 q10 22 26 30" fill="var(--accent-deep)" opacity="0.55" />
        <path d="M62 268 h56 l-6 40 h-44 Z" fill="var(--accent-deep)" />
      </g>

      {/* desk */}
      <rect x="36" y="308" width="448" height="14" rx="7" fill="var(--accent-deep)" />
      <rect x="58" y="322" width="12" height="52" rx="5" fill="var(--accent-deep)" opacity="0.75" />
      <rect x="450" y="322" width="12" height="52" rx="5" fill="var(--accent-deep)" opacity="0.75" />

      {/* laptop */}
      <g>
        <rect x="168" y="168" width="184" height="122" rx="10" fill="var(--accent-deep)" />
        <rect x="178" y="178" width="164" height="102" rx="6" fill="var(--bg)" />
        {/* website on the screen */}
        <rect x="178" y="178" width="164" height="20" rx="6" fill="var(--accent)" />
        <circle cx="190" cy="188" r="3.5" fill="var(--bg)" />
        <rect x="202" y="185" width="34" height="6" rx="3" fill="var(--bg)" opacity="0.85" />
        <rect x="298" y="184" width="32" height="8" rx="4" fill="var(--bg)" />
        <rect x="190" y="210" width="86" height="10" rx="5" fill="var(--text)" opacity="0.75" />
        <rect x="190" y="226" width="64" height="7" rx="3.5" fill="var(--muted)" opacity="0.8" />
        <rect x="190" y="240" width="46" height="14" rx="7" fill="var(--caramel)" />
        <rect x="288" y="208" width="42" height="46" rx="6" fill="var(--surface-2)" stroke="var(--border)" />
        <circle cx="309" cy="224" r="8" fill="var(--accent)" opacity="0.8" />
        <rect x="296" y="238" width="26" height="5" rx="2.5" fill="var(--muted)" opacity="0.8" />
        <rect x="296" y="246" width="20" height="5" rx="2.5" fill="var(--muted)" opacity="0.55" />
        {/* base */}
        <path d="M156 290 h208 l12 16 a6 6 0 0 1 -5 9 H149 a6 6 0 0 1 -5 -9 Z" fill="var(--accent-deep)" opacity="0.9" />
      </g>

      {/* coffee cup */}
      <g>
        <path d="M398 276 q6 -12 0 -22 M414 276 q6 -12 0 -22" stroke="var(--caramel)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
        <path d="M386 282 h44 v14 a12 12 0 0 1 -12 12 h-20 a12 12 0 0 1 -12 -12 Z" fill="var(--accent)" />
        <path d="M430 286 q14 2 10 10 q-3 8 -14 6" fill="none" stroke="var(--accent)" strokeWidth="4" />
        <ellipse cx="408" cy="312" rx="30" ry="4" fill="var(--accent-deep)" opacity="0.3" />
      </g>

      {/* books */}
      <g>
        <rect x="96" y="288" width="52" height="10" rx="3" fill="var(--caramel)" />
        <rect x="102" y="276" width="44" height="10" rx="3" fill="var(--accent)" />
        <rect x="108" y="264" width="36" height="10" rx="3" fill="var(--accent-deep)" opacity="0.8" />
      </g>

      {/* sparkle accents */}
      <path d="M150 118 l3.5 8 8 3.5 -8 3.5 -3.5 8 -3.5 -8 -8 -3.5 8 -3.5 Z" fill="var(--caramel)" />
      <path d="M368 226 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 Z" fill="var(--accent)" />
    </svg>
  );
}
