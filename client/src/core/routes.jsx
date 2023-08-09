import { Path } from "./paths";
import GuestHome from "../sections/homes/GuestHome";
import { VerifyingPasswordHash } from "../sections/components/VerifyingPasswordHash";
import { VerifyingEmail } from "../sections/components/VerifyinngEmail";

export const admin_routes = []
export const guest_routes = [
    { name: "Hompage", path: Path.Homepage, component: GuestHome, title: `Welcome ${window.appName}` },
    { name: "Verfying Password Hash", path: Path.VerifyPasswordHash, component: VerifyingPasswordHash, title: `${window.appName} Account Recovery` },


];
export const merchant_routes = [
    { name: "Hompage", path: Path.Homepage, component: GuestHome, title: `Welcome ${window.appName}` }

]
export const authenticated_routes = [
    { name: "Hompage", path: Path.Homepage, component: GuestHome, title: `Welcome ${window.appName}` },
    { name: "Verfying Mail Hash", path: Path.VerifyMailHash, component: VerifyingEmail, title: `${window.appName} email verification` },


];
export const master_routes = {}