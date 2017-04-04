<?php

namespace Delivery\Http\Controllers\Api;

use Delivery\Http\Controllers\Controller;
use Delivery\Repositories\CupomRepository;

class CupomController extends Controller
{

    private $cupomRepository;


    public function __construct(CupomRepository $cupomRepository)
    {
        
        $this->cupomRepository = $cupomRepository;
    }

    public function show($code)
    {
        return $this->cupomRepository->skipPresenter(false)->findByCode($code);

    }

    
}
