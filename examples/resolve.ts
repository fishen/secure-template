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

    