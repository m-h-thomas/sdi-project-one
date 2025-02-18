// console.log('My script is running');

displayGallery();

document.querySelector('#search-button').addEventListener("click", getEntry)

function getEntry(){
  let entry = document.querySelector('#search-input').value;

  let encodedEntry = encodeURIComponent(entry);

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
      }

      let dropsHTML = '';
      if(compendiumData.data.drops && compendiumData.data.drops.length > 0) {
        compendiumData.data.drops.forEach(drop => {
          dropsHTML += `<p>${drop}</p>`
        })
      }


      document.querySelector('.displayed-entries').innerHTML = `
      <div class="single-entry-info">
        <img src="${compendiumData.data.image}" alt="${compendiumData.data.name}"/>
        <h3>${compendiumData.data.name}</h3>
        <p class="description">${compendiumData.data.description}</p>
      </div>
      <div class="single-entry-info additional-info">
        <h3>Common Locations</h3>
        ${commonLocationsHTML}
        <h3>Item Drops</h3>
        ${dropsHTML}
      </div>
    `;
    })

    .catch((error) => {
      console.error(error);
      document.querySelector('.displayed-entries').innerHTML = `<p class="error-message">${error.message}</p>`;
    });

    document.querySelector('#search-input').value = '';

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
            <img src="${entry.image}" alt="${entry.name}"
            <h4>${entry.name}</h4>
          </div>
        `
      })

      document.querySelector('.displayed-entries').innerHTML = galleryHTML;

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
            <img src="${creature.image}" alt="${creature.name}"/>
            <h6>${creature.id}</h6>
            <h4>${creature.name}</h4>
            <p class="description">${creature.description}</p>
          </div>
        `
      })

      document.querySelector('.displayed-entries').innerHTML = creaturesHTML;

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
            <img src="${monster.image}" alt="${monster.name}"/>
            <h6>${monster.id}</h6>
            <h4>${monster.name}</h4>
            <p class="description">${monster.description}</p>
          </div>
        `
      })

      document.querySelector('.displayed-entries').innerHTML = monstersHTML;

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
            <img src="${material.image}" alt="${material.name}"/>
            <h6>${material.id}</h6>
            <h4>${material.name}</h4>
            <p class="description">${material.description}</p>
          </div>
        `
      })

      document.querySelector('.displayed-entries').innerHTML = materialsHTML;

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
            <img src="${item.image}" alt="${item.name}"/>
            <h6>${item.id}</h6>
            <h4>${item.name}</h4>
            <p class="description">${item.description}</p>
          </div>
        `
      })

      document.querySelector('.displayed-entries').innerHTML = equipmentHTML;

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
            <img src="${item.image}" alt="${item.name}"/>
            <h6>${item.id}</h6>
            <h4>${item.name}</h4>
            <p class="description">${item.description}</p>
          </div>
        `
      })

      document.querySelector('.displayed-entries').innerHTML = treasureHTML;

    })
}

/*



*/