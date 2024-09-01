//#region Select Elemants
const productName = document.getElementById("productName");
const produtPrice = document.getElementById("productPrice");
const productCategory = document.getElementById("productCategory");
const productDesc = document.getElementById("productDesc");
const btnProduct = document.querySelector(".btn");
const btnUpdate = document.getElementById("Update");
// Get the popup
var popup = document.getElementById("popup");
const tableBody = document.getElementById("tableBody");

// Get the <span> element that closes the popup
var span = document.getElementsByClassName("close")[0];
//#endregion

var productContainer = [];

var currentIndex = -1;

if (localStorage.getItem("productName") == null) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem("productName"));

  addLineOfTable();
}

//#region Function addProdut
let addProdut = () => {
  if (chakValue()) {
    var product = {
      name: productName.value,
      Price: produtPrice.value,
      Category: productCategory.value,
      Desc: productDesc.value,
    };

    if (currentIndex != -1) {
      productContainer[currentIndex] = product;
      currentIndex = -1;
      btnProduct.innerHTML = "add product";
      btnProduct.classList.add("btn-outline-primary");
      btnProduct.classList.remove("btn-outline-warning");
    } else {
      productContainer.push(product);
    }

    localStorage.setItem("productName", JSON.stringify(productContainer));
    clearForm();
    addLineOfTable();
  } else {
    // // When the user clicks the button, open the popup
    popup.style.display = "block";
    // When the user clicks on <span> (x), close the popup
    span.onclick = function () {
      popup.style.display = "none";
    };
    // When the user clicks anywhere outside of the popup, close it
    window.onclick = function (event) {
      if (event.target == popup) {
        popup.style.display = "none";
      }
    };
  }
};
btnProduct.addEventListener("click", addProdut);

function setFormForUpdate(index) {
  currentIndex = index;
  const product = productContainer[index];
  productName.value = product.name;
  produtPrice.value = product.Price;
  productCategory.value = product.Category;
  productDesc.value = product.Desc;

  btnProduct.innerHTML = "Update";
  btnProduct.classList.add("btn-outline-warning");
}

//#endregion

//#region Function clearForm
let clearForm = () => {
  productName.value = "";
  produtPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
};
//#endregion
function addLineOfTable() {
  let cartuona = ``;

  for (let i = 0; i < productContainer.length; i++) {
    cartuona += `<tr class="text-center">
    <td>${i + 1}</td>
    <td>${productContainer[i].name}</td>
    <td>${productContainer[i].Price}</td>
    <td>${productContainer[i].Category}</td>
    <td>${productContainer[i].Desc}</td>
    <td><button onclick="setFormForUpdate(${i})"  class="btn btn-outline-warning btn-sm">Update</button></td>
    <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
    </tr>`;
  }
  tableBody.innerHTML = cartuona;
}

let chakValue = () => {
  if (
    productName.value != "" &&
    produtPrice.value != "" &&
    productCategory.value != "" &&
    productDesc.value != ""
  ) {
    return true;
  } else {
    return false;
  }
};

let searchProduct = (searchValue) => {
  var productElement = ``;

  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name
        .toLowerCase()
        .toUpperCase()
        .includes(searchValue.toLowerCase().toUpperCase().trim()) ||
      productContainer[i].Price.toLowerCase()
        .toUpperCase()
        .includes(searchValue.toLowerCase().toUpperCase().trim()) ||
      productContainer[i].Category.toLowerCase()
        .toUpperCase()
        .includes(searchValue.toLowerCase().toUpperCase().trim()) ||
      productContainer[i].Desc.toLowerCase()
        .toUpperCase()
        .includes(searchValue.toLowerCase().toUpperCase().trim())
    ) {
      productElement += `<tr class="text-center">
    <td>${i + 1}</td>
    <td>${productContainer[i].name}</td>
    <td>${productContainer[i].Price}</td>
    <td>${productContainer[i].Category}</td>
    <td>${productContainer[i].Desc}</td>
    <td><button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning btn-sm">Update</button></td>
    <td><button onclick="deleteProduct(${[
      i,
    ]})" class="btn btn-outline-danger btn-sm">Delete</button></td>
    </tr>`;
    }
  }

  tableBody.innerHTML = productElement;
};

function deleteProduct(index) {
  productContainer.splice(index, 1);
  console.log(index);
  addLineOfTable();
}
