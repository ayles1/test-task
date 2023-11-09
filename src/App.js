import {useState} from 'react'

import useLocalStorage from "./hooks/useLocalStorage.js";
import {Box, Button, TextField} from "@mui/material";
import {Todo} from "./components";

function App() {
    const [todos, setTodos, remove] = useLocalStorage("todos", [])
    const [inputValue, setInputValue] = useState("")


    const handleAdd = (text, completed) => {
        const id = Math.random().toString(36).substring(2)

        if (todos) {

            setTodos([...todos, {text, completed, id}])
        } else {
            setTodos([{text, completed, id}])
        }
    }
    const handleComplete = (todo) => {
        const newTodos = todos.map((item) => {
            if (item.id === todo.id) {
                return {...item, completed: !item.completed}
            }
            return item
        })
        setTodos(newTodos)
    }


    return (
        <div>
            {todos && todos.map((todo, index) => {
                return <Todo key={todo.id} id={todo.id} text={todo.text} completed={todo.completed}
                             setCompleted={handleComplete}/>
            })}
            <Box sx={{display: 'flex'}}>

                <Button variant={'contained'} onClick={() => handleAdd(inputValue, false)}>Добавить</Button>
                <div>

                    <TextField value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                </div>
            </Box>
            <Button onClick={() => remove()}>Очистить</Button>
        </div>
    )
}

export default App
