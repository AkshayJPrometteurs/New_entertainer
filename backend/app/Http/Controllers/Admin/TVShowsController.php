<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TVShowsRequest;
use App\Models\Admin\TVShows;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TVShowsController extends Controller
{
    public function tv_shows_list(){
        $tv_shows = TVShows::join('t_v_channels','t_v_channels.id', 'tv_channel_id')->get();
        return response()->json([
            'status' => 200,
            'tv_shows' => $tv_shows
        ]);
    }

    public function tv_shows_store(TVShowsRequest $request){
        $request->validated();
        $tv_shows = new TVShows();
        $tv_shows->tv_channel_id = $request->tv_channel_id;
        $tv_shows->tv_shows_name = $request->tv_shows_name;
        $tv_shows->tv_shows_slug = Str::slug($request->tv_shows_name);
        if($request->hasFile('tv_shows_image')){
            $tvshowsImage = 'TV_Shows_'.rand('111111','999999').'.'.$request->file('tv_shows_image')->getClientOriginalExtension();
            $request->file('tv_shows_image')->move('assets/images/TVShows/', $tvshowsImage);
            $tv_shows->tv_shows_image = $tvshowsImage;
        }
        $tv_shows->status = $request->status;
        $tv_shows->save();

        return response()->json([
            'status' => 200,
            'msg' => 'TV Show Added Successfully'
        ]);
    }
}
