<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Project;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Project $projects)
    {
        return $projects->latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Project $projects)
    {
        $data = $this->validate($request, [
            'name'     => 'required|string|min:2|max:191',
        ]);
        $data['user_id'] = auth()->id();
        $project = $projects->create($data);
        return $project;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, Project $projects)
    {
        return $projects->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id, Project $projects)
    {
        $project = $projects->findOrFail($id);
        $data = $this->validate($request, [
            'name'     => 'required|string|min:2|max:191',
        ]);
        $project->update($data);
        return $project;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, Project $projects)
    {
        $project = $projects->findOrFail($id);
        $project->delete();
        return response(['status' => 'Project Deleted successfully']);
    }
}
