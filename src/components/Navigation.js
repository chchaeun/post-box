const Navigation = ({userObj}) =>{

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/profile">{userObj.displayName}'s Profile</a>
                    </li>
                </ul>
            </nav>
        </>
    );

}

export default Navigation;