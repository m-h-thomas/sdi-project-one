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
        <h3>${compendiumData.data.name}</h3>
        <p class="description">Description: ${compendiumData.data.description}</p>
      </div>
    `;
    })
}

document.querySelector('#creature-button').addEventListener('click', getCreatures)

function getCreatures(){
  fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/creatures`)
    .then((response) => response.json())
    .then((allData) => {

      let creaturesHTML = '';

      allData.data.forEach((creature) => {
        creaturesHTML += `
          <div>
            <img src="${creature.image}" alt="${creature.name}"/>
          </div>
          <div class="entry-info">
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
    .then((allData) => {

      let monstersHTML = '';

      allData.data.forEach((monster) => {
        monstersHTML += `
          <div>
            <img src="${monster.image}" alt="${monster.name}"/>
          </div>
          <div class="entry-info">
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
    .then((allData) => {

      let materialsHTML = '';

      allData.data.forEach((material) => {
        materialsHTML += `
          <div>
            <img src="${material.image}" alt="${material.name}"/>
          </div>
          <div class="entry-info">
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
    .then((allData) => {

      let equipmentHTML = '';

      allData.data.forEach((item) => {
        equipmentHTML += `
          <div>
            <img src="${item.image}" alt="${item.name}"/>
          </div>
          <div class="entry-info">
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
    .then((allData) => {

      let treasureHTML = '';

      allData.data.forEach((item) => {
        treasureHTML += `
          <div>
            <img src="${item.image}" alt="${item.name}"/>
          </div>
          <div class="entry-info">
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