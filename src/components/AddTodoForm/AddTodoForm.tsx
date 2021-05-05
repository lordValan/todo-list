import React, { FC, useState } from "react";

import TextField from "@material-ui/core/TextField";

interface Props {
    onFormSubmit: (input: string) => void;
}

const AddTodoForm: FC<Props> = ({ onFormSubmit }) => {
    const [input, setInput] = useState<string>("");

    // handlers

    const handleFormSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();

        await onFormSubmit(input);

        setInput("");
    }

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
          <TextField
            id="standard-basic"
            style={{
              width: "100%",
            }}
            label="Add your todo"
            variant="standard"
            color="primary"
            value={input}
            onChange={(evt) => setInput(evt.target.value)}
          />
        </form>
    );
}

export default AddTodoForm;
