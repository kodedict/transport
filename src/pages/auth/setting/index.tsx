import Button from "@/components/form/button"
import InputField from "@/components/form/input-field"
import AuthLayout from "@/layouts/auth"
import PageTitle from "@/layouts/partials/page-title"
import { AuthUser } from "@/store/auth"
import { can_permission } from "@/utils/permission"
import { useState } from "react"
import ChangePassword from "./change-password"
import SetBankDetails from "./bank-details"
import SetNotificationSetting from "./notifcation"

const Settings = () => {
    const [currentTab, setCurrentTab] = useState<string>('account_information');

    const Auth = AuthUser();

    return (
        <AuthLayout>
        <div>
            <PageTitle title="Settings" />
            
            {can_permission(['can_modify_setting']) && <div className="mb-5 border-b border-gray-200">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
                    <li onClick={() => setCurrentTab('account_information')} className="cursor-pointer me-2">
                        <span className={`${currentTab === 'account_information' ? 'text-primary border-primary border-b-2' : ''} inline-flex items-center justify-center p-4 rounded-t-lg  active group`} aria-current="page">
                            Account information
                        </span>
                    </li>
                    {/* <li onClick={() => setCurrentTab('settings')} className="cursor-pointer me-2">
                        <span className={`${currentTab === 'settings' ? 'text-primary border-primary border-b-2' : ''} inline-flex items-center justify-center p-4  rounded-t-lg  active group`} aria-current="page">
                            Settings
                        </span>
                    </li> */}
                </ul>
            </div>}

            {currentTab === 'account_information' && (
                <div className="grid gap-4">
                <h4 className="themeTextSecondary">Profile details</h4>
                <div style={{ boxShadow:'rgba(149, 157, 165, 0.2) 0px 8px 24px' }} className="grid gap-4 p-5 md:grid-cols-2 themeRounded">
                    <InputField disabled={true} label="First name" value={Auth?.first_name}/>
                    <InputField disabled={true} label="Last name" value={Auth?.last_name}/>
                    <InputField disabled={true} label="Email" value={Auth?.email}/>
                </div>
                <ChangePassword/>
            </div>
            )}

            {/* {currentTab === 'settings' && (
            <div className="grid gap-4">
                <SetBankDetails/>
                <SetNotificationSetting/>
            </div>
            )} */}
        </div>
    </AuthLayout>
    )
}

export default Settings