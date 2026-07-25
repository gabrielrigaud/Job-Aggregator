<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreJobOfferRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'company_id' => ['required', 'integer', 'exists:companies,id'],
            'source_internal_id' => ['required', 'integer', 'exists:sources,id'],
            'source_external_id' => [
                'required',
                'string',
                'max:255',
                Rule::unique('job_offers')->where(function ($query) {
                    return $query->where('source_internal_id', $this->source_internal_id);
                })
            ],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'location' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
            'is_remote' => ['nullable', 'boolean'],
            'contract_type' => ['required', 'string', 'max:255'],
            'date_of_publi' => ['required', 'date'],
            'date_of_collect' => ['required', 'date'],
            'salary_min' => ['nullable', 'integer', 'min:0'],
            'salary_max' => ['nullable', 'integer', 'min:0', 'gte:salary_min'],
            'salary_currency' => ['nullable', 'string', 'max:10'],
            'salary_period' => ['nullable', 'string', 'max:255'],
            'content_hash' => ['required', 'string', 'unique:job_offers,content_hash'],
        ];
    }
}
