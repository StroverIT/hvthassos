"use client";

import { useState, type FC } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { CONTENT } from "./consts";
import type { TGalleryGridProps } from "./types";

export const GalleryGrid: FC<TGalleryGridProps> = ({ images }) => {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className="group relative aspect-[4/3] overflow-hidden bg-foam"
            onClick={() => setIndex(i)}
          >
            <Image
              src={src}
              alt={`${CONTENT.imageAltLabel} ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={images.map((src) => ({ src }))}
      />
    </>
  );
};
