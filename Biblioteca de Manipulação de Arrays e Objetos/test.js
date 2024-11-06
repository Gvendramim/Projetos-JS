import ArrayObjectLib from "./arrayObjectLib.js";

const sampleArray = [
  { name: "Gabriel", age: 29, city: "São Paulo" },
  { name: "Maria", age: 34, city: "Rio de Janeiro" },
  { name: "João", age: 29, city: "São Paulo" },
  { name: "Ana", age: 22, city: "Belo Horizonte" },
  { name: "Carlos", age: 34, city: "Rio de Janeiro" },
];

console.log("Filtrando idade > 25:", ArrayObjectLib.filterByCondition(sampleArray, person => person.age > 25));

console.log("Agrupando por cidade:", ArrayObjectLib.groupBy(sampleArray, "city"));

console.log("Ordenando por idade (asc):", ArrayObjectLib.sortBy(sampleArray, "age"));

console.log("Mapeando nomes:", ArrayObjectLib.mapToKey(sampleArray, "name"));

console.log("Primeira pessoa de São Paulo:", ArrayObjectLib.findByCondition(sampleArray, person => person.city === "São Paulo"));

console.log("Todos com mais de 18 anos:", ArrayObjectLib.everyCondition(sampleArray, person => person.age > 18));

console.log("Contagem de pessoas de São Paulo:", ArrayObjectLib.countByCondition(sampleArray, person => person.city === "São Paulo"));
