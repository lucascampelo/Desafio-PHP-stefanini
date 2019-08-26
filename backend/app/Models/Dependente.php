<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dependente extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome_completo',
        'sexo',
        'cpf',
        'data_nascimento',
        'anotacoes',
    ];

    protected $dates = [
        'data_nascimento'
    ];

    /**
     * Define o relacionamento com o Funcionário
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function funcionario()
    {
        return $this->belongsTo(Funcionario::class);
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
