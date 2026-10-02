import { useRouterState } from '@tanstack/react-router'
import { useEffect, useRef, type ReactNode } from 'react'

/** Progressive enhancement: SSR content is visible, even without JavaScript. */
export function PageMotion({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: state => state.resolvedLocation?.pathname ?? state.location.pathname })
  return <MotionContent key={path}>{children}</MotionContent>
}

function MotionContent({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = root.current
    if (!element || !('IntersectionObserver' in window)) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const seen = new WeakSet<Element>()
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute('data-motion', 'visible')
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.04, rootMargin: '0px 0px 24px 0px' })

    function scan() {
      if (!element || preference.matches) return
      // Only short content blocks animate. Long sections and above-fold content
      // remain visible so reading, LCP and anchor navigation are not delayed.
      const candidates = element.querySelectorAll<HTMLElement>('article, section[aria-label], section[aria-labelledby], [data-reveal]')
      candidates.forEach(node => {
        if (seen.has(node)) return
        seen.add(node)
        const box = node.getBoundingClientRect()
        if (!box.height || box.height > window.innerHeight * 0.9 || box.top < window.innerHeight || node.parentElement?.closest('[data-motion]')) return
        const index = Array.from(node.parentElement?.children ?? []).indexOf(node)
        node.style.setProperty('--reveal-delay', `${Math.min(Math.max(index, 0), 3) * 45}ms`)
        node.dataset.motion = 'pending'
        observer.observe(node)
      })
    }
    function revealAll() {
      observer.disconnect()
      element?.querySelectorAll('[data-motion]').forEach(node => node.setAttribute('data-motion', 'visible'))
    }
    function preferenceChanged() { if (preference.matches) revealAll(); else scan() }
    // Covers streamed content and new results without observing style mutations.
    const mutations = new MutationObserver(scan)
    mutations.observe(element, { childList: true, subtree: true })
    preference.addEventListener('change', preferenceChanged)
    scan()
    return () => { observer.disconnect(); mutations.disconnect(); preference.removeEventListener('change', preferenceChanged) }
  }, [])
  return <div ref={root} className="page-transition">{children}</div>
}

export function NavigationProgress() {
  const loading = useRouterState({ select: state => state.isLoading })
  return loading ? <div className="navigation-progress" aria-hidden="true"><span/></div> : null
}
