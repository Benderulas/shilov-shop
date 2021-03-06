//$.getScript("/JavaScript/requests.js");
import { UrlManager } from "/scripts/products/UrlManager.js";
import { FiltersManager } from "/scripts/products/FiltersManager.js";
import { ProductsManager } from "/scripts/products/ProductsManager.js";
import { PageSelector } from "/JavaScript/PageSelector.js";

let productsOnPage = 12;


function AddNewProduct()
{
  document.location = "/product/insert";
}





async function OpenPage()
{
  UrlManager.UpdateURLByPage(this.value);
  let filters = FiltersManager.GetFiltersFromPage();

  let productsAmount = await ProductsManager.UpdateProducts(filters);

  let pagesAmount = Math.floor(productsAmount / productsOnPage);
  if (productsAmount % productsOnPage) pagesAmount++;




  PageSelector.UpdateButtons(this.value, pagesAmount);
}

async function Search()
{
  UrlManager.UpdateURLByPage(1);
  let filters = FiltersManager.GetFiltersFromPage();
  UrlManager.UpdateURLByFilters(filters);


  let productsAmount = await ProductsManager.UpdateProducts(filters);

  let pagesAmount = Math.floor(productsAmount / productsOnPage);
  if (productsAmount % productsOnPage) pagesAmount++;

  PageSelector.UpdateButtons(1, pagesAmount);
}





async function InitializeAll()
{
  let filters = await UrlManager.GetFiltersByURL();
  FiltersManager.InitializeFilters(filters);
  document.getElementById("searchButton").onclick = Search;

  let productsAmount = await ProductsManager.UpdateProducts(filters);



  let pagesAmount = Math.floor(productsAmount / productsOnPage);
  if (productsAmount % productsOnPage) pagesAmount++;

  console.log(pagesAmount);

  PageSelector.UpdateButtons(1, pagesAmount);
  let pagesButtons = document.getElementsByName("pageButton")
  for (let i = 0; i < 7; i++)
  {
    if (pagesButtons[i]) pagesButtons[i].onclick = OpenPage;
  }




  let button = document.getElementById("addNewProduct");
  if (button) button.onclick = AddNewProduct;

  button = document.getElementById("searchButton");
  if (button) button.onclick = Search;
}


InitializeAll();

