 // This variable selects the div where my profile information will appear.
const overview = document.querySelector(".overview");
 // This variable selects the unordered list to display the repos list.
const repoList = document.querySelector(".repo-list");

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
    displayRepoInfo(repoData);
};

getRepos();

// A function to display information about each repo
const displayRepoInfo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};