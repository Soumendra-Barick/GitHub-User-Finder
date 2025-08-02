let searchBtn = document.querySelector(".search");
let usernameinp = document.querySelector(".usernameinp");
let card = document.querySelector(".card");

function getProfileData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (!raw.ok) throw new Error("User not found...");
    return raw.json();
  });
}

function getRepos(username) {
  return fetch(
    `https://api.github.com/users/${username}/repos?sort=updated`
  ).then((raw) => {
    if (!raw.ok) throw new Error("Failed to fetch repos...");
    return raw.json();
  });
}

function decorateProfileData(details) {
  let data = `<img
          src="${details.avatar_url}"
          alt="User Avatar"
          class="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
        />

        <div class="flex-1">
          <h2 class="text-2xl font-bold">${details.name}</h2>
          <p class="text-gray-400 text-sm">@${details.login}</p>
          <p class="mt-2 text-gray-300">
            ${details.bio ? details.bio : ""}
          </p>

          <div class="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
            <span class="bg-gray-800 px-3 py-1 rounded-md">
              🗃️ Repositories: <strong class="text-white">${details.public_repos}</strong>
            </span>
            <span class="bg-gray-800 px-3 py-1 rounded-md">
              👥 Followers: <strong class="text-white">${details.followers}</strong>
            </span>
            <span class="bg-gray-800 px-3 py-1 rounded-md">
              👤 Following: <strong class="text-white">${details.following}</strong>
            </span>
            <span class="bg-gray-800 px-3 py-1 rounded-md">
              📍 Location: <strong class="text-white">${details.location}</strong>
            </span>
            <span class="bg-gray-800 px-3 py-1 rounded-md">
              🔗 Blog:
              <a
                href="#"
                target="_blank"
                class="text-blue-400 hover:underline"
                >${details.blog}</a
              >
            </span>
          </div>
        </div>`;

  card.innerHTML = data;
}

searchBtn.addEventListener("click", function () {
  let username = usernameinp.value.trim();
  if (username.length > 0) {
    getProfileData(username).then((data) => {
      decorateProfileData(data);
    });
  } else {
    alert();
  }
});
