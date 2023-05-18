console.log(fetch("https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages").then((t=>{if(!t.ok)throw new Error(t.statusText);return t.json()})));
//# sourceMappingURL=index.043cf698.js.map
