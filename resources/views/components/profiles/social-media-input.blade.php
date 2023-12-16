<i class='bx {{$name == "web" ? "bx-world" : "bxl-" . $name; }}  social-icon' style="margin-left: 4%;"></i> 
<input wire:model="socialMediaUserData.{{$name}}" type="text" 
class="form-control" value="{{$data}}"  
style="max-width: max-content;" placeholder="Add {{$name}}">  