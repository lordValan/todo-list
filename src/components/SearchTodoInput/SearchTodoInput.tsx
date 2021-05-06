import { FC, ChangeEvent, useState } from "react";

import TextField from "@material-ui/core/TextField";

interface Props {
    onChange: (input: string) => void;
}

const AddTodoForm: FC<Props> = ({ onChange }) => {
    const [input, setInput] = useState<string>("");

    // handlers

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const newValue = evt.target.value;

        setInput(newValue);
        onChange(newValue);
    }

    return (
        <TextField
            style={{
              width: "100%",
            }}
            label="Search todo"
            variant="standard"
            color="primary"
            value={input}
            onChange={handleInputChange}
        />
    );
}

export default AddTodoForm;
