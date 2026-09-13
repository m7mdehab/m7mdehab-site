/* eslint-disable @next/next/no-img-element */
import { logoAssetsA } from "@/data/logo-assets-a";
import { logoAssetsB } from "@/data/logo-assets-b";
import { logoAssetsC } from "@/data/logo-assets-c";

const logoAssets = { ...logoAssetsA, ...logoAssetsB, ...logoAssetsC } as const;

export type BrandKey = keyof typeof logoAssets;

export function BrandLogo({
  brand,
  alt = "",
  className = "",
  mode = "native",
}: {
  brand: BrandKey;
  alt?: string;
  className?: string;
  mode?: "mono" | "native";
}) {
  return (
    <span className={`brand-logo brand-logo-${mode}${className ? ` ${className}` : ""}`} data-brand-logo={brand}>
      <img src={logoAssets[brand]} alt={alt} decoding="async" loading="lazy" />
    </span>
  );
}
