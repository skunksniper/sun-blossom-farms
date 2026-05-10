import { useState } from 'react';

export default function Photo({
  src,
  alt = '',
  fallback,
  className = '',
  style,
  loading = 'lazy',
  sizes,
  children,
  overlay,
}) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div
      className={`photo ${className}`}
      style={{
        background: fallback || 'linear-gradient(135deg, #3a2a6a, #5a3fa0)',
        ...style,
      }}
    >
      {showImage && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          sizes={sizes}
          onError={() => setFailed(true)}
        />
      )}
      {overlay && <div className="photo__overlay" />}
      {children && <div className="photo__content">{children}</div>}
    </div>
  );
}
