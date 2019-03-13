import { format } from 'secure-template';

const data = {
    name: "fisher",
    address: { city: 'BeiJing' },
    colors: ['blue', 'green'],
    books: [{ name: 'name1' }]
}

console.log(format('My name is {name} and I am from {address.city}.', data));
console.log(format('My favorite book is <<{books[0].name}>>.', data));
console.log(format('I like {0} and {1}.', data.colors));
// Escape {} pairs by using double {{}}
console.log(format('I am {{name}}', data));