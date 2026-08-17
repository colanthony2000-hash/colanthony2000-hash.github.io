from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGES = [
    "assets/academy/live-ai-bootcamp-class-1.png",
    "assets/aitrain.png",
    "assets/businessflow.jpeg",
    "assets/cbt-service-real.png",
    "assets/community/ogiame-atuwatse-iii-5th-coronation-anniversary.png",
    "assets/lessonnote.png",
    "assets/products/jems-platform.png",
    "assets/products/smart-procurement-dashboard.png",
    "assets/success-stories/rccg-rivers-family-ai-training-hands-on.png",
    "assets/success-stories/rccg-rivers-family-ai-training-interactive.png",
]

for relative in IMAGES:
    source = ROOT / relative
    output = source.with_suffix(".webp")
    with Image.open(source) as image:
        image.load()
        if image.width > 1440:
            height = round(image.height * 1440 / image.width)
            image = image.resize((1440, height), Image.Resampling.LANCZOS)
        image.save(output, "WEBP", quality=82, method=6)
        print(f"{relative} -> {output.relative_to(ROOT)} ({output.stat().st_size} bytes)")
