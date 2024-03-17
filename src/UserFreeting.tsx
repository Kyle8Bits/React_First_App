function UserGreeting(prop: any) {
    return(
        prop.isLoggedIn ? <h2 className = "welcome-mess">Welcome back, {prop.username}!</h2> 
                        : <h2 className = "login-prompt">Please login.</h2>
    );
}

export default UserGreeting;
