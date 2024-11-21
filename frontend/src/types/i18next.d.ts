// @types/i18next.d.ts
import 'i18next';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'translation';
        resources: {
            translation: {
                welcome: string;
            };
        };
    }
}
