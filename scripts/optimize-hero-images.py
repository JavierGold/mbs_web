"""Generate pixel-identical WebP heroes; run before building/deploying the site.

Python 3.12 + Pillow 12.0.0. Originals are never modified.
Usage: python scripts/optimize-hero-images.py [repository-root]
"""
from pathlib import Path
import sys
from PIL import Image

HEROES = ('mainframe', 'servicios', 'nosotros', 'university', 'contactos')


def optimize(root: Path, names=HEROES):
    for name in names:
        source = root / 'img' / f'{name}.png'
        target = source.with_suffix('.webp')
        with Image.open(source) as original:
            rgba = original.convert('RGBA')
            rgba.save(target, 'WEBP', lossless=True, exact=True, method=6,
                      **({'icc_profile': original.info['icc_profile']} if original.info.get('icc_profile') else {}))
            with Image.open(target) as encoded:
                if encoded.size != rgba.size or encoded.convert('RGBA').tobytes() != rgba.tobytes():
                    target.unlink()
                    raise ValueError(f'Pixel verification failed: {name}')
        print(f'{source.name}: {source.stat().st_size:,} -> {target.stat().st_size:,} bytes (lossless)')


if __name__ == '__main__':
    optimize(Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parents[1])
