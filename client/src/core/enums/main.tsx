enum AccessType {
    Admin,
    Merchant,
    Authenticated,
    Master,
    Guest
}
enum ProcessType {
    Loading,
    None,
    Fetching
}



enum GeneralAdv {
    SHOW_PRODUCT,
    SHOW_DEAL,
    DOWNLOAD_APP,
    SELL_BREEZE,
    CREATE_AN_ACOOUNT,
    EARN_MONEY,
    BECOME_A_MERCHANT,
    None

}

enum AppPops {
    LOGIN,
    REGISTER,
    FORGETPASSWORD,
    CHANGEPASSWORD,
    BEMERCHANT,
    VERIFYEMAIL,
    VERIFYMERCHANT,
    SHOW_EMAILVERIFIED,
    ADD_FEATURE,
    NONE
}

enum Feature {
    AddCategory,
    AddSubCategory,
}



enum NavigationAxis {
    Horizontal,
    Vertical
}
enum LayoutStyle {
    TOP_LEFT_CONTENT,
    CONTENT_TOP_LEFT,
    LEFT_CONTENT_TOP,

    STRAIGHT_LINE,

    RIGHT_TOP_CONTENT,
    TOP_CONTENT_RIGHT,
    CONTENT_RIGHT_TOP,

    TOP_LEFT_CONTENT_RIGHT,
    RIGHT_CONTENT_LEFT_TOP,
    CONTENT_RIGHT_TOP_LEFT,
    LEFT_TOP_RIGHT_CONTENT,
}
enum RequestMethod {
    POST,
    GET,
    DELETE,
    PUT
}
enum AccountForms {
    Login,
    Signup,
    ForgetPassword,
    ChangePassword
}

enum Country {
    GHANA,
    NIGERIA,
    KENYA
}

export { AccessType, LayoutStyle, ProcessType, RequestMethod, NavigationAxis, GeneralAdv, AppPops, AccountForms, Country, Feature }