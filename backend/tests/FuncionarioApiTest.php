<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use App\Models\Funcionario;
use App\Models\Dependente;

/**
 * Testa a API de funcionários
 */
class FuncionarioApiTest extends TestCase
{
    use DatabaseMigrations {
        runDatabaseMigrations as baseRunDatabaseMigrations;
    }

    /**
     * Cria a estrutura do Banco e alimenta com o Seed, antes de cada teste.
     */
    public function runDatabaseMigrations()
    {
        $this->baseRunDatabaseMigrations();
        $this->artisan('db:seed');
    }

    /**
     * Bugfix para corrigir o novo comportamento do Laravel 5.8 com DotEnv
     *
     * @param string $command
     * @param array $parameters
     * @return int
     */
    public function artisan($command, $parameters = [])
    {
        $parameters['--env'] = env('APP_ENV');
        return parent::artisan($command, $parameters);
    }

    /**
     * Testa os serviço de listagem de Funcionários
     */
    public function testDeveRetornarTodosOsFuncionarios()
    {
        $this->get('funcionarios');

        // O serviço deve retornar HttpCode: 200
        $this->seeStatusCode(200);

        // O serviço deve ser um array de JSON's, onde cada item deve ter as chaves abaixo
        $this->seeJsonStructure([
            '*' => [
                'id',
                'nome_completo',
                'sexo',
                'email',
                'cpf',
                'data_nascimento',
                'linkedin',
                'anotacoes',
                'created_at',
                'updated_at',
                'dependentes',
            ],
        ]);
    }

    /**
     * Testa o serviço de detalhamento de Funcionários
     */
    public function testFuncionarioComDependentes()
    {
        /** @var Dependente $dependente */
        $dependente = $this->app->get(Dependente::class);

        /** @var Illuminate\Database\Eloquent\Builder $query */
        $query = $dependente->newQuery();

        $query
            ->selectRaw('COUNT(id) as totalDependentes, funcionario_id')
            ->groupBy('funcionario_id')
            ->orderBy('totalDependentes', 'DESC')
            ->limit(1);

        // Busca no banco de dados, um funcionário que possui dependentes
        $result = $query->get()->first();

        // Faz a requisição para um funcionário que possui dependentes
        $this->get(sprintf('funcionarios/%d', $result->funcionario_id));

        // O serviço deve retornar HttpCode: 200
        $this->seeStatusCode(200);

        // O serviço deve ser um JSON com a estrutura abaixo
        $this->seeJsonStructure([
            'id',
            'nome_completo',
            'sexo',
            'email',
            'cpf',
            'data_nascimento',
            'linkedin',
            'anotacoes',
            'created_at',
            'updated_at',
            'dependentes' => [
                '*' => [
                    "id",
                    "funcionario_id",
                    "nome_completo",
                    "sexo",
                    "cpf",
                    "data_nascimento",
                    "anotacoes",
                    "created_at",
                    "updated_at",
                ],
            ],
        ]);
    }

    /**
     * Testa o retorno do serviço em caso de Funcionário não existente
     */
    public function testFuncionarioInexistente()
    {
        $this->get('funcionarios/999');
        $this->seeStatusCode(404);

        $this->seeJson([
            "success" => false,
            "status"  => 404,
            "message" => "Funcionário não encontrado.",
        ]);
    }

    /**
     * Testa a criação de um novo funcionário
     */
    public function testNovoFuncionario()
    {
        $funcionario = factory(Funcionario::class)->make();

        $this->post('funcionarios', $funcionario->toArray());

        $this->seeStatusCode(201);

        $this->seeJsonStructure([
            'id',
            'nome_completo',
            'sexo',
            'email',
            'cpf',
            'data_nascimento',
            'linkedin',
            'anotacoes',
            'created_at',
            'updated_at',
            'dependentes',
        ]);
    }

    /**
     * Testa a validação dos dados do serviço de criar um novo funcionário
     */
    public function testNovoFuncionarioInvalido()
    {
        $funcionarioExistente = Funcionario::first();

        $funcionario = factory(Funcionario::class)->make();

        $funcionario->sexo = 'masculino';
        $funcionario->email = 'email-invalido@exemplo@teste.com.br';
        $funcionario->cpf = $funcionarioExistente->cpf;

        $this->post('funcionarios', $funcionario->toArray());

        $this->seeStatusCode(422);

        // Mensagens de erro devem conter os campos inválidos
        $this->seeJson([
            'sexo'  => ['The selected sexo is invalid.'],
            'email' => ['The email must be a valid email address.'],
            'cpf'   => ['The cpf has already been taken.'],
        ]);
    }

    /**
     * Testa a deleção de um funcionário existente
     */
    public function testApagarFuncionario()
    {
        // Checa se o usuário existe
        $this->get('funcionarios/1');
        $this->seeStatusCode(200);

        $this->delete('funcionarios/1');
        $this->seeStatusCode(200);
        $this->seeJson([
            'success' => true,
        ]);

        // Checa se o usuário foi apagado
        $this->get('funcionarios/1');
        $this->seeStatusCode(404);
    }

    /**
     * Testa a ação de apagar um funcionário que não existe no sistema
     */
    public function testApagarFuncionarioInexistente()
    {
        $this->delete('funcionarios/999');
        $this->seeStatusCode(404);

        $this->seeJson([
            "success" => false,
            "status"  => 404,
            "message" => "Recurso não encontrado.",
        ]);
    }

    /**
     * Testa a atualização de dados de um funcionário
     */
    public function testAtualizarDadosDoFuncionario()
    {
        // Busca os dados do funcionário
        $this->get('funcionarios/1');
        $this->seeStatusCode(200);

        // Altera o nome, para testar se o serviço está ok
        $funcionarioDados = $this->response->getOriginalContent()->toArray();
        $funcionarioDados['nome_completo'] = 'Lucas Campelo Araújo';

        // Reenvia com as novas informações
        $this->put('funcionarios/1', $funcionarioDados);
        $this->seeStatusCode(200);

        $this->seeJson([
            'nome_completo' => 'Lucas Campelo Araújo',
        ]);
    }

    /**
     * Testa a atualização de dados de um funcionário, com informações inválidas
     */
    public function testAtualizarDadosDoFuncionarioInvalido()
    {
        // Busca os dados do funcionário
        $this->get('funcionarios/1');
        $this->seeStatusCode(200);

        // Busca o último funcionário do Banco de Dados, para utilizar um CPF diferente
        $funcionarioExistente = Funcionario::all()->last();

        // Altera o nome, para testar se o serviço está ok
        $funcionarioDados = $this->response->getOriginalContent()->toArray();
        $funcionarioDados['nome_completo'] = 'Lucas Campelo Araújo';

        $funcionarioDados['sexo'] = 'masculino';
        $funcionarioDados['email'] = 'email-invalido@exemplo@teste.com.br';
        $funcionarioDados['cpf'] = $funcionarioExistente->cpf;

        // Reenvia com as novas informações
        $this->put('funcionarios/1', $funcionarioDados);
        $this->seeStatusCode(422);

        // Mensagens de erro devem conter os campos inválidos
        $this->seeJson([
            'sexo'  => ['The selected sexo is invalid.'],
            'email' => ['The email must be a valid email address.'],
            'cpf'   => ['The cpf has already been taken.'],
        ]);
    }

    public function testAtualizarDadosDoFuncionarioInexistente()
    {
        $funcionario = factory(Funcionario::class)->make();

        $this->put('funcionarios/999', $funcionario->toArray());
        $this->seeStatusCode(404);

        $this->seeJson([
            "success" => false,
            "status"  => 404,
            "message" => "Recurso não encontrado.",
        ]);
    }
}
