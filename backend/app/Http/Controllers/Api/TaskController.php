<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Task;
use App\Project;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Task $tasks)
    {
        return $tasks->latest()->paginate(15);
    }

    public function getProjectTasks($id, Task $tasks, Project $projects)
    {
        $project = $projects->findOrFail($id);
        return $tasks->whereProjectId($id)->latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Task $tasks)
    {
        $data = $this->validate($request, [
            'name'       => 'required|string|min:2|max:191',
            'comment'    => 'nullable|max:360',
            'status'     => 'required|string',
            'project_id' => 'required|integer'
        ]);
        $task  = $tasks->create($data);
        return $task;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        return $task;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id, Task $tasks)
    {
        $task = $tasks->findOrFail($id);
        $data = $this->validate($request, [
            'name'       => 'required|string|min:2|max:191',
            'comment'    => 'nullable|max:360',
            'status'     => 'required|string',
            'project_id' => 'required|integer'
        ]);
        $task->update($data);
        return $task;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, Task $tasks)
    {
        $task = $tasks->findOrFail($id)->delete();
        return response(['status' => 'Task Deleted successfully']);
    }

    public function ProjectOption(Project $projects){
        return $projects->latest()->get();
    }
}
