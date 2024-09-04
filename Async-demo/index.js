//-----------------------------------------------------------------------------------------------------
// Syncronous programming (Exemplo, não funciona com callbacks)
//-----------------------------------------------------------------------------------------------------

/* 
console.log('Before');

const user = getUser(1);
const repos = getRepositories(user.gitHubUsername);
const commits = getCommits(repos[0]);

console.log('After');
*/

//-----------------------------------------------------------------------------------------------------
// Assyncronous programming (With Callback "Hell")
//-----------------------------------------------------------------------------------------------------

/*
console.log('Before');

getUser(1, (user) => {
    console.log('User:',user,"\n-------------------------------------------------");

    getRepositories(user.gitHubUsername, (repos) => {
        console.log('Repos:', repos,"\n-------------------------------------------------");

        getCommits('repo1', (commits) => {
            console.log('Commits:', commits,"\n-------------------------------------------------");
        });
    });
});

console.log('After');
*/

//-----------------------------------------------------------------------------------------------------
// Assyncronous programming (Without Callback "Hell" (Achei ridiculamente mais complicado e confuso))
//-----------------------------------------------------------------------------------------------------

/*
console.log('Before');

getUser(1, displayUser);

function displayUser(user){
    console.log('User:',user,"\n-------------------------------------------------");

    getRepositories(user.gitHubUsername, displayRepos);
}   
function displayRepos(repos){
    console.log('Repos:', repos,"\n-------------------------------------------------");
    
    getCommits('repo1', displayCommits);
}
function displayCommits(commits){
    console.log('Commits:', commits,"\n-------------------------------------------------");
}
console.log('After');
*/

//-----------------------------------------------------------------------------------------------------
// Assync SETTLED prog - With Promisses
//-----------------------------------------------------------------------------------------------------

/*
console.log('Before');

promisseGetUser(1)
    .then(user => (console.log('User:',user,"\n-------------------------------------------------"),
    promisseGetRepositories(user.gitHubUsername)))
        .then(repos => (console.log('Repos:', repos,"\n-------------------------------------------------"),
        promisseGetCommits(repos[0])))
            .then(commits => console.log('Commits:', commits,"\n-------------------------------------------------")),
            .catch(err => console.log('Error:\n', err.message));

console.log('After');
*/

//-----------------------------------------------------------------------------------------------------
// Assync PARALLEL prog - With Promisses (Desta forma, não é possível pegar o resultado de uma promessa e usar em outra, pois as promessas são executadas em paralelo)
//-----------------------------------------------------------------------------------------------------

/*
console.log('Before')

const p1 = promisseGetUser(1);

const p2 = promisseGetRepositories('JoaoEduardoP');

const p3 = promisseGetCommits(["repo1", "repo2", "repo3"]);

Promise.all([p1, p2, p3])
    .then(result => console.log('Result:\n', result))
    .catch(err => console.log('Error:\n', err.message));

console.log('After');
*/

//-----------------------------------------------------------------------------------------------------
// Assync and Await
//-----------------------------------------------------------------------------------------------------

console.log('Before');

async function displayCommits(){
    try{
        const user = await promisseGetUser(1);
        console.log('User:',user,"\n-------------------------------------------------");
    
        const repo = await promisseGetRepositories(user.gitHubUsername);
        console.log('Repos:', repo,"\n-------------------------------------------------");
    
        const commit = await promisseGetCommits(repo[0]);
        console.log('Commits:', commit,"\n-------------------------------------------------");
    }
    catch(err){
        console.log('Error:\n', err.message);
    }

}

displayCommits();

console.log('After');

// Callbacks ------------------------------------------------

function getUser(id, callback){
    setTimeout(() => {
        console.log(`Reading user '${id}' from a database...`);
        callback({ id: 1, gitHubUsername: 'JoaoEduardoP' });
    }, 2000);
};

function getRepositories(gitHubUsername, callback){
    setTimeout(() => {
        console.log(`Calling GitHub API from user '${gitHubUsername}' ...`);
        callback(["repo1", "repo2", "repo3"]);
    }, 2000);
};

function getCommits(repo, callback){
    setTimeout(() => {
        console.log(`Calling GitHub API from repo '${repo}' ...`);
        callback(["commit"]);
    }, 2000);
}

// Promisses ------------------------------------------------

function promisseGetUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Reading user '${id}' from a database...`);
            resolve({ id: 1, gitHubUsername: 'JoaoEduardoP' });
            //reject(new Error('Deu não mano'));
            
        }, 2000);
    });
}

function promisseGetRepositories(gitHubUsername){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Calling GitHub API from user '${gitHubUsername}' ...`);
            resolve(["repo1", "repo2", "repo3"]);
        }, 2000);
    });
}

function promisseGetCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Calling GitHub API from repo '${repo}' ...`);
            resolve(["commit"]);
        }, 2000);
    });
}
// Async and await -------------------------------------------

