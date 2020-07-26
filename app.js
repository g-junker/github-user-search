const inputText = document.querySelector('#input_text');
const user = document.querySelector('#user');
const repositories = document.querySelector('#repositories');
const uri = 'https://api.github.com/users/'

inputText.addEventListener('keyup', function(e){
    e.preventDefault();
    fetch(uri + inputText.value)
        .then((response) => {
            if(response.ok){
                return response.json(); 
            } else {
                throw new Error();
            }
        })
        .then((data) => {
            user.innerHTML = '';
            repositories.innerHTML = '';
            repositories.style.display = 'none';

            if (inputText.value != '') {
                const newUser = document.createElement('ul');
                newUser.className = 'user';
                newUser.innerHTML = `
                    <li><img src="${data.avatar_url}"></li>
                    <li><h2>${data.login}</h2></li>
                    <li>${data.name}</li>
                    <li>${data.company}</li>
                    <li>${data.location}</li>
                    <li><a href="${data.html_url}" target="_blank">View Profile</a> &nbsp | &nbsp <a href="#" target="_blank" id="repos">Repositories</a></li>
                `;
                user.appendChild(newUser);

                checkNullValue();

                let repos = document.querySelector('#repos');
                repos.addEventListener('click', function(e){
                    e.preventDefault();
                    fetch(uri + inputText.value + '/repos')
                        .then(response => response.json())
                        .then(data => {
                            repositories.style.display = 'block';
                            repositories.innerHTML = '<h2>Repositories</h2>';
                            data.forEach(function(item){
                                const repositoryItem = document.createElement('div');
                                repositoryItem.className = 'repos';
                                repositoryItem.innerHTML = `
                                <ul>
                                    <li><a href="${item.html_url}" target="_blank"><h3>${item.name}</h3></a></li>
                                    <li>${item.description}</li>
                                    <li>${item.language}</li>
                                </ul>
                                `;
                                repositories.appendChild(repositoryItem);

                                checkNullValue();
                            });
                        })
                })    
            }
        })
        .catch( function(err){
            user.innerHTML = '<div class="error">No users found</div>';
            repositories.style.display = 'none';
        });
    });
    
let checkNullValue = function() {
    let li = document.getElementsByTagName('li');
    for(let i = 0; i < li.length; i++){
        if(li[i].innerText == "null"){
            li[i].style.display = 'none';
        }  
    }
}

let clearField = function(){
    inputText.value="";
}




