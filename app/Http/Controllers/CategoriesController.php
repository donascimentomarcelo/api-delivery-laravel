<?php

namespace Delivery\Http\Controllers;

use Illuminate\Http\Request;

use Delivery\Http\Requests;
use Delivery\Http\Controllers\Controller;
use Delivery\Repositories\CategoryRepository;
use Delivery\Http\Requests\AdminCategoryRequest;

class CategoriesController extends Controller
{
	private $repository;

	public function __construct(CategoryRepository $repository)
	{
		$this->repository = $repository;
	}

    public function index()
    {
    	$categories = $this->repository->paginate(5);

    	return view('admin.categories.index',compact('categories'));
    }

    public function create()
    {
    	return view('admin.categories.create');
    }

    public function store(AdminCategoryRequest $request)
    {
    	$this->repository->create($request->all());

    	return redirect()->route('admin.categories.index');
    }

    public function edit($id)
    {
    	$category = $this->repository->find($id);

    	return view('admin.categories.edit', compact('category'));
    }

    public function update(AdminCategoryRequest $request, $id)
    {
    	$this->repository->update($request->all(), $id);
    	return redirect()->route('admin.categories.index');
    }
}
