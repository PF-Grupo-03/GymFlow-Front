import React from 'react';
import styles from './Title.module.css';

const TitleBox = ({ title }: { title: string }) => {
  return (
    <div
      className={`bg-tertiary rounded-tl-lg rounded-br-lg ${styles.orangeShadow} p-6 w-3/6 flex justify-center items-center mt-5 font-holtwood`}
    >
      <span className="text-primary text-4xl">{title}</span>
    </div>
  );
};

<<<<<<< HEAD
export default TitleBox;
=======
export default TitleBox;
>>>>>>> fad5864993e575b22134fb4b3cff5d5a8e529d5a
