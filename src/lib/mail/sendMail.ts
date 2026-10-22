import nodemailer from "nodemailer";
import { MAIL_CONFIG } from "./consts";
import type { TSendMailInput } from "./types";

type TMailEnv = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  to: string;
  from: string;
};

const getMailEnv = (): TMailEnv => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const refreshToken = process.env.REFRESH_TOKEN;
  const to = process.env.EMAIL_TO_SEND;
  const from = process.env.EMAIL_FROM || to;

  if (!clientId || !clientSecret || !refreshToken || !to || !from) {
    throw new Error("Missing Gmail OAuth or email environment variables");
  }

  return { clientId, clientSecret, refreshToken, to, from };
};

const getAccessToken = async ({
  clientId,
  clientSecret,
  refreshToken,
}: Pick<TMailEnv, "clientId" | "clientSecret" | "refreshToken">): Promise<string> => {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  const payload = (await response.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  if (!response.ok || !payload.access_token) {
    throw new Error(
      payload.error_description ||
        payload.error ||
        "Failed to refresh Gmail OAuth access token",
    );
  }

  return payload.access_token;
};

const createTransporter = async () => {
  const env = getMailEnv();
  const accessToken = await getAccessToken(env);

  return {
    env,
    transporter: nodemailer.createTransport({
      service: MAIL_CONFIG.serviceLabel,
      auth: {
        type: "OAuth2",
        user: env.from,
        clientId: env.clientId,
        clientSecret: env.clientSecret,
        refreshToken: env.refreshToken,
        accessToken,
      },
    }),
  };
};

export const sendMail = async ({
  subject,
  text,
  html,
  replyTo,
}: TSendMailInput): Promise<void> => {
  const { env, transporter } = await createTransporter();

  await transporter.sendMail({
    from: env.from,
    to: env.to,
    replyTo,
    subject,
    text,
    html,
  });
};
