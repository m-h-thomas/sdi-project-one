// console.log('My script is running');

displayGallery();

document.querySelector('#search-button').addEventListener("click", getEntry)

function getEntry(entryId){
  let entry = document.querySelector('#search-input').value;

  let encodedEntry = encodeURIComponent(entryId);

  fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${encodedEntry}`)
    .then((response) => response.json())
    .then((compendiumData) => {

      let commonLocationsHTML = compendiumData.data['common_locations'].map(location => `<p>${location}</p>`).join('');

      document.querySelector('.displayed-entries').innerHTML = `
      <div>
        <img src="${compendiumData.data.image}" alt="${compendiumData.data.name}"/>
      </div>
      <div class="entry-info">
        <h3>${compendiumData.data.name}</h3>
        <p>Description: ${compendiumData.data.description}</p>
      </div>
      <div class="entry-region">
        <h4>Common Locations:</h4>
        ${commonLocationsHTML}
      </div>
    `;
    })
}

function displayGallery() {
  fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/all')
    .then((response) => response.json())
    .then((allCompendiumData) => {
      let entriesHTML = '';

      // Sort entries by id in ascending order
      const sortedEntries = allCompendiumData.data.sort((a, b) => a.id - b.id);

      // Loop through each item in the sorted array and generate HTML
      sortedEntries.forEach(entry => {
        entriesHTML += `
          <div class="entry" data-id="${entry.id}">
            <img src="${entry.image}" alt="${entry.name}" class="entry-image"/>
            <h5>${entry.name}</h5>
            <p>${entry.id}</p>
          </div>
        `;
      });

      // Insert the generated HTML into the all-entries container
      document.querySelector('.all-entries').innerHTML = entriesHTML;

      // Now that the entries are in the DOM, attach event listeners to the images
      document.querySelectorAll('.entry-image').forEach(image => {
        image.addEventListener('click', (eventObj) => {
          let entryId = eventObj.target.closest('.entry').getAttribute('data-id');
          getEntry(entryId);
        });
      });
    })
}




/*



*/