/**
 * NR Audio Visual - Original SVG Background Illustrations & Monogram
 * Domain: nraudiovisual.in
 * Pure vector art themed with CSS variables (no AI slop, no stock art)
 */

export const SVG_ICONS = {
  // Brand Logo Monogram: NR with soundwave / lens aperture motif
  logoMonogram: `
    <svg class="brand-monogram" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="NR Audio Visual Logo">
      <rect width="48" height="48" rx="8" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="1.5"/>
      <!-- N stem -->
      <path d="M12 34V14L22 34V14" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- R stem & loop with soundwave bars -->
      <path d="M26 34V14H33C35.2 14 37 15.8 37 18C37 20.2 35.2 22 33 22H26M32 22L37 34" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Soundwave / lens accent motif -->
      <circle cx="24" cy="24" r="19" stroke="var(--accent-hot)" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/>
      <path d="M39 20V28M42 22V26M6 22V26M9 20V28" stroke="var(--accent-hot)" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  // Soundwave & EQ backdrop
  soundWaveBackdrop: `
    <svg class="bg-soundwave-svg" viewBox="0 0 1200 180" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 90 Q 75 20, 150 90 T 300 90 T 450 90 T 600 90 T 750 90 T 900 90 T 1050 90 T 1200 90" stroke="var(--border-subtle)" stroke-width="1.5" fill="none"/>
      <path d="M0 90 Q 75 140, 150 90 T 300 90 T 450 90 T 600 90 T 750 90 T 900 90 T 1050 90 T 1200 90" stroke="var(--accent-hot)" stroke-width="1" stroke-dasharray="4 6" opacity="0.4" fill="none"/>
      <!-- Equalizer Bars -->
      <g opacity="0.35">
        <rect class="eq-bar" x="60" y="50" width="3" height="80" rx="1.5" fill="var(--text-muted)"/>
        <rect class="eq-bar" x="72" y="30" width="3" height="120" rx="1.5" fill="var(--accent-hot)"/>
        <rect class="eq-bar" x="84" y="60" width="3" height="60" rx="1.5" fill="var(--text-muted)"/>
        <rect class="eq-bar" x="96" y="20" width="3" height="140" rx="1.5" fill="var(--text-muted)"/>
        <rect class="eq-bar" x="108" y="45" width="3" height="90" rx="1.5" fill="var(--accent-hot)"/>
        <rect class="eq-bar" x="220" y="40" width="3" height="100" rx="1.5" fill="var(--text-muted)"/>
        <rect class="eq-bar" x="232" y="15" width="3" height="150" rx="1.5" fill="var(--accent-hot)"/>
        <rect class="eq-bar" x="244" y="55" width="3" height="70" rx="1.5" fill="var(--text-muted)"/>
        <rect class="eq-bar" x="500" y="35" width="3" height="110" rx="1.5" fill="var(--text-muted)"/>
        <rect class="eq-bar" x="512" y="10" width="3" height="160" rx="1.5" fill="var(--accent-hot)"/>
        <rect class="eq-bar" x="524" y="48" width="3" height="84" rx="1.5" fill="var(--text-muted)"/>
        <rect class="eq-bar" x="820" y="40" width="3" height="100" rx="1.5" fill="var(--text-muted)"/>
        <rect class="eq-bar" x="832" y="25" width="3" height="130" rx="1.5" fill="var(--accent-hot)"/>
        <rect class="eq-bar" x="844" y="50" width="3" height="80" rx="1.5" fill="var(--text-muted)"/>
        <rect class="eq-bar" x="1100" y="30" width="3" height="120" rx="1.5" fill="var(--accent-hot)"/>
        <rect class="eq-bar" x="1112" y="60" width="3" height="60" rx="1.5" fill="var(--text-muted)"/>
      </g>
    </svg>
  `,

  // Line Array Column PA Speaker Silhouette
  lineArraySilhouette: `
    <svg viewBox="0 0 160 380" fill="none" xmlns="http://www.w3.org/2000/svg" class="line-array-svg" style="max-height: 280px; width: auto;">
      <!-- Subwoofer Base -->
      <rect x="25" y="260" width="110" height="100" rx="4" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="2"/>
      <circle cx="80" cy="310" r="32" stroke="var(--border-strong)" stroke-width="1.5" stroke-dasharray="3 3"/>
      <circle cx="80" cy="310" r="14" fill="var(--border-subtle)"/>
      <!-- Subwoofer Feet & Handle -->
      <rect x="35" y="360" width="18" height="6" rx="2" fill="var(--border-strong)"/>
      <rect x="107" y="360" width="18" height="6" rx="2" fill="var(--border-strong)"/>
      <rect x="70" y="270" width="20" height="4" rx="2" fill="var(--border-medium)"/>
      <!-- Distance Extension Pole -->
      <rect x="76" y="140" width="8" height="120" fill="var(--border-strong)"/>
      <circle cx="80" cy="200" r="6" stroke="var(--accent-hot)" stroke-width="1.5"/>
      <!-- Column Line Array Modules (Curved vertical column) -->
      <rect x="68" y="20" width="24" height="120" rx="3" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="2"/>
      <!-- 6 Micro drivers in column -->
      <circle cx="80" cy="32" r="6" fill="var(--border-medium)" stroke="var(--accent-hot)" stroke-width="1"/>
      <circle cx="80" cy="50" r="6" fill="var(--border-medium)" stroke="var(--border-strong)" stroke-width="1"/>
      <circle cx="80" cy="68" r="6" fill="var(--border-medium)" stroke="var(--accent-hot)" stroke-width="1"/>
      <circle cx="80" cy="86" r="6" fill="var(--border-medium)" stroke="var(--border-strong)" stroke-width="1"/>
      <circle cx="80" cy="104" r="6" fill="var(--border-medium)" stroke="var(--accent-hot)" stroke-width="1"/>
      <circle cx="80" cy="122" r="6" fill="var(--border-medium)" stroke="var(--border-strong)" stroke-width="1"/>
    </svg>
  `,

  // Stage Spotlight Beams
  stageSpotlight: `
    <svg class="stage-light-beam" viewBox="0 0 300 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="beamGrad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stop-color="var(--accent-hot)" stop-opacity="0.45"/>
          <stop offset="35%" stop-color="var(--accent-gold)" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="var(--accent-hot)" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <!-- Par Fixture Head -->
      <polygon points="135,10 165,10 175,35 125,35" fill="var(--border-strong)"/>
      <circle cx="150" cy="35" r="16" fill="var(--accent-gold)" opacity="0.8"/>
      <!-- Cone Beam -->
      <polygon points="130,35 170,35 295,490 5,490" fill="url(#beamGrad)"/>
    </svg>
  `,

  // Projector & Screen Technical Illustration
  projectorScreenIllustration: `
    <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" class="tech-gear-illustration">
      <defs>
        <linearGradient id="projRay" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stop-color="var(--accent-hot)" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="var(--accent-gold)" stop-opacity="0.08"/>
        </linearGradient>
      </defs>
      <!-- Projector Unit -->
      <rect x="20" y="85" width="60" height="35" rx="3" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="1.5"/>
      <circle cx="75" cy="102" r="7" fill="var(--accent-hot)" stroke="var(--border-strong)" stroke-width="1"/>
      <line x1="28" y1="92" x2="52" y2="92" stroke="var(--border-medium)" stroke-width="1.5"/>
      <!-- Light Pyramid Projection Beam -->
      <polygon points="82,102 170,30 170,180" fill="url(#projRay)"/>
      <!-- Fast-fold Screen Frame -->
      <rect x="170" y="25" width="130" height="95" rx="2" fill="var(--bg-surface-elevated)" stroke="var(--border-strong)" stroke-width="2"/>
      <rect x="176" y="31" width="118" height="83" fill="var(--bg-surface)" stroke="var(--border-subtle)" stroke-width="1"/>
      <!-- Projection image test pattern -->
      <line x1="176" y1="31" x2="294" y2="114" stroke="var(--accent-hot)" stroke-width="1" stroke-dasharray="3 3"/>
      <line x1="294" y1="31" x2="176" y2="114" stroke="var(--accent-hot)" stroke-width="1" stroke-dasharray="3 3"/>
      <circle cx="235" cy="72" r="18" stroke="var(--border-strong)" stroke-width="1.5"/>
      <!-- Screen T-legs -->
      <line x1="190" y1="120" x2="190" y2="195" stroke="var(--border-strong)" stroke-width="2"/>
      <line x1="280" y1="120" x2="280" y2="195" stroke="var(--border-strong)" stroke-width="2"/>
      <line x1="175" y1="195" x2="205" y2="195" stroke="var(--border-strong)" stroke-width="3"/>
      <line x1="265" y1="195" x2="295" y2="195" stroke="var(--border-strong)" stroke-width="3"/>
    </svg>
  `,

  // Stage & Event Lighting Rig Illustration
  lightingRigIllustration: `
    <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" class="tech-gear-illustration">
      <defs>
        <linearGradient id="lightCone1" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stop-color="var(--accent-hot)" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="var(--accent-hot)" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="lightCone2" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stop-color="var(--accent-gold)" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="var(--accent-gold)" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <!-- Overhead Lighting Truss -->
      <line x1="20" y1="30" x2="300" y2="30" stroke="var(--border-strong)" stroke-width="3"/>
      <line x1="20" y1="45" x2="300" y2="45" stroke="var(--border-strong)" stroke-width="3"/>
      <path d="M20 30L35 45L50 30L65 45L80 30L95 45L110 30L125 45L140 30L155 45L170 30L185 45L200 30L215 45L230 30L245 45L260 30L275 45L290 30" stroke="var(--border-medium)" stroke-width="1.5"/>
      <!-- Moving Heads & Spotlights hung from truss -->
      <!-- Light 1 -->
      <rect x="65" y="47" width="22" height="18" rx="2" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="1.5"/>
      <circle cx="76" cy="65" r="7" fill="var(--accent-hot)"/>
      <polygon points="76,65 20,210 132,210" fill="url(#lightCone1)"/>
      <!-- Light 2 (Center Profile) -->
      <rect x="149" y="47" width="22" height="18" rx="2" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="1.5"/>
      <circle cx="160" cy="65" r="7" fill="var(--accent-gold)"/>
      <polygon points="160,65 110,210 210,210" fill="url(#lightCone2)"/>
      <!-- Light 3 -->
      <rect x="233" y="47" width="22" height="18" rx="2" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="1.5"/>
      <circle cx="244" cy="65" r="7" fill="var(--accent-hot)"/>
      <polygon points="244,65 188,210 300,210" fill="url(#lightCone1)"/>
    </svg>
  `,

  // LED Video Wall Modular Tile Illustration
  ledWallIllustration: `
    <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" class="tech-gear-illustration">
      <!-- Outer Truss Ground Support Frame -->
      <rect x="30" y="20" width="260" height="150" rx="3" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="2.5"/>
      <!-- Modular Cabinet Seams (4x3 modules) -->
      <line x1="95" y1="20" x2="95" y2="170" stroke="var(--border-medium)" stroke-width="1.5"/>
      <line x1="160" y1="20" x2="160" y2="170" stroke="var(--border-medium)" stroke-width="1.5"/>
      <line x1="225" y1="20" x2="225" y2="170" stroke="var(--border-medium)" stroke-width="1.5"/>
      <line x1="30" y1="70" x2="290" y2="70" stroke="var(--border-medium)" stroke-width="1.5"/>
      <line x1="30" y1="120" x2="290" y2="120" stroke="var(--border-medium)" stroke-width="1.5"/>
      <!-- Pixel Matrix Pattern with glowing dots -->
      <g opacity="0.8">
        <circle cx="50" cy="45" r="2.5" fill="var(--accent-hot)"/>
        <circle cx="75" cy="45" r="2.5" fill="var(--accent-gold)"/>
        <circle cx="115" cy="45" r="2.5" fill="var(--accent-hot)"/>
        <circle cx="140" cy="45" r="2.5" fill="var(--accent-gold)"/>
        <circle cx="180" cy="45" r="2.5" fill="var(--accent-hot)"/>
        <circle cx="205" cy="45" r="2.5" fill="var(--accent-gold)"/>
        <circle cx="245" cy="45" r="2.5" fill="var(--accent-hot)"/>
        <circle cx="270" cy="45" r="2.5" fill="var(--accent-gold)"/>
        
        <circle cx="50" cy="95" r="2.5" fill="var(--accent-gold)"/>
        <circle cx="75" cy="95" r="2.5" fill="var(--accent-hot)"/>
        <circle cx="115" cy="95" r="2.5" fill="var(--accent-gold)"/>
        <circle cx="140" cy="95" r="2.5" fill="var(--accent-hot)"/>
        <circle cx="180" cy="95" r="2.5" fill="var(--accent-gold)"/>
        <circle cx="205" cy="95" r="2.5" fill="var(--accent-hot)"/>
        <circle cx="245" cy="95" r="2.5" fill="var(--accent-gold)"/>
        <circle cx="270" cy="95" r="2.5" fill="var(--accent-hot)"/>

        <circle cx="50" cy="145" r="2.5" fill="var(--accent-hot)"/>
        <circle cx="75" cy="145" r="2.5" fill="var(--accent-gold)"/>
        <circle cx="115" cy="145" r="2.5" fill="var(--accent-hot)"/>
        <circle cx="140" cy="145" r="2.5" fill="var(--accent-gold)"/>
        <circle cx="180" cy="145" r="2.5" fill="var(--accent-hot)"/>
        <circle cx="205" cy="145" r="2.5" fill="var(--accent-gold)"/>
        <circle cx="245" cy="145" r="2.5" fill="var(--accent-hot)"/>
        <circle cx="270" cy="145" r="2.5" fill="var(--accent-gold)"/>
      </g>
      <!-- Ground Stack Rig Base -->
      <rect x="20" y="170" width="280" height="12" rx="2" fill="var(--border-strong)"/>
      <polygon points="50,182 40,210 60,210" fill="var(--border-strong)"/>
      <polygon points="160,182 150,210 170,210" fill="var(--border-strong)"/>
      <polygon points="270,182 260,210 280,210" fill="var(--border-strong)"/>
      <line x1="20" y1="210" x2="300" y2="210" stroke="var(--border-strong)" stroke-width="2"/>
    </svg>
  `,

  // XLR Cable & Flight Case Decorative Doodle
  cableAndXlrDoodle: `
    <svg viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="decorative-doodle" opacity="0.35">
      <!-- Coiled Audio Cable -->
      <path d="M10 60 C 40 10, 80 110, 120 60 C 160 10, 190 100, 220 50" stroke="var(--border-strong)" stroke-width="3" stroke-linecap="round"/>
      <path d="M20 70 C 50 20, 90 120, 130 70 C 170 20, 200 110, 230 60" stroke="var(--accent-hot)" stroke-width="1.5" stroke-dasharray="4 4" stroke-linecap="round"/>
      <!-- XLR Connector Body -->
      <rect x="180" y="42" width="34" height="16" rx="3" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="2"/>
      <circle cx="204" cy="50" r="1.5" fill="var(--accent-hot)"/>
      <circle cx="208" cy="46" r="1.5" fill="var(--accent-hot)"/>
      <circle cx="208" cy="54" r="1.5" fill="var(--accent-hot)"/>
    </svg>
  `,

  // Mixing Console 4-channel Fader Strip
  faderStripDoodle: `
    <div class="fader-group" style="padding: 1rem 0;">
      <div class="fader-track"><div class="fader-thumb" style="top: 25%;"></div></div>
      <div class="fader-track"><div class="fader-thumb" style="top: 60%;"></div></div>
      <div class="fader-track"><div class="fader-thumb" style="top: 40%;"></div></div>
      <div class="fader-track"><div class="fader-thumb" style="top: 75%;"></div></div>
    </div>
  `,

  // City Skyline: Hyderabad (Charminar arches + minarets + modern tech lines)
  skylineHyderabad: `
    <svg viewBox="0 0 400 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;" preserveAspectRatio="xMidYMax meet">
      <!-- Base Line -->
      <line x1="0" y1="135" x2="400" y2="135" stroke="var(--border-strong)" stroke-width="1.5"/>
      <!-- Charminar Central Monolith (Stylised architectural line art) -->
      <rect x="160" y="60" width="80" height="75" fill="none" stroke="var(--border-strong)" stroke-width="1.5"/>
      <!-- Central Archway -->
      <path d="M185 135V95C185 85, 215 85, 215 95V135" stroke="var(--border-strong)" stroke-width="1.5" fill="var(--bg-surface)"/>
      <!-- 4 Minarets with bulbous domes -->
      <rect x="150" y="30" width="12" height="105" stroke="var(--border-strong)" stroke-width="1.5"/>
      <path d="M150 30 C150 20, 162 20, 162 30 Z" fill="var(--accent-hot)" stroke="var(--border-strong)" stroke-width="1"/>
      <line x1="156" y1="20" x2="156" y2="12" stroke="var(--accent-hot)" stroke-width="1.5"/>
      
      <rect x="238" y="30" width="12" height="105" stroke="var(--border-strong)" stroke-width="1.5"/>
      <path d="M238 30 C238 20, 250 20, 250 30 Z" fill="var(--accent-hot)" stroke="var(--border-strong)" stroke-width="1"/>
      <line x1="244" y1="20" x2="244" y2="12" stroke="var(--accent-hot)" stroke-width="1.5"/>

      <!-- Modern Cyber Towers & Hitec City silhouette accents -->
      <polygon points="40,135 40,70 65,55 90,70 90,135" stroke="var(--border-medium)" stroke-width="1.2"/>
      <rect x="100" y="80" width="40" height="55" stroke="var(--border-medium)" stroke-width="1"/>
      <line x1="120" y1="80" x2="120" y2="135" stroke="var(--border-subtle)" stroke-width="1"/>
      <!-- East Cyber Towers -->
      <rect x="260" y="65" width="45" height="70" stroke="var(--border-medium)" stroke-width="1.2"/>
      <rect x="315" y="85" width="55" height="50" stroke="var(--border-medium)" stroke-width="1"/>
      <!-- Soundwave accents above skyline -->
      <path d="M120 40Q135 30 150 40" stroke="var(--accent-hot)" stroke-width="1" stroke-dasharray="2 3"/>
      <path d="M250 40Q265 30 280 40" stroke="var(--accent-hot)" stroke-width="1" stroke-dasharray="2 3"/>
    </svg>
  `,

  // City Skyline: Bangalore (Vidhana Soudha central dome, pillars, green IT parks)
  skylineBangalore: `
    <svg viewBox="0 0 400 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;" preserveAspectRatio="xMidYMax meet">
      <!-- Base Line -->
      <line x1="0" y1="135" x2="400" y2="135" stroke="var(--border-strong)" stroke-width="1.5"/>
      <!-- Vidhana Soudha Central Facade & Pillars -->
      <rect x="140" y="70" width="120" height="65" fill="none" stroke="var(--border-strong)" stroke-width="1.5"/>
      <!-- Pillars -->
      <line x1="155" y1="70" x2="155" y2="135" stroke="var(--border-medium)" stroke-width="1.5"/>
      <line x1="170" y1="70" x2="170" y2="135" stroke="var(--border-medium)" stroke-width="1.5"/>
      <line x1="185" y1="70" x2="185" y2="135" stroke="var(--border-medium)" stroke-width="1.5"/>
      <line x1="200" y1="70" x2="200" y2="135" stroke="var(--border-strong)" stroke-width="2"/>
      <line x1="215" y1="70" x2="215" y2="135" stroke="var(--border-medium)" stroke-width="1.5"/>
      <line x1="230" y1="70" x2="230" y2="135" stroke="var(--border-medium)" stroke-width="1.5"/>
      <line x1="245" y1="70" x2="245" y2="135" stroke="var(--border-medium)" stroke-width="1.5"/>
      <!-- Main Dome -->
      <path d="M175 70 C175 35, 225 35, 225 70 Z" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="1.5"/>
      <circle cx="200" cy="30" r="4" fill="var(--accent-gold)" stroke="var(--border-strong)" stroke-width="1"/>
      <line x1="200" y1="26" x2="200" y2="16" stroke="var(--accent-gold)" stroke-width="1.5"/>
      <!-- Side Domes -->
      <path d="M142 70 C142 55, 158 55, 158 70 Z" stroke="var(--border-medium)" stroke-width="1.2"/>
      <path d="M242 70 C242 55, 258 55, 258 70 Z" stroke="var(--border-medium)" stroke-width="1.2"/>
      <!-- Tech Park & Glass Towers (Indiranagar, Whitefield, Electronic City) -->
      <rect x="40" y="55" width="40" height="80" stroke="var(--border-medium)" stroke-width="1.2"/>
      <line x1="40" y1="75" x2="80" y2="75" stroke="var(--border-subtle)" stroke-width="1"/>
      <line x1="40" y1="95" x2="80" y2="95" stroke="var(--border-subtle)" stroke-width="1"/>
      <line x1="40" y1="115" x2="80" y2="115" stroke="var(--border-subtle)" stroke-width="1"/>
      <polygon points="90,135 90,85 125,70 125,135" stroke="var(--border-medium)" stroke-width="1.2"/>
      <!-- East Tech Towers -->
      <rect x="275" y="60" width="35" height="75" stroke="var(--border-medium)" stroke-width="1.2"/>
      <rect x="320" y="45" width="50" height="90" stroke="var(--border-medium)" stroke-width="1.2"/>
      <line x1="345" y1="45" x2="345" y2="135" stroke="var(--border-subtle)" stroke-width="1"/>
    </svg>
  `,

  // City Skyline: Mumbai (Gateway of India arch + Bandra-Worli Sea Link cable-stayed pylon + coastal line)
  skylineMumbai: `
    <svg viewBox="0 0 400 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;" preserveAspectRatio="xMidYMax meet">
      <!-- Arabian Sea Coastal Horizon Line -->
      <line x1="0" y1="135" x2="400" y2="135" stroke="var(--border-strong)" stroke-width="1.5"/>
      <path d="M0 138 Q 50 135, 100 138 T 200 138 T 300 138 T 400 138" stroke="var(--accent-hot)" stroke-width="0.8" opacity="0.4"/>
      
      <!-- Gateway of India Arch (Stylised Line Art) -->
      <rect x="60" y="65" width="80" height="70" fill="none" stroke="var(--border-strong)" stroke-width="1.5"/>
      <!-- Grand Islamic/Indo-Saracenic Central Arch -->
      <path d="M85 135 V 95 C 85 82, 115 82, 115 95 V 135" stroke="var(--border-strong)" stroke-width="1.5" fill="var(--bg-surface)"/>
      <!-- Side Jali niches -->
      <rect x="68" y="80" width="10" height="25" stroke="var(--border-medium)" stroke-width="1"/>
      <rect x="122" y="80" width="10" height="25" stroke="var(--border-medium)" stroke-width="1"/>
      <!-- Gateway Upper Parapet & Domelets -->
      <rect x="55" y="55" width="90" height="10" stroke="var(--border-strong)" stroke-width="1.5"/>
      <circle cx="70" cy="52" r="3" fill="var(--accent-hot)"/>
      <circle cx="100" cy="50" r="5" fill="var(--accent-gold)"/>
      <circle cx="130" cy="52" r="3" fill="var(--accent-hot)"/>

      <!-- Bandra-Worli Sea Link Cable-Stayed Pylon -->
      <polygon points="270,25 255,135 285,135" stroke="var(--border-strong)" stroke-width="1.5" fill="var(--bg-surface)"/>
      <!-- Cable Stays radiating down -->
      <line x1="270" y1="35" x2="220" y2="135" stroke="var(--border-medium)" stroke-width="1"/>
      <line x1="270" y1="50" x2="232" y2="135" stroke="var(--border-medium)" stroke-width="1"/>
      <line x1="270" y1="65" x2="242" y2="135" stroke="var(--border-medium)" stroke-width="1"/>
      <line x1="270" y1="35" x2="320" y2="135" stroke="var(--border-medium)" stroke-width="1"/>
      <line x1="270" y1="50" x2="308" y2="135" stroke="var(--border-medium)" stroke-width="1"/>
      <line x1="270" y1="65" x2="298" y2="135" stroke="var(--border-medium)" stroke-width="1"/>
      <line x1="270" y1="25" x2="270" y2="15" stroke="var(--accent-hot)" stroke-width="1.5"/>

      <!-- Mumbai High-Rise Horizon (Marine Drive / BKC) -->
      <rect x="160" y="75" width="25" height="60" stroke="var(--border-subtle)" stroke-width="1"/>
      <rect x="190" y="85" width="20" height="50" stroke="var(--border-subtle)" stroke-width="1"/>
      <rect x="330" y="60" width="30" height="75" stroke="var(--border-medium)" stroke-width="1"/>
      <rect x="365" y="75" width="25" height="60" stroke="var(--border-subtle)" stroke-width="1"/>
    </svg>
  `
};
