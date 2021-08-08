
// A hybrid flat file store/changes database.
//  The database is stored 
// The changes are overwritten frequently



module.exports = function({
    folder = "db",
    dbfile = "data.json",
    changefile = "changes.json",
    csvfolder = "csv",
    parse = JSON.parse,
    stringify = JSON.stringify
  }){

  let X = {};
  let __store = {};
  let __changes = {};

  //TODO determine when to save, ie overwrite

  X.setFolder = s => { folder = s; }
  X.setDbFile = s => { dbfile = s; }
  X.setChangeFile = s => { changefile = s; }
  X.setCSVFolder = s => { csvfolder = s; }
  X.setParse = f => { parse = f; }
  X.setStringify = f => { stringify = f; }

  X.get = (k) => {
    return new Promise((yes, no) => {
      yes(parse(__store[k]));
    })
  }

  X.set = (k,v) => {
    return new Promise((yes, no) => {
      __store[k] = stringify(v);
      __changes[k] = stringify(v);
    })
  }

  X.getTable = (table, column, index) => {
    return X.get(`<${table}|${column}|${index}>`);
  }

  X.setTable = (table, column, index, value) => {
    return X.set(`<${table}|${column}|${index}>`, value);
  }

  X.save = () => {
    return new Promise((yes, no) => {
    })
  }

  X.load = () => {
    return new Promise((yes, no) => {
    })
  }

  // saves changes only.
  X.flush = ()=>{
    return new Promise((yes, no) => {
    })
  }


  return X;
}
