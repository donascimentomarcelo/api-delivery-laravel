<?php

namespace Delivery\Http\Controllers;

use Delivery\Http\Controllers\Controller;
use Delivery\Http\Requests;
use Delivery\Http\Requests\AdminCupomRequest;
use Delivery\Repositories\CupomRepository;
use Illuminate\Http\Request;

class CupomsController extends Controller
{
	private $CupomRepository;

    public function __construct(CupomRepository $cupomRepository)
    {
		$this->cupomRepository = $cupomRepository;
    }

    public function index()
    {
    	$cupoms = $this->cupomRepository->paginate(5);

    	return view('admin.cupoms.index', compact('cupoms'));
    }

    public function create()
    {
    	return view('admin.cupoms.create');
    }

    public function store(AdminCupomRequest $cupomRequest)
    {
    	$this->cupomRepository->create($cupomRequest->all());

    	return redirect()->route('admin.cupoms.index');
    }

    public function edit($id)
    {
    	$cupom = $this->cupomRepository->find($id);

    	return view('admin.cupoms.edit', compact('cupom'));
    }

    public function update(AdminCupomRequest $cupomRequest, $id)
    {
    	$this->cupomRepository->update($cupomRequest->all(), $id);

    	return redirect()->route('admin.cupoms.index');
    }
}
