const loadData = async (search, dataLimite) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data, dataLimite);
};
//  `https://openapi.programming-hero.com/api/phones?search=${search}`

const displayData = (phones, dataLimite) => {
  console.log(phones);
  const count = document.getElementById("count");
  count.innerText = phones.length;

  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";
  const showButton = document.getElementById("show-button");
  if (dataLimite && phones.length > 10) {
    phones = phones.slice(0, 10);
    showButton.classList.remove("hidden");
  } else {
    showButton.classList.add("hidden");
  }

  const noFound = document.getElementById("no-found");
  if (phones.length == 0) {
    noFound.classList.remove("hidden");
  } else {
    noFound.classList.add("hidden");
  }

  phones.map((phone) => {
    const div = document.createElement("div");
    div.classList = `card bg-base-100  shadow-xl`;
    div.innerHTML = `
    <figure>
              <img
                src="${phone.image}" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions">
                <button class="btn" onclick="showModal('${phone.slug}')">open modal</button>
            </div>
               `;
    phoneContainer.appendChild(div);
  });
  loading(false);
};

const loading = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};
const processData = (dataLimite) => {
  const inputField = document.getElementById("input-Field");
  const serachValue = inputField.value;
  loading(true);
  loadData(serachValue, dataLimite);
};

document.getElementById("show-button").addEventListener("click", function () {
  processData();
});
document.getElementById("search-Button").addEventListener("click", function () {
  processData(10);
});

const showModal = async (id) => {
  console.log(id);
  console.log("helal");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  modalDetailsData(data.data);
  console.log(data);
};

const modalDetailsData = (phone) => {
  console.log(phone.mainFeatures.storage);
  const phoneName = document.getElementById("phone_name");
  phoneName.innerText = phone.name;
  const imgTag = document.getElementById("imgTag");
  imgTag.src = phone.image;
  document.getElementById("store").innerText = phone.mainFeatures.storage;
  // my_modal_1.showModal();
  document.getElementById("my_modal_1").showModal();
};

// loadData("apple");
