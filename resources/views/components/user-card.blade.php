<div class="clash-card barbarian container-fluid"> 
  <div class="row">
    <div class="col-lg-12">
      <div class="text-center text-uppercase user-card-up" style="padding: 3% 0%;">
        <a href="{{route('profiles', ['id' =>$user->id])}}"><h2>{{$user->name}}</h2></a>
        <div class="contac-me" wire:click="toggleChat">
          <button >{{ __('Message me!')}}</button>
        </div> 
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12">
      <div class=" ">
        <img src="{{asset('img/users/'.$user->profile_photo_path)}}" alt="user" />  
      </div> 
    </div> 
  </div> 
  <div class="row">
    <div class="col-lg-12">
      <div class="clash-card__unit-description  pt-20">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae sit eum facilis. Vero eos est velit nostrum aspernatur. Adipisci nobis quisquam eligendi optio beatae dolore sint culpa doloribus recusandae id?
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12">
      <div class="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">
      @foreach ([
            'User since' => $user->created_at->format('d-m-Y'),
            'Posted books' => $user->books()->count()] as $label => $value)
             
                <x-one-third :title="$label" :data="$value"/> 
      @endforeach 
      </div>
    </div>
  </div> 
</div>  
 
<script>
    document.addEventListener('livewire:load', function () {
        Livewire.on('chatToggled', () => {
            const chatBox = document.querySelector('.chat-floating-box');
            chatBox.classList.toggle('hidden'); // Oculta o muestra el chat flotante
        });

        console.log('chat');
    }); 

</script>