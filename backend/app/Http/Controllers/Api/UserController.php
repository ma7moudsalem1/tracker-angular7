<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $users)
    {
        return $users->latest()->paginate(15);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, User $users)
    {
        $data = $this->validate($request, [
            'name'     => 'required|string|min:2|max:191',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:6',
            'bio'      => 'nullable|max:360',
            'type'     => 'required|in:admin,author,user'
        ]);
        $user = $users->create($data);
        return $user;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $users,$id)
    {
        $user = $users->findOrFail($id);
        $data = $this->validate($request, [
            'name'     => 'required|string|min:2|max:191',
            'email'    => 'required|email|unique:users,email,'.$id,
            'password' => 'nullable|min:6',
            'bio'      => 'nullable|max:360',
            'type'     => 'required|in:admin,author,user'
        ]);
        if($request->password == ''){
            unset($data['password']);
        }
        $user->update($data);
        return $user;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, User $users)
    {
        $user = $users->findOrFail($id);
        $user->delete();
        return response(['status' => 'User Deleted successfully']);
    }
}
