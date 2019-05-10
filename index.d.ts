declare module "secure-template" {
    type FormatData = any[] | Record<string, any>;
    type Replacer = (value: any) => string;
    type CompileResult = (data: FormatData, replacer?: Replacer) => string;
    /**
     * Resolve the string path, get the corresponding value from the data, and return undefined if it does not exist.
     * @param path The path of property, such as: 'a.b.c','b[2].c.e','d.e[1][0].f'.
     * @param data Data source.
     */
    export function resolve(path: string, data: FormatData): Record<string, any>;
    /**
     * Default replace function.
     * @param value The value to be format.
     */
    export function defaultReplace(value: any): string;
    /**
     * Format string template by placeholder({}) which included in data properties.
     * Escape {} pairs by using double {{}}.
     * The only restriction is that property path cannot contain whitespace.
     * @param template String tempalate.
     * @param data Data source.
     * @param replacer Optional replacer. By default, the null, undefined and NaN are converted to empty strings,
     * strings eliminate spaces before and after by invoke trim().
     */
    export function format(template: string, data: FormatData, replacer?: Replacer): string;
    /**
     * Compile the template to prepare for multiple formatting in the future which can improve performance.
     * @param template String tempalate.
     * @param replacer Optional replacer. By default, the null, undefined and NaN are converted to empty strings,
     * strings eliminate spaces before and after by invoke trim().
     */
    export function compile(template: string, replacer?: Replacer): CompileResult;
    export {};
}