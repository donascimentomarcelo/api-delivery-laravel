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
	}
}

