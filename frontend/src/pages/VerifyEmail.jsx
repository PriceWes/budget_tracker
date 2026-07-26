import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function VerifyEmail() {
    const { token} = useParams();
    useEffect(() => {
        const verify = async () => {
            try {
                await api.get(`/auth/verify/${token}`);
            } catch (error) {
                console.log(error);
            }
        };
        verify();
    }, [token]);

    return(
        <div
            style={{
                textAlign: "center",
                marginTop: "100px",
            }}
        >
            <h2>
                Verifying your email...
            </h2>
        </div>
    );
}