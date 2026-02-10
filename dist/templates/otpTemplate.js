export const otpTemplate = (otp, appName, expiresInMinutes, emailTitle) => {
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${appName} – ${emailTitle}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f6fb;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <tr>
              <td style="padding:24px 24px 12px;text-align:center;">
                <h1 style="margin:0;font-size:22px;color:#1f2937;">
                 ${emailTitle}
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:0 24px 24px;color:#374151;font-size:14px;line-height:1.6;">
                <p style="margin:0 0 12px;">
                  Thanks for signing up to <strong>${appName}</strong>.
                </p>
                <p style="margin:0 0 20px;">
                  Use the verification code below to confirm your email address.
                </p>

                <!-- OTP Box -->
                <div style="text-align:center;margin:24px 0;">
                  <div style="
                    display:inline-block;
                    padding:14px 24px;
                    font-size:28px;
                    letter-spacing:6px;
                    font-weight:700;
                    color:#111827;
                    background:#f1f5f9;
                    border-radius:10px;
                  ">
                    ${otp}
                  </div>
                </div>

                <p style="margin:0 0 12px;">
                  ⏳ This code will expire in <strong>${expiresInMinutes} minutes</strong>.
                </p>

                <p style="margin:0;">
                  If you didn’t request this, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:16px 24px;border-top:1px solid #e5e7eb;text-align:center;font-size:12px;color:#6b7280;">
                © ${new Date().getFullYear()} ${appName}. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};
//# sourceMappingURL=otpTemplate.js.map