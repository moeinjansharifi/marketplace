import React, { useState, useEffect } from "react";
import { useWindowScroll } from "react-use";
import { XMarkIcon, PhotoIcon } from "@heroicons/react/24/solid";
import Image from "./Image";

const PlaceGallary = ({ images, sendData, placeTitle }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const { y: scrollY } = useWindowScroll();
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    if (scrollY > 100) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  }, [scrollY]);

  const showMorePhotos = () => {
    setShowAllPhotos(!showAllPhotos);
    sendData(showAllPhotos);
  };
  if (showAllPhotos) {
    return (
      <div className="min-h-screen w-full">
        <div className="grid">
          <div className="flex justify-between items-center pr-2">
            <p className="text-xl">Photos of {placeTitle}</p>
            <button
              onClick={showMorePhotos}
              className={`flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black ${
                isFixed ? "fixed" : "static"
              } right-[16.5rem] top-8`}
            >
              <XMarkIcon className="w-6 h-6" />
              Close photos
            </button>
          </div>
          {images?.length > 0 &&
            images?.map((image) => (
              <Image
                src={image}
                className="my-3 rounded h-[32rem] object-cover w-full"
                alt="place_image"
                key={image}
              />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-3">
      <div className="grid grid-cols-[2fr_1fr] gap-2 h-[32rem] rounded-lg overflow-hidden">
        {images !== undefined ? (
          <Image
            src={images[0]}
            alt="place_image"
            className="aspect-square cursor-pointer h-[32rem] w-full object-cover"
          />
        ) : (
          ""
        )}
        <div className="grid rounded-3xl h-[32rem]">
          {images !== undefined ? (
            <Image
              src={images[1]}
              alt="place_image"
              className="aspect-square cursor-pointer h-[16rem] w-full object-cover pb-1"
            />
          ) : (
            ""
          )}
          {images !== undefined ? (
            <Image
              src={images[2]}
              alt="place_image"
              className="aspect-square cursor-pointer h-[16rem] w-full object-cover pt-1"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <button
        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500"
        onClick={showMorePhotos}
      >
        <PhotoIcon className="w-6 h-6" />
        Show more photos
      </button>
    </div>
  );
};

export default PlaceGallary;
