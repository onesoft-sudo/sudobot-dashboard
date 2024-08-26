import { getAxiosClient } from "@/client/axios";

type VerifyMemberPayload = {
    guildId: string;
    userId: string;
    captchaToken: string;
    token: string;
};

export const verifyMember = async (payload: VerifyMemberPayload) => {
    const res = await getAxiosClient().post(
        `/guilds/${encodeURIComponent(payload.guildId)}/members/${encodeURIComponent(payload.userId)}/verify`,
        {
            captchaToken: payload.captchaToken,
            token: payload.token,
        },
    );

    return res.data;
};
