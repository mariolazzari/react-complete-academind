import { useState } from "react";

export const useFormInput = () => {
  const [value, setValue] = useState("");
  const [validity, setValidity] = useState(false);

  const onChange = e => {
    setValue(e.target.value);
    if (e.target.value === "") {
      setValidity(false);
    } else {
      setValidity(true);
    }
  };

  return { value, validity, onChange };
};
