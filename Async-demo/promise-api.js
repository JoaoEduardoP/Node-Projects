const p =  new Promise((resolve) => {
    setTimeout(() => {
        console.log('Assync operation - 1 ...');
        resolve(1);
    }, 2000);
    
});

const p2 =  new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Assync operation - 2 ...');
        resolve(2);
    }, 2000);
    
});

Promise.all([p, p2])
    .then(result => console.log('Result:', result))
    .catch(err => console.log('Error:', err.message));

/*

Promise.race([p, p2])
    .then(result => console.log('Result:', result))
    .catch(err => console.log('Error:', err.message));



*/