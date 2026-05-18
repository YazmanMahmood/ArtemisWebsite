import { useState, useEffect, useRef } from 'react';

/**
 * VimeoEmbed — lightweight Vimeo iframe wrapper.
 *
 * @param {string}  src   — full Vimeo player URL
 * @param {string}  title — iframe title for accessibility
 * @param {object}  style — inline styles applied directly to the <iframe>
 * @param {boolean} lazy  — if true, defer render until 300px before viewport entry
 */
export default function VimeoEmbed({ src, title = 'Vimeo Video', style = {}, lazy = false }) {
  const [shouldRender, setShouldRender] = useState(!lazy);
  const ref = useRef(null);

  useEffect(() => {
    if (!lazy || shouldRender) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [lazy, shouldRender]);

  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      {shouldRender && (
        <iframe
          src={src}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          style={{ border: 'none', display: 'block', ...style }}
        />
      )}
    </div>
  );
}