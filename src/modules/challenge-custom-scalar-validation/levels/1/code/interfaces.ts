interface resetPasswordRequestResult {
    user_id: string,
    reset_token: string
}

interface Payload {
    resetToken: string,
    userId: number,
    newPassword: string
}

interface ResetCustomerPasswordArguments {
    payload: Payload
}

interface ResetCustomerPasswordResponse {
    result: string,
    debug: string
}

export {
    ResetCustomerPasswordArguments,
    ResetCustomerPasswordResponse,
    resetPasswordRequestResult
};