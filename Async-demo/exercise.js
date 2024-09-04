async function EnviaEmail(){
  const customer = await getCustomer(1);
  console.log('Customer: ',customer);
  try{
    if(customer.isGold){
      const movies = await getTopMovies();
      console.log('Top movies: ', movies);
  
      const email = await sendEmail(customer.email, movies);
      if(email){
        console.log('Email sent...');
      }
      else{
        throw new Error('Email not sent...');
      }
    }
  }
  catch(err){
    console.log('Error:\n', err.message);
  }
}


function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ 
        id: id, 
        name: 'João Eduardo Pereira Rabelo', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);  
  })
}

function getTopMovies() {
  return new Promise((resolve, rejetct) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 4000);
  });
}

EnviaEmail();