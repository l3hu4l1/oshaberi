import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../App";

export const Activation = () => {
    const { token = "" } = useParams();
    const redirect = useNavigate();

    const handleVerify = async () => {
        const response = await fetch(`${API_URL}/users/activate/${token}`, {
            method: "PUT",
        });

        if (response.ok) {
            redirect("/");
        } else {
            alert("failed to activate");
        }
    };

    return (
        <div>
            <button onClick={handleVerify}>Activate</button>
        </div>
    );
};
