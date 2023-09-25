import { nanoid } from 'nanoid';

import css from 'components/imageFinder.module.css';

const ImageGalleryItem = ({ images, showImage }) => {
  return (
    <>
      <div className="container">
        <ul className={css.ImageGallery}>
          {images.map(({ webformatURL, id, tags, largeImageURL }) => {
            return (
              <li
                key={nanoid()}
                className={css.ImageGalleryItem}
                onClick={() => showImage({ largeImageURL })}
              >
                <img
                  src={webformatURL}
                  alt={tags}
                  className={css.ImageGalleryItemImage}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ImageGalleryItem;
