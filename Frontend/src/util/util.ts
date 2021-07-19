export const zip = (a: any[], b: { [x: string]: any; }) => a.map((k, i) => [k, b[i]]);

