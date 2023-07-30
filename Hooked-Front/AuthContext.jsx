import { createContext } from "react"

const AuthContext = createcoontext();

const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(fales)

    const login = () => {
        setIsAuthenticated(true)
    }

    const logout = () => {
        setIsAuthenticated(fales)
    }

return (
    <AuthContext.Provider value ={{ isAuthenticated, login, logout }}>
        {props.children}
    </AuthContext.Provider>
)}

export { AuthContext, AuthProvider }