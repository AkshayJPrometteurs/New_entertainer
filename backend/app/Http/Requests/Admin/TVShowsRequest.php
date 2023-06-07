<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class TVShowsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'tv_channel_id' => 'required',
            'tv_shows_name' => 'required|unique:t_v_shows,tv_shows_name',
            'tv_shows_image' => 'required',
            'status' => 'required',
        ];
    }
}
