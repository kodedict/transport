import LineLoader from "./line-loader";
import SpinnerLoader from "./spinner-loader";

const PageLoader = () => {
    return(
        <div style={{background: 'rgba(0,0,0,0.5)'}} className="absolute top-0 left-0 z-50 w-full h-full">
                <LineLoader/>
                <div className="flex flex-col items-center justify-center w-full h-full">
                        <p className="flex items-center space-x-2">
                            <SpinnerLoader/>
                            <span className="text-white animate-pulse themeTextSecondary">loading</span>
                        </p>
                </div>
            </div>
    );
}

export default PageLoader
