import { useEffect } from "react";

const ToggleNProgress = ({ show }: { show: boolean }) => {
    useEffect(() => {
        const nprogress = document.getElementById("line_loader");
        if (nprogress) {
            if (show) {
                nprogress.classList.remove("hidden");
            } else {
                nprogress.classList.add("hidden");
            }
        }
    }, [show]);

    return null;
};

export default ToggleNProgress;
