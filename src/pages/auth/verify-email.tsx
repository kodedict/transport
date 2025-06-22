import GuestLayout from "@/layouts/guest";
import { updateAuthUser, useAppStore } from "@/store/auth";
import {  useRef, useState } from "react";
import useApiRequest from '@/hooks/api-request/request';
import NumericInput from "@/components/form/numeric-input";
import SecondsCountdown from "@/components/seconds-countdown";
import Button from "@/components/form/button";

const VerifyEmail = () => {
    const [loadingVerification, setLoadingVerification] = useState<boolean>(false);

    const [verificationError, setVerificationError] = useState<string | null>(null);

    const [showResend, setShowResend] = useState<boolean>(false);

    const countdownRef = useRef<{ resetTimer: () => void } | null>(null);

     const {
            Post,
            requestLoading,
            errorMessage,
            isSuccessRequest
        } = useApiRequest();

    const submit = async (otp:any) => {
        setLoadingVerification(true);
        const onSubmit = await Post({endpoint: 'verify-email', payload: {otp}});
        setLoadingVerification(false);
            if ( ! onSubmit ){
                return;
            };
             window.location.href = '/';
            //update local storage
            updateAuthUser('email_verified', true);
    }

    const onResendOTP = async () => {
        const onSubmit = await Post({endpoint: 'send-otp'});
            if ( ! onSubmit ){
                console.log('Error sending OTP');
                return;
            };
        countdownRef.current?.resetTimer();
        setShowResend(false);
    }

    
    return (
        <GuestLayout>
            <div className="container">
                <h1 className="page-title">Email verification</h1>
                <p className="mt-2 text-[15px] themeTextMuted">Kindly input the OTP sent to your email to verify your email</p>
                <div className="mx-auto my-10 lg:w-2/">
                    <div className="relative">
                        <NumericInput onFilled={submit} length={6}/>
                        {loadingVerification && (<div className="absolute top-0 z-10 w-full h-full bg-gray-900 opacity-5"></div>)}
                    </div>
                    {loadingVerification && <div className="my-5 text-yellow-800 label animate-pulse dark:text-yellow-700">Verifying...</div>}
                    {errorMessage && (<div className="mt-5 themeTextError">{errorMessage}</div>)}
                </div>
                <p className="font-[400] text-[14px]">
                    { showResend ? <Button disabled={loadingVerification} isLoading={requestLoading && !loadingVerification} text="Resend OTP" onClick={onResendOTP} design=""/>: <span>
                        Resend in <span className="text-primary"><SecondsCountdown ref={countdownRef} onComplete={() => setShowResend(true)} seconds={30}/></span>
                    </span> }
                </p>
            </div>
        </GuestLayout>
    )
}

export default VerifyEmail