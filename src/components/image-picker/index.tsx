'use client';

import { ChangeEvent, useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

type Props = {
  label: string;
  name: string;
};

export const ImagePicker = ({ label, name }: Props) => {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickPick = () => {
    inputRef?.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        setPickedImage(fileReader.result as string);
      };

      fileReader.readAsDataURL(file);
    } else {
      setPickedImage(null);
    }
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage ? (
            <Image src={pickedImage} alt="Image picked by the user" fill />
          ) : (
            <p>Please upload an image</p>
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={inputRef}
          onChange={handleImageChange}
          required
        />
        <button className={classes.button} type="button" onClick={handleClickPick}>
          Pick an image
        </button>
      </div>
    </div>
  );
};
