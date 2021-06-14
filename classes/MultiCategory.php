<?php


class MultiCategory
{
	public $id,
		$title;
	const tableName = '';
	const nameInOtherTable = '';
	const otherTableName = '';


	public function Set($_multiCategory)
	{
		if (isset($_multiCategory['id'])) $this->id = $_multiCategory['id'];
		$this->title = $_multiCategory['title'];
	}

	public function SetById($_id)
	{
		require("DataBase.php");
		$request = "SELECT * from " . static::tableName . " WHERE id =  $_id";
		$res = $mysqli->query($request);

		if ($res)
		{
			$this->Set($res->fetch_assoc());
		}
	}

	public function Exist()
	{
		if (isset($this->id)) return true;
		require("DataBase.php");
		if ($res = $mysqli->query("SELECT COUNT(*) as count FROM " . static::tableName . " WHERE title = '$this->title'"))
		{
			$res = $res->fetch_assoc();
			if ($res['count']) return true;
			else return false;
		}
		else 
		{
			echo (static::tableName . " Exist  request error");
			return false;
		}
	}

	public function Insert()
	{
		require("DataBase.php");

		if ($this->Exist() == false)
		{
			$res = $mysqli->query("INSERT INTO " . static::tableName . " (title) "
				. "VALUES ('$this->title')");
			return $res;
		}
		else return false;
	}

	public function Edit()
	{
		require("DataBase.php");

		$request = "UPDATE " . static::tableName . " SET "
				 . "title = '$this->title' "
				 . "WHERE id = $this->id";
		$res = $mysqli->query($request);
		return $res;
	}

	public function Delete()
	{
		require("DataBase.php");
		$res = $mysqli->query("DELETE FROM " . static::tableName . " WHERE id = $tihs->id");

		return $res;
	}

	public static function GetAllFromDB()
	{
		require("DataBase.php");
		$request = "SELECT * FROM " . static::tableName . " ORDER BY id";
		$res = $mysqli->query($request);

		if ($res == false)
		{
			return false;
		}

		$count = $res->num_rows;
		$className = static::class;

		for ($i = 0; $i < $count; $i++)
		{
			$res->data_seek($i);
			
			$myltiCategories[$i] = new $className();
			$myltiCategories[$i]->Set($res->fetch_assoc());
		}
		return $myltiCategories;
	}

	public static function GetWithFilters($_filters)
	{
		require("DataBase.php");
		$request = "SELECT DISTINCT " . static::otherTableName . "." . static::nameInOtherTable . " as id FROM products_to_color_and_size "
		. "INNER JOIN products ON products_to_color_and_size.productID = products.id "
		. "WHERE products.id > 0 ";

		if (isset($_filters->title)) $request = $request . "AND products.title LIKE '%$_filters->title%' ";

		if (isset($_filters->priceMin)) $request = $request . "AND products.price > $_filters->priceMin ";
		if (isset($_filters->priceMax)) $request = $request . "AND products.price < $_filters->priceMax ";

		if (isset($_filters->categoryID)) $request = $request . "AND products.categoryID = $_filters->categoryID ";
		if (isset($_filters->sexID)) $request = $request . "AND products.sexID = $_filters->sexID ";
		if (isset($_filters->companyID)) $request = $request . "AND products.companyID = $_filters->companyID ";
		if (isset($_filters->discount)) $request = $request . "AND products.discount = $_filters->discount ";

		if (isset($_filters->colorID)) $request = $request . "AND products_to_color_and_size.colorID = $_filters->colorID ";
		if (isset($_filters->sizeID)) $request = $request . "AND products_to_color_and_size.sizeID = $_filters->sizeID ";

		$request = $request . "ORDER BY " . static::otherTableName . "." . static::nameInOtherTable;

		$response = $mysqli->query($request);

		if ($mysqli->error)
		{
			$exception = $mysqli->error;
			var_dump($exception); echo ("<br><br>");
			return $exception;
		}
		else 
		{
			$className = static::class;

			for ($i = 0; $i < $response->num_rows; $i++)
			{
				$response->data_seek($i);
				$multiCategory[$i] = new $className();
				$multiCategory[$i]->SetById($response->fetch_assoc()['id']);
			}
			
			return $multiCategory;
		}
	}
}


?>