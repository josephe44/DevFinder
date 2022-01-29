const input = document.getElementById('user-input')
const button = document
  .getElementById('btn')
  .addEventListener('click', getGitHubUser)

input.addEventListener('click', clearDisplay)

async function getGitHubUser() {
  if (input.value === '') {
    alert('Please enter a username')
  } else {
    const user = input.value
    const profileResponse = await fetch(`https://api.github.com/users/${user}`)
    let profile = await profileResponse.json()
    console.log(profile)
    if (profile.message === 'Not Found') {
      showAlert(profile)
    } else {
      displayUser(profile)
    }
  }
  input.value = ''
}

function clearDisplay() {
  document.getElementById('output').innerHTML = ''
}

function showAlert(profile) {
  profile = `
    <div>${profile.message}</div>
  `
  document.getElementById('output').innerHTML = profile
}

function displayUser(profile) {
  profile = `
      <div class="card">
        <div class="card-header">
          <div class="card-img">
            <img
              src=${profile.avatar_url}
              alt="profile-img"/>
          </div>
          <div class="card-profile">
            <div class="card-profile-name">
              <h3>${profile.name}</h3>
              <p>${profile.login}</p>
            </div>
            <div class="card-profile-date">
              <p>${profile.created_at}</p>
            </div>
          </div>
        </div>
        <div class="card-body">
          <p>${profile.bio}</p>
        </div>
        <div class="card-details">
          <div class="repo">
            <h4>Repos</h4>
            <p>${profile.public_repos}</p>
          </div>
          <div class="followers">
            <h4>Followers</h4>
            <p>${profile.followers}</p>
          </div>
          <div class="following">
            <h4>Following</h4>
            <p>${profile.following}</p>
          </div>
        </div>
        <div class="card-social">
          <div class="social-item">
          <i class="fas fa-map-marker-alt"></i><span>${profile.location}</span>
          </div>
          <div class="social-item">
            <i class="fab fa-github"></i><span><a href=${profile.html_url}>Github</a></span>
          </div>
          <div class="social-item">
            <i class="fab fa-twitter"></i><span>${profile.twitter_username}</span>
          </div>
          <div class="social-item">
            <i class="fas fa-building"></i><span>${profile.company}</span>
          </div>
        </div>
      </div>
      `
  document.getElementById('output').innerHTML = profile
}
