import { encrypt, decrypt } from "@/utils/helper-support";
import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";

type UserState = {
    token: string,
    name: string,
    email: string,
    user: any,
    permission: any,
}

type AuthState = {
    user: string | null,
    handleLogin: (data:UserState) => void,
    handleLogout: (reload:boolean) => void,
    setValue: (key: string, value: string) => void,
}

export const useAppStore = create(
    persist<AuthState>(
      (set) => ({
        user: null,
        newTransaction: false,
        handleLogin: (data: UserState) => {
            set({
                user: encrypt(JSON.stringify(data)),
            });
            window.location.href = '/';
        },
        handleLogout: (reload:boolean = true) => {
            set({
                user: null,
            });
            useAppStore.persist.clearStorage();
            reload && window.location.reload();
        },
        setValue: (key: string, value: string) => {
            set({ [key]: encrypt(value) });
        }
      }),
      {
        name: 'app_storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  );

  export const Auth = () : UserState | any  => {
    if ( ! useAppStore.getState().user ) return null;
    return JSON.parse(decrypt(useAppStore.getState().user ?? ''));
  }

  export const AuthUser = () : {uuid:string, first_name:string, last_name:string, email:string, email_verified:boolean, role:string, permissions: any}  => {
    return Auth();
  }

  export const AuthToken = () : string | null => {
    const logged = Boolean(!! useAppStore.getState().user);
    return logged ? Auth().token : null;
  }

export const getValue = (key: string) : string | null => {
  return decrypt((useAppStore.getState() as { [key: string]: any })[key] ?? '');
}

export const updateAuthUser = (key:string, value:any) => {
    const auth = Auth();

    if (!auth) return;

    auth[key] = value;

    useAppStore.setState({user: encrypt(JSON.stringify(auth))});
}

export const onLogout = (reload:boolean = true) => {
    useAppStore.getState().handleLogout(reload);
}
