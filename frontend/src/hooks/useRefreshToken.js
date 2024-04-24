import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();
    
    const refresh = async () => {
        if (localStorage.getItem('log_refresh')) {
            const payload = {
                refreshToken: JSON.parse(localStorage.getItem('log_refresh'))
            }
            const response = await axios.post('/auth/auth/refresh-token', JSON.stringify(payload), {
                headers: { 'Content-Type': 'application/json' },
            });

            const accessToken = response.data?.results?.access?.token;

            setAuth(prev => {
                return { ...prev, accessToken: accessToken }
            });

            if (!auth.user || !auth.role) {
                const response = await axios.get('/auth/auth/me', {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
                });

                const { user } = response.data?.results;
                const { role } = user;

                setAuth(prev => {
                    return { ...prev, user: user, role: role, }
                });
            }

            return response.data.accessToken;
        }
    }
    return refresh;
}

export default useRefreshToken;