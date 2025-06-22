import { AuthUser } from "@/store/auth"

const Auth = AuthUser();

const can_role = (roles: string []) => {
    return true;
    return roles.includes(Auth.role);
}

const can_permission = (permissions: string []) => {
    return true;
    //return Auth.permissions.every((permission: string) => permissions.includes(permission))
     return permissions.some((permission: string) => Auth.permissions.includes(permission))
}

export {
    can_role,
    can_permission,
}