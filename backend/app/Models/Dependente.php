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
}
