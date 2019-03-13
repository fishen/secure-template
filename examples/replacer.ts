import { format, defaultReplace } from "secure-template";

const data = {
    name: "fisher",
    birth: new Date('aaa')
}

const str = format('I am {name}, my birthday is {birth}.', data, (value) => {
    if (value instanceof Date && isNaN(value.valueOf())) {
        return new Date().toDateString();
    } else {
        return defaultReplace(value);
    }
});
console.log(str);