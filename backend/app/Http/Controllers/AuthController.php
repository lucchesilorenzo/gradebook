<?php

namespace App\Http\Controllers;

use App\Http\Requests\LogInRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Handle the login of a user.
     *
     * @param LogInRequest $request
     * @return JsonResponse
     */
    public function logIn(LogInRequest $request): JsonResponse
    {
        // Get validated data
        $validatedData = $request->validated();

        try {
            // Check if user exists and password is correct
            $user = User::where('email', $validatedData['email'])->first();
            if (!$user || !Hash::check($validatedData['password'], $user->password)) {
                return response()->json(['message' => 'Invalid credentials.'], 401);
            }

            // Generate Sanctum token
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json(['token' => $token]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not login user.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Handle the logout of a user.
     *
     * @return JsonResource
     */
    public function logOut(): JsonResponse
    {
        auth()->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out.']);
    }
}
