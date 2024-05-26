import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { CSpinner } from "@coreui/react";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    console.log(auth?.accessToken)


    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, []);

    return (
        <>
            {isLoading
                ? <div className="d-flex justify-content-center">
                    <CSpinner color="info" />
                  </div>
                : <Outlet />
            }
        </>
    )
}

export default PersistLogin;