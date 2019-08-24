<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome_completo',
        'sexo',
        'email',
        'cpf',
        'data_nascimento',
        'linkedin',
        'anotacoes',
    ];

    protected $dates = [
        'data_nascimento'
    ];

    /**
     * Informa que os atributos do array, serão acessíveis pelo Model (Dispobibiliza no serviço)
     *
     * @var array
     */
    protected $appends = ['dependentes'];

    /**
     * Define o relacionamento com os Dependentes.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function dependentes()
    {
        return $this->hasMany(Dependente::class);
    }

    /**
     * Caso exista Dependente, estes serão mostrados quando acessado via atributo ($this->dependentes).
     *
     * @return array|mixed
     */
    public function getDependentesAttribute()
    {
        /** @var \Illuminate\Database\Eloquent\Relations\HasMany $dependentes */
        $dependentes = $this->dependentes();

        if (!$dependentes) {
            return [];
        }

        return $dependentes->getResults();
    }
}
