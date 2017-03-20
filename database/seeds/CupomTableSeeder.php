<?php

use Delivery\Models\Cupom;
use Illuminate\Database\Seeder;

class CupomTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //essa seed eu dupliquei. Se o artisan n encontrar, devo usar composer dump-autoload
       factory(Cupom::class, 10)->create();
    }
}
