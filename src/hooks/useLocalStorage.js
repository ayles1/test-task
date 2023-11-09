import {useCallback, useState, useRef, useLayoutEffect} from 'react';


const useLocalStorage = (
    key,
    initialValue,
) => {


    const deserializer = JSON.parse;

    const initializer = useRef((key) => {
        try {
            const serializer = JSON.stringify;

            const localStorageValue = localStorage.getItem(key);
            if (localStorageValue !== null) {
                return deserializer(localStorageValue);
            } else {
                initialValue && localStorage.setItem(key, serializer(initialValue));
                return initialValue;
            }
        } catch {
            return initialValue;
        }
    });

    const [state, setState] = useState(() => initializer.current(key));


    useLayoutEffect(() => setState(initializer.current(key)), [key]);

    const set = useCallback(
        (valOrFunc) => {
            try {
                const newState = valOrFunc instanceof Function ? valOrFunc(state) : valOrFunc;
                if (typeof newState === 'undefined') return;
                let value;


                if (typeof newState === 'string') value = newState;
                else value = JSON.stringify(newState);


                localStorage.setItem(key, value);
                setState(deserializer(value));
            } catch {
            }
        },
        [key, setState]
    );

    const remove = useCallback(() => {
        try {
            localStorage.removeItem(key);
            setState(undefined);
        } catch {
        }
    }, [key, setState]);

    return [state, set, remove];
};

export default useLocalStorage;
