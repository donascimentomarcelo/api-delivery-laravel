<?php

namespace Delivery\Http\Controllers\Api;

use Delivery\Http\Controllers\Controller;
use Delivery\Repositories\UserRepository;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class UserController extends Controller
{

    private $cupomRepository;


    public function __construct(UserRepository $userRepository)
    {
        
        $this->userRepository = $userRepository;
    }

    public function authenticated()
    {
    	$id = Authorizer::getResourceOwnerId();
        return $this->userRepository->skipPresenter(false)->find($id);
    }

    
}
