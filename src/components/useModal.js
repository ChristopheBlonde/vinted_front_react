import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState([false, false]);
  const newArr = [...isShowing];
  const toggle = (index) => {
    if (index === 0) {
      newArr[0] = !newArr[0];
      newArr[1] = false;
      document.body.style.overflow = "hidden";
    } else {
      newArr[1] = !newArr[1];
      newArr[0] = false;
      document.body.style.overflow = "hidden";
    }
    if (!newArr[1] && !newArr[0]) {
      document.body.style.overflow = "auto";
    }
    setIsShowing(newArr);
  };
  return { isShowing, toggle, setIsShowing };
};

export default useModal;
