<?php

namespace Delivery\Services;

use Delivery\Repositories\ClientRepository;

use Delivery\Repositories\UserRepository;
/**
* 
*/
class ClientService 
{
	
	function __construct(ClientRepository $clientRepository, UserRepository $userRepository)
	{
		$this->clientRepository = $clientRepository;
		$this->userRepository = $userRepository;
	}

	public function update(array $data, $id)
	{
		$this->clientRepository->update($data, $id);

		$userId = $this->clientRepository->find($id, ['user_id'])->user_id;
		//recupera o fk em client id pq o primeiro $id q ta sendo passado como parametro é o id do client
		$this->userRepository->update($data['user'], $userId);
	}
}

