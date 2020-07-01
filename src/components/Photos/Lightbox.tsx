import React, { FC } from 'react';
import useLightbox from 'hooks/useLightbox';
import DeleteButton from 'components/UI/DeleteButton';
import { Photo } from 'types/photos';

type LightboxProps = {
  photos: Photo[];
  exit: () => void;
  startingPhoto: number;
};

const Lightbox: FC<LightboxProps> = ({ photos, exit, startingPhoto }) => {
  const {
    animation,
    animatedExit,
    nextPhoto,
    url,
    name,
    leftArrow,
    rightArrow,
  } = useLightbox({ startingPhoto, photos, exit });

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed="true"
      onClick={nextPhoto}
      className="fixed top-0 left-0 z-10 flex w-screen min-h-screen flex-center"
    >
      <div className="absolute w-full h-full bg-black opacity-75" />
      <DeleteButton onClick={animatedExit} />
      {leftArrow}
      {rightArrow}
      <img
        src={url}
        alt={name}
        className={`relative z-20 w-screen md:h-screen md:w-auto ${animation} animation-once`}
      />
      <a
        href={url}
        onClick={(event) => event.stopPropagation()}
        download
        className="z-30 opacity-50 fixed-ui-component hoverable-green-ui-component fixed-br hover:opacity-100"
      >
        Download
      </a>
    </div>
  );
};

export default Lightbox;
