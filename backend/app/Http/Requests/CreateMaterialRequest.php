<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateMaterialRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:30',
            'description' => 'nullable|string|max:40',
            'type' => 'required|string|in:PDF,VIDEO,LINK',
            'file' => 'required_if:type,PDF|mimes:pdf|max:10000',
            'url' => 'required_if:type,LINK,VIDEO|url',
        ];
    }
}
