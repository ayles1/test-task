import {Checkbox} from "@mui/material";

export const Todo = ({completed,text}) => {
    return (
        <div>
            <Checkbox/>
            <span>{text}</span>
        </div>
    )
}
