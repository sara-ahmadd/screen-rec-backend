import EventEmitter from "node:events";
export declare const sendEmail: ({ subject, text, html, to, }: {
    subject: string;
    text?: string;
    html: string;
    to: string;
}) => Promise<void>;
export declare const emailEmitter: EventEmitter<any>;
//# sourceMappingURL=sendingEmails.d.ts.map