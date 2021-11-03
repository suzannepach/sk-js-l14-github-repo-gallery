 // This variable selects the div where my profile information will appear.
const overview = document.querySelector(".overview");
 // This variable selects the unordered list to display the repos list.
const repoList = document.querySelector(".repo-list");
// This variable selects the section where all my repo information appears.
const repos = document.querySelector(".repos");
// This variable selects the section where the individual repo data will appear.
const repoData = document.querySelector(".repo-data");

const username = "suzannepach";

// An async function to fetch information from my GitHub profile
const getProfileData = async function () {
    const profileRequest = await fetch (
        `https://api.github.com/users/${username}`
    );
    const data = await profileRequest.json();
    displayProfileData(data);
};
getProfileData();

// This function displays the fetched user information on the page.
const displayProfileData = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = 
        `<figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> 
        `;
    overview.append(div);
}

// An async function to fetch my repos
const getRepos = async function () {
    const reposRequest = await fetch (
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );
    const repoData = await reposRequest.json();
    displayRepo(repoData);
};

getRepos();

// A function to display information about each repo
const displayRepo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

// click event to show repo info
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getReposInfo(repoName);
    }
});

// An async function to get specific repo info
const getReposInfo = async function (repoName) {
    const reposInfoRequest = await fetch (
        `https://api.github.com/repos/${username}/${repoName}`
    ); 
    const repoInfo = await reposInfoRequest.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    
    const languages = [];
    for (let key in languageData) {
        languages.push(key);
    };
    displayRepoInfo(repoInfo, languages);
};

// A function function to display the specific repo information
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const repoInfoElement = document.createElement("div");
    repoInfoElement.innerHTML= 
        `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
    repoData.append(repoInfoElement);
    repoData.classList.remove("hide");
    repos.classList.add("hide");
};