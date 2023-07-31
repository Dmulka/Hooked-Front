import { createContext, useState } from "react"

const AuthContext = createContext();

const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [users, setUser] = useState(null)

    const login = (userData) => {
        setIsAuthenticated(true)
        setUser(userData)
    }

    const logout = () => {
        setIsAuthenticated(false)
        setUser(null)
    }

return (
    <AuthContext.Provider value={{ isAuthenticated, users, login, logout }}>
        {props.children}
    </AuthContext.Provider>
)}

export { AuthContext, AuthProvider }