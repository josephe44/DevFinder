// * Event Listener for input and button
const input = document.getElementById('user-input')
const button = document
  .getElementById('btn')
  .addEventListener('click', getGitHubUser)

input.addEventListener('click', clearDisplay)

// * Getting Users From GitHub API
async function getGitHubUser() {
  if (input.value === '') {
    enterUsername()
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

//* Alert for no user found
function enterUsername() {
  clearAlert()
  const div = document.createElement('div')
  div.className = 'alert'
  div.appendChild(document.createTextNode('Enter UserName'))
  const container = document.querySelector('.container')
  const search = document.querySelector('.search')
  container.insertBefore(div, search)
  setTimeout(() => {
    clearAlert()
  }, 2000)
}

//* Clear Alert
function clearAlert() {
  const alert = document.querySelector('.alert')
  if (alert) {
    alert.remove()
  }
}

//* Clear Display
function clearDisplay() {
  document.getElementById('output').innerHTML = ''
}

//* Show Alert when Username doesn't exist
function showAlert(profile) {
  profile = `
    <div class="card">User ${profile.message}</div>
  `
  document.getElementById('output').innerHTML = profile
}

// * Display User UI
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
