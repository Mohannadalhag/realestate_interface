const client = require('./client');
const { Verify_API_URL, LOGIN_API_URL, LOGOUT_API_URL, REGISTER_API_URL, Check_Verify_API_URL, PROFILE_ME_API_URL, UPDATE_PASSWORD_API_URL, FORGET_PASSWORD_API_URL, UPDATE_EMAIL_API_URL, VERIFY_UPDATE_EMAIL_API_URL, REFRESH_TOKEN_API_URL } = require('../constants/index');
module.exports = {
    register: async (body) => {
        const data = client.post(REGISTER_API_URL, body);
        return data;
    },
    checkVerifyCode: async (body) => {
        const data = client.post(Check_Verify_API_URL, body);
        return data;
    },
    generate_code: async (body) => {
        const data = client.post(Verify_API_URL, body);
        return data;
    },
    generateCodeEmail: async (body) => {
        const data = client.putWithoutId(UPDATE_EMAIL_API_URL, body);
        return data;
    },
    editEmail: async (body) => {
        const data = client.putWithoutId(VERIFY_UPDATE_EMAIL_API_URL, body);
        return data;
    },
    login: async (body) => {
        const data = client.post(LOGIN_API_URL, body);
        return data;
    },
    refreshFirebaseToken: async (token) => {
        try {
            const data = client.putWithoutId(REFRESH_TOKEN_API_URL, {firebase_token:token});
            return data;
        } catch (err) {
            console.log(err)
            return
        }

    },
    logout: async () => {
        const data = client.post(LOGOUT_API_URL, {});
        return data;
    },
    getProfile: async () => {
        const data = client.get(PROFILE_ME_API_URL);
        return data;
    },
    resetPass: async (body) => {
        const data = client.putWithoutId(UPDATE_PASSWORD_API_URL, body);
        return data;
    },
    forgetPass: async (body) => {
        const data = client.post(FORGET_PASSWORD_API_URL, body);
        return data;
    }
}
