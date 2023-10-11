import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Error(message) {
    toast.error(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
}

export default {
    Error
}