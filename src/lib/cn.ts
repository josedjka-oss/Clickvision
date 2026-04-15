type CnArg = string | undefined | null | false;

export const cn = (...inputs: CnArg[]) => inputs.filter(Boolean).join(" ");
