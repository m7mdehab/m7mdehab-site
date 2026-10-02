#!/usr/bin/env python3
"""Create a pixel-difference heatmap for a candidate render against a 1683x935 reference."""
from __future__ import annotations
import argparse
from pathlib import Path
from PIL import Image, ImageChops, ImageEnhance, ImageStat

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--reference',required=True)
    ap.add_argument('--candidate',required=True)
    ap.add_argument('--out',required=True)
    args=ap.parse_args()
    ref=Image.open(args.reference).convert('RGB')
    cand=Image.open(args.candidate).convert('RGB').resize(ref.size,Image.Resampling.LANCZOS)
    diff=ImageChops.difference(ref,cand)
    stat=ImageStat.Stat(diff)
    mae=sum(stat.mean)/3
    rms=(sum(v*v for v in stat.rms)/3)**0.5
    heat=ImageEnhance.Contrast(diff).enhance(2.2)
    heat=ImageEnhance.Brightness(heat).enhance(2.5)
    Path(args.out).parent.mkdir(parents=True,exist_ok=True)
    heat.save(args.out)
    print(f'reference={ref.size[0]}x{ref.size[1]} MAE={mae:.3f} RMS={rms:.3f} out={args.out}')
if __name__=='__main__':main()
