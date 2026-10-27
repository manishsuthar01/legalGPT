const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createExactHomepageOgCard() {
  const width = 1200;
  const height = 630;

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#583AFE" stop-opacity="0.30"/>
        <stop offset="100%" stop-color="#7C3AED" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="emeraldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10B981" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#059669" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#583AFE"/>
        <stop offset="100%" stop-color="#7C3AED"/>
      </linearGradient>
      <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#583AFE"/>
        <stop offset="100%" stop-color="#4F35E8"/>
      </linearGradient>
      <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
        <feDropShadow dx="0" dy="16" stdDeviation="28" flood-color="#000000" flood-opacity="0.40"/>
      </filter>
      <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="115%">
        <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.30"/>
      </filter>
    </defs>

    <style>
      .font-sans { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Plus Jakarta Sans", Helvetica, Arial, sans-serif; }
      .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
    </style>

    <!-- Outer Dark Ambient Backdrop -->
    <rect width="${width}" height="${height}" fill="#080C14"/>
    <circle cx="280" cy="80" r="320" fill="url(#purpleGlow)"/>
    <circle cx="950" cy="550" r="280" fill="url(#emeraldGlow)"/>

    <!-- Main Framed White Application Card (Wollo Theme) -->
    <rect x="35" y="24" width="1130" height="582" rx="24" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" filter="url(#shadow)"/>

    <!-- 1. Header Navigation Bar -->
    <g transform="translate(68, 50)">
      <!-- Logo Shield Icon -->
      <rect x="0" y="0" width="34" height="34" rx="10" fill="url(#logoGrad)"/>
      <path d="M17 7 L26 11 V18 C26 23.5 22.2 28.5 17 30 C11.8 28.5 8 23.5 8 18 V11 Z" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round"/>
      <path d="M13 18 L16 21 L22 15" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- Logo Text -->
      <text x="44" y="24" class="font-sans" font-size="22" font-weight="800" fill="#0A0D14" letter-spacing="-0.5">legal<tspan fill="#583AFE">gpt</tspan></text>

      <!-- Center Floating Pill Menu -->
      <g transform="translate(320, -3)">
        <rect x="0" y="0" width="380" height="38" rx="19" fill="#F3F4F6" stroke="#E5E7EB" stroke-width="1"/>
        <text x="32" y="24" class="font-sans" font-size="12" font-weight="700" fill="#0A0D14">Features</text>
        <text x="105" y="24" class="font-sans" font-size="12" font-weight="500" fill="#4B5565">Analysis</text>
        <text x="178" y="24" class="font-sans" font-size="12" font-weight="500" fill="#4B5565">Tools</text>
        <text x="235" y="24" class="font-sans" font-size="12" font-weight="500" fill="#4B5565">Security</text>
        <text x="306" y="24" class="font-sans" font-size="12" font-weight="500" fill="#4B5565">Pipeline</text>
      </g>

      <!-- Right Header Actions -->
      <g transform="translate(860, -2)">
        <text x="0" y="24" class="font-sans" font-size="13" font-weight="600" fill="#0A0D14">Log in</text>
        <rect x="58" y="0" width="144" height="36" rx="18" fill="#0A0D14"/>
        <text x="82" y="23" class="font-sans" font-size="12" font-weight="600" fill="#FFFFFF">Get Started Free</text>
        <path d="M184 18 L191 18 M188 15 L191 18 L188 21" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </g>

    <!-- 2. Hero Headline Section -->
    <g transform="translate(600, 138)">
      <!-- 100% Free Badge -->
      <g transform="translate(-155, 0)">
        <rect x="0" y="0" width="310" height="26" rx="13" fill="#F3F4F6" stroke="#E5E7EB" stroke-width="1"/>
        <text x="155" y="17" class="font-sans" font-size="11" font-weight="600" fill="#4B5565" text-anchor="middle">100% Free AI Contract Review &amp; Risk Detection</text>
      </g>

      <!-- Main Headline -->
      <text x="0" y="62" class="font-sans" font-size="38" font-weight="500" fill="#0A0D14" letter-spacing="-1.2" text-anchor="middle">
        Maximize Your Contract <tspan fill="#583AFE" font-weight="600">Intelligence</tspan>
      </text>

      <!-- Subtitle -->
      <text x="0" y="90" class="font-sans" font-size="13" font-weight="400" fill="#4B5565" text-anchor="middle">
        Uncover hidden liabilities, one-sided indemnity terms, and missing protections before you sign. Free, attorney-grade redlines in seconds.
      </text>
    </g>

    <!-- CTA Buttons (Separated from text-anchor:middle for clean layout) -->
    <g transform="translate(410, 245)">
      <!-- Primary Button: Analyze Contract Free -->
      <rect x="0" y="0" width="186" height="36" rx="18" fill="url(#btnGrad)"/>
      <text x="20" y="23" class="font-sans" font-size="12" font-weight="600" fill="#FFFFFF">Analyze Contract Free</text>
      <path d="M158 18 L165 18 M162 15 L165 18 L162 21" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- Secondary Button: Explore Interactive Demo -->
      <rect x="198" y="0" width="182" height="36" rx="18" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
      <text x="216" y="23" class="font-sans" font-size="12" font-weight="500" fill="#0A0D14">Explore Interactive Demo</text>
    </g>

    <!-- 3. Live Interactive MacWindow Preview (The Real Homepage Dashboard) -->
    <g transform="translate(68, 305)">
      <!-- Mac Window Container -->
      <rect x="0" y="0" width="1064" height="248" rx="16" fill="#0B1120" stroke="#334155" stroke-width="1.2" filter="url(#cardShadow)"/>

      <!-- Window Top Header Bar -->
      <rect x="0" y="0" width="1064" height="38" rx="16" fill="#1E293B"/>
      <rect x="0" y="22" width="1064" height="16" fill="#1E293B"/>
      <line x1="0" y1="38" x2="1064" y2="38" stroke="#334155" stroke-width="1"/>

      <!-- Mac Traffic Lights -->
      <circle cx="20" cy="19" r="5" fill="#EF4444"/>
      <circle cx="36" cy="19" r="5" fill="#F59E0B"/>
      <circle cx="52" cy="19" r="5" fill="#10B981"/>

      <!-- Document Title -->
      <text x="76" y="23" class="font-mono" font-size="12" fill="#94A3B8">📄 master_services_agreement.pdf</text>

      <!-- Top Badges -->
      <g transform="translate(770, 8)">
        <rect x="0" y="0" width="155" height="22" rx="11" fill="#881337" fill-opacity="0.4" stroke="#F43F5E" stroke-opacity="0.4" stroke-width="1"/>
        <circle cx="12" cy="11" r="3.5" fill="#F43F5E"/>
        <text x="24" y="15" class="font-mono" font-size="10" font-weight="700" fill="#FDA4AF">Risk Score: 78/100 (High)</text>

        <rect x="165" y="0" width="120" height="22" rx="11" fill="#064E3B" fill-opacity="0.4" stroke="#10B981" stroke-opacity="0.4" stroke-width="1"/>
        <text x="178" y="15" class="font-mono" font-size="10" font-weight="700" fill="#6EE7B7">✓ 3 Flags Remediated</text>
      </g>

      <!-- Inside Grid Left: Contract Clause Redline Box -->
      <g transform="translate(18, 50)">
        <rect x="0" y="0" width="600" height="182" rx="12" fill="#1E293B" fill-opacity="0.7" stroke="#334155" stroke-width="1"/>

        <!-- Clause Header -->
        <text x="16" y="24" class="font-mono" font-size="11" font-weight="700" fill="#FB7185">§8.2 INDEMNIFICATION &amp; REIMBURSEMENT</text>
        <rect x="475" y="11" width="110" height="18" rx="4" fill="#881337" fill-opacity="0.6" stroke="#F43F5E" stroke-opacity="0.3" stroke-width="1"/>
        <text x="484" y="24" class="font-mono" font-size="9" font-weight="700" fill="#FDA4AF">CRITICAL LIABILITY</text>

        <!-- Strike-through Original Text -->
        <text x="16" y="48" class="font-mono" font-size="11" fill="#64748B" text-decoration="line-through">
          &quot;Vendor shall defend, indemnify, and hold harmless Customer from and against
        </text>
        <text x="16" y="65" class="font-mono" font-size="11" fill="#64748B" text-decoration="line-through">
          any and all losses, liabilities, costs, without limitation or cap whatsoever.&quot;
        </text>

        <!-- Green Suggested Redline Card -->
        <g transform="translate(16, 80)">
          <rect x="0" y="0" width="568" height="86" rx="8" fill="#064E3B" fill-opacity="0.4" stroke="#10B981" stroke-opacity="0.5" stroke-width="1"/>
          <text x="14" y="22" class="font-mono" font-size="10" font-weight="700" fill="#34D399">✓ ATTORNEY-GRADE BALANCED REDLINE</text>
          <text x="14" y="44" class="font-mono" font-size="11" fill="#A7F3D0">
            &quot;Vendor&apos;s aggregate liability under this Section shall not exceed the total fees
          </text>
          <text x="14" y="62" class="font-mono" font-size="11" fill="#A7F3D0">
            actually paid by Customer in preceding 12 months with mutual carve-outs.&quot;
          </text>
        </g>
      </g>

      <!-- Inside Grid Right: Smart Redline Advisory Panel -->
      <g transform="translate(632, 50)">
        <rect x="0" y="0" width="414" height="182" rx="12" fill="#1E293B" fill-opacity="0.7" stroke="#334155" stroke-width="1"/>

        <!-- Header -->
        <text x="18" y="26" class="font-sans" font-size="13" font-weight="700" fill="#FFFFFF">Uncapped Consequential Liability</text>
        <rect x="355" y="13" width="42" height="18" rx="4" fill="#881337" fill-opacity="0.6" stroke="#F43F5E" stroke-opacity="0.3" stroke-width="1"/>
        <text x="363" y="25" class="font-mono" font-size="9" font-weight="700" fill="#FDA4AF">HIGH</text>

        <!-- Explanation -->
        <text x="18" y="52" class="font-sans" font-size="11" fill="#94A3B8">
          The counterparty agrees to indemnify without liability caps,
        </text>
        <text x="18" y="69" class="font-sans" font-size="11" fill="#94A3B8">
          exposing your business to catastrophic unlimited damages.
        </text>

        <!-- Statutory Benchmarking -->
        <g transform="translate(18, 90)">
          <rect x="0" y="0" width="378" height="26" rx="6" fill="#0F172A" stroke="#334155" stroke-width="1"/>
          <text x="12" y="17" class="font-mono" font-size="10" fill="#818CF8">Statutory Precedent: UCC § 2-719 Mutual Cap Applied</text>
        </g>

        <!-- Purple Button: Recommended Redline Applied -->
        <g transform="translate(18, 128)">
          <rect x="0" y="0" width="378" height="38" rx="8" fill="url(#btnGrad)"/>
          <circle cx="106" cy="19" r="8" fill="#FFFFFF" fill-opacity="0.2"/>
          <path d="M102 19 L105 22 L110 16" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="122" y="23" class="font-sans" font-size="11" font-weight="600" fill="#FFFFFF">Recommended Redline Applied</text>
        </g>
      </g>
    </g>

    <!-- Bottom Metadata / Trust Bar -->
    <g transform="translate(68, 578)">
      <circle cx="4" cy="4" r="3.5" fill="#10B981"/>
      <text x="14" y="8" class="font-sans" font-size="10" font-weight="500" fill="#64748B">In-Memory Processing</text>

      <circle cx="154" cy="4" r="3.5" fill="#583AFE"/>
      <text x="164" y="8" class="font-sans" font-size="10" font-weight="500" fill="#64748B">Zero AI Model Training</text>

      <circle cx="320" cy="4" r="3.5" fill="#3B82F6"/>
      <text x="330" y="8" class="font-sans" font-size="10" font-weight="500" fill="#64748B">Statutory Research Verified</text>

      <text x="1064" y="8" class="font-mono" font-size="11" font-weight="600" fill="#0A0D14" text-anchor="end">legalgpt.ai</text>
    </g>
  </svg>
  `;

  const pngBuffer = await sharp(Buffer.from(svg))
    .png({ quality: 95, compressionLevel: 9 })
    .toBuffer();

  const destinations = [
    'public/opengraph-image.png',
    'public/twitter-image.png',
    'public/images/og-image.png',
    'public/images/twitter-card.png',
    'src/app/opengraph-image.png',
    'src/app/twitter-image.png'
  ];

  for (const dest of destinations) {
    const fullPath = path.resolve(dest);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, pngBuffer);
    console.log(`Generated high-res 1200x630 card: ${dest}`);
  }
}

createExactHomepageOgCard().catch(console.error);
