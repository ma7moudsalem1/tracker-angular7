<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
    	'name', 'user_id'
    ];

    protected $with = ['user'];
    protected $withCount = ['tasks', 'doneTasks'];

    public function tasks()
    {
    	return $this->hasMany('App\Task');
    }
    public function doneTasks()
    {
        return $this->hasMany('App\Task')->whereStatus('done');
    }

    public function user()
    {
    	return $this->belongsTo('App\User')->withDefault(['name' => 'unknown']);
    }
}
