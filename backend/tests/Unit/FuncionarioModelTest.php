<?php

use App\Models\Funcionario;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Teste unitário da Model de Funcionários
 */
class FuncionarioModelTest extends TestCase
{
    /**
     * Testa os atributos da Model
     */
    public function testAtributosExistentes()
    {
        /** @var Funcionario $funcionario */
        $funcionario = factory(Funcionario::class)->make();

        $atributosDoFuncionario = [
            'nome_completo',
            'sexo',
            'email',
            'cpf',
            'data_nascimento',
            'linkedin',
            'anotacoes',
        ];
        $fillable = $funcionario->getFillable();

        // Ignora a ordem, o que importa é se os campos são os mesmos
        sort($atributosDoFuncionario);
        sort($fillable);

        $this->assertCount(7, $fillable);
        $this->assertEquals($atributosDoFuncionario, $fillable);
    }

    /**
     * Testa os campos do tipo data da Modal
     */
    public function testAtributosTipoData()
    {
        /** @var Funcionario $funcionario */
        $funcionario = factory(Funcionario::class)->make();

        $atributosTipoDataDoFuncionario = ['data_nascimento', 'created_at', 'updated_at'];
        $dates = $funcionario->getDates();

        // Ignora a ordem, o que importa é se os campos são os mesmos
        sort($atributosTipoDataDoFuncionario);
        sort($dates);

        $this->assertCount(3, $dates);
        $this->assertEquals($atributosTipoDataDoFuncionario, $dates);
    }

    /**
     * Testa o tipo dos relacionamentos do Funcionário
     */
    public function testRelacionamentos()
    {
        $funcionario = factory(Funcionario::class)->make();

        // Testa se o Relacionamento entre Funcionário->Dependentes é HasToMany
        $this->assertInstanceOf(HasMany::class, $funcionario->dependentes());
    }

    /**
     * Testa o atributo personalizado criado para o serviço "dependentes"
     */
    public function testAtributoDependentes()
    {
        /** @var Funcionario $funcionario */
        $funcionario = factory(Funcionario::class)->make();

        $this->assertArrayHasKey('dependentes', $funcionario->attributesToArray());
        $this->assertArrayHasKey('dependentes', $funcionario->toArray());
    }
}
