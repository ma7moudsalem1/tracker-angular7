<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
    	'name', 'project_id', 'status', 'comment'
    ];

    public function project()
    {
    	return $this->belongsTo('App\Project');
    }
}
