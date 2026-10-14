import { useRef, useState } from 'react';
import { PROMO_VIDEO_SRC } from '../config';
import Icon from './Icon';

// Hero video. The file lives in public/promo.mp4 and is served from /promo.mp4.
// States: idle (poster-style overlay) -> playing (native controls) | unavailable (file missing or unsupported).
export default function PromoPlayer({ onFallback }) {
  const video = useRef(null);
  const [state, setState] = useState('idle');

  const play = () => {
    setState('playing');
    const v = video.current;
    if (v) v.play().catch(() => setState('idle'));
  };

  return (
    <div className="promo glass-fill hero-card relative overflow-hidden">
      <video
        ref={video}
        className="promo-video"
        src={PROMO_VIDEO_SRC}
        preload="metadata"
        playsInline
        controls={state === 'playing'}
        aria-label="Empiric Labs promo video"
        onError={() => setState('unavailable')}
        onEnded={() => setState('idle')}
        onPause={() => {
          const v = video.current;
          if (v && v.ended) setState('idle');
        }}
      />

      {state !== 'playing' && (
        <div className="promo-overlay">
          {state === 'unavailable' ? (
            <div className="promo-msg" role="status">
              <Icon name="film" className="h-6 w-6" />
              <p className="promo-msg-t">The demo video is not available yet</p>
              <p className="promo-msg-s">See the pipeline run on a real example instead.</p>
              <button type="button" className="btn-secondary promo-cta" onClick={onFallback}>
                Show live pipeline
              </button>
            </div>
          ) : (
            <button type="button" className="promo-play" onClick={play} aria-label="Play promo video">
              <span className="promo-play-ico">
                <Icon name="play" className="h-6 w-6" filled />
              </span>
              <span className="promo-play-t">Watch the 60-second demo</span>
              <span className="promo-play-s">From raw notes to a formatted .docx</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
