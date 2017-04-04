<?php

namespace Delivery\Repositories;

use Delivery\Models\Cupom;
use Delivery\Presenters\CupomPresenter;
use Delivery\Repositories\CupomRepository;
use Delivery\Validators\CupomValidator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class CupomRepositoryEloquent
 * @package namespace Delivery\Repositories;
 */
class CupomRepositoryEloquent extends BaseRepository implements CupomRepository
{
    protected $skipPresenter = true;
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Cupom::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function presenter()
    {
        return CupomPresenter::class;
    }

    public function findByCode($code)
    {
        $result = $this->model->where('code', $code)->where('used', 0)->first();
        if($result)
        {
            return $this->parserResult($result);
            // parserResult verifica se trab c presenter ou n, ai retorna um array de dados ou uma instancia do eloquent
        }

        throw (new ModelNotFoundException)->setModel(get_class($this->model));
        
    }
}
