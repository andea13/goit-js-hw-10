console.log(fetch(`https://restcountries.com/v3.1/name/${"Ukraine"}`).then((t=>{if(!t.ok)throw new Error(t.statusText);return t.json()})));
//# sourceMappingURL=index.cdddcdbb.js.map
