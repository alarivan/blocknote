import React, { useState, useEffect } from "react";

type TagFormProps = {
  value: string;
  onSubmit: (name: string) => void;
};

function Form(props: TagFormProps) {
  const [name, setName] = useState(props.value);
  useEffect(() => {
    setName(props.value);
  }, [props.value]);

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setName(event.target.value);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    props.onSubmit(name);

    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Title</label>
        <textarea id="name" value={name} onChange={handleChange}></textarea>
      </div>
      <button type="submit">SAVE</button>
    </form>
  );
}

export default Form;
