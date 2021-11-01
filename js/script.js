 // This variable selects the div where my profile information will appear.
const overview = document.querySelector(".overview");

const username = "suzannepach";

// An async function to fetch information from your GitHub profile
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
