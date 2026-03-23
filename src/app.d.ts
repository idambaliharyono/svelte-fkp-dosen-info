// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    interface Platform {
      env: {
        GOOGLE_CREDENTIALS_JSON: string | undefined;
        SPREADSHEET_DOSEN_FKP: KVNamespace | undefined;
      };
      cf: CfProperties;
      ctx: ExecutionContext;
    }
  }
}

export {};
