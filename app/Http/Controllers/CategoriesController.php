<?php

namespace Delivery\Http\Controllers;

use Illuminate\Http\Request;

use Delivery\Http\Requests;
use Delivery\Http\Controllers\Controller;
use Delivery\Repositories\CategoryRepository;

class CategoriesController extends Controller
{
    public function index(CategoryRepository $Repository)
    {
    	$categories = $Repository->paginate(5);

    	return view('admin.categories.index',compact('categories'));
    }

    public function create()
    {
    	return view('admin.categories.create');
    }
}
