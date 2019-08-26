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

    /**
     * Formata somente o campo "data_nascimento" como yyyy-mm-dd
     * @param $dateString
     *
     * @return string|null
     */
    public function getDataNascimentoAttribute($dateString)
    {
        if (!$dateString) {
            return;
        }

        return substr($dateString, 0, 10);
    }

    /**
     * Formata a data no formato ISO8601, no output do serviço.
     * @param \DateTimeInterface $date
     * @return string
     */
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->toIso8601String();
    }
}
