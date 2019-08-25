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
        /*
         * Se for ambiente de testes, gera somente 10 registros de funcionários (para acelerar os testes).
         * Caso contrário, gera 50 registros.
         */
        $totalRegistros = env('APP_ENV', 'local') === 'testing' ? 10 : 50;

        factory(Funcionario::class, $totalRegistros)->create()->each(function(Funcionario $funcionario) use ($faker) {
            // Pra cada funcionário é gerado de 0 a 3 dependentes, aleatóriamente
            $quantidade = $faker->numberBetween(0, 3);
            $depententes = factory(Dependente::class, $quantidade)->make();

            if (empty($depententes)) {
                return;
            }

            $funcionario->dependentes()->saveMany($depententes);
        });
    }
}
