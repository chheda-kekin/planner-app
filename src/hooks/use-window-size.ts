import { useEffect, useState } from "react";

function useWindowSize() {

    const [size, setSize] = useState([ 0, 0 ]);

    useEffect(() => {

        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener("resize", updateSize);

        return () => {
            window.removeEventListener("resize", updateSize);
        }
    }, [size]);

    return size;
}

export default useWindowSize;