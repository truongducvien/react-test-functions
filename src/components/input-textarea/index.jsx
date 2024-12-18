import { useState } from "react";

export default function TextAreaInput() {
  const [value, setValue] = useState();

  const handleChange = (e) => {
    const value = e.target.value;
    console.log({ value });
  };

  return <textarea value={value} onChange={handleChange} />;
}
