<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Carbon\Carbon;
class AuthController extends Controller
{
    private $successStatus = 200;
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
    	$this->validate($request, [
    		'email' => 'required|email',
    		'password' => 'required'
    		]);

    	if(auth()->attempt(['email' => $request->email, 'password' => $request->password])){ 
            $user = auth()->user(); 
           return $this->authResponse('success', $user);
        } 
        else{ 
            return $this->authResponse('fail', null, ['Email or Password is not valid']);
        } 
    }

    public function register(Request $request)
    {
    	$input = $this->validate($request, [
    		'email' => 'required|email|max:90',
    		'email' => 'required|min:3|max:67',
    		'password' => 'required|min:6'
    		]); 

    	try {
    		$user  = User::create($input);
    		return $this->authResponse('success', $user);

    	} catch (Exception $e) {
    		return $this->authResponse('fail', null, [$e]);
    	}

    }

    public function logout()
    {
        auth()->user()->token()->revoke();

        return response()->json([
        	'status'  => 'success',
            'message' => 'Successfully logged out'
        ]);
    }

    // Response Handling
    private function authResponse($status, $user = null, $errors = [])
    {
    	if($status == 'success'){

    		$tokenResult =  $user->createToken('auth');
            $token 	     = $tokenResult->token;

            return response()->json(
            	[
            		'status' => 'success', 
            		'token_type' => 'Bearer',
            		'expires_at' => Carbon::parse(
		                $tokenResult->token->expires_at
		            )->toDateTimeString(),
            		'token' => $tokenResult->accessToken,
            	]

            	, $this->successStatus); 

    	}else{
    		return response()->json(
            	[
            		'status' => $status,
            	 	'errors'=> $errors
            	]
            	, 401); 
    	}
    }
}
