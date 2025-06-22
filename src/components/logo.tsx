const Logo = () => {
    return (
        <span>
            <img src="/payg-logo.svg" alt="logo" className="w-12 h-12 dark:hidden"/>
            <img src="/payg-white-logo.svg" alt="logo" className="hidden w-12 h-12 dark:block"/>
        </span>
    );
}

export default Logo
