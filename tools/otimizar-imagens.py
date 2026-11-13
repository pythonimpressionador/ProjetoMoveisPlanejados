"""
Otimiza fotos para o site da Carpintaria.

Para cada foto (JPG, PNG, WEBP ou HEIC convertido) da pasta de entrada, gera:
  nome.webp     -> 1600 px no lado maior (usada na janela de detalhes)
  nome-sm.webp  ->  800 px no lado maior (usada nas miniaturas)

Requisito: Python 3 + Pillow  (pip install pillow)

Uso:
  python tools/otimizar-imagens.py <pasta-com-fotos-originais> site/img/projetos

Dica: renomeie as fotos ANTES, já com o nome que vai no dados.js
(ex.: cozinha-09.jpg, closet-01.jpg). Use letras minúsculas, sem acento e sem espaço.
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

TAMANHOS = {"": (1600, 78), "-sm": (800, 74)}  # sufixo: (lado maior, qualidade)
EXTENSOES = {".jpg", ".jpeg", ".png", ".webp"}


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    origem, destino = Path(sys.argv[1]), Path(sys.argv[2])
    destino.mkdir(parents=True, exist_ok=True)
    fotos = [p for p in sorted(origem.iterdir()) if p.suffix.lower() in EXTENSOES]
    if not fotos:
        print("Nenhuma foto encontrada em", origem)
        return
    for foto in fotos:
        img = ImageOps.exif_transpose(Image.open(foto)).convert("RGB")  # corrige rotação do celular
        for sufixo, (lado, qualidade) in TAMANHOS.items():
            copia = img.copy()
            copia.thumbnail((lado, lado))
            saida = destino / f"{foto.stem}{sufixo}.webp"
            copia.save(saida, "WEBP", quality=qualidade, method=6)
            print(f"{saida.name:32} {copia.size[0]}x{copia.size[1]}  {saida.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
