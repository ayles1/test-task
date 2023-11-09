import {Checkbox} from "@mui/material";
import {useId} from "react";

export const Todo = ({completed,text, setCompleted,id}) => {

    return (
        <div>

            <Checkbox checked={completed} value={completed}
                      onChange={()=>setCompleted({completed,text,id})}
            />
            <span>{text}</span>
        </div>
    )
}
