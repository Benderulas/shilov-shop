import { POST_JSON_request } from "/JavaScript/requests.js";

async function GetSelectsFromDb()
{
	let path = "POST/product/GetMultiCategories.php";

	let response = await POST_JSON_request(path); 

	return response;
}
function isProductReady(_product)
{
	if (_product.id == false || Number.isInteger(_product.id) == false) 
	{
		alert("Нет ID");
		return false;
	}

	if (_product.title == false) 
	{
		alert("Укажите название товара");
		return false;
	}
	if (_product.price == false) 
	{
		alert("Укажите цену товара");
		return false;
	}
	if (Number.isInteger(_product.price) == false) 
	{
		alert("Укажите цену товара правильно");
		return false;
	}
	if (Number.isInteger(_product.discount) == false) 
	{
		alert("Укажите скидку на товар правильно");
		return false;
	}
	if (_product.categoryID == "null") 
	{
		alert("Укажите категорию товара");
		return false;
	}
	if (_product.companyID == "null") 
	{
		alert("Укажите команию товара");
		return false;
	}
	if (_product.sexID == "null") 
	{
		alert("Укажите для какого пола товар");
		return false;
	}
	if (_product.colorsAndSizes.length == 0)
	{
		alert("Укажите хотя бы 1 пару цвет - размер");
		return false;
	}

	for (let i in _product.colorsAndSizes)
	{
		if (_product.colorsAndSizes[i].colorID == "null")
		{
			alert("Укажите цвет в паре " + (Number(i) + 1));
			return false;
		}
		if (_product.colorsAndSizes[i].sizeID == "null")
		{
			alert("Укажите размер в паре " + (Number(i) + 1));
			return false;
		}
		if (_product.colorsAndSizes[i].amount < 0)
		{
			alert("Укажите количество в паре " + (Number(i) + 1));
			return false;
		}
		if (Number.isInteger(_product.colorsAndSizes[i].amount) == false) 
		{
			alert("Укажите количество товара в паре " + (Number(i) + 1) + " правильно");
			return false;
		}
	}



	return true;

}

async function EditProduct()
{
	let product = {
		id: Number(document.getElementById("productID").value),
		title: document.getElementById("productTitle").value,
		price: Number(document.getElementById("productPrice").value),
		discount: Number(document.getElementById("productDiscount").value),
		categoryID: Number(document.getElementById("productCategory").value),
		companyID: Number(document.getElementById("productCompany").value),
		sexID: Number(document.getElementById("productSex").value),
		colorsAndSizes: []
	};

	let colorAndSize;

	for (let i = 0; i < document.getElementsByName("color").length; i++)
	{
		colorAndSize = {
			colorID: Number(document.getElementsByName("color")[i].value),
			sizeID: Number(document.getElementsByName("size")[i].value),
			amount: Number(document.getElementsByName("amount")[i].value)
			};
		product.colorsAndSizes.push(colorAndSize);
	}


	if (isProductReady(product)) 
	{
		let path = "POST/product/editProductForView.php";
		let response = await POST_JSON_request(path, product);
		alert (response['message']);
		console.log(product);
	}
}

async function AddColorAndSizeField()
{
	let response = await GetSelectsFromDb();
	
	let colorsAndSizes = document.getElementById("colorsAndSizes");
	let label = document.createElement("label");
	let text = document.createTextNode("1 ");

	label.appendChild(text);
	let option;




	let colorSelectItem = document.createElement("select");
	colorSelectItem.name = "color";

	
	option = document.createElement("option");
	option.value = 'null';
	option.selected = "selected";
	colorSelectItem.add(option);
	
	

	for (let i in response['colors'])
	{
		option = document.createElement("option");
		option.text = response['colors'][i].title;
		option.value = response['colors'][i].id;
		

		colorSelectItem.add(option);
	}




	let sizeSelectItem = document.createElement("select");
	sizeSelectItem.name = "size";

	
	option = document.createElement("option");
	option.value = 'null';
	option.selected = "selected";
	sizeSelectItem.add(option);
	

	for (let i in response['sizes'])
	{
		option = document.createElement("option");
		option.text = response['sizes'][i].title;
		option.value = response['sizes'][i].id;
		
		sizeSelectItem.add(option);
	}

	let amountItem = document.createElement("input");
	amountItem.type = "text";
	amountItem.name = "amount";



	label.appendChild(colorSelectItem);
	label.appendChild(sizeSelectItem);
	label.appendChild(amountItem);



	colorsAndSizes.appendChild(label);
	let brItem = document.createElement("br");
	colorsAndSizes.appendChild(brItem);
}



function InitializeColorAndSizeFields(_response, _productToColorAndSize)
{	
	let colorsAndSizes = document.getElementById("colorsAndSizes");
	let label = document.createElement("label");
	let text = document.createTextNode("1 ");

	label.appendChild(text);
	let option;




	let colorSelectItem = document.createElement("select");
	colorSelectItem.name = "color";

	if (_productToColorAndSize == 0)
	{
		option = document.createElement("option");
		option.value = 'null';
		option.selected = "selected";
		colorSelectItem.add(option);
	}
	

	for (let i in _response['colors'])
	{
		option = document.createElement("option");
		option.text = _response['colors'][i].title;
		option.value = _response['colors'][i].id;
		if (_productToColorAndSize) 
		{
			if (option.value == _productToColorAndSize.color.id) option.selected = "selected";
		}

		colorSelectItem.add(option);
	}




	let sizeSelectItem = document.createElement("select");
	sizeSelectItem.name = "size";

	if (_productToColorAndSize == 0)
	{
		option = document.createElement("option");
		option.value = 'null';
		option.selected = "selected";
		sizeSelectItem.add(option);
	}

	for (let i in _response['sizes'])
	{
		option = document.createElement("option");
		option.text = _response['sizes'][i].title;
		option.value = _response['sizes'][i].id;
		if (_productToColorAndSize) 
		{
			if (option.value == _productToColorAndSize.size.id) option.selected = "selected";
		}

		sizeSelectItem.add(option);
	}

	let amountItem = document.createElement("input");
	amountItem.type = "text";
	amountItem.name = "amount";
	if (_productToColorAndSize) amountItem.value = _productToColorAndSize.amount;



	label.appendChild(colorSelectItem);
	label.appendChild(sizeSelectItem);
	label.appendChild(amountItem);



	colorsAndSizes.appendChild(label);
	let brItem = document.createElement("br");
	colorsAndSizes.appendChild(brItem);
}



function DeleteColorAndSizeField()
{
	let colorsAndSizes = document.getElementById("colorsAndSizes");
	let lastElement = colorsAndSizes.lastChild;

	colorsAndSizes.removeChild(lastElement);
	lastElement = colorsAndSizes.lastChild;
	colorsAndSizes.removeChild(lastElement);
}

function InitializeCategories(_categories, _productForView)
{
	let selectItem = document.getElementById("productCategory");

	let option;

	for (let i in _categories)
	{
		option = document.createElement("option");
		option.text = _categories[i].title;
		option.value = _categories[i].id;
		if (_productForView.product.category.id == option.value) option.selected = "selected";

		selectItem.add(option);
	}
}

function InitializeCompanies(_companies, _productForView)
{
	let selectItem = document.getElementById("productCompany");

	let option;

	for (let i in _companies)
	{
		option = document.createElement("option");
		option.text = _companies[i].title;
		option.value = _companies[i].id;
		if (_productForView.product.company.id == option.value) option.selected = "selected";

		selectItem.add(option);
	}
}

function InitializeSex(_sex, _productForView)
{
	let selectItem = document.getElementById("productSex");

	let option;

	for (let i in _sex)
	{
		option = document.createElement("option");
		option.text = _sex[i].title;
		option.value = _sex[i].id;
		if (_productForView.product.sex.id == option.value) option.selected = "selected";

		selectItem.add(option);
	}
}




async function InitializeSelects(_productForView)
{
	let response = await GetSelectsFromDb();
	
	InitializeCategories(response['categories'], _productForView);
	InitializeCompanies(response['companies'], _productForView);
	InitializeSex(response['sex'], _productForView);

	for (let i = 0; i < _productForView.productsToColorAndSize.length; i++)
	{
		await InitializeColorAndSizeFields(response, _productForView.productsToColorAndSize[i]);
	}
}

function InitializeProduct(_productForView)
{
	let id = document.getElementById("productID");
	id.value = _productForView.product.id;

	let title = document.getElementById("productTitle");
	title.value = _productForView.product.title;

	let price = document.getElementById("productPrice");
	price.value = _productForView.product.price;

	let discount = document.getElementById("productDiscount");
	discount.value = _productForView.product.discount;

	InitializeSelects(_productForView);
}




async function Initialize()
{
	let path = "POST/product/getById.php";
	let url = new URL (window.location.href);
	let id = url.searchParams.get("id");

	let productForView = await POST_JSON_request(path, id);




	let button = document.getElementById("editProduct");
	if (button) button.onclick = EditProduct;

	button = document.getElementById("addColorAndSize");
	if (button) button.onclick = AddColorAndSizeField;

	button = document.getElementById("deleteColorAndSize");
	if (button) button.onclick = DeleteColorAndSizeField;

	InitializeProduct(productForView);

	

}


Initialize();