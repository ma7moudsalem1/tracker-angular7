<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Task;
use App\Project;

class SettingController extends Controller
{
    public function dashboard(User $users, Task $tasks, Project $projects)
    {
        $data = [];
        $data['users']    = $users->count();
        $data['projects'] = $projects->count();
        $data['tasks']    = $tasks->count();
        $data['done_task']= $tasks->whereStatus('done')->count();
        return $data;
    }

    public function profile(){

    }
}
