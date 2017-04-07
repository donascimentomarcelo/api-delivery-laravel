<?php

namespace Delivery\Repositories;

use Delivery\Models\User;
use Delivery\Presenters\UserPresenter;
use Delivery\Repositories\UserRepository;
use Delivery\Validators\UserValidator;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class UserRepositoryEloquent
 * @package namespace Delivery\Repositories;
 */
class UserRepositoryEloquent extends BaseRepository implements UserRepository
{
    protected $skipPresenter = true;
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return User::class;
    }

    public function getDeliverymen()
    {
        return $this->model->where(['role'=>'deliveryman'])->lists('name', 'id');
        //metodo criado para trazer somente os deliverymen
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
        return UserPresenter::class;
    }
}
