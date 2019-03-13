
type FormatData = any[] | Record<string, any>;
type Replacer = (value: any) => string;
type CompileResult = (data: FormatData, replacer?: Replacer) => string;

/**
 * Resolve the string path, get the corresponding value from the data, and return undefined if it does not exist.
 * @param path The path of property, such as: 'a.b.c','b[2].c.e','d.e[1][0].f'.
 * @param data Data source.
 */
export function resolve(path: string, data: FormatData) {
    if (typeof path !== "string" || !data) {
        return undefined;
    }
    const pathes = path.trim().split(".");
    let index = 0;
    const length = pathes.length;
    for (; index < length; index++) {
        const subpath = pathes[index];
        const matches = subpath.match(/^([^\[]+)((\[(\d+)\])+)$/);
        if (matches) {
            const [, name, arr] = matches;
            data = (data as any)[name];
            const regex = /((?<=\[)(\d+)(?=\]))+/g;
            let match = regex.exec(arr);
            while (match != null) {
                const idx = Number(match[0]);
                if (Array.isArray(data) && idx < data.length) {
                    data = data[idx];
                    match = regex.exec(arr);
                } else {
                    return undefined;
                }
            }
        } else {
            if ((data as any)[subpath] !== undefined) {
                data = (data as any)[subpath];
            } else {
                break;
            }
        }
    }
    return index === length ? data : undefined;
}

/**
 * Default replace function.
 * @param value The value to be format.
 */
export function defaultReplace(value: any): string {
    if ([undefined, null].indexOf(value) >= 0 || isNaN(value) && value !== value) {
        return "";
    } else if (typeof value === "string") {
        return value.trim();
    } else {
        return String(value);
    }
}

/**
 * Format string template by placeholder({}) which included in data properties.
 * Escape {} pairs by using double {{}}.
 * The only restriction is that property path cannot contain whitespace.
 * @param template String tempalate.
 * @param data Data source.
 * @param replacer Optional replacer. By default, the null, undefined and NaN are converted to empty strings,
 * strings eliminate spaces before and after by invoke trim().
 */
export function format(template: string, data: FormatData, replacer?: Replacer): string {
    return compile(template, replacer)(data);
}

/**
 * Compile the template to prepare for multiple formatting in the future which can improve performance.
 * @param template String tempalate.
 * @param replacer Optional replacer. By default, the null, undefined and NaN are converted to empty strings,
 * strings eliminate spaces before and after by invoke trim().
 */
export function compile(template: string, replacer?: Replacer): CompileResult {
    if (typeof template !== "string") {
        throw new TypeError("The template must be a string.");
    }
    const items: Array<[number, string, CompileResult]> = [];
    const regex = /({*)((?<={)\S+?(?=}))(}*)/g;
    let match: RegExpExecArray = regex.exec(template);
    while (match != null) {
        const [full, left, key, right] = match;
        if (left.length === 1 || right.length === 1) {
            items.push([match.index, full, function(data, innerReplacer) {
                const value = resolve(key, data);
                innerReplacer = innerReplacer || replacer || defaultReplace;
                const str = innerReplacer(value);
                return left.replace("{", "") + str + right.replace("}", "");
            }]);
        } else {
            items.push([match.index, full, function() {
                return left.replace("{{", "{") + key + right.replace("}}", "}");
            }]);
        }
        match = regex.exec(template);
    }
    return function(value: any, innerReplacer?: Replacer) {
        if (!value) {
            return template;
        }
        const array = template.split("");
        items
            .sort((x, y) => y[0] - x[0])
            .forEach(([index, str, fn]) => {
                const result = fn(value, innerReplacer);
                array.splice(index, str.length, result);
            });
        return array.join("");
    };
}
