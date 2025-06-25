"use client";

import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import styles from './styles.module.css'
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { Thumb } from './CarouselThumbsButton';
import { API_URL } from '@/lib/constants';

type PropType = {
  options?: EmblaOptionsType
  images: string[]
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options, images } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })
  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaApi || !emblaThumbsApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi, emblaThumbsApi]
  )
    const onSelect = useCallback(() => {
    if (!emblaApi || !emblaThumbsApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaApi.selectedScrollSnap())
  }, [emblaApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()

    emblaApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!emblaApi) return;

      if (event.key === 'ArrowLeft') {
        emblaApi.scrollPrev();
      } else if (event.key === 'ArrowRight') {
        emblaApi.scrollNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [emblaApi]);

  return (
    <section className={styles.embla} dir="ltr">
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {images.map((image, index) => (
            <div className={styles.embla__slide} key={index}>
              <Image src={`${API_URL}/storage/${image}`} alt="image" className="w-full object-contain" width={583} height={578} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.embla__controls}>
        <div className={styles.embla_thumbs}>
          <div className={styles.embla_thumbs__viewport_container} dir='ltr'>
            <div className={styles.embla_thumbs__viewport} ref={emblaThumbsRef}>
              <div className={`${styles.embla_thumbs__container}`}>
                {images.map((img, index) => (
                  <Thumb
                    key={index}
                    onClick={() => onThumbClick(index)}
                    selected={index === selectedIndex}
                    img={img}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel;