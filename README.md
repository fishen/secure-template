# secure-template
Format strings in a secure manner and also can access nested properties.

# Installation

>`$ npm install --save secure-template`

# Getting started

```
import { format } from 'secure-template';

const data = {
    name: "fisher",
    address: {city: 'BeiJing'},
    colors: ['blue', 'green'],
    books: [{name: 'name1'}]
}

console.log(format('My name is {name} and I am from {address.city}.', data));
console.log(format('My favorite book is <<{books[0].name}>>.', data));
console.log(format('I like {0} and {1}.', data.colors));
// Escape {} pairs by using double {{}}
console.log(format('I am {{name}}', data));
```
output:
```
My name is fisher and I am from BeiJing.
My favorite book is <<name1>>
I like blue and green.
I am {name}
```
> The only restriction is that property path cannot contain whitespace.
# Compiling templates
Compile the template to prepare for multiple formatting in the future which can improve performance.
```
import { compile } from "secure-template";

const myFormat = compile('I am a {name}, I am {age} years old.');

const data = { name: 'fisher', age: 18 };
const data2 = { name: 'jack', age: 20 };

console.log(myFormat(data));
console.log(myFormat(data2));
```
output:
```
I am a fisher, I am 18 years old.
I am a jack, I am 20 years old.
```
# Resolve properties
Resolve the string path, get the corresponding value from the data, and return undefined if it does not exist.
```
import { resolve } from 'secure-template';

const data = {
    arr: [1, { a: 2, b: [3, 4, 5] }, 6, [true, false, ['c', 'd', 'e']]],
    obj: {
        f: 7,
        g: [true, false, { h: 8, i: [9, 10] }],
        j: {
            k: 11,
            l: [11, 12, 13]
        }
    }
}

// array
console.log(resolve('0', data.arr));
console.log(resolve('3[2]', data.arr));
console.log(resolve('3[2][0]', data.arr));
console.log(resolve('4', data.arr));
// object
console.log(resolve('obj.f', data));
console.log(resolve('obj.j.k', data));
console.log(resolve('obj.aa', data));
// mix
console.log(resolve('arr[1].a', data));
console.log(resolve('arr[1].b[0]', data));
console.log(resolve('obj.g[2].i', data));
```
output:
```
1
[ 'c', 'd', 'e' ]
c
undefined
7
11
undefined
2
3
[ 9, 10 ]
```
# Custom value replacement
By default, the null, undefined and NaN are converted to empty strings. The strings eliminate spaces before and after by invoke trim().
If you want to change this default behavior, you can specify a custom replacement function on **format** and **compile**.

Please see the code below, as the default does not operate on the date, and sometimes the expected results may not be obtained.

```
import { format, defaultReplace } from "secure-template";

const data = {
    name: "fisher",
    birth: new Date('aaa')
}

const str = format('I am {name}, my birthday is {birth}.', data);
console.log(str);
```
output:
```
I am fisher, my birthday is Invalid Date.
```
A custom replacement function can be set with the last parameter. The only parameter is the current value.
```
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
```
output:
```
I am fisher, my birthday is Wed Mar 13 2019.
```


# Update Logs
