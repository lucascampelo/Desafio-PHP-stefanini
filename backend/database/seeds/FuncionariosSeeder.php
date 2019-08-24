<?php

use App\Models\Dependente;
use Illuminate\Database\Seeder;
use App\Models\Funcionario;

class FuncionariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @param \Faker\Generator $faker
     *
     * @return void
     */
    public function run(Faker\Generator $faker)
    {
        factory(Funcionario::class, 50)->create()->each(function(Funcionario $funcionario) use ($faker) {
            $quantidade = $faker->numberBetween(0, 3);
            $depententes = factory(Dependente::class, $quantidade)->make();

            if (empty($depententes)) {
                return;
            }

            $funcionario->dependentes()->saveMany($depententes);
        });
    }
}
