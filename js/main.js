// console.log('My script is running');

document.querySelector('#search-button').addEventListener("click", getEntry)

function getEntry(){
  let entry = document.querySelector('#search-input').value;

  let encodedEntry = encodeURIComponent(entry);

  fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${encodedEntry}`)
    .then((response) => response.json())
    .then((compendiumData) => {
      document.querySelector('.displayed-entries').innerHTML = `
      <div>
        <img src="${compendiumData.data.image}" alt="${compendiumData.data.name}"/>
      </div>
      <div class="entry-info">
        <h4>${compendiumData.data.name}</h4>
        <p>Description: ${compendiumData.data.description}</p>
      </div>
    `;
    })
}