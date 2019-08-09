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
    <form data-testid="tag-form" className="w-full" onSubmit={handleSubmit}>
      <div className="flex">
        <input
          data-testid="tag-form-input"
          className="block fle-1 px-2 border border-gray-200"
          placeholder="Tag Name"
          id="name"
          value={name}
          onChange={handleChange}
        ></input>
        <button
          data-testid="tag-form-submit"
          type="submit"
          className="text-white bg-teal-400 hover:bg-teal-500 font-bold px-3 py-2"
        >
          add
        </button>
      </div>
    </form>
  );
}

export default Form;
