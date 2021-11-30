function sortArray(arr,prop){
    arr.sort((a,b)=>{
        if(typeof a[prop] ==='string')
        return b[prop].localeCompare(a[prop]);
      return b[prop] - a[prop];
    });
}

module.exports.sortArray = sortArray;