'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

// Must match HomePageAnimation.tsx
const CAM_Z  = 10;
const TAN_HF = Math.tan((50 / 2) * (Math.PI / 180));

// "Novarra" bbox half-width ≈ 2.3 units, half-height ≈ 0.42 units (size=1, centered)
const NOVA_HALF_W = 2.3;
const NOVA_HALF_H = 0.42;

// Triangle layout: Services top-left, Team top-right, Contact bottom-center
const NAV = [
    { label: 'Services', href: '/services',   fx: -1, fy: -1 },
    { label: 'Team',     href: '/team',       fx:  1, fy: -1 },
    { label: 'Contact',  href: '/contact-us', fx:  0, fy:  1 },
];

const FLOAT_SPEED = [0.00110, 0.00090, 0.00120];
const FLOAT_PHASE = [0, 2.09, 4.19]; // 120° apart
const FLOAT_AMP   = 7;

export function FloatingNav() {
    const { theme }    = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRefs  = useRef<(HTMLDivElement | null)[]>([]);
    const frameRef     = useRef<number>(0);

    useEffect(() => {
        let running = true;
        const tick = () => {
            if (!running || !containerRef.current) return;
            const W = containerRef.current.offsetWidth;
            const H = containerRef.current.offsetHeight;

            const pxPerUnit = H / (2 * CAM_Z * TAN_HF);
            const scale     = Math.max(0.4, Math.min(W / 1600, 1.05));

            const cx = W / 2;
            const cy = H / 2;

            const rx = NOVA_HALF_W * scale * pxPerUnit + 72;
            const ry = NOVA_HALF_H * scale * pxPerUnit + 80;

            const now = Date.now();
            wrapperRefs.current.forEach((el, i) => {
                if (!el) return;
                const { fx, fy } = NAV[i];
                const baseX  = cx + fx * rx;
                const baseY  = cy + fy * ry;
                const floatY = Math.sin(now * FLOAT_SPEED[i] + FLOAT_PHASE[i]) * FLOAT_AMP;
                el.style.left = `${Math.max(52, Math.min(W - 52, baseX))}px`;
                el.style.top  = `${Math.max(24, Math.min(H - 24, baseY + floatY))}px`;
            });

            frameRef.current = requestAnimationFrame(tick);
        };
        tick();
        return () => { running = false; cancelAnimationFrame(frameRef.current); };
    }, []);

    const isDark = theme !== 'light';
    const pillCls = isDark
        ? 'text-sky-200/70 hover:text-white bg-sky-950/40 hover:bg-sky-900/50 border-sky-500/20 hover:border-sky-400/60 hover:shadow-[0_0_22px_rgba(14,165,233,0.30)]'
        : 'text-sky-800 hover:text-sky-950 bg-white/80 hover:bg-white border-sky-200 hover:border-sky-400 hover:shadow-[0_4px_18px_rgba(14,165,233,0.20)]';

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none">
            {NAV.map((item, i) => (
                <div key={item.href}
                    ref={(el) => { wrapperRefs.current[i] = el; }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ willChange: 'top' }}>
                    <Link href={item.href}
                        className={`pointer-events-auto block px-5 py-2 rounded-full
                                    text-[13px] font-semibold tracking-widest uppercase
                                    border backdrop-blur-md
                                    transition-all duration-200 whitespace-nowrap select-none
                                    ${pillCls}`}>
                        {item.label}
                    </Link>
                </div>
            ))}
        </div>
    );
}
