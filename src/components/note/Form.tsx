import React, { useState, useEffect } from "react";

type NoteFormProps = {
  value: string;
  onSubmit: (body: string) => void;
};

function Form(props: NoteFormProps) {
  const [body, setBody] = useState(props.value);
  useEffect(() => {
    setBody(props.value);
  }, [props.value]);

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setBody(event.target.value);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    props.onSubmit(body);

    setBody("");
  };

  return (
    <form data-cy="note-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="body">Note Form</label>
        <textarea
          data-cy="note-form-input"
          id="body"
          value={body}
          onChange={handleChange}
        ></textarea>
      </div>
      <button data-cy="note-form-submit" type="submit">
        SAVE
      </button>
    </form>
  );
}

export default Form;
