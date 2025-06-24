import Image from 'next/image';
import styles from '@/components/product-details/styles.module.css';
import { API_URL } from '@/lib/constants';

type PropType = {
  selected: boolean
  onClick: () => void
  img: string
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, img, onClick } = props
  return (
    <div
      className={`${styles.embla_thumbs__slide} ${selected ? styles.embla_thumbs__slide_selected : ''}`}
    >
      <button
        onClick={onClick}
        type="button"
        className={`${styles.embla_thumbs__slide__image}`}
      >
        <Image src={`${API_URL}/storage/${img}`} alt="thumb image" width={130} height={130} />
      </button>
    </div>
  )
}
