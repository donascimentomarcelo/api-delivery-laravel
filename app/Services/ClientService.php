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

	public function create(array $data)
	{
		$data['user']['password'] = bcrypt(123456);
		//seta a senha com valor padrão

		$user = $this->userRepository->create($data['user']);
		// retorna o id de user
		$data['user_id'] = $user->id;
		// fz o relacionamento trazendo o id de user com o id de client
		$this->clientRepository->create($data);
	}
}

// // dd($data['user']);
// 		$email = $data['user']['email'];
		
// 		$user = $this->userRepository->where('email',$email);
		
// 		dd($user);