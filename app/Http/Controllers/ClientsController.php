<?php

namespace Delivery\Http\Controllers;

use Illuminate\Http\Request;

use Delivery\Http\Requests;
use Delivery\Http\Controllers\Controller;

use Delivery\Repositories\ClientRepository;

use Delivery\Repositories\UserRepository;

use Delivery\Http\Requests\AdminClientRequest;

use Delivery\Services\ClientService;

class ClientsController extends Controller
{
  private $clientRepository;

  public function __construct(ClientRepository $clientRepository, UserRepository $userRepository, ClientService $clientService)
  {
    $this->clientRepository = $clientRepository;

    $this->userRepository = $userRepository;

    $this->clientService = $clientService;
  }

  public function index()
  {
    $clients = $this->clientRepository->paginate(5);

    return view('admin.clients.index',compact('clients'));
  }

  public function create()
  {
    $users = $this->userRepository->lists('name','id');

    return view('admin.clients.create', compact('users'));
  }

  public function store(AdminClientRequest $adminClientRequest)
  {
    $this->clientService->create($adminClientRequest->all());

    return redirect()->route('admin.clients.index');
  }

  public function edit($id)
  {
    $clients = $this->clientRepository->find($id);
    $users = $this->userRepository->lists('name','id');

    return view('admin.clients.edit',compact('clients','users'));
  }

  public function update(AdminClientRequest $adminClientRequest, $id)
  {
    $this->clientService->update($adminClientRequest->all(), $id);

    return redirect()->route('admin.clients.index');
  }

}
