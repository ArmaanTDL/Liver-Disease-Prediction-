import React, { useEffect, useRef, useState } from 'react';
import { playScrollTick, playClick, playHover } from '../hooks/useSoundEffects';

/**
 * SoundEngine
 * ──────────────────────────────────────────────────────────────
 * • Throttled scroll → soft bell tick
 * • Click / touchend delegation → warm bell chime
 * • Mouseover hover (desktop only) → whisper tone
 * • iOS AudioContext unlock on first touch
 * • Floating 🔊/🔇 mute toggle — mobile-safe positioning
 */

const INTERACTIVE_SELECTORS = [
  'a', 'button', '[role="button"]',
  'input', 'select', 'textarea',
  'label', '[tabindex]',
  '.cursor-pointer',
].join(',');

// Detect touch-primary device (no hover sounds needed)
const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export default function SoundEngine() {
  const [muted, setMuted] = useState(false);
  const mutedRef       = useRef(false);
  const lastScrollY    = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const lastScrollTime = useRef(0);
  const scrollAccum    = useRef(0);
  const audioUnlocked  = useRef(false);

  // Keep ref in sync so event handlers always see latest value
  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    // ── iOS / Safari AudioContext unlock ────────────────────
    // Must resume AudioContext inside a user-gesture handler.
    const unlockAudio = () => {
      if (audioUnlocked.current) return;
      audioUnlocked.current = true;
      // Importing here avoids circular issues; getCtx is called internally
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          // Play a silent buffer to unlock
          const buf = ctx.createBuffer(1, 1, 22050);
          const src = ctx.createBufferSource();
          src.buffer = buf;
          src.connect(ctx.destination);
          src.start(0);
          ctx.resume();
        }
      } catch (_) {}
    };

    document.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
    document.addEventListener('click',      unlockAudio, { once: true });

    // ── Scroll listener ──────────────────────────────────────
    const SCROLL_THRESHOLD = 50;   // px before tick fires
    const MIN_INTERVAL_MS  = 120;  // min ms between ticks

    const handleScroll = () => {
      if (mutedRef.current) return;
      const now   = Date.now();
      const delta = Math.abs(window.scrollY - lastScrollY.current);
      lastScrollY.current   = window.scrollY;
      scrollAccum.current  += delta;

      if (
        scrollAccum.current >= SCROLL_THRESHOLD &&
        now - lastScrollTime.current > MIN_INTERVAL_MS
      ) {
        playScrollTick();
        scrollAccum.current  = 0;
        lastScrollTime.current = now;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Click delegation (mouse + touch) ─────────────────────
    const handleInteraction = (e) => {
      if (mutedRef.current) return;
      const target = e.target || e.changedTouches?.[0]?.target;
      if (target && target.closest(INTERACTIVE_SELECTORS)) {
        playClick();
      }
    };

    // 'click' covers desktop & mobile tap (fires after touchend)
    document.addEventListener('click', handleInteraction, true);

    // ── Hover delegation (desktop only) ──────────────────────
    let lastHoverTarget = null;
    let handleMouseOver = null;
    let handleMouseOut  = null;

    if (!isTouchDevice()) {
      handleMouseOver = (e) => {
        if (mutedRef.current) return;
        const el = e.target.closest(INTERACTIVE_SELECTORS);
        if (el && el !== lastHoverTarget) {
          lastHoverTarget = el;
          playHover();
        }
      };
      handleMouseOut = () => {
        lastHoverTarget = null;
      };
      document.addEventListener('mouseover', handleMouseOver, true);
      document.addEventListener('mouseout',  handleMouseOut,  true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleInteraction, true);
      if (handleMouseOver) document.removeEventListener('mouseover', handleMouseOver, true);
      if (handleMouseOut)  document.removeEventListener('mouseout',  handleMouseOut,  true);
    };
  }, []);

  const toggle = () => setMuted(m => !m);

  return (
    <button
      id="sound-toggle-btn"
      onClick={toggle}
      title={muted ? 'Unmute sounds' : 'Mute sounds'}
      aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
      style={{
        /* Mobile-safe: sits above AutoScrollButton (bottom-8 = 2rem) on right,
           we place it on the LEFT side to avoid overlap on any screen size.    */
        position:       'fixed',
        bottom:         '2rem',
        left:           '1rem',
        zIndex:         9999,
        /* Larger tap target on mobile (44px minimum per WCAG) */
        width:          '2.75rem',
        height:         '2.75rem',
        minWidth:       '44px',
        minHeight:      '44px',
        borderRadius:   '50%',
        border:         `2px solid ${muted ? '#444' : '#02C39A'}`,
        background:     muted
          ? 'rgba(15,15,25,0.88)'
          : 'rgba(2,195,154,0.13)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        color:          muted ? '#555' : '#02C39A',
        fontSize:       '1.15rem',
        cursor:         'pointer',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        boxShadow:      muted
          ? 'none'
          : '0 0 14px rgba(2,195,154,0.4), 0 0 28px rgba(2,195,154,0.15)',
        transition:     'all 0.25s ease',
        touchAction:    'manipulation',   // faster tap response on mobile
        userSelect:     'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  );
}
