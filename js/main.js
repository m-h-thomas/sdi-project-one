// console.log('My script is running');

displayGallery();

document.querySelector('#search-button').addEventListener("click", getEntry)

function getEntry(){
  let entry = document.querySelector('#search-input').value;

  let encodedEntry = encodeURIComponent(entry);

  document.querySelector('#loading-spinner').style.display = 'block';

  fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${encodedEntry}`)
    .then((response) => response.json())
    .then((compendiumData) => {

      if (!compendiumData.data || Object.keys(compendiumData.data).length === 0) {
        throw new Error('Entry not found');
      }

      let commonLocationsHTML = '';
      if (compendiumData.data['common_locations'] && compendiumData.data['common_locations'].length > 0) {
        compendiumData.data['common_locations'].forEach(location => {
          commonLocationsHTML += `<p>${location}</p>`;
        });
      } else {
        commonLocationsHTML += `<p>None</p>`
      }

      let dropsHTML = '';
        if(compendiumData.data.category === 'monsters' || compendiumData.data.category === 'treasure')
          if(compendiumData.data.drops && compendiumData.data.drops.length > 0) {
            dropsHTML += `<h3>Item Drops</h3>`
            compendiumData.data.drops.forEach(drop => {
              dropsHTML += `
              <p>${drop}</p>`
            })
          } else {
            dropsHTML += `<p>None</p>`;
          }


      let propertiesHTML = '';
        if(compendiumData.data.category === 'equipment')
          if (compendiumData.data.properties) {
            propertiesHTML += `
            <h3>Properties</h3>
            <p>Attack: ${compendiumData.data.properties.attack}</p>
            <p>Defense: ${compendiumData.data.properties.defense}</p>`;
          } else {
            propertiesHTML += `<p>None</p>`;
          }


      let edibleCreatureHTML = '';
        if(compendiumData.data.category === 'creatures' &&  compendiumData.data.edible === true)
          if (compendiumData.data.edible) {
            edibleCreatureHTML += `
            <h3>Hearts Recovered</h3>
            <p>${compendiumData.data["hearts_recovered"]}</p>`;
          } else {
            edibleCreatureHTML += `<p>None</p>`;
          }

      let materialDataHTML = '';
        if(compendiumData.data.category === 'materials')
          if(compendiumData.data["hearts_recovered"] || compendiumData.data["cooking_effect"]){
            materialDataHTML += `
            <h3>Hearts Recovered</h3>
            <p>${compendiumData.data["hearts_recovered"]}</p>
            <h3>Cooking Effect</h3>
            <p>${compendiumData.data["cooking_effect"]}</p>
           `;
          } else {
            materialDataHTML += `<p>None</p>`;
          }



      document.querySelector('.displayed-entries').innerHTML = `
      <div class="single-entry-info">
        <img src="${compendiumData.data.image}" alt="${compendiumData.data.name}" class="entry-image"/>
        <h3>${compendiumData.data.name}</h3>
        <p class="description">${compendiumData.data.description}</p>
      </div>
      <div class="single-entry-info additional-info">
        <h3>Common Locations</h3>
        ${commonLocationsHTML}
        ${dropsHTML}
        ${propertiesHTML}
        ${edibleCreatureHTML}
        ${materialDataHTML}
      </div>

    `;
    })

    .catch((error) => {
      console.error(error);
      document.querySelector('.displayed-entries').innerHTML = `<p class="error-message">${error.message}</p>`;

      hideSpinner();
    });

    document.querySelector('#search-input').value = '';

    hideSpinner();

}

document.querySelector('#compendium-main-button').addEventListener('click', displayGallery)

function displayGallery(){
  fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/all`)
    .then((response) => response.json())
    .then((allData) => {

      allData.data.sort((a, b) => a.id - b.id)

      let galleryHTML = '';

      allData.data.forEach((entry) => {
        galleryHTML +=`
          <div class="entry-info">
            <img src="${entry.image}" alt="${entry.name}" class="entry-image"/>
            <h4>${entry.name}</h4>
          </div>
        `
      })

      document.querySelector('.displayed-entries').innerHTML = galleryHTML;

      const images = document.querySelectorAll('.entry-image');
      let imagesLoaded = 0;

      // Function to check if all images are loaded
      images.forEach((img) => {
        img.onload = function() {
          imagesLoaded += 1;
          // If all images are loaded, hide the spinner
          if (imagesLoaded === images.length) {
            hideSpinner();
          }
        };
      });

    })
}

document.querySelector('#creature-button').addEventListener('click', getCreatures)

function getCreatures(){
  fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/creatures`)
    .then((response) => response.json())
    .then((creatureData) => {

      creatureData.data.sort((a, b) => a.id - b.id);

      let creaturesHTML = '';

      creatureData.data.forEach((creature) => {
        creaturesHTML += `
          <div class="entry-info">
            <img src="${creature.image}" alt="${creature.name}" class="entry-image"/>
            <h6>${creature.id}</h6>
            <h4>${creature.name}</h4>
            <p class="description">${creature.description}</p>
          </div>
        `
      })

      document.querySelector('.displayed-entries').innerHTML = creaturesHTML;


      const images = document.querySelectorAll('.entry-image');
      let imagesLoaded = 0;

      // Function to check if all images are loaded
      images.forEach((img) => {
        img.onload = function() {
          imagesLoaded += 1;
          // If all images are loaded, hide the spinner
          if (imagesLoaded === images.length) {
            hideSpinner();
          }
        };
      });


    })
}

document.querySelector('#monster-button').addEventListener('click', getMonsters)

function getMonsters(){
  fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters`)
    .then((response) => response.json())
    .then((monsterData) => {

      monsterData.data.sort((a, b) => a.id - b.id);

      let monstersHTML = '';

      monsterData.data.forEach((monster) => {
        monstersHTML += `
          <div class="entry-info">
            <img src="${monster.image}" alt="${monster.name}" class="entry-image"/>
            <h6>${monster.id}</h6>
            <h4>${monster.name}</h4>
            <p class="description">${monster.description}</p>
          </div>
        `
      })

      document.querySelector('.displayed-entries').innerHTML = monstersHTML;

      const images = document.querySelectorAll('.entry-image');
      let imagesLoaded = 0;

      // Function to check if all images are loaded
      images.forEach((img) => {
        img.onload = function() {
          imagesLoaded += 1;
          // If all images are loaded, hide the spinner
          if (imagesLoaded === images.length) {
            hideSpinner();
          }
        };
      });

    })
}

document.querySelector('#materials-button').addEventListener('click', getMaterials)

function getMaterials(){
  fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/materials`)
    .then((response) => response.json())
    .then((monsterData) => {

      monsterData.data.sort((a, b) => a.id - b.id)

      let materialsHTML = '';

      monsterData.data.forEach((material) => {
        materialsHTML += `
          <div class="entry-info">
            <img src="${material.image}" alt="${material.name}" class="entry-image"/>
            <h6>${material.id}</h6>
            <h4>${material.name}</h4>
            <p class="description">${material.description}</p>
          </div>
        `
      })

      document.querySelector('.displayed-entries').innerHTML = materialsHTML;

      const images = document.querySelectorAll('.entry-image');
      let imagesLoaded = 0;

      // Function to check if all images are loaded
      images.forEach((img) => {
        img.onload = function() {
          imagesLoaded += 1;
          // If all images are loaded, hide the spinner
          if (imagesLoaded === images.length) {
            hideSpinner();
          }
        };
      });

    })
}

document.querySelector('#equipment-button').addEventListener('click', getEquipment)

function getEquipment(){
  fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/equipment`)
    .then((response) => response.json())
    .then((equipmentData) => {

      equipmentData.data.sort((a, b) => a.id - b.id)

      let equipmentHTML = '';

      equipmentData.data.forEach((item) => {
        equipmentHTML += `
          <div class="entry-info">
            <img src="${item.image}" alt="${item.name}" class="entry-image"/>
            <h6>${item.id}</h6>
            <h4>${item.name}</h4>
            <p class="description">${item.description}</p>
          </div>
        `
      })

      document.querySelector('.displayed-entries').innerHTML = equipmentHTML;

      const images = document.querySelectorAll('.entry-image');
      let imagesLoaded = 0;

      // Function to check if all images are loaded
      images.forEach((img) => {
        img.onload = function() {
          imagesLoaded += 1;
          // If all images are loaded, hide the spinner
          if (imagesLoaded === images.length) {
            hideSpinner();
          }
        };
      });

    })
}

document.querySelector('#treasure-button').addEventListener('click', getTreasure)

function getTreasure(){
  fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/treasure`)
    .then((response) => response.json())
    .then((treasureData) => {

      treasureData.data.sort((a, b) => a.id - b.id)

      let treasureHTML = '';

      treasureData.data.forEach((item) => {
        treasureHTML += `
          <div class="entry-info">
            <img src="${item.image}" alt="${item.name}" class="entry-image"/>
            <h6>${item.id}</h6>
            <h4>${item.name}</h4>
            <p class="description">${item.description}</p>
          </div>
        `
      })

      document.querySelector('.displayed-entries').innerHTML = treasureHTML;

      const images = document.querySelectorAll('.entry-image');
      let imagesLoaded = 0;

      // Function to check if all images are loaded
      images.forEach((img) => {
        img.onload = function() {
          imagesLoaded += 1;
          // If all images are loaded, hide the spinner
          if (imagesLoaded === images.length) {
            hideSpinner();
          }
        };
      });

    })
}

function hideSpinner(){
  document.querySelector('#loading-spinner').style.display = 'none';
}

/*



*/