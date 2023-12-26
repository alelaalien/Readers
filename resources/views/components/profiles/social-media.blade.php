@php $pic = $user->profile_photo_path ?  $user->profile_photo_path : 'back.png'; @endphp
<div class="profile"> 
  <img src="{{asset('img/users/'.$pic)}}" alt="user" class="img-fluid rounded-circle">
  <h1 class="text-light"><a href="index.html">{{$user->name}}</a></h1>
  <div class="social-links mt-3 text-center"> 
    @if($detail)
    @foreach($media as $sm)
     @if($detail->$sm)
        <a href="{{strpos($detail->$sm, 'https://') === 0 ? $detail->$sm : 'https://' . $detail->$sm }}" target="_blank" class="{{$sm}}"><i class="bx bxl-{{$sm}}" style="background: transparent;"></i></a>
      @endif  
    @endforeach 
    @endif
  </div>
</div>