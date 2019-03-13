import { compile } from "secure-template";

const myFormat = compile('I am a {name}, I am {age} years old.');

const data = { name: 'fisher', age: 18 };
const data2 = { name: 'jack', age: 20 };

console.log(myFormat(data));
console.log(myFormat(data2));